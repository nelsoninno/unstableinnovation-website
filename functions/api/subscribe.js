/**
 * POST /api/subscribe
 *
 * Body: application/x-www-form-urlencoded from /get/ or /es/get/
 * Fields: email, first_name, role (multi), linkedin_followed, newsletter_consent,
 *         language (hidden), source (hidden), company (honeypot)
 *
 * Behavior:
 *   - Reject if honeypot filled.
 *   - Require email + newsletter_consent.
 *   - Insert into D1 `subscribers` table (upsert on email conflict, updates fields).
 *   - Redirect to /thank-you/?name=X (or /es/thank-you/?name=X).
 *
 * On any failure, still redirect to thank-you so the user is not blocked,
 * but log the failure via console.error which surfaces in Cloudflare Pages logs.
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const form = await request.formData();

    // Honeypot: silently redirect if a bot filled the hidden company field.
    if ((form.get("company") || "").toString().trim() !== "") {
      return Response.redirect(new URL("/thank-you/", request.url).toString(), 303);
    }

    const email = (form.get("email") || "").toString().trim().toLowerCase();
    const firstName = (form.get("first_name") || "").toString().trim();
    const roles = form.getAll("role").map(v => v.toString().trim()).filter(Boolean).join(", ");
    const language = ((form.get("language") || "en").toString().trim().toLowerCase() === "es") ? "es" : "en";
    const source = (form.get("source") || "").toString().trim() || `unstableinnovation.com/${language === "es" ? "es/" : ""}get`;
    const linkedinFollowed = form.get("linkedin_followed") ? 1 : 0;
    const newsletterConsent = form.get("newsletter_consent") ? 1 : 0;

    // Basic validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return redirectWithError(request, language, "invalid_email");
    }
    if (!newsletterConsent) {
      return redirectWithError(request, language, "consent_required");
    }

    // Metadata for record-keeping
    const ip = request.headers.get("CF-Connecting-IP") || "";
    const userAgent = request.headers.get("user-agent") || "";

    if (env.DB) {
      // D1 upsert: SQLite UPSERT syntax
      await env.DB.prepare(
        `INSERT INTO subscribers
           (email, first_name, roles, language, source, linkedin_followed, newsletter_consent, ip, user_agent)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
         ON CONFLICT(email) DO UPDATE SET
           first_name         = COALESCE(NULLIF(excluded.first_name, ''), first_name),
           roles              = COALESCE(NULLIF(excluded.roles, ''),      roles),
           language           = excluded.language,
           source             = excluded.source,
           linkedin_followed  = MAX(subscribers.linkedin_followed, excluded.linkedin_followed),
           newsletter_consent = MAX(subscribers.newsletter_consent, excluded.newsletter_consent),
           ip                 = excluded.ip,
           user_agent         = excluded.user_agent`
      )
      .bind(email, firstName, roles, language, source, linkedinFollowed, newsletterConsent, ip, userAgent)
      .run();
    } else {
      // No DB binding: log so we notice in Cloudflare Pages logs, but do not block the user.
      console.error("[subscribe] D1 binding 'DB' is missing. Signup captured but NOT stored:", {
        email, firstName, roles, language, source
      });
    }

    // Success: redirect to thank-you with first name in query string
    const thankYouPath = language === "es" ? "/es/thank-you/" : "/thank-you/";
    const params = new URLSearchParams();
    if (firstName) params.set("name", firstName);
    const dest = new URL(thankYouPath + (params.toString() ? `?${params}` : ""), request.url);
    return Response.redirect(dest.toString(), 303);
  } catch (err) {
    console.error("[subscribe] unhandled error:", err && err.stack || err);
    // Still redirect to thank-you so the user is not stuck on an error page
    return Response.redirect(new URL("/thank-you/", request.url).toString(), 303);
  }
}

function redirectWithError(request, language, code) {
  const getPath = language === "es" ? "/es/get/" : "/get/";
  const dest = new URL(getPath + `?error=${code}`, request.url);
  return Response.redirect(dest.toString(), 303);
}
