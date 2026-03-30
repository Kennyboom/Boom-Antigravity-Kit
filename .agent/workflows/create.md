---
description: Implementation workflow with Anti-Skip Protocol, Code Blueprint, Build Verify Loop, and Code Coverage Audit. Prevents feature omission.
---

# /create - Build Application (Anti-Skip Enforced)

$ARGUMENTS

---

## Purpose

Implementation workflow that builds applications with zero feature
omissions. Uses Code Blueprint for tracking, Anti-Skip Protocol
for verification, and Coverage Audit for completion gate.

---

## 🔴 CRITICAL RULES

1. **Blueprint BEFORE code** — No coding without approved Blueprint
2. **One feature at a time** — Complete A before starting B
3. **Build verify after EACH feature** — `npm run build` + `npm run lint`
4. **5 UI States MANDATORY** — See `rules/5-ui-states.md`
5. **Coverage Audit before completion** — See `rules/coverage-audits.md`

---

## Workflow

### Phase 1: Understand

```
1. Load project state:
   python .agent/scripts/session_manager.py info

2. Read plan file (docs/PLAN-*.md) OR user request
3. Read DESIGN file (docs/DESIGN-*.md) if exists
4. Identify all features to implement

5. Run Feature Discovery (if no plan exists):
   Read: rules/feature-discovery.md
   - Entity Decomposition → CRUD
   - Sub-feature Inference
   - Cross-cutting Concerns
   Output: Feature Inventory → USER APPROVE
```

---

### Phase 2: Code Blueprint (MANDATORY)

> ⛔ **NO CODE until user approves Blueprint.**

Create and present Blueprint:

```markdown
## Code Blueprint

### 1. Spec→Code Map
| # | Feature | File(s) | Action | Status | Build |
|---|---------|---------|--------|--------|-------|
| 1 | [feature] | [file.tsx] | NEW | ☐ | — |
| 2 | [feature] | [utils.ts] | MODIFY | ☐ | — |

### 2. Edge Cases (≥3 per feature)
| Feature | Edge Case | Handling |
|---------|-----------|----------|
| [feature] | [case] | [behavior] |

### 3. Dependencies
- Libraries to install
- API endpoints needed
```

> User MUST reply "OK" or "Approved" before Phase 3.

---

### Phase 3: Code (Anti-Skip Enforced)

> 🔴 **Read** `rules/anti-skip.md` **before coding.**

#### 3.1 Anti-Skip Protocol

```
Feature Counting Guard:
  spec_features == blueprint_items → proceed
  spec_features ≠ blueprint_items → STOP

7-Layer Analysis (per feature):
  □ UI Layout | □ Core Logic | □ Error Handling | □ Edge Cases

Progressive Verification:
  Every 3-5 features → STOP → cross-check Blueprint
```

#### 3.2 Build Verify Loop (after EACH feature)

```
After EACH feature:
1. npm run build → 0 errors
2. npm run lint → 0 warnings
3. Update Blueprint: ☐ → ☑
4. Report: "📊 X/Y features (Z%)"

IF FAIL → fix IMMEDIATELY before next feature
```

#### 3.3 UI Implementation

> 🔴 **Read** `rules/5-ui-states.md`

```
5 UI States (EVERY component with data):
□ IDLE | □ LOADING | □ SUCCESS | □ ERROR | □ EMPTY
```

#### 3.4 Production Patterns

```
□ Error Boundary — catch render errors
□ Input validation — client + server
□ Optimistic updates — instant UI feedback
□ Debounce/throttle — search, scroll, resize
```

---

### Phase 4: Code Coverage Audit (MANDATORY)

> ⛔ **DO NOT complete task if audit FAILS.**

```
| Check | Requirement | Status |
|-------|-------------|--------|
| Spec Coverage | 100% spec features have code | ☐ |
| Build Clean | npm run build: 0 errors | ☐ |
| Lint Clean | npm run lint: 0 warnings | ☐ |
| States Check | 5 states per UI component | ☐ |
| Error Handling | try/catch per API call | ☐ |

IF any FAIL → fix before completing.
```

---

### Phase 5: Preview + Handover

```
1. Start server: npm run dev
2. Present URL to user
3. Report results
```

---

## 🔴 GOLDEN RULES

```
1. BLUEPRINT FIRST — No code without approved Blueprint
2. NEVER SKIP FEATURES — Every spec line = must have code
3. BUILD VERIFY AFTER EACH FEATURE — 0 errors, 0 warnings
4. 5 UI STATES — Every data component has 5 states
5. ASK FOR BIG CHANGES — DB/folder/lib → ask first
```
