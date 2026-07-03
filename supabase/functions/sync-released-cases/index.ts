// Ashton Vale — sync-released-cases Edge Function
//
// Restores the owner's actual publishing workflow after backend-enforced
// access control moved release truth into Supabase's released_cases
// table: the Google Sheet is still the source of truth for "which case
// has a real streaming link published," this function just mirrors that
// into released_cases on demand. Nothing releases automatically -- the
// owner triggers this explicitly (button in admin.html, or a single
// curl/supabase functions invoke) every time they publish a new case.
//
// Owner-only: verifies the caller's session JWT belongs to
// marketingaftermidnight@gmail.com before touching anything. Never
// un-releases a case that's already released -- purely additive, so a
// row temporarily missing from the sheet (typo, reorder, etc.) can never
// silently take a live case away from players.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "marketingaftermidnight@gmail.com";
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1lN7dxScXihZSpJ4jUe-k6u-Z4NKu9UOwnu5ULio9G0oxRjb7SsST7GlFHTxlrK2t0NnmWPPq-767/pub?output=csv";

function parseCsv(csv: string): string[][] {
  return csv
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));
}

// Same "does this case have a real published link" rule case.html used
// to apply client-side before release truth moved server-side.
function releasedIdsFromSheet(csv: string): string[] {
  const rows = parseCsv(csv);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.toLowerCase());
  const idCol = headers.indexOf("id");
  const linkCols = ["spotify", "apple", "youtube", "amazon"]
    .map((name) => headers.indexOf(name))
    .filter((i) => i !== -1);
  if (idCol === -1) return [];

  const ids: string[] = [];
  for (const row of rows.slice(1)) {
    const rawId = row[idCol];
    if (!rawId) continue;
    const id = rawId.padStart(3, "0");
    if (!/^\d{3}$/.test(id)) continue;
    const hasLink = linkCols.some((col) => /^https?:\/\//i.test(row[col] ?? ""));
    if (hasLink) ids.push(id);
  }
  return ids;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const callerClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data: userData, error: userError } = await callerClient.auth.getUser();
  if (userError || !userData?.user || userData.user.email !== ADMIN_EMAIL) {
    return new Response(JSON.stringify({ error: "Not authorized" }), {
      status: 403,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  let csv: string;
  try {
    const sheetRes = await fetch(SHEET_URL);
    if (!sheetRes.ok) throw new Error("sheet fetch failed: " + sheetRes.status);
    csv = await sheetRes.text();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Could not read spreadsheet: " + String(e) }), {
      status: 502,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const sheetReleasedIds = releasedIdsFromSheet(csv);

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: currentRows, error: readError } = await adminClient
    .from("released_cases")
    .select("case_id, released")
    .in("case_id", sheetReleasedIds);

  if (readError) {
    return new Response(JSON.stringify({ error: "Lookup failed: " + readError.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const alreadyReleased = new Set(
    (currentRows ?? []).filter((r) => r.released).map((r) => r.case_id),
  );
  const newlyReleased = sheetReleasedIds.filter((id) => !alreadyReleased.has(id));

  if (newlyReleased.length > 0) {
    const { error: updateError } = await adminClient
      .from("released_cases")
      .update({ released: true, updated_at: new Date().toISOString() })
      .in("case_id", newlyReleased);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Update failed: " + updateError.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }
  }

  return new Response(
    JSON.stringify({
      sheet_released_count: sheetReleasedIds.length,
      newly_released: newlyReleased,
      already_released_count: alreadyReleased.size,
    }),
    { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
  );
});
