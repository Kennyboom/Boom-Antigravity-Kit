# 🎯 SKILLS

> **LOAD**: When skill resolution needed | **PURPOSE**: Hybrid Skill Orchestration Layer (HSOL)

---

## OVERVIEW

Skills = Domain knowledge modules in `{SKILLS_PATH}/`.

**Two sources**:
1. **Matrix Skills** — Pre-curated in `matrix-skills/*.yaml` (fast, trusted)
2. **Dynamic Skills** — Community skills via `find-skills` (on-demand)

---

## RESOLUTION ALGORITHM

```
1. PARSE agent profile from frontmatter
2. LOAD inherited domains from matrix-skills/_index.yaml
3. FILTER skills by relevance_mapping
4. APPLY priority thresholds (critical≥9, core≥7, minimum≥5)
5. CALCULATE fitness scores
6. RETURN sorted skill set
```

### Fitness Calculation

```
fitness = 0.35 × SEMANTIC_MATCH
        + 0.25 × SPECIFICITY
        + 0.25 × TRUST_LEVEL
        + 0.15 × RECENCY

Matrix skills: trust = 1.0 (always trusted)
Dynamic skills: trust = 0.3 - 1.0 (based on history)
```

---

## SKILL DECISION FLOW

### By Variant

| Variant | Discovery |
|---------|-----------|
| `fast` | **Skip** — use matrix only |
| `hard`, `focus` | Check matrix fitness, may trigger discovery |

### By Matrix Fitness

| Fitness | Action |
|---------|--------|
| ≥ 0.8 | Execute with matrix (skip discovery) |
| 0.75-0.8 | **Async**: Execute with matrix, surface recommendation later |
| < 0.75 | **Blocking**: Wait for discovery → install → execute with new skill |

---

## TRUST PROGRESSION LIFECYCLE

```
NEW (0.3)        ──▶  EVALUATING (0.5)  ──▶  VALIDATED (0.7)  ──▶  PROMOTED (1.0)
    │                    │                     │                     │
    └─ 3 successful      └─ 10 successful      └─ Auto-promote       └─ Added to
       executions           executions           to matrix              matrix-skills
```

**Promotion criteria**:
- execution_count ≥ 10
- success_rate ≥ 0.85
- last_used_within_days ≤ 30
- no_security_flags: true

---

## DYNAMIC DISCOVERY (find-skills)

### Trigger

```bash
npx skills find "{keywords}"
```

### Install (always use -g -y for current tool)

```bash
npx skills add {owner/repo@skill} -g -y
```

### When to confirm

- **Confirm required**: Low trust (new skill) + needed for current task (fitness < 0.75)
- **No confirm**: Trusted skill OR optional enhancement

---

## AGENT SKILLS SECTION FORMAT

Agents don't list individual skills. They reference HSOL:

```markdown
## ⚡ Skills

> **MATRIX DISCOVERY**: Auto-injected from `matrix-skills/`
> Profile: `{domain}:{category}` | Domains: `{inherit_from}`
```

---

## ADDING NEW SKILLS

```
1. Create: {SKILLS_PATH}/{skill-id}/SKILL.md
2. Add to: matrix-skills/{domain}.yaml
3. Do NOT edit agent files (skills resolved by profile)
```

---

## PRIORITY GUIDE

| Score | Category | Usage |
|-------|----------|-------|
| 10 | Critical | Always required |
| 9 | Core | Standard for domain |
| 8 | Expert | Specialized but common |
| 7 | Core | Useful in most contexts |
| 5-6 | Utility | Context-dependent |
| 1-4 | Rare | Edge cases |

---

## EDGE CASES

| Scenario | Action |
|----------|--------|
| Network timeout | Proceed with matrix only, log timeout |
| find-skills unavailable | Use matrix + installed dynamics only |
| No skills found | Report gap, use general capabilities |
| Installation fails | Rollback, report, offer matrix alternative |
| Low trust + task-critical | **Confirm with user before install** |

```
IF no_relevant_skills:
  1. Acknowledge: "No specialized skill found for {topic}"
  2. Offer: "I can proceed with general capabilities"
  3. Suggest: "You could create your own: npx skills init {name}"
```

---

## QUICK REFERENCE

### Browse skills
```
https://skills.sh/
```

### Commands
```bash
npx skills find "query"           # Search
npx skills add X -g -y            # Install global, no confirm
npx skills check                  # Check updates
npx skills update                 # Update all
```
