# Agent Assistant — Knowledge Source Base

> **Purpose**: Directory structure, file purposes, entry points, key modules, and code organization for AI agents and developers.

---

## 1. Project Root Structure

```
agent-assistant/                     # Project root
├── agents/                          # 🤖 21 specialist agent definitions
├── assets/                          # 🎨 Static assets (logo, images)
├── cli/                             # 🔧 CLI installer system
├── code-assistants/                 # 🔌 IDE-specific configurations
├── commands/                        # 📋 50+ command workflow definitions
├── documents/                       # 📚 Generated documentation
├── matrix-skills/                   # 🎯 Skill discovery matrix (19 domains)
├── rules/                           # ⚖️ Orchestration rules and protocols
├── skills/                          # 💡 310 domain skill definitions
├── AGENT-TEMPLATE.md                # 📝 Agent file template
├── CLAUDE.md                        # 🟣 Claude Code entry point
├── COPILOT.md                       # 🔵 GitHub Copilot entry point
├── CURSOR.md                        # 🟢 Cursor entry point
├── GEMINI.md                        # 🟡 Antigravity/Gemini entry point
├── package.json                     # 📦 npm package configuration
├── .releaserc.json                  # 🚀 Semantic release config
├── .gitignore                       # 🚫 Git ignore patterns
├── LICENSE                          # ⚖️ MIT License
└── README.md                        # 📖 Public documentation
```

---

## 2. Directory Breakdown

### 2.1 `agents/` — Specialist Agent Definitions

Contains 21 specialist agent definition files.

```
agents/
├── backend-engineer.md              # Server-side logic, APIs, data access
├── brainstormer.md                  # Requirements discovery, clarification
├── business-analyst.md              # Stakeholders, INVEST, user stories
├── database-architect.md            # Schema, migrations, tuning
├── debugger.md                      # Reproduce, hypothesize, root cause
├── designer.md                      # UI/UX, design system, a11y
├── devops-engineer.md               # CI/CD, infra, deploy, rollback
├── docs-manager.md                  # README, API docs, guides
├── frontend-engineer.md             # UI, React, a11y, performance
├── game-engineer.md                 # Game loop, 3D, performance
├── mobile-engineer.md               # iOS/Android, React Native, Flutter
├── performance-engineer.md          # Profiling, bottlenecks, budgets
├── planner.md                       # Implementation plans, risks, rollback
├── project-manager.md               # Sprints, risks, delivery
├── researcher.md                    # Docs, sources, comparisons
├── reviewer.md                      # Code review, plan compliance
├── scouter.md                       # Codebase exploration, patterns
├── security-engineer.md             # Threat model, OWASP, secure coding
├── tech-lead.md                     # Orchestration, routing, quality
└── tester.md                        # Test strategy, automation, coverage
```

**File Format**: Markdown with YAML frontmatter

**Key Sections**:
- Identity table (ID, Role, Profile)
- Core Directive
- Skills (Matrix Discovery reference)
- Thinking Protocol
- Constraints (NEVER/ALWAYS)
- Output Format

### 2.2 `commands/` — Command Workflow Definitions

Contains 50+ command workflow files organized by command and variant (fast, hard, focus).

