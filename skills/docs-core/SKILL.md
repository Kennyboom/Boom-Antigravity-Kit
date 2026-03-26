---
name: docs-core
description: "Generate or update the 5 core project knowledge **folders** (overview, architecture, domain, source-base, standards) in ./documents/. Each knowledge area is a folder with 00-index.md + numbered sub-files. Performs autonomous codebase scanning, gap analysis, and produces enterprise-grade documentation for rapid onboarding. Use when user says 'generate docs', 'update docs', 'create project documentation', 'docs-core', '/docs-core', 'onboarding docs', or wants to create/refresh the knowledge base."
metadata:
  version: 2.0.0
---

# Docs-Core — Core Project Documentation Generator (v2.0 Folder-Based)

> **Mission**: Autonomously scan a codebase and produce (or update) **ALL 5** core knowledge **folders** at the highest quality standard. Each folder contains `00-index.md` + numbered sub-files. Every document must enable a new team member to fully understand the project's architecture and business domain in minimal time.

---

## Overview

Intelligent documentation engine. It handles two modes:

- **CREATE** — Generate folder structure from scratch when `./documents/` is empty or knowledge folders are missing.
- **UPDATE** — Incrementally enrich existing folders/sub-files by appending new content and correcting stale sections, **without discarding valuable existing context**.

All output files are written in **English only** regardless of the user's language.

**Critical Principle**: The helper script is only a bootstrap accelerator. Final documentation quality must come from **hybrid reconnaissance**: script output + targeted code search + direct file reading + cross-check against existing documents.

---

## When to Use

- User asks to generate, create, or refresh project documentation.
- User mentions "docs-core", "/docs-core", "knowledge base", or "onboarding docs".
- User wants to onboard new team members with comprehensive project docs.
- User wants to synchronize documentation with recent code changes.
- After major refactoring, migration, or feature additions.

---

## Deliverables — Folder-Based Structure (v2.0)

Each knowledge area is a **folder** containing `00-index.md` (summary + TOC) and numbered sub-files:

```
./documents/
  knowledge-overview/
    00-index.md            # Project identity summary + TOC linking sub-files
    01-project-identity.md
    02-tech-stack.md
    03-features.md
    04-getting-started.md
  knowledge-architecture/
    00-index.md            # Architecture summary + TOC linking sub-files
    01-system-overview.md
    02-components.md
    03-data-flow.md
    04-design-patterns.md
    05-decisions.md
  knowledge-domain/
    00-index.md            # Domain summary + TOC linking sub-files
    01-entities.md
    02-database-schema.md
    03-api-contracts.md
    04-business-rules.md
  knowledge-source-base/
    00-index.md            # Source map summary + TOC linking sub-files
    01-directory-structure.md
    02-entry-points.md
    03-key-modules.md
    04-configuration.md
  knowledge-standards/
    00-index.md            # Standards summary + TOC linking sub-files
    01-code-style.md
    02-conventions.md
    03-git-workflow.md
    04-testing-standards.md
```

**Minimum**: 5 folders x (1 index + 4 sub-files) = **25 files minimum**.
**Failure condition**: If fewer than 5 folders are produced, or any folder is missing `00-index.md`, the execution is **INCOMPLETE**.

### `00-index.md` Pattern

Every `00-index.md` MUST follow this structure:

```markdown
# {Knowledge Area Title}

> **Purpose**: {one-line purpose}
> **Sub-files**: {count}
> **Last Updated**: {YYYY-MM-DD}

## Quick Summary
{2-3 paragraph executive summary of this knowledge area}

## Sub-Files

| # | File | Description |
|---|------|-------------|
| 01 | [01-file-name.md](./01-file-name.md) | Brief description |
| 02 | [02-file-name.md](./02-file-name.md) | Brief description |
...

## Cross-References
- Related: [knowledge-architecture/00-index.md](../knowledge-architecture/00-index.md)
...
```

### Scaling Rules

| Condition | Action |
|-----------|--------|
| Sub-file exceeds ~300 lines | Split into two numbered sub-files |
| Sub-file has < 20 lines of real content | Merge into adjacent sub-file |
| New major topic discovered | Add new numbered sub-file at end (e.g., `05-new-topic.md`) |
| `00-index.md` TOC out of sync | Update TOC to match actual sub-files |

