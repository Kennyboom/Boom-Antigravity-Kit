# Anti-Skip Protocol

> Prevents feature omission during implementation.
> MANDATORY for `/create`, `/enhance`, and `/orchestrate`.

---

## 1. Feature Counting Guard

Before writing any code, verify:

```
spec_features = Count features in spec/plan
blueprint_items = Count items in Code Blueprint

IF spec_features ≠ blueprint_items → STOP → review gaps
IF spec_features == blueprint_items → proceed
```

---

## 2. Seven-Layer Feature Analysis

### Core Layers (ALWAYS apply)

| Layer | Check |
|-------|-------|
| 🎨 UI Layout | Grid/Flex, columns, spacing, responsive |
| ⚙️ Core Logic | Business rules, algorithms, data flow |
| 🛡️ Error Handling | Try-catch, error messages, retry, fallback |
| 🧪 Edge Cases | Unusual input, limits, concurrent access |

### Extended Layers (conditional)

| Layer | When to Apply |
|-------|---------------|
| 📱 Responsive | If UI exists |
| 🔐 Security | If input/API exists |
| ♿ Accessibility | If UI exists |
| 🚀 Performance | If large datasets exist |

---

## 3. Progressive Verification

```
After every 3-5 features → STOP → cross-check Blueprint:
- Are all completed items marked ☑?
- Are remaining items still valid?
- Any missing features discovered during coding?

IF missing features found → add to Blueprint → code them
```

---

## 4. Build Verify Loop (after EACH feature)

```
After completing EACH feature:
1. Run `npm run build` → MUST pass (0 errors)
2. Run `npm run lint` → MUST pass (0 warnings)
3. Update Blueprint: ☐ → ☑
4. Report progress: "📊 X/Y features (Z%)"

IF build FAILS → fix IMMEDIATELY before next feature
IF lint FAILS → fix IMMEDIATELY before next feature
```

> 🔴 **NEVER proceed to next feature with broken build.**

---

## 5. Completion Gate

Before marking any task complete:

```
□ All Blueprint items checked ☑
□ Feature count matches spec
□ Build passes with 0 errors
□ Lint passes with 0 warnings
□ All 5 UI States implemented (see rules/5-ui-states.md)
□ All API calls have error handling
```

> If ANY check fails → fix before handover.
