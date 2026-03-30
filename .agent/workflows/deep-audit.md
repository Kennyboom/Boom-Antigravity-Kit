---
description: >-
  Ruthless Inspector v2 — Deep logic audit of documentation BEFORE code.
  10 Audit Dimensions, Crash Testing, Data Flow Tracing,
  Cross-module Dependency Verification, and Scoring Matrix.
  Finds LOGIC holes, not just TEXT holes.
---

# /deep-audit — The Ruthless Inspector v2.0

$ARGUMENTS

---

## Purpose

```
"Complete" documentation ≠ "Correct" documentation.
Text reads fine but logic is broken = TICKING TIME BOMB.

/review checks CODE.
/deep-audit checks DOCUMENTATION before code.
```

---

## IRON RULES (12)

```
1.  CHECK LOGIC, NOT TEXT
2.  TRACE DATA END-TO-END (format at EVERY boundary must match)
3.  CHALLENGE EVERY "WORKS FINE" (prove with logic)
4.  TIMING IS THE ENEMY (2 parallel processes = ALWAYS HAVE DELTA)
5.  CRASH TEST EVERYTHING ("kill -9 then what?")
6.  FORMAT MUST MATCH EXACTLY (float32 mono ≠ int16 stereo)
7.  CALCULATE RESOURCES SPECIFICALLY (numbers, not estimates)
8.  DEPENDENCIES MUST HAVE SPECIFIC VERSIONS (compatible?)
9.  NAMES MUST BE CONSISTENT (cross-file naming check)
10. ERROR HANDLING MUST HAVE A WAY BACK (detect → recover → user sees)
11. COUNT FIRST — CHECK SECOND (scope census MANDATORY)
12. REPORT PROGRESS — AUTO-SPLIT SESSIONS (50KB/session)
```

---

## Phase 0: Scope Census (MANDATORY BEFORE ANYTHING)

> ⛔ Census not done = audit NOT started.

### 0.1 Count Scope

```
STEP 1: list_dir → scan ALL directories with .md files
  → root/, docs/, plans/, docs/specs/, docs/design/
STEP 2: Count: doc_count + plan_count + spec_count
             + design_count = TOTAL
STEP 3: Count modules, phases, features
STEP 4: Report scope to user
```

### 0.2 Session Calculator

```
SESSION_BUDGET = 50KB (byte-level trace per session)
Group files by LOGIC GROUP (same module = same session)
Files that reference each other = same session
```

### 0.3 Progress Persistence

```
Save: {project_root}/.audit/audit-progress.json

{
  "totalFiles": N,
  "checkedFiles": [...],
  "remainingFiles": [...],
  "currentSession": X,
  "totalSessions": Y,
  "findings": [...]
}

ON START: Check .audit file exists?
  YES and remaining > 0 → ask continue or restart
  NO → run Census from scratch
```

---

## Phase 1: Project Scan (EACH session)

### 1.1 Session Scope Declaration

```
"🔬 SESSION [X/N] — SCOPE:
 📁 Files: [list]
 🎯 Modules: [list]
 📊 Progress: [checked]/[total] files"
```

### 1.2 File-by-File Reading (MANDATORY)

```
MUST view_file EACH FILE. DO NOT:
  ❌ "I already know this file" → MUST re-read
  ❌ Skim 800 lines → only read 50 lines

AFTER EACH FILE: ✅ file_name.md — read [X lines]
```

### 1.3 Cross-Reference Map

```markdown
| Concept | Defined In | Referenced By | Consistent? |
|---------|-----------|---------------|:-----------:|
```

### 1.4 Module Dependency Graph

```
Draw REAL dependency graph — data format at EVERY boundary.
DO NOT accept "Phase 01 → Phase 02".
MUST have: format, protocol, size at each connection.
```

---

## Phase 2: 10 Audit Dimensions

> EACH dimension = 1 results table. DO NOT skip any.

