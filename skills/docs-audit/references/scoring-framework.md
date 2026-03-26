# Docs-Audit Scoring Framework

Use a strict 100-point scoring system for every audit document and for the overall audit roll-up.

## Core Rules

- Start from evidence, not assumptions.
- Scores must be hard to inflate.
- Missing evidence reduces both score and confidence.
- Blocking issues can cap the final score.
- The final score must include rationale for the biggest deductions.
- Placeholder text or unresolved template markers force an automatic `F` for that file until fixed.

## Minimum Evidence Threshold

- A file cannot score above 79 unless it includes at least 8 concrete evidence references.
- A file cannot score above 89 unless at least 4 references are line-anchored.
- If more than 30% of major claims are inferred (not directly evidenced), confidence must be `Low`.

## Grade Bands

| Score | Grade | Meaning |
| --- | --- | --- |
| 90-100 | A | Strong posture with few material gaps |
| 80-89 | B | Good posture with notable improvement areas |
| 70-79 | C | Mixed posture with meaningful weaknesses |
| 60-69 | D | Weak posture requiring clear remediation |
| 40-59 | E | High-risk posture with structural problems |
| 0-39 | F | Severe exposure or lack of verifiable controls |

## Confidence Levels

| Confidence | Meaning |
| --- | --- |
| High | Claims are backed by direct code and config evidence |
| Medium | Core claims are backed, but some important areas remain inferred or partial |
| Low | Large parts of the posture remain unknown or weakly evidenced |

## Score Caps

Apply a cap when one or more blockers exist.

| Blocking Condition | Maximum Score |
| --- | --- |
| Publicly exposed secrets or credentials | 35 |
| Verified auth bypass or broken authorization path | 45 |
| Clear sensitive-data leakage without protection | 50 |
| No meaningful evidence for a claimed control area | 60 |
| Missing remediation detail in recommendations file | 70 |

## Deduction Rules (Apply in Addition to Caps)

| Condition | Deduction |
| --- | --- |
| Claim marked `Verified` without evidence | -10 each (max -30) |
| Severity declared without impact rationale | -5 each (max -20) |
| Framework mapping without evidence linkage | -5 each (max -20) |
| Cross-file inconsistency in finding ID or severity | -10 each (max -30) |

## Recommended Dimension Patterns

### Security File

| Dimension | Weight |
| --- | --- |
| Evidence quality | 20 |
| Attack surface hygiene | 20 |
| Secure coding posture | 25 |
| Secret/configuration safety | 20 |
| Monitoring and auditability | 15 |

### Compliance File

| Dimension | Weight |
| --- | --- |
| Evidence quality | 20 |
| Control coverage | 30 |
| Gap severity | 20 |
| Privacy posture | 15 |
| Audit readiness | 15 |

### Dataflow File

| Dimension | Weight |
| --- | --- |
| Evidence quality | 20 |
| Data flow clarity | 20 |
| Sensitive-data hygiene | 25 |
| Privacy posture | 20 |
| Trust-boundary awareness | 15 |

### Recommendations File

| Dimension | Weight |
| --- | --- |
| Actionability | 25 |
| Prioritization quality | 20 |
| Score uplift realism | 20 |
| Implementation practicality | 20 |
| Evidence traceability | 15 |

## Overall Roll-Up

Recommended weighted roll-up:

| Folder | Weight |
| --- | --- |
| audit-security/ | 35 |
| audit-compliance/ | 25 |
| audit-dataflow/ | 20 |
| audit-recommendations/ | 20 |

Rules:
- If any individual file is below 50, overall maturity cannot exceed `D`.
- If confidence is low in 2 or more files, overall grade cannot exceed `C`.
- If score caps were applied in any file, mention them explicitly in the overall summary.