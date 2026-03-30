---
description: Restore session context from .brain/ to resume previous work.
---

# /recap - Restore Session Context

Resume previous session by loading context from `.brain/`.

## Steps

1. Read `.brain/session.json`
2. Read any plan/blueprint files referenced
3. Report current state:

```
🧠 Session Restored

📍 Working on: [task description]
📊 Progress: [X/Y] features ([Z]%)

✅ Completed:
- [feature A]
- [feature B]

🔄 In Progress:
- [feature C]

📋 Remaining:
- [feature D]
- [feature E]

📝 Key Decisions:
- [decision 1]
- [decision 2]

🚧 Blockers:
- [blocker if any]

Ready to continue? What should I work on next?
```

## If No Session Found

```
"❌ No session found in .brain/
Start fresh with /plan or /create?"
```

## Usage

```
/recap              — Restore last session
```
