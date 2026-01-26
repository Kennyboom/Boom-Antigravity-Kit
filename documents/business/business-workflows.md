# Agent Assistant — Business Workflows

> **Document Type**: User Journey and Workflow Documentation  
> **Version**: 1.0  
> **Status**: Complete  
> **Last Updated**: 2026-01-26

---

## 1. Workflow Overview

Agent Assistant provides structured workflows for all phases of software development:

| Category      | Workflows | Description                        |
| ------------- | --------- | ---------------------------------- |
| Installation  | 3         | Setup and configuration            |
| Development   | 6         | Feature implementation, bug fixing |
| Quality       | 5         | Testing, review, debugging         |
| Documentation | 3         | Technical, business, audit docs    |
| Deployment    | 4         | Staging, production, rollback      |
| Contribution  | 3         | Adding agents, skills, commands    |

---

## 2. Installation Workflows

### 2.1 WF-INSTALL-001: First-Time Installation

**Trigger**: New user wants to use Agent Assistant

**Prerequisites**:

- Node.js 18+ installed
- At least one supported AI tool (Claude Code, Cursor, Copilot, Antigravity)

**Workflow Diagram**:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Install Node   │────▶│   npm install   │────▶│   Install for   │
│   (if needed)   │     │ -g agent-assist │     │   your tool     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Ready to     │◀────│    Verify       │◀────│  Choose tool:   │
│      use!       │     │  installation   │     │ cursor/copilot/ │
└─────────────────┘     └─────────────────┘     │  antigravity    │
                                                └─────────────────┘
```

**Steps**:

| Step | Action           | Command                            | Expected Result           |
| ---- | ---------------- | ---------------------------------- | ------------------------- |
| 1    | Install globally | `npm install -g agent-assistant`   | Package installed         |
| 2    | Choose tool      | N/A                                | Identify primary AI tool  |
| 3    | Install for tool | `agent-assistant install cursor`   | Tool configured           |
| 4    | Verify           | `agent-assistant list`             | Shows installation status |
| 5    | Test             | Use `/cook:fast "test"` in AI tool | Workflow executes         |

**Success Criteria**:

- [ ] CLI installed globally
- [ ] Tool-specific configuration applied
- [ ] First command executes successfully

**Estimated Time**: 5 minutes

---

### 2.2 WF-INSTALL-002: Claude Code Setup

**Trigger**: User wants to use Agent Assistant with Claude Code

**Workflow Diagram**:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   npm install   │────▶│  agent-assistant│────▶│    Ready!       │
│ -g agent-assist │     │  install claude │     │ (installed to   │
│                 │     │                 │     │  ~/.claude/)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Steps**:

| Step | Action              | Command                              | Expected Result         |
| ---- | ------------------- | ------------------------------------ | ----------------------- |
| 1    | Install globally    | `npm install -g agent-assistant`     | Package installed       |
| 2    | Install for Claude  | `agent-assistant install claude`     | Installed to ~/.claude/ |
| 3    | Verify              | `agent-assistant list`               | Shows Claude installed  |
| 4    | Test                | Use `/cook:fast "test"` in Claude    | Workflow executes       |

**Success Criteria**:

- [ ] CLAUDE.md present in `~/.claude/`
- [ ] Commands available in `~/.claude/commands/`
- [ ] Skills available in `~/.claude/skills/`

**Estimated Time**: 3 minutes

---

### 2.3 WF-INSTALL-003: Multi-Tool Installation

**Trigger**: User wants Agent Assistant on multiple AI tools

**Workflow Diagram**:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   npm install   │────▶│  agent-assistant│────▶│    Verify       │
│ -g agent-assist │     │  install --all  │     │  all tools      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Command**: `agent-assistant install --all`

**Installed Tools**:

- Cursor → `~/.cursor/`
- Copilot → `~/.copilot/`
- Antigravity → `~/.gemini/`

**Estimated Time**: 3 minutes

---

## 3. Development Workflows

### 3.1 WF-DEV-001: Feature Implementation (Hard Mode)

**Trigger**: User needs to implement a complex feature

**Command**: `/cook:hard "implement user authentication"`

**Workflow Diagram**:

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  /cook:hard  │──▶│ Brainstormer │──▶│  Researcher  │──▶│   Scouter    │
│  "feature"   │   │ (require-    │   │  (patterns)  │   │ (codebase)   │
└──────────────┘   │  ments)      │   └──────────────┘   └──────────────┘
                   └──────────────┘                              │
                                                                 ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Reviewer   │◀──│   Tester     │◀──│  Engineer    │◀──│   Planner    │
│  (quality)   │   │  (tests)     │   │ (implement)  │   │   (plan)     │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
       │
       ▼
┌──────────────┐
│   Complete   │
│ (all gates   │
│   passed)    │
└──────────────┘
```

