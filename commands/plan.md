---
description: 📋 Plan Router — Route to planning workflows
version: "1.0"
category: planning
execution-mode: router
---

# /plan — Planning Router

> **ROUTER DIRECTIVE**: Analyze planning need and route to appropriate workflow.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant (e.g. plan/hard.md), and execute it.

---

## ROUTING LOGIC

```
IF task is clear (known approach, codebase-only):
  → Route to /plan:fast

IF task is complex (research needed, architectural):
  → Route to /plan:hard

IF task is complex AND clean implementation handoff is critical:
  → Route to /plan:focus

IF unsure:
  → Default to /plan:fast
```

---

## AVAILABLE ROUTES

| Route         | When to Use                                          |
| ------------- | ---------------------------------------------------- |
| `/plan:fast`  | Quick planning without research                      |
| `/plan:hard`  | Full planning with research                          |
| `/plan:focus` | Full planning with **enforced context optimization** |

---

## PRESENT OPTIONS

```markdown
## 📋 Planning Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. ⚡ **Fast** → `/plan:fast` — Quick plan
2. ⚡⚡⚡ **Hard** → `/plan:hard` — Full research-backed plan
3. 🎯 **Focus** → `/plan:focus` — Full plan with **automatic context clearing** (clean implementation handoff)

⏳ Awaiting selection...
```
