-- Create email_webhook table
CREATE TABLE "public"."email_webhook" (
  "id" UUID DEFAULT gen_random_uuid() NOT NULL,
  "payload" JSONB NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  PRIMARY KEY ("id")
);

-- RLS Policies for email_webhook
ALTER TABLE public.email_webhook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow only authenticated users to insert email webhooks" ON "public"."email_webhook"
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow admin full access to email webhooks" ON "public"."email_webhook"
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
