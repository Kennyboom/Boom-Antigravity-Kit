---
description: Create project plan with Feature Discovery Engine. No code writing — only plan file generation with mandatory coverage audits.
---

# /plan - Project Planning Mode

$ARGUMENTS

---

## 🔴 CRITICAL RULES

1. **NO CODE WRITING** — This command creates plan files only
2. **Use project-planner agent** — Load `.agent/agents/project-planner.md`
3. **Feature Discovery MANDATORY** — See `rules/feature-discovery.md`
4. **Coverage Audit MANDATORY** — See `rules/coverage-audits.md`
5. **Dynamic Naming** — Plan file named based on task

---

## Workflow

### Phase 1: Context Check
```
1. Read CODEBASE.md → Check OS, stack, existing structure
2. Read existing plan files in project root
3. Read .brain/ → session context if available
4. If unclear → Ask 1-2 clarifying questions
```

### Phase 2: Feature Discovery (MANDATORY)
```
Load: rules/feature-discovery.md

1. Entity Decomposition → CRUD for each entity
2. Sub-feature Inference → Button → Form → Validation
3. Cross-cutting Concerns → Login → Credentials etc.
4. Output: Feature Inventory Table → USER APPROVE
```

> ⛔ **DO NOT proceed to Phase 3 until user approves
> Feature Inventory.**

### Phase 3: Spec Generation
```
For EACH feature in approved inventory:

1. User Story: "As [role], I want [action], so that [benefit]"

2. Acceptance Criteria (Given/When/Then TABLE):
   | # | Given | When | Then |
   |---|-------|------|------|
   | 1 | [specific condition] | [specific action] | [measurable result] |

3. Edge Cases TABLE (minimum 5 per feature):
   | Case | Behavior |
   |------|----------|
   | Empty state | Show illustration + CTA |
   | Error state | Toast + Retry button |
   | Loading state | Skeleton shimmer |

4. UI States (if has UI):
   | State | UI |
   |-------|-----|
   | Idle | [description] |
   | Loading | Skeleton shimmer |
   | Success | [description] |
   | Error | Toast + Retry |
   | Empty | Illustration + CTA |
```

### Phase 4: Phase Splitting
```
Group features into phases:
- Phase 01: Foundation (DB, Auth, Core setup)
- Phase 02: Core Features (Main functionality)
- Phase 03: Polish (UI refinements, optimizations)
```

### Phase 5: Effort Estimation
```
| Phase | Features | Raw Estimate | + Buffer (x1.5) | Priority |
|-------|----------|-------------|-----------------|----------|
| 01 | X | X days | X days | 🔴 MVP |
| 02 | X | X days | X days | 🟡 P1 |
```

### Phase 6: Plan Coverage Audit (MANDATORY)
```
Load: rules/coverage-audits.md → Plan Coverage Audit

□ Feature Coverage: Every feature from brief has spec
□ CRUD Check: Every entity has C/R/U/D specs
□ Sub-feature Check: Every button/action has spec
□ Cross-cut Check: Settings, Notifications, Onboarding

IF any FAIL → add missing specs before handover
```

---

## Output

| Deliverable | Location |
|-------------|----------|
| Project Plan | `docs/PLAN-{task-slug}.md` |

---

## After Planning

```
✅ Plan created: docs/PLAN-{slug}.md

Next steps:
1. /architect — Technical design (recommended)
2. /create — Start implementation
3. /brainstorm — Explore more ideas
```

---

## Naming Examples

| Request | Plan File |
|---------|-----------|
| `/plan e-commerce cart` | `docs/PLAN-ecommerce-cart.md` |
| `/plan mobile fitness app` | `docs/PLAN-fitness-app.md` |