```
commands/
├── ask/                             # Q&A about codebase
│   ├── fast.md
│   └── hard.md
├── ask.md                           # Router for /ask
├── auto.md                          # Auto-detect command
├── brainstorm/                      # Requirements discovery
│   ├── fast.md
│   └── hard.md
├── brainstorm.md                    # Router for /brainstorm
├── code/                            # Write code snippets
│   ├── fast.md
│   └── hard.md
├── code.md                          # Router for /code
├── cook/                            # Implement features
│   ├── fast.md                      # Quick execution (2-3 agents)
│   └── hard.md                      # Full workflow (5-8 agents)
├── cook.md                          # Router for /cook
├── debug/                           # Systematic debugging
│   ├── fast.md
│   └── hard.md
├── debug.md                         # Router for /debug
├── deploy/                          # Deployment workflows
│   ├── check.md                     # Pre-deployment validation
│   ├── preview.md                   # Deploy to staging
│   ├── production.md                # Deploy to production
│   └── rollback.md                  # Revert to previous version
├── deploy.md                        # Router for /deploy
├── design/                          # UI/UX design
│   ├── fast.md
│   └── hard.md
├── design.md                        # Router for /design
├── docs/                            # Documentation generation
│   ├── audit.md                     # Security/compliance audit docs
│   ├── business.md                  # Business documentation
│   └── core.md                      # Core technical documentation
├── docs.md                          # Router for /docs
├── fix/                             # Bug fixing
│   ├── fast.md
│   └── hard.md
├── fix.md                           # Router for /fix
├── plan/                            # Implementation planning
│   ├── fast.md
│   └── hard.md
├── plan.md                          # Router for /plan
├── review/                          # Code review
│   ├── fast.md
│   └── hard.md
├── review.md                        # Router for /review
├── test/                            # Test generation
│   ├── fast.md
│   └── hard.md
└── test.md                          # Router for /test
```

**Routing Pattern**:
- Router files (`{command}.md`) analyze request and select variant
- Variant files (`{command}/{variant}.md`) define actual workflow phases

### 2.3 `rules/` — Orchestration Rules and Protocols

Contains 8 rule files that govern orchestration behavior.

```
rules/
├── ADAPTIVE-EXECUTION.md            # Tier 1/2 delegation decisions
├── AGENT-RULES.md                   # Agent behavior guidelines
├── BOOTSTRAP.md                     # Main entry point, paths, routing
├── ERROR-RECOVERY.md                # Error handling protocols
├── EXECUTION-PROTOCOL.md            # Phase execution, output format
├── ORCHESTRATION-LAWS.md            # 10 inviolable laws
├── QUICK-REFERENCE.md               # Lookup tables
└── SKILL-DISCOVERY.md               # Matrix resolution algorithm
```

**Authority Levels**:
- **CRITICAL**: ORCHESTRATION-LAWS, EXECUTION-PROTOCOL, ADAPTIVE-EXECUTION
- **Entry**: BOOTSTRAP
- **Reference**: AGENT-RULES, SKILL-DISCOVERY, ERROR-RECOVERY, QUICK-REFERENCE

### 2.4 `matrix-skills/` — Skill Discovery Matrix

Contains 19 YAML domain files that define skill-to-agent mappings (plus _index.yaml).

```
matrix-skills/
├── _index.yaml                      # Central registry (310 skills, 21 agents)
├── ai-ml.yaml                       # 40 AI/ML skills (+27: agent development, LLM patterns, RAG, voice AI)
├── architecture.yaml                # 9 architecture skills
├── backend.yaml                     # 32 backend skills (+12: job queues, payments, communications)
├── cloud.yaml                       # 11 cloud skills
├── data.yaml                        # 7 database skills
├── design.yaml                      # 10 design skills
├── devops.yaml                      # 22 DevOps skills (+7: cloud functions, git workflows, automation)
├── frontend.yaml                    # 22 frontend skills (+4: UI patterns, auth integration)
├── gaming.yaml                      # 3 gaming skills
├── languages.yaml                   # 17 language skills
├── management.yaml                  # 4 management skills
├── mcp.yaml                         # 8 MCP skills
├── mobile.yaml                      # 8 mobile skills
├── performance.yaml                 # 1 performance skill
├── planning.yaml                    # 12 planning skills (+3: file-based planning, execution)
├── quality.yaml                     # 21 QA skills (+4: TDD, test fixing, verification)
├── research.yaml                    # 11 research skills
├── security.yaml                    # 35 security skills (+29: penetration testing, vulnerability assessment)
└── tools.yaml                       # 41 utility skills (+10: bots, email, content creation)
```

**File Purposes**:
- `_index.yaml`: Domain registry, agent profiles, resolution rules
- Domain files: Skill entries with priority scores and mappings

### 2.5 `skills/` — Domain Skill Definitions

Contains 310+ skill folders with SKILL.md definitions.