**Phase Details**:

| Phase | Agent                    | Goal                       | Deliverable             |
| ----- | ------------------------ | -------------------------- | ----------------------- |
| 1     | `brainstormer`           | Discover requirements      | Requirements list       |
| 2     | `researcher`             | Research patterns          | Pattern recommendations |
| 3     | `scouter`                | Analyze codebase           | Codebase context        |
| 4     | `designer`               | Design UI (if applicable)  | Design specs            |
| 5     | `planner`                | Create implementation plan | PLAN-{feature}.md       |
| 6     | `tech-lead` → `engineer` | Implement code             | Working code            |
| 7     | `tester`                 | Generate tests             | Test files              |
| 8     | `reviewer`               | Review code                | Approval                |

**Quality Gates**:

- [ ] Compile: Build succeeds
- [ ] Lint: No style errors
- [ ] Test: All tests pass
- [ ] Security: No vulnerabilities
- [ ] Review: Code approved

**Estimated Time**: 30-60 minutes (depends on complexity)

---

### 3.2 WF-DEV-002: Feature Implementation (Fast Mode)

**Trigger**: User needs to implement a simple feature quickly

**Command**: `/cook:fast "add dark mode toggle"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  /cook:fast  │────▶│   Scouter    │────▶│   Engineer   │
│  "feature"   │     │ (quick scan) │     │ (implement)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   Complete   │
                                          │ (minimal     │
                                          │   gates)     │
                                          └──────────────┘
```

**Phases**: 3-4 (condensed)
**Quality Gates**: Minimal (compile, lint)
**Estimated Time**: 10-20 minutes

---

### 3.3 WF-DEV-003: Bug Fixing

**Trigger**: User encounters a bug

**Command**: `/fix:fast "login button not responding"` or `/fix:hard "payment fails on Safari"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    /fix      │────▶│   Debugger   │────▶│   Engineer   │
│   "issue"    │     │ (root cause) │     │   (fix)      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Complete   │◀────│   Tester     │
                     └──────────────┘     │  (verify)    │
                                          └──────────────┘
```

**Phase Details**:

| Phase | Agent      | Goal                    |
| ----- | ---------- | ----------------------- |
| 1     | `debugger` | Identify root cause     |
| 2     | `planner`  | Plan fix (`:hard` only) |
| 3     | `engineer` | Implement fix           |
| 4     | `tester`   | Verify fix              |
| 5     | `reviewer` | Review (`:hard` only)   |

---

### 3.4 WF-DEV-004: Code Snippet Generation

**Trigger**: User needs a specific code snippet

**Command**: `/code:fast "React hook for debounced search"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    /code     │────▶│   Scouter    │────▶│   Engineer   │
│  "snippet"   │     │ (context)    │     │ (generate)   │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Output**: Code snippet with documentation

---

## 4. Quality Workflows

### 4.1 WF-QA-001: Test Generation

**Trigger**: User needs tests for existing code

**Command**: `/test:hard "user registration flow"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    /test     │────▶│   Scouter    │────▶│   Tester     │
│  "subject"   │     │ (analyze)    │     │ (generate)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   Complete   │
                                          │ (test files) │
                                          └──────────────┘
```

**Deliverables**:

- Unit tests
- Integration tests
- E2E tests (`:hard` only)
- Coverage report

---

### 4.2 WF-QA-002: Code Review

**Trigger**: User wants code reviewed

**Command**: `/review:fast "PR #123"` or `/review:hard "authentication module"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   /review    │────▶│   Scouter    │────▶│   Reviewer   │
│  "subject"   │     │ (context)    │     │ (analyze)    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   Report     │
                                          │ (approval/   │
                                          │  feedback)   │
                                          └──────────────┘
```

**Review Aspects**:

- Code quality
- Security vulnerabilities
- Performance issues
- Standards compliance
- Best practices

---

### 4.3 WF-QA-003: Systematic Debugging

**Trigger**: User has a bug to investigate

**Command**: `/debug:hard "memory leak in dashboard"`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   /debug     │────▶│   Scouter    │────▶│   Debugger   │
│   "issue"    │     │ (context)    │     │ (reproduce)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Report     │◀────│   Debugger   │
                     │ (root cause, │     │ (hypothesize │
                     │  recommend)  │     │  & test)     │
                     └──────────────┘     └──────────────┘
```

