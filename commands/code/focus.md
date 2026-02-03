---
description: 🔒 Focused Development — Full development cycle with enforced context optimization
version: "1.0"
category: engineering
execution-mode: execute
---

# /code:focus — Focus Development Cycle

> **MISSION**: Execute complete development workflow with **enforced context optimization**.
>
> This variant automatically clears context before implementation—no user prompt required.
> Use when you want guaranteed clean implementation without context rot risk.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (focus variant enables find-skills for superior skill matching).

---

## 📌 PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES

**Before starting Phase 1**, resolve whether the user is **coding from an existing plan**. If yes, **do not** run research, scout, or brainstorm.

### Detection

- User message references a plan: e.g. `@plan`, `@PLAN-...`, path like `./reports/plans/PLAN-{name}.md`, or phrases like "according to plan", "follow the plan", "code from plan", "implement per plan".
- Or a plan file already exists for this task at `./reports/plans/PLAN-{task}.md` (derive `{task}` from `$ARGUMENTS` or from the referenced file name).

### Resolution

1. **CHECK**: Does a valid plan file exist (user-provided path or `./reports/plans/PLAN-{task}.md`)?
2. **IF YES**:
   - **SKIP** Phase 1 (Requirements/Brainstorm), Phase 2 (Scout), Phase 3 (Planning).
   - **ANNOUNCE**: "✅ Plan provided/found — skipping research, scout, and planning. Proceeding to implementation."
   - **GO TO**: Strict Context Gate (automatic) → then Phase 4 (Implementation) → Phase 5 (Testing) → Phase 6 (Review).
3. **IF NO**: Run phases in order: Phase 1 → 2 → 3 → Context Gate → 4 → 5 → 6.

---

## 🔀 TIERED EXECUTION PROTOCOL (MANDATORY)

> **Reference: AGENTS.md (Tiered Execution)`

```yaml
tiered_execution:
  principle: "Sub-agent FIRST (Tier 1). EMBODY ONLY on system failure (Tier 2)."

  tool_discovery: "Check runSubagent availability BEFORE first delegation"

  for_each_phase:
    TIER_1_MANDATORY: "IF tool exists → MUST use SUB_AGENT_DELEGATION"
    TIER_2_FALLBACK: "ONLY on system error—NOT complexity/preference/speed"

  anti_lazy_fallback:
    - ❌ NEVER use Tier 2 when Tier 1 tool is available
    - ✅ ALWAYS attempt Tier 1 first when tool exists
    - ✅ ALWAYS log justification for Tier 2 fallback
```

---

## ⚠️ CRITICAL: PHASE CONTINUITY RULES

```yaml
phase_continuity:
  rule: "Each phase MUST reference and follow outputs from prior phases"

  check_for_files:
    - "./reports/brainstorms/BRAINSTORM-{task}.md"
    - "./reports/scouts/SCOUT-{task}.md"
    - "./reports/plans/PLAN-{task}.md"

  enforcement:
    - Phase 3 (Planning) MUST incorporate Scout findings
    - Phase 4 (Implementation) MUST follow the Plan file exactly
    - Phase 5 (Testing) MUST verify all plan checkpoints
    - If prior phase file missing → Agent MUST create it
```

All files in `./reports/` → English only.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing).

---

## 🎭 Phase 1: REQUIREMENTS ANALYSIS

| Attribute   | Value                             |
| ----------- | --------------------------------- |
| **Agent**   | `brainstormer`                    |
| **Goal**    | Clarify requirements if ambiguous |
| **Trigger** | If requirements unclear           |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `brainstormer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/brainstormer.md`
> EMBODY [brainstormer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Requirements clear
- [ ] Scope defined
- [ ] Acceptance criteria established
- [ ] **METHODOLOGY CHECK**: Output aligns with `brainstormer` Thinking Protocol

---

## 🎭 Phase 2: CODEBASE ANALYSIS

| Attribute | Value                         |
| --------- | ----------------------------- |
| **Agent** | `scouter`                     |
| **Goal**  | Full codebase context mapping |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `scouter`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/scouter.md`
> EMBODY [scouter] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Architecture understood
- [ ] Patterns documented
- [ ] Integration points identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `scouter` Thinking Protocol

