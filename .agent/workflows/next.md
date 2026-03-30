---
description: Smart navigator — detect current state and recommend the next workflow. Use when stuck or unsure what to do next.
---

# /next — Smart Navigator v1.0

$ARGUMENTS

---

## Purpose

You're the compass. User is stuck or doesn't know what's next.
Analyze current state and recommend the EXACT next action.

**Rule:** Don't ask questions. Analyze and suggest.

---

## Phase 1: Auto-Detect Current State

```
READ (in priority order):
1. .brain/session.json → working_on, status, pending
2. .brain/brain.json → project type, features
3. docs/specs/ → spec files exist?
4. docs/DESIGN*.md → design docs exist?
5. git status → uncommitted changes?
6. git log --oneline -3 → recent commits
7. Scan for TODO/FIXME in source files
```

---

## Phase 2: Phase Detection

Based on what exists, determine current phase:

```
NO .brain/ AND NO docs/:
  → Phase: EMPTY (nothing started)

.brain/ exists BUT NO docs/specs/:
  → Phase: IDEATION (has context, no plan)

docs/specs/ exists BUT NO DESIGN:
  → Phase: PLANNED (has spec, no design)

DESIGN exists BUT few source files:
  → Phase: DESIGNED (has design, not coded)

Source files exist AND git has recent commits:
  → Phase: CODING (actively developing)

session.json status == "debugging":
  → Phase: DEBUGGING (has errors)

session.json status == "testing":
  → Phase: TESTING (running tests)

All features done AND tests pass:
  → Phase: READY TO DEPLOY
```

---

## Phase 3: Smart Recommendation

### If EMPTY:
```
🧭 Project is empty — nothing started yet.

➡️ Next: /init to bootstrap your project
   Or: /brainstorm if you have a rough idea
   Or: /plan if you know exactly what to build
```

### If IDEATION:
```
🧭 You have context but no formal plan.

➡️ Next: /plan to create detailed specs
   Tip: A good plan prevents 80% of bugs.
```

### If PLANNED:
```
🧭 Specs are ready! No technical design yet.

➡️ Next: /architect to create technical design
   This covers: DB schema, API contracts, state management
```

### If DESIGNED:
```
🧭 Design complete. Time to build!

➡️ Next: /create to start coding
   Your specs and design are ready as input.
```

### If CODING (with progress):
```
🧭 DEVELOPMENT IN PROGRESS

📊 Progress:
████████░░░░░░░░░░░░ [X]% ([N/M] features)

📍 Currently: [feature name] — [task]

➡️ Next:
  1. Continue coding: /create [current feature]
  2. Hit a bug? /debug
  3. Need a break? /save to persist context
  4. Review quality? /review
```

### If DEBUGGING:
```
🧭 You have unresolved errors from last session.

🐛 Error: [description from session.json]

➡️ Next: /debug to investigate
   Tip: Start with the hypothesis from last session.
```

### If READY TO DEPLOY:
```
🧭 All features done! Tests passing!

➡️ Next:
  1. /deep-audit — Final quality check (recommended)
  2. /security-audit — Security review
  3. /deploy — Ship it!
```

---

## Phase 4: Bonus Tips

```
IF uncommitted changes > 5 files:
  → "⚠️ You have [N] uncommitted files. Commit often!"

IF last commit > 2 hours ago:
  → "⚠️ Last commit was [X] ago. Save your work!"

IF TODO count > 3:
  → "📌 [N] TODOs found in code. Clean up before deploy."

IF session is long:
  → "🌙 Long session. Consider /save then fresh /recap."
```

---

## Workflow Chain Reference

```
/init → /brainstorm → /plan → /architect → /create
                                              │
                                    ┌─────────┼──────────┐
                                    ▼         ▼          ▼
                                 /debug    /test    /enhance
                                    │         │          │
                                    └─────────┼──────────┘
                                              ▼
                              /deep-audit → /security-audit
                                              │
                                              ▼
                                   /deploy → /save
                                              │
                                     (new session)
                                              │
                                           /recap
```

**Emergency exit at any point:** `/rollback`

---

## Output Format

```
🧭 WHERE YOU ARE:
[Brief status description]

📊 PROGRESS: [if applicable]
████████░░░░░░░░░░░░ X%

➡️ RECOMMENDED NEXT:
[Specific command with explanation]

💡 TIP:
[Context-specific advice]
```
