# 📚 QUICK REFERENCE

> **PURPOSE**: Fast lookup tables for commands, agents, and dependencies

---

## COMMAND ROUTING TABLE

| User Input          | Resolves To        | Workflow File            |
| ------------------- | ------------------ | ------------------------ |
| `/cook implement X` | `/cook:auto`       | `~/.{TOOL}/skills/agent-assistant/commands/cook.md`       |
| `/cook:fast X`      | `/cook:fast`       | `~/.{TOOL}/skills/agent-assistant/commands/cook/fast.md`  |
| `/cook:hard X`      | `/cook:hard`       | `~/.{TOOL}/skills/agent-assistant/commands/cook/hard.md`  |
| `/fix error X`      | `/fix:auto`        | `~/.{TOOL}/skills/agent-assistant/commands/fix.md`        |
| `/fix:fast X`       | `/fix:fast`        | `~/.{TOOL}/skills/agent-assistant/commands/fix/fast.md`   |
| `/fix:hard X`       | `/fix:hard`        | `~/.{TOOL}/skills/agent-assistant/commands/fix/hard.md`   |
| `/debug X`          | `/debug:auto`      | `~/.{TOOL}/skills/agent-assistant/commands/debug.md`      |
| `/plan X`           | `/plan:auto`       | `~/.{TOOL}/skills/agent-assistant/commands/plan.md`       |
| `/test X`           | `/test:auto`       | `~/.{TOOL}/skills/agent-assistant/commands/test.md`       |
| `/review X`         | `/review:auto`     | `~/.{TOOL}/skills/agent-assistant/commands/review.md`     |
| `/docs X`           | `/docs:auto`       | `~/.{TOOL}/skills/agent-assistant/commands/docs.md`       |
| `/design X`         | `/design:auto`     | `~/.{TOOL}/skills/agent-assistant/commands/design.md`     |
| `/deploy X`         | `/deploy:auto`     | `~/.{TOOL}/skills/agent-assistant/commands/deploy.md`     |
| `/brainstorm X`     | `/brainstorm:auto` | `~/.{TOOL}/skills/agent-assistant/commands/brainstorm.md` |
| `/ask X`            | `/ask:auto`        | `~/.{TOOL}/skills/agent-assistant/commands/ask.md`        |
| `/code X`           | `/code:auto`       | `~/.{TOOL}/skills/agent-assistant/commands/code.md`       |

---

## AGENT LOOKUP TABLE

| Domain        | Agent                  | File                             | Category    |
| ------------- | ---------------------- | -------------------------------- | ----------- |
| Architecture  | `tech-lead`            | `~/.{TOOL}/skills/agent-assistant/agents/tech-lead.md`            | meta        |
| Planning      | `planner`              | `~/.{TOOL}/skills/agent-assistant/agents/planner.md`              | meta        |
| Backend       | `backend-engineer`     | `~/.{TOOL}/skills/agent-assistant/agents/backend-engineer.md`     | engineering |
| Frontend      | `frontend-engineer`    | `~/.{TOOL}/skills/agent-assistant/agents/frontend-engineer.md`    | engineering |
| Database      | `database-architect`   | `~/.{TOOL}/skills/agent-assistant/agents/database-architect.md`   | engineering |
| Mobile        | `mobile-engineer`      | `~/.{TOOL}/skills/agent-assistant/agents/mobile-engineer.md`      | engineering |
| Games         | `game-engineer`        | `~/.{TOOL}/skills/agent-assistant/agents/game-engineer.md`        | engineering |
| Testing       | `tester`               | `~/.{TOOL}/skills/agent-assistant/agents/tester.md`               | validation  |
| Review        | `reviewer`             | `~/.{TOOL}/skills/agent-assistant/agents/reviewer.md`             | validation  |
| Security      | `security-engineer`    | `~/.{TOOL}/skills/agent-assistant/agents/security-engineer.md`    | validation  |
| Performance   | `performance-engineer` | `~/.{TOOL}/skills/agent-assistant/agents/performance-engineer.md` | validation  |
| Debugging     | `debugger`             | `~/.{TOOL}/skills/agent-assistant/agents/debugger.md`             | validation  |
| Research      | `researcher`           | `~/.{TOOL}/skills/agent-assistant/agents/researcher.md`           | research    |
| Codebase      | `scouter`              | `~/.{TOOL}/skills/agent-assistant/agents/scouter.md`              | research    |
| Brainstorm    | `brainstormer`         | `~/.{TOOL}/skills/agent-assistant/agents/brainstormer.md`         | research    |
| Design        | `designer`             | `~/.{TOOL}/skills/agent-assistant/agents/designer.md`             | research    |
| Documentation | `docs-manager`         | `~/.{TOOL}/skills/agent-assistant/agents/docs-manager.md`         | support     |
| DevOps        | `devops-engineer`      | `~/.{TOOL}/skills/agent-assistant/agents/devops-engineer.md`      | support     |
| Business      | `business-analyst`     | `~/.{TOOL}/skills/agent-assistant/agents/business-analyst.md`     | support     |
| Project       | `project-manager`      | `~/.{TOOL}/skills/agent-assistant/agents/project-manager.md`      | support     |

