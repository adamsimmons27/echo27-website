-- AI Search Readiness Checker: one row per audit. Written only by the server with the service role key.
-- Run this in the Supabase SQL editor (or `supabase db push`) before setting SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

create table if not exists public.readiness_reports (
  id uuid primary key,
  host text not null,
  cache_key text not null,
  created_at timestamptz not null default now(),
  teaser jsonb not null,
  report jsonb not null,
  unlocked_at timestamptz,
  lead jsonb
);

create index if not exists readiness_reports_cache_idx on public.readiness_reports (cache_key, created_at desc);
create index if not exists readiness_reports_host_idx on public.readiness_reports (host, created_at desc);

-- Nothing in this table is readable from the browser. The site only ever talks to it through server routes.
alter table public.readiness_reports enable row level security;
revoke all on public.readiness_reports from anon, authenticated;
