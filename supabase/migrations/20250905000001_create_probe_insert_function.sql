create or replace function public._probe_insert()
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  insert into public.clients (email, client_code, created_at)
  values (concat('probe+', gen_random_uuid(), '@example.com'),
          'PROBE',
          now())
  returning id into v_id;

  return v_id;
end;
$$;