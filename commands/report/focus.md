---
description: 🔒 Focused Report — Deep analysis with enforced context optimization
version: "1.0"
category: documentation
execution-mode: execute
---

# /report:focus — Focused Deep Analysis Report

> **MISSION**: Generate verifiable, objective output with **enforced context optimization** — report, update, or template.

> This variant automatically clears context before analysis—no user prompt required.
> Use when you want a "clean slate" audit or unbiased analysis. Reporter chooses: **create report**, **update existing files**, or **generate from template** per user intent.

<task>$ARGUMENTS</task>

---

## 🛑 PRE-FLIGHT (DO FIRST — BLOCKS PHASE 1)

**LOAD now** (in order; path `./rules/` or `~/.{TOOL}/skills/agent-assistant/rules/`):

1. CORE.md — Identity, Laws, Routing
2. PHASES.md — Phase Execution
3. AGENTS.md — Tiered Execution

**⛔ Do not run Phase 1 until all are loaded.** Follow **all** rules in those files; they override any conflicting instructions in this file.

**Skills Resolution**: When delegating, load `SKILLS.md` on-demand for fitness calculation and dynamic discovery (focus variant enables find-skills for superior skill matching).

---

## 🔀 TIERED EXECUTION

| Tier       | When               | Action                       |
| ---------- | ------------------ | ---------------------------- |
| **TIER 1** | runSubagent EXISTS | Invoke sub-agent (MANDATORY) |
| **TIER 2** | Tool MISSING       | EMBODY agent file (FALLBACK) |

**❌ Anti-Lazy**: Never use TIER 2 when TIER 1 tool available.

---

## 📁 DELIVERABLES (Reporter chooses from user intent)

| User intent | Reporter output |
| ----------- | ---------------- |
| **Create report** | `./reports/general/REPORT-FOCUS-{date}.md` or path user asked |
| **Update existing** | **Edit** related files; do **not** create new report unless also asked |
| **From template** | File(s) matching user format/template |

| Agent      | When creating report                             |
| ---------- | ------------------------------------------------- |
| researcher | (optional) verification checklist                 |
| scouter    | (optional) evidence output                        |
| reporter   | Per table above — create / update / from template |

All files in `./reports/` → English only.

---

## ⛔ INCREMENTAL EXECUTION (MANDATORY)

One phase at a time, each phase independent: Phase 1 → then Phase 2 → … in one reply. No batching (load only what each phase needs). **Within each phase:** when doing a part, output it in format so user sees what's happening (announce before doing). Format: rules/PHASES.md § Phase output structure.

---

## 🛡️ FOCUS CONTEXT GATE — Automatic Context Optimization

> **⚡ FOCUS MODE**: This checkpoint executes automatically. NO user input required.
>
> **PURPOSE**: Ensure report is based ONLY on facts, not conversation hallucinations.
> This acts as a mandatory "firewall" before analysis begins.

### 🔒 AUTOMATIC EXECUTION (NO PROMPT)

```yaml
focus_context_gate:
  mode: "AUTOMATIC - No user interaction"
  behavior: "Force Clear context & Analyze"

  execution:
    1. ANNOUNCE: |
      ## 🛡️ Focus Context Gate — Automatic

      ✅ **Target Defined**: Analysis target identified.
      🔒 **Focus Mode**: Automatically clearing context for objective analysis.

      ⚡ Executing: **Clear context & Analyze**...

    2. CONTEXT_DIRECTIVE: |
      ╔══════════════════════════════════════════════════════════════════╗
      ║  ⛔ MANDATORY CONTEXT RESET — FOCUS MODE                         ║
      ╠══════════════════════════════════════════════════════════════════╣
      ║  IGNORE: All previous chat assumptions, unverified claims,       ║
      ║          and subjective contextual bias.                         ║
      ║                                                                  ║
      ║  SOLE SOURCE OF TRUTH: The actual Codebase and Documentation.    ║
      ║                                                                  ║
      ║  PROCEED: Begin Analysis phase with FRESH, OBJECTIVE mindset.    ║
      ╚══════════════════════════════════════════════════════════════════╝

    3. LOAD: Read specified target files as if seeing them for the first time

    4. PROCEED: Start Phase 1 (Objective Analysis) immediately
```

### 📋 Post-Gate Status

```markdown
🔒 **Context Gate Passed**

- Previous context: DISCARDED
- Active context: Target files / codebase only
- Mode: Fresh objective analysis

Proceeding to Phase 1...
```

---

## 🎭 Phase 1: RESEARCH (AUDIT CRITERIA)

| Agent  | `researcher`                                          |
| ------ | ----------------------------------------------------- |
| Goal   | Research audit/report criteria and what to verify     |
| Exit   | Verification checklist and report criteria defined    |

---

## 🎭 Phase 2: EVIDENCE COLLECTION

| Agent  | `scouter`                       |
| ------ | ------------------------------- |
| Goal   | Gather raw, verifiable evidence |
| Exit   | Factual state documented, no assumptions              |

---

## 🎭 Phase 3: VERIFICATION & OUTPUT (create / update / from template)

| Agent       | `reporter`                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| Prerequisite| **USE** Phase 1 criteria + Phase 2 evidence only                            |
| Goal        | From **user intent**: synthesize into (1) new report, (2) **updates** to existing files, or (3) file(s) from template |
| Output      | **Create**: `./reports/general/REPORT-FOCUS-{date}.md`. **Update**: edit related files. **Template**: file(s) matching user format. |
| Exit        | Deliverable matches intent; every claim cited when creating report.       |

---

## COMPLETION

Deliverable per **user intent**:

1. ✅ **Create report** → `./reports/general/REPORT-FOCUS-{date}.md` (or path user asked)
2. ✅ **Update existing** → Related files edited; list what was updated
3. ✅ **From template** → File(s) matching user format; list path(s)
4. 🕵️ **Audit** → `/review:focus` (optional)
