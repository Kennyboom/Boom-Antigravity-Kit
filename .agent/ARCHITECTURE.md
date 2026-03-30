# Antigravity Kit V3.0 — Architecture

## Overview

Antigravity Kit V3.0 is a disciplined engineering framework that
ensures zero feature omissions through systematic discovery,
mandatory coverage audits, and build verification loops.

**Core Philosophy:** Plan → Architect → Code → Verify.
No shortcuts, no skipped features, no broken builds.

---

## V3.0 Additions (on top of V2.0)

```
.agent/
├── agents/
│   ├── solution-architect.md  ← NEW: Technical design agent
│   └── [all V2.0 agents retained]
│
├── workflows/
│   ├── architect.md           ← NEW: 10-phase technical design
│   ├── save.md                ← NEW: Session persistence
│   ├── recap.md               ← NEW: Session restore
│   ├── plan.md                ← UPGRADED: Feature Discovery + Audits
│   ├── create.md              ← UPGRADED: Anti-Skip + Blueprint
│   ├── enhance.md             ← UPGRADED: Anti-Skip Lite
│   └── [all V2.0 workflows retained]
│
├── rules/                     ← NEW directory
│   ├── anti-skip.md           ← Feature Counting + Build Verify
│   ├── 5-ui-states.md         ← Mandatory UI states protocol
│   ├── coverage-audits.md     ← Plan + Design + Code exit gates
│   └── feature-discovery.md   ← 3-step feature extraction
│
├── .shared/
│   ├── design-thinking/       ← NEW: Extracted from frontend
│   │   └── design-philosophy.md
│   └── ui-ux-pro-max/         ← V2.0 retained
│
├── scripts/                   ← V2.0 retained (all scripts)
├── skills/                    ← V2.0 retained (all skills)
└── rules/GEMINI.md            ← V2.0 retained
```

---

## Three Coverage Audits

| Audit | When | Checks |
|-------|------|--------|
| **Plan Coverage** | After `/plan` | Feature + CRUD + Sub-feature + Cross-cut |
| **Design Coverage** | After `/architect` | Entity + API + Screen + Error + ADR |
| **Code Coverage** | After `/create` | Spec + Build + Lint + States + Error |

> All audits are MANDATORY. No handover without PASS.

---

## Anti-Skip Protocol

```
Feature Counting Guard → spec == blueprint
         ↓
7-Layer Analysis → UI + Logic + Error + Edge
         ↓
Build Verify Loop → npm run build + lint after EACH feature
         ↓
Progressive Verification → cross-check every 3-5 features
```

---

## Sources

- **BWF**: Feature Discovery, Anti-Skip, Given/When/Then,
  5 UI States, Coverage Audits, C4/ADR/DB/API design
- **Agent Assistant V5.0**: Session persistence
- **Ag-kit V2.0**: All agents, scripts, skills, workflows