| DIM | Name | What to Check |
|:---:|------|---------------|
| 1 | 📡 Data Flow | Trace input→output, format match at boundaries |
| 2 | ⏱️ Timing | Parallel processes, delta > 16ms needs sync |
| 3 | 💥 Crash Recovery | Kill -9 → detect → recover → user sees what |
| 4 | 🔗 Cross-Module | Module A needs data from B, format match? |
| 5 | 🧮 Resources | VRAM/RAM/CPU/Disk — SPECIFIC NUMBERS |
| 6 | 📐 Naming | Cross-file naming consistency |
| 7 | 🔒 Security | Auth, port binding, encryption, isolation |
| 8 | 📊 Test Coverage | Happy + error + perf + security + integration |
| 9 | 📝 Spec Complete | User story + AC + edge cases + error handling |
| 10 | 🧩 Architecture | C4 match IPC? Schema match API? ADR match impl? |

### DIM-7 Security Checklist

```
□ IPC channels have auth?
□ SHM names random (UUID) or hardcoded?
□ Port binding random or fixed?
□ Sensitive data encrypted?
□ Process isolation (not elevated)?
□ Input validation (size limit, format check)?
```

### DIM-8 Test Coverage Ratios

```
features_without_tests / total_features → MUST = 0
edge_case_tests / happy_path_tests → MUST ≥ 1.0
```

### DIM-10 Architecture Consistency

```
□ C4 diagrams MATCH IPC schema?
□ Data schema MATCH API contracts?
□ Phase dependencies MATCH data flow?
□ ADR decisions MATCH implementation?
```

---

## Phase 3: Scoring + Report

### Severity Classification

```
🔴 CRITICAL — Logic breaks, data loss, security hole
🟡 WARNING — Inconsistency, missing edge case, unclear spec
🟢 SUGGESTION — Optimization, naming improvement, clarification
```

### Scoring Matrix (per dimension)

```markdown
| DIM | Name | Score (0-10) | Findings | Severity |
|:---:|------|:----------:|:--------:|----------|
| 1 | Data Flow | — | — | — |
| 2 | Timing | — | — | — |
...
| TOTAL | | —/100 | — | — |
```

---

## Phase 4: Fix Execution

```
1. List findings by severity (🔴 first)
2. Ask user: Fix all / selective / review report first
3. Fix each finding → verify
4. Re-audit failed dimensions
```

---

## Phase 5: Final Report

```
BEFORE writing: files_checked == total_files?
  ❌ Not yet → "Remaining: [X] files. Run /deep-audit again."
  ✅ Done → write docs/AUDIT-REPORT-{date}.md

Content:
- Executive Summary
- Scope Coverage
- Scoring Matrix (10 dimensions)
- Findings Table (severity-sorted)
- Data Flow Verification
- Timing Analysis
- Resource Budget
- Risk Assessment
- Recommendations
```

---

## Phase 6: Handover

```
🔬 DEEP AUDIT COMPLETE!
📍 Report: docs/AUDIT-REPORT-{date}.md
📐 Scope: [X/X] files (100% coverage)
📊 Score: [XX]/100
🔴 Critical: [N] found, [N] fixed
🟡 Warning: [N] found, [N] fixed

Next:
1. Fix remaining issues?
2. Start code? /create
3. Save context? /save
4. Re-audit? /deep-audit
```

---

## GOLDEN RULES

```
1.  NEVER SAY "100%" — Always more to check
2.  CHECK LOGIC, NOT TEXT
3.  TRACE EVERY BYTE — Input → Process → Output
4.  TIMING IS EVERYTHING — Parallel = ALWAYS DELTA
5.  CRASH TEST MANDATORY — "If kill -9 then what?"
6.  FORMAT MATCH = BYTE-EXACT
7.  CROSS-MODULE > SINGLE MODULE — Errors at BOUNDARIES
8.  RESOURCES = SPECIFIC NUMBERS — "VRAM enough" = MEANINGLESS
9.  DO NOT TRUST SOURCE DOCS — Challenge every assumption
10. RE-AUDIT AFTER FIX — Fix done must be verified
```
