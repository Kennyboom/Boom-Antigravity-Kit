# 🛡️ CONTEXT GATE PROTOCOL

> **PURPOSE**: Prevent "context rot" by clearing noisy planning/debugging history before implementation.
>
> Long-running sessions fill context with noise that degrades code generation quality.
> This protocol acts as a mandatory "firewall" between Planning and Implementation phases.

---

## 🔀 EXECUTION MODES

This file defines TWO execution modes for Context Gate:

| Mode | When | Behavior |
|------|------|----------|
| **FOCUS** | Focus variants (`:focus`) | **AUTOMATIC** - No user prompt, force clear |
| **HARD** | Hard variants (`:hard`) | **CHOICE** - Present 3 options to user |

---

## 🔒 FOCUS MODE — Automatic Context Optimization

> **TRIGGER**: After Planning phase completes in `:focus` variants
> **BEHAVIOR**: Automatically clear context WITHOUT user prompt

### EXECUTION SEQUENCE

```yaml
focus_mode_execution:
  when: "After Phase 3 (Planning) or equivalent phase completes"
  
  steps:
    1. ANNOUNCE: |
       ## 🛡️ Strict Context Gate — Automatic
       
       ✅ **Plan Complete**: [Plan file path]
       🔒 **Focus Mode**: Automatically clearing context for implementation.
       
       ⚡ Executing: **Clear context & Auto-Implement**...
    
    2. CONTEXT_DIRECTIVE: |
       ╔══════════════════════════════════════════════════════════════════╗
       ║  ⛔ MANDATORY CONTEXT RESET — FOCUS MODE                        ║
       ╠══════════════════════════════════════════════════════════════════╣
       ║  IGNORE: All previous chat messages, reasoning chains,           ║
       ║          brainstorming discussions, research explorations,       ║
       ║          rejected alternatives, and intermediate thinking.       ║
       ║                                                                  ║
       ║  SOLE SOURCE OF TRUTH: Plan file in ./reports/                   ║
       ║                                                                  ║
       ║  PROCEED: Begin Implementation phase with FRESH context mindset. ║
       ║           Treat this as a NEW conversation starting from Plan.   ║
       ╚══════════════════════════════════════════════════════════════════╝
    
    3. RELOAD_ESSENTIAL_CONTEXT: |
       ## 📥 Essential Context Reload
       
       Read Plan file and extract these sections for implementation context:
       
       1️⃣ **USER REQUEST (VERBATIM)**: 
          - Extract from Plan header: `## 📌 User Request (VERBATIM)`
          - This is the ORIGINAL user intent to verify against
       
       2️⃣ **ACCEPTANCE CRITERIA**:
          - Extract from Plan header: `## 🎯 Acceptance Criteria`
          - These are the checkpoints that MUST pass for completion
       
       3️⃣ **IMPLEMENTATION PLAN**:
          - Full plan content from `./reports/plans/PLAN-{task}.md`
          - This is the SOLE SOURCE OF TRUTH for what to build
       
       4️⃣ **REMAINING PHASES**: 
          - Extract from command file (e.g., Phase 4 → 5 → 6)
       
       5️⃣ **IMPLEMENTATION RULES** (Summary):
          - Follow plan EXACTLY - no deviation without re-planning
          - Verify each step against acceptance criteria
          - Mark checkpoints as complete: `- [ ]` → `- [x]`
    
    4. OUTPUT_POST_STATUS: |
       🔒 **Context Gate Passed**
       
       ## ✅ Reloaded:
       - User request (verbatim from plan header)
       - Acceptance criteria (verification checkpoints)
       - Implementation plan (sole source of truth)
       - Remaining phases workflow
       - Implementation rules summary
       
       ## ❌ Discarded:
       - Brainstorming discussions
       - Research explorations  
       - Rejected alternatives
       - Chat history noise
       
       Mode: Fresh implementation start
       
       Proceeding to Implementation...
    
    5. PROCEED: Start next phase immediately (no waiting)
```

### VARIANT-SPECIFIC ADJUSTMENTS

```yaml
debug_focus_variant:
  # Debug doesn't implement, it hands off to fix
  reload_type: "OUTPUT_ESSENTIAL_CONTEXT"
  output_sections:
    1. USER REQUEST (VERBATIM)
    2. ROOT CAUSE SUMMARY
    3. FIX STRATEGY
    4. ACCEPTANCE CRITERIA
  handoff: "Ready for `/fix:focus` implementation"

