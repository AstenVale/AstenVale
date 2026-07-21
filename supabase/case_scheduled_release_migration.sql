-- Ashton Vale — case_scheduled_release_migration.sql
--
-- Adds scheduled_release_at to released_cases: when the desktop
-- youtube_drop_scheduler has queued a case's video for a future publish
-- date but hasn't posted it yet, case.html shows a "Coming Soon" placeholder
-- with that date instead of a broken/empty player. Cleared (set back to
-- null) once youtube_video_id lands for the case -- see
-- case-youtube-sync's UPSERT below.
--
-- Additive only.
--
-- Rollback:
--   create or replace view public_released_cases as
--     select case_id, youtube_video_id from released_cases where released = true;
--   alter table released_cases drop column if exists scheduled_release_at;

alter table released_cases
  add column if not exists scheduled_release_at timestamptz;

drop view if exists public_released_cases;
create view public_released_cases as
  select case_id, youtube_video_id, scheduled_release_at
  from released_cases
  where released = true;

grant select on public_released_cases to anon, authenticated;
