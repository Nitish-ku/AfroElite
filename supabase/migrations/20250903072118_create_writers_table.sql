
CREATE TABLE public.writers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    status public.writer_status DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Optional: Add RLS policies for writers table if needed
ALTER TABLE public.writers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Writers can view their own profile." ON public.writers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Writers can update their own profile." ON public.writers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all writer profiles." ON public.writers
  FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
