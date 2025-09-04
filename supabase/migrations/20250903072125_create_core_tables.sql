
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_code TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.clients(id),
    writer_id UUID REFERENCES public.writers(id), -- Added writer_id column
    order_type TEXT NOT NULL, -- Assuming order_type is a simple text for now, could be an ENUM
    word_count INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    client_price NUMERIC NOT NULL,
    status public.order_status NOT NULL,
    order_number TEXT UNIQUE NOT NULL,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.order_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id),
    stage public.order_stage NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
