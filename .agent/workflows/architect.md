---
description: Technical architecture design with C4, ADR, DB schema, API contracts, and Design Coverage Audit. Creates DESIGN.md before implementation.
---

# /architect - Technical Design

$ARGUMENTS

---

## Purpose

Plan = Know WHAT to build.
**Architect = Know HOW to build it.**

This command creates detailed technical design including architecture,
database schema, API contracts, and state management — all verified
by a mandatory Design Coverage Audit.

---

## 🔴 CRITICAL RULES

1. **NO CODE WRITING** — This command creates design docs only
2. **Use solution-architect agent** — `.agent/agents/solution-architect.md`
3. **Component Discovery MANDATORY** — List ALL components first
4. **Coverage Audit MANDATORY** — See `rules/coverage-audits.md`
5. **ADR for every tech decision** — No silent choices

---

## Workflow

### Phase 1: Context + Component Discovery

```
1. Read plan file (from /plan) → Extract all features
2. Read existing code → Understand current architecture

Component Discovery:
- Entities → DB Tables (columns, indexes, relations)
- Actions → API Endpoints (method, path, auth)
- Screens → Screen Specs (route, components, states)

Output: Component Inventory Table → USER APPROVE
```

| # | Component | Type | Feature | Status |
|---|-----------|------|---------|--------|
| 1 | profiles | DB Table | Profile | Not designed |
| 2 | POST /profiles | API | Profile | Not designed |
| 3 | Dashboard | Screen Spec | Core | Not designed |

> ⛔ **DO NOT proceed until user approves Component Inventory.**

---

### Phase 2: C4 Architecture (Level 1-3)

```
LEVEL 1 — System Context:
👤 User ──► [📱 App] ──► [💳 Stripe] / [📧 Email] / [🤖 AI]

LEVEL 2 — Container:
┌────────────── [App] ──────────────┐
│ [Frontend] ◄──► [API] ◄──► [DB]  │
│               [Cache]             │
│               [Queue]             │
└───────────────────────────────────┘

LEVEL 3 — Component:
Routes → Controllers → Services → Models
Middleware: auth, cors, rateLimit, validation
```

---

### Phase 3: ADR (Architecture Decision Records)

```markdown
## ADR-001: Choose [Technology/Pattern]
Date: [Date] | Status: ✅ Accepted

Context: [Problem to solve]
Decision: [What was chosen]
Rationale: [Why — 3 reasons]
Alternatives: [What was considered]
Consequences: [Good / Trade-off / Risk]
```

> 🔴 **MANDATORY ADR for:** Frontend, Backend, Database,
> Auth, Hosting, State Management, CSS framework.

---

### Phase 4: Database Design

```
For each table:
- Name + columns + types + constraints
- Relationships (FK)
- Indexes (especially on FK, WHERE, ORDER BY columns)

Optimization Checklist:
□ FK columns indexed
□ WHERE columns indexed
□ Soft delete: deleted_at + partial index
□ Timestamps: created_at, updated_at
□ UUID primary keys
□ ENUM for fixed values (role, status)
□ Migration strategy defined
```

---

### Phase 5: API Contract Design

```
📡 POST /api/v1/auth/login
Auth: ❌ Public | Rate Limit: 5/min/IP
Request: { email: string, password: string }
200: { success: true, data: { token, user } }
401: { success: false, error: { code: "AUTH_FAILED", message } }
422: { success: false, error: { code: "VALIDATION", details: [] } }

API Checklist:
□ Versioning (/api/v1/)
□ Consistent envelope: { success, data, error }
□ Error codes: machine-readable (AUTH_FAILED)
□ Pagination: { data, meta: { page, total, limit } }
□ CORS: explicit origin whitelist
```

---

### Phase 6: Screen Specs

```
For each screen:
| Attribute | Value |
|-----------|-------|
| Route | /dashboard |
| Auth | Required (User role) |
| Components | StatsCard, Chart, Table |
| API calls | GET /api/stats, GET /api/orders |
| Loading | Skeleton cards + table |
| Empty | "No data" + CTA |
| Error | Toast "Failed to load" + Retry |
| Responsive | Mobile: stack, Desktop: grid |
```

---

### Phase 7: State Management

```
4 state types:
| Type | Tool | Examples |
|------|------|----------|
| 🌐 Server | TanStack Query | users, orders |
| 💻 Client | Zustand | UI state, theme |
| 💾 Persistent | localStorage | auth token, prefs |
| 🔗 URL | searchParams | filters, pagination |
```

---

### Phase 8: Error Handling (8 types)

```
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

### Phase 9: Caching + Integration Matrix

```
5 cache layers:
Browser → CDN → API (TanStack) → Server (Redis) → DB

Integration Matrix:
| Source A | Source B | Protocol | Error Strategy |
|----------|---------|----------|----------------|
| Frontend | API | REST+JWT | Retry + toast |
| API | DB | ORM | Transaction rollback |
| API | Stripe | Webhook | Queue retry |
```

---

### Phase 10: Design Coverage Audit (MANDATORY)

```
Load: rules/coverage-audits.md → Design Coverage Audit

□ Entity Coverage: Every entity has DB schema + indexes
□ API Coverage: Every action has endpoint + error codes
□ Screen Coverage: Every screen has spec
□ Error Coverage: All 8 error types handled
□ ADR Coverage: Every tech decision has ADR

IF any FAIL → complete design before handover
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

Next:
1. /create — Start implementation
2. /plan — Refine plan
```
