# Code Discipline Rules

> Enforces production-quality code standards.
> MANDATORY for ALL implementation workflows.

---

## 1. File Size Limits (HARD LIMITS)

| Rule | Limit | Action When Violated |
|------|:-----:|---------------------|
| File length | ≤ 300 lines | MUST split by responsibility |
| Function length | ≤ 25 lines | MUST extract sub-functions (JSX render tolerates longer but prefer sub-components) |
| Line width | ≤ 100 chars | MUST wrap (except URL/SVG inline) |
| Nesting depth | ≤ 3 levels | MUST use early return / guards |
| Function params | ≤ 4 params | MUST use object/config pattern |
| Cyclomatic complexity | ≤ 10 | MUST split logic into helpers |
| useState per component | ≤ 3 separate | MUST use useReducer / custom hook / object state |

---

## 2. File Organization

```
Each file MUST contain exactly 1 responsibility:

- 1 component = 1 file (+ .styles + .test + index)
- 1 service = 1 file (≤ 200 lines)
- 1 utility module = 1 file (≤ 150 lines)
- Constants/types go in separate files
- Hooks in hooks/ directory
```

### Split Strategy (when file exceeds limit)

```
component.tsx (350 lines) → SPLIT INTO:
├── component.tsx (main render, ≤ 150 lines)
├── component.hooks.ts (custom hooks, ≤ 100 lines)
├── component.utils.ts (helper functions, ≤ 100 lines)
├── component.types.ts (interfaces/types, ≤ 50 lines)
└── component.constants.ts (magic numbers, ≤ 30 lines)
```

---

## 3. Function Pattern

```
Every function MUST follow this structure:

1. Guard clauses FIRST (validate + early return)
2. Main logic IN THE MIDDLE
3. Return/cleanup AT THE END
4. NO nested if/else beyond 3 levels
5. JSDoc/TSDoc REQUIRED for every public function

Example mental model:
  function doThing(input) {
    // 1. Guards
    if (!input) return fallback;
    if (!isValid(input)) throw error;

    // 2. Main logic
    const processed = transform(input);
    const result = compute(processed);

    // 3. Return
    return result;
  }
```

---

## 4. Naming Rules

| Context | Convention | Examples |
|---------|-----------|----------|
| Variables | noun | userCount, isActive, maxRetries |
| Functions | verb | fetchUser, calculateTotal, validateEmail |
| Constants | SCREAMING_CASE | MAX_RETRY_COUNT, API_BASE_URL |
| Booleans | is/has/can prefix | isReady, hasPermission, canEdit |
| Components | PascalCase | UserCard, SettingsPanel |
| Files | kebab-case | user-card.tsx, settings-panel.tsx |

**FORBIDDEN names:** data, temp, result, item, thing, x, val, res, ret, obj

---

## 5. Error Handling

```
EVERY async/API call MUST have:
1. try/catch block
2. Specific error type (not generic Error)
3. User-facing error message
4. Logging for debugging
5. Recovery strategy (retry, fallback, redirect)

FORBIDDEN:
❌ catch(e) {} — empty catch (swallowing errors)
❌ catch(e) { console.log(e) } — log and forget
❌ // no try-catch at all
❌ console.log() anywhere — use proper logger only
```

---

## 6. Import Organization

```
Imports MUST be ordered:
1. External libraries (react, next, etc.)
2. Internal modules (@/lib, @/services)
3. Relative imports (./component, ../utils)
4. Type imports (import type { ... })

REMOVE all unused imports before completion.
```

---

## 7. No Magic Numbers

```
Every literal number/string MUST be a named constant:

❌ if (retries > 3) ...
✅ const MAX_RETRY_COUNT = 3;
   if (retries > MAX_RETRY_COUNT) ...

❌ setTimeout(fn, 5000)
✅ const DEBOUNCE_DELAY_MS = 5000;
   setTimeout(fn, DEBOUNCE_DELAY_MS)
```

---

## 8. DRY Enforcement

```
If code pattern appears 3+ times:
→ MUST extract into shared function/component/hook

Check for duplication:
□ Similar API call patterns → create service layer
□ Similar form validation → create validation utils
□ Similar UI patterns → create reusable component
□ Similar error handling → create error boundary/hook
```

---

## 9. Deliverable Size Management

```
IF output > 150 lines OR has ≥ 4 major sections:
  → SPLIT into folder with 00-index.md

  folder-name/
  ├── 00-index.md         ← Overview + table of contents
  ├── 01-section-name.md  ← Section 1 (80-150 lines max)
  ├── 02-section-name.md  ← Section 2
  └── 03-section-name.md  ← Section 3

RULES:
  □ NEVER create a single file > 200 lines
  □ NEVER create multiple files in parallel
  □ ALWAYS create 00-index.md FIRST
  □ Each section file: target 80-150 lines
```

---

## 10. TypeScript Strictness

```
MUST have specific types for everything:
❌ any — FORBIDDEN everywhere
❌ @ts-ignore — FORBIDDEN (unless mandatory + comment why)
❌ @ts-expect-error — FORBIDDEN (unless mandatory + comment why)
✅ Use generics, union types, or unknown + type guards
```

---

## 11. Pure vs Impure Separation

```
Core business logic MUST be Pure Functions:
  - Input → Output, zero side-effects
  - No API calls, no DB, no global state mutation
  - Easy to test, easy to reason about

Impure functions (fetch, DB, global state) MUST:
  - Live in separate service/hook files
  - Never mix with pure computation logic
```

---

## 12. No console.log

```
console.log is FORBIDDEN in production code.
Use proper structured logger only:
  ✅ logger.debug() — dev diagnostics
  ✅ logger.info()  — operational events
  ✅ logger.warn()  — recoverable issues
  ✅ logger.error() — failures requiring attention
```

---

## Pre-commit Checklist

```
Before completing ANY file:
□ File ≤ 300 lines?
□ All functions ≤ 25 lines?
□ Cyclomatic complexity ≤ 10?
□ Nesting ≤ 3 levels?
□ No magic numbers?
□ No unused imports?
□ No TODO/FIXME/HACK comments?
□ Error handling on all async calls?
□ Types defined (no any, no @ts-ignore)?
□ No console.log?
□ Pure/Impure properly separated?
□ JSDoc on public functions?
□ useState ≤ 3 per component?
□ Named exports (not default)?
```
