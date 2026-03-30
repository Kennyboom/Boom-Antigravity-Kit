---
description: >-
  Bulletproof Design System v2 — C4 Architecture, ADR, Database Schema,
  API Contracts, Screen Specs, State Management, Error Handling,
  Caching Strategy, and mandatory Design Coverage Audit.
  NO code writing. Design docs only.
---

# /architect — Bulletproof Design System v2.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. NO architecture without C4 Model (Level 1+2 minimum)
2. NO database without Indexing Strategy
3. NO API without Error Response Schema
4. NO state design without specifying tool + sync strategy
5. NO design without global Error Handling (8 types)
6. NO design without Caching Strategy ("cache what, how long")
7. NO architecture decision without ADR record
```

---

## Purpose

```
Plan = Know WHAT to build.
Architect = Know HOW to build it.

This command creates bulletproof technical design including
architecture, database schema, API contracts, state management,
caching, error handling — all verified by mandatory audit.
```

---

## Phase 1: Context + Component Discovery (MANDATORY)

### 1.1 Auto-Scope Detection

```
1. Read docs/specs/ → ALL features needing technical design
2. Read docs/BRIEF.md → project context
3. Read existing docs/design/ → designs already done

Report to user:
  "Found [X] features needing technical design.
   Already designed: [Y]
   Not yet designed: [Z]

   Options:
   1. Design ALL
   2. Choose specific modules
   3. Edit existing designs"
