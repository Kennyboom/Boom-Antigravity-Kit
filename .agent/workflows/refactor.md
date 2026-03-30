---
description: >-
  Code Surgeon v3 — SOLID audit, code smell detection,
  Fowler's catalog techniques, health scoring, performance-safe
  refactoring with before/after metrics.
---

# /refactor — The Code Surgeon v3.0

$ARGUMENTS

---

## IRON RULE

> ⚡ Refactoring MUST NOT reduce performance.
> ONLY maintain or improve. Any regression → ROLLBACK.

---

## GOLDEN RULES

```
1. PERFORMANCE IS SACRED — Never trade speed for readability
2. MEASURE BEFORE SURGERY — No refactor without metrics
3. LOGIC UNCHANGED — Only change STRUCTURE, not BEHAVIOR
4. MICRO-STEPS — 1 refactoring = 1 commit, test each step
5. BEFORE/AFTER — Compare metrics and performance
6. SAFETY FIRST — Backup, test baseline, rollback plan
```

---

## Phase 1: Auto-Scope + Mode Selection

```
1. Scan source code → count files, functions, components
2. Run lint + build → current health status
3. Read recent git log → context

Report:
  "🔪 Found:
   [X] source files | [Y] functions
   [Z] lint warnings | Build: [pass/fail]

   Choose mode:"

MODES:
  A) ⚡ Quick Surgery (1 file)
  B) 🔍 Deep Surgery (1 module)
  C) 🏥 Full Body Scan (full project)
```

---

## Phase 2: Code Health X-Ray

```
MEASURE EVERYTHING before touching code:

| Metric | Current | Target | Tool |
|--------|:-------:|:------:|------|
| Complexity | [X] | < 10 | ESLint rule |
| Nesting depth | [X] | ≤ 3 | Manual |
| Lines/function | [X] | ≤ 25 | Manual |
| Lines/file | [X] | ≤ 300 | wc -l |
| Lint warnings | [X] | 0 | ESLint |
| Build status | [X] | Pass | npm build |

CODE HEALTH SCORE: [N]/100
  90-100: 🟢 Healthy
  70-89:  🟡 Needs attention
  50-69:  🟠 Significant debt
  < 50:   🔴 Critical — refactor before features
```

---

## Phase 3: Code Smell Detection (Fowler's Catalog)

```
SCAN for 5 smell categories:

🐘 BLOATERS:
  □ Long Method (> 25 lines)
  □ Large Class (> 300 lines)
  □ Long Parameter List (> 4 params)
  □ Primitive Obsession

🔨 OO ABUSERS:
  □ Switch Statements (should be polymorphism?)
  □ Temporary Field
  □ Refused Bequest

🚧 CHANGE PREVENTERS:
  □ Divergent Change (1 class, many reasons to change)
  □ Shotgun Surgery (1 change, many classes affected)

🗑️ DISPENSABLES:
  □ Dead Code (unused functions/imports)
  □ Duplicate Code (3+ occurrences)
  □ Lazy Class (does almost nothing)
  □ Comments explaining bad code

🔗 COUPLERS:
  □ Feature Envy (method uses other class more)
  □ Inappropriate Intimacy (classes too intertwined)

Report per smell:
  "🐟 SMELLS FOUND: [N] total
   🔴 Critical: [list]
   🟡 Should fix: [list]
   🟢 Minor: [list]"
```

---

## Phase 4: SOLID Principles Audit

```
| Principle | Score | Violations |
|-----------|:-----:|-----------|
| S - Single Responsibility | [/10] | [files doing 2+ things] |
| O - Open/Closed | [/10] | [needs modification to extend] |
| L - Liskov Substitution | [/10] | [subtype behavior breaks] |
| I - Interface Segregation | [/10] | [fat interfaces] |
| D - Dependency Inversion | [/10] | [hardcoded dependencies] |

SOLID SCORE: [/50]
```

---

## Phase 5: Safety Protocol (MANDATORY)

```
BEFORE any refactoring:

1. BRANCH: git checkout -b refactor/[scope]-[date]
2. TEST BASELINE: run tests → record pass/fail count
3. PERFORMANCE BASELINE: measure execution time
4. LINT BASELINE: record warning count
5. ROLLBACK PLAN: git checkout main
6. COMMIT STRATEGY: 1 refactoring = 1 commit

⚠️ DO NOT proceed until 6/6 complete.
```

---

## Phase 6: Precision Surgery (Execution)

```
For EACH refactoring:

1. ANNOUNCE — what technique, which file
2. SHOW BEFORE — code before change
3. EXECUTE — apply Fowler technique
4. SHOW AFTER — code after change
5. EXPLAIN — why this improves health
6. VERIFY — tests pass? lint clean? build OK?
7. PERFORMANCE CHECK — benchmark ≥ baseline?
   IF slower → 🛑 ROLLBACK IMMEDIATELY
8. COMMIT — git add + commit

TECHNIQUES (use official names):
  - Extract Method
  - Inline Method
  - Move Method
  - Replace Conditional with Polymorphism
  - Introduce Parameter Object
  - Replace Magic Number with Constant
  - Extract Class
  - Replace Temp with Query
```

---

## Phase 7: Before/After Report

```markdown
## 🔪 REFACTOR REPORT

### Metrics
| Metric | Before | After | Change |
|--------|:------:|:-----:|:------:|
| Health Score | [X] | [Y] | +[Z]% |
| Lint warnings | [X] | [Y] | -[Z] |
| Code smells | [X] | [Y] | -[Z] |
| SOLID score | [X/50] | [Y/50] | +[Z] |
| Performance | [X]ms | [Y]ms | [Z]% |

### Techniques Applied
| # | Technique | File | Impact |
|---|----------|------|--------|
| 1 | [name] | [file] | [improvement] |

### Verdict
🏆 [IMPROVED / MAINTAINED / NEEDS MORE WORK]
```

---

## Guard Rails

```
⚠️ REFACTOR ≠ REWRITE:
  Changing > 60% code → STOP → /architect first

⚠️ REFACTOR ≠ FEATURE:
  Adding new logic → STOP → /create instead

🔴 PERFORMANCE SACRED:
  Any slowdown → ROLLBACK → find another approach
```
