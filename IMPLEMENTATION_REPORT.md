# CEA-OS — Full Audit, Repair & Production-Readiness Report

## A. Repository assessment

**What it is:** Cyber Elias Academy's "Digital Operating System" — a public
marketing/admissions website plus an authenticated platform covering learning
(courses, assessments, gradebook, attendance, certificates, marketplace,
messaging) and business operations (CRM, projects, tickets, invoices, finance,
HR, inventory, procurement, facilities, marketing, admin).

**Architecture:**
- **Frontend** — `apps/web`: Next.js 15 (App Router, `force-dynamic`), React 19,
  Tailwind v4, Radix UI primitives (`packages/ui`), shared Zod validators
  (`packages/validators`).
- **Backend** — `workers/api`: a single Hono Worker exposing ~26 route modules
  under `/v1/*`, Drizzle ORM against Cloudflare D1.
- **Workers** — `workers/email` + `workers/notif`: Cloudflare Queue consumers.
- **Data** — `packages/db`: Drizzle schema (~60 tables) + D1 migrations.
- **Deploy** — Vercel (frontend) + Cloudflare Workers/D1/KV/R2/Queues (backend).

**Maturity on intake:** large surface area, mostly-scaffolded. The UI pages and
routes existed, but the **auth contract was broken end-to-end**, there was **no
wrangler config**, **two conflicting migration systems**, mock data + dead links
in the dashboard, a **stubbed email worker**, a fake contact form, and
inconsistent server-side authorization (IDOR exposure on several modules).

## B. Problems discovered (by severity)

**Critical**
1. Auth token contract mismatch — backend returned `{ token, refreshToken }`;
   frontend consumed `{ accessToken, refreshToken }`, and `/me` returned the user
   unwrapped while the client expected `{ user }`. Login/register/refresh were
   broken → `localStorage` stored the string `"undefined"`.
2. Registration always failed: `registerSchema` required `acceptTerms: true` but
   the form never sent it.
3. No `wrangler.toml` (it was git-ignored) → backend could not be deployed at all.
4. Two conflicting migration systems (Drizzle `0000` vs hand-written
   `0004–0006`) with stale `CREATE TABLE IF NOT EXISTS` duplicates.
5. Root `npm run build` failed (`packages/validators` had no `build` script).
6. Dashboard: mock courses, dead links (`/dashboard/courses/new`), malformed JSX
   nesting, and no auth guard (private dashboard rendered for signed-out users).

**High**
7. IDOR / missing authorization: `admissions`, `invoices`, `tickets`,
   `gradebook/:course`, and `marketplace` management endpoints let any
   authenticated user list/patch arbitrary records.
8. Refresh tokens were never checked against the `sessions` table (no rotation,
   no revocation on logout).
9. Hardcoded CORS allow-list + `JWT_SECRET` fallback in `@cea/config`.
10. Email worker was a stub (`// Integration will replace this`).
11. Contact form was a fake `setTimeout` "sent" state.
12. `drizzle-orm < 0.45.2` (SQL injection in escaped identifiers) and `hono`
    (CORS ReDoS) vulnerabilities.
13. Avatar uploads were stored under a private prefix → `<img>` requests (which
    carry no `Authorization` header) could never load them.
14. Course creation failed (`courses.name`/`slug` NOT NULL but the route spread
    `title`), and admissions failed FK checks (public page sent a program slug
    instead of a program id).

**Medium / Low / Informational**
- `audit` middleware read the request body *after* the handler consumed it.
- Auth endpoints had no rate limiting.
- No `.env.example`/`.dev.vars.example`, no README.
- Public course catalog is static marketing content (not read from D1).
- `SESSION_KV` binding declared but unused (sessions live in D1).
- `wrangler@3` dev warnings (`Request.cf` placeholder, compat-date fallback).

## C. Problems fixed

