# Agent Assistant — Knowledge Domain

> **Purpose**: Data models, schema definitions, API contracts, domain entities, and business rules for AI agents and developers.

---

## 1. Domain Overview

Agent Assistant operates in the domain of **AI-assisted software development orchestration**. The system manages three primary entity types:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     AGENTS      │────▶│    COMMANDS     │────▶│     SKILLS      │
│  (21 entities)  │     │  (50+ entities) │     │ (310+ entities)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     RULES       │     │   DELIVERABLES  │     │     MATRIX      │
│  (8 entities)   │     │  (file outputs) │     │  (19 domains)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 2. Core Entities

### 2.1 Agent Entity

Agents are specialist personas that perform specific development tasks.

#### Schema

```yaml
# Agent File: agents/{agent-name}.md
---
name: string                    # kebab-case identifier (e.g., "backend-engineer")
profile: string                 # domain:category pattern (e.g., "backend:execution")
tools: string[]                 # Available tools [Read, Grep, Glob, Edit, ...]
handoffs: string[]              # Agents this agent can delegate to
version: string?                # Optional version (e.g., "1.0")
---
```

#### Agent Catalog

| Agent ID | Profile | Primary Domain | Role |
|----------|---------|----------------|------|
| `backend-engineer` | backend:execution | backend | Server-side logic, APIs, data access |
| `frontend-engineer` | frontend:execution | frontend | UI, React, a11y, performance |
| `tech-lead` | architecture:orchestration | architecture | Orchestration, routing, quality |
| `database-architect` | data:execution | data | Schema, migrations, tuning |
| `security-engineer` | security:validation | security | Threat model, OWASP, secure coding |
| `devops-engineer` | devops:execution | devops | CI/CD, infra, deploy, rollback |
| `tester` | quality:validation | quality | Test strategy, automation, coverage |
| `reviewer` | quality:review | quality | Code review, plan compliance |
| `debugger` | quality:debugging | quality | Reproduce, hypothesize, root cause |
| `planner` | planning:analysis | planning | Implementation plans, risks, rollback |
| `researcher` | research:analysis | research | Docs, sources, comparisons |
| `scouter` | research:exploration | research | Codebase exploration, patterns |
| `brainstormer` | planning:discovery | planning | Requirements, clarification |
| `business-analyst` | planning:business | planning | Stakeholders, INVEST, user stories |
| `designer` | design:creative | design | UI/UX, design system, a11y |
| `docs-manager` | research:documentation | research | README, API docs, guides |
| `performance-engineer` | performance:validation | performance | Profiling, bottlenecks, budgets |
| `project-manager` | management:orchestration | management | Sprints, risks, delivery |
| `mobile-engineer` | mobile:execution | mobile | iOS/Android, React Native, Flutter |
| `game-engineer` | gaming:execution | gaming | Game loop, 3D, performance |

#### Agent File Structure

```markdown
<!-- 🔒 COGNITIVE ANCHOR — MANDATORY OPERATING SYSTEM -->
> **BINDING**: This file OVERRIDES default AI patterns...

## 📋 Identity

| Property | Value |
|----------|-------|
| **ID** | {agent-name} |
| **Role** | {role description} |
| **Profile** | {domain}:{category} |
| **Reports To** | Orchestrator |

## 🎯 Core Directive
{1-2 sentence mission statement}

## ⚡ Skills (Matrix Discovery)
Profile: `{domain}:{category}`
Skills are resolved from matrix-skills/{domain}.yaml at runtime.

## 🧠 Thinking Protocol
Step 0: Load Context
Step 1: ...
Step N: Deliver

## ⛔ Constraints
| NEVER | ALWAYS |
|-------|--------|
| ... | ... |

## 📤 Output Format
{Deliverable template}
```

### 2.2 Command Entity

Commands define development workflows that users can invoke.

#### Schema

