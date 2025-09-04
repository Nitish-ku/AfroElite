-- Add paid_status column to orders table
ALTER TABLE public.orders
ADD COLUMN paid_status BOOLEAN DEFAULT FALSE NOT NULL;
