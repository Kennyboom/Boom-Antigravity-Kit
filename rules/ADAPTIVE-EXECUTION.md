# 🔀 ADAPTIVE EXECUTION

> **🚨 CRITICAL — ONE OF THREE**: This file is one of **three** equally authoritative rule files. All must be loaded and followed when running workflows: ORCHESTRATION-LAWS, ADAPTIVE-EXECUTION (this file), EXECUTION-PROTOCOL. Do not skip or approximate; treat every rule as **binding**.

> **LOAD CONDITION**: When deciding between sub-agent and EMBODY  
> **PURPOSE**: Tiered execution protocol with guaranteed task completion

---

## CORE PRINCIPLE

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  TIER 1 (SUB-AGENT): MANDATORY when tool exists                           ║
║  TIER 2 (EMBODY): FALLBACK only when Tier 1 impossible                    ║
║                                                                           ║
║  ❌ FORBIDDEN: Using TIER 2 when runSubagent available                    ║
║  ❌ FORBIDDEN: Skipping TIER 1 because task is "simple"                   ║
║  ❌ FORBIDDEN: Using TIER 2 for "efficiency" or "preference"              ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## TOOL DISCOVERY (EXECUTE FIRST)

```yaml
mandatory_tool_discovery:
  trigger: "BEFORE first agent delegation"
  
  step_1_check_tools:
    look_for:
      - "runSubagent"
      - "Agent" tool
      - "spawn_agent"
      - Any tool with "agent" or "delegate"
  
  step_2_classify:
    if_found:
      classification: "TIER_1_CAPABLE"
      action: "LOCK to TIER 1 for entire session"
    if_not_found:
      classification: "TIER_2_ONLY"
      action: "PERMIT TIER 2 with logged justification"
  
  step_3_announce:
    output: |
      ## 🔍 TOOL DISCOVERY
      | Check | Result |
      |-------|--------|
      | Sub-agent tool | ✅ / ❌ |
      | Tool name | `{name}` or N/A |
      | Execution tier | TIER 1 / TIER 2 |
```

---

## TIER 1: SUB-AGENT DELEGATION (MANDATORY)

```yaml
tier_1_subagent:
  priority: "HIGHEST - Always use when available"
  context_model: "ISOLATED (fresh memory, no pollution)"
  
  execution:
    1. Prepare handoff payload:
       include:
         - Original requirements (verbatim)
         - Task-specific instructions
         - Acceptance criteria
         - Constraints from prior phases
         - Selected skills context (if any skills were chosen for this task)
       exclude:
         - Internal reasoning
         - Failed attempts
         - Alternative approaches
    
    2. **Skills analysis** (MANDATORY — per EXECUTION-PROTOCOL § SKILLS ACTIVATION):
       - ⛔ STOP and analyze: Is task simple or complex?
       - Check agent's skills[] and {SKILLS_PATH}/ for relevant skills
       - ⛔ OUTPUT REQUIRED: "🎯 Skills Analysis: {simple|complex} → {using X,Y | skipping}"
       - If using: include skill guidelines in handoff context
    
    3. Invoke sub-agent:
       - Tool: runSubagent (or equivalent)
       - Agent: {agent_name}
       - Context: handoff payload + skills context
    
    4. Receive result:
       - Verify format matches agent spec
       - Check acceptance criteria
       - Store deliverable
    
    5. On system error:
       - Log error clearly
       - Fall back to TIER 2
       - Document: "Fallback due to: {error}"
  
  announcement: |
    🔀 **TIER 1**: SUB_AGENT_DELEGATION
    ├─ Agent: {agent_name}
    ├─ Context: ISOLATED
    └─ Action: Invoking sub-agent...
```

---

## TIER 2: EMBODY PATTERN (FALLBACK ONLY)

