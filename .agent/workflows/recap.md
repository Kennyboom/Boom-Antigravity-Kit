---
description: Restore session context from .brain/ to resume previous work. Smart context loading with progress tracking.
---

# /recap — Context Restoration v2.0

$ARGUMENTS

---

## Phase 1: Load Brain State

```
READ in this order:
1. .brain/session.json → current working state
2. .brain/brain.json → project knowledge
3. .brain/handover.md → if exists, last handover notes
4. docs/specs/ → active specs
5. git log --oneline -5 → recent activity
```

### If .brain/ exists:

```
Parse session.json for:
- working_on (feature, task, status)
- progress (completed, remaining, percentage)
- decisions_made
- blockers
- errors_encountered (unresolved ones)

Parse brain.json for:
- project type and tech stack
- database schema summary
- API endpoint count
- active features list
```

### If .brain/ NOT found:

```
"❌ No saved context found.

Options:
1. /plan — Start planning a new feature
2. /init — Bootstrap a new project
3. Tell me what you're working on"
```

---

## Phase 2: Progress Detection

```
IF plan files exist (docs/specs/phase-*.md):
  Count total phases and completed phases
  Calculate progress percentage
  Identify current phase and next tasks

IF git has recent commits:
  Show last 3 commit messages
  Identify files changed recently
```

---

## Phase 3: Context Report

```
🧠 SESSION RESTORED

📁 Project: [name] ([type])
🏷️ Stack: [framework] + [db] + [hosting]
📊 Status: [planning|coding|testing]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 PROGRESS:
████████░░░░░░░░░░░░ [X]% ([N/M] features)

✅ Completed:
  - [Feature A]
  - [Feature B]

🔄 In Progress:
  - [Feature C] ← YOU ARE HERE

📋 Remaining:
  - [Feature D]
  - [Feature E]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Key Decisions:
  - [Decision 1]
  - [Decision 2]

🚧 Blockers:
  - [Blocker if any]

⚠️ Unresolved Errors:
  - [Error if any]

📂 Recent Changes:
  - [commit 1]
  - [commit 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to continue? Options:
1. Continue [current feature]
2. /next — See recommended next step
3. /create — Start coding
4. /plan — Plan something new
```

---

## Phase 4: Smart Suggestions

Based on restored context, provide targeted advice:

```
IF status == "debugging":
  → "Last session had unresolved errors. Try /debug"

IF status == "coding" AND progress > 80%:
  → "Almost done! Consider /test then /deploy"

IF blockers exist:
  → "Blocker from last session: [X]. Resolved?"

IF handover.md exists:
  → "Handover notes from last session: [summary]"

IF no activity for > 7 days:
  → "It's been a while! Let me re-scan the project..."
  → Run deeper analysis (git log, file scan)
```

---

## Resilience

```
IF session.json is corrupted:
  → Fallback to git log analysis
  → "Session file damaged. Rebuilding from git history..."

IF brain.json is missing but session.json exists:
  → Load session only
  → "Static knowledge missing. Session state loaded."

IF everything is missing:
  → "Fresh start! Use /init or /plan to begin."
```
