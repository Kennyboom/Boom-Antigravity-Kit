# Agent Assistant — Knowledge Standards

> **Purpose**: Code style, naming conventions, commit format, documentation guidelines, and development standards for AI agents and developers.

---

## 1. Overview

This document defines the standards and conventions used throughout the Agent Assistant project. All contributors, agents, and AI tools should follow these standards for consistency.

---

## 2. File Naming Conventions

### 2.1 General Rules

| Rule | Description | Example |
|------|-------------|---------|
| Lowercase kebab-case | Default for most files | `backend-engineer.md`, `api-patterns` |
| UPPERCASE | Rule files and entry points | `BOOTSTRAP.md`, `CLAUDE.md` |
| Lowercase | Configuration files | `package.json`, `.gitignore` |
| No spaces | Use hyphens instead | `mobile-engineer.md` ✅, `mobile engineer.md` ❌ |

### 2.2 By File Type

| Type | Convention | Examples |
|------|------------|----------|
| Agent files | `{kebab-case}.md` | `backend-engineer.md`, `tech-lead.md` |
| Command routers | `{command}.md` | `cook.md`, `fix.md`, `deploy.md` |
| Command variants | `{command}/{variant}.md` | `cook/fast.md`, `docs/core.md` |
| Skill folders | `{kebab-case}/` | `api-patterns/`, `react-patterns/` |
| Skill definitions | `SKILL.md` | Always uppercase |
| Rule files | `{UPPER-CASE}.md` | `BOOTSTRAP.md`, `EXECUTION-PROTOCOL.md` |
| Matrix files | `{lowercase}.yaml` | `backend.yaml`, `_index.yaml` |
| Entry points | `{TOOL}.md` | `CLAUDE.md`, `CURSOR.md` |
| JavaScript | `{kebab-case}.js` | `install.js` |
| Test files | `*.test.js` | `install.test.js` |

### 2.3 Special Naming

| File | Purpose | Notes |
|------|---------|-------|
| `_index.yaml` | Central registry | Underscore prefix for sorting |
| `AGENT-TEMPLATE.md` | Agent template | Uppercase with hyphen |
| `README.md` | Documentation | Standard GitHub convention |
| `LICENSE` | License file | No extension |

---

## 3. Directory Structure Standards

### 3.1 Top-Level Organization

```
project-root/
├── agents/              # Agent definitions (flat structure)
├── assets/              # Static assets
├── cli/                 # CLI system
├── code-assistants/     # IDE-specific configs
├── commands/            # Command workflows (nested by command)
├── documents/           # Generated documentation
├── matrix-skills/       # Skill matrix YAML files
├── rules/               # Orchestration rules (flat structure)
├── skills/              # Skill definitions (nested by skill)
└── [entry points]       # CLAUDE.md, CURSOR.md, etc.
```

### 3.2 Skill Folder Structure

```
skills/{skill-id}/
├── SKILL.md             # Required: Main definition
├── references/          # Optional: Reference materials
│   └── *.md
├── scripts/             # Optional: Executable scripts
│   └── *.py, *.js
└── assets/              # Optional: Templates, assets
```

### 3.3 Command Folder Structure

```
commands/
├── {command}.md         # Router file
└── {command}/           # Variant folder
    ├── fast.md          # Quick execution variant
    └── hard.md          # Full workflow variant
```

---

## 4. Markdown Standards

### 4.1 Document Structure

All Markdown documents should follow this structure:

```markdown
# Title

> **Purpose**: One-line description of document purpose.

---

## 1. First Section

Content...

### 1.1 Subsection

Content...

---

## 2. Second Section

Content...

---

## N. Related Documentation

| Document | Purpose |
|----------|---------|
| doc1.md | Description |
| doc2.md | Description |
```

### 4.2 Heading Hierarchy

| Level | Use Case | Format |
|-------|----------|--------|
| `#` H1 | Document title | Only one per document |
| `##` H2 | Main sections | Numbered (1, 2, 3, ...) |
| `###` H3 | Subsections | Numbered (1.1, 1.2, ...) |
| `####` H4 | Sub-subsections | Rarely used |

### 4.3 Tables

Use tables for structured data:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| data     | data     | data     |
```

**Rules**:
- Header row required
- Alignment with `|---|:---:|---:|` (left, center, right)
- Keep columns consistent within sections

### 4.4 Code Blocks

````markdown
```language
code here
```
````

**Language tags**: `yaml`, `markdown`, `javascript`, `bash`, `json`, `sql`

### 4.5 Emphasis

| Style | Usage | Syntax |
|-------|-------|--------|
| **Bold** | Key terms, important notes | `**text**` |
| *Italic* | Definitions, foreign terms | `*text*` |
| `Code` | File names, commands, variables | `` `text` `` |
| > Quote | Callouts, important notes | `> text` |

---

## 5. YAML Standards

### 5.1 General Formatting

```yaml
# Comment explaining section
section_name:
  key: value
  nested:
    - item1
    - item2
