---
description: Error classification, self-healing, and user escalation. AI must recover gracefully from all errors — never halt silently.
---

# Error Recovery Protocol v1.0

> Every error MUST lead to: successful completion OR explicit user decision.
> ❌ FORBIDDEN: Silent halt, unexplained termination.

---

## Error Classification

| Code | Type | Description | Recovery |
|:----:|------|-------------|----------|
| E1 | Transient | Timeout, network, API rate limit | Retry 3x with backoff (1s, 2s, 4s) |
| E1b | Overflow | File too large, output exceeded | Split into chunks |
| E2 | Recoverable | Logic error, wrong approach | Log error, try alternative approach |
| E3 | Blocking | Critical failure, missing dependency | Save state → pick best option → auto-recover |
| E4 | Cascading | Error affects downstream phases | Stop propagation → rollback → report impact |

---

## Self-Healing Protocol

```
ON ANY ERROR:
1. CAPTURE: error type, current phase, affected files
2. CLASSIFY: E1 / E1b / E2 / E3 / E4
3. ATTEMPT recovery:
   E1:  Retry (max 3 with exponential backoff)
   E1b: Switch to chunked strategy (split output)
   E2:  Log what failed, try alternative approach
   E3:  Save progress → pick best recovery option
   E4:  Rollback affected changes → report impact
4. IF recovery succeeds → RESUME immediately
5. IF recovery fails 3x → ESCALATE to user
6. NEVER halt silently
```

---

## User Escalation Template

When auto-recovery fails, present options:

```markdown
## ⚠️ BLOCKED — Decision Required

**Error**: [description of what went wrong]
**Impact**: [what's affected]
**Attempted**: [what recovery was tried]

**Options**:
A) [Alternative approach] — [tradeoff]
B) [Skip this step] — [what will be missing]
C) [Provide input] — [what information is needed]
D) [Modify requirements] — [suggested change]

⏳ Awaiting your choice...
```

---

## Anti-Patterns (MANDATORY awareness)

| Code | Anti-Pattern | Correct Behavior |
|:----:|-------------|-----------------|
| A1 | Silent halt — stop without explanation | Always explain + offer options |
| A2 | Swallow error — hide failure | Log + report immediately |
| A3 | Skip step — pretend it worked | Backtrack + complete |
| A4 | Infinite retry — loop forever | Max 3 retries then escalate |
| A5 | Blame user — "your code is wrong" | Diagnose + suggest fix |
| A6 | Partial output — deliver incomplete work | Complete fully or declare gap |
| A7 | Wrong scope — fix something else | Stick to reported error |
| A8 | Cascade ignore — let errors spread | Stop propagation early |

---

## Integration with Workflows

```
EVERY workflow phase must:
1. Wrap risky operations in error handling
2. Report errors using classification codes
3. Auto-recover when possible
4. Escalate when stuck

At workflow end, report error summary:
  "⚠️ Recovered from [N] errors during execution"
  OR
  "✅ Zero errors — clean execution"
```
