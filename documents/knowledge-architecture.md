# Agent Assistant — Knowledge Architecture

> **Purpose**: System design, component interactions, data flow, design patterns, and architectural decisions for AI agents and developers.

---

## 1. System Overview

Agent Assistant is a **multi-agent orchestration framework** that transforms a single AI coding assistant into a coordinated team of specialists. The architecture follows the **Orchestrator Pattern** with **Tiered Execution**.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                  │
│  (Claude Code / Cursor / Copilot / Antigravity)                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ORCHESTRATOR                                    │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │ COMMAND     │  │ WORKFLOW     │  │ AGENT           │  │ SKILL        │  │
│  │ ROUTER      │──▶│ ENGINE       │──▶│ DELEGATOR       │──▶│ RESOLVER     │  │
│  └─────────────┘  └──────────────┘  └─────────────────┘  └──────────────┘  │
│         ▲                                    │                              │
│         │                                    ▼                              │
│  ┌──────┴──────────────────────────────────────────────────────────────┐   │
│  │                        RULE ENGINE                                    │   │
│  │  (ORCHESTRATION-LAWS / EXECUTION-PROTOCOL / ADAPTIVE-EXECUTION)     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    ▼                                   ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────────┐
│         TIER 1: SUB-AGENT       │  │         TIER 2: EMBODY              │
│  (Native tool, isolated context)│  │  (Read agent file, shared context) │
└─────────────────────────────────┘  └─────────────────────────────────────┘
                    │                                   │
                    └─────────────────┬─────────────────┘
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SPECIALIST AGENTS (20)                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ tech-lead   │ │ backend-    │ │ frontend-   │ │ security-   │ ...       │
│  │             │ │ engineer    │ │ engineer    │ │ engineer    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MATRIX SKILL DISCOVERY (310+ Skills)                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ _index.yaml → Domain Files (19) → Skill Resolution → Skill Injection │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ backend │ │frontend │ │security │ │ quality │ │ devops  │ │   ...   │   │
│  │  .yaml  │ │  .yaml  │ │  .yaml  │ │  .yaml  │ │  .yaml  │ │         │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DELIVERABLES                                    │
│  ./reports/  ─────▶  Code, Plans, Designs, Tests, Documentation             │
│  ./documents/                                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Components

### 2.1 Orchestrator

The central coordination layer that never implements directly.

| Responsibility | Description |
|----------------|-------------|
| **Command Routing** | Parse user input → route to workflow file |
| **Workflow Execution** | Execute phases in order |
| **Agent Delegation** | Select and invoke specialist agents |
| **Skill Resolution** | Resolve and inject skills via Matrix |
| **Quality Verification** | Verify exit criteria before proceeding |
| **Deliverable Assembly** | Collect and synthesize outputs |

**Anti-Pattern**: Orchestrator NEVER writes code, debugs, tests, or designs directly.

### 2.2 Command Router

Routes user commands to appropriate workflow files.

```
Input Detection:
  /cook:fast "feature" → commands/cook/fast.md
  /docs:core → commands/docs/core.md
  /deploy:production → commands/deploy/production.md

Natural Language Detection:
  "implement X" → /cook
  "fix X" → /fix
  "plan X" → /plan
```

**Variant Resolution**:
- Colon syntax: `/docs:core` → command=docs, variant=core
- Slash syntax: `/docs/core` → command=docs, variant=core
- Both resolve to: `commands/{command}/{variant}.md`

### 2.3 Workflow Engine

Executes multi-phase workflows with strict ordering.

```
Phase Execution Flow:
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: INTAKE → Parse ALL requirements (zero loss)          │
│    ↓                                                         │
│ STEP 2: ROUTE → Load command workflow file                   │
│    ↓                                                         │
│ STEP 3: EXECUTE → Delegate phases to agents (in order)       │
│    ↓                                                         │
│ STEP 4: VERIFY → 100% requirement fulfillment check          │
│    ↓                                                         │
│ STEP 5: REPORT → Final delivery with evidence                │
└──────────────────────────────────────────────────────────────┘
```

**Key Rules**:
- One phase at a time (no batching)
- Full workflow in one reply
- Exit criteria verification before proceeding
- Deliverable files created per phase

