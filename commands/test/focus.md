---
description: 🔒 Focused Test — Comprehensive QA with enforced context optimization
version: "1.0"
category: validation
execution-mode: execute
---

# /test:focus — Focus Comprehensive Testing

> **MISSION**: Full QA workflow with **enforced context optimization**.
> 
> This variant automatically clears context before test execution—no user prompt required.
> Use when you want guaranteed focused test execution without strategy noise.

<scope>$ARGUMENTS</scope>

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

## 📁 PLAN CHECKPOINT VERIFICATION

```
IF ./reports/plans/PLAN-{scope}.md exists:
  1. READ plan completely
  2. EXTRACT all checkpoints
  3. FOR EACH checkpoint → Create test
  4. OUTPUT: "Checkpoint Coverage: X/Y"
```

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing).

---

## 🎭 Phase 1: TEST STRATEGY

| Agent | `tester`                                |
| ----- | --------------------------------------- |
| Goal  | Design test strategy                    |
| Exit  | Strategy defined, test types identified |

---

## 🛡️ CONTEXT GATE CHECKPOINT

> **⛔ BLOCKING**: Load Context Gate protocol NOW before proceeding.
>
> **LOAD**: `rules/CONTEXT-GATE.md` — Execute FOCUS MODE (Test variant)
>
> This is a MANDATORY checkpoint. Cannot skip or bypass.

### ⚡ EXECUTION

```yaml
context_gate_execution:
  mode: "FOCUS (Automatic)"
  trigger: "After Phase 1 (Test Strategy) completes"
  protocol: "Follow rules/CONTEXT-GATE.md § FOCUS MODE § test_focus_variant"
  
  variant_adjustments:
    plan_source: "Finalized test strategy from Phase 1"
    remaining_phases: "Phase 2 → 3 → 4 → 5"
```

**DO NOT proceed to Phase 2 until Context Gate completes.**
- Rejected approaches
- Planning noise
- Chat history

Mode: Fresh execution start

Proceeding to Test Execution...
```

---

## 🎭 Phase 2: DEPENDENCY MAPPING

| Agent | `scouter`                              |
| ----- | -------------------------------------- |
| Goal  | Map test dependencies                  |
| Exit  | Dependencies mapped, environment ready |

---

## 🎭 Phase 3: TEST EXECUTION

| Agent        | `tester`                                                        |
| ------------ | --------------------------------------------------------------- |
| Prerequisite | READ PLAN file if exists                                        |
| Goal         | Run full test suite                                             |
| Exit         | All tests run, coverage measured, checkpoint mapping documented |

---

## 🎭 Phase 4: FAILURE ANALYSIS (IF FAILURES)

| Agent   | `debugger`             |
| ------- | ---------------------- |
| Trigger | If failures exist      |
| Goal    | Analyze failures       |
| Exit    | Root causes identified |

---

## 🎭 Phase 5: QUALITY GATES

| Agent | `tester`                          |
| ----- | --------------------------------- |
| Goal  | Verify quality gates              |
| Exit  | All gates pass, coverage adequate |

---

## COMPLETION

Present test report with:

1. ✅ **Pass** — All tests green (Focus Mode)
2. 🔧 **Fix** → `/fix:fast`
3. 📝 **Review** → `/review`
