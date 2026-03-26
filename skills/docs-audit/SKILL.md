---
name: docs-audit
description: "Generate or update the 4 core audit documentation files (security, compliance, dataflow, recommendations) in ./documents/audit/. Performs evidence-driven security review, compliance mapping, privacy analysis, strict scoring, and remediation planning. Use when user says 'docs-audit', 'security audit', 'compliance audit', 'audit docs', '/docs:audit', or wants security and compliance documentation."
metadata:
   version: 1.0.0
---

# Docs-Audit

> Mission: autonomously scan a repository and produce an evidence-based audit report package that explains current security posture, compliance coverage, privacy/data-flow risks, and the concrete steps required to improve maturity.

## Overview

This skill replaces the workflow in `commands/docs/audit.md` with a reusable, self-contained audit documentation engine.

It supports three modes:
- `CREATE`: generate missing audit folders from scratch.
- `UPDATE`: refresh existing audit folders without discarding still-valid context.
- `MIGRATE`: convert legacy flat `audit-*.md` files into folder-based structure.

All generated files under `./documents/` must be written in English only.

Critical principle:
- Scripts are bootstrap accelerators only.
- Final audit quality must come from hybrid reconnaissance: script output, targeted search, direct file reads, and evidence cross-checking.

Non-negotiable quality bars:
- Never infer a control as `Verified` without direct repository evidence.
- Evidence must include concrete file references and line anchors when feasible.
- If uncertainty remains, classify as `Partial` or `Unknown` and explain why.
- Never leave unresolved placeholders (`{...}`, `TODO`, `TBD`, `TBA`) in final documents.

Visual clarity bars:
- Prefer icon-led sections and checklists for high-signal readability.
- Use callouts (`[!NOTE]`, `[!WARNING]`, `[!CAUTION]`, `[!TIP]`) for critical interpretation points.
- Avoid table overuse; use concise lists/checklists when data is not truly matrix-structured.
- Keep tables for dense mappings only (findings register, framework mapping, prioritized remediation).

## When to Use

- User asks for `docs-audit`, `audit docs`, `security audit`, `compliance audit`, or `/docs:audit`.
- User wants repository-level security and privacy documentation.
- User wants a strict scorecard for current code quality and audit readiness.
- User wants remediation guidance tied to real repository evidence.
- User wants to refresh existing audit reports after major changes.

## Deliverables

| # | Folder | Purpose |
|---|---|---|
| 1 | `./documents/audit/audit-security/` | Security assessment, attack surface, findings, and risk summary (00-index + 01~04) |
| 2 | `./documents/audit/audit-compliance/` | Compliance posture, control mapping, and verification gaps (00-index + 01~04) |
| 3 | `./documents/audit/audit-dataflow/` | Data flow map, trust boundaries, privacy posture, and sensitive-data handling (00-index + 01~04) |
| 4 | `./documents/audit/audit-recommendations/` | Prioritized remediation roadmap, score uplift plan, and implementation guidance (00-index + 01~04) |

Failure condition:
- If fewer than 4 folders are produced with their sub-files, execution is incomplete.

Per-folder standard (mandatory):
- `audit-security/`: vulnerabilities identified, OWASP checklist complete, risk assessment complete.
- `audit-compliance/`: control coverage matrix, compliance gap register, evidence-state rigor.
- `audit-dataflow/`: trust boundaries + sensitive data paths + privacy posture.
- `audit-recommendations/`: prioritized and actionable remediation roadmap linked to finding IDs.

## Required References

- Use [./references/template-security.md](./references/template-security.md)
- Use [./references/template-compliance.md](./references/template-compliance.md)
- Use [./references/template-dataflow.md](./references/template-dataflow.md)
- Use [./references/template-recommendations.md](./references/template-recommendations.md)
- Use [./references/deep-audit-checklist.md](./references/deep-audit-checklist.md)
- Use [./references/scoring-framework.md](./references/scoring-framework.md)
- Use [./references/framework-mapping.md](./references/framework-mapping.md)
- Use [./scripts/scan-audit-surface.sh](./scripts/scan-audit-surface.sh)

## Step-by-Step Workflow

### Step 0: Pre-Flight Validation

Before analysis begins:
1. Ensure `./documents/` exists.
2. Ensure `./documents/audit/` exists.
3. Load templates directly from `skills/docs-audit/references/` (read-only, in place).
4. If `./documents/templates/` or `./documents/templates/audit/` exists, treat it as legacy output and ignore it as a template source.
5. Do not create or persist template copies under `./documents/templates/`.
6. If legacy template copies are present, remove them before continuing.
7. Check which of the 4 audit folders already exist.
8. Determine per-folder mode:
   - folder exists with sub-files -> `UPDATE`
   - flat file exists (legacy `audit-*.md`) -> `MIGRATE`
   - neither exists -> `CREATE`
9. Record execution plan before writing.

