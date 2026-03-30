---
description: Bootstrap a new project. Set up folder structure, git, .brain/, and initial configuration.
---

# /init — Project Bootstrap v1.0

$ARGUMENTS

---

## Phase 1: Project Discovery

```
ASK (only what's needed):

1. "What are you building?"
   → Web app | Mobile app | Desktop app | API | CLI tool

2. "Tech preferences?"
   → Or let me recommend based on project type

3. "Project name?"
   → Will be used for folder and package.json
```

### Auto-Recommendations by Type

| Type | Framework | DB | Styling | Hosting |
|------|-----------|-----|---------|---------|
| Web App | Next.js | PostgreSQL | Tailwind | Vercel |
| Mobile | React Native/Expo | SQLite | NativeWind | EAS |
| Desktop | Tauri + React | SQLite | Tailwind | — |
| API | Fastify/Express | PostgreSQL | — | Railway |
| CLI | Node.js | — | — | npm |

---

## Phase 2: Project Scaffolding

```
CREATE project structure:

project-name/
├── .agent/              ← AG-Kit (copy from template)
│   └── ARCHITECTURE.md
├── .brain/              ← Session persistence
│   ├── brain.json       ← Static knowledge (populated)
│   └── session.json     ← Dynamic state (initialized)
├── docs/                ← Documentation home
│   ├── specs/           ← Feature specifications
│   └── BRIEF.md         ← Project brief (from user input)
├── src/                 ← Source code
│   ├── components/      ← UI components
│   ├── services/        ← Business logic
│   ├── hooks/           ← Custom hooks
│   ├── types/           ← TypeScript types
│   ├── utils/           ← Utility functions
│   └── constants/       ← Named constants
├── .env.example         ← Environment template
├── .gitignore           ← Standard ignores
├── package.json         ← Dependencies
├── tsconfig.json        ← TypeScript config
└── README.md            ← Project overview
```

---

## Phase 3: Initialize Tooling

```
SETUP (based on project type):

□ Git: git init + initial commit
□ TypeScript: strict mode enabled
□ ESLint: consistent code style
□ Prettier: format on save
□ .env.example: with placeholder values

INSTALL core dependencies:
□ Framework (Next.js / Express / etc.)
□ TypeScript + @types
□ ESLint + Prettier configs
□ Testing framework (Vitest / Jest)
```

---

## Phase 4: Initialize .brain/

Create `.brain/brain.json`:
```json
{
  "meta": { "schema_version": "1.0.0" },
  "project": {
    "name": "[project-name]",
    "type": "[web|mobile|desktop|api|cli]",
    "status": "development"
  },
  "tech_stack": {
    "frontend": { "framework": "[chosen]" },
    "backend": { "runtime": "Node.js" },
    "database": { "type": "[chosen]" }
  },
  "features": [],
  "knowledge_items": { "patterns": [], "gotchas": [] }
}
```

Create `.brain/session.json`:
```json
{
  "timestamp": "[now]",
  "working_on": { "feature": "Project Setup", "status": "coding" },
  "progress": { "completed": [], "remaining": ["Plan features"] }
}
```

---

## Phase 5: Create BRIEF.md

```markdown
# Project Brief: [Name]

## What
[One-line description]

## Why
[Problem being solved]

## Who
[Target users]

## Tech Stack
- Frontend: [framework]
- Backend: [runtime + framework]
- Database: [type + provider]
- Hosting: [platform]

## MVP Scope
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

## Non-Goals (explicitly out of scope)
- [Thing we're NOT building]
```

---

## Phase 6: Verification + Handover

```
VERIFY:
□ npm install → no errors?
□ npm run dev → server starts?
□ TypeScript compiles (tsc --noEmit)?
□ Git initialized with first commit?
□ .brain/ populated?

OUTPUT:
"✅ PROJECT INITIALIZED!

📁 [project-name]/ is ready
🏷️ Stack: [framework] + [db] + [hosting]
📝 Brief: docs/BRIEF.md

Next steps:
1. /plan — Define features and specs
2. /brainstorm — Explore ideas first
3. Start coding directly"
```
