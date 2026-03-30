---
description: Save session context to .brain/ for cross-session continuity.
---

# /save - Save Session Context

Save current session state for resuming in future conversations.

## What Gets Saved

Creates `.brain/session.json` with:

```json
{
  "timestamp": "[ISO date]",
  "working_on": "[current task description]",
  "progress": {
    "completed": ["feature A", "feature B"],
    "in_progress": ["feature C"],
    "remaining": ["feature D", "feature E"]
  },
  "blueprint_state": {
    "total_features": 12,
    "completed": 5,
    "percentage": "42%"
  },
  "decisions": [
    "Chose Zustand over Redux for state",
    "Using Neon Postgres for database"
  ],
  "blockers": [
    "API endpoint X not ready"
  ],
  "files_modified": [
    "src/components/Dashboard.tsx",
    "src/lib/api.ts"
  ]
}
```

## Steps

1. Create `.brain/` directory if not exists
2. Collect session context from conversation
3. Write `session.json` with structure above
4. Confirm: `"✅ Session saved to .brain/session.json"`

## Usage

```
/save              — Save current session
/save [note]       — Save with additional note
```
