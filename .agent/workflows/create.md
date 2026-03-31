---
description: >-
  Universal Coder v3 — Code Blueprint approval gate, Anti-Skip Protocol,
  Build-Verify Loop, 5 UI States, Progressive Verification,
  Code Coverage Audit, and file-size discipline.
  PRODUCTION quality. No shortcuts.
---

# /create — Build Application (Anti-Skip Enforced)

$ARGUMENTS

---

## GOLDEN RULES

```
1. BLUEPRINT FIRST — No code without approved Blueprint
2. NEVER SKIP FEATURES — Every spec line = must have code
3. ONE FEATURE AT A TIME — Complete A before starting B
4. BUILD VERIFY AFTER EACH FEATURE — 0 errors, 0 warnings
5. 5 UI STATES — Every data component has 5 states
6. ASK FOR BIG CHANGES — DB/folder/lib → ask first
7. FILE SIZE LIMIT — Max 300 lines per file, split if bigger
8. NO "TODO LATER" — Implement fully or do not start
```

---

## Phase 0: Context Load + Spec Reader

### 0.1 Auto-Scope Detection (MANDATORY)

```
1. Read docs/specs/ → ALL phase files + feature specs
2. Read docs/DESIGN*.md → technical design
3. Read .brain/ → session context

Design Guard (MANDATORY):
  IF no docs/DESIGN-*.md exists:
    → ⚠️ WARNING: "No technical design found."
    → Offer: "1. Run /architect first (recommended)
              2. Continue without design (risky)"

Report to user:
  "Found [X] features in specs.
   Current phase: [Y] — [Z] features

   Options:
   1. Code ALL features in phase [Y]
   2. Choose specific features
   3. Continue previous session"
```

### 0.2 Phase Detection

```
1. Find docs/specs/phase-*.md
2. Read .brain/session.json → working_on
3. If user specifies: /create phase-02
4. If not: ask which phase to code
```

---

## Phase 1: Project Setup (first phase only)

> ALL code is PRODUCTION quality. Full TypeScript,
> error handling, input validation, clean architecture.

```
□ Create project with framework (Next.js/Vite/etc.)
□ Install core dependencies
□ Setup TypeScript strict + ESLint + Prettier
□ Create folder structure (components, services, hooks)
□ Setup Git + initial commit
□ Create .env.example
□ Verify: npm run dev → OK
□ Verify: Clean build (no warnings)
```

---

## Phase 2: Code Blueprint (MANDATORY — MUST BE APPROVED)

> ⛔ NO CODE until user approves Blueprint.

### Blueprint Content

```markdown
## Code Blueprint

### 1. Architecture
- Folder structure (planned)
- Component hierarchy
- Data flow (source → processing → display)

### 2. Spec-to-Code Map (plan AND tracker)

| # | Spec Feature | File(s) | Action | Status | Build |
|---|-------------|---------|--------|--------|-------|
| 1 | [feature] | [file.tsx] | NEW | ☐ | — |
| 2 | [feature] | [utils.ts] | MODIFY | ☐ | — |

### 3. Edge Cases (minimum 3 per feature)

| Feature | Edge Case | Handling |
|---------|-----------|----------|
| [Feature A] | [case] | [behavior] |

### 4. Dependencies
- Libraries to install
- API endpoints needed
- Database tables needed

### 5. File Size Budget

| File | Planned Lines | Limit |
|------|--------------|-------|
| [component.tsx] | ~120 | 300 |
| [service.ts] | ~80 | 300 |

### 6. Decision Log (append during coding)

| # | Decision | Why | Alternative Rejected |
|---|----------|-----|---------------------|
| 1 | [what was chosen] | [reasoning] | [what was rejected] |
```

### Feature Counting Guard

```
spec_features = Count features in spec
blueprint_items = Count items in Spec-to-Code Map

IF spec_features ≠ blueprint_items → STOP, review gaps
IF spec_features == blueprint_items → proceed
```

> User MUST reply "OK" or "Approved" before Phase 3.

### Blueprint = Living Tracker (MANDATORY)

```
After EACH feature completed:
1. Update Blueprint Status: ☐ → ☑
2. Update Build column: — → ✅ (pass) or ❌ (fail)
3. Blueprint is updated IN REAL-TIME, not at the end

Blueprint is the SINGLE SOURCE OF TRUTH for progress.
IF Status and Build columns are not updated → VIOLATION.
```

---

## Phase 3: Code (Anti-Skip Enforced)

> Read rules/anti-skip.md BEFORE coding.

