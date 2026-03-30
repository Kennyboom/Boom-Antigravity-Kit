# Antigravity Kit V3.5 — Architecture

> Checklist-Driven Engineering System with BWF Quality Gates

---

## Pipeline

```
/plan → /architect → /create → /deep-audit → RELEASE
  │         │           │           │
  ▼         ▼           ▼           ▼
Plan      Design      Code        Deep
Coverage  Coverage    Coverage    Audit
Audit     Audit       Audit       Gate
(5 chk)   (6 chk)     (7 chk)     (10 dim)
```

---

## Directory Structure

```
.agent/
├── ARCHITECTURE.md        ← This file
├── mcp_config.json
│
├── rules/                 ← Quality enforcement
│   ├── anti-skip.md       ← v2.0: Context isolation, file budgets
│   ├── 5-ui-states.md     ← v1.0: Idle/Loading/Success/Error/Empty
│   ├── coverage-audits.md ← v2.0: 4 gates (plan/design/code/deep)
│   ├── feature-discovery.md ← v2.0: Entity/Sub/Cross/Nav inference
│   └── code-discipline.md ← NEW: File limits, naming, patterns
│
├── workflows/             ← Execution pipelines
│   ├── plan.md            ← v4.0: Master Planner (BWF)
│   ├── architect.md       ← v2.0: Bulletproof Design System (BWF)
│   ├── create.md          ← v3.0: Universal Coder + Anti-Skip (BWF)
│   ├── deep-audit.md      ← NEW v2.0: Ruthless Inspector (BWF)
│   ├── enhance.md         ← v1.5: Enhancement workflow
│   ├── debug.md           ← v1.0: Debugging workflow
│   ├── brainstorm.md      ← v1.0: Ideation workflow
│   ├── deploy.md          ← v1.0: Deployment workflow
│   ├── test.md            ← v1.0: Testing workflow
│   ├── save.md            ← v1.0: Context persistence
│   ├── recap.md           ← v1.0: Context restoration
│   ├── preview.md         ← v1.0: Preview workflow
│   ├── status.md          ← v1.0: Status check
│   ├── orchestrate.md     ← v1.0: Multi-agent orchestration
│   └── ui-ux-pro-max.md   ← v1.0: Premium UI design
│
├── agents/                ← Role specifications
│   ├── solution-architect.md
│   ├── project-planner.md
│   ├── tech-lead.md
│   ├── frontend-specialist.md
│   ├── backend-specialist.md
│   ├── database-architect.md
│   ├── security-auditor.md
│   ├── devops-engineer.md
│   └── performance-engineer.md
│
├── scripts/               ← Automation tools
│   ├── verify_all.py
│   └── session_manager.py
│
├── skills/                ← Domain expertise modules
│   └── [35+ skill modules]
│
└── .shared/               ← Cross-cutting resources
    └── design-thinking/
        └── design-philosophy.md
```

---

## V3.5 Changelog (vs V3.0)

### Workflows

| File | Version | Changes |
|------|---------|---------|
| plan.md | v3→v4 | Phase Splitting into separate files, Processing Contract tables, expanded Phase template, Completion Checklist |
| architect.md | v1→v2 | 7 Golden Rules, User Journey (5 flows), State Management (4 types), Integration Matrix |
| create.md | v1→v3 | 4 Coding Principles, File Size Budget in Blueprint, Phase Detection, No-TODO enforcement |
| deep-audit.md | NEW v2 | 12 Iron Rules, 10 Audit Dimensions, Scope Census, Session Calculator, Scoring Matrix |

### Rules

| File | Version | Changes |
|------|---------|---------|
| anti-skip.md | v1→v2 | Context Isolation Protocol (50-100KB limit), File Size Discipline, No-TODO Protocol, TypeScript verify |
| feature-discovery.md | v1→v2 | Navigation & Layout Inference (Step 4), expanded to 12 sub-feature patterns, Common Omissions Checklist |
| coverage-audits.md | v1→v2 | 4th gate (Deep Audit), AC Check in Plan audit, State Coverage in Design audit, File Size in Code audit |
| code-discipline.md | NEW | File limits (300 lines), function limits (25 lines), naming conventions, split strategy |

---

## Quality Gates Summary

| Gate | When | Checks | Min to Pass |
|------|------|--------|-------------|
| Plan Audit | /plan → /architect | 5 | 5/5 |
| Design Audit | /architect → /create | 6 | 6/6 |
| Code Audit | /create → done | 7 | 7/7 |
| Deep Audit | /deep-audit → release | 10 dim | ≥6/10 each |

---

## Anti-Skip Summary

| Mechanism | What It Prevents |
|-----------|-----------------|
| Feature Counting Guard | Missing features in Blueprint |
| 7-Layer Analysis | Shallow implementation |
| Progressive Verification | Feature drift during coding |
| Build-Verify Loop | Broken builds accumulating |
| Context Isolation | AI forgetting features (context overflow) |
| File Size Discipline | Monolithic unmaintainable files |
| No-TODO Protocol | Placeholder/incomplete code |

---

## Credits

- **Antigravity Kit V2** — vudovn/antigravity-kit
- **Boom Workflow Framework** — Kennyboom/Boom-Workflow-Framework
- **V3.5 Integration** — BWF quality gates merged into AG-Kit