| Problem | Root cause | Solution | Files |
| --- | --- | --- | --- |
| Auth contract mismatch | FE/BE field-name drift | Standardized on `{ user, accessToken, refreshToken }` and `/me → { user }` | `workers/api/src/routes/auth.ts`, `apps/web/src/lib/auth-context.tsx`, `api-client.ts` |
| Registration 422 | `acceptTerms` not sent | Client sends `acceptTerms: true` + phone | `auth-context.tsx` |
| No deploy config | `wrangler.toml` git-ignored | Added wrangler configs (api/email/notif) + un-ignored | `workers/*/wrangler.toml`, `.gitignore` |
| Conflicting migrations | two migration dirs | Single `workers/api/migrations`: `0001_init.sql` (schema) + `0002_seed.sql` (idempotent roles/permissions/programs/admin) | `workers/api/migrations/*` |
| Broken build | missing script | Added `build`/`typecheck` to `packages/validators` | `packages/validators/package.json` |
| Dashboard gaps | mock/dead code | Real course fetch, removed dead links/mock, fixed JSX, added `DashboardGuard` | `dashboard/page.tsx`, `dashboard/layout.tsx`, `dashboard/guard.tsx` |
| IDOR | missing server checks | RBAC + ownership on admissions, invoices, tickets, gradebook, marketplace | multiple `workers/api/src/routes/*.ts` |
| Refresh not validated | stateless-only design | Validate against `sessions`, rotate + revoke, revoke on logout/password-reset | `auth.ts` |
| CORS/secret fallback | hardcoded | Env-driven origin allow-list; no client-side secret default | `workers/api/src/index.ts` |
| Stubbed email | placeholder | Real Resend/SendGrid delivery with logging fallback | `workers/email/src/index.ts` |
| Fake contact form | `setTimeout` | Public `POST /v1/platform/contact` → email queue (validated + rate-limited) | `platform.ts`, `contact/page.tsx` |
| Vulnerable deps | old versions | `drizzle-orm@0.45.2`, `hono@4.13.5` | package.json files |
| Broken avatars | private object prefix | `public/avatars/*` + same-origin URL | `profile/page.tsx` |
| Course/admission 500s | schema vs client drift | `title`→`name`, generated `slug`/`code`, `durationWeeks`→`durationHours`; resolve program slug→id; seeded programs catalog | `learning.ts`, `admissions.ts`, `0002_seed.sql` |
| Audit body lost | read after handler | Clone request, read body before `next()` | `middleware/audit.ts` |
| No rate limiting | missing | KV fixed-window limiter on register/login/forgot/contact | `auth.ts`, `platform.ts` |
| No docs/env templates | missing | `README.md`, `.env.example`, `.dev.vars.example` | repo root / workers |

## D. Architecture changes

- **Backend:** single Hono Worker with typed `Env` bindings
  (D1 `DB`, KV `SESSION_KV`/`CACHE_KV`, R2 `UPLOADS`, queues `EMAIL_QUEUE`/
  `NOTIF_QUEUE`), env-driven CORS, request-id header, structured error handler.
- **Auth:** 15m JWT access + 7d rotating refresh tokens persisted in D1
  `sessions` (reuse rejected, revocation on logout/reset), PBKDF2-SHA256
  password hashing, lockout after 5 failures, rate limiting.
- **Authorization:** RBAC permission catalog + `requirePermission`/`requireRole`
  middleware, ownership checks on user-scoped resources; expanded catalog with
  `admissions.read/update`.
- **Database:** D1 with a single migration path; programs catalog seeded so
  public admissions slugs resolve to real rows.
- **Storage:** native R2 binding (cross-account S3 fallback retained); public
  objects under `public/` only.
- **Queues:** email + notification consumers; notifications write to D1.
- **Frontend:** same-origin `/api/v1/*` proxy (Next.js `rewrites`) → the browser
  never hardcodes a backend host (works in dev, sandbox preview, and Vercel).
- **Deployment:** Vercel (web) + Cloudflare (workers) with CI workflows already
  present; documented in `README.md`.

## E. Features completed

- Login / registration / logout / refresh / forgot-password / reset-password
  (previously broken or absent).
