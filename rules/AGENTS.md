# 🤖 AGENTS

> **LOAD**: When delegating to agents | **PURPOSE**: Agent handling protocol

---

## TIERED EXECUTION

### TIER 1: Sub-agent (MANDATORY when tool exists)

```yaml
1. Prepare handoff:
   include: requirements, task, acceptance criteria, constraints
   exclude: internal reasoning, failed attempts

2. Skills analysis: (output required)
   "🎯 Skills Analysis: {simple|complex} → {using X | skipping}"

3. Invoke: runSubagent(agent_name, context)

4. Verify: format matches, criteria met

5. On error: fallback to TIER 2, log reason
```

### TIER 2: EMBODY (Fallback only)

```yaml
permitted_when:
  - Tool Discovery found NO sub-agent tools
  - Sub-agent tool returned system error

forbidden_reasons:
  - Task seems "simple"
  - "Save tokens"
  - "Efficiency"

execution:
  1. Log: "⚠️ TIER 2: {reason}"
  2. READ agent file COMPLETELY
  3. EXTRACT: Directive, Protocol, Constraints, Format
  4. ANNOUNCE embodiment (see format below)
  5. EXECUTE as agent (follow THEIR protocol)
  6. EXIT embodiment, continue as orchestrator
```

**Embodiment Announcement Format**:
```markdown
📋 EMBODIED: `{agent}`
**Directive**: {core directive verbatim}
**Protocol**: {thinking protocol summary}
**Constraints**: {key constraints}
```

---

## TOOL DISCOVERY (First delegation only)

```markdown
## 🔍 Tool Discovery
| Check | Result |
|-------|--------|
| Sub-agent tool | ✅ / ❌ |
| Execution tier | TIER 1 / TIER 2 |
```

**Cache**: Tool discovery result is cached for session. Do not re-check.

---

## CONTEXT MODEL COMPARISON

| Aspect | TIER 1: Sub-agent | TIER 2: EMBODY |
|--------|-------------------|----------------|
| Priority | ⭐ MANDATORY | 🔄 Fallback |
| Context | Fresh, isolated | Shared with parent |
| Quality | ✅ Optimal | ⚠️ Risk of pollution |
| Parallel | Yes | No (sequential) |
| Availability | Platform-dependent | Always available |

---

## COMPLETION GUARANTEE

```yaml
rule: "EVERY delegation request WILL be fulfilled"

mechanism:
  - TIER 1 is primary when available
  - TIER 2 is fallback when TIER 1 fails
  - EMBODY always works (read + transform)

result:
  - NO task is ever skipped
  - NO delegation ever fails completely
  - System is future-proof
```

---

## AGENT CATEGORIES

| Category | Agents | Purpose |
|----------|--------|---------|
| **meta** | tech-lead, planner | Coordinate, never implement |
| **execution** | backend-engineer, frontend-engineer, mobile-engineer, game-engineer, database-architect | Implementation |
| **validation** | tester, reviewer, security-engineer, performance-engineer, debugger | QA |
| **research** | researcher, scouter, brainstormer, designer | Investigation |
| **support** | docs-manager, devops-engineer, business-analyst, project-manager, reporter | Support |

---

## TASK → AGENT MAPPING

| Task | Agent |
|------|-------|
| API, backend logic | `backend-engineer` |
| UI, components | `frontend-engineer` |
| Database schema | `database-architect` |
| Security | `security-engineer` |
| Testing | `tester` |
| Code review | `reviewer` |
| Debugging | `debugger` |
| Planning | `planner` |
| Research | `researcher` |
| Codebase analysis | `scouter` |
| Documentation | `docs-manager` |
| Deployment | `devops-engineer` |
| Reports | `reporter` |
| Project management | `project-manager` |
| Business analysis | `business-analyst` |
| Design | `designer` |
| Brainstorming | `brainstormer` |
| Game development | `game-engineer` |
| Mobile development | `mobile-engineer` |
| Technical leadership | `tech-lead` |

---

## CONTEXT ISOLATION (Clean Handoffs)

```
INCLUDE:
  - Original requirements (verbatim)
  - Decisions from prior phases
  - Concrete deliverables
  - Current state

EXCLUDE:
  - Internal reasoning
  - Failed attempts
  - Alternatives not selected
```

---

## RECURSIVE DELEGATION

```
IF agent.category == "meta" OR agent.handoffs.length > 0:
  → This is a MANAGER agent
  → MUST delegate to specialists
  → NEVER implement directly
```

---

## ANTI-LAZY FALLBACK DETECTION

```yaml
detection:
  - Choosing TIER 2 without attempting TIER 1
  - Justifying EMBODY with "task is simple"
  - Mentioning "efficiency" when choosing EMBODY

correction:
  1. STOP
  2. Log: "⚠️ LAZY FALLBACK DETECTED"
  3. Attempt TIER 1 first
  4. Only use TIER 2 if TIER 1 actually fails

strict_rules:
  ❌ NEVER assess task as "too simple" for sub-agent
  ❌ NEVER prioritize tokens over context isolation
  ✅ ALWAYS use sub-agent when tool exists
  ✅ ALWAYS log sub-agent attempt before any EMBODY
```
