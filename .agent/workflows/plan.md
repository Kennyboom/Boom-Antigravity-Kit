---
description: >-
  Master Planner v4 — Feature Discovery Engine, Given/When/Then specs,
  mandatory Edge Cases, Phase Splitting, and Plan Coverage Audit.
  NO code writing. Plan files only.
---

# /plan — Master Planner v4.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. EVERY FEATURE HAS A SPEC — No code without spec
2. ACCEPTANCE CRITERIA = Given/When/Then TABLE — Specific, measurable
3. EDGE CASES MINIMUM 5 PER FEATURE — Happy path is NOT enough
4. EACH PHASE = SEPARATE FILE — No merging, no summarizing
5. EACH FEATURE MUST HAVE: User Story + AC + Edge Cases + Effort
6. UI FEATURES MUST HAVE: ASCII wireframe + States table
7. USER DECIDES SCOPE — AI suggests, user chooses
8. DEPENDENCY MATRIX AT END OF EACH PHASE — Clear build order
9. BUFFER x1.5 — Always add time buffer
10. NO CODE IN PLAN — No TypeScript/Rust/Python code blocks
```

---

## Phase 1: Context Load + Auto-Scope

```
1. Read CODEBASE.md → OS, stack, existing structure
2. Read docs/BRIEF*.md OR user request
3. Read docs/specs/ → check existing specs
4. Read .brain/ → session context if available

AFTER SCAN: Proceed automatically.
  DO NOT ask "what do you want to plan?"
  If BRIEF exists → plan everything.
  Only ask when genuinely ambiguous.
```

---

## Phase 2: Feature Discovery Engine (MANDATORY)

> ⛔ BEFORE writing User Stories, AI MUST list ALL features.

### Step 1 — Entity Decomposition

```
Every data entity → 5 CRUD operations:


Profile → Create, Read (list), Read (detail), Edit, Delete
Campaign → Create, Read, Edit, Delete, List, Report
Content → Create, Read, Edit, Delete, List, Preview
```

### Step 2 — Sub-feature Inference

```
Every feature → infer sub-features:

Profile Manager has "Create Profile" button
  → MUST plan: Create Profile Form (fields, validation)
  → MUST plan: Niche Selector (dropdown, custom input)
  → MUST plan: Avatar Upload (if applicable)
  → MUST plan: Success/Error feedback
```

### Step 3 — Cross-cutting Concerns

```
If login exists    → credentials management, password reset
If user data       → settings/preferences page
If events          → notification system
If errors          → global error handling + recovery
If new app         → onboarding/first-run experience
If multiple roles  → permission system + role management
If file uploads    → storage management + cleanup
If search          → search index + suggestions + history
```

### Step 4 — Output: Feature Inventory Table

```markdown
| # | Feature | Type | Module | Priority | Spec Status |
|---|---------|------|--------|----------|-------------|
| 1 | Create Profile | Form | Profile | P0 | Not planned |
| 2 | Profile Health | Monitor | Profile | P0 | Not planned |
```

> ⛔ DO NOT write User Stories until Feature Inventory
> is approved by user OR user says "continue".

---

## Phase 3: Spec Generation (per feature)

### 3.1 User Story (MANDATORY)

```
Format: "As [ROLE], I want [ACTION], so that [BENEFIT]"

Group by role:
- User (end user)
- Developer (maintainer)
- System (automated)
```

### 3.2 Acceptance Criteria (MANDATORY — TABLE format)

```markdown
| # | Given | When | Then |
|:-:|-------|------|------|
| 1 | [specific condition] | [specific action] | [measurable result] |

⚠️ NO vague AC allowed:
❌ "Given user login, When click, Then success"
✅ "Given user has valid account, When enters email+pass
    and clicks Login, Then redirect to /dashboard in < 2s"
```

### 3.3 Edge Cases (MANDATORY — minimum 5 per feature)

```markdown
| Case | Behavior |
|------|----------|
| Empty state: no data | Show illustration + CTA |
| Error state: network/server | Toast "Connection error" + Retry btn |
| Loading state: fetching | Skeleton shimmer |
| Max limit: exceeds X items | Warning + block action |
| Permission: no access | 403 page + "Contact admin" |
| Concurrent: 2 users edit | Optimistic lock + conflict modal |
| Offline: lost connection | Queue offline, sync when online |
```

### 3.4 UI States (MANDATORY for UI features)

```markdown
| State | UI |
|-------|-----|
| Idle | [description] |
| Loading | Skeleton shimmer |
| Success | [description] |
| Error | Toast + Retry |
| Empty | Illustration + CTA |
```

### 3.5 Processing Contract (if backend logic)

```markdown
| Input | Output | Side Effects |
|-------|--------|--------------|
| [name + simple type] | [name + simple type] | [text description] |

⚠️ NO function signatures or code blocks. Use TABLE only.
```

---

## Phase 4: Phase Splitting — SEPARATE FILES (MANDATORY)

> EACH phase = 1 file. EACH feature in phase = 1 full section.

### Directory Structure

```
docs/specs/{feature-name}/
├── SPECS-{ID}-plan.md          ← Master overview
├── phase-01-{name}.md          ← Phase detail
├── phase-02-{name}.md
└── phase-0N-{name}.md
```

### Master Spec File Template

```markdown
# SPECS-{ID}: {Feature Name}
Status: Draft

