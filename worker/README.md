# Cloudflare Worker Contact API

This Worker accepts contact submissions and stores them in D1.

## Endpoint contract

### `POST /contact`

- Content-Type: `application/json`
- Body:
  ```json
  {
    "name": "Your Name",
    "email": "you@example.com",
    "message": "Hello"
  }
  ```

Validation rules:
- `name`: required, max 120 chars
- `email`: required, valid format, max 254 chars
- `message`: required, max 5000 chars

Success response:
```json
{ "ok": true, "message": "Contact submission received." }
```

Error response shape:
```json
{ "error": "<error-code>" }
```

Possible error codes: `not-found`, `method-not-allowed`, `unsupported-content-type`, `invalid-json`, `missing-required-fields`, `invalid-email`, `field-too-long`.

## CORS

- Supports `OPTIONS` preflight
- Allows `POST, OPTIONS`
- Defaults to `*`
- To lock down origin, set `CONTACT_ALLOWED_ORIGIN` in Wrangler vars

## Setup

1. Install Wrangler (if not installed):
   - `npm i -D wrangler`
2. Create D1 database:
   - `npx wrangler d1 create ceyt-contact`
3. Put the returned database ID in `worker/wrangler.toml`:
   - `database_id = "REPLACE_WITH_D1_DATABASE_ID"` (replace this placeholder)
4. Apply migration:
   - `npx wrangler d1 migrations apply ceyt-contact`
5. Optional notification secrets:
   - `npx wrangler secret put RESEND_API_KEY`
   - `npx wrangler secret put CONTACT_NOTIFY_EMAIL`
   - `npx wrangler secret put CONTACT_FROM_EMAIL` (recommended sender address)
6. Deploy:
   - `npx wrangler deploy`
7. (Optional, recommended) Generate Worker binding types:
   - `npx wrangler types`

## Next.js integration

Set this environment variable in Vercel (or your Next.js host):

- `CONTACT_WORKER_ENDPOINT=https://<your-worker-domain>/contact`

The contact Server Action posts to this endpoint.
