-- Drop old version to avoid ambiguity
drop function if exists public.submit_anonymous_order(
  text, text, integer, text, text, timestamptz, numeric, text, text[]
);

-- Recreate with SECURITY DEFINER and explicit search_path
create or replace function public.submit_anonymous_order(
  p_email           text,
  p_content_type    text,         -- must match your enum exactly (e.g., 'web_copy')
  p_word_count      integer,
  p_title           text,
  p_description     text,
  p_deadline        timestamptz,
  p_client_price    numeric,
  p_expertise       text default null,
  p_keywords        text[] default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_uid uuid := auth.uid();
  v_client_id uuid;
  v_order_id uuid;
  v_client_code text;
  v_order_number text;
begin
  -- Basic guards that would otherwise lead to rollbacks later
  if p_email is null or length(trim(p_email)) = 0 then
    raise exception 'email is required';
  end if;
  if p_content_type is null or length(trim(p_content_type)) = 0 then
    raise exception 'content_type is required';
  end if;
  if p_word_count is null or p_word_count <= 0 then
    raise exception 'word_count must be > 0';
  end if;

  -- Generate codes (explicitly check they exist)
  select public.generate_client_code() into v_client_code;
  if v_client_code is null then
    raise exception 'generate_client_code() returned NULL';
  end if;

  select public.generate_order_number() into v_order_number;
  if v_order_number is null then
    raise exception 'generate_order_number() returned NULL';
  end if;

  -- Upsert/find client
  insert into public.clients (email, client_code, created_at)
  values (p_email, v_client_code, now())
  on conflict (email) do update
    set updated_at = now()
  returning id into v_client_id;

  if v_client_id is null then
    raise exception 'Failed to obtain client id';
  end if;

  -- Insert order (QUALIFY ALL NAMES + cast content type if enum)
  insert into public.orders (
    client_id,
    order_number,
    order_type,
    word_count,
    title,
    description,
    deadline,
    client_price,
    status,
    expertise,
    keywords,
    created_at
  )
  values (
    v_client_id,
    v_order_number,
    p_content_type::public.order_type,  -- cast to your enum
    p_word_count,
    p_title,
    p_description,
    p_deadline,
    p_client_price,
    'pending'::public.order_status,
    nullif(p_expertise, ''),
    nullif(p_keywords, '{}'),
    now()
  )
  returning id into v_order_id;

  if v_order_id is null then
    raise exception 'Failed to insert order';
  end if;

  -- Insert initial stage (if your schema requires it)
  insert into public.order_stages (order_id, stage, deadline, created_at)
  values (v_order_id, 'received'::public.order_stage, p_deadline, now());

  -- Return structured success payload for the frontend
  return jsonb_build_object(
    'ok', true,
    'client_id', v_client_id,
    'order_id', v_order_id,
    'order_number', v_order_number
  );

exception
  when others then
    -- Bubble the error out to the client; include detail/context
    -- so supabase.rpc() rejects instead of "succeeding".
    declare
      v_msg text := sqlerrm;
      v_state text := sqlstate;
    begin
      raise exception 'submit_anonymous_order failed (%): %', v_state, v_msg
        using detail = jsonb_build_object(
          'email', p_email,
          'content_type', p_content_type,
          'word_count', p_word_count
        )::text;
    end;
end;
$$;