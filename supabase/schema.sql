-- Ashton Vale — Supabase backend (auth-based progress sync)
--
-- SUPERSEDES the earlier anonymous player_id design from the first version
-- of this file. That design (player_progress keyed by a client-generated
-- UUID, no login) is replaced entirely by this one, which ties progress to
-- a real Supabase Auth user via magic link login. Run this whole file in
-- the Supabase SQL editor; it drops the old objects first, so it's safe to
-- run even if the old version was applied previously.
--
-- To remove the whole feature later:
--   drop view if exists public_leaderboard;
--   drop table if exists case_events;
--   drop table if exists puzzle_answers;
--   drop table if exists player_progress;
--   drop table if exists players;
-- and delete js/progress-sync.js, leaderboard.html, admin.html, and the
-- "Save Progress" block in progress.html.

-- ---- clean up the old (pre-auth) design if it exists ----
drop view if exists public_leaderboard;
drop function if exists sync_player_progress(text, text, text[], text[], text[], text, int);
drop trigger if exists trg_player_progress_sanitize on player_progress;
drop function if exists player_progress_sanitize();
drop table if exists player_progress;

-- ---------------------------------------------------------------------
-- players — one row per logged-in user. Separate from player_progress so
-- "who am I / am I public" and "what have I done" can have different RLS
-- shapes without one giant table.
-- ---------------------------------------------------------------------
create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  display_name text,
  public_profile boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- player_progress — one row per user. jsonb arrays as specified (rather
-- than text[]) so the client can send/receive plain JSON without any
-- array-literal formatting.
-- ---------------------------------------------------------------------
create table if not exists player_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  completed_cases jsonb not null default '[]',
  unlocked_vaults jsonb not null default '[]',
  earned_badges jsonb not null default '[]',
  last_completed_case text,
  total_cases_completed integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- case_events — an append-only log (case solved, vault unlocked, badge
-- earned). Not read by any current page; exists so Phase 4's backend
-- answer validation has somewhere to record events, and so the admin
-- dashboard's "recent completions" can eventually read real events
-- instead of just the latest player_progress snapshot.
-- ---------------------------------------------------------------------
create table if not exists case_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  event_type text not null,
  case_id text,
  vault_id text,
  badge_id text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- puzzle_answers — created now, left EMPTY and unused until Phase 4.
-- No RLS policy is defined for it at all (see below), so with RLS
-- enabled and zero policies, anon/authenticated can never read a single
-- row through the API no matter what — only a server-side Edge Function
-- using the service_role key (which bypasses RLS) will ever touch it.
-- ---------------------------------------------------------------------
create table if not exists puzzle_answers (
  id uuid primary key default gen_random_uuid(),
  case_id text unique not null,
  answer_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Anti-cheat / sanity trigger on player_progress.
-- Same intent as before, adapted for jsonb arrays: filters completed_cases
-- down to real case ids, recomputes total_cases_completed server-side
-- (never trusts what the client sent), and clears last_completed_case if
-- it isn't actually in the sanitized list. This cannot prove a case was
-- legitimately solved -- that's what Phase 4's server-side validation is
-- for. This only rejects impossible/malformed data.
-- ---------------------------------------------------------------------
create or replace function player_progress_sanitize()
returns trigger as $$
declare
  valid_cases text[];
begin
  select array_agg(lpad(g::text, 3, '0'))
    into valid_cases
    from generate_series(1, 600) g;

  select coalesce(jsonb_agg(elem), '[]'::jsonb)
    into new.completed_cases
    from jsonb_array_elements_text(coalesce(new.completed_cases, '[]'::jsonb)) elem
    where elem = any(valid_cases);

  if jsonb_array_length(coalesce(new.unlocked_vaults, '[]'::jsonb)) > 50 then
    select coalesce(jsonb_agg(x), '[]'::jsonb) into new.unlocked_vaults
      from (select x from jsonb_array_elements(new.unlocked_vaults) x limit 50) s;
  end if;

  if jsonb_array_length(coalesce(new.earned_badges, '[]'::jsonb)) > 200 then
    select coalesce(jsonb_agg(x), '[]'::jsonb) into new.earned_badges
      from (select x from jsonb_array_elements(new.earned_badges) x limit 200) s;
  end if;

  new.total_cases_completed := jsonb_array_length(new.completed_cases);

  if new.last_completed_case is not null
     and not (new.completed_cases ? new.last_completed_case) then
    new.last_completed_case := null;
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
-- players.updated_at bump trigger (small, separate concern from progress
-- sanitization above).
-- ---------------------------------------------------------------------
create or replace function players_touch_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_players_touch_updated_at on players;
create trigger trg_players_touch_updated_at
  before update on players
  for each row execute function players_touch_updated_at();

-- ---------------------------------------------------------------------
-- Row level security
--
-- The admin email check (auth.jwt() ->> 'email' = ...) means the site
-- owner logs in through the exact same magic-link flow as any player --
-- there's no separate admin account system. Only that one email address
-- gets the "read everyone's row" policy.
-- ---------------------------------------------------------------------
alter table players enable row level security;
alter table player_progress enable row level security;
alter table case_events enable row level security;
alter table puzzle_answers enable row level security; -- no policies below on purpose: default-deny for everyone

grant select, insert, update on players to authenticated;
grant select, insert, update on player_progress to authenticated;
grant select, insert on case_events to authenticated;

-- players policies
drop policy if exists "select own player row" on players;
create policy "select own player row" on players for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "insert own player row" on players;
create policy "insert own player row" on players for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "update own player row" on players;
create policy "update own player row" on players for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "admin reads all players" on players;
create policy "admin reads all players" on players for select to authenticated
  using (auth.jwt() ->> 'email' = 'marketingaftermidnight@gmail.com');

-- player_progress policies
drop policy if exists "select own progress" on player_progress;
create policy "select own progress" on player_progress for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "insert own progress" on player_progress;
create policy "insert own progress" on player_progress for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "update own progress" on player_progress;
create policy "update own progress" on player_progress for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "admin reads all progress" on player_progress;
create policy "admin reads all progress" on player_progress for select to authenticated
  using (auth.jwt() ->> 'email' = 'marketingaftermidnight@gmail.com');

-- case_events policies
drop policy if exists "insert own case events" on case_events;
create policy "insert own case events" on case_events for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "select own case events" on case_events;
create policy "select own case events" on case_events for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "admin reads all case events" on case_events;
create policy "admin reads all case events" on case_events for select to authenticated
  using (auth.jwt() ->> 'email' = 'marketingaftermidnight@gmail.com');

-- puzzle_answers: RLS enabled, zero policies -> default deny for anon AND
-- authenticated. Nobody reads this table through the public API, ever.
revoke all on puzzle_answers from anon, authenticated;

-- ---------------------------------------------------------------------
-- Public leaderboard view — safe fields only, opt-in only (public_profile
-- must be true). Never exposes user_id, email, unlocked_vaults, or the
-- badge list itself, just a count.
-- ---------------------------------------------------------------------
create or replace view public_leaderboard as
  select
    p.display_name,
    coalesce(pp.total_cases_completed, 0) as total_cases_completed,
    jsonb_array_length(coalesce(pp.earned_badges, '[]'::jsonb)) as earned_badges_count,
    pp.last_completed_case,
    pp.updated_at
  from players p
  join player_progress pp on pp.user_id = p.user_id
  where p.public_profile = true and p.display_name is not null
  order by total_cases_completed desc, pp.updated_at asc;

grant select on public_leaderboard to anon, authenticated;
