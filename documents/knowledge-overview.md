# Agent Assistant — Knowledge Overview

> **Purpose**: Project introduction, goals, technology stack, and getting started guide for AI agents and developers.

---

## 1. Project Identity

| Property       | Value                                              |
| -------------- | -------------------------------------------------- |
| **Name**       | Agent Assistant                                    |
| **Version**    | 1.1.0                                              |
| **Type**       | Multi-agent orchestration framework                |
| **Author**     | NamCH                                              |
| **License**    | MIT                                                |
| **Repository** | https://github.com/hainamchung/agent-assistant.git |

---

## 2. Purpose and Mission

Agent Assistant transforms a single AI coding assistant into a **coordinated team of 21 specialist agents** with structured workflows, quality gates, and 310+ domain skills.

### Core Value Proposition

```
Without Agent Assistant:
  User → Single AI → Generic response → Manual verification

With Agent Assistant:
  User → Command → Orchestrator → Specialist Agents → Skills → Quality Gates → Verified Output
```

### Key Benefits

| Benefit            | Description                                           |
| ------------------ | ----------------------------------------------------- |
| **Specialization** | 21 domain expert agents instead of one generalist     |
| **Consistency**    | Shared rules, skills, and conventions across all work |
| **Quality**        | Built-in test, review, and security workflows         |
| **Efficiency**     | 85% token cost reduction through targeted expertise   |
| **Repeatability**  | Structured, predictable AI-assisted coding            |

---

## 3. Key Metrics

| Metric            | Count | Description                                                |
| ----------------- | ----- | ---------------------------------------------------------- |
| Specialist Agents | 21    | Domain experts (backend, frontend, security, tester, reporter, etc.) |
| Command Workflows | 50+   | Development workflows (/cook, /fix, /plan, /report, /deploy, etc.; variants: fast, hard, focus) |
| Domain Skills     | 310   | On-demand knowledge (React, APIs, databases, DevOps, AI/ML, Security, etc.) |
| Matrix Domains    | 19    | Skill categories (backend, frontend, security, ai-ml, etc.)       |
| Quality Gates     | 5     | Compile, lint, test, security, review                      |
| Rule Files        | 8     | Orchestration protocols                                    |
| Supported Tools   | 4     | Claude Code, Cursor, Copilot, Antigravity/Gemini           |

### Measured Results

| Metric             | Improvement       |
| ------------------ | ----------------- |
| Time-to-Production | **70% faster**    |
| Bug Rate           | **70% reduction** |
| Security Issues    | **70% reduction** |
| Token Cost         | **85% savings**   |

---

## 4. Technology Stack

### Core Runtime

| Technology | Version | Purpose                               |
| ---------- | ------- | ------------------------------------- |
| Node.js    | 18+     | CLI runtime                           |
| JavaScript | ES2020+ | CLI implementation                    |
| Markdown   | —       | Agent, command, and skill definitions |
| YAML       | —       | Matrix skill discovery configuration  |

### Development Dependencies

| Package                  | Version  | Purpose                                 |
| ------------------------ | -------- | --------------------------------------- |
| semantic-release         | ^22.0.12 | Automated versioning and npm publishing |
| husky                    | ^8.0.3   | Git hooks for pre-commit checks         |
| conventional-changelog   | ^7.0.2   | Commit message format enforcement       |
| @semantic-release/git    | ^10.0.1  | Git integration for releases            |
| @semantic-release/github | ^9.2.6   | GitHub releases                         |
| @semantic-release/npm    | ^11.0.2  | npm publishing                          |

### Supported AI Tools

| Tool               | Integration Method    | Status          |
| ------------------ | --------------------- | --------------- |
| Claude Code        | CLI → `~/.claude/`    | ✅ Full Support |
| Cursor             | CLI → `~/.cursor/`    | ✅ Full Support |
| GitHub Copilot     | CLI → VS Code prompts | ✅ Full Support |
| Antigravity/Gemini | CLI → `~/.gemini/`    | ✅ Full Support |

---

## 5. Core Concepts

### 5.1 Orchestrator Pattern

The orchestrator is the central brain that coordinates all work:

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║ ORCHESTRATOR — THE CENTRAL BRAIN                                              ║
║                                                                               ║
║ ✅ YOU DO: Delegate, coordinate, verify, synthesize                          ║
║ ❌ YOU NEVER: Write code, debug, test, design, or implement directly         ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### 5.2 Tiered Execution

| Tier   | Name                 | When Used           | Context                 |
| ------ | -------------------- | ------------------- | ----------------------- |
| TIER 1 | Sub-agent Delegation | When tool available | ISOLATED (fresh memory) |
| TIER 2 | Agent Embodiment     | Fallback only       | SHARED (same memory)    |

**Rule**: TIER 1 is MANDATORY when available. TIER 2 is FALLBACK only.

### 5.3 Matrix Skill Discovery

Instead of hardcoding skills in agents, the system uses profile-based skill injection:

```yaml
# Agent declares profile (not skill list)
profile: "backend:execution"

# System resolves skills from Matrix
Agent declares profile → Matrix resolves domains → Skills injected at runtime
```

### 5.4 Command Routing

Commands follow a router pattern with variants:

```
/command:variant → commands/{command}/{variant}.md

Examples:
  /cook:fast → commands/cook/fast.md (quick execution)
  /cook:hard → commands/cook/hard.md (full workflow)
```

### 5.5 Phase-Based Workflows

All workflows execute as sequential phases:

```
Pre-flight → Phase 1 → Phase 2 → ... → Phase N → Completion
     ↓           ↓          ↓              ↓           ↓
Load rules   Delegate   Delegate      Delegate    Summary
            + Verify   + Verify      + Verify
```