### 2.4 Agent Delegator

Handles agent invocation with tiered execution.

```yaml
tier_selection:
  TIER_1_SUBAGENT:
    when: "runSubagent tool exists"
    action: "MUST invoke sub-agent"
    context: "ISOLATED (fresh memory)"
    priority: "MANDATORY"

  TIER_2_EMBODY:
    when: "Tool missing OR system error"
    action: "Read agent file, transform"
    context: "SHARED (same memory)"
    priority: "FALLBACK ONLY"
```

### 2.5 Skill Resolver (Matrix Skill Discovery)

Centralized skill resolution based on agent profiles.

```
Resolution Flow:
Agent Profile → _index.yaml → Domain Files → Skill Selection → Injection

Example:
  backend-engineer
    profile: "backend:execution"
    inherit_from: [backend, architecture, quality, data, languages]
      ↓
    Loads: backend.yaml, architecture.yaml, quality.yaml, data.yaml, languages.yaml
      ↓
    Filters: skills by agent ID or profile pattern
      ↓
    Sorts: by priority_score (10=critical, 1=optional)
      ↓
    Injects: skills into agent context
```

### 2.6 Rule Engine

Enforces orchestration laws and protocols.

| Rule File | Purpose | Priority |
|-----------|---------|----------|
| `ORCHESTRATION-LAWS.md` | 10 inviolable laws | CRITICAL |
| `EXECUTION-PROTOCOL.md` | Phase execution details | CRITICAL |
| `ADAPTIVE-EXECUTION.md` | Tier 1/2 decisions | CRITICAL |
| `AGENT-RULES.md` | Agent behavior guidelines | Reference |
| `SKILL-DISCOVERY.md` | Matrix resolution algorithm | Reference |
| `ERROR-RECOVERY.md` | Error handling protocols | Reference |
| `QUICK-REFERENCE.md` | Lookup tables | Reference |
| `BOOTSTRAP.md` | Entry point, paths, routing | Entry |

---

## 3. Data Flow

### 3.1 Request Processing Flow

```
┌──────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌──────────┐
│  USER    │───▶│ COMMAND   │───▶│ WORKFLOW  │───▶│ PHASE     │───▶│ AGENT    │
│  INPUT   │    │ DETECTION │    │ LOADING   │    │ EXECUTION │    │ INVOKE   │
└──────────┘    └───────────┘    └───────────┘    └───────────┘    └──────────┘
                                                                          │
┌──────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐          │
│  OUTPUT  │◀───│ SYNTHESIS │◀───│ VERIFY    │◀───│ SKILL     │◀─────────┘
│          │    │           │    │ CRITERIA  │    │ INJECTION │
└──────────┘    └───────────┘    └───────────┘    └───────────┘
```

### 3.2 Skill Resolution Flow

```
┌─────────────────┐
│ Agent Profile   │
│ "backend:exec"  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌───────────────────────────────────┐
│ _index.yaml     │────▶│ Lookup inherit_from:              │
│                 │     │ [backend, architecture, quality,  │
│                 │     │  data, languages]                 │
└─────────────────┘     └───────────────┬───────────────────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         ▼                              ▼                              ▼
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ backend.yaml    │          │ architecture.   │          │ quality.yaml    │
│ (20 skills)     │          │ yaml (9 skills) │          │ (17 skills)     │
└────────┬────────┘          └────────┬────────┘          └────────┬────────┘
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      ▼
                        ┌─────────────────────────┐
                        │ Filter by:              │
                        │ - agents: [agent-id]    │
                        │ - profiles: [pattern]   │
                        └───────────┬─────────────┘
                                    ▼
                        ┌─────────────────────────┐
                        │ Sort by priority_score  │
                        │ (10=critical → 1=low)   │
                        └───────────┬─────────────┘
                                    ▼
                        ┌─────────────────────────┐
                        │ Inject into Agent       │
                        │ Context                 │
                        └─────────────────────────┘
```

### 3.3 Deliverable Flow