---

## Step-by-Step Workflow

### Step 0: Pre-Flight Validation

```
BEFORE any work:
1. Confirm ./documents/ directory exists (create if missing)
2. Load templates directly from `skills/docs-core/references/` (read-only, in place)
3. Do not create or persist template copies under `./documents/templates/`
4. Check which of the 5 knowledge FOLDERS already exist
5. Check for legacy flat files (v1.0) and plan migration if found
6. Determine execution mode per folder:
   - Folder missing → CREATE mode
   - Folder exists  → UPDATE mode (check sub-files individually)
   - Flat file exists, no folder → MIGRATE mode
7. Log the execution plan
```

**Output**:
```markdown
## Docs-Core Execution Plan
| Knowledge Area | Status | Mode |
|----------------|--------|------|
| knowledge-overview/ | Folder exists / Missing / Flat file only | UPDATE / CREATE / MIGRATE |
| knowledge-architecture/ | Folder exists / Missing / Flat file only | UPDATE / CREATE / MIGRATE |
| knowledge-domain/ | Folder exists / Missing / Flat file only | UPDATE / CREATE / MIGRATE |
| knowledge-source-base/ | Folder exists / Missing / Flat file only | UPDATE / CREATE / MIGRATE |
| knowledge-standards/ | Folder exists / Missing / Flat file only | UPDATE / CREATE / MIGRATE |

Template Source: `skills/docs-core/references/*.md` (read-only, no copy)
```

---

### Step 1: Codebase Reconnaissance

Perform a comprehensive scan of the entire project to gather raw intelligence.

**Execution model (MANDATORY): HYBRID RECON**
1. Run script bootstrap: `scripts/scan-project.sh`.
2. Run targeted search passes for architecture/domain/standards signals.
3. Read representative high-value files directly (not only summaries).
4. Build an evidence ledger mapping each major claim to source files.

If any of these 4 parts is skipped, documentation is considered incomplete.

**1.1 — Structure Scan**:
- List all top-level directories and files.
- Recursively map the directory tree (depth 3-4 levels).
- Identify entry points: `main.*`, `index.*`, `app.*`, `server.*`, `package.json`, `Makefile`, `Dockerfile`, etc.

Minimum direct-read set (must read content, not only file names):
- Repository entry docs: `README*`, `CHANGELOG*`, `CONTRIBUTING*` when present.
- Build/runtime manifests: package/lock files and framework configs.
- At least one entry-point file per runtime surface (web, API, worker, CLI).

**1.2 — Tech Stack Detection**:
- Parse `package.json`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`, `build.gradle`, `Gemfile`, `composer.json`, `.csproj`, or equivalent.
- Detect frameworks from imports/config: React, Next.js, Express, Django, FastAPI, Spring Boot, Rails, Laravel, etc.
- Identify databases from connection strings, ORM config, or migration files.
- Detect CI/CD from `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, etc.
- Detect containerization: `Dockerfile`, `docker-compose.yml`.

**1.3 — Pattern Discovery**:
- Scan for architectural patterns: MVC, MVVM, Clean Architecture, Hexagonal, Microservices, Monolith.
- Identify design patterns from code: Repository, Factory, Observer, Middleware, DI, etc.
- Note naming conventions observed in files, variables, functions, and classes.
- Detect test frameworks and test file patterns.
- Find configuration patterns: env files, config modules, feature flags.

Required targeted search passes (minimum):
- Architecture keywords: `controller|service|repository|use-case|domain|module|adapter|middleware|handler`.
- API surface: `router|route|endpoint|graphql|openapi|swagger|trpc`.
- Data model surface: `model|schema|entity|migration|prisma|typeorm|sequelize|mongoose|sql`.
- Standards surface: `eslint|prettier|editorconfig|commitlint|husky|lint-staged|test`.
- Business language surface: domain nouns from README/docs/comments.

**1.4 — Domain Intelligence**:
- Locate data models: ORM models, schemas, type definitions, interfaces.
- Find API definitions: route files, controllers, GraphQL schemas, OpenAPI specs.
- Identify business logic layers: services, use cases, domain modules.
- Map relationships between entities from foreign keys, references, imports.

**1.5 — Context-Window Optimization**:
> To avoid context overflow on large codebases, use these strategies:
> - Run the `scripts/scan-project.sh` helper script if available to get a compact summary.
> - Read files selectively: config files first, then entry points, then key modules.
> - Use `grep` to search for patterns rather than reading entire files.
> - Prioritize: package manifests → entry points → route/controller files → model files → test files.
> - For monorepos, scan each package's manifest separately.

**Anti-shallow guardrails**:
- Never generate sections using only script output.
- For each core document, use at least 3 direct evidence sources.
- If evidence is weak, write `Not applicable to this project` instead of guessing.

**Evidence Ledger (MANDATORY)**
- Produce a compact mapping before writing docs:

```markdown
## Evidence Ledger
| Claim Area | Evidence Files | Confidence |
|-----------|----------------|------------|
| Architecture | {paths} | High/Medium/Low |
| Domain Model | {paths} | High/Medium/Low |
| Standards | {paths} | High/Medium/Low |
| Source Structure | {paths} | High/Medium/Low |
```

---

### Step 2: Gap Analysis (UPDATE mode only)

When existing knowledge folders are found, perform a diff-aware analysis:

```
FOR each existing knowledge folder:
  1. READ 00-index.md and all sub-files completely.
  2. COMPARE against reconnaissance findings.
  3. IDENTIFY per sub-file:
     a. Stale sections — info no longer matching codebase
     b. Missing sections — new components/features not documented
     c. Accurate sections — still correct, DO NOT TOUCH
  4. PLAN targeted edits:
     - APPEND new content to existing sub-files
     - ADD new numbered sub-files for newly discovered topics
     - REVISE stale paragraphs with corrected info
     - PRESERVE all existing context that remains valid
     - UPDATE 00-index.md TOC if sub-files changed
```

**UPDATE Rules**:
- **NEVER** delete existing sub-files or sections that are still accurate.
- **AVOID** rewriting sub-files from scratch in UPDATE mode.
- **ALLOW** controlled rewrite only when a sub-file is structurally broken or over 70% stale.
- For controlled rewrite, preserve still-valid legacy context under `## Legacy Notes (Preserved Context)`.
- **ALWAYS** add a changelog entry at the bottom: `> Last updated: {date} — {summary of changes}`.
- **PREFER** appending new subsections over modifying existing ones.
- Mark newly added sections with: `<!-- Added: {date} -->` HTML comment.
- **ALWAYS** update `00-index.md` TOC when sub-files are added, removed, or renamed.

---

### Step 3: Content Generation (Thinking Protocol)

For each of the 5 knowledge folders, apply this thinking protocol **before** writing:

```
THINK:
  1. WHO is the reader? → New developer, BA/PM, or AI agent.
  2. WHAT must they understand from this folder's files alone?
  3. WHAT data from reconnaissance supports each sub-file?
  4. Is every claim backed by actual code evidence?
  5. Is any section speculative? → Remove or mark as assumption.
  6. Would a new team member find this sufficient for their first day?
  7. Is the language professional, direct, and jargon-appropriate?
  8. Is content properly distributed across sub-files (no single file > ~300 lines)?

VERIFY before writing:
  □ Every technical claim references actual files or patterns found
  □ No placeholder text ("TODO", "TBD", "fill in later")
  □ 00-index.md TOC matches actual sub-files
  □ Mermaid diagrams (if used) are syntactically valid
  □ All file paths referenced actually exist in the project
```

**Generation order** (each folder builds on the previous):
1. `knowledge-source-base/` — Foundation: where things are
2. `knowledge-overview/` — Identity: what and why
3. `knowledge-architecture/` — Design: how things connect
4. `knowledge-domain/` — Data: what data flows through
5. `knowledge-standards/` — Rules: how to contribute correctly

**Per-folder execution order**:
1. Create folder if missing
2. Write `00-index.md` first (summary + planned TOC)
3. Write numbered sub-files in order (`01-`, `02-`, ...)
4. Verify `00-index.md` TOC links match actual sub-files
5. Verify no sub-file exceeds ~300 lines

**Onboarding-first requirements**:
- Every `00-index.md` must include a `Quick Summary` section.
- `knowledge-overview/01-project-identity.md` must include `First 60 Minutes` checklist.
- `knowledge-source-base/00-index.md` must include `Read Order for New Members`.

---

### Step 4: Write Documents

For each knowledge folder, follow the corresponding template structure from `references/`.

**Writing rules**:
- **Language**: English only. No exceptions.
- **Tone**: Professional, direct, accessible to both business and technical readers.
- **Format**: Standard Markdown with GFM extensions (tables, task lists, fenced code blocks).
- **TOC**: Every `00-index.md` MUST list all sub-files with links.
- **Diagrams**: Use Mermaid.js for flowcharts, entity relationships, and architecture diagrams where they add clarity by visualizing relationships that text alone cannot convey.
- **Tables**: Use tables for structured data (APIs, config vars, file listings).
- **Code blocks**: Use fenced code blocks with language identifiers.
- **Headings**: H1 for title, H2 for major sections, H3 for subsections, H4 for details.
- **Metadata header**: Every sub-file starts with:

```markdown
# {Project Name} — {Document Title}

> **Purpose**: {one-line purpose statement}
> **Parent**: [00-index.md](./00-index.md)
> **Last Updated**: {YYYY-MM-DD}
> **Generated By**: docs-core skill

---

## Table of Contents

- [1. Section Name](#1-section-name)
  - [1.1 Subsection](#11-subsection)
...
```

- **Evidence section**: Every sub-file must include `## Evidence Sources` listing concrete files used.
- **Known gaps section**: At minimum, `00-index.md` must include `## Known Gaps and Open Questions`.

---

### Step 5: Verification Checklist

After generating all 5 knowledge folders, verify:

```
VERIFICATION MATRIX:
| Check | knowledge-overview/ | knowledge-architecture/ | knowledge-domain/ | knowledge-source-base/ | knowledge-standards/ |
|-------|--------------------|-----------------------|-------------------|----------------------|---------------------|
| Folder exists | □ | □ | □ | □ | □ |
| 00-index.md present | □ | □ | □ | □ | □ |
| All sub-files present | □ | □ | □ | □ | □ |
| TOC matches sub-files | □ | □ | □ | □ | □ |
| No TODO/TBD | □ | □ | □ | □ | □ |
| English only | □ | □ | □ | □ | □ |
| Minimum sections | □ | □ | □ | □ | □ |
| File paths valid | □ | □ | □ | □ | □ |
| Diagrams render | □ | □ | □ | □ | □ |
| Professional tone | □ | □ | □ | □ | □ |
| Evidence Sources present | □ | □ | □ | □ | □ |
| No sub-file > ~300 lines | □ | □ | □ | □ | □ |
```

**Minimum sub-file requirements per folder**:
- `knowledge-overview/`: >= 4 sub-files (Project Identity, Tech Stack, Features, Getting Started)
- `knowledge-architecture/`: >= 5 sub-files (System Overview, Components, Data Flow, Design Patterns, Decisions)
- `knowledge-domain/`: >= 4 sub-files (Entities, Database Schema, API Contracts, Business Rules)
- `knowledge-source-base/`: >= 4 sub-files (Directory Structure, Entry Points, Key Modules, Configuration)
- `knowledge-standards/`: >= 4 sub-files (Code Style, Conventions, Git Workflow, Testing Standards)

**Coverage quality gates**:
- Every major section must be backed by at least one explicit evidence file.
- No sub-file may contain unresolved placeholders.
- If confidence is low for a section, mark confidence and list follow-up actions.
- `00-index.md` TOC MUST match actual sub-files (no phantom links, no unlisted files).

---

### Step 6: Completion Report

Present the final status to the user:

```markdown
## Docs-Core Complete

### Deliverables
| # | Folder | Sub-Files | Mode | Status |
|---|--------|-----------|------|--------|
| 1 | ./documents/knowledge-overview/ | 00-index + 4 sub-files | CREATE/UPDATE | Done |
| 2 | ./documents/knowledge-architecture/ | 00-index + 5 sub-files | CREATE/UPDATE | Done |
| 3 | ./documents/knowledge-domain/ | 00-index + 4 sub-files | CREATE/UPDATE | Done |
| 4 | ./documents/knowledge-source-base/ | 00-index + 4 sub-files | CREATE/UPDATE | Done |
| 5 | ./documents/knowledge-standards/ | 00-index + 4 sub-files | CREATE/UPDATE | Done |

**Total files**: {count} (minimum 25)

### Coverage Summary
- Tech stack documented: {list}
- Architecture patterns identified: {list}
- Domain entities mapped: {count}
- Source directories documented: {count}
- Standards defined: {count}

### Next Steps
- `/docs:business` — Generate business documentation
- Review and customize generated docs for project-specific nuances
```

---

## Document Templates

Detailed templates for each document are stored in `references/`. Load the relevant template when generating each folder's sub-files:

| Template File | Produces |
|---------------|----------|
| `references/template-overview.md` | knowledge-overview/ folder |
| `references/template-architecture.md` | knowledge-architecture/ folder |
| `references/template-domain.md` | knowledge-domain/ folder |
| `references/template-source-base.md` | knowledge-source-base/ folder |
| `references/template-standards.md` | knowledge-standards/ folder |
| `references/deep-recon-checklist.md` | Mandatory deep reconnaissance checklist |

**Usage**: Read the template → Create folder → Write `00-index.md` + numbered sub-files → Write to `./documents/{knowledge-area}/`.

---

## Helper Scripts

### `scripts/scan-project.sh`

A lightweight project scanner that produces a compact summary for context-window efficiency. Outputs: directory tree, tech stack hints, file counts, and line counts.

**When to use**: On large codebases (>500 files) to avoid context overflow. Run before Step 1 to get a structured overview.

```bash
# Usage
bash skills/docs-core/scripts/scan-project.sh [project-root]
```

---

## Quality Standards

### Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Completeness** | All 5 folders produced with 00-index.md + all required sub-files |
| **Accuracy** | Every technical claim backed by actual code evidence |
| **Freshness** | Content reflects current codebase state, not historical |
| **Readability** | Understandable by both BA/PM and junior developers |
| **Format** | Valid Markdown, valid Mermaid, proper TOC, no broken links |
| **Language** | English only in all document files |
| **No Placeholders** | Zero TODO, TBD, or "fill in later" markers |
| **Professional Tone** | Direct, clear, no filler, no marketing-speak |
| **Update Safety** | UPDATE mode preserves existing valuable context |
| **Scalability** | No sub-file exceeds ~300 lines; split when needed |

### Quality Bar

> **This skill does NOT accept "good enough" output.**
> Every section, sentence, and character must be deliberate. Before writing each section, apply the Thinking Protocol (Step 3) to ensure the content is the most accurate, most useful, and most complete representation possible. If a section cannot be filled with verified data, state: "Not applicable to this project" rather than guessing.

---

## Examples

### Example 1: New Project (CREATE mode)

```
User: Generate documentation for this project

Docs-Core Process:
1. Pre-Flight: ./documents/ exists but knowledge folders missing → CREATE mode
2. Reconnaissance: Scan finds Next.js + Prisma + PostgreSQL monorepo
3. Generation order: source-base/ → overview/ → architecture/ → domain/ → standards/
4. Per folder: create folder → write 00-index.md → write numbered sub-files
5. Verify: All checks pass, 25+ files created
6. Report: 5/5 folders created (25+ total files)
```

### Example 2: Existing Project (UPDATE mode)

```
User: Update the docs, we added a new module

Docs-Core Process:
1. Pre-Flight: All 5 folders exist → UPDATE mode
2. Reconnaissance: Scan finds new `payments/` module with Stripe integration
3. Gap Analysis: knowledge-architecture/02-components.md missing payments component,
   knowledge-domain/01-entities.md missing PaymentIntent entity
4. Targeted edits: Append payments section to architecture sub-file, add entity to domain sub-file
5. Update affected 00-index.md files if new sub-files were added
6. Verify: All checks pass, existing content preserved
7. Report: 2 sub-files updated, rest unchanged
```