```yaml
# Command File: commands/{command}.md or commands/{command}/{variant}.md
---
description: string             # Human-readable description
version: string                 # e.g., "1.0"
category: string                # e.g., "development", "quality", "planning"
execution-mode: string          # "execute" | "router"
---
```

#### Command Catalog

| Command | Description | Variants | Category |
|---------|-------------|----------|----------|
| `/cook` | Implement features | `:fast`, `:hard`, `:focus` | development |
| `/code` | Write code snippets | `:fast`, `:hard`, `:focus` | development |
| `/fix` | Fix bugs and refactor | `:fast`, `:hard`, `:focus` | development |
| `/test` | Generate tests | `:fast`, `:hard`, `:focus` | quality |
| `/review` | Code review | `:fast`, `:hard` | quality |
| `/debug` | Systematic debugging | `:fast`, `:hard`, `:focus` | quality |
| `/plan` | Implementation planning | `:fast`, `:hard`, `:focus` | planning |
| `/report` | Create/update reports, summaries | `:fast`, `:hard`, `:focus` | documentation |
| `/brainstorm` | Requirements discovery | `:fast`, `:hard` | planning |
| `/design` | UI/UX design | `:fast`, `:hard` | planning |
| `/docs` | Documentation | `:core`, `:business`, `:audit` | documentation |
| `/deploy` | Deployment | `:check`, `:preview`, `:production`, `:rollback` | deployment |
| `/ask` | Q&A about codebase | `:fast`, `:hard` | utility |
| `/auto` | Auto-detect command | — | utility |

#### Variant Types

| Variant | Purpose | Agents Used | Quality Gates |
|---------|---------|-------------|---------------|
| `:fast` | Quick execution | 2-3 agents | Minimal |
| `:hard` | Full workflow | 5-8 agents | All 5 gates |
| `:focus` | Full workflow with clear context | 5-8 agents | All 5 gates |
| `:core` | Core documentation | scouter, docs-manager | — |
| `:business` | Business documentation | researcher, business-analyst, docs-manager | — |
| `:audit` | Security/compliance audit | security-engineer, docs-manager | — |

### 2.3 Skill Entity

Skills are domain knowledge packages that enhance agent capabilities.

#### Schema

```yaml
# Skill Entry in matrix-skills/{domain}.yaml
- skill_id: string              # Unique identifier (kebab-case)
  category: string              # core | expert | specialized | utility
  priority_score: number        # 1-10 (10 = critical)
  relevance_mapping:
    agents: string[]            # Agent IDs that receive this skill
    profiles: string[]          # Profile patterns (e.g., "backend:*")
  description: string           # AI-recognizable purpose summary
```

#### Skill File Structure

```
skills/{skill-id}/
├── SKILL.md                    # Main skill definition
├── references/                 # Reference materials (optional)
│   └── *.md
├── scripts/                    # Executable scripts (optional)
│   └── *.py, *.js
└── assets/                     # Templates, assets (optional)
```

#### Skill Categories

| Category | Priority Range | Description |
|----------|----------------|-------------|
| `core` | 8-10 | Essential skills for the domain |
| `expert` | 6-8 | Advanced domain expertise |
| `specialized` | 5-7 | Niche or technology-specific |
| `utility` | 3-5 | Helper tools and utilities |

### 2.4 Rule Entity

Rules define orchestration behavior and constraints.

#### Schema

Rules are Markdown files with structured sections.

```markdown
# {Rule Name}

> **LOAD CONDITION**: When {condition}
> **PURPOSE**: {description}

## SECTION 1: {Topic}
{Rules and guidelines}

## SECTION N: {Topic}
{Rules and guidelines}
```

#### Rule Catalog

