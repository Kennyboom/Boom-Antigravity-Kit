# 🛠️ ERROR RECOVERY

> **LOAD CONDITION**: When errors occur during execution
> **PURPOSE**: Self-healing protocols that ensure completion or user decision

---

## CORE PRINCIPLE

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  EVERY error path MUST lead to:                                           ║
║    1. Successful completion, OR                                           ║
║    2. Explicit user decision                                              ║
║                                                                           ║
║  ❌ FORBIDDEN: Silent halt, unexplained termination, abandoned state      ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## ERROR CLASSIFICATION

| Code | Type | Description | Response |
|------|------|-------------|----------|
| E1 | TRANSIENT | Timeout, network, resource | Retry 3x with backoff |
| E2 | RECOVERABLE | Logic error with clear fix | Log, attempt alternative |
| E3 | BLOCKING | Critical failure | Safe point → Options → Await user |
| E4 | CASCADING | Affects downstream | Stop propagation → Rollback → Report |

---

## SELF-HEALING PROTOCOL

```yaml
on_any_error:
  step_1_capture:
    - Error type
    - Phase and agent
    - Input state
    - Partial outputs
  
  step_2_classify:
    - Map to E1/E2/E3/E4
  
  step_3_attempt_recovery:
    E1_transient:
      - Retry with exponential backoff
      - Max 3 attempts
      - On max → Alternative approach
    
    E2_recoverable:
      - Log error
      - Attempt alternative
      - Document deviation
    
    E3_blocking:
      - Complete to safe point
      - Document blocker
      - Present options:
        A) Alternative approach
        B) Skip with documented gap
        C) Provide missing input
        D) Modify requirements
      - AWAIT user decision
    
    E4_cascading:
      - STOP propagation immediately
      - Map impact (which phases affected?)
      - Rollback to last good state
      - Report cascade analysis
      - Present recovery options
  
  step_4_resume:
    - Continue after resolution
    - NEVER halt silently
```

---

## ADAPTIVE CORRECTION PROTOCOL

```yaml
on_violation_detected:
  trigger: "Any rule violation (P1-P8, A1-A10)"
  
  step_1_safe_point:
    action: "Complete current atomic operation"
    examples:
      - Finish writing current file
      - Complete current test
      - Save partial deliverable
  
  step_2_notify:
    format: |
      ⚠️ ADAPTIVE CORRECTION
      ├─ Violation: {code and description}
      ├─ Detected at: {phase/step}
      ├─ Safe point: {current state}
      └─ Correction: {what will be done}
  
  step_3_backtrack:
    - Identify exact violation point
    - Re-load required agent/workflow
    - Re-execute correctly
  
  step_4_downstream_update:
    - List steps completed AFTER violation
    - For each: Does correction change input?
    - IF yes → Re-execute
    - IF no → Preserve
  
  step_5_resume:
    - Verify correction successful
    - Continue workflow
  
  anti_infinite_loop:
    max_corrections_per_phase: 3
    on_max_reached: |
      ⚠️ CORRECTION LIMIT
      ├─ Phase: {phase}
      ├─ Attempts: 3/3
      └─ Action: Request user guidance
```

---

## ANTI-PATTERNS (FORBIDDEN)

| ID | Anti-Pattern | Correct Behavior |
|----|--------------|------------------|
| A1 | Direct implementation | Delegate to engineer |
| A2 | Workflow bypass | Follow exact phase order |
| A3 | Requirement drift | 100% fidelity |
| A4 | Shallow agent adoption | Deep embodiment |
| A5 | Context leakage | Clean handoffs |
| A6 | Premature completion | Verify all requirements |
| A7 | False confidence | Ensure validation |
| A8 | Silent halt | Notify, present options |
| A9 | Default AI fallback | Agent file is OS |
| A10 | Skipped step abandonment | Backtrack, complete |

---

## USER ESCALATION TEMPLATE

```markdown
## ⚠️ BLOCKED — User Decision Required

**Error**: {description}
**Impact**: {what's affected}

**Options**:
A) {Alternative approach} — {tradeoff}
B) {Skip with gap} — {documented limitation}
C) {Provide input} — {what's needed}
D) {Modify requirements} — {suggested change}

⏳ Awaiting your selection...
```

---

## RESILIENCE GUARANTEES

```yaml
guarantees:
  1_completion:
    rule: "Every workflow reaches completion OR user decision"
    enforcement: "Adaptive Correction ensures forward progress"
  
  2_embodiment:
    rule: "Agent file = Mandatory OS"
    enforcement: "Internal check verifies embodiment"
  
  3_self_healing:
    rule: "Violations trigger correction, not termination"
    enforcement: "Backtrack and update protocol"
  
  4_transparency:
    rule: "User always informed of corrections"
    enforcement: "Notification on all significant events"

operational_bounds:
  max_corrections_per_phase: 3
  max_corrections_per_step: 2
  on_limit: "Escalate to user with context"
```

---

## QUICK RECOVERY CHECKLIST

```
□ Error classified (E1-E4)?
□ Recovery attempted?
□ If blocked, options presented?
□ User decision awaited (not halted)?
□ Downstream impact assessed?
□ Correction verified before continuing?
```
