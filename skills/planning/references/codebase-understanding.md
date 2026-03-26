# Codebase Understanding Phase

**When to skip:** If provided with scouter reports, skip this phase.

## Core Activities

### Parallel Scout Agents

- Use `/scouter:{variant}` (preferred) or `/scouter` (fallback) slash command to search the codebase for files needed to complete the task
- Each scouter locates files needed for specific task aspects
- Wait for all scouter agents to report back before analysis
- Efficient for finding relevant code across large codebases

### Essential Documentation Review

ALWAYS read these files first when they exist under `./documents/`:

1. **`~/.claude/skills/agent-assistant/rules/AGENT-RULES.md`** (IMPORTANT)
   (Fallback: `~/.claude/skills/agent-assistant/rules/AGENT-RULES.md`)
   - File Name Conventions & Size Management
   - Development rules and best practices
   - Code quality standards & Security guidelines

2. **`./documents/knowledge-overview/00-index.md`** — Project purpose, goals, tech stack, getting started (drill into sub-files as needed)
3. **`./documents/knowledge-architecture/00-index.md`** — System design, components, data flow, patterns (drill into sub-files as needed)
4. **`./documents/knowledge-source-base/00-index.md`** — Project structure, modules, entry points (drill into sub-files as needed)
5. **`./documents/knowledge-domain/00-index.md`** — Data models, API contracts, domain entities (drill into sub-files as needed)
6. **`./documents/knowledge-standards/00-index.md`** — Coding conventions, naming, commit format (drill into sub-files as needed)
7. **`./docs/design-guidelines.md`** (if exists) — Design system, branding, UI/UX
   - Design system guidelines
   - Branding and UI/UX conventions
   - Component library usage

### Environment Analysis

- Review development environment setup
- Analyze dotenv files and configuration
- Identify required dependencies
- Understand build and deployment processes

### Pattern Recognition

- Study existing patterns in codebase
- Identify conventions and architectural decisions
- Note consistency in implementation approaches
- Understand error handling patterns

### Integration Planning

- Identify how new features integrate with existing architecture
- Map dependencies between components
- Understand data flow and state management
- Consider backward compatibility

## Best Practices

- Start with documentation before diving into code
- Use scouts for targeted file discovery
- Document patterns found for consistency
- Note any inconsistencies or technical debt
- Consider impact on existing features