| Rule File | Purpose | Authority |
|-----------|---------|-----------|
| `BOOTSTRAP.md` | Entry point, paths, routing | Entry |
| `ORCHESTRATION-LAWS.md` | 10 inviolable laws | CRITICAL |
| `EXECUTION-PROTOCOL.md` | Phase execution, output format | CRITICAL |
| `ADAPTIVE-EXECUTION.md` | Tier 1/2 delegation | CRITICAL |
| `AGENT-RULES.md` | Agent behavior guidelines | Reference |
| `SKILL-DISCOVERY.md` | Matrix resolution algorithm | Reference |
| `ERROR-RECOVERY.md` | Error handling protocols | Reference |
| `QUICK-REFERENCE.md` | Lookup tables | Reference |

### 2.5 Matrix Domain Entity

Matrix domains organize skills by development area.

#### Schema

```yaml
# In matrix-skills/_index.yaml
domains:
  {domain-name}:
    file: string                # "{domain}.yaml"
    name: string                # Human-readable name
    description: string         # Domain purpose
    skill_count: number         # Number of skills in domain
```

#### Domain Catalog

| Domain ID | Name | Skills | Description |
|-----------|------|--------|-------------|
| `backend` | Backend Development | 20 | Server-side logic, APIs, data access |
| `frontend` | Frontend Development | 18 | UI/UX, web applications, client-side |
| `architecture` | System Architecture | 9 | Design patterns, system design, ADRs |
| `quality` | Quality Assurance | 17 | Testing, code review, validation |
| `security` | Security Engineering | 6 | Threat modeling, secure coding, compliance |
| `design` | UI/UX Design | 10 | Visual design, user experience, accessibility |
| `planning` | Planning & Analysis | 9 | Requirements, task breakdown, roadmaps |
| `devops` | DevOps & Deployment | 15 | CI/CD, infrastructure, containerization |
| `data` | Data & Database | 7 | Schema design, queries, migrations |
| `performance` | Performance Engineering | 1 | Profiling, optimization, benchmarking |
| `research` | Research & Documentation | 11 | Technical research, documentation |
| `mobile` | Mobile Development | 8 | iOS, Android, cross-platform apps |
| `gaming` | Game Development | 3 | Game engines, graphics, game loop |
| `management` | Project Management | 4 | Delivery, risk management, agile |
| `ai_ml` | AI/ML Engineering | 13 | Machine learning, LLMs, data science |
| `cloud` | Cloud & Infrastructure | 11 | AWS, Azure, GCP, serverless |
| `languages` | Programming Languages | 17 | Language-specific patterns and expertise |
| `tools` | Tools & Utilities | 31 | Productivity tools, document processing |
| `mcp` | MCP & Agents | 8 | Model Context Protocol, agent frameworks |

---

## 3. Data Models

### 3.1 Agent Profile Model

```yaml
agent_profiles:
  {agent-id}:
    profile: "{domain}:{category}"
    inherit_from: string[]      # Domains to inherit skills from
    primary_domain: string      # Main domain
```

**Example**:
```yaml
backend-engineer:
  profile: "backend:execution"
  inherit_from: ["backend", "architecture", "quality", "data", "languages"]
  primary_domain: "backend"
```

### 3.2 Skill Resolution Model

```yaml
resolution:
  precedence:
    - direct_agent_match        # skill.agents contains agent-id
    - profile_match             # skill.profiles matches agent.profile
    - domain_inheritance        # domain in agent.inherit_from

  wildcards:
    "*:orchestration": "Any domain with orchestration category"
    "backend:*": "All backend categories"
    "*": "Universal (all agents)"

  thresholds:
    minimum_priority: 5         # Skills below this are optional
    core_priority: 7            # Standard injection threshold
    critical_priority: 9        # Always injected
```

### 3.3 Workflow Phase Model

```yaml
phase:
  number: number                # Phase sequence (1, 2, 3, ...)
  name: string                  # Phase name
  agent: string                 # Agent ID to delegate to
  goal: string                  # Phase objective
  exit_criteria: string[]       # Conditions to proceed
  deliverable: string           # Output file path or description
```

