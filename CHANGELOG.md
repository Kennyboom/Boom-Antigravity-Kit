# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-03

### Added

- **Context Gate Centralization**: Eliminated ~1,200 lines of duplicate Context Gate logic across command files by centralizing into single source of truth
  - **`rules/CONTEXT-GATE.md`**: 362-line comprehensive protocol file with FOCUS MODE (automatic) and HARD MODE (user choice)
  - **3-Layer Enforcement**: BLOCKING directive + sequential flow placement + verification checklist to prevent AI skip
  - **5-step RELOAD_ESSENTIAL_CONTEXT**: User Request → Acceptance Criteria → Plan/Strategy → Remaining Phases → Implementation Rules
  - **Variant-aware execution**: Special handling for debug (OUTPUT_ESSENTIAL_CONTEXT handoff), design (review phase), test (strategy source)
- **HSOL Documentation**: Added comprehensive Hybrid Skill Orchestration Layer planning documents
  - **Blueprint**: `documents/SMART-SKILL-ORCHESTRATION-BLUEPRINT.md` — architecture for dynamic skill resolution
  - **Assessment**: `documents/HSOL-ASSESSMENT.md` — production readiness evaluation
  - **Manifest**: `matrix-skills/_dynamic.yaml` — tracking for dynamically installed community skills
  - **Knowledge base**: Updated `documents/knowledge-architecture.md`, `documents/knowledge-source-base.md` with HSOL references

### Changed

- **All command variants**: Updated 12 command files (6 focus + 6 hard) to reference centralized Context Gate protocol
  - **Focus variants** (`/code:focus`, `/cook:focus`, `/fix:focus`, `/debug:focus`, `/design:focus`, `/test:focus`): Replaced ~80-100 lines of inline Context Gate logic with ~19-line minimal reference
  - **Hard variants** (`/code:hard`, `/cook:hard`, `/fix:hard`, `/debug:hard`, `/design:hard`, `/test:hard`): Replaced ~100 lines of verification checkpoint logic with ~19-line minimal reference
  - **Pattern**: Each file now loads `rules/CONTEXT-GATE.md` with BLOCKING directive and variant-specific adjustments
- **Code reduction**: 52% less code (~1,200 lines → ~580 lines references + 362 lines centralized)
- **Maintenance**: Reduced from updating 12 files manually to updating 1 centralized file (92% easier maintenance)

## [1.0.4] - 2026-01-30

### Added

- **Plan-already-provided short-circuit**: `/code:hard` and `/code:focus` now detect when the user references an existing plan (`@plan`, `@PLAN-...`, path to `PLAN-*.md`, or phrases like "according to plan" / "follow the plan"). When a valid plan exists, **research, scout, and brainstorm phases are skipped** and execution goes straight to context optimization → implementation → test → review.

### Changed

- **`commands/code.md`**: Routing logic updated so that when the user references an existing plan, the router directs to `/code:hard` or `/code:focus` (workflow then skips redundant phases).
- **`commands/code/hard.md`** and **`commands/code/focus.md`**: New section "PLAN-ALREADY-PROVIDED: SKIP REDUNDANT PHASES" with detection rules and resolution (skip Phase 1–3 when plan provided).

## [1.0.3] - 2026-01-30

### Added

- **Reporter Agent**: New `reporter` agent for documentation and reporting (create/update reports, template-based output).
- **Report Command**: `/report` with variants `auto`, `fast`, `hard`, `focus` — status updates, deep analysis, and focus mode with context optimization.
- **Focus Variant**: For all applicable commands (`cook`, `code`, `fix`, `debug`, `design`, `plan`, `test`) — **Clear context** and **auto-run phases** for guaranteed clean execution without context rot.
- **Matrix-Skills**: Updated `matrix-skills/_index.yaml` with reporter profile and domain mappings.

### Changed

- **Commands**: Router workflows now support **Clear context** and **focus** variant (force clear context, auto run phase) across cook, code, fix, debug, design, plan, test.
- **Documentation**: README, AGENT.md, CLAUDE.md, CURSOR.md, COPILOT.md, GEMINI.md, rules, code-assistants, web data, and documents updated for reporter, `/report`, and focus variants.

## [1.0.2] - 2026-01-30

### Added

- **Web Integration**: Added `web` directory content and resources.
- **Documentation**: Updated `README.md` with comprehensive usage instructions and project details.

## [1.0.1] - 2026-01-29

### Added

- **Matrix Skills Integration**: Implemented a massive library of 2000+ specialized skills (`matrix-skills`) to enhance agent capabilities.
- Improved skill discovery and routing mechanisms.

## [1.0.0] - 2026-01-26

### Added

- **Initial Release**: First stable release of `@namch/agent-assistant`.
- **Core Orchestration**: Framework for managing multi-agent workflows.
- **CLI Tool**: `agent-assistant` CLI for easy installation and management.
- **Multi-Assistant Support**: Compatibility with Cursor, GitHub Copilot, and Claude Code (Antigravity).
