
CREATE OR REPLACE FUNCTION public.generate_client_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN UPPER(SUBSTRING(md5(random()::text) for 6));
END;
$$;
