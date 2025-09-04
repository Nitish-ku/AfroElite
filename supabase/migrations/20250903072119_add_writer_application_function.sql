
-- Create writer_applications table
CREATE TABLE public.writer_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    availability TEXT, -- e.g., 'full-time', 'part-time'
    bio TEXT,
    certifications TEXT[], -- Array of text
    education TEXT,
    experience TEXT,
    portfolio_url TEXT,
    specialization TEXT[], -- Array of text
    phone TEXT,
    status public.writer_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Function to submit a writer application
CREATE OR REPLACE FUNCTION public.submit_writer_application(
  p_user_id UUID,
  p_first_name TEXT,
  p_last_name TEXT,
  p_availability TEXT,
  p_bio TEXT,
  p_certifications TEXT[],
  p_education TEXT,
  p_experience TEXT,
  p_portfolio_url TEXT,
  p_specialization TEXT[],
  p_phone TEXT
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.writer_applications (
    user_id,
    first_name,
    last_name,
    availability,
    bio,
    certifications,
    education,
    experience,
    portfolio_url,
    specialization,
    phone
  ) VALUES (
    p_user_id,
    p_first_name,
    p_last_name,
    p_availability,
    p_bio,
    p_certifications,
    p_education,
    p_experience,
    p_portfolio_url,
    p_specialization,
    p_phone
  );
END;
$$;
