# Safe Edit Protocol v1.0

> Surgical code editing — modify with precision, verify before delivery.
> MANDATORY for ALL implementation workflows.

---

## 🔴 THE THREE LAWS OF SAFE EDITING

### Law 1: Read Before Write (ABSOLUTE)

```
BEFORE editing ANY file:
1. Read the ENTIRE file (view_file, no line range)
2. Count total lines and functions
3. Identify the EXACT function/block to modify
4. Note surrounding context (what comes before/after)

VIOLATION: Writing to a file you haven't fully read
= FORBIDDEN. No exceptions.
```

### Law 2: Minimal Surface Area

```
Your edit MUST touch the SMALLEST possible area:
- Changing 1 function? Edit ONLY that function
- Adding an import? Add ONLY the import line
- Fixing a bug? Change ONLY the buggy expression

NEVER rewrite an entire file to change 5 lines.
NEVER use file overwrite when a targeted replace works.
```

### Law 3: Zero Destruction Guarantee

```
After your edit, ALL of the following MUST be true:
- Every function that existed before STILL exists
- Every import that was used before STILL exists
- Every export that was used before STILL exists
- No unrelated code was modified or reformatted

If ANY pre-existing logic disappears = CRITICAL FAILURE
```

---

## Edit Decision Tree

```
Need to modify code?
├── New file? → write_to_file (safe, nothing to destroy)
├── Single block change? → replace_file_content
├── Multiple scattered changes? → multi_replace_file_content
└── NEVER → write_to_file with Overwrite=true on existing files
```

---

## Pre-Edit Checklist (Before touching code)

```
□ I have read the FULL file (not just a snippet)
□ I can name every function in this file
□ I know the exact line range I am modifying
□ My change does NOT affect any other function
□ I am using targeted replace, NOT full overwrite
```

---

## Post-Edit Verification Gate (MANDATORY)

After EVERY code edit, you MUST run these 3 checks
before reporting completion to user:

### Gate 1: Build Check
```bash
# For TypeScript/JavaScript projects
npx tsc --noEmit 2>&1 | head -20

# For Python projects
python -m py_compile <modified_file>

# For Rust projects
cargo check 2>&1 | head -20
```
**If errors → FIX before proceeding. Do NOT report to user.**

### Gate 2: Lint Check
```bash
# JavaScript/TypeScript
npx eslint <modified_file> --no-error-on-unmatched-pattern

# Python
python -m flake8 <modified_file> --max-line-length=100

# Rust
cargo clippy 2>&1 | head -20
```
**If warnings → FIX before proceeding.**

### Gate 3: Diff Review (Self-Audit)
```bash
git diff --stat
git diff <modified_file>
```

Self-check against the diff output:
```
□ Lines added: reasonable for the task?
□ Lines deleted: ZERO unintended deletions?
□ No functions disappeared?
□ No imports removed that are still used?
□ Formatting changes: ZERO (don't reformat unrelated code)?
```

**If any check fails → REVERT and redo the edit.**

---

## Conventional Commits (Git Discipline)

When committing changes, MUST follow this format:

```
<type>(<scope>): <description>

Types:
  feat     → New feature
  fix      → Bug fix
  refactor → Code restructuring (no behavior change)
  docs     → Documentation only
  test     → Adding/updating tests
  chore    → Build, CI, tooling changes
  perf     → Performance improvement
  security → Security fix or hardening

Scope: module or component name
Description: imperative mood, lowercase, no period

Examples:
  feat(auth): add JWT refresh token rotation
  fix(cart): prevent negative quantity on update
  security(api): add rate limiting to login endpoint
```

### Commit Rules
```
1. ONE logical change per commit (no mega-commits)
2. All 3 gates MUST pass before committing
3. Commit message MUST explain WHY, not just WHAT
4. Never commit TODO/FIXME/HACK comments
5. Never commit console.log or debug statements
```

---

## Recovery Protocol

If you accidentally destroy code:

```
1. STOP immediately — do not try to "fix it"
2. Run: git diff to see damage
3. Run: git checkout -- <file> to restore
4. Read the file again from scratch
5. Redo the edit with surgical precision
```

---

> 🔴 REMEMBER: You are a SURGEON, not a demolition crew.
> Every line of existing code represents human effort.
> Respect it. Preserve it. Only modify what you must.