- Public contact form (previously fake).
- Email delivery worker (previously a stub).
- Dashboard hub (previously mock/dead-linked/broken layout) with a signed-out
  redirect guard.
- Course creation + admissions applications (previously 500'd).
- Certificate verification (public endpoint was present; verified working).

## F. Security improvements

- Session-validated refresh token rotation + revocation.
- Server-side RBAC/ownership on admissions, invoices, tickets, gradebook,
  marketplace management endpoints.
- KV rate limiting on register/login/forgot/contact.
- Env-driven CORS (restricted in production, no wildcard).
- Path-traversal/size checks on uploads already present; verified private vs
  public access enforcement.
- Password-hash seeding replaced with a documented bootstrap admin + forced
  change guidance (no unknown hardcoded hash).
- Upgraded `drizzle-orm` (SQL injection) and `hono` (CORS ReDoS).

## G. Performance improvements

- Same-origin proxying removes per-request CORS preflight overhead.
- No new N+1 patterns introduced; existing scoped queries kept indexed on ids.
- Reduced duplicate dashboard sections/renders.

## H. Testing (actually run)

- `npm install` — clean (287 packages).
- `npm run typecheck` — **pass** (web + api).
- `npm run build` — **pass** (db, validators, web `next build`, api
  `wrangler deploy --dry-run`).
- `wrangler d1 migrations apply cea-db --local` — **pass** (135 + 59 statements).
- Live smoke tests against a local Worker + D1 (Miniflare):
  - `/v1/health` 200; register → 201 with `user/accessToken/refreshToken`.
  - login (admin + student) 200; `/me` 200; `/v1/users` admin 200 / student 403.
  - refresh rotation 200; **reused refresh token → 401**.
  - wrong password → 401 with lockout counter; forgot-password → generic 200.
  - course create 201 (name/slug/code derived); student course-create 403.
  - admissions list student 403 / admin 200; application create 201 with
    program slug resolved to real id; `/my` 200.
  - uploads: public GET 200 (no auth), private GET 401/200 (auth), traversal 422,
    unauth upload 401.
  - contact + newsletter endpoints 200/201.
- Frontend: `/`, `/login`, `/register`, `/courses`, `/apply`,
  `/forgot-password`, `/reset-password`, `/dashboard` all render 200;
  `/api/v1/*` proxy verified (`health`, `login`, `register`, `/me`, `courses`).

## I. Remaining issues (require external configuration/credentials)

- **Cloudflare resource IDs**: D1 `database_id` and KV namespace ids are
  placeholders (`REPLACE_WITH_*`) — run the documented `wrangler create` commands
  and fill them in.
- **Secrets**: `JWT_SECRET`, `RESEND_API_KEY`/`SENDGRID_API_KEY`, `EMAIL_FROM`,
  optional cross-account R2 S3 keys must be set via `wrangler secret put`.
- **Stripe / SMS / Sentry** integrations are stubbed by design (no credentials).
- **Public course catalog** is static marketing content; wiring it to a public
  read endpoint is a deliberate follow-up (the courses API is intentionally
  authenticated).
- **`SESSION_KV`** binding is reserved (sessions currently persist in D1).
- The bootstrap admin password (`Admin@CEA-2026!`) **must be changed** on first
  login.

## J. Deployment instructions

See `README.md` for step-by-step **Vercel** (build/install/output + env vars)
and **Cloudflare** (D1/KV/R2/Queues creation, secrets, migrations, deploys)
instructions. Summary:

**Vercel** — Build `cd apps/web && next build`; output `apps/web/.next`;
env `NEXT_PUBLIC_API_URL` (worker URL) + `NEXT_PUBLIC_APP_URL`.

**Cloudflare** — create D1/KV/R2/queues → fill `REPLACE_WITH_*` in
`wrangler.toml` → `wrangler secret put JWT_SECRET` (and email/R2 keys) →
`wrangler d1 migrations apply cea-db --remote` → `wrangler deploy` for
`workers/api`, `workers/email`, `workers/notif`.
