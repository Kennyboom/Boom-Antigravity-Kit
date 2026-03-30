# Coverage Audits

> Three mandatory exit gates — Plan, Design, and Code.
> NO handover allowed if ANY audit check fails.

---

## 1. Plan Coverage Audit (4 checks)

Run before handing off from `/plan` to `/architect` or `/create`.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Feature Coverage | Every feature from brief has a spec | ☐ |
| 2 | CRUD Check | Every entity has Create/Read/Update/Delete | ☐ |
| 3 | Sub-feature Check | Every button/action has a spec | ☐ |
| 4 | Cross-cut Check | Settings, Notifications, Onboarding covered | ☐ |

**IF any check FAILS** → add missing specs before handover.

---

## 2. Design Coverage Audit (5 checks)

Run before handing off from `/architect` to `/create`.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Entity Coverage | Every entity has DB schema + indexes | ☐ |
| 2 | API Coverage | Every action has endpoint + error codes | ☐ |
| 3 | Screen Coverage | Every screen has spec (route, auth, states) | ☐ |
| 4 | Error Coverage | All 8 error types have handling defined | ☐ |
| 5 | ADR Coverage | Every tech decision has an ADR | ☐ |

**IF any check FAILS** → complete design before handover.

---

## 3. Code Coverage Audit (5 checks)

Run before marking `/create` or `/enhance` as complete.

| # | Check | Requirement | Status |
|---|-------|-------------|--------|
| 1 | Spec Coverage | 100% of spec features have code | ☐ |
| 2 | Build Clean | `npm run build` passes with 0 errors | ☐ |
| 3 | Lint Clean | `npm run lint` passes with 0 warnings | ☐ |
| 4 | States Check | Every UI component has 5 states | ☐ |
| 5 | Error Handling | Every API call has try/catch | ☐ |

**IF any check FAILS** → fix before completing task.

---

## Audit Report Format

```markdown
## ✅ [Plan/Design/Code] Coverage Audit

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | [check name] | ✅/❌ | [details] |

Result: PASS / FAIL (X/Y checks passed)
```

> 🔴 **NEVER skip audits.** They are the last line of defense
> against incomplete work.