---

## 🎭 Phase 3: IMPLEMENTATION PLANNING

| Attribute | Value                      |
| --------- | -------------------------- |
| **Agent** | `planner`                  |
| **Goal**  | Create implementation plan |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `planner`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/planner.md`
> EMBODY [planner] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Plan created
- [ ] Steps defined
- [ ] Risks identified
- [ ] **METHODOLOGY CHECK**: Output aligns with `planner` Thinking Protocol

---

## 🛡️ CONTEXT GATE CHECKPOINT

> **⛔ BLOCKING**: Load Context Gate protocol NOW before proceeding.
>
> **LOAD**: `rules/CONTEXT-GATE.md` — Execute FOCUS MODE protocol
>
> This is a MANDATORY checkpoint. Cannot skip or bypass.

### ⚡ EXECUTION

```yaml
context_gate_execution:
  mode: "FOCUS (Automatic)"
  trigger: "After Phase 3 (Planning) completes"
  protocol: "Follow rules/CONTEXT-GATE.md § FOCUS MODE"
  
  variant_adjustments:
    remaining_phases: "Phase 4 → 5 → 6"
    plan_file: "./reports/plans/PLAN-{task}.md"
```

**DO NOT proceed to Phase 4 until Context Gate completes.**

Mode: Fresh implementation start

Proceeding to Implementation...
```

---

## 🎭 Phase 4: IMPLEMENTATION

| Attribute | Value                               |
| --------- | ----------------------------------- |
| **Agent** | `tech-lead` → routes to specialists |
| **Goal**  | Execute plan with specialist agents |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tech-lead`. Context: ISOLATED.
> Tech-lead will spawn specialist subagents as needed.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tech-lead.md`
> EMBODY [tech-lead] — Requires logged system error justification.
> Then recursively EMBODY specialists as needed.

### ⚡ FOCUS ADHERENCE DIRECTIVE

```
1. READ plan completely BEFORE any implementation
2. FOR EACH plan step:
   a. Implement EXACTLY as specified
   b. Mark complete: `- [ ]` → `- [x]`
3. IF deviation needed:
   a. STOP
   b. REQUEST Re-Planning
   c. DO NOT proceed with own interpretation
```

**Exit Criteria:**

- [ ] All plan steps executed
- [ ] Code complete
- [ ] Documentation updated
- [ ] **Each plan step has corresponding implementation**
- [ ] **No unauthorized deviations**
- [ ] **METHODOLOGY CHECK**: Output aligns with `tech-lead` Thinking Protocol

---

## 🎭 Phase 5: TESTING

| Attribute | Value                 |
| --------- | --------------------- |
| **Agent** | `tester`              |
| **Goal**  | Comprehensive testing |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `tester`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/tester.md`
> EMBODY [tester] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Tests written
- [ ] All tests pass
- [ ] Coverage adequate
- [ ] **METHODOLOGY CHECK**: Output aligns with `tester` Thinking Protocol

---

## 🎭 Phase 6: REVIEW

| Attribute | Value               |
| --------- | ------------------- |
| **Agent** | `reviewer`          |
| **Goal**  | Code quality review |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**

> Invoke runSubagent for `reviewer`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**

> Load `{AGENTS_PATH}/reviewer.md`
> EMBODY [reviewer] — Requires logged system error justification.

**Exit Criteria:**

- [ ] Code reviewed
- [ ] Standards met
- [ ] No blocking issues
- [ ] **METHODOLOGY CHECK**: Output aligns with `reviewer` Thinking Protocol

---

## COMPLETION

Present implementation report with:

1. ✅ **Done** — Feature complete (Focus Mode)
2. 🚀 **Deploy** → `/deploy:preview`
3. 📝 **Docs** → `/docs:core`
