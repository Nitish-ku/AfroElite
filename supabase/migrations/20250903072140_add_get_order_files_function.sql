-- Function to get all files for a given order
CREATE OR REPLACE FUNCTION public.get_order_files(
  p_order_id UUID
)
RETURNS TABLE (
  id UUID,
  file_name TEXT,
  file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.file_name,
    f.file_path,
    f.created_at
  FROM public.order_files f
  WHERE f.order_id = p_order_id
  ORDER BY f.created_at DESC;
END;
$$;