# Antigravity Kit V3.6 — Architecture

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

Support workflows:
/security-audit  /performance  /refactor  /review
/debug  /test  /enhance  /brainstorm  /deploy
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
│   └── code-discipline.md ← v1.0: File limits, naming, patterns
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
│   │   └── feature-templates.md  ← 6 templates (UI/API/AI/IPC/Security)
│   └── security/
│       ├── owasp-stride.md       ← OWASP Top 10 + STRIDE deep details
│       └── auth-data-api.md      ← Auth/Data/API security checklists
│
├── agents/                ← Role specifications
│   └── [9 agent roles]
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

## V3.6 Changelog (vs V3.5)

### NEW Workflows

| File | Version | Purpose |
|------|---------|---------|
| security-audit.md | v3.0 | OWASP Top 10, STRIDE Threat Modeling, Auth/API/Data/Supply Chain |
| performance.md | v3.0 | Performance budgets, 6-layer caching, Core Web Vitals |
| refactor.md | v3.0 | SOLID audit, code smell detection, Fowler's catalog |
| review.md | v2.0 | Code quality scoring, tech debt, architecture review |

### Upgraded Workflows

| File | Version | Changes |
|------|---------|---------|
| debug.md | v1→v3 | 5 Whys root cause, hypothesis-driven, regression prevention |
| test.md | v1→v3 | TDD Red-Green-Refactor, test pyramid, coverage targets |
| enhance.md | v1→v3 | Feature Discovery Lite, Impact Analysis, Blueprint Lite |
| brainstorm.md | v1→v3 | SCAMPER ideation, decision matrix, research phase |

### References Pattern (NEW)

| File | Purpose |
|------|---------|
| references/plan/feature-templates.md | 6 templates: UI, API, Full-stack, AI/LLM, IPC, Security |
| references/security/owasp-stride.md | OWASP Top 10 extended checklists + STRIDE templates |
| references/security/auth-data-api.md | Auth, JWT, Data Protection, API security deep details |

### Plan Workflow Update
- Added `view_file` directive to load feature templates reference

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
- **V3.5-3.6** — BWF quality gates + security + lifecycle