### 3.1 Four Coding Principles

```
1. ONE THING AT A TIME — Feature A done → Feature B.
   NEVER code 2 features simultaneously.
2. NO HIDDEN ERRORS — Errors must be reported IMMEDIATELY.
   Never swallow errors silently.
3. MINIMAL CHANGES — Only modify what needs modification.
   No random refactoring.
4. ASK PERMISSION FIRST — DB/folder/library/deploy config
   changes require user approval.
```

### 3.2 Seven-Layer Feature Analysis (per feature)

**4 Core Layers (ALWAYS):**

| Layer | Check |
|-------|-------|
| 🎨 UI Layout | Grid/Flex, columns, spacing, responsive |
| ⚙️ Core Logic | Business rules, algorithms, data flow |
| 🛡️ Error Handling | Try-catch, error messages, retry, fallback |
| 🧪 Edge Cases | Unusual input, limits, concurrent access |

**4 Extended Layers (conditional):**

| Layer | When |
|-------|------|
| 📱 Responsive | If UI exists |
| 🔐 Security | If input/API exists |
| ♿ Accessibility | If UI exists |
| 🚀 Performance | If large datasets |

### 3.3 Build-Verify Loop (after EACH feature)

```
After EACH feature completed:
1. npm run build → MUST pass (0 errors)
2. npm run lint → MUST pass (0 warnings)
3. Update Blueprint Spec-to-Code Map → ☑
4. Report: "📊 X/Y features (Z%)"

IF FAIL → fix IMMEDIATELY before next feature.
```

### 3.4 Reflect Gate (after Build-Verify, before next feature)

```
After EACH major feature (or every 3-5 small features):

REFLECT CHECKLIST:
☐ Can this code be simpler? (simplify)
☐ Any duplicated logic to extract? (DRY)
☐ Are names clear and descriptive? (readability)
☐ Any hardcoded values? (magic numbers)
☐ Any reusable component/function missed? (reuse)

IF any issue found → REFACTOR NOW (before next feature)
IF all clean → proceed
```

### 3.5 Progressive Verification

```
After every 3-5 features → STOP → cross-check:
- Blueprint vs actual code
- Scan plan for missed items
- If missing → code them immediately

NEVER let gaps accumulate.
```

### 3.6 File Size Discipline

```
AFTER writing each file:
- Check line count
- IF > 300 lines → split into smaller files
- IF > 25 lines in a function → extract sub-functions
- IF > 3 levels nesting → use early return/guard clauses
```

---

## Phase 4: UI Implementation

### 4.1 Five UI States (EVERY data component)

```
1. IDLE: Initial state before any action
2. LOADING: Skeleton / shimmer / spinner
3. SUCCESS: Display data correctly
4. ERROR: Error message + Retry button
5. EMPTY: "No data yet" + CTA to create

⛔ Component WITHOUT 5 states = INCOMPLETE.
```

### 4.2 Interaction States (EVERY interactive element)

```
□ Default | □ Hover | □ Active/Pressed | □ Focus
□ Disabled | □ Loading | □ Selected (if applicable)
```

### 4.3 Production Patterns

```
□ Error Boundary — catch render errors
□ Suspense boundaries — loading states
□ Input validation — client + server
□ Optimistic updates — instant UI feedback
□ Debounce/throttle — search, scroll, resize
□ Abort controllers — cancel previous requests
```

---

## Phase 5: Test During Code

```
FOR EACH function/component just coded:
□ Happy path → correct result?
□ Edge case → empty, huge, special chars?
□ Error case → network fail, auth fail, validation?

End of phase → run full test suite → fix failures
```

---

## Phase 6: Code Coverage Audit (MANDATORY)

> ⛔ NO completion if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| Spec Coverage | 100% spec features have code | ☐ |
| Build Clean | npm run build: 0 errors | ☐ |
| Lint Clean | npm run lint: 0 warnings | ☐ |
| States Check | 5 states per UI component | ☐ |
| Error Handling | try/catch per API call | ☐ |
| File Size | Every file ≤ 300 lines | ☐ |

IF any FAIL → fix before completing.
```

---

## Phase 7: Preview + Handover

```
✅ Phase [X] COMPLETE!

📊 Results:
✅ [N/N] features coded — 100% spec coverage
✅ Build: Clean (0 errors, 0 warnings)
✅ Code Coverage Audit: ALL PASS
✅ File Size Discipline: ALL files ≤ 300 lines

Next:
1. Continue next phase?
2. Review code? /review
3. Deep audit? /deep-audit
4. Test more? /test
```