```yaml
tier_2_embody:
  priority: "FALLBACK - Only when Tier 1 impossible"
  context_model: "SHARED (same memory space)"
  
  activation_conditions:
    permitted:
      - Tool Discovery found NO sub-agent tools
      - Sub-agent tool returned system error
      - Platform explicitly rejected request
    forbidden:
      - Task seems "simple"
      - Wanting to "save tokens"
      - "Preserving context"
      - Any reason other than system limitation
  
  execution:
    1. Log activation:
       "⚠️ TIER 2 FALLBACK
        Reason: {system_error or no_tool}
        Note: Platform limitation, not optimization"
    
    2. Deep embodiment:
       - READ agent file COMPLETELY
       - EXTRACT: Core Directive, Thinking Protocol, Constraints, Format
       - EXTRACT: skills[] from frontmatter
       - BIND constraints as HARD RULES
       - ANNOUNCE: "📋 EMBODIED: {agent}"
    
    3. **Skills analysis** (MANDATORY — per EXECUTION-PROTOCOL § SKILLS ACTIVATION):
       - ⛔ STOP and analyze: Is task simple or complex?
       - Check agent's skills[] and {SKILLS_PATH}/ for relevant skills
       - ⛔ OUTPUT REQUIRED: "🎯 Skills Analysis: {simple|complex} → {using X,Y | skipping}"
       - If using: READ {SKILLS_PATH}/{skill}/SKILL.md, apply as guidance
    
    4. Execute as agent:
       - Follow THEIR thinking protocol EXACTLY
       - Apply THEIR constraints to every decision
       - Apply skill guidelines if skills were loaded
       - Produce output in THEIR format
       - CHECK every 3-5 actions: "Am I still {agent}?"
    
    5. Exit embodiment:
       - Store deliverable
       - Reset to Orchestrator
       - Continue workflow
  
  announcement: |
    🔀 **TIER 2**: EMBODY_PATTERN (fallback)
    ├─ Agent: {agent_name}
    ├─ Context: SHARED
    ├─ Reason: {system_error or no_tool}
    └─ Action: Reading agent file...
```

---

## DECISION FLOW

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 0: TOOL DISCOVERY (first delegation only)              │
│ ├─ Check for sub-agent tools                                │
│ └─ Cache result for session                                 │
├─────────────────────────────────────────────────────────────┤
│ STEP 1: TIER CHECK                                          │
│ ├─ IF tool found → MUST use TIER 1                          │
│ └─ IF no tool → USE TIER 2                                  │
├─────────────────────────────────────────────────────────────┤
│ STEP 2A: TIER 1 EXECUTION                                   │
│ ├─ Prepare handoff                                          │
│ ├─ Invoke sub-agent                                         │
│ ├─ IF success → Receive, verify, continue                   │
│ └─ IF system error → Fall back to TIER 2                    │
├─────────────────────────────────────────────────────────────┤
│ STEP 2B: TIER 2 EXECUTION                                   │
│ ├─ Log reason for fallback                                  │
│ ├─ Read agent file completely                               │
│ ├─ Execute deep embodiment                                  │
│ └─ Perform task, exit embodiment                            │
├─────────────────────────────────────────────────────────────┤
│ STEP 3: VERIFY & CONTINUE                                   │
│ ├─ Check deliverable meets criteria                         │
│ └─ Proceed to next phase                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## ANTI-LAZY-FALLBACK ENFORCEMENT

```yaml
anti_lazy_fallback:
  definition: |
    Using EMBODY when sub-agent tool IS available,
    based on subjective reasons like "task is simple"
  
  detection:
    - EMBODY used without Tool Discovery
    - EMBODY used when discovery confirmed TIER_1
    - Justifying EMBODY with task complexity
    - Mentioning "efficiency" when choosing EMBODY
  
  correction:
    1. STOP
    2. Log: "⚠️ LAZY FALLBACK DETECTED"
    3. Use sub-agent instead
    4. Continue with TIER 1
  
  strict_rules:
    ❌ NEVER assess task as "too simple" for sub-agent
    ❌ NEVER prioritize tokens over context isolation
    ❌ NEVER assume EMBODY is "good enough"
    ✅ ALWAYS use sub-agent when tool exists
    ✅ ALWAYS log sub-agent attempt before any EMBODY
    ✅ ALWAYS document system error if falling back
```

---

## CONTEXT MODEL COMPARISON

| Aspect | TIER 1: SUB-AGENT | TIER 2: EMBODY |
|--------|-------------------|----------------|
| Priority | ⭐ MANDATORY | 🔄 Fallback |
| Context | Fresh, isolated | Shared with parent |
| Quality | ✅ Optimal | ⚠️ Risk of pollution |
| Parallel | Yes | No (sequential) |
| Availability | Platform-dependent | Always available |
| When to use | ALWAYS when tool exists | ONLY when tool fails/absent |

---

## COMPLETION GUARANTEE

```yaml
guarantee:
  rule: "EVERY delegation request WILL be fulfilled"
  
  mechanism:
    - TIER 1 is primary when available
    - TIER 2 is fallback when TIER 1 fails
    - EMBODY always works (it's just reading + transforming)
  
  result:
    - NO task is ever skipped
    - NO delegation ever fails completely
    - System is future-proof (new platforms auto-detected)
```

---

## VERIFICATION CHECKLIST

```
□ Tool Discovery executed?
□ Correct tier selected?
□ If TIER 2, logged reason?
□ Agent file read completely?
□ Output matches agent format?
□ Task completed (not skipped)?
```
