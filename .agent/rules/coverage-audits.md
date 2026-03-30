# Coverage Audits v2.0

> Four mandatory exit gates — Plan, Design, Code, and Deep Audit.
> NO handover allowed if ANY audit check fails.

---

## 1. Plan Coverage Audit (5 checks)

Run before handing off from `/plan` to `/architect` or `/create`.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Feature Coverage | Every feature from brief has a spec | ☐ |
| 2 | CRUD Check | Every entity has Create/Read/Update/Delete | ☐ |
| 3 | Sub-feature Check | Every button/action has a spec | ☐ |
| 4 | Cross-cut Check | Settings, Notifications, Onboarding covered | ☐ |
| 5 | AC Check | Every feature has Given/When/Then table | ☐ |

**IF any check FAILS** → add missing specs before handover.

---

## 2. Design Coverage Audit (6 checks)

Run before handing off from `/architect` to `/create`.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Entity Coverage | Every entity has DB schema + indexes | ☐ |
| 2 | API Coverage | Every action has endpoint + error codes | ☐ |
| 3 | Screen Coverage | Every screen has spec (route, auth, states) | ☐ |
| 4 | Error Coverage | All 8 error types have handling defined | ☐ |
| 5 | ADR Coverage | Every tech decision has an ADR | ☐ |
| 6 | State Coverage | Every data store has tool + sync strategy | ☐ |

**IF any check FAILS** → complete design before handover.

---

## 3. Code Coverage Audit (7 checks)

Run before marking `/create` or `/enhance` as complete.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Spec Coverage | 100% of spec features have code | ☐ |
| 2 | Build Clean | `npm run build` passes with 0 errors | ☐ |
| 3 | Lint Clean | `npm run lint` passes with 0 warnings | ☐ |
| 4 | Type Clean | `npx tsc --noEmit` passes with 0 errors | ☐ |
| 5 | States Check | Every UI component has 5 states | ☐ |
| 6 | Error Handling | Every API call has try/catch | ☐ |
| 7 | File Size | Every file ≤ 300 lines | ☐ |

**IF any check FAILS** → fix before completing task.

---

## 4. Deep Audit Gate (10 dimensions)

Run via `/deep-audit` before major releases.

| # | Dimension | What to Verify | Status |
|---|-----------|----------------|--------|
| 1 | Data Flow | Input → Output trace, format match | ☐ |
| 2 | Timing | Parallel process sync, delta handling | ☐ |
| 3 | Crash Recovery | Kill -9 → detect → recover → user sees | ☐ |
| 4 | Cross-Module | Module A ↔ B data format consistency | ☐ |
| 5 | Resources | VRAM/RAM/CPU/Disk — specific numbers | ☐ |
| 6 | Naming | Cross-file naming consistency | ☐ |
| 7 | Security | Auth, encryption, isolation, validation | ☐ |
| 8 | Test Coverage | Happy + error + edge + performance | ☐ |
| 9 | Spec Complete | User story + AC + edge cases + errors | ☐ |
| 10 | Architecture | C4 ↔ Schema ↔ API ↔ ADR consistency | ☐ |

**IF any dimension scores < 6/10** → fix before release.

---

## Audit Report Format

```markdown
## ✅ [Plan/Design/Code/Deep] Coverage Audit

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | [check name] | ✅/❌ | [details] |

Result: PASS / FAIL (X/Y checks passed)
```

---

## Audit Chaining (Recommended Flow)

```
/plan → Plan Audit → /architect → Design Audit →
/create → Code Audit → /deep-audit → Deep Audit Gate →
RELEASE

Each gate MUST PASS before proceeding to next stage.
```

> 🔴 NEVER skip audits. They are the last line of defense
> against incomplete work.
