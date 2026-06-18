-- Contact-form lead storage for the Najd AI Solutions website.
-- The /api/contact route inserts each submission here (PostgREST, anon key).
-- RLS is on with an INSERT-only policy: leads are write-only via the public API
-- and can only be read with the service role (dashboard / server admin).

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  interest text,
  message text not null,
  source text not null default 'website'
);

alter table public.contact_leads enable row level security;

drop policy if exists "website can insert leads" on public.contact_leads;
create policy "website can insert leads"
  on public.contact_leads
  for insert
  to anon, authenticated
  with check (true);
