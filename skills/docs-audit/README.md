# Docs Audit Skill
Generate strict, evidence-driven security and compliance audit documentation with actionable remediation guidance.

## Why this skill matters
Documentation can look complete while hiding major risk: unverified controls, privacy blind spots, and unclear remediation priorities. Docs Audit creates a rigorous audit package that separates verified facts from uncertainty and provides a practical improvement roadmap.

## What it generates
Docs Audit manages these mandatory outputs in the audit directory:

- documents/audit/audit-security/ (00-index.md + 01~04)
- documents/audit/audit-compliance/ (00-index.md + 01~04)
- documents/audit/audit-dataflow/ (00-index.md + 01~04)
- documents/audit/audit-recommendations/ (00-index.md + 01~04)

Mode behavior:

- CREATE: produce missing audit folders from scratch.
- UPDATE: refresh existing audit folders with current evidence, preserving valid context.
- MIGRATE: convert legacy flat `audit-*.md` files into folder-based structure.

## Core capabilities
- Scans audit surface using skills/docs-audit/scripts/scan-audit-surface.sh.
- Produces or updates all four mandatory audit documents.
- Applies evidence discipline to findings: Verified, Partial, Unknown.
- Maps controls and risks across security, compliance, privacy, and data flow.
- Enforces strict scoring posture: no evidence, no full credit.
- Produces prioritized, execution-ready remediation recommendations.

## Workflow summary
1. Validate audit targets and set CREATE or UPDATE mode per file.
2. Run hybrid reconnaissance: script scan, targeted search, direct high-value file reads.
3. Build an evidence ledger with confidence levels.
4. Generate or update security, compliance, dataflow, and recommendations documents.
5. Apply strict scoring rubric and consistency checks across all outputs.

## Inputs and evidence sources
- skills/docs-audit/SKILL.md
- skills/docs-audit/references/deep-audit-checklist.md
- skills/docs-audit/references/framework-mapping.md
- skills/docs-audit/references/scoring-framework.md
- skills/docs-audit/references/template-security.md
- skills/docs-audit/references/template-compliance.md
- skills/docs-audit/references/template-dataflow.md
- skills/docs-audit/references/template-recommendations.md
- skills/docs-audit/scripts/scan-audit-surface.sh
- Repository code, manifests, workflows, configs, and security-sensitive paths
- Existing files in documents/audit/

## Quality gates / Definition of Done
- All four mandatory audit folders exist with 00-index.md and sub-files.
- Major claims are explicitly tagged as Verified, Partial, or Unknown.
- Scoring is strict, justified, and free from inflated confidence.
- Findings include severity, rationale, and evidence references.
- Recommendations are prioritized and realistically actionable.
- Cross-folder consistency is maintained for finding IDs and severity logic.
- Each 00-index.md contains a strict score section.

## Typical use cases
- Produce a baseline security and compliance audit package.
- Re-audit after architecture or dependency changes.
- Prepare evidence-backed documentation for handoff or review.
- Identify privacy and trust-boundary gaps in current design.
- Prioritize remediation work with clear severity and impact.
- Measure audit maturity progression across releases.

## Quick start usage examples
- "Run docs audit for this repository"
- "/docs:audit"
- "/docs-audit"
- "Update audit docs with latest code changes"
- "Generate strict scoring and remediation plan"

## Output quality principles
- Evidence discipline: uncertain claims are marked, not hidden.
- Severity integrity: ratings must match impact and exploitability.
- Audit transparency: assumptions and gaps are documented explicitly.
- Actionability: each major finding maps to concrete remediation.
- Repeatability: another reviewer should reach similar conclusions from the same evidence.

## Limitations and non-goals
- Not a legal certification or formal compliance attestation.
- Not a substitute for penetration testing or full red-team exercises.
- Does not guarantee runtime safety beyond available repository evidence.
- Does not replace governance, policy, or legal review processes.
- Does not assign optimistic scores for presentation purposes.

## Related resources in this folder
- skills/docs-audit/SKILL.md
- skills/docs-audit/references/deep-audit-checklist.md
- skills/docs-audit/references/framework-mapping.md
- skills/docs-audit/references/scoring-framework.md
- skills/docs-audit/references/template-security.md
- skills/docs-audit/references/template-compliance.md
- skills/docs-audit/references/template-dataflow.md
- skills/docs-audit/references/template-recommendations.md
- skills/docs-audit/scripts/scan-audit-surface.sh