**Debugging Process**:

1. Reproduce issue
2. Formulate hypotheses
3. Test hypotheses systematically
4. Identify root cause
5. Recommend fix

---

## 5. Documentation Workflows

### 5.1 WF-DOC-001: Core Technical Documentation

**Trigger**: Project needs technical documentation

**Command**: `/docs:core`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  /docs:core  │────▶│   Scouter    │────▶│ Docs-Manager │
│              │     │ (analyze)    │     │ (generate)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   5 Files    │
                                          │ knowledge-*  │
                                          └──────────────┘
```

**Generated Files**:

| File                        | Content                          |
| --------------------------- | -------------------------------- |
| `knowledge-overview.md`     | Project intro, goals, tech stack |
| `knowledge-architecture.md` | System design, components        |
| `knowledge-domain.md`       | Data models, entities            |
| `knowledge-source-base.md`  | Directory structure              |
| `knowledge-standards.md`    | Code style, conventions          |

---

### 5.2 WF-DOC-002: Business Documentation

**Trigger**: Project needs business documentation

**Command**: `/docs:business`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│/docs:business│────▶│   Scouter    │────▶│  Business-   │
│              │     │ (analyze)    │     │   Analyst    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   4 Files    │◀────│ Docs-Manager │
                     │  business-*  │     │ (generate)   │
                     └──────────────┘     └──────────────┘
```

**Generated Files**:

| File                    | Content                |
| ----------------------- | ---------------------- |
| `business-prd.md`       | Product requirements   |
| `business-features.md`  | Feature specifications |
| `business-workflows.md` | User journeys          |
| `business-glossary.md`  | Term definitions       |

---

### 5.3 WF-DOC-003: Audit Documentation

**Trigger**: Project needs security/compliance documentation

**Command**: `/docs:audit`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  /docs:audit │────▶│   Scouter    │────▶│  Security-   │
│              │     │ (analyze)    │     │   Engineer   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   4 Files    │◀────│ Docs-Manager │
                     │   audit-*    │     │ (generate)   │
                     └──────────────┘     └──────────────┘
```

**Generated Files**:

| File                       | Content             |
| -------------------------- | ------------------- |
| `audit-security.md`        | Security assessment |
| `audit-compliance.md`      | Compliance status   |
| `audit-dataflow.md`        | Data flow analysis  |
| `audit-recommendations.md` | Recommendations     |

---

## 6. Deployment Workflows

### 6.1 WF-DEPLOY-001: Pre-Deployment Check

**Trigger**: Before deploying to any environment

**Command**: `/deploy:check`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│/deploy:check │────▶│   DevOps     │────▶│  Security    │
│              │     │ (validate)   │     │ (scan)       │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │  Readiness   │
                                          │   Report     │
                                          └──────────────┘
```

**Checks Performed**:

- [ ] Build succeeds
- [ ] Tests pass
- [ ] No critical vulnerabilities
- [ ] Configuration valid
- [ ] Dependencies up to date

---

### 6.2 WF-DEPLOY-002: Staging Deployment

**Trigger**: Ready to deploy to staging

**Command**: `/deploy:preview`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│/deploy:preview────▶│   DevOps     │────▶│   Staging    │
│              │     │ (deploy)     │     │   URL        │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Output**: Staging environment URL

---

### 6.3 WF-DEPLOY-003: Production Deployment

**Trigger**: Ready to deploy to production

**Command**: `/deploy:production`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│/deploy:      │────▶│   DevOps     │────▶│  Security    │
│  production  │     │ (prepare)    │     │ (final scan) │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                     ┌──────────────┐     ┌──────────────┐
                     │  Deployment  │◀────│   DevOps     │
                     │ Confirmation │     │  (deploy)    │
                     └──────────────┘     └──────────────┘