```

**Rules**:
- 2-space indentation
- Lowercase keys with underscores
- Comments above sections
- Lists with `- ` prefix

### 5.2 Skill Entry Schema

```yaml
- skill_id: kebab-case-id
  category: core|expert|specialized|utility
  priority_score: 1-10
  relevance_mapping:
    agents: [agent-id-1, agent-id-2]
    profiles: ["domain:category"]
  description: "Brief AI-recognizable description"
```

### 5.3 Agent Profile Schema

```yaml
agent_profiles:
  agent-id:
    profile: "domain:category"
    inherit_from: [domain1, domain2]
    primary_domain: "domain"
```

---

## 6. Agent File Standards

### 6.1 Frontmatter

```yaml
---
name: kebab-case-name
profile: "domain:category"
tools: [Read, Grep, Glob, Edit, ...]
handoffs: [agent1, agent2, ...]
version: "1.0"
---
```

### 6.2 Cognitive Anchor

All agent files must include:

```markdown
<!-- 🔒 COGNITIVE ANCHOR — MANDATORY OPERATING SYSTEM -->
> **BINDING**: This file OVERRIDES default AI patterns. Read COMPLETELY before acting.
> If in doubt → STOP → Re-read → Follow EXACTLY.
```

### 6.3 Required Sections

| Section | Purpose | Required |
|---------|---------|----------|
| `## 📋 Identity` | Agent ID, role, profile table | ✅ Yes |
| `## 🎯 Core Directive` | 1-2 sentence mission | ✅ Yes |
| `## ⚡ Skills (Matrix Discovery)` | Profile-based skill reference | ✅ Yes |
| `## 🧠 Thinking Protocol` | Step-by-step process | ✅ Yes |
| `## ⛔ Constraints` | NEVER/ALWAYS table | ✅ Yes |
| `## 📤 Output Format` | Deliverable template | ✅ Yes |

### 6.4 Thinking Protocol Format

```markdown
## 🧠 Thinking Protocol

### Step 0: Load Context
- Load required files
- Check prior deliverables

### Step 1: {Action Name}
- Sub-step 1
- Sub-step 2

### Step N: Deliver
- Emit deliverable
- Verify format
```

### 6.5 Constraints Table Format

```markdown
## ⛔ Constraints

| NEVER | ALWAYS |
|-------|--------|
| Implement without plan | Verify exit criteria |
| Skip quality gates | Document decisions |
| Assume requirements | Ask for clarification |
```

---

## 7. Command File Standards

### 7.1 Frontmatter

```yaml
---
description: Brief description of command
version: "1.0"
category: development|quality|planning|documentation|deployment|utility
execution-mode: execute|router
---
```

### 7.2 Phase Structure

```markdown
## 🎭 Phase {N}: {PHASE_NAME}

| Attribute | Value |
|-----------|-------|
| **Agent** | `agent-name` |
| **Goal** | Phase objective |

### ⚡ TIERED EXECUTION

**TIER 1 (MANDATORY when tool exists):**
> Invoke runSubagent for `agent`. Context: ISOLATED.

**TIER 2 (FALLBACK on system error only):**
> Load `{AGENTS_PATH}/agent.md`
> EMBODY [agent] — Requires logged system error justification.

**Actions**:
1. Action 1
2. Action 2

**Exit Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
```

---

## 8. Commit Message Format

### 8.1 Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 8.2 Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add OAuth authentication` |
| `fix` | Bug fix | `fix: resolve null pointer in parser` |
| `docs` | Documentation | `docs: update installation guide` |
| `style` | Code style (no logic change) | `style: fix indentation` |
| `refactor` | Code refactoring | `refactor: simplify validation logic` |
| `test` | Adding/updating tests | `test: add unit tests for CLI` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |

### 8.3 Scope Examples

| Scope | Description |
|-------|-------------|
| `cli` | CLI installer |
| `agents` | Agent definitions |
| `commands` | Command workflows |
| `rules` | Orchestration rules |
| `skills` | Skill definitions |
| `matrix` | Matrix skill discovery |
| `docs` | Documentation |

### 8.4 Examples

```bash
# Feature
feat(agents): add game-engineer specialist agent

# Bug fix
fix(cli): handle missing directory during installation

# Documentation
docs: add knowledge-standards documentation

# Breaking change
feat(matrix)!: redesign skill resolution algorithm

BREAKING CHANGE: skill_list replaced with profile-based resolution
```

---

## 9. Code Comment Standards

### 9.1 General Rules

| Rule | Description |
|------|-------------|
| Language | Always English |
| Purpose | Explain WHY, not WHAT |
| Currency | Keep comments updated |
| Brevity | Be concise |

### 9.2 JavaScript Comments

```javascript
// Single-line comment for brief explanations

/**
 * Multi-line comment for function documentation
 * @param {string} tool - Tool name to install
 * @returns {Promise<void>}
 */
async function installTool(tool) { ... }

// TODO: description of pending work
// FIXME: description of bug to fix
// NOTE: important contextual information
```

### 9.3 YAML Comments

