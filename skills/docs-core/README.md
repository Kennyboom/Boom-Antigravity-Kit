# Docs Core Skill
Build and maintain the five foundational project knowledge documents with evidence-driven precision.

## Why this skill matters
Most repositories have fragmented knowledge: setup steps in one place, architecture in another, and business rules buried in code. Docs Core creates and maintains a single high-quality documentation baseline so onboarding is faster, decisions are safer, and changes are easier to reason about.

## What it generates
Docs Core manages these mandatory output **folders** in the documents directory:

- documents/knowledge-overview/ (00-index.md + numbered sub-files)
- documents/knowledge-architecture/ (00-index.md + numbered sub-files)
- documents/knowledge-domain/ (00-index.md + numbered sub-files)
- documents/knowledge-source-base/ (00-index.md + numbered sub-files)
- documents/knowledge-standards/ (00-index.md + numbered sub-files)

Each folder contains `00-index.md` (summary + TOC) and numbered sub-files (`01-...md`, `02-...md`, etc.).

Mode behavior:

- CREATE: generate missing knowledge folders from scratch.
- UPDATE: enrich existing folder sub-files with new evidence while preserving valid context.
- MIGRATE: convert legacy flat files (v1.0) to folder-based structure (v2.0).

## Core capabilities
- Runs a structured repository scan using skills/docs-core/scripts/scan-project.sh.
- Produces or updates all five mandatory knowledge folders (00-index.md + sub-files each).
- Uses hybrid reconnaissance: script output plus targeted file reading and pattern search.
- Builds evidence-backed content instead of speculative summaries.
- Preserves still-valid legacy context in UPDATE mode.
- Enforces consistency across architecture, domain, source-base, and standards docs.

## Workflow summary
1. Validate folder targets and determine CREATE, UPDATE, or MIGRATE per knowledge area.
2. Scan project structure, stack signals, entry points, and core modules.
3. Build an evidence ledger for architecture, domain, standards, and source map claims.
4. For each folder: write 00-index.md, then numbered sub-files using templates.
5. Verify quality gates across all five folders (25+ files) before completion.

## Inputs and evidence sources
- skills/docs-core/SKILL.md
- skills/docs-core/references/template-overview.md
- skills/docs-core/references/template-architecture.md
- skills/docs-core/references/template-domain.md
- skills/docs-core/references/template-source-base.md
- skills/docs-core/references/template-standards.md
- skills/docs-core/references/deep-recon-checklist.md
- skills/docs-core/scripts/scan-project.sh
- Repository manifests, configs, entry points, and representative modules
- Existing files in documents/

## Quality gates / Definition of Done
- All five mandatory knowledge folders exist with 00-index.md + sub-files.
- Each sub-file includes practical, onboarding-ready content rather than generic prose.
- 00-index.md TOC in each folder matches actual sub-files.
- No sub-file exceeds ~300 lines (split when needed).
- Claims are traceable to repository evidence.
- No placeholder text, unresolved TODOs, or unsupported assumptions.
- Required sections (such as table of contents, evidence sources, known gaps) are present where specified by the workflow.
- UPDATE mode preserves accurate prior context and only revises what changed.

## Typical use cases
- Create onboarding documentation for a newly inherited codebase.
- Refresh stale docs after major refactoring.
- Prepare a repository for team scale-up.
- Align documentation with recent feature delivery.
- Establish a documentation baseline before an audit cycle.
- Reduce tribal knowledge by codifying architecture and standards.

## Quick start usage examples
- "Generate docs-core for this repository"
- "/docs-core"
- "Update project knowledge documents"
- "Refresh onboarding docs from current code"
- "Run docs-core before docs-audit"

## Output quality principles
- Evidence first: every important claim should be backed by source files.
- Onboarding first: docs must help a new teammate become productive quickly.
- Consistency first: architecture, domain, and standards must not conflict.
- Clarity first: concise language, explicit structure, and actionable guidance.
- Maintainability first: documents should be easy to keep current.

## Limitations and non-goals
- Not a substitute for code reviews, tests, or runtime verification.
- Does not invent undocumented business requirements.
- Does not claim certainty where evidence is weak.
- Does not replace product strategy or roadmap documents.
- Does not automatically guarantee long-term freshness without reruns.

## Related resources in this folder
- skills/docs-core/SKILL.md
- skills/docs-core/references/deep-recon-checklist.md
- skills/docs-core/references/template-overview.md
- skills/docs-core/references/template-architecture.md
- skills/docs-core/references/template-domain.md
- skills/docs-core/references/template-source-base.md
- skills/docs-core/references/template-standards.md
- skills/docs-core/scripts/scan-project.sh
