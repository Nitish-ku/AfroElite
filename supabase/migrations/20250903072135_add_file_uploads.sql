-- Create storage bucket for order files
INSERT INTO storage.buckets (id, name, public)
VALUES ('order_files', 'order_files', false);

-- Create policy to allow users to upload files
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'order_files');

-- Create order_files table
CREATE TABLE "public"."order_files" (
  "id" UUID DEFAULT gen_random_uuid() NOT NULL,
  "order_id" UUID NOT NULL REFERENCES "public"."orders"("id"),
  "user_id" UUID NOT NULL REFERENCES "auth"."users"("id"),
  "file_path" TEXT NOT NULL,
  "file_name" TEXT NOT NULL,
  "file_type" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  PRIMARY KEY ("id")
);

-- RLS policy for order_files
ALTER TABLE public.order_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to see their own files" ON "public"."order_files"
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow admin full access to files" ON "public"."order_files"
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Function to add a file to an order
CREATE OR REPLACE FUNCTION public.add_order_file(
  p_order_id UUID,
  p_user_id UUID,
  p_file_path TEXT,
  p_file_name TEXT,
  p_file_type TEXT
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.order_files (order_id, user_id, file_path, file_name, file_type)
  VALUES (p_order_id, p_user_id, p_file_path, p_file_name, p_file_type);
END;
$$;