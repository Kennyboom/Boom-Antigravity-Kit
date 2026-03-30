---
description: Add or update features in existing application with Anti-Skip Lite and Build Verify Loop.
---

# /enhance - Update Application (Anti-Skip Lite)

$ARGUMENTS

---

## Purpose

Add features or update existing application with quality gates.
Lighter than `/create` but still enforces Blueprint and
Build Verify to prevent incomplete work.

---

## Workflow

### Step 1: Understand Current State

```
1. Load project state:
   python .agent/scripts/session_manager.py info

2. Understand existing features, tech stack
3. Read .brain/ → session context if available
```

### Step 2: Plan Changes (Blueprint Lite)

```
Create mini-blueprint:

| # | Change | File(s) | Action | Status |
|---|--------|---------|--------|--------|
| 1 | [change] | [file] | NEW/MODIFY | ☐ |
| 2 | [change] | [file] | NEW/MODIFY | ☐ |
```

For major changes (>5 files), present to user first.

### Step 3: Implement (Anti-Skip Lite)

```
Coding rules:
1. One change at a time
2. Build verify after each file:
   npm run build → 0 errors
   npm run lint → 0 warnings
3. Update Blueprint Lite: ☐ → ☑
4. 5 UI States for new components (rules/5-ui-states.md)
```

### Step 4: Verify

```
Quick Code Audit:
□ All Blueprint items checked ☑
□ Build passes (0 errors)
□ Lint passes (0 warnings)
□ New UI components have 5 states
□ New API calls have try/catch
```

### Step 5: Update Preview

```
Hot reload or restart server.
Report changes to user.
```

---

## Usage Examples

```
/enhance add dark mode
/enhance build admin panel
/enhance integrate payment system
/enhance add search feature
/enhance make responsive
```

---

## Caution

- Get approval for major changes (>5 files)
- Warn on conflicting requests
- Build verify after EACH file changed
- Commit each logical change with git
