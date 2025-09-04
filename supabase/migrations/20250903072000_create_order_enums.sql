CREATE TYPE public.order_type AS ENUM (
    'article',
    'blog_post',
    'web_copy',
    'other'
);

CREATE TYPE public.order_status AS ENUM (
    'pending',
    'assigned',
    'in_progress',
    'under_review',
    'completed',
    'cancelled'
);

CREATE TYPE public.order_stage AS ENUM (
    'writing',
    'editing',
    'proofreading',
    'final_review',
    'delivered'
);

CREATE TYPE public.writer_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);
