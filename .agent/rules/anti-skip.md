# Anti-Skip Protocol v2.0

> Prevents feature omission during implementation.
> MANDATORY for `/create`, `/enhance`, and `/orchestrate`.

---

## 1. Feature Counting Guard

Before writing any code, verify counts match:

```
spec_features = Count features in spec/plan
blueprint_items = Count items in Code Blueprint

IF spec_features ≠ blueprint_items → STOP → review gaps
IF spec_features == blueprint_items → proceed

RECOUNTING TRIGGER:
After every 5 features coded → recount.
After any plan change → recount.
```

---

## 2. Seven-Layer Feature Analysis

### Core Layers (ALWAYS apply to every feature)

| Layer | Check |
|-------|-------|
| 🎨 UI Layout | Grid/Flex, columns, spacing, responsive |
| ⚙️ Core Logic | Business rules, algorithms, data flow |
| 🛡️ Error Handling | Try-catch, error messages, retry, fallback |
| 🧪 Edge Cases | Unusual input, limits, concurrent access |

### Extended Layers (apply when conditions met)

| Layer | Apply When |
|-------|------------|
| 📱 Responsive | UI exists |
| 🔐 Security | Input/API exists |
| ♿ Accessibility | UI exists |
| 🚀 Performance | Large datasets exist |

---

## 3. Progressive Verification

```
After every 3-5 features → STOP → cross-check Blueprint:
- Are all completed items marked ☑?
- Are remaining items still valid?
- Any missing features discovered during coding?
- Any scope changes from user?

IF missing features found → add to Blueprint → code them
IF scope changed → update Blueprint → recount
```

---

## 4. Build-Verify Loop (after EACH feature)

```
After completing EACH feature:
1. Run `npm run build` → MUST pass (0 errors)
2. Run `npm run lint` → MUST pass (0 warnings)
3. Run `npx tsc --noEmit` → MUST pass (0 type errors)
4. Update Blueprint: ☐ → ☑
5. Report progress: "📊 X/Y features (Z%)"

IF build FAILS → fix IMMEDIATELY before next feature
IF lint FAILS → fix IMMEDIATELY before next feature
IF types FAIL → fix IMMEDIATELY before next feature
```

> 🔴 NEVER proceed to next feature with broken build.

---

## 5. Context Isolation Protocol

```
PROBLEM: AI forgets features when context exceeds 80%.
SOLUTION: Explicit context management.

RULES:
- Load max 50-100KB of source code per session
- After every 5 files written → save progress to .brain/
- Before loading new files → unload finished ones mentally
- Keep Blueprint visible at all times (re-read if unsure)

IF context feels heavy:
  1. Save current progress: /save
  2. Report what is done and what remains
  3. Resume in new session: /recap
```

---

## 6. File Size Discipline

```
AFTER writing each file, verify:
□ Total lines ≤ 300 → OK
□ Total lines > 300 → SPLIT into separate files
□ Any function > 25 lines → EXTRACT sub-functions
□ Nesting > 3 levels → USE early return / guard clauses
□ Params > 4 → USE object/config pattern

SPLIT STRATEGY (when file exceeds 300 lines):
- Extract types/interfaces → types.ts
- Extract constants → constants.ts
- Extract utilities → utils.ts
- Extract sub-components → separate .tsx files
- Extract hooks → hooks/ directory
```

---

## 7. No-TODO Protocol

```
FORBIDDEN patterns in code:
❌ "// TODO: implement later"
❌ "// FIXME: add error handling"
❌ "// HACK: temporary solution"
❌ Placeholder functions that return empty/mock data
❌ Commented-out code blocks

INSTEAD:
✅ Implement fully or do not start the feature
✅ If blocked → ask user → document decision
✅ If complex → break into smaller sub-features
```

---

## 8. Completion Gate

Before marking any task complete, ALL must pass:

```
□ All Blueprint items checked ☑
□ Feature count matches spec (recount)
□ Build passes with 0 errors
□ Lint passes with 0 warnings
□ TypeScript passes with 0 type errors
□ All 5 UI States implemented (see rules/5-ui-states.md)
□ All API calls have error handling
□ All files ≤ 300 lines
□ No TODO/FIXME/HACK comments
□ Progress saved to .brain/
```

> If ANY check fails → fix before handover.
