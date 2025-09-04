-- Create messages table
CREATE TABLE "public"."messages" (
  "id" UUID DEFAULT gen_random_uuid() NOT NULL,
  "order_id" UUID NOT NULL REFERENCES "public"."orders"("id"),
  "user_id" UUID NOT NULL REFERENCES "auth"."users"("id"),
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  PRIMARY KEY ("id")
);

-- RLS Policies for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to see messages on their orders" ON "public"."messages"
  FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE client_id = (SELECT id FROM public.clients WHERE email = auth.email()) OR writer_id = (SELECT id FROM public.writers WHERE user_id = auth.uid())));

CREATE POLICY "Allow users to send messages on their orders" ON "public"."messages"
  FOR INSERT WITH CHECK (auth.uid() = user_id AND order_id IN (SELECT id FROM public.orders WHERE client_id = (SELECT id FROM public.clients WHERE email = auth.email()) OR writer_id = (SELECT id FROM public.writers WHERE user_id = auth.uid())));

CREATE POLICY "Allow admin full access to messages" ON "public"."messages"
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Function to get all messages for a given order
CREATE OR REPLACE FUNCTION public.get_order_messages(
  p_order_id UUID
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.content,
    m.created_at,
    m.user_id,
    p.full_name,
    p.avatar_url
  FROM public.messages m
  JOIN public.profiles p ON m.user_id = p.id
  WHERE m.order_id = p_order_id
  ORDER BY m.created_at;
END;
$$;

-- Function to send a message
CREATE OR REPLACE FUNCTION public.send_message(
  p_order_id UUID,
  p_user_id UUID,
  p_content TEXT
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.messages (order_id, user_id, content)
  VALUES (p_order_id, p_user_id, p_content);
END;
$$;