```
Phase 1: scouter    → ./reports/scouts/SCOUT-{feature}.md
Phase 2: researcher → ./reports/researchers/RESEARCH-{feature}.md
Phase 3: planner    → ./reports/plans/PLAN-{feature}.md
Phase 4: designer   → ./reports/designs/DESIGN-{feature}.md
Phase 5: engineer   → Code files (actual implementation)
Phase 6: tester     → Test files
Phase 7: reviewer   → Review report
Phase 8: Complete   → Summary + deliverables list
```

---

## 4. Component Relationships

### 4.1 Agent Inheritance

```
                    ┌─────────────────┐
                    │   ORCHESTRATOR  │
                    │   (Coordinator) │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  MANAGER AGENTS │ │ EXECUTOR AGENTS │ │ VALIDATOR AGENTS│
│  (Coordinate)   │ │ (Implement)     │ │ (Verify)        │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ - tech-lead     │ │ - backend-eng   │ │ - tester        │
│ - planner       │ │ - frontend-eng  │ │ - reviewer      │
│ - proj-manager  │ │ - devops-eng    │ │ - debugger      │
│                 │ │ - mobile-eng    │ │ - security-eng  │
│                 │ │ - game-eng      │ │ - perf-engineer │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 4.2 Skill Domain Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SKILL DOMAINS (19)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ IMPLEMENTATION DOMAINS                                                │    │
│ │ backend(20) → frontend(18) → mobile(8) → gaming(3)                   │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ ARCHITECTURE DOMAINS                                                  │    │
│ │ architecture(9) → data(7) → cloud(11)                                │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ QUALITY DOMAINS                                                       │    │
│ │ quality(17) → security(6) → performance(1)                           │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ PLANNING DOMAINS                                                      │    │
│ │ planning(9) → research(11) → management(4)                           │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ DESIGN DOMAINS                                                        │    │
│ │ design(10)                                                            │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────────────────────┐    │
│ │ FOUNDATION DOMAINS                                                    │    │
│ │ languages(17) → tools(31) → devops(15) → ai_ml(13) → mcp(8)         │    │
│ └──────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Design Patterns

### 5.1 Orchestrator Pattern

The central coordination pattern that governs all work.

```
┌──────────────────────────────────────────────────────────────┐
│ ORCHESTRATOR PATTERN                                          │
├──────────────────────────────────────────────────────────────┤
│ Principle: Coordinate, never implement                       │
│                                                              │
│ Responsibilities:                                            │
│ ✅ Route commands to workflows                               │
│ ✅ Delegate tasks to specialists                             │
│ ✅ Verify exit criteria                                      │
│ ✅ Synthesize outputs                                        │
│                                                              │
│ Anti-patterns:                                               │
│ ❌ Write code directly                                       │
│ ❌ Debug issues directly                                     │
│ ❌ Test code directly                                        │
│ ❌ Design systems directly                                   │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Profile-Based Skill Injection

Replaces hardcoded skill lists with declarative profiles.

```yaml
# OLD (hardcoded)
skills: [api-patterns, database-design, nodejs-best-practices]

# NEW (profile-based)
profile: "backend:execution"
# Skills resolved at runtime from Matrix
```

**Benefits**:
- Single source of truth
- Centralized maintenance
- Consistent skill-agent mapping
- No agent file updates for new skills

### 5.3 Router Pattern

Commands use a router → variant pattern.

```
/command → commands/{command}.md (router)
         └→ Analyzes request
         └→ Selects variant (:fast, :hard, etc.)
         └→ Loads: commands/{command}/{variant}.md
```

### 5.4 Phase-Based Execution

All workflows execute as discrete phases.

```yaml
phase_pattern:
  entry: "Pre-flight checks (load rules)"
  phases:
    - phase_1: "Delegate to agent A, verify, emit deliverable"
    - phase_2: "Delegate to agent B, verify, emit deliverable"
    - phase_N: "Final agent, verify, emit deliverable"
  exit: "Completion summary"
```

### 5.5 Just-In-Time Loading

Resources loaded only when needed.

```yaml
jit_loading:
  rule_files: "Load per workflow needs"
  agent_files: "Load per phase delegation"
  skill_files: "Load based on Matrix resolution"
  prior_deliverables: "Load if required by current phase"
```