```
skills/
├── api-patterns/                    # API design patterns
│   └── SKILL.md
├── backend-development/             # Backend fundamentals
│   ├── SKILL.md
│   └── references/
├── clean-code/                      # Clean code principles
│   └── SKILL.md
├── debugging/                       # Debugging techniques
│   └── SKILL.md
├── react-patterns/                  # React best practices
│   └── SKILL.md
├── security-best-practices/         # Security guidelines
│   └── SKILL.md
├── testing-patterns/                # Testing strategies
│   └── SKILL.md
├── typescript-expert/               # TypeScript expertise
│   └── SKILL.md
└── [200+ more skill folders]
```

**Skill Folder Structure**:
```
{skill-id}/
├── SKILL.md                         # Main skill definition (required)
├── references/                      # Reference materials (optional)
│   └── *.md
├── scripts/                         # Executable scripts (optional)
│   └── *.py, *.js
└── assets/                          # Templates, assets (optional)
```

### 2.6 `cli/` — CLI Installer System

Contains the Node.js CLI for installing the framework.

```
cli/
├── install.js                       # Main installer (1076 lines)
├── install.test.js.example          # Test file template
└── README.md                        # CLI documentation
```

**Key Functions in `install.js`**:
- `main()` — Entry point, argument parsing
- `installTool()` — Install framework for specific tool
- `uninstallTool()` — Uninstall framework from tool
- `listInstallations()` — Show installation status
- `copyDirectory()` — Copy framework files
- `getToolPaths()` — Get target paths for each tool

### 2.7 `code-assistants/` — IDE-Specific Configurations

Contains configuration files for each supported AI tool.

```
code-assistants/
├── antigravity-assistant/           # Antigravity/Gemini integration
│   ├── AntigravityGlobal.agent.md
│   └── GEMINI.md
├── claude-assistant/                # Claude Code integration
│   └── CLAUDE.md
├── copilot-assistant/               # GitHub Copilot integration
│   └── agent-assistant.agent.md
└── cursor-assistant/                # Cursor integration
    ├── .cursorrules
    └── rules/
        └── agent-assistant.mdc
```

**Tool Integration Methods**:
| Tool | Entry File | Method |
|------|------------|--------|
| Claude Code | `~/.claude/CLAUDE.md` | CLI → `~/.claude/` |
| Cursor | agent-assistant.mdc | MDC rule file injection |
| Copilot | agent-assistant.agent.md | VS Code prompts |
| Antigravity | GEMINI.md | Global config |

### 2.8 `documents/` — Generated Documentation

Contains documentation generated by `/docs` commands.

```
documents/
├── knowledge-overview.md            # Project introduction, goals
├── knowledge-architecture.md        # System design, components
├── knowledge-domain.md              # Data models, API contracts
├── knowledge-source-base.md         # Directory structure (this file)
├── knowledge-standards.md           # Code style, naming conventions
├── business/                        # Business documentation
│   ├── business-prd.md              # Product requirements
│   ├── business-features.md         # Feature specifications
│   ├── business-workflows.md        # User journeys
│   └── business-glossary.md         # Term definitions
└── audit/                           # Security/compliance docs
    ├── audit-security.md            # Security assessment
    ├── audit-compliance.md          # Compliance status
    ├── audit-dataflow.md            # Data flow analysis
    └── audit-recommendations.md     # Security recommendations
```

### 2.9 `assets/` — Static Assets

Contains static assets like logos and images.

```
assets/
└── logo.svg                         # Project logo
```

---

## 3. Entry Points

### 3.1 Primary Entry Points

| Entry Point | Purpose | Used By |
|-------------|---------|---------|
| `CLAUDE.md` | Claude Code orchestration entry | Claude Code |
| `CURSOR.md` | Cursor orchestration entry | Cursor |
| `COPILOT.md` | Copilot orchestration entry | GitHub Copilot |
| `GEMINI.md` | Antigravity orchestration entry | Antigravity/Gemini |
| `cli/install.js` | CLI installer entry | npm/node |
| `rules/BOOTSTRAP.md` | Orchestration rules entry | All tools |

