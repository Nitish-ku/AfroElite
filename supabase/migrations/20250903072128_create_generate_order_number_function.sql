CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN CONCAT('WFC-', UPPER(SUBSTRING(md5(random()::text) for 8)));
END;
$$;
