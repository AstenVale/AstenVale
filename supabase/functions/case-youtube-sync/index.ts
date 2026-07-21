// Ashton Vale — case-youtube-sync Edge Function
//
// Receives one of three shapes from the desktop youtube_drop_scheduler app
// (core/youtube_sync.py), and writes the corresponding column(s) onto that
// case's released_cases row:
//
//   {case_id, scheduled_release_at}                     -- video not
//     uploaded yet, just a planned date. Updates scheduled_release_at only.
//
//   {case_id, youtube_video_id, scheduled_release_at}   -- STAGED: video is
//     already uploaded (private + YouTube's own publishAt -- see
//     core.youtube_client.build_video_body) but not due to go public yet.
//     Writes youtube_video_id to pending_youtube_video_id (never exposed by
//     public_released_cases) and updates scheduled_release_at. A pg_cron
//     job (see case_scheduled_autopromote_migration.sql) promotes it to the
//     live youtube_video_id column once scheduled_release_at has actually
//     passed -- entirely server-side, no dependency on the scheduler's PC
//     being on at that moment.
//
//   {case_id, youtube_video_id}   (no scheduled_release_at)  -- LIVE NOW:
//     either an unscheduled upload, or the scheduler confirming publishAt
//     has already passed. Writes the live youtube_video_id column directly
//     and sets released=true -- a case's video actually being public is now
//     the sole release trigger, replacing the old Sheet ->
//     sync-released-cases manual step (that pipeline existed for tracking
//     Spotify/Apple/Amazon links, which case.html no longer uses at all).
//     released is purely additive, same rule sync-released-cases always
//     followed: never flips a case back to unreleased.
//
// This function never creates rows, never writes progress/evidence/vaults/
// rewards/achievements -- only released_cases, on a row every case id
// already has (backend_access_migration.sql seeded all 600 as released=false).
//
// Auth: two checks, both required.
//   1. Authorization: Bearer <anon key> -- the platform-level header every
//      Edge Function call needs, same anon key already public in the
//      website's own JS.
//   2. x-autoposter-key: <AUTOPOSTER_SHARED_KEY> -- a secret only this
//      function and the scheduler's .env know, since the anon key alone
//      isn't a real credential (it's client-side-public by design). Set
//      via `supabase secrets set AUTOPOSTER_SHARED_KEY=...`.
// Neither is the service-role key -- that stays server-side, used only to
// perform the actual write after both checks pass.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-autoposter-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CASE_ID_RE = /^\d{3}$/;
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const sharedKey = Deno.env.get("AUTOPOSTER_SHARED_KEY");
  const callerKey = req.headers.get("x-autoposter-key");
  if (!sharedKey || !callerKey || callerKey !== sharedKey) {
    return jsonResponse({ error: "Not authorized" }, 403);
  }

  let body: { case_id?: unknown; youtube_video_id?: unknown; scheduled_release_at?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const rawCaseId = body.case_id;
  if (typeof rawCaseId !== "string" || !CASE_ID_RE.test(rawCaseId)) {
    return jsonResponse({ error: "case_id must be a 3-digit string, e.g. '001'" }, 400);
  }

  const hasVideoId = body.youtube_video_id !== undefined && body.youtube_video_id !== null;
  const hasScheduledAt = body.scheduled_release_at !== undefined && body.scheduled_release_at !== null;
  if (!hasVideoId && !hasScheduledAt) {
    return jsonResponse({ error: "Provide youtube_video_id or scheduled_release_at" }, 400);
  }

  let validatedVideoId: string | undefined;
  if (hasVideoId) {
    if (typeof body.youtube_video_id !== "string" || !YOUTUBE_ID_RE.test(body.youtube_video_id)) {
      return jsonResponse({ error: "youtube_video_id must be an 11-character YouTube video id" }, 400);
    }
    validatedVideoId = body.youtube_video_id;
  }

  let validatedScheduledAt: string | undefined;
  if (hasScheduledAt) {
    const parsed = new Date(body.scheduled_release_at as string);
    if (isNaN(parsed.getTime())) {
      return jsonResponse({ error: "scheduled_release_at must be a valid ISO 8601 datetime" }, 400);
    }
    validatedScheduledAt = parsed.toISOString();
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (hasVideoId && hasScheduledAt) {
    // STAGED: uploaded, not due yet -- stash the id, don't expose it.
    update.pending_youtube_video_id = validatedVideoId;
    update.scheduled_release_at = validatedScheduledAt;
  } else if (hasVideoId) {
    // LIVE NOW.
    update.youtube_video_id = validatedVideoId;
    update.pending_youtube_video_id = null;
    update.scheduled_release_at = null;
    update.released = true;
  } else {
    // Date-only update -- no video id known yet.
    update.scheduled_release_at = validatedScheduledAt;
  }

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await adminClient
    .from("released_cases")
    .update(update)
    .eq("case_id", rawCaseId)
    .select("case_id, youtube_video_id, pending_youtube_video_id, scheduled_release_at, released")
    .maybeSingle();

  if (error) {
    return jsonResponse({ error: "Update failed: " + error.message }, 500);
  }
  if (!data) {
    return jsonResponse({ error: "No released_cases row for case_id " + rawCaseId }, 404);
  }

  return jsonResponse(data, 200);
});
