---
description: >-
  Project Intelligence Scanner v2 — Full project review with
  code quality scoring, architecture assessment, tech debt
  quantification, and upgrade recommendations.
---

# /review — Project Intelligence Scanner v2.0

$ARGUMENTS

---

## Sub-commands

```
/review              - Full project review
/review health       - Quick code health score
/review handover     - Generate handover document
/review upgrade      - Dependency upgrade plan
```

---

## Phase 1: Purpose Selection

```
"🔍 What is the review for?

1️⃣ Self-review — Forgot where I left off
2️⃣ Handover — Transfer to another person
3️⃣ Health check — Find code problems
4️⃣ Upgrade plan — Ready for new features
5️⃣ Full Review — All of the above"
```

---

## Phase 2: Auto-Scan (Automatic)

```
AI automatically scans:

□ Directory structure (3 levels)
□ package.json: stack, scripts, dependencies
□ README.md, docs/ (documentation)
□ .brain/ (session context)
□ Git log (5 recent commits, contributors)
□ Test files: count, coverage
□ Lint config: ESLint/Prettier present?
□ TypeScript config: strict mode?
□ Build: npm run build → pass/fail?
□ .env.example: env vars documented?
```

---

## Phase 3: Code Quality Scoring

```markdown
📊 CODE HEALTH SCORE:

| Metric | Score | Target | Status |
|--------|:-----:|:------:|:------:|
| Build | ✅/❌ | Pass | |
| Lint warnings | [N] | 0 | ✅/⚠️ |
| TypeScript | [mode] | strict | ✅/⚠️ |
| Test coverage | [X]% | 80% | ✅/⚠️ |
| Dependencies | [N] | Updated | ✅/⚠️ |
| Security audit | [N] | 0 crit | ✅/⚠️ |
| Documentation | [X/5] | 4+ | ✅/⚠️ |
| Code complexity | [X/5] | 3- | ✅/⚠️ |

🏆 OVERALL: [N]/100
  90-100: EXCELLENT
  70-89: GOOD
  50-69: NEEDS WORK
  < 50: CRITICAL
```

---

## Phase 4: Architecture Review

```
INSPECT:
□ Folder structure: by feature or by type?
□ Separation of concerns: UI / Logic / Data
□ SOLID principles compliance
□ Component coupling: High (bad) / Low (good)
□ Code duplication: DRY violations
□ Error handling: consistent patterns?
□ State management: clear strategy?
□ API design: consistent, versioned?

Report:
  "🏗️ ARCHITECTURE:
   Pattern: [MVC / Clean / Feature-based]
   Coupling: [Low ✅ / Medium ⚠️ / High ❌]
   Separation: [Good ✅ / Mixed ⚠️ / Poor ❌]
   Scalability: [Ready ✅ / Needs work ⚠️]"
```

---

## Phase 5: Tech Debt Assessment

```markdown
💰 TECH DEBT:

TRACKED (known):
□ TODO/FIXME/HACK comments: [N] items
□ Skipped tests: [N]
□ Known bugs: [N]
□ Deprecated dependencies: [N]

UNTRACKED (discovered):
□ [Issue 1] — Impact: HIGH — Fix effort: [hours]
□ [Issue 2] — Impact: MED — Fix effort: [hours]
□ [Issue 3] — Impact: LOW — Fix effort: [hours]

DEBT-TO-FEATURE RATIO:
  [N]% code needs refactor before new features
  Recommendation: [Clean first / OK to continue / Red flag]
```

---

## Phase 6: Report Templates

### Self-Review / Handover Report
```markdown
# 📊 PROJECT REPORT: [Name]

## 🎯 What it does: [2-3 sentences]
## 🛠️ Tech stack: [Framework / DB / Deploy]
## 🚀 How to run: [commands]
## 📍 Current state: [feature / task in progress]
## 📝 Key files: [table of important files]
## ⚠️ Gotchas: [things to watch out for]
```

### Health Assessment Report
```markdown
# 🏥 CODE HEALTH: [Name]

## 📊 Score: [N]/100
## ✅ Strengths: [good points]
## ⚠️ Needs improvement:
| Issue | Priority | Fix | Effort |
## 💰 Tech Debt: [N tracked + M untracked]
## 🏗️ Architecture: [pattern, coupling, scaling]
## 🔧 Top 3 Action Items
```

### Upgrade Plan Report
```markdown
# 🚀 UPGRADE PLAN: [Name]

## 📍 Current state
## ⬆️ Dependencies to update
| Package | Current | Latest | Risk |
## 🆕 Possible features (based on architecture)
## 🔧 Refactoring needed (prioritized)
## ⚠️ Upgrade risks
```

---

## Phase 7: Handover

```
"📋 REVIEW COMPLETE!

📍 File: docs/PROJECT_REVIEW_[date].md
📊 Score: [N]/100
💰 Tech Debt: [X] tracked + [Y] untracked
🏗️ Architecture: [verdict]

Next:
1. Fix issues? /refactor or /debug
2. Add features? /plan
3. Save context? /save
4. Code? /create"
```
