---
description: 🔒 Focused Debug — Deep investigation with enforced context optimization
version: "1.0"
category: debugging
execution-mode: execute
---

# /debug:focus — Focus Deep Investigation

> **MISSION**: Thorough investigation with **enforced context optimization**.
>
> This variant automatically clears context before fix handoff—no user prompt required.
> Use when you want guaranteed clean fix handoff without hypothesis drift.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (focus variant enables find-skills for superior skill matching).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

---

## 📁 DELIVERABLE FILES

| Agent    | Output                              |
| -------- | ----------------------------------- |
| debugger | `./reports/debugs/DEBUG-{issue}.md` |

All files in `./reports/` → English only.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing).

---

## 🎭 Phase 1: INFORMATION GATHERING

| Agent | `scouter`                                 |
| ----- | ----------------------------------------- |
| Goal  | Gather context and reproduction steps     |
| Exit  | Context gathered, reproduction documented |

---

## 🎭 Phase 2: HYPOTHESIS FORMATION

| Agent | `debugger`                          |
| ----- | ----------------------------------- |
| Goal  | Form and rank hypotheses            |
| Exit  | Hypotheses documented with evidence |

---

## 🎭 Phase 3: ROOT CAUSE ANALYSIS

| Agent  | `debugger`                                      |
| ------ | ----------------------------------------------- |
| Goal   | Deep investigation                              |
| Output | `./reports/debugs/DEBUG-{issue}.md`             |
| Exit   | Root cause identified, failure chain documented |

---

## 🎭 Phase 4: SOLUTION DESIGN

| Agent | `planner`                               |
| ----- | --------------------------------------- |
| Goal  | Design fix strategy                     |
| Exit  | Fix approach defined with rollback plan |

---

## 🛡️ CONTEXT GATE CHECKPOINT

> **⛔ BLOCKING**: Load Context Gate protocol NOW before proceeding.
>
> **LOAD**: `rules/CONTEXT-GATE.md` — Execute FOCUS MODE (Debug variant)
>
> This is a MANDATORY checkpoint. Cannot skip or bypass.

### ⚡ EXECUTION

```yaml
context_gate_execution:
  mode: "FOCUS (Automatic)"
  trigger: "After Phase 4 (Solution Design) completes"
  protocol: "Follow rules/CONTEXT-GATE.md § FOCUS MODE § debug_focus_variant"
  
  variant_adjustments:
    reload_type: "OUTPUT_ESSENTIAL_CONTEXT"
    handoff_to: "/fix:focus"
```

**Note**: Debug outputs context for fix handoff, doesn't implement directly.
```

### 📋 Post-Gate Status

```markdown
🔒 **Context Gate Passed**

## ✅ Output for Handoff:
- User request (original issue verbatim)
- Root cause summary with evidence
- Fix strategy with rollback
- Acceptance criteria for fix verification

## ❌ Discarded:
- Failed investigation hypotheses
- Rejected theories
- Debugging noise
- Chat history

Mode: Clean handoff ready

Ready for fix implementation...
```

---

## COMPLETION

Present findings with:

1. ✅ **Root Cause** — Identified (Focus Mode)
2. 🔒 **Context Optimized** — Ready for focus fix
3. 🔧 **Fix** → `/fix:focus`
4. 📝 **Document** → `/docs:core`
