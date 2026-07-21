-- Ashton Vale — case_scheduled_autopromote_migration.sql
--
-- Makes the "flip a scheduled case to live" step run entirely on Supabase's
-- own infrastructure via pg_cron, independent of the desktop scheduler's PC
-- being on. The scheduler uploads videos well ahead of their publish date
-- (private + YouTube's own publishAt), so the real youtube_video_id is
-- already known while the video is still private. That id now gets staged
-- into pending_youtube_video_id (never exposed publicly -- not selected by
-- public_released_cases) instead of the live youtube_video_id column, and
-- this cron job promotes it once scheduled_release_at has actually passed.
--
-- Additive only.
--
-- Rollback:
--   select cron.unschedule('promote-scheduled-case-releases');
--   alter table released_cases drop column if exists pending_youtube_video_id;

alter table released_cases
  add column if not exists pending_youtube_video_id text;

alter table released_cases
  drop constraint if exists released_cases_pending_youtube_video_id_format;
alter table released_cases
  add constraint released_cases_pending_youtube_video_id_format
  check (pending_youtube_video_id is null or pending_youtube_video_id ~ '^[A-Za-z0-9_-]{11}$');

-- Runs every 15 minutes. Purely additive (only ever sets released=true,
-- never back to false) and idempotent -- a run that finds nothing due is a
-- no-op, and a video promoted on one run is excluded from the next by the
-- WHERE clause (pending_youtube_video_id is cleared once promoted).
select cron.schedule(
  'promote-scheduled-case-releases',
  '*/15 * * * *',
  $$
    update released_cases
    set youtube_video_id = pending_youtube_video_id,
        pending_youtube_video_id = null,
        scheduled_release_at = null,
        released = true,
        updated_at = now()
    where scheduled_release_at is not null
      and scheduled_release_at <= now()
      and pending_youtube_video_id is not null;
  $$
);