design_focus_variant:
  # Design continues to review phase, not implementation
  remaining_phases: "Phase 5 (Design Review) → Implementation Handoff"
  rules_summary: "Verify design meets original user request"

test_focus_variant:
  # Test uses strategy instead of plan
  plan_source: "Finalized test strategy from Phase 1"
  acceptance_source: "If Plan exists: Extract from ./reports/plans/"
```

---

## ⚙️ HARD MODE — User Choice Context Optimization

> **TRIGGER**: After Planning phase completes in `:hard` variants
> **BEHAVIOR**: Present 3 options to user, WAIT for selection

### EXECUTION SEQUENCE

```yaml
hard_mode_execution:
  when: "After Phase 3 (Planning) or equivalent phase completes"
  
  steps:
    1. PRESENT_OPTIONS: |
       ## 🛡️ Context Optimization Checkpoint
       
       **Planning Complete** — Plan file created at: [Plan file path]
       
       **Choose how to proceed with implementation:**
       
       | Option | Action | Description |
       |--------|--------|-------------|
       | **1. 🚀 Clear context & Auto-Implement** | `RECOMMENDED` | Fresh start: Reload Plan file, ignore chat history, begin implementation immediately |
       | **2. ⏸️ Clear context & Manual** | `SAFE` | Clear context, reload Plan, pause for your command before coding |
       | **3. ⚠️ Continue (No Clear)** | `RISKY` | Proceed with full history attached (may cause hallucination) |
       
       ⏳ Awaiting selection...
    
    2. WAIT_FOR_USER_INPUT: true
    
    3. EXECUTE_BASED_ON_CHOICE:
       - IF option_1: Execute OPTION_1_CLEAR_AUTO_IMPLEMENT
       - IF option_2: Execute OPTION_2_CLEAR_MANUAL
       - IF option_3: Execute OPTION_3_CONTINUE_NO_CLEAR
```

### OPTION 1: Clear context & Auto-Implement (RECOMMENDED)

```yaml
option_1_clear_auto_implement:
  behavior: "Simulate fresh start"
  steps:
    1. ACKNOWLEDGE: "🚀 Executing Clear context & Auto-Implement..."
    
    2. CONTEXT_DIRECTIVE: |
       ⛔ IGNORE all previous chat messages and reasoning chains.
       ✅ RELOAD: Plan file as SOLE SOURCE OF TRUTH.
       ✅ PROCEED: Begin next phase immediately.
    
    3. RELOAD_ESSENTIAL_CONTEXT: |
       ## 📥 Essential Context Reload
       
       Read Plan file and extract these sections for implementation context:
       
       1️⃣ **USER REQUEST (VERBATIM)**: 
          - Extract from Plan header: `## 📌 User Request (VERBATIM)`
          - This is the ORIGINAL user intent to verify against
       
       2️⃣ **ACCEPTANCE CRITERIA**:
          - Extract from Plan header: `## 🎯 Acceptance Criteria`
          - These are the checkpoints that MUST pass for completion
       
       3️⃣ **IMPLEMENTATION PLAN**:
          - Full plan content from plan file
          - This is the SOLE SOURCE OF TRUTH for what to build
       
       4️⃣ **REMAINING PHASES**: 
          - Extract from command file (e.g., Phase 4 → 5 → 6)
       
       5️⃣ **IMPLEMENTATION RULES** (Summary):
          - Follow plan EXACTLY - no deviation without re-planning
          - Verify each step against acceptance criteria
          - Mark checkpoints as complete: `- [ ]` → `- [x]`
    
    4. OUTPUT_POST_STATUS: |
       🔒 **Context Gate Passed**
       
       ## ✅ Reloaded:
       - User request (verbatim from plan header)
       - Acceptance criteria (verification checkpoints)
       - Implementation plan (sole source of truth)
       - Remaining phases workflow
       - Implementation rules summary
       
       ## ❌ Discarded:
       - Brainstorming discussions
       - Research explorations  
       - Rejected alternatives
       - Chat history noise
    
    5. EXECUTE: Start next phase with fresh context mindset
```

### OPTION 2: Clear context & Manual (SAFE)

```yaml
option_2_clear_manual:
  behavior: "Clear and wait for explicit command"
  steps:
    1. ACKNOWLEDGE: "⏸️ Context cleared. Plan reloaded."
    
    2. CONTEXT_DIRECTIVE: |
       ⛔ IGNORE all previous chat messages and reasoning chains.
       ✅ RELOAD: Plan file as SOLE SOURCE OF TRUTH.
    
    3. RELOAD_ESSENTIAL_CONTEXT: |
       (Same 5-step structure as option_1)
    
    4. OUTPUT_STATUS: |
       🔒 **Context Cleared**
       
       ## ✅ Loaded:
       - User request from plan header
       - Acceptance criteria
       - Full implementation plan
       - Remaining phases: [list phases]
       
       Ready for implementation. Type `/continue` or give specific instructions.
    
    5. WAIT: For user command before proceeding
