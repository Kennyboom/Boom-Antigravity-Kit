---
description: Save project knowledge and session state to .brain/ for cross-session continuity. Run after major features, end of day, or before long breaks.
---

# /save — Infinite Memory Keeper v2.0

$ARGUMENTS

---

## Purpose

Combat AI context drift. Every session generates knowledge
that MUST be persisted or it's lost forever.

**Rule:** Code changes → Brain changes IMMEDIATELY.

---

## Phase 1: Change Analysis (Auto-Detect)

```
SCAN for changes since last save:
1. git diff --stat (files modified)
2. git log --oneline -5 (recent commits)
3. Read .brain/session.json (last known state)

CLASSIFY each change:
  MAJOR (update brain.json):
    → New module/service added
    → Database schema changed
    → New API endpoint created
    → New dependency installed
    → Architecture decision made

  MINOR (update session.json only):
    → Bug fix
    → Refactor (no behavior change)
    → Style/UI tweak
```

---

## Phase 2: Update brain.json (Static Knowledge)

File: `.brain/brain.json`

```json
{
  "meta": {
    "schema_version": "1.0.0",
    "last_updated": "ISO-date",
    "project_version": "0.1.0"
  },
  "project": {
    "name": "project-name",
    "type": "web|mobile|desktop|api|cli",
    "status": "planning|development|testing|production"
  },
  "tech_stack": {
    "frontend": { "framework": "", "styling": "", "state": "" },
    "backend": { "runtime": "", "framework": "", "orm": "" },
    "database": { "type": "", "provider": "" },
    "hosting": { "platform": "", "ci_cd": "" }
  },
  "database_schema": {
    "tables": [
      { "name": "", "columns": [], "indexes": [], "relations": [] }
    ]
  },
  "api_endpoints": [
    { "method": "", "path": "", "auth": "", "description": "" }
  ],
  "business_rules": [
    "Rule 1: description"
  ],
  "features": [
    { "name": "", "status": "planned|in-progress|done", "phase": "" }
  ],
  "knowledge_items": {
    "patterns": ["Pattern used and why"],
    "gotchas": ["Known issues and workarounds"],
    "conventions": ["Naming/structure conventions"]
  }
}
```

### Update Rules

| Trigger | What to Update |
|---------|---------------|
| New API endpoint | api_endpoints[] |
| DB table change | database_schema.tables[] |
| New dependency | tech_stack.* |
| Feature completed | features[].status → "done" |
| Architecture decision | knowledge_items.patterns[] |
| Bug workaround found | knowledge_items.gotchas[] |

---

## Phase 3: Update session.json (Dynamic State)

File: `.brain/session.json`

```json
{
  "timestamp": "ISO-date",
  "working_on": {
    "feature": "Feature name",
    "task": "Current specific task",
    "status": "planning|coding|testing|debugging",
    "files": ["files currently being edited"],
    "notes": "Important context"
  },
  "progress": {
    "completed": ["Feature A", "Feature B"],
    "in_progress": ["Feature C"],
    "remaining": ["Feature D", "Feature E"],
    "percentage": "42%"
  },
  "decisions_made": [
    "Chose Zustand over Redux for state management"
  ],
  "blockers": [
    "External API endpoint not ready"
  ],
  "errors_encountered": [
    { "error": "description", "resolved": true, "fix": "how" }
  ],
  "recent_changes": [
    { "file": "path", "change": "description", "commit": "hash" }
  ]
}
```

---

## Phase 4: Proactive Handover Detection

```
IF conversation is getting long (50+ messages) OR
   context feels saturated:

1. GENERATE handover summary:
   "📋 HANDOVER DOCUMENT
    📍 Working on: [feature]
    🔢 Phase: [X], Task: [Y]
    ✅ Done: [list]
    ⏳ Remaining: [list]
    🔧 Key Decisions: [list]
    ⚠️ Watch out: [warnings]
    📁 Key Files: [list]"

2. SAVE to .brain/handover.md
3. RECOMMEND: "Context heavy. Consider /recap
   in a fresh session for peak precision."
```

---

## Phase 5: Confirmation

```
✅ BRAIN SAVED!

📊 Stats:
  brain.json: [X] tables, [Y] APIs, [Z] features
  session.json: [N] pending tasks, [M]% complete

📁 Files updated:
  .brain/brain.json ← static knowledge
  .brain/session.json ← current progress

💡 Tomorrow: /recap to restore context
```

---

## Best Practices

```
SAVE after:
□ Completing a major feature
□ Making an architecture decision
□ End of work session
□ Before a long break
□ After resolving a tricky bug (save the gotcha!)
```
