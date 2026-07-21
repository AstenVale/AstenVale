-- Ashton Vale — case_youtube_video_migration.sql
--
-- Adds youtube_video_id to released_cases, written by the desktop
-- youtube_drop_scheduler app (core/youtube_sync.py) via the
-- case-youtube-sync Edge Function whenever it posts a case's video to
-- YouTube. case.html reads it through public_released_cases to swap its
-- audio player for a YouTube embed, the same way it already does for a
-- Spotify track id from the streaming sheet.
--
-- Additive only. Does not touch released, updated_at, or any other table.
--
-- Rollback:
--   create or replace view public_released_cases as
--     select case_id from released_cases where released = true;
--   alter table released_cases drop column if exists youtube_video_id;

alter table released_cases
  add column if not exists youtube_video_id text;

-- 11-char YouTube video ids only (matches YOUTUBE_ID_RE in
-- core/youtube_sync.py) -- guards against anything ever landing here
-- other than a validated id, regardless of what writes it.
alter table released_cases
  drop constraint if exists released_cases_youtube_video_id_format;
alter table released_cases
  add constraint released_cases_youtube_video_id_format
  check (youtube_video_id is null or youtube_video_id ~ '^[A-Za-z0-9_-]{11}$');

drop view if exists public_released_cases;
create view public_released_cases as
  select case_id, youtube_video_id from released_cases where released = true;

grant select on public_released_cases to anon, authenticated;
