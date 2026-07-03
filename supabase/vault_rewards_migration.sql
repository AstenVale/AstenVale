-- Ashton Vale — vault rewards (Sheet 2 of the publishing spreadsheet)
--
-- Sheet 2 of the same published spreadsheet Sheet 1 already drives
-- (music/release links) controls a reward per vault: a title, a URL, and
-- a released flag. This table mirrors that sheet; sync-released-cases
-- (the existing admin-triggered Edge Function) now also upserts this
-- table from Sheet 2 alongside its existing Sheet 1 work.
--
-- Rollback:
--   drop view if exists player_vault_rewards;
--   drop table if exists vault_rewards;

create table if not exists vault_rewards (
  vault integer primary key,
  reward_title text,
  reward_url text,
  released boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table vault_rewards enable row level security;
-- Same default-deny pattern as released_cases: no policies on the base
-- table, no direct grants -- only reachable through the view below, which
-- only ever returns a reward to the player who actually unlocked that
-- vault, and only once released = true.
revoke all on vault_rewards from anon, authenticated;

-- ---------------------------------------------------------------------
-- player_vault_rewards — a reward row is only visible to a signed-in
-- player once player_vault_unlocks (existing view, backed by
-- player_progress.unlocked_vaults + its own RLS) shows they've actually
-- unlocked that vault, and only while released = true. security_invoker
-- means the caller's own RLS on player_progress is what enforces "your
-- own unlocks only" -- this view adds no new privilege, it just also
-- requires released = true before a reward_url is exposed at all.
-- ---------------------------------------------------------------------
create or replace view player_vault_rewards
with (security_invoker = true) as
  select vr.vault, vr.reward_title, vr.reward_url
  from vault_rewards vr
  join player_vault_unlocks pvu
    on pvu.vault_id = 's' || lpad(vr.vault::text, 2, '0') || '_vault'
  where vr.released = true
    and vr.reward_url is not null
    and vr.reward_url <> '';

grant select on player_vault_rewards to authenticated;
