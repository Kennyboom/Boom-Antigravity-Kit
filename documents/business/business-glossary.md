# Agent Assistant — Business Glossary

> **Document Type**: Domain Terminology and Definitions  
> **Version**: 1.0  
> **Status**: Complete  
> **Last Updated**: 2026-01-26

---

## 1. Overview

This glossary defines the key terms, concepts, and acronyms used throughout Agent Assistant. Terms are organized alphabetically within categories for easy reference.

---

## 2. Core Concepts

### Agent

A **specialist persona** with defined expertise, thinking protocol, and constraints. Each agent has a specific role (e.g., backend development, testing, security) and operates within defined boundaries.

| Property | Description |
|----------|-------------|
| ID | Unique identifier (e.g., `backend-engineer`) |
| Profile | Domain:category classification (e.g., `backend:execution`) |
| Role | Human-readable job title |
| Skills | Domain knowledge injected via Matrix |

**Example**: The `tester` agent specializes in test strategy, automation, and coverage analysis.

---

### Command

A **slash-prefixed workflow trigger** that initiates a structured development process. Commands route to workflows that orchestrate multiple agents.

| Format | Example |
|--------|---------|
| Basic | `/cook` |
| With variant | `/cook:hard` |
| With argument | `/cook:hard "implement OAuth"` |

**Available Commands**: `/cook`, `/fix`, `/plan`, `/test`, `/review`, `/debug`, `/design`, `/docs`, `/deploy`, `/ask`, `/auto`, `/brainstorm`, `/code`

---

### Deliverable

A **concrete output** produced by an agent during workflow execution. Deliverables include code files, documentation, plans, reports, and test files.

| Type | Example Location |
|------|------------------|
| Plan | `./reports/plans/PLAN-auth.md` |
| Scout Report | `./reports/scouts/SCOUT-dashboard.md` |
| Documentation | `./documents/knowledge-overview.md` |
| Code | Implementation in codebase |

---

### Matrix Skill Discovery

A **centralized system** that automatically resolves and injects relevant skills into agents based on their declared profile. Replaces hardcoded skill lists with dynamic resolution.

**Resolution Flow**:
```
Agent Profile → _index.yaml → Domain Files → Skill Selection → Injection
```

**Benefits**:
- Single source of truth
- Add skill = update 1 file
- Consistent skill-agent mapping

---

### Orchestrator

The **central coordination layer** that manages workflow execution. The Orchestrator routes commands, delegates to agents, verifies quality gates, and synthesizes outputs.

**Key Principle**: Orchestrators COORDINATE but never IMPLEMENT directly.

| Does | Does NOT |
|------|----------|
| Route commands | Write code |
| Delegate to agents | Debug issues |
| Verify exit criteria | Run tests directly |
| Synthesize outputs | Design systems |

---

### Phase

A **discrete step** within a workflow with defined entry requirements, agent delegation, actions, and exit criteria. Phases execute sequentially.

| Component | Description |
|-----------|-------------|
| Agent | Specialist assigned to phase |
| Goal | Objective of the phase |
| Actions | Steps to complete |
| Exit Criteria | Conditions to proceed |
| Deliverable | Output produced |

---

### Profile

A **domain:category classification** that determines which skills an agent receives from the Matrix.

| Format | Example |
|--------|---------|
| Pattern | `{domain}:{category}` |
| Backend | `backend:execution` |
| QA | `quality:validation` |
| Architecture | `architecture:orchestration` |

---

### Quality Gate

An **automated verification checkpoint** that must pass before workflow progression. Agent Assistant implements 5 gates.

| Gate | Purpose |
|------|---------|
| Compile | Code builds successfully |
| Lint | Code style compliance |
| Test | Tests pass, coverage met |
| Security | No vulnerabilities |
| Review | Code review approved |

---

### Skill

A **domain-specific knowledge module** loaded on-demand to enhance agent capabilities. Skills provide guidelines, patterns, and best practices.

| Property | Description |
|----------|-------------|
| ID | Unique identifier (e.g., `api-patterns`) |
| Domain | Category (e.g., `backend`) |
| Priority | 1-10 (10 = critical) |
| Category | core, expert, specialized, utility |

