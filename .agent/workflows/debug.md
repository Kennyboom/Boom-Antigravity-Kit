---
description: >-
  Systematic Problem Investigation Engine v3.
  5 Whys root cause, hypothesis-driven debugging,
  regression prevention, log analysis.
---

# /debug — Systematic Problem Investigation v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. REPRODUCE BEFORE FIXING — No fix without repro steps
2. HYPOTHESIZE → TEST → ELIMINATE — Not random guessing
3. ONE CHANGE AT A TIME — Isolate variables
4. ROOT CAUSE, NOT SYMPTOMS — 5 Whys until real cause
5. PREVENT RECURRENCE — Add test/guard after every fix
```

---

## Phase 1: Information Gathering (MANDATORY)

```
Before ANY investigation:

1. EXACT error message (copy-paste, not paraphrase)
2. WHERE it happens (file, line, component, route)
3. WHEN it started (after which deploy/change/update?)
4. FREQUENCY (always? intermittent? specific conditions?)
5. ENVIRONMENT (dev/staging/prod? OS? Node version?)
6. RECENT CHANGES (git log -5, dependency updates?)

Report:
  "🔍 DEBUG SESSION: [Issue Title]
   📍 Location: [file:line]
   ⏰ Started: [when]
   🔄 Frequency: [always/intermittent]
   📝 Error: [exact message]"
```

---

## Phase 2: Reproduce the Issue

```
MANDATORY before fixing:

1. Create MINIMAL reproduction steps:
   Step 1: [action]
   Step 2: [action]
   → Expected: [what should happen]
   → Actual: [what happens instead]

2. Confirm reproduction:
   ✅ Reproduced on attempt 1
   ❌ Cannot reproduce → need more info

IF cannot reproduce → ask user questions, DO NOT guess fix
```

---

## Phase 3: Root Cause Analysis (5 Whys)

```
For EVERY bug, trace to root cause:

WHY 1: Why did [error] happen?
  → Because [direct cause]

WHY 2: Why did [direct cause] happen?
  → Because [deeper cause]

WHY 3: Why did [deeper cause] happen?
  → Because [systemic issue]

WHY 4: Why did [systemic issue] exist?
  → Because [missing guard/test/validation]

WHY 5: Why was [guard] missing?
  → Because [process gap]
  → ROOT CAUSE: [final answer]
```

---

## Phase 4: Hypothesis-Driven Investigation

```
List hypotheses by likelihood:

| # | Hypothesis | Likelihood | Test Method |
|---|-----------|:----------:|------------|
| 1 | [most likely] | HIGH | [how to test] |
| 2 | [second guess] | MEDIUM | [how to test] |
| 3 | [less likely] | LOW | [how to test] |

Test each ONE AT A TIME:

🧪 Testing H1: [hypothesis]
   Action: [what I checked]
   Result: ✅ CONFIRMED / ❌ ELIMINATED
   Evidence: [proof]

→ If CONFIRMED: proceed to Phase 5
→ If ELIMINATED: test next hypothesis
→ If ALL eliminated: re-gather info (Phase 1)
```

---

## Phase 5: Fix Implementation

```
BEFORE FIXING:
□ Root cause identified (Phase 3/4)
□ Impact scope understood (what else might break?)

FIX RULES:
1. Minimal change — fix root cause only
2. No side-effect changes while fixing
3. Preserve existing behavior where correct

FORMAT:
### Root Cause
🎯 [Why it happened — from 5 Whys]

### Fix Applied
// Before (broken)
[exact broken code]

// After (fixed)
[exact fixed code]

### Verification
□ Build passes (0 errors)
□ Original bug no longer reproduces
□ Related features still work
```

---

## Phase 6: Regression Prevention (MANDATORY)

```
After EVERY fix, add prevention:

1. ADD TEST for the specific bug:
   test('[Issue]: should not [reproduce bug]', () => {
     // Exact reproduction steps as test
   });

2. ADD GUARD if applicable:
   - Input validation
   - Type narrowing
   - Null check
   - Error boundary

3. DOCUMENT:
   - What caused it
   - How to avoid in future
   - Related areas to watch

4. SAVE to .brain/session.json → errors_encountered:
   { error, root_cause, fix, prevention }
   WHY: Same bug pattern won't be hit again in new session.

Report:
  "🛡️ REGRESSION PREVENTION:
   ✅ Test added: [test name]
   ✅ Guard added: [description]
   ✅ Error saved to .brain/
   ✅ Build: clean | Lint: clean"
```

---

## Next Steps

```
After /debug, consider:
  → /test [file] — Add regression test for the fix
  → /save — Persist debug findings to .brain/
  → /review health — Check overall code quality
```

---

## Debug Output Template

```markdown
## 🔍 Debug: [Issue Title]

### 1. Symptom
[What's happening + exact error]

### 2. Reproduction
Step 1: [action]
Step 2: [action]
→ Expected: [X] | Actual: [Y]

### 3. Root Cause (5 Whys)
🎯 [Root cause explanation]

### 4. Hypotheses Tested
| # | Hypothesis | Result |
|---|-----------|--------|
| 1 | [hypothesis] | ✅ CONFIRMED |

### 5. Fix
[Before/After code diff]

### 6. Verification
✅ Build: clean
✅ Bug no longer reproduces
✅ Regression test added

### 7. Prevention
🛡️ [What was added to prevent recurrence]
```
