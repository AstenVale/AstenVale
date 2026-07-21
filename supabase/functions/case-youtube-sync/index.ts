// Ashton Vale — case-youtube-sync Edge Function
//
// Receives {case_id, youtube_video_id} from the desktop youtube_drop_scheduler
// app (core/youtube_sync.py) after it successfully uploads a case's video to
// YouTube, and writes youtube_video_id onto that case's released_cases row.
// This is the only thing this function ever touches -- it never sets
// `released`, never creates rows, never writes progress/evidence/vaults/
// rewards/achievements. A case only gets a YouTube embed on the website once
// it's already released through the normal Sheet -> sync-released-cases path;
// this function purely attaches the video id to a row that migration
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

  let body: { case_id?: unknown; youtube_video_id?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const rawCaseId = body.case_id;
  const rawVideoId = body.youtube_video_id;
  if (typeof rawCaseId !== "string" || !CASE_ID_RE.test(rawCaseId)) {
    return jsonResponse({ error: "case_id must be a 3-digit string, e.g. '001'" }, 400);
  }
  if (typeof rawVideoId !== "string" || !YOUTUBE_ID_RE.test(rawVideoId)) {
    return jsonResponse({ error: "youtube_video_id must be an 11-character YouTube video id" }, 400);
  }

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await adminClient
    .from("released_cases")
    .update({ youtube_video_id: rawVideoId, updated_at: new Date().toISOString() })
    .eq("case_id", rawCaseId)
    .select("case_id")
    .maybeSingle();

  if (error) {
    return jsonResponse({ error: "Update failed: " + error.message }, 500);
  }
  if (!data) {
    return jsonResponse({ error: "No released_cases row for case_id " + rawCaseId }, 404);
  }

  return jsonResponse({ case_id: rawCaseId, youtube_video_id: rawVideoId }, 200);
});