---

### Variant

A **workflow intensity level** that determines the number of agents, phases, and quality gates applied.

| Variant | Agents | Phases | Gates | Use Case |
|---------|--------|--------|-------|----------|
| `:fast` | 2-3 | 3-4 | Minimal | Simple, low-risk |
| `:hard` | 5-8 | 6-8 | All 5 | Complex, production |

---

### Workflow

A **structured sequence of phases** that accomplishes a development goal. Workflows are defined in command files and executed by the Orchestrator.

**Workflow Structure**:
```
Pre-flight → Phase 1 → Phase 2 → ... → Phase N → Completion
```

---

## 3. Orchestration Terms

### Context Isolation

The principle that **agent sessions operate independently** without sharing memory or polluting each other's context.

| Tier | Context Model |
|------|---------------|
| TIER 1 (Sub-agent) | ISOLATED (fresh memory) |
| TIER 2 (Embody) | SHARED (same memory) |

---

### Deep Embodiment

When the Orchestrator **fully transforms into an agent**, adopting its thinking protocol, constraints, and output format exactly.

**Embodiment Checklist**:
- [ ] Core directive extracted
- [ ] Thinking protocol adopted
- [ ] Constraints bound
- [ ] Output format memorized

---

### Exit Criteria

**Conditions that must be satisfied** before a phase can transition to the next. Exit criteria ensure quality and completeness.

**Example**:
```markdown
- [ ] Project structure mapped
- [ ] Tech stack identified
- [ ] Key files located
```

---

### Handoff

The **transfer of work** from one agent to another during workflow execution. Handoffs include essential context but exclude internal reasoning.

**Handoff Includes**:
- Original requirements
- Prior decisions
- Constraints
- Deliverables

**Handoff Excludes**:
- Internal reasoning chains
- Failed attempts
- Rejected alternatives

---

### Orchestration Laws

The **10 inviolable rules** that govern all orchestration behavior. Violations must be detected and corrected.

| Law | Name |
|-----|------|
| 1 | Absolute Decentralization |
| 2 | Requirement Integrity |
| 3 | Workflow Sovereignty |
| 4 | Deep Agent Embodiment |
| 5 | Context Isolation |
| 6 | Language Matching |
| 7 | Recursive Delegation |
| 8 | Stateful Handoff |
| 9 | Constraint Propagation |
| 10 | Tiered Execution |

---

### TIER 1 Execution (Sub-agent)

**Native tool invocation** where an agent runs in an isolated context with fresh memory. TIER 1 is MANDATORY when available.

**Characteristics**:
- Isolated context
- Fresh memory
- Preferred for quality
- Requires tool support

---

### TIER 2 Execution (Embody)

**Fallback pattern** where the Orchestrator reads an agent file and transforms to become that agent within shared context.

**When Used**:
- TIER 1 tool unavailable
- System error in TIER 1
- Never for preference/efficiency

---

### Tiered Execution

The **protocol for choosing** between TIER 1 (sub-agent) and TIER 2 (embody) execution modes.

**Decision Flow**:
1. Check if sub-agent tool exists
2. If yes → MUST use TIER 1
3. If no or error → MAY use TIER 2

---

## 4. Workflow Terms

### Blocking Phase

A phase that **cannot proceed** without deliverables from prior phases. Prior deliverables become immutable constraints.

**Example**: Implementation phase blocked until Plan exists.

---

### Drift Detection

**Identifying when implementation deviates** from the approved plan. Drift requires re-planning before continuing.

**Detected By**: `tech-lead` agent during implementation oversight.

---

### Just-In-Time Loading

The principle of **loading resources only when needed** by the current phase, rather than loading everything upfront.

**Benefits**:
- Efficient context usage
- Faster initial response
- Reduced memory pressure

---

### Pre-flight

**Mandatory setup steps** before workflow execution, including loading rule files and checking prerequisites.

**Pre-flight Actions**:
1. Load ORCHESTRATION-LAWS.md
2. Load ADAPTIVE-EXECUTION.md
3. Load EXECUTION-PROTOCOL.md

