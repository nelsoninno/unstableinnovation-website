/**
 * POST /api/subscribe
 *
 * Body: application/x-www-form-urlencoded from /get/ or /es/get/
 * Fields: first_name (required), last_name, email, role (multi) (optional)
 * Hidden: language, source, company (honeypot)
 *
 * Behavior:
 *   - Every request is saved in D1 table `book_requests` (one row per click),
 *     so the number of rows is the number of people who asked for the book.
 *   - If an email is given, it is also saved in `subscribers` (upsert on email).
 *     Giving an email means "send me news about the book" (once or twice a year).
 *   - Missing first name or an invalid email sends the visitor back to the form.
 *   - Then redirect to /thank-you/?name=X (or /es/thank-you/?name=X).
 *
 * Export: /api/subscribers.csv?key=ADMIN_KEY&list=requests  (all requests)
 *         /api/subscribers.csv?key=ADMIN_KEY                (emails only)
 *
 * On any failure, still redirect to thank-you so the visitor is never blocked,
 * and log the failure via console.error (visible in Cloudflare Pages logs).
 */

let schemaChecked = false;

async function ensureSchema(db) {
  if (schemaChecked) return;
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS book_requests (
       id         INTEGER PRIMARY KEY AUTOINCREMENT,
       first_name TEXT NOT NULL,
       last_name  TEXT,
       email      TEXT,
       roles      TEXT,
       language   TEXT NOT NULL DEFAULT 'en',
       source     TEXT,
       created_at TEXT NOT NULL DEFAULT (datetime('now'))
     )`
  ).run();
  // last_name was added to subscribers in Oct 2026. Adding it twice throws "duplicate column", which is fine.
  try { await db.prepare("ALTER TABLE subscribers ADD COLUMN last_name TEXT").run(); } catch (_) {}
  schemaChecked = true;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let language = "en";
  try {
    const form = await request.formData();
    language = ((form.get("language") || "en").toString().trim().toLowerCase() === "es") ? "es" : "en";

    // Honeypot: a bot filled the hidden company field. Send it on without storing anything.
    if ((form.get("company") || "").toString().trim() !== "") {
      return redirectToThankYou(request, language, "");
    }

    const firstName = (form.get("first_name") || "").toString().trim().slice(0, 80);
    const lastName = (form.get("last_name") || "").toString().trim().slice(0, 80);
    const email = (form.get("email") || "").toString().trim().toLowerCase().slice(0, 200);
    const roles = form.getAll("role").map(v => v.toString().trim().slice(0, 40)).filter(Boolean).join(", ");
    const source = (form.get("source") || "").toString().trim().slice(0, 120)
      || `unstableinnovation.com/${language === "es" ? "es/" : ""}get`;

    if (!firstName) return redirectWithError(request, language, "name_required");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return redirectWithError(request, language, "invalid_email");
    }

    if (env.DB) {
      await ensureSchema(env.DB);
      await env.DB.prepare(
        `INSERT INTO book_requests (first_name, last_name, email, roles, language, source)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      ).bind(firstName, lastName, email, roles, language, source).run();

      if (email) {
        const ip = request.headers.get("CF-Connecting-IP") || "";
        const userAgent = (request.headers.get("user-agent") || "").slice(0, 300);
        await env.DB.prepare(
          `INSERT INTO subscribers
             (email, first_name, last_name, roles, language, source, linkedin_followed, newsletter_consent, ip, user_agent)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, 1, ?7, ?8)
           ON CONFLICT(email) DO UPDATE SET
             first_name         = COALESCE(NULLIF(excluded.first_name, ''), first_name),
             last_name          = COALESCE(NULLIF(excluded.last_name, ''),  last_name),
             roles              = COALESCE(NULLIF(excluded.roles, ''),      roles),
             language           = excluded.language,
             source             = excluded.source,
             newsletter_consent = 1,
             ip                 = excluded.ip,
             user_agent         = excluded.user_agent`
        ).bind(email, firstName, lastName, roles, language, source, ip, userAgent).run();
      }
    } else {
      console.error("[subscribe] D1 binding 'DB' is missing. Request NOT stored:", { language, source });
    }

    return redirectToThankYou(request, language, firstName);
  } catch (err) {
    console.error("[subscribe] unhandled error:", err && err.stack || err);
    return redirectToThankYou(request, language, "");
  }
}

function redirectToThankYou(request, language, firstName) {
  const path = language === "es" ? "/es/thank-you/" : "/thank-you/";
  const params = new URLSearchParams();
  if (firstName) params.set("name", firstName);
  const dest = new URL(path + (params.toString() ? `?${params}` : ""), request.url);
  return Response.redirect(dest.toString(), 303);
}

function redirectWithError(request, language, code) {
  const getPath = language === "es" ? "/es/get/" : "/get/";
  const dest = new URL(getPath + `?error=${code}`, request.url);
  return Response.redirect(dest.toString(), 303);
}