---

## TASK → AGENT MAPPING

| Task Type         | Primary Agent          | Backup              |
| ----------------- | ---------------------- | ------------------- |
| API endpoints     | `backend-engineer`     | —                   |
| UI components     | `frontend-engineer`    | `designer`          |
| Database schema   | `database-architect`   | `backend-engineer`  |
| Security audit    | `security-engineer`    | —                   |
| Performance       | `performance-engineer` | —                   |
| Testing           | `tester`               | —                   |
| Code review       | `reviewer`             | —                   |
| External research | `researcher`           | `scouter`           |
| Codebase analysis | `scouter`              | `researcher`        |
| Documentation     | `docs-manager`         | —                   |
| Requirements      | `brainstormer`         | `business-analyst`  |
| Planning          | `planner`              | —                   |
| Visual design     | `designer`             | `frontend-engineer` |
| Orchestration     | `tech-lead`            | —                   |
| Bug investigation | `debugger`             | `tester`            |
| Deployment        | `devops-engineer`      | —                   |
| Git operations    | `devops-engineer`      | —                   |
| AI/ML agents      | `backend-engineer`     | `tech-lead`         |
| Penetration test  | `security-engineer`    | —                   |
| Workflow automation | `devops-engineer`    | `backend-engineer`  |

---

## PHASE DEPENDENCY MATRIX

| Current Phase      | Required Input            | Produces                  |
| ------------------ | ------------------------- | ------------------------- |
| Brainstorm         | User Request              | `BRAINSTORM-{feature}.md` |
| Research           | Request + Brainstorm      | `RESEARCH-{feature}.md`   |
| Scout              | User Request              | `SCOUT-{feature}.md`      |
| Design             | Brainstorm + Scout        | `DESIGN-{feature}.md`     |
| **Planning**       | Scout + Research + Design | `PLAN-{feature}.md`       |
| **Implementation** | **PLAN (MANDATORY)**      | Code changes              |
| **Testing**        | PLAN + Code               | Test results              |
| **Review**         | PLAN + Code + Tests       | Review verdict            |

---

## DELIVERABLE PATHS

```yaml
brainstormer: "./reports/brainstorms/BRAINSTORM-{feature}.md"
researcher: "./reports/researchers/RESEARCH-{feature}.md"
scouter: "./reports/scouts/SCOUT-{feature}.md"
designer: "./reports/designs/DESIGN-{feature}.md"
planner: "./reports/plans/PLAN-{feature}.md"
```

---

## DOCUMENTATION PATHS (from /docs:core)

When `./documents/` exists, agents **read these** for project context:

| File                        | Purpose                          |
| --------------------------- | -------------------------------- |
| `./documents/knowledge-overview.md`     | Project purpose, goals, tech stack   |
| `./documents/knowledge-architecture.md` | System design, components, patterns  |
| `./documents/knowledge-domain.md`       | Data models, API contracts, entities |
| `./documents/knowledge-source-base.md`  | Directory structure, entry points    |
| `./documents/knowledge-standards.md`    | Code style, naming, conventions      |

Business: `./documents/business/*.md`. Audit: `./documents/audit/*.md`.

---

## BLOCKING RULES

```yaml
implementation:
  IF plan_missing:
    action: "BLOCK → Route to planner first"
    message: "⛔ Cannot implement without plan"

testing:
  IF plan_exists:
    action: "MUST verify against plan checkpoints"

review:
  IF plan_exists:
    action: "MUST verify code matches plan intent"
```

---

## TIERED EXECUTION QUICK CHECK

```yaml
TIER_1_SUBAGENT:
  priority: "MANDATORY when tool exists"
  context: "ISOLATED"
  use_when: "runSubagent detected"

TIER_2_EMBODY:
  priority: "FALLBACK only"
  context: "SHARED"
  use_when: "Tool missing OR system error"

decision: 1. Check runSubagent exists
  2. IF yes → MUST use TIER 1
  3. IF error → Fall back TIER 2
  4. IF no tool → Use TIER 2

anti_lazy: ❌ TIER 2 when TIER 1 available
  ❌ "Complexity" as TIER 2 reason
  ❌ Skip Tool Discovery
```

---

## SELF-VERIFICATION

```
□ Did I delegate (not execute)?
□ Did I follow workflow order?
□ Did I respond in user's language?
□ Did I verify exit criteria?
□ Did I use correct tier?
```

---

## NATURAL LANGUAGE DETECTION

| User Says                                      | Detect As     |
| ---------------------------------------------- | ------------- |
| "implement", "build", "create", "add feature"  | `/cook`       |
| "fix", "bug", "error", "broken", "not working" | `/fix`        |
| "plan", "how should", "approach", "strategy"   | `/plan`       |
| "debug", "investigate", "why is", "trace"      | `/debug`      |
| "test", "write tests", "coverage"              | `/test`       |
| "review", "check code", "PR"                   | `/review`     |
| "document", "readme", "api docs"               | `/docs`       |
| "design", "UI", "UX", "mockup"                 | `/design`     |
| "deploy", "release", "production"              | `/deploy`     |
| "brainstorm", "ideas", "explore"               | `/brainstorm` |