### 3.2 Entry Point Content

All tool entry points follow the same pattern:

```markdown
# ⚡ AGENT ASSISTANT v2.0

> **LOAD**: `{HOME}/.cursor/skills/agent-assistant/rules/BOOTSTRAP.md`
> **This file is the ENTRY POINT. BOOTSTRAP.md contains all orchestration rules.**

## 🆔 IDENTITY
[Orchestrator identity definition]

## 📂 PATHS
[Path definitions for tool]

## 🌐 LANGUAGE
[Language matching rules]

## 🎯 COMMAND ROUTING
[Command to workflow mapping]

## 🔀 TIERED EXECUTION
[Tier 1/2 delegation rules]

## ⛔ PROHIBITIONS
[What orchestrator must NOT do]

## ✅ SELF-CHECK
[Verification checklist]
```

---

## 4. Key Modules

### 4.1 CLI Installer (`cli/install.js`)

**Purpose**: Install/uninstall framework for supported AI tools.

**Key Components**:

```javascript
// Tool configuration
const TOOLS = {
  cursor: { ... },
  copilot: { ... },
  antigravity: { ... },
  claude: { ... }
};

// Core directories to copy
const CORE_DIRS = ['agents', 'commands', 'rules', 'skills', 'matrix-skills'];

// Main functions
async function main() { ... }           // Entry point
async function installTool(tool) { ... } // Install for tool
async function uninstallTool(tool) { ... } // Uninstall from tool
async function listInstallations() { ... } // Show status
```

**Usage**:
```bash
node cli/install.js install cursor
node cli/install.js uninstall copilot
node cli/install.js list
```

### 4.2 Matrix Skill Discovery (HSOL: `matrix-skills/_index.yaml` + `_dynamic.yaml`)

**Purpose**: Central registry for skill resolution and HSOL (Hybrid Skill Orchestration Layer). Combines static matrix domains with dynamic skills; discovery runs only for `hard`/`focus` variants when matrix fitness &lt; 0.8 (blocking when &lt; 0.75). See `rules/SKILL-DISCOVERY.md` and `rules/SKILL-ORCHESTRATION.md`.

**Key Sections**:

```yaml
version: "1.1"
total_matrix_skills: 310

hsol:                            # HSOL config (discovery, thresholds 0.75/0.8, apply_for_variants: [hard, focus])
  enabled: true
  dynamic_manifest: "_dynamic.yaml"
  discovery: { apply_for_variants: [hard, focus], ... }
  thresholds: { matrix_sufficient: 0.8, matrix_adequate: 0.75, ... }

domains:                         # 19 domain registrations
  backend: { file: "backend.yaml", ... }
  # ...

agent_profiles:                  # 21 agent-to-domain mappings
  backend-engineer:
    profile: "backend:execution"
    inherit_from: [backend, architecture, quality, data, languages]
    primary_domain: "backend"
  # ...

resolution:                      # Resolution rules
  precedence: [direct_agent_match, profile_match, domain_inheritance]
  thresholds: { minimum_priority: 5, core_priority: 7, critical_priority: 9 }
```

### 4.3 Agent Template (`AGENT-TEMPLATE.md`)

**Purpose**: Template for creating new agents.

**Key Sections**:

```markdown
---
name: {agent-name}
profile: "{domain}:{category}"
tools: [Read, Grep, Glob, ...]
handoffs: [agent1, agent2, ...]
---

## 📋 Identity
## 🎯 Core Directive
## ⚡ Skills (Matrix Discovery)
## 🧠 Thinking Protocol
## ⛔ Constraints
## 📤 Output Format
```

---

## 5. File Naming Conventions

### 5.1 General Patterns

