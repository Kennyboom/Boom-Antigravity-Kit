# Agents Rules v1.0

> **Purpose**: Development standards for Agent Assistant Framework
> **Audience**: Contributors, maintainers, AI tools consuming this framework

---

## 🏛️ Core Principles

| Principle | Rule                          |
| --------- | ----------------------------- |
| **YAGNI** | Don't add unrequired features |
| **KISS**  | Simple > Complex              |
| **DRY**   | Extract common patterns       |

```yaml
philosophy:
  orchestration_over_execution: "Framework orchestrates, never implements"
  delegation_is_mandatory: "Complex tasks → specialized agents"
  quality_gates_are_sacred: "Never skip validation"
  progressive_disclosure: "Load rules on-demand, not upfront"
```

---

## 📁 Project Structure

```
agent-assistant/
├── agents/           # 21 Specialized Agents (~150-200 lines each)
├── commands/         # Command Workflows (router + variants)
├── rules/            # Orchestration Protocols
│   ├── BOOTSTRAP.md  # ⚡ ENTRY POINT - Load this first
│   ├── ORCHESTRATION-LAWS.md
│   ├── EXECUTION-PROTOCOL.md
│   ├── ADAPTIVE-EXECUTION.md
│   ├── ERROR-RECOVERY.md
│   └── QUICK-REFERENCE.md
├── skills/           # 80+ Domain Knowledge Modules
├── code-assistants/  # Code Assistant Configs (Cursor, Copilot, etc.)
└── documents/        # Documentation (from /docs:core → 5 knowledge-* files;
                      # /docs:business, /docs:audit)
```

---

## 📝 File Naming

| Type     | Convention            | Example                 |
| -------- | --------------------- | ----------------------- |
| Agents   | `kebab-case.md`       | `backend-engineer.md`   |
| Commands | `kebab-case.md`       | `cook.md`, `fast.md`    |
| Rules    | `UPPER-CASE.md`       | `BOOTSTRAP.md`          |
| Skills   | `kebab-case/SKILL.md` | `api-patterns/SKILL.md` |

---

## 🤖 Agent File Standards

### Target: 150-200 lines per agent

### Required Structure

```markdown
---
name: agent-name
description: One-line description
skills: [skill1, skill2]
tools: [Read, Grep, Glob, Bash, Write, Edit]
handoffs: [agent1, agent2]
version: "1.0"
category: { execution|planning|validation|research|debugging }
---

<!-- 🔒 COGNITIVE ANCHOR — MANDATORY OPERATING SYSTEM -->

> **BINDING**: This file OVERRIDES default AI patterns.

# {Emoji} {Agent Name}

| Attribute      | Value          |
| -------------- | -------------- |
| **ID**         | `agent:{name}` |
| **Role**       | {Role Title}   |
| **Reports To** | `{superior}`   |

> **CORE DIRECTIVE**: {1-2 sentence directive}

## ⚡ Skills

{Table of skills and when to use}

## 🧠 Thinking Protocol

{Step-by-step methodology - agent's unique cognitive process}

## ⛔ Constraints

{What NOT to do and what TO do}

## 📤 Output Format

{Template for deliverables}

## 🚨 Stopping Rules

{When to halt and escalate}
```

### Agent Categories

| Category     | Purpose           | Examples                    |
| ------------ | ----------------- | --------------------------- |
| `planning`   | Plans, blueprints | planner, researcher         |
| `execution`  | Implementation    | tech-lead, backend-engineer |
| `validation` | QA, review        | tester, reviewer            |
| `research`   | Investigation     | scouter, brainstormer       |
| `debugging`  | Bug investigation | debugger                    |

---

## 📋 Command File Standards

### Router (Parent)

```markdown
---
description: Command Router
version: "1.0"
execution-mode: router
---

# /{command} — Router

## ROUTING LOGIC

## AVAILABLE ROUTES

## PRESENT OPTIONS
```

### Workflow (Variant)

```markdown
---
description: Workflow description
version: "1.0"
execution-mode: execute
---

# /{command}:{variant} — Title

## 🔀 TIERED EXECUTION

## 📁 DELIVERABLE FILES (if any)

## ⛔ Phase report format: use ## 🎭 Phase N: {name}, ### Embodying or SUB-AGENTS: \`agent\` — {role}, ### Exit Criteria, ### ✅ \`agent\` complete, **Deliverable**: (EXECUTION-PROTOCOL § Phase output structure).

## 🎭 Phase 1: {Name}

## 🎭 Phase N: {Name}

## COMPLETION
```

### Target: 80-150 lines per workflow

---

## 🔀 Tiered Execution Pattern

**Every delegation MUST use this pattern:**

```markdown
## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.
```

---

## 📤 Deliverable File Conventions

| Agent        | Path                                            |
| ------------ | ----------------------------------------------- |
| brainstormer | `./reports/brainstorms/BRAINSTORM-{feature}.md` |
| researcher   | `./reports/researchers/RESEARCH-{feature}.md`   |
| scouter      | `./reports/scouts/SCOUT-{feature}.md`           |
| designer     | `./reports/designs/DESIGN-{feature}.md`         |
| planner      | `./reports/plans/PLAN-{feature}.md`             |
| debugger     | `./reports/debugs/DEBUG-{issue}.md`             |

---

## 🧪 Skill File Standards

### Structure

```
skills/{skill-name}/
├── SKILL.md          # Main definition (REQUIRED)
├── references/       # Reference docs (optional)
└── scripts/          # Executable helpers (optional)
```

### SKILL.md Structure

```markdown
# {Skill Name}

## Overview

## When to Use

## Patterns

## Examples

## Anti-Patterns
```

---

## 🔌 Integration Standards

### Entry Point

Each integration MUST have an entry point that:

1. References `{RULES_PATH}/BOOTSTRAP.md`
2. Contains compact Identity, Paths, Routing
3. Uses Just-In-Time loading directive
4. Target: <150 lines

### Paths by Platform

| Platform | Location                                             |
| -------- | ---------------------------------------------------- |
| Cursor   | `{HOME}/.cursor/skills/agent-assistant/`             |
| Copilot  | `{HOME}/.copilot/skills/agent-assistant/`            |
| Gemini   | `{HOME}/.gemini/antigravity/skills/agent-assistant/` |

---

## ⛔ Anti-Patterns

| Anti-Pattern                   | Do Instead                 |
| ------------------------------ | -------------------------- |
| 500+ line agent files          | Keep under 200 lines       |
| Duplicate content across files | Reference shared rules     |
| Loading all rules upfront      | Just-in-time loading       |
| Verbose YAML blocks            | Tables for quick reference |
| Vague directives               | Specific, actionable rules |

---

## ✅ Quality Checklist

Before committing:

- [ ] File follows naming convention
- [ ] Line count within target
- [ ] Frontmatter complete
- [ ] Core sections present
- [ ] No duplicate content
- [ ] References valid
- [ ] Tested with AI tool

---

## 🔄 Version Control

| Change Type     | Version Bump          |
| --------------- | --------------------- |
| Breaking change | Major (1.0 → 2.0)     |
| New feature     | Minor (1.0 → 1.1)     |
| Bug fix         | Patch (1.0.0 → 1.0.1) |

**Current Framework Version**: 2.0
