// Ashton Vale — validate-case-answer Edge Function
//
// Receives a case id and a set of submitted field values (only the
// currently-unverified fields, same as the old client-side checkAnswers()
// only rechecked unverified fields). Looks up the real accepted answers
// from case_answers (a table with RLS enabled and zero read policies --
// unreachable from the browser) using the service role key, which this
// function alone holds. Returns only true/false per field. Never returns
// the accepted answer text itself.
//
// Matching logic mirrors case.html's old client-side norm()/isFieldCorrect()
// exactly, so player-facing behavior (accepted spelling variants, no-space
// matching, substring fallback) is unchanged by this move to the backend.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function norm(s: unknown): string {
  return String(s ?? "").toLowerCase().trim().replace(/\s+/g, " ");
}

function isFieldCorrect(value: string, accepted: string[]): boolean {
  if (!value) return false;
  const val = norm(value);
  const nospace = val.replace(/\s+/g, "");
  let correct = accepted.indexOf(val) !== -1 || accepted.indexOf(nospace) !== -1;
  if (!correct && val.length >= 4 && val.indexOf(" ") === -1) {
    const re = new RegExp("\\b" + val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
    correct = accepted.some((a) => re.test(a));
  }
  return correct;
}

// Case ids are always exactly 3 digits (001-600) -- reject anything else
// before it ever reaches a query.
function isValidCaseId(id: unknown): id is string {
  return typeof id === "string" && /^\d{3}$/.test(id);
}

const VALID_FIELD_IDS = new Set([
  "location", "object", "witness", "time", "marker", "direction", "sound",
]);

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

  let body: { case_id?: unknown; fields?: unknown; reveal_solved?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const caseId = body.case_id;

  // reveal_solved: for a case the player has ALREADY solved (proven by
  // their own player_progress row, not by anything the client claims),
  // return the same canonical display text validate would have revealed
  // at solve time. Fixes the case where a case was solved before the
  // reveal-cache existed, or on a different device -- without ever
  // trusting client-supplied "I solved this" state. Ownership is
  // established server-side from the caller's verified JWT only.
  if (body.reveal_solved === true) {
    if (!isValidCaseId(caseId)) {
      return new Response(JSON.stringify({ error: "Invalid request shape" }), {
        status: 400,
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
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ revealed: {} }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: progress } = await adminClient
      .from("player_progress")
      .select("completed_cases")
      .eq("user_id", userData.user.id)
      .maybeSingle();

    const completed: string[] = (progress?.completed_cases as string[] | null) ?? [];
    if (completed.indexOf(caseId as string) === -1) {
      // Not actually solved by this player -- reveal nothing. Fails safe,
      // same posture as an incorrect guess.
      return new Response(JSON.stringify({ revealed: {} }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { data: answerRows, error: answerError } = await adminClient
      .from("case_answers")
      .select("field_id, accepted_answers")
      .eq("case_id", caseId);

    if (answerError) {
      return new Response(JSON.stringify({ error: "Lookup failed" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const revealed: Record<string, string> = {};
    for (const row of answerRows ?? []) {
      const accepted = row.accepted_answers as string[];
      if (VALID_FIELD_IDS.has(row.field_id) && accepted && accepted[0]) {
        revealed[row.field_id] = accepted[0];
      }
    }

    return new Response(JSON.stringify({ revealed }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const fields = body.fields;

  if (!isValidCaseId(caseId) || typeof fields !== "object" || fields === null || Array.isArray(fields)) {
    return new Response(JSON.stringify({ error: "Invalid request shape" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const submitted = fields as Record<string, unknown>;
  const fieldIds = Object.keys(submitted).filter((id) => VALID_FIELD_IDS.has(id));
  if (fieldIds.length === 0) {
    return new Response(JSON.stringify({ results: {} }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  // service_role bypasses RLS -- this is the only place in the whole
  // project that's allowed to read case_answers.
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase
    .from("case_answers")
    .select("field_id, accepted_answers")
    .eq("case_id", caseId)
    .in("field_id", fieldIds);

  if (error) {
    return new Response(JSON.stringify({ error: "Lookup failed" }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const acceptedByField: Record<string, string[]> = {};
  for (const row of data ?? []) {
    acceptedByField[row.field_id] = row.accepted_answers as string[];
  }

  const results: Record<string, boolean> = {};
  // Canonical display text is only ever included for a field the player
  // just got right -- never for a wrong guess, and never speculatively.
  // This is what lets case.html show "Black Pine" in a locked field or an
  // evidence summary after solving, without ever shipping the answer set
  // to a player who hasn't earned it yet.
  const revealed: Record<string, string> = {};
  for (const fieldId of fieldIds) {
    const accepted = acceptedByField[fieldId];
    const value = String(submitted[fieldId] ?? "");
    const correct = accepted ? isFieldCorrect(value, accepted) : false;
    results[fieldId] = correct;
    if (correct && accepted && accepted[0]) {
      revealed[fieldId] = accepted[0];
    }
  }

  return new Response(JSON.stringify({ results, revealed }), {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