Output format:

```markdown
## Docs-Audit Execution Plan
| Folder | Status | Mode |
|--------|--------|------|
| audit-security/ | Exists / Missing / Legacy flat file | UPDATE / CREATE / MIGRATE |
| audit-compliance/ | Exists / Missing / Legacy flat file | UPDATE / CREATE / MIGRATE |
| audit-dataflow/ | Exists / Missing / Legacy flat file | UPDATE / CREATE / MIGRATE |
| audit-recommendations/ | Exists / Missing / Legacy flat file | UPDATE / CREATE / MIGRATE |
```

### Step 1: Hybrid Audit Reconnaissance

Run a hybrid reconnaissance pass. Do not rely on a single source.

Required inputs:
1. Bootstrap scan using [./scripts/scan-audit-surface.sh](./scripts/scan-audit-surface.sh)
2. Targeted search across security, privacy, auth, config, and dependency surfaces
3. Direct reads of representative high-value files
4. Evidence cross-check against existing audit docs, if present

Signal precision rules (mandatory):
- Always exclude vendor/generated/docs noise paths from evidence claims: `node_modules`, `dist`, `build`, `coverage`, `.next`, `.turbo`, `documents`, `reports`, `examples`, `fixtures`, `stories`, `__snapshots__`, `__mocks__`.
- Do not treat marketing/UI prose keyword matches as controls or findings without code-path evidence.
- For frontend-first repositories, prioritize runtime files (`main/app/router/hooks/config`) over static content pages for security conclusions.
- For backend-first repositories, prioritize ingress/egress boundaries (`routes/controllers/middleware/services/repositories`) and auth/session/validation layers.
- For polyglot repositories, produce language-aware evidence slices (Node, Python, Go, Java, .NET, Rust, Ruby, PHP) and avoid over-generalizing from one stack.
- If a hit is from test/demo/sample code, classify as `Contextual` and do not score it as production risk unless execution path is proven.

Mandatory supplemental scans (when tooling/manifests are present):
- Node.js: lockfile and dependency risk posture (`npm audit` or equivalent signals)
- Python: `pip-audit`/`safety` signals and pinned dependency posture
- Container/IaC: Docker and IaC misconfiguration signals from repository files
- CI/CD: workflow hardening signals (permissions, secret handling, release paths)

Minimum direct reads:
- `README*`, `CHANGELOG*`, `CONTRIBUTING*`, security policy files if present
- Runtime manifests and lock files
- CI and automation files
- Authentication, session, middleware, config, and route files when present
- Data model or persistence files
- Files touching secrets, cookies, tokens, crypto, uploads, logging, or webhooks

Targeted search classes:
- `auth|session|cookie|jwt|oauth|rbac|acl|csrf|cors`
- `secret|token|password|apikey|api_key|private_key|bearer`
- `crypto|encrypt|decrypt|hash|sign|verify`
- `validate|sanitize|escape|zod|joi|schema`
- `upload|storage|s3|bucket|blob|filesystem`
- `log|audit|trace|monitor|sentry`
- `gdpr|privacy|consent|retention|pii|personal data`
- `docker|workflow|github actions|release|deploy|env`
- `TODO|FIXME|HACK|eslint-disable|ts-ignore|nosec|skip`

### Step 2: Evidence Ledger

Before writing any document, build an evidence ledger.

Required format:

```markdown
## Evidence Ledger
| Claim Area | Evidence Files | Confidence | Notes |
|-----------|----------------|------------|-------|
| Security Controls | {paths} | High/Medium/Low | {notes} |
| Compliance Signals | {paths} | High/Medium/Low | {notes} |
| Data Flow | {paths} | High/Medium/Low | {notes} |
| Privacy Posture | {paths} | High/Medium/Low | {notes} |
| Remediation Basis | {paths} | High/Medium/Low | {notes} |
```

Rules:
- Every major section in every file must map to explicit evidence.
- Prefer evidence format with file and line anchor, for example: `path/to/file.ts#L42`.
- If confidence is low, say so.
- If evidence is missing, mark the area as unknown or unverified rather than guessing.

### Step 3: Audit Thinking Protocol

Before drafting each file, think through these checks:
1. What evidence supports this claim?
2. Is this a verified issue, a probable risk, or an unknown?
3. What is the likely blast radius if the issue is real?
4. Which framework or best-practice reference is relevant?
5. What would a skeptical security reviewer challenge?
6. Is the remediation concrete, technically realistic, and priority-ranked?
7. Is the wording precise enough to avoid overstating certainty?

Reject content if any of the following is true:
- It depends only on script output.
- It uses placeholder text.
- It states compliance without evidence.
- It labels an issue critical without impact rationale.
- It recommends remediation without actionable steps.

### Step 4: Create or Update Strategy

For `CREATE` mode:
- Generate the full file from the relevant template.
- Replace every placeholder with evidence-backed content.