---

## 6. Getting Started

### Prerequisites

- **Node.js 18+** installed
- At least one supported AI tool (Claude Code, Cursor, Copilot, or Antigravity)

### Installation Options

#### Clone and Install

```bash
git clone https://github.com/hainamchung/agent-assistant.git
cd agent-assistant
node cli/install.js install --all
```

### First Commands

After installation, generate project documentation:

```bash
/docs:core       # Generate 5 core docs (overview, architecture, domain, source-base, standards)
/docs:business   # Generate 4 business docs (PRD, features, workflows, glossary)
```

Then try development commands:

```bash
/cook:fast "add dark mode toggle"           # Simple feature
/cook:hard "implement OAuth 2.0 authentication"  # Complex feature
/review "audit authentication module"       # Code review
/plan "build notification system"           # Implementation plan
/debug "payment fails on Safari"            # Debug issue
```

---

## 7. Key Features

### 7.1 21 Specialist Agents

| Category           | Agents                                                              |
| ------------------ | ------------------------------------------------------------------- |
| **Implementation** | backend-engineer, frontend-engineer, mobile-engineer, game-engineer |
| **Architecture**   | tech-lead, database-architect                                       |
| **Quality**        | tester, reviewer, debugger                                          |
| **Security**       | security-engineer                                                   |
| **Infrastructure** | devops-engineer, performance-engineer                               |
| **Planning**       | planner, brainstormer, business-analyst                             |
| **Documentation**  | docs-manager, researcher, scouter                                   |
| **Design**         | designer                                                            |
| **Management**     | project-manager                                                     |

### 7.2 50+ Command Workflows

| Category          | Commands                                                                     |
| ----------------- | ---------------------------------------------------------------------------- |
| **Development**   | `/cook`, `/code`, `/fix`                                                     |
| **Quality**       | `/test`, `/review`, `/debug`                                                 |
| **Planning**      | `/plan`, `/brainstorm`, `/design`                                            |
| **Documentation** | `/docs:core`, `/docs:business`, `/docs:audit`                                |
| **Report**        | `/report:fast`, `/report:hard`, `/report:focus`                               |
| **Deployment**    | `/deploy:check`, `/deploy:preview`, `/deploy:production`, `/deploy:rollback` |
| **Utility**       | `/ask`, `/auto`                                                              |

### 7.3 310 Domain Skills

Skills are organized across 19 domains:

| Domain         | Skills | Examples                                            |
| -------------- | ------ | --------------------------------------------------- |
| Backend        | 32     | api-patterns, nestjs-expert, fastapi-expert, stripe-integration, inngest, trigger-dev |
| Frontend       | 22     | react-patterns, nextjs-developer, tailwind-patterns, react-ui-patterns, javascript-mastery |
| AI/ML          | 40     | ai-agents-architect, crewai, langgraph, rag-engineer, prompt-engineering, voice-agents |
| Security       | 35     | vulnerability-scanner, penetration testing, metasploit, burp-suite, sql-injection-testing |
| Quality        | 21     | debugging, testing-patterns, code-review, test-driven-development, verification-before-completion |
| DevOps         | 22     | docker-expert, kubernetes, terraform, github-workflow-automation, azure-functions, gcp-cloud-run |
| Planning       | 12     | plan-writing, planning, executing-plans, kaizen     |
| Tools          | 41     | slack-bot-builder, discord-bot-architect, email-systems, copywriting |
| And 11 more... | 85     | —                                                   |

### 7.4 Quality Gates

Every full workflow (`:hard` variant) includes:

1. **Compile Gate** — Build verification
2. **Lint Gate** — Code style validation
3. **Test Gate** — Automated testing
4. **Security Gate** — Vulnerability scanning
5. **Review Gate** — Code review by reviewer agent

---

## 8. When to Use Agent Assistant

### ✅ Use Agent Assistant When

- Building production-ready features
- Need consistent, repeatable workflows
- Want built-in quality checks
- Working on complex multi-step tasks
- Team needs shared conventions

### ❌ Don't Use Agent Assistant When

- Quick one-off questions
- Simple file edits
- Learning/exploring (use direct AI)
- Prototyping without quality concerns

---

## 9. Project Status

| Aspect                  | Status          |
| ----------------------- | --------------- |
| Core Framework          | ✅ Stable       |
| CLI Installer           | ✅ Stable       |
| Matrix Skill Discovery  | ✅ Stable       |
| Claude Code Integration | ✅ Full Support |
| Cursor Integration      | ✅ Full Support |
| Copilot Integration     | ✅ Full Support |
| Antigravity Integration | ✅ Full Support |
| Documentation           | ✅ Complete     |
| Test Coverage           | ⚠️ Example only |

---

## 10. Related Documentation

| Document                    | Purpose                              |
| --------------------------- | ------------------------------------ |
| `knowledge-architecture.md` | System design, components, data flow |
| `knowledge-domain.md`       | Data models, API contracts, entities |
| `knowledge-source-base.md`  | Directory structure, file purposes   |
| `knowledge-standards.md`    | Code style, naming conventions       |
| `README.md`                 | Public-facing documentation          |
| `AGENT-TEMPLATE.md`         | Agent file template                  |

---

## 11. Support and Resources

| Resource          | Location                                              |
| ----------------- | ----------------------------------------------------- |
| GitHub Repository | https://github.com/hainamchung/agent-assistant.git    |
| Issue Tracker     | https://github.com/hainamchung/agent-assistant/issues |
| License           | MIT                                                   |
| Author            | NamCH                                                 |

---

**Agent Assistant** — _Orchestrate. Delegate. Verify. Deliver._
