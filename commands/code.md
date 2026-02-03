---
description: 💻 Code Router — Route to implementation workflows
version: "1.0"
category: engineering
execution-mode: router
---

# /code — Implementation Router

> **ROUTER DIRECTIVE**: Analyze task complexity and route to appropriate implementation workflow.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS EXECUTION)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run any workflow phase until all are loaded.** Follow **all** rules in those files. Then run this file's ROUTING LOGIC, LOAD the chosen variant workflow, and execute it.

---

## ROUTING LOGIC

```
IF user references an existing plan (@plan, @PLAN-..., path to PLAN-*.md, or "according to plan" / "follow the plan"):
  → Route to /code:hard or /code:focus (workflow will SKIP research, scout, brainstorm and go straight to implementation)

IF task is simple (clear requirements, single file):
  → Route to /code:fast

IF task is complex (multi-file, research needed):
  → Route to /code:hard

IF task is complex AND context optimization is critical:
  → Route to /code:focus

IF unsure:
  → Default to /code:fast (escalate if needed)
```

---

## AVAILABLE ROUTES

| Route         | When to Use                                             |
| ------------- | ------------------------------------------------------- |
| `/code:fast`  | Quick implementation, clear requirements                |
| `/code:hard`  | Complex features, multi-file changes                    |
| `/code:focus` | Complex features with **enforced context optimization** |

---

## PRESENT OPTIONS

```markdown
## 💻 Implementation Mode Selection

**Task**: [parsed task]

**Choose workflow:**

1. ⚡ **Fast** → `/code:fast` — Quick implementation
2. ⚡⚡⚡ **Hard** → `/code:hard` — Full development cycle
3. 🎯 **Focus** → `/code:focus` — Full cycle with **automatic context clearing** (prevents hallucination)

⏳ Awaiting selection...
```
