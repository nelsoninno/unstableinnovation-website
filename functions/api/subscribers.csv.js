/**
 * GET /api/subscribers.csv
 *
 * Admin endpoint that exports all rows from the D1 `subscribers` table as a CSV.
 *
 * Auth (either works):
 *   1. Query string ?key=YOUR_ADMIN_KEY
 *   2. Header    Authorization: Bearer YOUR_ADMIN_KEY
 *
 * The admin key is read from Cloudflare Pages environment variable ADMIN_KEY
 * (a secret you set in the dashboard). If the env var is unset, the endpoint
 * refuses everything with 503.
 *
 * Belt + suspenders: also protect the entire /api/subscribers.csv route with
 * Cloudflare Access from the dashboard (Zero Trust -> Access -> Applications).
 */
export async function onRequestGet(context) {
  const { request, env } = context;

  if (!env.ADMIN_KEY) {
    return new Response(
      "Admin endpoint disabled: set ADMIN_KEY as a Cloudflare Pages environment variable.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const url = new URL(request.url);
  const providedKey = url.searchParams.get("key")
    || (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!providedKey || !safeEqual(providedKey, env.ADMIN_KEY)) {
    return new Response("Forbidden", { status: 403, headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  if (!env.DB) {
    return new Response("D1 binding 'DB' is missing.", { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const { results } = await env.DB.prepare(
    `SELECT id, email, first_name, roles, language, source,
            linkedin_followed, newsletter_consent, ip, user_agent, created_at
     FROM subscribers ORDER BY created_at DESC`
  ).all();

  const cols = ["id","email","first_name","roles","language","source","linkedin_followed","newsletter_consent","ip","user_agent","created_at"];
  const lines = [cols.join(",")];
  for (const row of (results || [])) {
    lines.push(cols.map(c => csvCell(row[c])).join(","));
  }
  const csv = lines.join("\n") + "\n";

  const filename = `unstable-innovation-subscribers-${new Date().toISOString().slice(0,10)}.csv`;
  return new Response(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
}

function csvCell(v) {
  if (v == null) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
