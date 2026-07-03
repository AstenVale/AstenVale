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
-- player once they've actually unlocked that vault, and only while
-- released = true.
--
-- Deliberately NOT security_invoker (this differs from
-- player_vault_unlocks/player_badges/etc., and that difference matters):
-- those other views only ever touch player_progress, which authenticated
-- already has a direct grant on -- security_invoker works fine there
-- because the caller has real privileges on every table involved. This
-- view also touches vault_rewards, which anon/authenticated have zero
-- grants on by design (so a locked vault's reward_url can never leak).
-- A security_invoker view checks the CALLER's privileges against every
-- underlying table, so it would try to check authenticated's privileges
-- on vault_rewards, find none, and fail with a silent permission error
-- that the frontend (treating any error as "no reward yet") rendered as
-- "Reward pending" no matter what the data said -- exactly the bug this
-- fixes. Instead this runs as the view owner (who has full access to
-- both tables) and gets its safety from the same static-WHERE-clause
-- reasoning as public_released_cases above: auth.uid() reflects the
-- real caller's session regardless of view/definer semantics, so
-- filtering on it here can never return another player's vault data.
-- ---------------------------------------------------------------------
create or replace view player_vault_rewards as
  select vr.vault, vr.reward_title, vr.reward_url
  from vault_rewards vr
  join player_progress pp on pp.user_id = auth.uid()
  join lateral jsonb_array_elements_text(pp.unlocked_vaults) as vault_id
    on vault_id = 's' || lpad(vr.vault::text, 2, '0') || '_vault'
  where vr.released = true
    and vr.reward_url is not null
    and vr.reward_url <> '';

grant select on player_vault_rewards to authenticated;
