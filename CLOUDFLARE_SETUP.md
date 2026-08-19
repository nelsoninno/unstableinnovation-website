# Cloudflare setup for the email-capture form

The `/get/` and `/es/get/` forms now POST natively to `/api/subscribe`, a
Cloudflare Pages Function that stores each signup in a Cloudflare D1 database.
The admin export lives at `/api/subscribers.csv`, protected by a bearer token
you set as an environment variable.

Nothing here uses Kit / ConvertKit anymore. Everything runs on Cloudflare's
free tier.

Do these four things once in the Cloudflare dashboard, then deploy.

---

## 1. Create the D1 database (once)

1. Cloudflare dashboard → **Storage & Databases** → **D1** → **Create Database**.
2. Name it: `unstable-innovation-subs` (or anything, note the exact name).
3. Click **Create**.

## 2. Run the schema against the new database

Open the new database in the dashboard, click the **Console** tab, and paste
the contents of `db/schema.sql` from this repo. Run it. You should see
`subscribers` in the Tables list on the left.

(Or, if you prefer the CLI: `wrangler d1 execute unstable-innovation-subs --file=db/schema.sql --remote`.)

## 3. Bind the D1 database to the Pages project

1. Cloudflare dashboard → **Workers & Pages** → the `unstableinnovation-website` Pages project.
2. **Settings** → **Bindings** → **D1 database bindings** → **Add binding**.
3. **Variable name**: `DB` (this exact name — the function code reads `env.DB`).
4. **D1 database**: pick `unstable-innovation-subs`.
5. Save. Redeploy the site (Deployments → Retry latest deployment) so the
   binding takes effect.

## 4. Set the admin key (secret env var)

The admin CSV export at `/api/subscribers.csv` requires a bearer token so
random people cannot download the subscriber list.

1. Generate a strong random string. On a Mac: `openssl rand -hex 32`, or use
   any password manager. Keep it in your password manager, do not commit it.
2. Cloudflare dashboard → the Pages project → **Settings** → **Variables and Secrets**.
3. **Add** → **Type: Secret** → **Variable name**: `ADMIN_KEY` → paste the
   random string → **Save**.
4. Redeploy.

## Recommended (optional but recommended)

- **Turn off Rocket Loader** for this site. Cloudflare dashboard → the
  `unstableinnovation.com` zone → **Speed** → **Optimization** → **Content
  Optimization** → **Rocket Loader**: OFF. Turn **Auto Minify → JavaScript**
  off too.
- **Cloudflare Access on `/api/subscribers.csv`** (belt + suspenders on top
  of the bearer token). Cloudflare dashboard → **Zero Trust** → **Access** →
  **Applications** → **Add an application** → **Self-hosted** →
  `unstableinnovation.com/api/subscribers.csv` → allow only your email. Free
  for up to 50 users.

## How to use it

**Every signup on `/get/` or `/es/get/`** now goes through the Pages Function,
lands in D1, and the reader is redirected to `/thank-you/` (or
`/es/thank-you/`) so they can download the book.

**To export the subscriber list**, open one of these URLs in a browser
(replace `YOUR_ADMIN_KEY` with what you set in step 4):

```
https://www.unstableinnovation.com/api/subscribers.csv?key=YOUR_ADMIN_KEY
```

The file downloads as `unstable-innovation-subscribers-YYYY-MM-DD.csv` with
every field the form captured, plus IP, user agent, and timestamp.

Bookmark it. That is the whole admin.

## Files in this repo that power the stack

- `functions/api/subscribe.js`         — POST handler that stores the signup in D1
- `functions/api/subscribers.csv.js`   — GET handler that exports the CSV
- `db/schema.sql`                       — the D1 table definition
- `get/index.html`, `es/get/index.html` — the two forms that POST to `/api/subscribe`

## If something goes wrong

- **Signups seem to work but nothing appears in the CSV.** Check the D1
  binding is exactly named `DB` (step 3). If the binding is missing, the
  function will still redirect the user to `/thank-you/` (so the reader is
  never blocked) but a `[subscribe] D1 binding 'DB' is missing` message is
  logged to Pages Functions logs.
- **CSV endpoint returns 503 "Admin endpoint disabled".** `ADMIN_KEY` env var
  is not set. Redo step 4.
- **CSV endpoint returns 403 Forbidden.** Wrong `key=` query value or wrong
  `Authorization: Bearer` header.
