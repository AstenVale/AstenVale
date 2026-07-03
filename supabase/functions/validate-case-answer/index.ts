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

  let body: { case_id?: unknown; fields?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const caseId = body.case_id;
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
  for (const fieldId of fieldIds) {
    const accepted = acceptedByField[fieldId];
    const value = String(submitted[fieldId] ?? "");
    results[fieldId] = accepted ? isFieldCorrect(value, accepted) : false;
  }

  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});