```

### OPTION 3: Continue (No Clear) — RISKY

```yaml
option_3_continue_no_clear:
  behavior: "Proceed with caution - context rot risk"
  steps:
    1. WARN: "⚠️ Continuing with full history. Higher hallucination risk."
    
    2. PROCEED: Continue to next phase with existing context
    
    3. MONITOR: Watch for signs of context confusion
```

### VARIANT-SPECIFIC ADJUSTMENTS

```yaml
debug_hard_variant:
  # Debug outputs for fix handoff, doesn't implement
  option_1:
    reload_type: "OUTPUT_ESSENTIAL_CONTEXT"
    output_sections:
      1. USER REQUEST (VERBATIM)
      2. ROOT CAUSE SUMMARY
      3. FIX STRATEGY
      4. ACCEPTANCE CRITERIA
    final_output: "Run `/fix:hard` to implement with clean context."

design_hard_variant:
  # Design continues to review phase
  remaining_phases: "Phase 5 (Design Review) → Implementation Handoff"
  rules_summary: "Verify design meets original user request"

test_hard_variant:
  # Test uses strategy instead of plan
  plan_source: "Finalized test strategy from Phase 1"
  acceptance_source: "If Plan exists: Extract from ./reports/plans/"
```

---

## ⚠️ ENFORCEMENT MECHANISM

### BLOCKING RULES

```yaml
enforcement:
  rule: "Context Gate is MANDATORY. Cannot skip or bypass."
  
  timing: |
    TRIGGER at exact phase boundary:
    - After Phase 3 (Planning) completes
    - Before Phase 4 (Implementation) begins
  
  verification: |
    Command file MUST include this checkpoint at phase boundary.
    AI MUST execute gate before proceeding to implementation.
    
  anti_skip_protection: |
    1. Gate appears in SEQUENTIAL execution flow
    2. Gate blocks next phase until completion
    3. Commands MUST reference this file with LOAD directive
```

### LOAD DIRECTIVE FORMAT

Commands MUST include this at Context Gate checkpoint:

```markdown
## 🛡️ CONTEXT GATE CHECKPOINT

> **⛔ BLOCKING**: Load Context Gate protocol NOW before proceeding.
>
> **LOAD**: `rules/CONTEXT-GATE.md` — Follow protocol for your variant (FOCUS or HARD mode)

[Execute Context Gate per loaded protocol]
```

---

## 📊 VARIANT MAPPING

| Command Variant | Mode | Trigger Phase | Behavior |
|-----------------|------|---------------|----------|
| `/code:focus` | FOCUS | After Phase 3 (Planning) | Auto clear → Implementation |
| `/code:hard` | HARD | After Phase 3 (Planning) | User choice → Implementation |
| `/cook:focus` | FOCUS | After Phase 3 (Planning) | Auto clear → Implementation |
| `/cook:hard` | HARD | After Phase 3 (Planning) | User choice → Implementation |
| `/fix:focus` | FOCUS | After Phase 3 (Fix Planning) | Auto clear → Implementation |
| `/fix:hard` | HARD | After Phase 3 (Fix Planning) | User choice → Implementation |
| `/debug:focus` | FOCUS | After Phase 4 (Solution Design) | Auto clear → Fix Handoff |
| `/debug:hard` | HARD | After Phase 4 (Solution Design) | User choice → Fix Handoff |
| `/design:focus` | FOCUS | After Phase 4 (Design Creation) | Auto clear → Design Review |
| `/design:hard` | HARD | After Phase 4 (Design Creation) | User choice → Design Review |
| `/test:focus` | FOCUS | After Phase 1 (Test Strategy) | Auto clear → Test Execution |
| `/test:hard` | HARD | After Phase 1 (Test Strategy) | User choice → Test Execution |

---

## 🎯 VERIFICATION CHECKLIST

Before proceeding from Context Gate:

```
□ Context directive issued
□ Essential context reloaded (5 sections)
□ Post-gate status displayed
□ User request preserved
□ Acceptance criteria extracted
□ Implementation rules summarized
□ Chat history discarded
```

**NO SILENT SKIPS. CONTEXT GATE IS MANDATORY.**