**Example**:
```yaml
phase:
  number: 1
  name: "CODEBASE ANALYSIS"
  agent: "scouter"
  goal: "Scan entire project structure and content"
  exit_criteria:
    - "Project structure mapped"
    - "Tech stack identified"
    - "Key files located"
  deliverable: "./reports/scouts/SCOUT-{feature}.md"
```

### 3.4 Deliverable Model

```yaml
deliverable:
  type: string                  # report | code | test | design | plan
  path: string                  # File path
  format: string                # markdown | code | yaml
  agent: string                 # Agent that created it
  phase: number                 # Phase number
```

**Standard Deliverable Paths**:
```
./reports/brainstorms/BRAINSTORM-{feature}.md
./reports/researchers/RESEARCH-{feature}.md
./reports/scouts/SCOUT-{feature}.md
./reports/designs/DESIGN-{feature}.md
./reports/plans/PLAN-{feature}.md
./documents/knowledge-*.md
./documents/business/business-*.md
./documents/audit/audit-*.md
```

---

## 4. API Contracts

### 4.1 CLI API

The CLI provides a command-line interface for installation and management.

#### Commands

```bash
# Install framework for a tool
agent-assistant install <tool>
agent-assistant install cursor|copilot|antigravity|claude|--all

# Uninstall framework from a tool
agent-assistant uninstall <tool>
agent-assistant uninstall cursor|copilot|antigravity|claude|--all

# List installation status
agent-assistant list
```

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |

### 4.2 Command API

Users invoke commands through the AI tool interface.

#### Syntax

```
/{command}:{variant} "{description}"

Examples:
  /cook:fast "add dark mode toggle"
  /docs:core
  /deploy:production
```

#### Response Format

```markdown
## 📋 Requirements Registry
| ID | Requirement | Status |
|---|---|---|
| R1 | {requirement} | ⏳ Pending |

## 🔀 Workflow Loaded
| Property | Value |
|---|---|
| Command | `/{command}:{variant}` |
| Phases | {count} |

## 🎭 Phase {N}: {phase_name}
### Sub-agent: `{agent}` — {role}
{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {brief summary}

## ✅ Workflow Complete
**All requirements fulfilled.**
```

### 4.3 Agent Handoff API

Agents can delegate to other agents via handoffs.

#### Handoff Payload

```yaml
handoff:
  from_agent: string            # Originating agent ID
  to_agent: string              # Target agent ID
  task: string                  # Task description
  context:
    requirements: string[]      # Original requirements (verbatim)
    constraints: object         # Prior phase constraints
    acceptance_criteria: string[]  # What constitutes success
  deliverable_expected: string  # Expected output type
```

---

## 5. Business Rules

### 5.1 Orchestration Laws

The 10 inviolable laws that govern all orchestration behavior:

| Law | Name | Rule |
|-----|------|------|
| 1 | Absolute Decentralization | Orchestrator NEVER writes code, fixes bugs, creates tests |
| 2 | Requirement Integrity | User requirements captured with 100% fidelity |
| 3 | Workflow Sovereignty | Command workflow file is ABSOLUTE SOURCE OF TRUTH |
| 4 | Deep Agent Embodiment | When delegating, FULLY BECOME that agent |
| 5 | Context Isolation | Inter-agent handoffs transfer ONLY essential deliverables |
| 6 | Language Matching | Respond in SAME language as user's request |
| 7 | Recursive Delegation | Manager agents COORDINATE, never implement |
| 8 | Stateful Handoff | Prior phase deliverables are IMMUTABLE CONSTRAINTS |
| 9 | Constraint Propagation | Every agent operates with awareness of Global Project State |
| 10 | Tiered Execution | Sub-agent is TIER 1 MANDATORY; EMBODY is TIER 2 FALLBACK |

### 5.2 Skill Resolution Rules

