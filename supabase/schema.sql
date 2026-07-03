-- Ashton Vale — optional player progress sync (MVP)
--
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- Everything the sync feature needs lives in this one file: one table, one
-- trigger, one view, and the RLS policies that protect them. To remove the
-- whole feature later, just run:
--   drop view if exists public_leaderboard;
--   drop table if exists player_progress;
-- and delete js/supabase-progress-sync.js, leaderboard.html, admin.html,
-- and the "Sync Progress" block in progress.html.

create table if not exists player_progress (
  player_id text primary key,
  display_name text,
  completed_cases text[] not null default '{}',
  unlocked_vaults text[] not null default '{}',
  earned_badges text[] not null default '{}',
  last_completed_case text,
  total_cases_completed int not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Anti-cheat / sanity trigger
--
-- The client is never trusted as the source of truth. Every insert or
-- update is re-validated here before it's stored:
--   - completed_cases is filtered down to real case ids (001-600 only)
--   - total_cases_completed is always recomputed from the filtered list,
--     never taken from what the client sent
--   - last_completed_case must actually be one of the completed cases
--   - list sizes are capped so a malformed payload can't bloat a row
--   - display_name is trimmed and length-capped
--
-- This can't prove a case was *legitimately* solved (that would require
-- the puzzle logic itself to run server-side, which is out of scope for
-- this MVP) — it only rejects impossible or malformed progress.
-- ---------------------------------------------------------------------
create or replace function player_progress_sanitize()
returns trigger as $$
declare
  valid_cases text[];
begin
  select array_agg(lpad(g::text, 3, '0'))
    into valid_cases
    from generate_series(1, 600) g;

  new.completed_cases := coalesce(
    (select array_agg(c) from unnest(new.completed_cases) c where c = any(valid_cases)),
    '{}'
  );

  if array_length(new.unlocked_vaults, 1) > 50 then
    new.unlocked_vaults := new.unlocked_vaults[1:50];
  end if;

  if array_length(new.earned_badges, 1) > 200 then
    new.earned_badges := new.earned_badges[1:200];
  end if;

  new.total_cases_completed := coalesce(array_length(new.completed_cases, 1), 0);

  if new.last_completed_case is not null
     and not (new.last_completed_case = any(new.completed_cases)) then
    new.last_completed_case := null;
  end if;

  if new.display_name is not null then
    new.display_name := left(trim(new.display_name), 40);
    if new.display_name = '' then
      new.display_name := null;
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_player_progress_sanitize on player_progress;
create trigger trg_player_progress_sanitize
  before insert or update on player_progress
  for each row execute function player_progress_sanitize();

-- ---------------------------------------------------------------------
-- Row level security
--
-- player_id is a random UUID generated on the visitor's device — there is
-- no login, so "own row" can't be cryptographically enforced the way it
-- could with Supabase Auth per player. What this DOES guarantee:
--   - anon (the public site) can insert/update rows, but can never
--     directly SELECT from this table, so no one can read another
--     player's private row data.
--   - only the public_leaderboard view below is exposed to anon reads,
--     and it only includes players who opted in with a display_name.
--   - full-row reads (admin stats) require an authenticated Supabase
--     Auth session — see admin.html, which requires signing in with the
--     one admin account you create in the Supabase dashboard.
-- ---------------------------------------------------------------------
alter table player_progress enable row level security;

grant select on player_progress to authenticated;

-- anon gets NO direct table grants at all -- not INSERT, not UPDATE, not
-- SELECT. The only write path is the sync_player_progress() function below.
revoke all on player_progress from anon;

drop policy if exists "anon can insert own row" on player_progress;
drop policy if exists "anon can update own row" on player_progress;

drop policy if exists "authenticated can read all rows (admin)" on player_progress;
create policy "authenticated can read all rows (admin)"
  on player_progress for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- Upsert via a SECURITY DEFINER function instead of a raw table policy.
--
-- Why: Postgres' "INSERT ... ON CONFLICT DO UPDATE" (what an upsert
-- compiles to) needs to check whether a conflicting row already exists,
-- which requires a SELECT-permitting RLS policy for the calling role.
-- Since anon intentionally has no SELECT policy (raw reads should never
-- be public), a direct anon upsert policy cannot work: it fails with
-- "new row violates row-level security policy" even though the INSERT
-- and UPDATE policies both allow it.
--
-- The fix is to route writes through this one function instead. It runs
-- as its owner (bypassing RLS internally, same as the SQL editor does),
-- but only accepts these seven specific fields -- anon can't run
-- arbitrary INSERT/UPDATE/SELECT on the table at all anymore, only call
-- this. This ends up *more* locked down than a raw table policy would
-- have been.
-- ---------------------------------------------------------------------
create or replace function sync_player_progress(
  p_player_id text,
  p_display_name text,
  p_completed_cases text[],
  p_unlocked_vaults text[],
  p_earned_badges text[],
  p_last_completed_case text,
  p_total_cases_completed int
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into player_progress (
    player_id, display_name, completed_cases, unlocked_vaults,
    earned_badges, last_completed_case, total_cases_completed
  ) values (
    p_player_id, p_display_name, p_completed_cases, p_unlocked_vaults,
    p_earned_badges, p_last_completed_case, p_total_cases_completed
  )
  on conflict (player_id) do update set
    display_name           = excluded.display_name,
    completed_cases         = excluded.completed_cases,
    unlocked_vaults          = excluded.unlocked_vaults,
    earned_badges           = excluded.earned_badges,
    last_completed_case     = excluded.last_completed_case,
    total_cases_completed   = excluded.total_cases_completed;
  -- note: the BEFORE INSERT/UPDATE trigger above still runs for every row
  -- written through this function, so all the same sanitization applies.
end;
$$;

revoke all on function sync_player_progress(text, text, text[], text[], text[], text, int) from public;
grant execute on function sync_player_progress(text, text, text[], text[], text[], text, int) to anon;

-- ---------------------------------------------------------------------
-- Public leaderboard view — safe fields only, opt-in only.
-- Never exposes player_id, unlocked_vaults, or the badge list itself,
-- just a count. No emails, no IPs (this table never collects them).
-- ---------------------------------------------------------------------
create or replace view public_leaderboard as
  select
    display_name,
    total_cases_completed,
    coalesce(array_length(earned_badges, 1), 0) as badge_count,
    last_completed_case,
    updated_at
  from player_progress
  where display_name is not null
  order by total_cases_completed desc, updated_at asc;

grant select on public_leaderboard to anon;

-- ---------------------------------------------------------------------
-- Admin auth: create your one admin login by hand.
-- Supabase Dashboard -> Authentication -> Users -> Add user.
-- Use an email/password only you know. Do not sign up through the
-- public site — there is no public signup form, by design.
-- ---------------------------------------------------------------------
