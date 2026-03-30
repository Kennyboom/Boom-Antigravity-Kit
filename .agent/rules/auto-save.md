---
description: Auto-save triggers for .brain/ persistence. AI must know WHEN to save without user explicitly running /save.
---

# Auto-Save Triggers v1.0

> Code changes → Brain changes IMMEDIATELY.
> AI must proactively save context at these trigger points.

---

## Trigger Table

| Trigger | What to Save | File |
|---------|-------------|------|
| Feature completed | Feature status → "done" | brain.json + session.json |
| Workflow completed | Working state, next steps | session.json |
| Error resolved | Error + solution pair | session.json |
| Architecture decision | Decision + reasoning | brain.json |
| New API endpoint | Method, path, auth | brain.json |
| DB schema change | Table + columns | brain.json |
| New dependency added | tech_stack update | brain.json |
| Bug workaround found | gotcha entry | brain.json |
| Context > 80% full | Handover document | handover.md |
| End of work session | Full sync | brain.json + session.json |

---

## .brain/ Structure Summary

```
.brain/
├── brain.json          ← Static knowledge (rarely changes)
│   Project, tech_stack, database_schema,
│   api_endpoints, features, knowledge_items
│
├── session.json        ← Dynamic state (changes often)
│   working_on, progress, decisions,
│   blockers, errors, recent_changes
│
├── preferences.json    ← User preferences (set once)
│   communication tone, detail level,
│   autonomy, quality standard, pace
│
└── handover.md         ← Auto-generated when context is full
    Current task, completed items, remaining,
    key decisions, important files
```

---

## Brain vs Session Decision

```
WHEN something changes, decide WHERE to save:

BRAIN.JSON (static, rarely updated):
  → Tech stack changed? → brain.json
  → New DB table? → brain.json
  → New API route? → brain.json
  → Architecture decision? → brain.json
  → Pattern discovered? → brain.json

SESSION.JSON (dynamic, frequently updated):
  → Currently working on? → session.json
  → Progress update? → session.json
  → Bug fixed? → session.json
  → Task blocked? → session.json
  → Decision made during coding? → session.json

BOTH (end of day / major milestone):
  → Full sync before ending session
```

---

## Proactive Handover Trigger

```
IF conversation is long (50+ messages) OR
   context feels saturated OR
   switching to complex new topic:

1. Auto-generate .brain/handover.md
2. Update session.json with current state
3. Notify user: "Context getting heavy.
   Progress saved. Consider /recap in fresh session."
```

---

## .gitignore Recommendation

```
# Brain context
.brain/session.json      ← Personal, don't share
.brain/handover.md       ← Temporary
.brain/preferences.json  ← Personal
# Keep brain.json in git for team sharing
```
