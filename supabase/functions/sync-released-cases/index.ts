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
// Sheet 2 of the same published spreadsheet -- vault rewards (vault,
// reward_title, reward_url, released). gid supplied by the site owner.
const SHEET2_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1lN7dxScXihZSpJ4jUe-k6u-Z4NKu9UOwnu5ULio9G0oxRjb7SsST7GlFHTxlrK2t0NnmWPPq-767/pub?gid=968106571&single=true&output=csv";

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

interface VaultRewardRow {
  vault: number;
  reward_title: string;
  reward_url: string;
  released: boolean;
}

function vaultRewardsFromSheet(csv: string): VaultRewardRow[] {
  const rows = parseCsv(csv);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.toLowerCase());
  const vaultCol = headers.indexOf("vault");
  const titleCol = headers.indexOf("reward_title");
  const urlCol = headers.indexOf("reward_url");
  const releasedCol = headers.indexOf("released");
  if (vaultCol === -1) return [];

  const out: VaultRewardRow[] = [];
  for (const row of rows.slice(1)) {
    const rawVault = row[vaultCol];
    if (!rawVault) continue;
    const vault = parseInt(rawVault, 10);
    if (!Number.isFinite(vault)) continue;
    out.push({
      vault,
      reward_title: titleCol !== -1 ? (row[titleCol] ?? "") : "",
      reward_url: urlCol !== -1 ? (row[urlCol] ?? "") : "",
      released: releasedCol !== -1 ? (row[releasedCol] ?? "").toUpperCase() === "TRUE" : false,
    });
  }
  return out;
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

  // Sheet 2 -- vault rewards. Independent of the case-release sync above:
  // a problem here never blocks or rolls back the case-release result,
  // and vice versa. Straightforward upsert (not additive-only like
  // released_cases) since the sheet's `released` column is meant to be
  // flippable in both directions by the publisher.
  let vaultRewardsResult: { synced: number; error: string | null } = { synced: 0, error: null };
  try {
    const sheet2Res = await fetch(SHEET2_URL);
    if (!sheet2Res.ok) throw new Error("sheet2 fetch failed: " + sheet2Res.status);
    const sheet2Csv = await sheet2Res.text();
    const rewards = vaultRewardsFromSheet(sheet2Csv);

    for (const r of rewards) {
      const { error: upsertError } = await adminClient
        .from("vault_rewards")
        .upsert(
          {
            vault: r.vault,
            reward_title: r.reward_title,
            reward_url: r.reward_url,
            released: r.released,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "vault" },
        );
      if (upsertError) throw upsertError;
    }
    vaultRewardsResult.synced = rewards.length;
  } catch (e) {
    vaultRewardsResult.error = String(e);
  }

  return new Response(
    JSON.stringify({
      sheet_released_count: sheetReleasedIds.length,
      newly_released: newlyReleased,
      already_released_count: alreadyReleased.size,
      vault_rewards_synced: vaultRewardsResult.synced,
      vault_rewards_error: vaultRewardsResult.error,
    }),
    { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
  );
});
