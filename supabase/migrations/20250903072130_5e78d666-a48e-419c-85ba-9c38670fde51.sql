-- Create order submission functionality with client handling

-- First, let's create a function to handle anonymous client creation and order submission
CREATE OR REPLACE FUNCTION public.submit_anonymous_order(
  p_email TEXT,
  p_content_type TEXT,
  p_word_count INTEGER,
  p_title TEXT,
  p_description TEXT,
  p_deadline TIMESTAMP WITH TIME ZONE,
  p_client_price NUMERIC,
  p_expertise TEXT DEFAULT NULL,
  p_keywords TEXT[] DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_client_id UUID;
  v_order_id UUID;
  v_client_code TEXT;
BEGIN
  -- Check if client exists by email
  SELECT id INTO v_client_id 
  FROM public.clients 
  WHERE email = p_email;
  
  -- If client doesn't exist, create new one
  IF v_client_id IS NULL THEN
    -- Generate client code
    v_client_code := generate_client_code();
    
    -- Insert new client
    INSERT INTO public.clients (client_code, email)
    VALUES (v_client_code, p_email)
    RETURNING id INTO v_client_id;
  END IF;
  
  -- Create the order
  INSERT INTO public.orders (
    client_id,
    order_type,
    word_count,
    title,
    description,
    deadline,
    client_price,
    status,
    order_number,
    keywords
  ) VALUES (
    v_client_id,
    p_content_type::order_type,
    p_word_count,
    p_title,
    p_description,
    p_deadline,
    p_client_price,
    'pending'::order_status,
    generate_order_number(),
    p_keywords
  ) RETURNING id INTO v_order_id;
  
  -- Create initial order stage
  INSERT INTO public.order_stages (
    order_id,
    stage,
    deadline,
    notes
  ) VALUES (
    v_order_id,
    'writing'::order_stage,
    p_deadline,
    'Order received and waiting for writer assignment'
  );
  
  RETURN v_order_id;
END;
$$;

-- Create function to check order status for clients
CREATE OR REPLACE FUNCTION public.get_client_order_status(
  p_email TEXT,
  p_order_number TEXT
) RETURNS TABLE (
  order_id UUID,
  order_number TEXT,
  title TEXT,
  status order_status,
  current_stage order_stage,
  stage_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  deadline TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.order_number,
    o.title,
    o.status,
    os.stage,
    os.deadline,
    o.created_at,
    o.deadline
  FROM public.orders o
  JOIN public.clients c ON o.client_id = c.id
  LEFT JOIN public.order_stages os ON o.id = os.order_id 
    AND os.completed_at IS NULL
  WHERE c.email = p_email 
    AND o.order_number = p_order_number
  ORDER BY os.created_at DESC
  LIMIT 1;
END;
$$;

-- Create function for order tracking
CREATE OR REPLACE FUNCTION public.get_client_orders(
  p_email TEXT
) RETURNS TABLE (
  order_id UUID,
  order_number TEXT,
  title TEXT,
  status order_status,
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  deadline TIMESTAMP WITH TIME ZONE,
  current_stage order_stage
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$ 
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.order_number,
    o.title,
    o.status,
    o.word_count,
    o.created_at,
    o.deadline,
    os.stage
  FROM public.orders o
  JOIN public.clients c ON o.client_id = c.id
  LEFT JOIN public.order_stages os ON o.id = os.order_id 
    AND os.completed_at IS NULL
  WHERE c.email = p_email
  ORDER BY o.created_at DESC;
END;
$$;