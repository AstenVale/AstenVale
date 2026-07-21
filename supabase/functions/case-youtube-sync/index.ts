// Ashton Vale — case-youtube-sync Edge Function
//
// Receives either:
//   {case_id, youtube_video_id}       -- after a successful YouTube upload
//   {case_id, scheduled_release_at}   -- when a video is queued for a future
//                                         publish date but not posted yet
// from the desktop youtube_drop_scheduler app (core/youtube_sync.py), and
// writes the corresponding column onto that case's released_cases row.
// Writing youtube_video_id always clears scheduled_release_at (the case is
// live now, no more "coming soon" to show). This is the only thing this
// function ever touches -- it never sets `released`, never creates rows,
// never writes progress/evidence/vaults/rewards/achievements. A case only
// gets a YouTube embed on the website once it's already released through
// the normal Sheet -> sync-released-cases path; this function purely
// attaches video/schedule info to a row that migration
// (backend_access_migration.sql) already seeded for all 600 case ids.
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

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (hasVideoId) {
    if (typeof body.youtube_video_id !== "string" || !YOUTUBE_ID_RE.test(body.youtube_video_id)) {
      return jsonResponse({ error: "youtube_video_id must be an 11-character YouTube video id" }, 400);
    }
    update.youtube_video_id = body.youtube_video_id;
    // A posted video is live now -- any earlier "coming soon" date no
    // longer applies, regardless of whether this call also passed one.
    update.scheduled_release_at = null;
  } else if (hasScheduledAt) {
    const parsed = new Date(body.scheduled_release_at as string);
    if (isNaN(parsed.getTime())) {
      return jsonResponse({ error: "scheduled_release_at must be a valid ISO 8601 datetime" }, 400);
    }
    update.scheduled_release_at = parsed.toISOString();
  }

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await adminClient
    .from("released_cases")
    .update(update)
    .eq("case_id", rawCaseId)
    .select("case_id, youtube_video_id, scheduled_release_at")
    .maybeSingle();

  if (error) {
    return jsonResponse({ error: "Update failed: " + error.message }, 500);
  }
  if (!data) {
    return jsonResponse({ error: "No released_cases row for case_id " + rawCaseId }, 404);
  }

  return jsonResponse(data, 200);
});