```

### 1.2 Component Discovery Engine (MANDATORY)

> ⛔ BEFORE drawing architecture, MUST list ALL components.

**Entities → DB Tables:**

```
Profile → profiles table (columns, indexes, relations)
Campaign → campaigns + campaign_profiles tables
Content → content_posts + content_scores tables
```

**Actions → API Endpoints:**

```
Create Profile → POST /api/v1/profiles
Get Profiles → GET /api/v1/profiles
Update Profile → PUT /api/v1/profiles/:id
Delete Profile → DELETE /api/v1/profiles/:id
```

**Screens → Screen Specs:**

```
Dashboard → route, components, API calls, states
Profile List → route, components, API calls, states
Create Profile → form fields, validation, submit API
```

**Output — Component Inventory Table:**

```markdown
| # | Component | Type | Feature | Status |
|---|-----------|------|---------|--------|
| 1 | profiles | DB Table | Profile | Not designed |
| 2 | POST /profiles | API | Profile | Not designed |
| 3 | Dashboard | Screen | Core | Not designed |
```

> ⛔ DO NOT proceed until user approves Component Inventory.

---

## Phase 2: C4 Architecture (Level 1-3)

```
LEVEL 1 — System Context (bird's eye view):
👤 User ──► [📱 App] ──► [💳 Stripe] / [📧 Email] / [🤖 AI]

LEVEL 2 — Container (inside app):
┌────────────── [App] ──────────────┐
│ [Frontend] ◄──► [Backend API] ◄──► [Database] │
│                 [Redis Cache]                   │
│                 [Job Queue]                     │
└─────────────────────────────────────────────────┘

LEVEL 3 — Component (inside backend):
Routes → Controllers → Services → Models
Middleware: auth, cors, rateLimit, validation
Validators: zod schemas
```

---

## Phase 3: ADR (Architecture Decision Records)

```markdown
## ADR-001: Choose [Technology/Pattern]
Date: [Date] | Status: ✅ Accepted

Context: [Problem to solve]
Decision: [What was chosen]
Rationale: [Why — 3 specific reasons]
Alternatives: [What was considered and rejected]
Consequences: [Good / Trade-offs / Risks]
```

> MANDATORY ADR for: Frontend, Backend, Database,
> Auth, Hosting, State Management, CSS Framework.

---

## Phase 4: Database Design

```
For each table:
- Name + columns + types + constraints + relationships
- Indexes (especially on FK, WHERE, ORDER BY columns)

Example:
│ users │ id UUID PK │ email UNIQUE │ name │ role ENUM │
│       │ password_hash │ created_at │ updated_at │
│ INDEX: idx_users_email, idx_users_role │
│ RELATION: users.id → orders.user_id │

Optimization Checklist:
□ FK columns indexed
□ WHERE columns indexed
□ Soft delete: deleted_at + partial index
□ Timestamps: created_at, updated_at
□ UUID primary keys (not auto-increment)
□ ENUM for fixed values (role, status)
□ JSON/JSONB for flexible data
□ Migration strategy defined
```

---

## Phase 5: API Contract Design

```
📡 POST /api/v1/auth/login
Auth: ❌ Public | Rate Limit: 5/min/IP
Request: { email: string, password: string }
200: { success: true, data: { token, user } }
401: { success: false, error: { code: "AUTH_FAILED", msg } }
422: { success: false, error: { code: "VALIDATION", details } }

API Checklist:
□ Versioning (/api/v1/)
□ Consistent envelope: { success, data, error }
□ Error codes: machine-readable (AUTH_FAILED)
□ Pagination: { data, meta: { page, total, limit } }
□ Filtering: ?status=active&sort=-created_at
□ CORS: explicit origin whitelist
```

---

## Phase 6: Screen Specs (ALL screens)

```markdown
For EACH screen:

| Attribute | Value |
|-----------|-------|
| Route | /dashboard |
| Auth | Required (User role) |
| Components | StatsCard, Chart, Table |
| API calls | GET /api/stats, GET /api/orders |
| Loading | Skeleton cards + table |
| Empty | "No data" + CTA to create |
| Error | Toast "Failed to load" + Retry |
| Responsive | Mobile: stack, Desktop: grid |
```

---

## Phase 7: User Journey (5 flows)

```
1. ONBOARDING: Landing → Sign up → Verify → First action → Dashboard
2. CORE ACTION: Dashboard → Create → Edit → Confirm → Success
3. ERROR RECOVERY: Action → Error → Message → Retry → Success
4. OFFLINE: Action → Lost connection → Queue → Reconnect → Sync
5. ACCOUNT: Profile → Settings → Billing → Delete account → Confirm
```

---

## Phase 8: State Management

```markdown
4 state types:

| Type | Tool | Examples |
|------|------|----------|
| 🌐 Server | TanStack Query | users, orders, products |
| 💻 Client | Zustand | UI state, theme, sidebar |
| 💾 Persistent | localStorage | auth token, preferences |
| 🔗 URL | searchParams | filters, pagination, tabs |

Store Slicing:
| Store | State | Actions |
|-------|-------|---------|
| authStore | user, token | login, logout, refresh |
| uiStore | theme, sidebar | toggle, setTheme |
| settingsStore | language, tz | update |
```

---

## Phase 9: Error Handling (8 types — ALL MANDATORY)

```markdown
| Error Type | Response | UI Behavior |
|------------|----------|-------------|
| Validation | 422 + details | Inline at field |
| Auth | 401 | Redirect to login |
| Permission | 403 | "No permission" page |
| Not Found | 404 | Beautiful 404 page |
| Network | No response | Toast + auto-retry |
| Server | 500 | Retry 3x with backoff |
| Rate Limit | 429 | Countdown timer |
| Business | 409/422 | Specific message |
```

---

## Phase 10: Caching + Integration Matrix

```markdown
5 cache layers:
Browser → CDN → API (TanStack) → Server (Redis) → DB

🚫 NEVER cache: auth tokens, real-time data, sensitive data

Integration Matrix:
| Source A | Source B | Protocol | Error Strategy |
|----------|---------|----------|----------------|
| Frontend | API | REST+JWT | Retry + toast |
| API | DB | ORM | Transaction rollback |
| API | Stripe | Webhook | Queue retry |
| API | AI | REST | Timeout + fallback |
```

---

## Phase 11: Design Coverage Audit (MANDATORY)

> ⛔ NO handover if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| Entity Coverage | Every entity has DB schema + indexes | ☐ |
| API Coverage | Every action has endpoint + error codes | ☐ |
| Screen Coverage | Every screen has spec (route, auth, states) | ☐ |
| Error Coverage | All 8 error types have handling defined | ☐ |
| ADR Coverage | Every tech decision has ADR | ☐ |

IF any FAIL → complete design before handover.
```

---

## Output

| Deliverable | Location |
|-------------|----------|
| Technical Design | `docs/DESIGN-{feature}.md` |

---

## After Architecture

```
🏗️ TECHNICAL DESIGN COMPLETE!
📍 File: docs/DESIGN-{feature}.md

✅ C4 Architecture (Level 1-3)
✅ ADR Records (7+ decisions documented)
✅ Database Schema + Indexes
✅ API Contracts + Error Responses
✅ Screen Specs (all screens)
✅ User Journey (5 flows)
✅ State Management (4 types)
✅ Error Handling (8 types)
✅ Caching Strategy (5 layers)
✅ Integration Matrix
✅ Design Coverage Audit: ALL PASS

Next:
1. /create — Start implementation
2. /deep-audit — Verify design logic
3. /plan — Refine plan
```
