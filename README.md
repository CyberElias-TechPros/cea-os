# Cyber Elias Academy — Digital Operating System (CEA-OS)

A monorepo application for Cyber Elias Academy: a public marketing/admissions site
plus an authenticated **learning + business-operations (ERP) platform** for
students, staff, instructors, employers, and external portal users.

## Architecture

```
┌──────────────┐   HTTPS    ┌───────────────────┐      ┌─────────┐ D1 (relational)
│   VERCEL     │ ─────────► │ CLOUDFLARE WORKERS │ ───► │  R2     │ object storage
│ Next.js web  │   /v1/*    │ Hono API (cea-api) │      │  KV     │ cache/rate-limit
└──────────────┘            │ email/notif queues │      │ Queues  │ email/notifications
                            └───────────────────┘      └─────────┘
```

| Component | Path | Tech | Deploy target |
| --------- | ---- | ---- | ------------- |
| Web frontend | `apps/web` | Next.js 15 (App Router), React 19, Tailwind v4 | Vercel |
| API | `workers/api` | Hono + Drizzle ORM on Workers | Cloudflare Workers |
| Email consumer | `workers/email` | Cloudflare Queues consumer | Cloudflare Workers |
| Notification consumer | `workers/notif` | Cloudflare Queues consumer (D1 writes) | Cloudflare Workers |
| Database schema | `packages/db` | Drizzle schema + migrations | Cloudflare D1 |
| UI kit | `packages/ui` | Radix + Tailwind primitives | — (bundled) |
| Validation | `packages/validators` | Zod schemas shared FE/BE | — |
| Config | `packages/config` | env-driven config | — |

## Local development

```bash
npm install

# 1. Start the API worker (uses a local, simulated D1/KV/R2 via Miniflare)
cp workers/api/.dev.vars.example workers/api/.dev.vars
#    ^ set JWT_SECRET to any long random string for local dev
cd workers/api
npx wrangler d1 migrations apply cea-db --local   # create + seed local D1
npx wrangler dev --local --port 8787

# 2. Start the web app (separate terminal)
cd apps/web
NEXT_PUBLIC_API_URL=http://localhost:8787 npx next dev --port 3000
```

### Bootstrap admin account

The seed migration creates `admin@cea.academy` with password `Admin@CEA-2026!`.
**Change this password immediately after first login** (Dashboard → Profile).

## Scripts

```bash
npm run typecheck   # tsc across web + api
npm run build       # db + validators + web + api (wrangler --dry-run)
npm run lint        # web + api
npm run db:generate # regenerate Drizzle migration from schema
```

## Deploy to Cloudflare (backend)

1. Create resources (once):
   ```bash
   cd workers/api
   npx wrangler d1 create cea-db                 # → database_id
   npx wrangler kv namespace create SESSION_KV   # → id
   npx wrangler kv namespace create CACHE_KV     # → id
   npx wrangler r2 bucket create cea-uploads
   npx wrangler queues create cea-email-queue
   npx wrangler queues create cea-notif-queue
   ```
2. Fill the `REPLACE_WITH_*` placeholders in `workers/api/wrangler.toml`,
   `workers/notif/wrangler.toml`.
3. Set secrets:
   ```bash
   cd workers/api
   npx wrangler secret put JWT_SECRET            # openssl rand -base64 64
   npx wrangler secret put CONTACT_EMAIL         # optional
   # cross-account R2 (optional — native binding is preferred):
   npx wrangler secret put R2_ACCOUNT_ID
   npx wrangler secret put R2_ACCESS_KEY_ID
   npx wrangler secret put R2_SECRET_ACCESS_KEY
   cd ../email
   npx wrangler secret put RESEND_API_KEY        # or SENDGRID_API_KEY
   npx wrangler secret put EMAIL_FROM
   ```
4. Apply migrations & deploy:
   ```bash
   cd workers/api && npx wrangler d1 migrations apply cea-db --remote
   npx wrangler deploy
   cd ../email && npx wrangler deploy
   cd ../notif && npx wrangler deploy
   ```

## Deploy to Vercel (frontend)

1. Import the repo (root `apps/web` is the Next.js app; Vercel auto-detects).
2. Configure **Build Command**: `cd apps/web && next build`, **Install Command**:
   `npm install`, **Output Directory**: `apps/web/.next`.
3. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://<your-worker>.<subdomain>.workers.dev
   NEXT_PUBLIC_APP_URL=https://<your-vercel-domain>
   ```
4. Add the Vercel production URL to the API worker's `ALLOWED_ORIGINS` var
   (comma-separated) so CORS permits the browser requests.

## Environment variables

See `.env.example` (web) and the `*.dev.vars.example` files (workers) for the
full list. **Never commit secrets** — use `wrangler secret` on Cloudflare and
Vercel's environment settings on the frontend.

## Security notes

- Passwords are hashed with PBKDF2-SHA256 (300k iterations is configurable in
  `workers/api/src/lib/password.ts`; the shipped default is 30k for Worker CPU
  limits).
- Access tokens are 15-minute JWTs; refresh tokens are 7-day rotating tokens
  validated against the `sessions` table (reuse is rejected).
- Authorization is enforced server-side via the RBAC permission catalog
  (`workers/api/src/lib/permissions.ts`) and per-route ownership checks.
- Uploads are size-limited (25 MB), path-traversal protected, and private
  objects require authentication (`public/` prefix is publicly readable).
- Auth endpoints are rate-limited via KV.