## 1. SUMMARY
## 2. OBJECTIVES
## 3. USER STORIES (table, grouped by role)
## 4. PHASES OVERVIEW (summary table)
## 5. DEPENDENCY GRAPH (ASCII diagram)
## 6. EFFORT ESTIMATION (table + buffer x1.5)
## 7. DATABASE (SQL CREATE TABLE — schema only)
## 8. MVP CUTOFF (which phases are MVP)
## 9. NEXT STEPS
```

### Phase File Template

```markdown
# Phase {XX}: {Icon} {PHASE NAME}

> **Parent:** [link to SPECS master]
> **Depends on:** [previous phase]
> **Status:** Draft | **Effort:** ⭐⭐⭐ | **Timeline:** X weeks

---

## Feature {X.1}: {Feature Name}

### Summary
[1-2 sentence description]

### User Story
As [role], I want [action], so that [benefit].

### Acceptance Criteria
| # | Given | When | Then |
|:-:|-------|------|------|
| 1 | [specific] | [specific] | [specific] |

### UI Description (MANDATORY if has interface)
[ASCII wireframe — detailed layout]

### States (MANDATORY if has UI)
| State | UI |
|-------|-----|
| Idle | [desc] |
| Loading | Skeleton shimmer |
| Success | [desc] |
| Error | Toast + Retry |
| Empty | Illustration + CTA |

### Edge Cases (MANDATORY, minimum 5)
| Case | Behavior |
|------|----------|
| [case] | [behavior] |

### Dependencies
- Requires [feature X.Y] first

### Effort: ⭐⭐ | Timeline: X days

---

## Dependency Matrix (end of each phase file)

| Feature | Depends On | Required By |
|---------|-----------|-------------|
| X.1 | [deps] | [dependents] |

Build order: X.1 → X.2 + X.3 (parallel) → X.4

## Total Effort Phase {XX}

| Feature | Effort | Timeline |
|---------|--------|----------|
| X.1 | ⭐⭐ | X days |
| TOTAL | | ~X days |
| + Buffer x1.5 | | ~X days |
```

---

## Phase 5: Dependency Mapping

```
Each feature must specify (IN PHASE FILE):
□ Prerequisite features
□ Required libraries
□ Required APIs (internal / external)
□ Required data models (tables, schemas)
□ Required services (auth, email, payment)

Cross-phase dependencies:
Phase 01 → Phase 02 → Phase 03
(Foundation)  (Core)     (Polish)

□ No circular dependencies
□ Each phase can demo independently
□ Critical path highlighted
```

---

## Phase 6: Effort Estimation

```markdown
| Phase | Features | Raw Days | + Buffer | Priority |
|:-----:|:--------:|:--------:|:--------:|:--------:|
| 01 | X | X days | X days | 🔴 MVP |
| 02 | X | X days | X days | 🔴 MVP |
| 03 | X | X days | X days | 🟡 P1 |
| 04 | X | X days | X days | 🟢 P2 |
| TOTAL | X | X days | X days | |

MVP = Phase [01+02]: ~X days (~X months with buffer)

⚠️ Buffer x1.5 ALWAYS APPLIED
```

---

## Phase 7: Plan Coverage Audit (MANDATORY)

> ⛔ NO handover if coverage audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| Feature Coverage | Every feature from BRIEF is planned | ☐ |
| CRUD Check | Every entity has C/R/U/D specs | ☐ |
| Sub-feature Check | Every button/action has spec | ☐ |
| Cross-cut Check | Settings, Notifications, Onboarding | ☐ |

IF any FAIL → add missing specs before handover.
```

### Completion Checklist

```
□ Master spec file has full overview?
□ Each phase split into separate file?
□ Each feature has Given/When/Then TABLE?
□ Each feature has Edge Cases TABLE (≥ 5)?
□ UI features have ASCII wireframe?
□ UI features have States table?
□ Each phase has Dependency Matrix?
□ Each phase has Effort table + buffer?
□ Cross-phase dependency graph?
□ MVP cutoff clearly defined?
□ NO code blocks in plan files?
□ Processing contracts use tables, not code?
```

---

## Output

| Deliverable | Location |
|-------------|----------|
| Master Spec | `docs/specs/{feature}/SPECS-{ID}-plan.md` |
| Phase Files | `docs/specs/{feature}/phase-{NN}-{name}.md` |

---

## After Planning

```
✅ PLAN COMPLETE!

📍 Specs: docs/specs/{feature}/
✅ [N] features planned
✅ [M] acceptance criteria (Given/When/Then)
✅ [P] edge cases covered
✅ [Q] phases — EACH PHASE SEPARATE FILE
✅ Dependency graph + matrix per phase
✅ Effort estimation with x1.5 buffer

Next:
1. /architect — Technical design (recommended)
2. /create — Start implementation
3. /brainstorm — Explore more ideas
```