---

### Router

A **command file** that analyzes the request and selects the appropriate variant based on complexity.

**Routing Example**:
```
/cook → cook.md (router) → Analyzes request → cook/hard.md (selected)
```

---

## 5. Documentation Terms

### Audit Docs

**Security and compliance documentation** generated by `/docs:audit`, including security assessments and recommendations.

| File | Content |
|------|---------|
| `audit-security.md` | Security assessment |
| `audit-compliance.md` | Compliance status |
| `audit-dataflow.md` | Data flow analysis |
| `audit-recommendations.md` | Recommendations |

---

### Business Docs

**Business-oriented documentation** generated by `/docs:business`, including PRD, features, workflows, and glossary.

| File | Content |
|------|---------|
| `business-prd.md` | Product requirements |
| `business-features.md` | Feature specifications |
| `business-workflows.md` | User journeys |
| `business-glossary.md` | Term definitions |

---

### Core Docs

**Technical documentation** generated by `/docs:core`, covering architecture, domain, source base, and standards.

| File | Content |
|------|---------|
| `knowledge-overview.md` | Project intro, goals |
| `knowledge-architecture.md` | System design |
| `knowledge-domain.md` | Data models |
| `knowledge-source-base.md` | Directory structure |
| `knowledge-standards.md` | Code style |

---

## 6. Technical Terms

### ADR (Architecture Decision Record)

A **document capturing** an important architectural decision, including context, decision, and consequences.

---

### CI/CD (Continuous Integration/Continuous Deployment)

**Automated processes** for building, testing, and deploying code changes.

---

### CLI (Command Line Interface)

**Text-based interface** for interacting with software. Agent Assistant provides CLI for installation and management.

```bash
agent-assistant install cursor
agent-assistant list
```

---

### E2E (End-to-End) Testing

**Testing the complete flow** of an application from start to finish, simulating real user scenarios.

---

### MCP (Model Context Protocol)

A **standard protocol** for AI tool integration, enabling consistent behavior across different AI platforms.

---

### OKR (Objectives and Key Results)

A **goal-setting framework** defining objectives (goals) and measurable key results (metrics).

---

### OWASP (Open Web Application Security Project)

An **organization providing** security best practices, vulnerability classifications, and testing methodologies.

---

### PRD (Product Requirements Document)

A **document specifying** what a product should do, including features, requirements, and success criteria.

---

## 7. Agent Roles

| Agent ID | Role Title | Primary Function |
|----------|------------|------------------|
| `backend-engineer` | Principal Backend Architect | Server-side logic, APIs |
| `frontend-engineer` | Principal Frontend Architect | UI, React, accessibility |
| `tech-lead` | Implementation Orchestrator | Route tasks, ensure quality |
| `database-architect` | Data Architecture Specialist | Schema, migrations |
| `security-engineer` | Security Analyst | OWASP, vulnerabilities |
| `devops-engineer` | DevOps Specialist | CI/CD, infrastructure |
| `tester` | QA Specialist | Test strategy, automation |
| `reviewer` | Code Review Specialist | Standards, best practices |
| `debugger` | Debug Specialist | Root cause analysis |
| `planner` | Technical Planner | Implementation plans |
| `brainstormer` | Requirements Analyst | Discovery, clarification |
| `business-analyst` | Business Analysis Specialist | User stories, stakeholders |
| `designer` | UI/UX Design Specialist | Design systems, accessibility |
| `docs-manager` | Documentation Specialist | README, API docs |
| `performance-engineer` | Performance Specialist | Profiling, optimization |
| `researcher` | Technical Research Specialist | Patterns, best practices |
| `scouter` | Codebase Exploration Specialist | Code analysis, patterns |
| `project-manager` | Project Delivery Specialist | Sprints, risks |
| `mobile-engineer` | Mobile Development Specialist | iOS, Android, React Native |
| `game-engineer` | Game Development Specialist | Game loop, 3D graphics |

---

## 8. Skill Domains

