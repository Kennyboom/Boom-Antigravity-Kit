# Antigravity Kit V4.0 — Architecture

> No-Skip Engineering System with Master Precision

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

Support workflows:
/security-audit  /performance  /refactor  /review
/debug  /test  /enhance  /brainstorm  /deploy  /docs
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
│   ├── code-discipline.md ← v1.0: File limits, naming, patterns
│   └── safe-edit.md       ← v1.0: Surgical editing + Conventional Commits
│
├── workflows/             ← Execution pipelines
│   ├── plan.md            ← v4.0: Master Planner + Feature Templates
│   ├── architect.md       ← v2.0: Bulletproof Design System
│   ├── create.md          ← v3.0: Universal Coder + Anti-Skip
│   ├── deep-audit.md      ← v2.0: Ruthless Inspector
│   │
│   ├── security-audit.md  ← v3.0: Fortress Builder (OWASP+STRIDE)
│   ├── performance.md     ← v3.0: Speed Alchemist (6-layer cache)
│   ├── refactor.md        ← v3.0: Code Surgeon (SOLID+Fowler)
│   ├── review.md          ← v2.0: Project Intelligence Scanner
│   ├── docs.md            ← v1.0: Documentation Alchemist
│   │
│   ├── debug.md           ← v3.0: 5 Whys + hypothesis-driven
│   ├── test.md            ← v3.0: TDD + test pyramid
│   ├── enhance.md         ← v3.0: Feature Enhancement Engine
│   ├── brainstorm.md      ← v3.0: SCAMPER + decision matrix
│   │
│   ├── deploy.md          ← v1.0: Deployment workflow
│   ├── save.md            ← v1.0: Context persistence
│   ├── recap.md           ← v1.0: Context restoration
│   ├── preview.md         ← v1.0: Preview workflow
│   ├── status.md          ← v1.0: Status check
│   ├── orchestrate.md     ← v1.0: Multi-agent orchestration
│   └── ui-ux-pro-max.md   ← v1.0: Premium UI design
│
├── workflows/references/  ← Extended details (on-demand loading)
│   ├── plan/
│   │   ├── feature-templates.md  ← 6 templates (UI/API/AI/IPC/Security)
│   │   └── bdd-gherkin.md        ← BDD scenario templates + test mapping
│   ├── security/
│   │   ├── owasp-stride.md       ← OWASP Top 10 + STRIDE deep details
│   │   └── auth-data-api.md      ← Auth/Data/API security checklists
│   └── ui/
│       └── design-system-sync.md ← Token enforcement + responsive checks
│
├── agents/                ← Role specifications (21 agents)
│   ├── orchestrator.md    ← v2.0: + Context Guardian Protocol
│   └── [20 other agent roles]
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

## V4.0 Changelog (vs V3.6)

### NEW Rules

| File | Version | Purpose |
|------|---------|---------|
| safe-edit.md | v1.0 | 3 Laws of Safe Editing + Post-Edit Gate (Build/Lint/Diff) + Conventional Commits |

### NEW Workflows

| File | Version | Purpose |
|------|---------|---------|
| docs.md | v1.0 | Documentation Alchemist (README/API/Component/Changelog) |

### NEW References

| File | Purpose |
|------|---------|
| references/plan/bdd-gherkin.md | 4 BDD templates (Auth/CRUD/Payment/API) + Playwright/Jest mapping |
| references/ui/design-system-sync.md | Token enforcement, magic color ban, 3-viewport responsive check |

### MODIFIED Agents

| File | Change |
|------|--------|
| orchestrator.md | + Context Guardian Protocol (3-workflow flush cycle, state persistence) |

---

## Quality Gates Summary

| Gate | When | Checks | Min to Pass |
|------|------|--------|-------------|
| Plan Audit | /plan → /architect | 5 | 5/5 |
| Design Audit | /architect → /create | 6 | 6/6 |
| Code Audit | /create → done | 7 | 7/7 |
| Deep Audit | /deep-audit → release | 10 dim | ≥6/10 each |
| Security Audit | /security-audit | 5 | 5/5 |
| Perf Audit | /performance | 4 | 4/4 |
| Safe Edit Gate | Every code edit | 3 | 3/3 (Build+Lint+Diff) |
| Doc Audit | /docs | 7 | 7/7 |

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
| Safe Edit 3 Laws | Destructive file overwrites |
| Design Token Lock | UI inconsistency / magic values |
| Context Guardian | AI degradation in long sessions |
| BDD Scenarios | Untested acceptance criteria |

---

## Credits

- **Antigravity Kit V2** — vudovn/antigravity-kit
- **Boom Workflow Framework** — Kennyboom/Boom-Workflow-Framework
- **V3.5-3.6** — BWF quality gates + security + lifecycle
- **V4.0** — Master Precision (safe edit, BDD, design sync, auto-docs)