---

## 6. Integration Points

### 6.1 Tool Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLI INSTALLER (cli/install.js)                        │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     CURSOR      │       │     COPILOT     │       │   ANTIGRAVITY   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ ~/.cursor/      │       │ ~/.copilot/     │       │ ~/.gemini/      │
│ ├─ rules/       │       │ ├─ commands/    │       │ └─ antigravity/ │
│ ├─ commands/    │       │ ├─ skills/      │       │     ├─ agents/  │
│ ├─ agents/      │       │ ├─ agents/      │       │     ├─ commands/│
│ └─ skills/      │       │ └─ matrix-skills│       │     └─ skills/  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 6.2 Entry Point Files

| Tool | Entry File | Location |
|------|------------|----------|
| Claude Code | `CLAUDE.md` | `~/.claude/` |
| Cursor | `rules/agent-assistant.mdc` | `~/.cursor/rules/` |
| Copilot | `agent-assistant.agent.md` | `~/.copilot/` + VS Code prompts |
| Antigravity | `GEMINI.md` | `~/.gemini/` |

---

## 7. Scalability Considerations

### 7.1 Adding New Agents

1. Create agent file: `agents/{agent-name}.md`
2. Follow template: `AGENT-TEMPLATE.md`
3. Add profile mapping in `matrix-skills/_index.yaml`
4. Done — no other changes needed

### 7.2 Adding New Skills

1. Create skill folder: `skills/{skill-id}/SKILL.md`
2. Add entry to appropriate domain file: `matrix-skills/{domain}.yaml`
3. Done — no agent files need modification

### 7.3 Adding New Commands

1. Create router file: `commands/{command}.md`
2. Create variant files: `commands/{command}/{variant}.md`
3. Update command routing in entry point files
4. Done — follows existing patterns

---

## 8. Architectural Decisions

### ADR-001: Tiered Execution

**Context**: Need reliable agent delegation across different AI tools.

**Decision**: Use TIER 1 (native sub-agent tools) when available, TIER 2 (agent embodiment) as fallback.

**Rationale**: 
- TIER 1 provides isolated context (no memory pollution)
- TIER 2 ensures completion when tools unavailable
- Guaranteed task completion

### ADR-002: Matrix Skill Discovery

**Context**: Hardcoded skill lists in agent files cause maintenance overhead and inconsistency.

**Decision**: Replace hardcoded lists with profile-based skill resolution via centralized Matrix.

**Rationale**:
- Single source of truth
- Add skill = update 1 file
- Guaranteed consistency
- Reduced agent file size

### ADR-003: Phase-Based Workflows

**Context**: Complex features require multiple specialists in sequence.

**Decision**: All workflows execute as sequential phases with explicit exit criteria.

**Rationale**:
- Clear handoff points
- Verifiable progress
- Deliverable at each phase
- Quality gates between phases

### ADR-004: Just-In-Time Loading

**Context**: Loading all resources upfront wastes context window.

**Decision**: Load resources only when needed by current phase.

**Rationale**:
- Efficient context usage
- Faster initial response
- Reduced memory pressure

---

## 9. Security Considerations

| Aspect | Implementation |
|--------|----------------|
| **Code Injection** | No code execution from agent files |
| **Path Traversal** | Paths validated by CLI installer |
| **Privilege Escalation** | Agents cannot elevate their permissions |
| **Secret Exposure** | No credentials stored in framework files |

---

## 10. Related Documentation

| Document | Purpose |
|----------|---------|
| `knowledge-overview.md` | Project introduction, goals, tech stack |
| `knowledge-domain.md` | Data models, API contracts, entities |
| `knowledge-source-base.md` | Directory structure, file purposes |
| `knowledge-standards.md` | Code style, naming conventions |
| `rules/ORCHESTRATION-LAWS.md` | 10 inviolable laws |
| `rules/EXECUTION-PROTOCOL.md` | Phase execution details |
| `rules/ADAPTIVE-EXECUTION.md` | Tier 1/2 decisions |

---

**Agent Assistant Architecture** — _Layered, Extensible, Maintainable_