| Domain ID | Name | Skill Count |
|-----------|------|-------------|
| `backend` | Backend Development | 20 |
| `frontend` | Frontend Development | 18 |
| `architecture` | System Architecture | 9 |
| `quality` | Quality Assurance | 17 |
| `security` | Security Engineering | 6 |
| `design` | UI/UX Design | 10 |
| `planning` | Planning & Analysis | 9 |
| `devops` | DevOps & Deployment | 15 |
| `data` | Data & Database | 7 |
| `performance` | Performance Engineering | 1 |
| `research` | Research & Documentation | 11 |
| `mobile` | Mobile Development | 8 |
| `gaming` | Game Development | 3 |
| `management` | Project Management | 4 |
| `ai_ml` | AI/ML Engineering | 13 |
| `cloud` | Cloud & Infrastructure | 11 |
| `languages` | Programming Languages | 17 |
| `tools` | Tools & Utilities | 31 |
| `mcp` | Model Context Protocol | 8 |

---

## 9. Command Reference

| Command | Purpose | Variants |
|---------|---------|----------|
| `/cook` | Implement features | `:fast`, `:hard` |
| `/code` | Generate code snippets | `:fast`, `:hard` |
| `/fix` | Fix bugs | `:fast`, `:hard` |
| `/test` | Generate tests | `:fast`, `:hard` |
| `/review` | Code review | `:fast`, `:hard` |
| `/debug` | Debug issues | `:fast`, `:hard` |
| `/plan` | Create implementation plans | `:fast`, `:hard` |
| `/brainstorm` | Discover requirements | `:fast`, `:hard` |
| `/design` | UI/UX design | `:fast`, `:hard` |
| `/docs` | Generate documentation | `:core`, `:business`, `:audit` |
| `/deploy` | Deployment operations | `:check`, `:preview`, `:production`, `:rollback` |
| `/ask` | Q&A about codebase | `:fast`, `:hard` |
| `/auto` | Auto-detect best command | — |

---

## 10. File Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Agent | `agents/{kebab-case}.md` | `agents/backend-engineer.md` |
| Command Router | `commands/{command}.md` | `commands/cook.md` |
| Command Variant | `commands/{command}/{variant}.md` | `commands/cook/hard.md` |
| Skill | `skills/{skill-id}/SKILL.md` | `skills/api-patterns/SKILL.md` |
| Rule | `rules/{UPPER-CASE}.md` | `rules/BOOTSTRAP.md` |
| Matrix Domain | `matrix-skills/{domain}.yaml` | `matrix-skills/backend.yaml` |
| Core Doc | `documents/knowledge-{topic}.md` | `documents/knowledge-overview.md` |
| Business Doc | `documents/business/business-{topic}.md` | `documents/business/business-prd.md` |
| Audit Doc | `documents/audit/audit-{topic}.md` | `documents/audit/audit-security.md` |
| Report | `reports/{type}s/{TYPE}-{feature}.md` | `reports/plans/PLAN-auth.md` |

---

## 11. Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| ADR | Architecture Decision Record |
| API | Application Programming Interface |
| CI/CD | Continuous Integration/Continuous Deployment |
| CLI | Command Line Interface |
| E2E | End-to-End |
| FR | Functional Requirement |
| KPI | Key Performance Indicator |
| MCP | Model Context Protocol |
| MoSCoW | Must-Should-Could-Won't |
| NFR | Non-Functional Requirement |
| NPS | Net Promoter Score |
| OKR | Objectives and Key Results |
| OWASP | Open Web Application Security Project |
| PRD | Product Requirements Document |
| QA | Quality Assurance |
| ROI | Return on Investment |
| SOC2 | Service Organization Control 2 |
| UI/UX | User Interface/User Experience |
| WCAG | Web Content Accessibility Guidelines |

---

## 12. Related Documentation

| Document | Purpose |
|----------|---------|
| `business-prd.md` | Product requirements |
| `business-features.md` | Feature specifications |
| `business-workflows.md` | User journeys |
| `knowledge-overview.md` | Technical overview |
| `knowledge-domain.md` | Data models |

---

**Document Classification**: Business Glossary  
**Terms Defined**: 80+  
**Review Status**: Complete
