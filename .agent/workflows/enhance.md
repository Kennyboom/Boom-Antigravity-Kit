---
description: >-
  Feature Enhancement Engine v3 — Add or update features in
  existing apps with Feature Discovery Lite, Anti-Skip Lite,
  Impact Analysis, and Build-Verify Loop.
---

# /enhance — Feature Enhancement Engine v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. UNDERSTAND BEFORE CHANGING — Read existing code first
2. IMPACT ANALYSIS — Know what your change affects
3. ONE FEATURE AT A TIME — No parallel changes
4. BUILD-VERIFY AFTER EACH — No broken intermediate states
5. NO SCOPE CREEP — Only what was requested
```

---

## Phase 1: Understand Current State

```
MANDATORY before any change:

1. Load project state:
   □ Read package.json → tech stack, scripts
   □ Read project structure → modules, patterns
   □ Read .brain/ → session context

2. Identify existing patterns:
   □ Component structure (hooks, services, utils)
   □ State management (zustand, context, redux)
   □ API patterns (fetch, axios, tRPC)
   □ Styling approach (CSS modules, Tailwind, styled)

Report:
  "📍 PROJECT STATE:
   Stack: [framework + key deps]
   Files: [X] source | Patterns: [component style]
   Last change: [recent git log]"
```

---

## Phase 2: Feature Discovery Lite

```
Even for "small" changes, discover hidden work:

1. WHAT is requested? (explicit feature)
2. WHAT ELSE does it touch? (implicit features)
   □ Does it need new UI states? (loading/error/empty)
   □ Does it need new API endpoint?
   □ Does it need database changes?
   □ Does it need auth/permission checks?
   □ Does it need mobile responsiveness?
   □ Does it affect existing features?

Example: "Add search feature"
  Explicit: Search input + results
  Hidden: Debounce, empty state, error state,
          mobile layout, keyboard nav,
          clear button, search history,
          URL query params, loading skeleton
```

---

## Phase 3: Impact Analysis (MANDATORY for > 3 files)

```
| # | File Affected | Change Type | Risk | Dependencies |
|---|--------------|:-----------:|:----:|-------------|
| 1 | [file] | NEW | LOW | none |
| 2 | [file] | MODIFY | MED | [file1, file2] |
| 3 | [file] | MODIFY | HIGH | [critical path] |

Risk levels:
  LOW  → New file, isolated component
  MED  → Modifying shared component
  HIGH → Modifying core logic, auth, DB schema

IF any HIGH risk → present to user before proceeding
```

---

## Phase 4: Blueprint Lite

```markdown
| # | Change | File(s) | Action | Lines Est | Status |
|---|--------|---------|--------|:---------:|:------:|
| 1 | [feature part 1] | [file] | NEW | ~50 | ☐ |
| 2 | [feature part 2] | [file] | MODIFY | ~30 | ☐ |
| 3 | [error handling] | [file] | MODIFY | ~20 | ☐ |
| 4 | [loading state] | [file] | MODIFY | ~15 | ☐ |
| 5 | [responsive] | [file] | MODIFY | ~10 | ☐ |

Total estimated: ~125 lines across 3 files
```

> For major changes (> 5 files), present Blueprint to user first.

---

## Phase 5: Implement (Anti-Skip Lite)

```
CODING RULES:
1. One change at a time (follow Blueprint order)
2. Build-verify after EACH file:
   □ npm run build → 0 errors
   □ npm run lint → 0 warnings
3. Update Blueprint: ☐ → ✅
4. 5 UI States for new components
5. Try-catch for all async/API calls

PROGRESS REPORT (every 3 items):
  "📊 PROGRESS: {completed}/{total} ({percent}%)
   ✅ Build: clean | Lint: clean"
```

---

## Phase 6: Verification

```
ENHANCEMENT AUDIT:

□ All Blueprint items checked ✅
□ Build passes (0 errors)
□ Lint passes (0 warnings)
□ New UI components have 5 states
□ New API calls have try-catch
□ Responsive on mobile (if UI change)
□ Existing features not broken
□ No TODO/FIXME left behind
```

---

## Phase 7: Report

```
"✅ ENHANCEMENT COMPLETE

Changes:
| # | Change | Status |
|---|--------|:------:|
| 1 | [change] | ✅ |
| 2 | [change] | ✅ |

Quality:
  ✅ Build: clean
  ✅ Lint: clean
  ✅ All states handled
  ✅ Error handling complete

Files changed: [X] | Lines added: ~[Y]"
```