```

**Prerequisites**:

- `/deploy:check` passed
- `/deploy:preview` verified
- Security scan cleared

---

### 6.4 WF-DEPLOY-004: Rollback

**Trigger**: Production issue requires rollback

**Command**: `/deploy:rollback`

**Workflow Diagram**:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│/deploy:      │────▶│   DevOps     │────▶│  Previous    │
│  rollback    │     │ (execute)    │     │   Version    │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Output**: Confirmation of rollback to previous version

---

## 7. Contribution Workflows

### 7.1 WF-CONTRIB-001: Adding a New Skill

**Trigger**: Contributor wants to add domain knowledge

**Workflow Diagram**:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Create skill     │────▶│ Add to domain    │────▶│    Done!         │
│ folder with      │     │ YAML file        │     │ (no agent edits) │
│ SKILL.md         │     │                  │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Steps**:

| Step | Action              | Location                      |
| ---- | ------------------- | ----------------------------- |
| 1    | Create skill folder | `skills/{skill-id}/`          |
| 2    | Create SKILL.md     | `skills/{skill-id}/SKILL.md`  |
| 3    | Add to domain file  | `matrix-skills/{domain}.yaml` |
| 4    | Test skill loading  | Use relevant agent            |

**SKILL.md Template**:

```markdown
# {Skill Name}

> **Purpose**: Brief description of what this skill provides.

## When to Use

- Trigger condition 1
- Trigger condition 2

## Guidelines

### Section 1

Guidelines content...

### Section 2

Guidelines content...

## References

- Reference 1
- Reference 2
```

---

### 7.2 WF-CONTRIB-002: Adding a New Agent

**Trigger**: Contributor wants to add a specialist agent

**Workflow Diagram**:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Copy AGENT-      │────▶│ Define profile,  │────▶│ Add to _index    │
│ TEMPLATE.md      │     │ thinking proto-  │     │ agent_profiles   │
│                  │     │ col, constraints │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Steps**:

| Step | Action                   | Location                                 |
| ---- | ------------------------ | ---------------------------------------- |
| 1    | Copy template            | `AGENT-TEMPLATE.md` → `agents/{name}.md` |
| 2    | Fill in identity         | Name, profile, role                      |
| 3    | Define thinking protocol | Step-by-step process                     |
| 4    | Define constraints       | NEVER/ALWAYS rules                       |
| 5    | Add to matrix            | `matrix-skills/_index.yaml`              |

---

### 7.3 WF-CONTRIB-003: Adding a New Command

**Trigger**: Contributor wants to add a workflow command

**Workflow Diagram**:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Create router    │────▶│ Create variant   │────▶│ Update entry     │
│ commands/{cmd}.md│     │ files (fast/hard)│     │ point files      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Steps**:

| Step | Action                | Location                       |
| ---- | --------------------- | ------------------------------ |
| 1    | Create router         | `commands/{command}.md`        |
| 2    | Create variant folder | `commands/{command}/`          |
| 3    | Create fast variant   | `commands/{command}/fast.md`   |
| 4    | Create hard variant   | `commands/{command}/hard.md`   |
| 5    | Update entry points   | `CLAUDE.md`, `CURSOR.md`, etc. |

---

## 8. Workflow Best Practices

### 8.1 Choosing the Right Variant

| Situation                        | Recommended Variant |
| -------------------------------- | ------------------- |
| Simple change, low risk          | `:fast`             |
| Complex feature, high visibility | `:hard`             |
| Production code                  | `:hard`             |
| Prototype or experiment          | `:fast`             |
| Security-sensitive               | `:hard`             |
| Client-facing                    | `:hard`             |

### 8.2 Workflow Optimization Tips

| Tip                                          | Benefit                        |
| -------------------------------------------- | ------------------------------ |
| Run `/docs:core` first for new projects      | Agents work with YOUR patterns |
| Use `:fast` for iteration, `:hard` for final | Balance speed and quality      |
| Check quality gate failures early            | Avoid rework later             |
| Review plan before implementation            | Catch issues early             |

### 8.3 Common Workflow Combinations

| Goal              | Workflow Sequence                                                      |
| ----------------- | ---------------------------------------------------------------------- |
| New project setup | `/docs:core` → `/docs:business`                                        |
| New feature       | `/plan:hard` → `/cook:hard`                                            |
| Bug fix           | `/debug:fast` → `/fix:fast` → `/test:fast`                             |
| Release prep      | `/review:hard` → `/test:hard` → `/deploy:check` → `/deploy:production` |
| Security audit    | `/docs:audit` → `/review:hard`                                         |

---

## 9. Related Documentation

| Document                | Purpose                |
| ----------------------- | ---------------------- |
| `business-prd.md`       | Product requirements   |
| `business-features.md`  | Feature specifications |
| `business-glossary.md`  | Term definitions       |
| `knowledge-overview.md` | Technical overview     |

---

**Document Classification**: Business Workflows  
**Completeness**: 100%  
**Review Status**: Complete
