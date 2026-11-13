-- CM Mobile v3.59: isolated career cloud storage
-- Run this in the Supabase SQL Editor for the existing Familiemat project.
-- Does not alter Familiemat tables, policies, or data.

create table if not exists public.cm_careers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  career_slot_id text not null,
  career_name text not null default 'Karriere',
  club_name text not null default '',
  season text not null default '',
  season_year integer not null default 2026,
  week integer not null default 1,
  payload text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cm_careers_user_slot_unique unique (user_id, career_slot_id)
);

create index if not exists cm_careers_user_updated_idx
  on public.cm_careers (user_id, updated_at desc);

alter table public.cm_careers enable row level security;

drop policy if exists "Users can read their own CM careers" on public.cm_careers;
create policy "Users can read their own CM careers"
  on public.cm_careers for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own CM careers" on public.cm_careers;
create policy "Users can insert their own CM careers"
  on public.cm_careers for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own CM careers" on public.cm_careers;
create policy "Users can update their own CM careers"
  on public.cm_careers for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.cm_careers to authenticated;
revoke all on public.cm_careers from anon;
