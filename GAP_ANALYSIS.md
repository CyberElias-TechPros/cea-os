# CEA-OS Gap Analysis — Spec (.md files) vs. Built App

Generated from `CEA_OS_MASTER_PLAN.md`, `CEA_OS_GRAND_MASTER_PLAN_P1-P3.md`, `CEA_OS_DESIGN_LANGUAGE.md`, and all 32 `plan-actors/*.md` files.

## Built so far

**Public:** `/` `/about` `/blog` `/courses` `/courses/[slug]` `/contact` `/faq` `/help` `/login` `/register` `/privacy` `/terms` `/learn` `/learn/[id]` `/visit`

**Dashboard:** hub + 19 sections — accounts, admissions, alumni, analytics, clients, community, courses, employer, hr, inventory, invoices, jobs, notifications, portfolio, procurement, projects, tickets

**API (workers/api):** 26 route modules — admissions, alumni, analytics, assessments, assignments, attendance, auth, certificates, community, contracts, crm, finance, gradebook, hr, inventory, invoices, learning, marketplace, messaging, notifications, portfolio, procurement, projects, tickets, users, visitors

---

## Tier 1 — Public site (drives admissions)

| Missing page | Spec ref |
|---|---|
| **Application Hub** — multi-step apply (personal→academic→program→documents→financial→review), doc upload, status tracker, accept/decline offer | MP §1.1; actor 01 (6-step form, 14-day acceptance window) |
| **Scholarship catalog + eligibility estimator** (5 types, stackable up to 100%) | MP §1.1 journey #2; actor 01 (`POST /api/scholarships/estimate`) |
| **Public certificate verification** (enter code → verified badge) | P2 §5.4, §6.2; actor 02 |
| **Course comparison tool** (side-by-side, max 4) | MP §1.1; actor 01 |
| **Public community forums (read)** | MP §1.1 modules & permissions |
| **Alumni spotlight page** (success stories) | MP §1.15 |
| **Employer brand page** (public company profile) | MP §1.11; actor 11 |
| **Newsletter signup + lead capture** | actor 01, 21 |
| **Virtual 360° campus tour** | actor 01 (unique) |
| Visit page QR check-in flow | MP §1.16; actor 16 |

## Tier 2 — Student portal (APIs exist, no UI pages)

APIs built: assessments, assignments, attendance, gradebook, certificates, marketplace, messaging, learning — students have no pages:

- Assessment/exam portal (timed, shuffle, attempts, auto-submit) — MP §1.2
- Assignment submission (file dropzone, late penalties) — MP §1.2
- Gradebook view (scores, distribution, what-if GPA) — MP §1.2; actor 02
- Attendance (QR check-in + history) — MP §1.2
- Certificates page (PDF download, share, verify) — MP §1.2
- Marketplace (freelance gigs, mentor sessions, digital products) — MP §1.2
- Messaging (DMs, group chats, read receipts) — MP §1.2; P1 §1.2
- Calendar (class schedule, deadlines, events, mentor sessions) — MP §1.2; no API either
- Student finance (tuition payments, receipts, pay online) — MP §1.2
- Transcript (verified PDF) — P3 §12.3
- Profile/settings (prefs, notification quiet hours) — P3 §9.3
- AI course recommendations UI — MP §2.2 module 42

## Tier 3 — Career & mentorship

- CV/resume generator — MP §2.3 Phase 2
- Mentorship module (request/accept, sessions, goals, readiness score) — actor 05 (2,630-line spec)
- Employer depth: pipeline kanban, interview scheduling, feedback, offers — actor 11
- Alumni network directory (connect, message) + donations + events RSVP — MP §1.15; actor 15

## Tier 4 — Staff/ERP

| Module | Missing |
|---|---|
| Finance | Payroll+payslips, budgets, bank reconciliation, expense claims, chart of accounts, P&L, hash-chained audit log (actor 18) |
| HR | Recruitment, employee DB, staff attendance, performance/OKRs, training, onboarding checklists, self-service (actor 19) |
| Admissions depth | Scoring rubric review, interview scheduling + .ics, offer/rejection letters (PDF→R2), doc verification queue, enrollment funnel (actor 20) |
| Facilities/Ops | Room booking, work orders w/ SLAs, maintenance, branches, workflow builder (MP §1.8; actor 08) |
| Front desk | Visitor management/badges, appointments, inquiry log, phone log, delivery log, directory (MP §1.7; actor 07) |
| IT support | Asset tracking, monitoring, remote sessions, KB (MP §1.22; actor 22) |
| System admin | RBAC tree, security (2FA/API keys), audit viewer, config, backups, integrations, logs (MP §1.24; actor 24) |
| Developer hub | API playground, deployments, git status, monitoring (MP §1.23; actor 23) |
| Marketing | Campaigns, content calendar, email marketing, lead scoring, SEO, social (MP §1.21; actors 21, 27–30) |
| Executive | Command center, OKRs, approvals (MP §1.9; actor 09) |
| Department head | Curriculum manager, instructor mgmt, QA, approvals (MP §1.6; actor 06) |
| Client self-service | Proposals, e-sign, document vault, pay invoices (MP §1.10; actor 10) |

## Tier 5 — External portals (0% built)

- Supplier (POs, deliveries, invoices) — MP §1.17; actor 17
- Partner (agreements, referrals, payouts) — MP §1.12; actor 12
- Volunteer (opportunities, hours) — MP §1.13; actor 13
- Intern (tasks, timesheet, evaluations) — MP §1.14; actor 14
- NGO (scholarship funds, volunteers, impact) — MP §1.26; actor 26
- Government compliance (read-only) — MP §1.25; actor 25
- Parent (ward progress, fees, meetings) — MP §1.3; actor 03

## Tier 6 — Platform features

- Live classes (video+chat+whiteboard+polls) — P2 §5.4
- Events module (register, QR check-in, waitlists) — P1 §3.2
- Stripe payments/receipts/refunds — P1 §3.2
- Command palette (Cmd+K), onboarding tour — P2 §5.3
- Email/SMS/push infra — P3 §9.1
- Report builder + scheduled exports — P3 §12.3
- AI: teaching assistant, content gen, plagiarism, predictive at-risk — MP §2.2 modules 41–45
- Calendar sync, e-sign, webhooks — MP §2.4

---

## Implementation order (priority)

1. Tier 1 public pages (Application Hub, scholarships, verification, comparison, newsletter)
2. Tier 2 student pages (8 APIs already built — wire them)
3. Tier 3 career (mentorship, CV, alumni)
4. Tier 4 staff depth (finance payroll/budgets, HR)
5. Tier 5 external portals
6. Tier 6 platform features