For `UPDATE` mode:
1. Read the full current document.
2. Identify stale, missing, and still-valid sections.
3. Preserve accurate context.
4. Revise stale sections with evidence-backed updates.
5. Append new sections where possible instead of rewriting the whole file.
6. Use controlled rewrite only if the document is structurally broken or more than 70% stale.
7. If controlled rewrite is required, preserve still-valid context under `## Legacy Notes (Preserved Context)`.
8. Append a footer update note with date and summary.

### Step 5: Generate All 4 Documents

Mandatory document rules:
- English only.
- Professional, direct tone.
- Markdown with a TOC in each file.
- `Evidence Sources` section in each file.
- `Known Gaps and Open Questions` section in each file.
- A strict score section at the end of each file.
- Mermaid diagrams where they add clarity.
- Prefer checklists and callouts for status signaling; do not default to tables.
- Use tables only for:
   - findings register
   - framework/control mappings
   - prioritized remediation matrix
- Every major claim must be traceable to at least one evidence reference.
- Cross-file consistency is mandatory (same issue ID, same severity, same rationale across files).
- No unresolved placeholders or template residue in final output.

Visual/document UX rules:
- Start each major section with a short status strip using symbols: `✅ Verified`, `🟡 Partial`, `🔴 Gap`, `⚪ Unknown`.
- Keep paragraph blocks short (2-4 lines) and prefer bullet structure for audit decisions.
- Place a `### Quick Read` block near the top with 3-5 bullets.

Required final scoring behavior:
- Use the rubric in [./references/scoring-framework.md](./references/scoring-framework.md)
- Include numeric score, grade band, confidence, blockers, and rationale
- Apply score caps when blocking issues exist
- Summarize what would raise the score next

### Step 6: Framework Mapping

Use [./references/framework-mapping.md](./references/framework-mapping.md) to map findings to:
- OWASP Top 10
- OWASP ASVS
- CWE Top 25
- NIST CSF
- CIS Secure Software practices
- ISO 27001-oriented control themes
- GDPR/privacy principles when relevant

Mapping rules:
- Distinguish verified evidence, partial coverage, unknown areas, and non-applicable controls.
- Do not claim certification or formal compliance.
- Do not convert coding signals into legal conclusions.
- If a mapping is uncertain, mark `Unknown` and list the exact evidence gap.

### Step 7: Verification Checklist

Verify all of the following before completion:

| Check | audit-security/ | audit-compliance/ | audit-dataflow/ | audit-recommendations/ |
|---|---|---|---|---|
| Folder exists with 00-index + sub-files | □ | □ | □ | □ |
| TOC present in 00-index.md | □ | □ | □ | □ |
| English only | □ | □ | □ | □ |
| Evidence sources present | □ | □ | □ | □ |
| Known gaps present in 00-index.md | □ | □ | □ | □ |
| Strict score in 00-index.md | □ | □ | □ | □ |
| No TODO/TBD placeholders | □ | □ | □ | □ |
| No unresolved {placeholder} markers | □ | □ | □ | □ |
| Claims backed by evidence | □ | □ | □ | □ |
| Score rationale present | □ | □ | □ | □ |
| Finding IDs consistent cross-folder | □ | □ | □ | □ |

Additional quality gates:
- `audit-security/` must contain at least one attack-surface view and one findings table.
- `audit-compliance/` must contain at least one control-mapping table.
- `audit-dataflow/` must contain at least one data-flow or trust-boundary diagram.
- `audit-recommendations/` must contain a prioritized remediation matrix and score uplift plan.

### Step 8: Completion Report

Provide a concise final report:

```markdown
## Docs-Audit Complete

| Folder | Mode | Status |
|---|---|---|
| ./documents/audit/audit-security/ | CREATE/UPDATE/MIGRATE | ✅ |
| ./documents/audit/audit-compliance/ | CREATE/UPDATE/MIGRATE | ✅ |
| ./documents/audit/audit-dataflow/ | CREATE/UPDATE/MIGRATE | ✅ |
| ./documents/audit/audit-recommendations/ | CREATE/UPDATE/MIGRATE | ✅ |

### Score Summary
- Security posture: {score}
- Compliance posture: {score}
- Data privacy posture: {score}
- Remediation readiness: {score}
- Overall audit maturity: {score}

### Integrity Notes
- Score caps applied: {Yes/No + reasons}
- Lowest-confidence area: {area + why}
- Cross-file consistency check: {Pass/Fail + note}

### Highest-Priority Follow-Up
1. {action}
2. {action}
3. {action}
```

## Completion Standard

The skill is not complete if it produces shallow summaries.

It is complete only when:
- all 4 folders exist with 00-index.md + sub-files
- each folder is evidence-driven
- each 00-index.md contains a strict score section
- finding IDs are consistent across folders
- the package is materially as rigorous as `docs-core`
- recommendations are actionable enough for engineering planning