```yaml
skill_resolution:
  rule_1: "Direct agent match takes precedence over profile match"
  rule_2: "Profile match takes precedence over domain inheritance"
  rule_3: "Higher priority_score skills are injected first"
  rule_4: "Critical skills (9-10) are always injected"
  rule_5: "Skills below minimum_priority (5) are optional"
  rule_6: "Agent can override with skill_overrides"
```

### 5.3 Phase Execution Rules

```yaml
phase_execution:
  rule_1: "Execute one phase at a time (no batching)"
  rule_2: "Full workflow in one reply"
  rule_3: "Verify exit criteria before proceeding"
  rule_4: "Load only what current phase needs"
  rule_5: "Emit deliverable before moving to next phase"
```

### 5.4 Quality Gate Rules

```yaml
quality_gates:
  gate_1: "Compile Gate — Build must succeed"
  gate_2: "Lint Gate — No linting errors"
  gate_3: "Test Gate — Tests must pass"
  gate_4: "Security Gate — No vulnerabilities"
  gate_5: "Review Gate — Code review approved"
```

---

## 6. Entity Relationships

### 6.1 ERD Diagram

```
┌─────────────────┐        ┌─────────────────┐
│      AGENT      │        │    COMMAND      │
├─────────────────┤        ├─────────────────┤
│ name            │        │ name            │
│ profile         │◀──────▶│ phases[].agent  │
│ tools[]         │        │ variants[]      │
│ handoffs[]      │        │ category        │
└─────────────────┘        └─────────────────┘
         │                          │
         │                          │
         ▼                          ▼
┌─────────────────┐        ┌─────────────────┐
│     DOMAIN      │        │   DELIVERABLE   │
├─────────────────┤        ├─────────────────┤
│ name            │◀───────│ phase           │
│ skills[]        │        │ agent           │
│ skill_count     │        │ path            │
└─────────────────┘        └─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│      SKILL      │
├─────────────────┤
│ skill_id        │
│ category        │
│ priority_score  │
│ relevance_mapping│
└─────────────────┘
```

### 6.2 Relationship Definitions

| Relationship | Type | Description |
|--------------|------|-------------|
| Agent → Domain | Many-to-Many | Agent inherits from multiple domains |
| Domain → Skill | One-to-Many | Domain contains multiple skills |
| Skill → Agent | Many-to-Many | Skill can be used by multiple agents |
| Command → Agent | One-to-Many | Command workflow invokes multiple agents |
| Agent → Deliverable | One-to-Many | Agent produces deliverables |
| Agent → Agent | Many-to-Many | Agents can handoff to each other |

---

## 7. Validation Rules

### 7.1 Agent Validation

```yaml
agent_validation:
  name: "Must be kebab-case, unique"
  profile: "Must match pattern {domain}:{category}"
  tools: "Must be valid tool names from allowed list"
  handoffs: "Must reference existing agent names"
```

### 7.2 Skill Validation

```yaml
skill_validation:
  skill_id: "Must be kebab-case, unique within domain"
  category: "Must be core|expert|specialized|utility"
  priority_score: "Must be 1-10"
  relevance_mapping.agents: "Must reference existing agent names"
  relevance_mapping.profiles: "Must match valid profile patterns"
```

### 7.3 Command Validation

```yaml
command_validation:
  name: "Must be lowercase, unique"
  variants: "Must have at least one variant"
  phases: "Must have sequential phase numbers"
  phases[].agent: "Must reference existing agent"
```

---

## 8. Related Documentation

| Document | Purpose |
|----------|---------|
| `knowledge-overview.md` | Project introduction, goals, tech stack |
| `knowledge-architecture.md` | System design, components, data flow |
| `knowledge-source-base.md` | Directory structure, file purposes |
| `knowledge-standards.md` | Code style, naming conventions |
| `AGENT-TEMPLATE.md` | Agent file template |
| `matrix-skills/_index.yaml` | Matrix skill registry |

---

**Agent Assistant Domain Model** — _Structured, Extensible, Well-Defined_
