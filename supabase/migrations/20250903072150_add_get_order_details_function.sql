-- Function to get all details for a single order
CREATE OR REPLACE FUNCTION public.get_order_details(
  p_order_id UUID
)
RETURNS TABLE (
  id UUID,
  order_number TEXT,
  title TEXT,
  description TEXT,
  status order_status,
  client_price NUMERIC,
  writer_price NUMERIC,
  deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  stages JSON
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
    o.description,
    o.status,
    o.client_price,
    o.writer_price,
    o.deadline,
    o.created_at,
    (SELECT json_agg(s) FROM (SELECT stage, notes, created_at, completed_at FROM public.order_stages WHERE order_id = o.id ORDER BY created_at) s) as stages
  FROM public.orders o
  WHERE o.id = p_order_id;
END;
$$;