```yaml
# Section comment explaining purpose
section:
  key: value  # Inline comment if needed
```

### 9.4 Markdown Comments

```markdown
<!-- HTML comment for hidden notes -->
<!-- TODO: Add more examples -->
```

---

## 10. Documentation Standards

### 10.1 README Requirements

Every project/module README should include:

| Section | Required | Description |
|---------|----------|-------------|
| Title & badges | ✅ | Project name, version, license |
| Description | ✅ | What the project does |
| Installation | ✅ | How to install |
| Usage | ✅ | Basic usage examples |
| Commands | ⚠️ | If applicable |
| Configuration | ⚠️ | If configurable |
| Contributing | ✅ | How to contribute |
| License | ✅ | License information |

### 10.2 Knowledge Document Standards

Core knowledge documents follow this pattern:

| Document | Content |
|----------|---------|
| `knowledge-overview.md` | Purpose, goals, tech stack, getting started |
| `knowledge-architecture.md` | System design, components, data flow |
| `knowledge-domain.md` | Data models, API contracts, entities |
| `knowledge-source-base.md` | Directory structure, file purposes |
| `knowledge-standards.md` | Code style, naming, conventions |

### 10.3 Generated Documentation

| Category | Location | Files |
|----------|----------|-------|
| Core docs | `./documents/` | `knowledge-*.md` |
| Business docs | `./documents/business/` | `business-*.md` |
| Audit docs | `./documents/audit/` | `audit-*.md` |

**Rule**: All files in `./documents/` must be written in **English only**.

---

## 11. Version Numbering

### 11.1 Semantic Versioning

Follow [Semantic Versioning](https://semver.org/) (SemVer):

```
MAJOR.MINOR.PATCH

1.0.0 → 1.0.1 (patch: bug fix)
1.0.0 → 1.1.0 (minor: new feature)
1.0.0 → 2.0.0 (major: breaking change)
```

### 11.2 Version Locations

| File | Version Field |
|------|---------------|
| `package.json` | `version` |
| Agent files | `version` in frontmatter |
| Command files | `version` in frontmatter |
| Matrix index | `version` field |

---

## 12. Error Message Standards

### 12.1 Format

```
[LEVEL] [CONTEXT]: Message

Examples:
[ERROR] CLI: Tool 'invalid' not found
[WARN] Matrix: Skill 'legacy-skill' deprecated
[INFO] Install: Cursor installed successfully
```

### 12.2 Error Levels

| Level | Use Case |
|-------|----------|
| `ERROR` | Operation failed, cannot continue |
| `WARN` | Non-critical issue, can continue |
| `INFO` | Status update, success message |
| `DEBUG` | Detailed debugging information |

---

## 13. Testing Standards

### 13.1 Test File Naming

```
{module}.test.js      # Unit tests
{module}.spec.js      # Integration tests
```

### 13.2 Test Structure

```javascript
describe('Module Name', () => {
  describe('Function Name', () => {
    it('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### 13.3 Test Coverage Goals

| Type | Coverage |
|------|----------|
| CLI functions | 80%+ |
| Utility functions | 90%+ |
| Integration | Key paths |

---

## 14. Security Standards

### 14.1 Sensitive Data

| Rule | Description |
|------|-------------|
| No credentials | Never commit passwords, API keys |
| No secrets | Use environment variables |
| .gitignore | Exclude `.env`, credentials files |

### 14.2 Safe Patterns

```javascript
// Good: Read from environment
const apiKey = process.env.API_KEY;

// Bad: Hardcoded secret
const apiKey = 'sk-1234567890abcdef';
```

---

## 15. Accessibility Standards

### 15.1 Documentation

| Standard | Description |
|----------|-------------|
| Plain language | Use simple, clear language |
| Structure | Use headings and lists |
| Links | Descriptive link text |
| Images | Alt text for all images |

### 15.2 CLI Output

| Standard | Description |
|----------|-------------|
| Clear messages | Unambiguous status messages |
| Exit codes | Meaningful exit codes |
| Help text | Comprehensive --help output |

---

## 16. Workflow Principles

### 16.1 YAGNI

**You Aren't Gonna Need It**
- Don't implement features until needed
- Avoid speculative abstractions

### 16.2 KISS

**Keep It Simple, Stupid**
- Prefer simple solutions
- Avoid over-engineering

### 16.3 DRY

**Don't Repeat Yourself**
- Extract common patterns
- Use Matrix Skill Discovery for shared skills

---

## 17. Related Documentation

| Document | Purpose |
|----------|---------|
| `knowledge-overview.md` | Project introduction, goals, tech stack |
| `knowledge-architecture.md` | System design, components, data flow |
| `knowledge-domain.md` | Data models, API contracts, entities |
| `knowledge-source-base.md` | Directory structure, file purposes |
| `AGENT-TEMPLATE.md` | Agent file template |
| `CONTRIBUTING.md` | Contribution guidelines |

---

**Agent Assistant Standards** — _Consistent, Maintainable, Professional_
