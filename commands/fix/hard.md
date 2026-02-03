---
description: ⚡⚡⚡ Full Fix — Complete issue resolution with research
version: "1.0"
category: debugging
execution-mode: execute
---

# /fix:hard — Complete Issue Resolution

> **MISSION**: Full resolution workflow with research, planning, and validation.

<issue>$ARGUMENTS</issue>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):
1. CORE.md — Identity, Laws, Routing  
2. PHASES.md — Phase Execution  
3. AGENTS.md — Tiered Execution  

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (hard/focus variants enable find-skills).

---

## 🔀 TIERED EXECUTION

| Tier | When | Action |
|------|------|--------|
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLE FILES

| Agent | Output |
|-------|--------|
| debugger | `./reports/debugs/DEBUG-{issue}.md` |
| researcher | `./reports/researchers/RESEARCH-{issue}.md` |

All files in `./reports/` → English only.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what’s happening (announce before doing). Format: rules/PHASES.md § Phase output structure.

---

## 🎭 Phase 1: DEEP ANALYSIS

| Agent | `debugger` |
|-------|------------|
| Goal | Full root cause analysis |
| Exit | Root cause identified, impact assessed, failure chain documented |

---

## 🎭 Phase 2: RESEARCH

| Agent | `researcher` |
|-------|--------------|
| Goal | Research solution patterns |
| Exit | Solutions researched, best approach identified |

---

## 🎭 Phase 3: FIX PLANNING

| Agent | `planner` |
|-------|-----------|
| Goal | Create fix strategy with rollback |
| Exit | Plan created, rollback included |

---

## 🛡️ VERIFICATION CHECKPOINT — Context Optimization

> **PURPOSE**: Prevent "context rot" by clearing noisy debugging/planning history before implementation.
> 
> Long-running analysis sessions fill context with noise that degrades code generation quality.
> This checkpoint acts as a "firewall" between Planning and Implementation phases.

### ⚡ OPTIONS (Present to User)

```markdown
## 🛡️ Context Optimization Checkpoint

**Planning Complete** — Fix plan created with rollback strategy.

**Choose how to proceed with implementation:**

## 🛡️ VERIFICATION CHECKPOINT

> **⛔ BLOCKING**: Load Context Gate protocol NOW before proceeding.
>
> **LOAD**: `rules/CONTEXT-GATE.md` — Execute HARD MODE protocol
>
> This is a MANDATORY checkpoint. Cannot skip or bypass.

### ⚡ EXECUTION

```yaml
context_gate_execution:
  mode: "HARD (User Choice)"
  trigger: "After Phase 3 (Fix Planning) completes"
  protocol: "Follow rules/CONTEXT-GATE.md § HARD MODE"
  
  variant_adjustments:
    plan_type: "Fix plan with rollback strategy"
    remaining_phases: "Phase 4 → 5 → 5.5"
```

**DO NOT proceed to Phase 4 until user selects option.**

---

## 🎭 Phase 4: IMPLEMENTATION

| Agent | `tech-lead` → specialists |
|-------|---------------------------|
| Goal | Execute fix plan |
| Exit | Fix implemented, changes documented |

---

## 🎭 Phase 5: VALIDATION

| Agent | `tester` |
|-------|----------|
| Goal | Comprehensive validation |
| Exit | Issue resolved, tests pass, no regression |

---

## 🎭 Phase 5.5: ROLLBACK VERIFICATION (IF CRITICAL)

| Agent | `devops-engineer` |
|-------|-------------------|
| Trigger | Fix affects production or is critical |
| Goal | Verify rollback plan |
| Exit | Rollback documented, tested, recovery time estimated |

---

## COMPLETION

Present fix report with:

1. ✅ **Fixed** — Issue resolved
2. 🧪 **Test** → `/test`
3. 📝 **Docs** → `/docs:core`