| Type | Pattern | Examples |
|------|---------|----------|
| Agents | `{kebab-case}.md` | `backend-engineer.md`, `tech-lead.md` |
| Commands | `{command}.md` | `cook.md`, `fix.md`, `deploy.md` |
| Command Variants | `{command}/{variant}.md` | `cook/fast.md`, `docs/core.md` |
| Skills | `{kebab-case}/SKILL.md` | `api-patterns/SKILL.md` |
| Rules | `{UPPER-CASE}.md` | `BOOTSTRAP.md`, `EXECUTION-PROTOCOL.md` |
| Matrix Domains | `{lowercase}.yaml` | `backend.yaml`, `frontend.yaml` |
| Entry Points | `{TOOL}.md` | `CLAUDE.md`, `CURSOR.md` |

### 5.2 Special Files

| File | Purpose |
|------|---------|
| `_index.yaml` | Central matrix registry + HSOL config |
| `_dynamic.yaml` | Dynamic skill manifest (updated when agents run `npx skills add ... -g -y`) |
| `AGENT-TEMPLATE.md` | Agent creation template |
| `README.md` | Public documentation |
| `LICENSE` | MIT license file |
| `package.json` | npm package configuration |
| `.releaserc.json` | Semantic release configuration |
| `.gitignore` | Git ignore patterns |

---

## 6. Configuration Files

### 6.1 `package.json`

```json
{
  "name": "agent-assistant",
  "version": "1.1.0",
  "description": "Multi-agent orchestration framework for AI coding assistants (with HSOL)",
  "main": "cli/install.js",
  "bin": {
    "agent-assistant": "./cli/install.js"
  },
  "scripts": {
    "install:cursor": "node cli/install.js install cursor",
    "install:all": "node cli/install.js install --all",
    "uninstall:all": "node cli/install.js uninstall --all",
    "list": "node cli/install.js list",
    "semantic-release": "semantic-release"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 6.2 `.releaserc.json`

Semantic release configuration for automated versioning and publishing.

### 6.3 `.gitignore`

```
node_modules/
.DS_Store
*.log
reports/
.env
```

---

## 7. Path References

### 7.1 Path Placeholders

Paths use placeholders that are resolved at runtime:

| Placeholder | Resolution |
|-------------|------------|
| `{HOME}` | User home directory (`~`) |
| `{TOOL}` | AI tool name (`cursor`, `copilot`, etc.) |

### 7.2 Standard Paths

```
COMMANDS_PATH = {HOME}/.{TOOL}/skills/agent-assistant/commands/
AGENTS_PATH   = {HOME}/.{TOOL}/skills/agent-assistant/agents/
SKILLS_PATH   = {HOME}/.{TOOL}/skills/
RULES_PATH    = {HOME}/.{TOOL}/skills/agent-assistant/rules/
REPORTS_PATH  = ./reports/
```

### 7.3 Tool-Specific Installation Paths

| Tool | Base Path | Notes |
|------|-----------|-------|
| Cursor | `~/.cursor/` | MDC rules in `~/.cursor/rules/` |
| Copilot | `~/.copilot/` | VS Code prompts in prompts folder |
| Antigravity | `~/.gemini/antigravity/` | Global config in `~/.gemini/` |
| Claude | `~/.claude/` | Global config with CLAUDE.md |

---

## 8. File Statistics

| Category | Count | Description |
|----------|-------|-------------|
| Agent Files | 21 | Specialist agent definitions |
| Command Files | 50+ | Workflow definitions (routers + variants: fast, hard, focus) |
| Rule Files | 8 | Orchestration protocols |
| Matrix Files | 20 | Skill discovery config |
| Skill Folders | 310+ | Domain skill definitions |
| Entry Points | 4 | Tool-specific entry files |
| Config Files | 5 | package.json, etc. |

**Total Files**: ~2,000+ (including skills subfolder contents)

---

## 9. Related Documentation

| Document | Purpose |
|----------|---------|
| `knowledge-overview.md` | Project introduction, goals, tech stack |
| `knowledge-architecture.md` | System design, components, data flow |
| `knowledge-domain.md` | Data models, API contracts, entities |
| `knowledge-standards.md` | Code style, naming conventions |
| `cli/README.md` | CLI documentation |
| `README.md` | Public-facing documentation |

---

**Agent Assistant Source Base** — _Organized, Discoverable, Well-Structured_
