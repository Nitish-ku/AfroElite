-- Enable RLS on core tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_stages ENABLE ROW LEVEL SECURITY;

-- Policies for clients
CREATE POLICY "Allow authenticated users to insert clients" ON public.clients
  FOR INSERT TO authenticated WITH CHECK (true);

-- Policies for orders
CREATE POLICY "Allow authenticated users to insert orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (true);

-- Policies for order_stages
CREATE POLICY "Allow authenticated users to insert order stages" ON public.order_stages
  FOR INSERT TO authenticated WITH CHECK (true);
