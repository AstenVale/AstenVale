-- Ashton Vale — Phase: backend-enforced game access
--
-- Adds a server-side source of truth for "is this case actually released"
-- (released_cases), plus thin, RLS-safe views over the existing
-- player_progress table so archive/vaults/case/cabinet pages can ask the
-- backend "what am I allowed to see" instead of trusting client-side
-- SEASONS_CONFIG.released flags or localStorage alone.
--
-- Additive only. Does not touch players, player_progress, case_events,
-- puzzle_answers, case_answers, or their existing RLS policies.
--
-- Rollback:
--   drop view if exists player_evidence_inventory;
--   drop view if exists player_badges;
--   drop view if exists player_vault_unlocks;
--   drop view if exists player_case_unlocks;
--   drop view if exists public_released_cases;
--   drop table if exists released_cases;

-- ---------------------------------------------------------------------
-- released_cases — authoritative "is case N actually live" flag. This
-- replaces trusting the client-supplied SEASONS_CONFIG.released flag (or
-- the public streaming-sheet CSV) for access-control decisions. The sheet
-- / vault-config can still drive *display* (titles, artwork, ordering);
-- this table alone decides whether case.html will actually render the
-- case for a player who hasn't already solved it.
-- ---------------------------------------------------------------------
create table if not exists released_cases (
  case_id text primary key,
  released boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Seed all 600 case ids if not already present, leaving released=false by
-- default. Safe to re-run: ON CONFLICT DO NOTHING never overwrites an
-- existing row's released flag.
insert into released_cases (case_id, released)
select lpad(g::text, 3, '0'), false
from generate_series(1, 600) g
on conflict (case_id) do nothing;

-- Match current live state: only case 001 is released today (per
-- js/vault-config.js). Going forward, releasing a new case requires
-- flipping this row too, not just adding a streaming link to the sheet --
-- documented as a known follow-up (an admin.html control for this hasn't
-- been built yet).
update released_cases set released = true, updated_at = now() where case_id = '001';

alter table released_cases enable row level security;
-- No policies on the base table on purpose -- default-deny for anon AND
-- authenticated. Only the public_released_cases view below is queryable,
-- and it only ever exposes already-released case ids.
revoke all on released_cases from anon, authenticated;

-- ---------------------------------------------------------------------
-- public_released_cases — the only way anon/authenticated clients can
-- read released_cases. Deliberately NOT security_invoker: anon/
-- authenticated have zero grants on the base table (revoked above), so a
-- security_invoker view would just inherit that "permission denied"
-- instead of exposing anything. This view runs as its owner (who owns
-- the table and can read it directly) and is safe anyway because its
-- WHERE clause is a static filter, not a per-caller one -- it can never
-- return an unreleased row to anybody, regardless of who's asking.
-- ---------------------------------------------------------------------
create or replace view public_released_cases as
  select case_id from released_cases where released = true;

grant select on public_released_cases to anon, authenticated;

-- ---------------------------------------------------------------------
-- player_case_unlocks — cases this player has actually solved, per the
-- server-side record (player_progress.completed_cases), not localStorage.
-- security_invoker means the existing "select own progress" RLS policy on
-- player_progress still applies to whoever queries this view.
-- ---------------------------------------------------------------------
create or replace view player_case_unlocks
with (security_invoker = true) as
  select pp.user_id, elem as case_id
  from player_progress pp,
       jsonb_array_elements_text(pp.completed_cases) elem;

grant select on player_case_unlocks to authenticated;

-- ---------------------------------------------------------------------
-- player_vault_unlocks — vaults this player has unlocked, per the server
-- record (player_progress.unlocked_vaults).
-- ---------------------------------------------------------------------
create or replace view player_vault_unlocks
with (security_invoker = true) as
  select pp.user_id, elem as vault_id
  from player_progress pp,
       jsonb_array_elements_text(pp.unlocked_vaults) elem;

grant select on player_vault_unlocks to authenticated;

-- ---------------------------------------------------------------------
-- player_badges — badges this player has earned, per the server record
-- (player_progress.earned_badges).
-- ---------------------------------------------------------------------
create or replace view player_badges
with (security_invoker = true) as
  select pp.user_id, elem as badge_id
  from player_progress pp,
       jsonb_array_elements_text(pp.earned_badges) elem;

grant select on player_badges to authenticated;

-- ---------------------------------------------------------------------
-- player_evidence_inventory — evidence (collectibles) this player has
-- earned. Collectible definitions themselves live in the static
-- data/songs/*.js files (image, description, lore text), not in Postgres,
-- so this view can't return the collectible objects -- it returns the
-- solved case ids that the frontend already knows how to turn into
-- collectibles (see cabinet.html). This is the authoritative list of
-- *which* cases' evidence the player is allowed to render; it is exactly
-- player_case_unlocks under the name the access-control spec asked for.
-- ---------------------------------------------------------------------
create or replace view player_evidence_inventory
with (security_invoker = true) as
  select pp.user_id, elem as case_id
  from player_progress pp,
       jsonb_array_elements_text(pp.completed_cases) elem;

grant select on player_evidence_inventory to authenticated;
