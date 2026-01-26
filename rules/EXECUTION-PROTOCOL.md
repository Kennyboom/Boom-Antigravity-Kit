# 🔄 EXECUTION PROTOCOL

> **🚨 CRITICAL — DO NOT IGNORE**: These **three** rule files are equally **authoritative** and must all be followed:
>
> 1. **ORCHESTRATION-LAWS.md** — 10 inviolable laws of orchestration
> 2. **ADAPTIVE-EXECUTION.md** — sub-agent vs EMBODY, tiered execution
> 3. **EXECUTION-PROTOCOL.md** (this file) — phase loop, phase output, workflow routing  
>    Do not skip, approximate, or rely on memory. Treat every rule in all three as **binding**. If you have not loaded and applied all three, do not emit any phase block.

> **LOAD CONDITION**: When executing command workflows  
> **PURPOSE**: Master execution loop and phase execution details  
> **⛔ LOAD REQUIREMENT**: Workflows **must** load this file **before** emitting any phase block (e.g. before Phase 1). Phase output is defined only in § Phase output structure below.

---

## 🛑 PRE-FLIGHT (CANONICAL — COMMON FOR ALL RULES)

**LOAD now** (in order; path = `./rules/` in repo, or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. ORCHESTRATION-LAWS.md
2. ADAPTIVE-EXECUTION.md
3. EXECUTION-PROTOCOL.md

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files for this workflow; they override any conflicting instructions in the workflow file. (No rule is singled out — phase output, delegation, language, deliverables, etc. all come from these rule files.)

---

## INITIALIZATION (ONCE PER SESSION)

```bash
# Resolve paths
echo $HOME  # → /Users/jdoe

# Set canonical paths
COMMANDS_PATH = {HOME}/.{TOOL}/skills/agent-assistant/commands/
AGENTS_PATH   = {HOME}/.{TOOL}/skills/agent-assistant/agents/
SKILLS_PATH   = {HOME}/.{TOOL}/skills/
RULES_PATH    = {HOME}/.{TOOL}/skills/agent-assistant/rules/
```

---

## MASTER EXECUTION LOOP

```
┌──────────────────────────────────────────────────────────┐
│ STEP 1: INTAKE → Parse ALL requirements (zero loss)      │
│    ↓                                                     │
│ STEP 2: ROUTE → Load command workflow file               │
│    ↓                                                     │
│ STEP 3: EXECUTE → Delegate phases to agents (in order)   │
│    ↓                                                     │
│ STEP 4: VERIFY → 100% requirement fulfillment check      │
│    ↓                                                     │
│ STEP 5: REPORT → Final delivery with evidence            │
└──────────────────────────────────────────────────────────┘
```

---

## STEP 1: REQUIREMENT INTAKE

```markdown
## 📋 Requirements Registry

| ID  | Requirement   | Source   | Status     |
| --- | ------------- | -------- | ---------- |
| R1  | {requirement} | {source} | ⏳ Pending |
| R2  | {requirement} | {source} | ⏳ Pending |

**Ambiguity Check**: [ ] All requirements CLEAR
```

**Exit**: All requirements extracted and numbered.

---

## STEP 2: WORKFLOW ROUTING

**Variant in input** = user typed a variant. Accept BOTH forms:

- **Colon**: `/docs:core`, `/plan:hard` → command=docs variant=core, command=plan variant=hard
- **Slash**: `/docs/core`, `/plan/hard` → same. File path is always `{command}/{variant}.md`.

If variant is present → LOAD `{COMMANDS_PATH}/{command}/{variant}.md` directly; do NOT load `{command}.md` first.

```yaml
routing:
  1. DETECT command type (explicit /command or natural language)
  2. PARSE variant: "/docs/core" or "/docs:core" → command=docs, variant=core. "/docs" alone → no variant.
  3. IF variant in input (e.g. /plan:hard or /docs/core):
     → LOAD: {COMMANDS_PATH}/{command}/{variant}.md
     → PARSE phases from that file. GO TO 6.
  4. ELSE: LOAD: {COMMANDS_PATH}/{command}.md
  5. IF loaded file has execution-mode: router (no variant in input):
     a. Apply that file's ROUTING LOGIC to choose variant (:fast, :hard, …)
     b. LOAD: {COMMANDS_PATH}/{command}/{chosen_variant}.md
     c. PARSE workflow phases from the variant file (NOT from the router)
     d. ⛔ Never produce deliverables from the router file; only the variant file defines phases and output format.
  6. LOCK workflow (no modifications)
```

**Output** (use format from the **variant** workflow file):

```markdown
## 🔀 Workflow Loaded

| Property | Value                  |
| -------- | ---------------------- |
| Command  | `/{command}:{variant}` |
| Phases   | {count}                |

### Execution Plan

1. {phase_1} → `{agent_1}`
2. {phase_2} → `{agent_2}`

### ⛔ Execution

Execute **Phase 1, then Phase 2, then …** in order, in the **same reply**. Load only what each phase needs (no batching). **Emit phase output** per **STEP 3 § Phase output structure** (canonical block). **Continue until workflow complete.**
```

---

## STEP 3: PHASE EXECUTION

### ⛔ ONE PHASE AT A TIME — NO BATCHING (run full workflow in one reply)

Execute **one phase at a time in order**, but **continue until the workflow is complete** in the same reply. Do not load all agents/context up front; do not write all deliverables in one batch.

```yaml
for_each_phase_N_in_order:
  # Phase output format: use ONLY the canonical block in "§ Phase output structure" below. Do not invent your own.
  1. EMIT NOW (phase start, before any work): first line of that block. Then load ONLY what Phase N needs (see "Allowed loads per phase" below).
  2. When you delegate: EMIT NOW the Sub-agent or Embodying line per that block (TIER 1 vs TIER 2). Then run the agent.
  3. As the agent works (or when done): output work content/summary in your reply under that phase.
  4. When phase is complete: EMIT NOW the Exit Criteria + ✅ complete + Deliverable lines per that block.
  5. Write Phase N's deliverable file(s) if not already done.
  6. CONTINUE: Proceed to Phase N+1 in the same reply. Do not stop.

until_workflow_complete:
  - After last phase: last phase's completion block per § Phase output structure → COMPLETION (summary, final deliverables).
```

**Do not stop mid-workflow:** After Phase 1 → run Phase 2 immediately → Phase 3 → … until the last phase. One reply runs the full workflow.

**Forbidden (batching):** Reading researcher + scouter + planner (and codebase) in one go, then writing RESEARCH + SCOUT + PLAN in one go = protocol violation.

**Allowed loads per phase (enforcement):**

- Phase N may load **only**: (a) the agent file for phase N, (b) prior deliverables explicitly required by the workflow for phase N, (c) workflow file, (d) EXECUTION-PROTOCOL / ORCHESTRATION-LAWS as referenced.
- **Forbidden in Phase N**: Loading agents for phase N+1, N+2, …; scanning codebase or other context not needed for phase N alone.
- Example (plan:hard): Phase 1 may load researcher + task only. Phase 2 may load scouter + RESEARCH deliverable. Phase 4 may load planner + RESEARCH + SCOUT. Phase 1 must NOT load scouter, planner, or full codebase.

---

### Phase output structure (MANDATORY — single source of truth)

**⛔ This is the ONLY place the phase output format is defined.** Every other mention in this file or in BOOTSTRAP / workflows must **point here** and must **not** redefine it.

**When to emit:** At phase start → line 1. When delegating → line 2 (TIER 1) or 3 (TIER 2). At phase end → lines 4–8. **Report as you go**; do not dump the whole block at the end. Headings.

**Canonical phase block — emit exactly:**

```markdown
## 🎭 Phase {N}: {phase_name}

### Sub-agent: `{agent}` — {role} ← when sub-agent invoked (TIER 1)

### Embodying: `{agent}` — {role} ← when embody (TIER 2)

{agent work / summary — as it happens or when done}

### Exit Criteria

- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete

**Deliverable**: {brief summary}
```

**Rules:** TIER 1 → use Sub-agent line only; TIER 2 → use Embodying line only. Content (phase_name, role, criteria text, summary) may follow user language; the **headings and icons** in the block do not.

**Wrong:** Batched output at phase end; "Embodying" when sub-agent was used; omitting 🎭 or ✅; translating the structural lines. **Right:** Emit each part of the block at the right moment, in order.

**Scope:** Workflows supply _content_ (e.g. exit-criteria items); they do not redefine this format. Agent **## 📤 Output Format** applies to the **deliverable file** only; the phase block in chat is the orchestrator’s and is defined **only** by the canonical block above.

Full workflow template (Requirements Registry, Final Verification, Workflow Complete): see **OUTPUT FORMAT TEMPLATE** at bottom of this file.

---

### A. TOOL DISCOVERY (FIRST DELEGATION ONLY)

```yaml
tool_discovery:
  action: "Check for runSubagent/Agent Tool"
  on_found: "LOCK to TIER 1 for session"
  on_missing: "PERMIT TIER 2"

  output: |
    ## 🔍 Tool Discovery
    | Check | Result |
    |-------|--------|
    | Sub-agent tool | ✅ YES / ❌ NO |
    | Execution tier | TIER 1 / TIER 2 |
```

### B. PRIOR DELIVERABLE CHECK

```yaml
before_each_phase:
  1. CHECK: Does prior deliverable exist?
    - ./reports/plans/PLAN-{feature}.md
    - ./reports/scouts/SCOUT-{feature}.md
    - ./reports/researchers/RESEARCH-{feature}.md

  2. IF exists:
    - READ completely
    - EXTRACT constraints
    - LOCK as immutable

  3. IF missing but REQUIRED:
    - STOP
    - NOTIFY: "⚠️ Missing: {deliverable}"
    - ROUTE to creating agent
    - RESUME after created
```

### C. AGENT DELEGATION (TIERED)

```yaml
TIER_1_SUBAGENT (MANDATORY when tool exists):
  1. Prepare handoff payload:
     - Task description
     - Constraints from prior phases
     - Acceptance criteria
  2. Invoke runSubagent with agent name
  3. Receive result
  4. Verify against criteria
  5. IF system error → Fallback to TIER 2

TIER_2_EMBODY (FALLBACK only):
  1. READ agent file: {AGENTS_PATH}/{agent}.md COMPLETELY
  2. EXTRACT:
     - Core Directive (verbatim)
     - Thinking Protocol (exact steps)
     - Constraints (all of them)
     - Output Format = deliverable **file** only (agent’s "## 📤 Output Format"). Phase block in chat = your responsibility per STEP 3 § Phase output structure; not overridden by agent file.
  3. ANNOUNCE:
     "📋 EMBODIED: {agent}
      Directive: {extracted}
      Protocol: {name}
      Constraints: {count}"
  4. EXECUTE as agent:
     - Follow THEIR thinking protocol
     - Apply THEIR constraints
     - Produce deliverable file per THEIR Output Format
     - You (orchestrator) still emit the phase block per **STEP 3 § Phase output structure** (canonical block) at the right moments; do not let embodiment replace that.
  5. EXIT embodiment
  6. Store deliverable
```

### D. EXIT CRITERIA VERIFICATION

```yaml
for_each_phase:
  - [ ] Deliverable produced
  - [ ] Output matches agent's format
  - [ ] Exit criteria met
  - [ ] No scope creep
  - [ ] Agent would recognize this as their work
  - [ ] User-facing report used STEP 3 § Phase output structure (canonical block) at the right moments
```

---

## STEP 4: REQUIREMENT VERIFICATION

```yaml
verification:
  for_each_requirement:
    - TRACE: Which phase addressed this?
    - EVIDENCE: What deliverable satisfies this?
    - STATUS: ✅ Met | ⚠️ Partial | ❌ Not met

  result: ALL ✅ → Proceed to Report
    ANY ❌ → BLOCK, list unmet, route back
    ANY ⚠️ → Flag, request user acceptance
```

---

## STEP 5: FINAL REPORT

```markdown
## ✅ EXECUTION COMPLETE

### 📋 Requirements Summary

| ID  | Requirement | Status | Evidence |
| --- | ----------- | ------ | -------- |
| R1  | {req}       | ✅     | {proof}  |

### 🔀 Workflow Execution

| Phase | Agent   | Status | Deliverable |
| ----- | ------- | ------ | ----------- |
| 1     | {agent} | ✅     | {summary}   |

### 📦 Final Deliverables

{list of concrete outputs}

### ⚠️ Notes & Follow-ups

{any warnings or next steps}
```

---

## SKILLS ACTIVATION (ANALYSIS MANDATORY, USAGE OPTIONAL)

> **⛔ The ANALYSIS step is MANDATORY — you must explicitly consider skills for every phase.**  
> **💡 The USAGE is optional — based on your analysis, you decide to use or skip.**  
> **🚫 Silently skipping this section is FORBIDDEN — always state your decision.**

### Protocol (MUST execute for every agent delegation)

```yaml
skill_decision:
  # ⛔ STEP 1 IS MANDATORY — DO NOT SKIP
  step_1_analyze_task (MANDATORY):
    action: "STOP and explicitly analyze the task"
    questions:
      - Is this task simple/trivial (e.g. fix typo, rename variable, add comment)?
      - Or complex/specialized (e.g. design UI, optimize performance, security audit)?
      - Would domain expertise significantly improve the output?
      - Are there skills in agent's list or {SKILLS_PATH}/ that match this task?

    # ⛔ YOU MUST OUTPUT YOUR DECISION — no silent skipping
    output_required: |
      🎯 **Skills Analysis**: {task_type: simple | complex}
      → Decision: {using: skill1, skill2 | skipping — reason}

  step_2_select_skills (if complex):
    sources:
      1. Agent's skills[] in frontmatter (suggestions, not requirements)
      2. Global library: {SKILLS_PATH}/ (may have better matches)

    selection_criteria:
      - Does this skill's triggers/description match the task?
      - Will it provide guidelines that improve quality?
      - Is it worth the token cost?

    flexibility: |
      Agent's skills[] is a starting point, NOT a strict list.
      You may:
      - Skip some agent skills if irrelevant to current task
      - Add skills from {SKILLS_PATH}/ that better match the task
      - Use zero skills if task is simple enough

  step_3_load_selected (if using skills):
    FOR EACH selected_skill:
      1. READ: {SKILLS_PATH}/{skill}/SKILL.md
      2. PARSE: triggers, guidelines, constraints
      3. APPLY: as additional guidance
```

### ⛔ Mandatory output (EVERY phase)

**You MUST emit one of these in your reply when delegating to an agent:**

**If using skills:**

```
🎯 **Skills Analysis**: Complex task (UI design / API / security / etc.)
→ Using: `skill1`, `skill2` — {why these help}
```

**If skipping skills:**

```
🎯 **Skills Analysis**: Simple task (fix typo / rename / minor change)
→ Skipping skills — base knowledge sufficient
```

**🚫 FORBIDDEN:** Proceeding without stating your skills decision. AI tends to skip optional steps — this output makes the decision visible and accountable.

### Examples

**Simple task — skip skills:**

```
Task: "Fix typo in README.md"
Agent: docs-manager (skills: [documentation-templates, clean-code, repomix])
Decision: Task is trivial → skip skills → just fix the typo
```

**Complex task — select relevant skills:**

```
Task: "Build a responsive dashboard with charts"
Agent: frontend-engineer (skills: [frontend-design, react-patterns, nextjs-best-practices, tailwind-patterns, ui-ux-pro-max])
Decision: Complex UI task → load ui-ux-pro-max (design patterns), tailwind-patterns (styling)
         → Skip react-patterns, nextjs-best-practices (not specifically needed for this task)
Announce: "🎯 Skills: `ui-ux-pro-max`, `tailwind-patterns` — dashboard design & responsive styling"
```

**Better skill in global library:**

```
Task: "Implement OAuth2 authentication"
Agent: backend-engineer (skills: [api-patterns, database-design, nodejs-best-practices, ...])
Decision: Agent's skills don't cover auth specifically
         → Check {SKILLS_PATH}/ → find `better-auth` skill
         → Load better-auth instead of/in addition to agent skills
Announce: "🎯 Skills: `better-auth` — authentication best practices"
```

### Guidelines

| Situation                         | Recommendation                                             |
| --------------------------------- | ---------------------------------------------------------- |
| Trivial task (< 5 min work)       | Skip skills                                                |
| Standard task, agent knows domain | Use 1-2 most relevant agent skills                         |
| Complex/specialized task          | Load relevant skills from agent + global library           |
| Task outside agent's expertise    | Search {SKILLS_PATH}/ for better matches                   |
| Performance-critical              | Consider `performance-profiling` skill                     |
| Security-sensitive                | Consider `vulnerability-scanner`, `senior-security` skills |

---

## MISSING STEP RECOVERY

```yaml
on_missing_step:
  1. Complete current task to safe point
  2. NOTIFY: "⚠️ Step omitted: {step}"
  3. BACKTRACK to execute missing step
  4. Analyze downstream impact
  5. Update affected work
  6. Resume normal flow

  NEVER: Stop or abandon task
```

---

## OUTPUT FORMAT TEMPLATE

Phase output is defined only in **STEP 3 § Phase output structure** (canonical block). Do not duplicate it here.

```markdown
## 📋 Requirements Registry

| ID  | Requirement | Status |
| --- | ----------- | ------ |
| R1  | {req}       | ⏳     |

---

## 🔀 Workflow: `/{command}:{variant}`

**Phases**: {N}

---

(Each phase: emit output progressively per STEP 3 § Phase output structure.)

---

## 📋 Final Verification

| ID  | Requirement | Status | Evidence   |
| --- | ----------- | ------ | ---------- |
| R1  | {req}       | ✅     | {evidence} |

---

## ✅ Workflow Complete

**All requirements fulfilled.**
```
