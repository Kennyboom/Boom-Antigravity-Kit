---
description: >-
  Structured Brainstorming Engine v3 — SCAMPER ideation, user
  journey mapping, competitive analysis, decision matrix with
  weighted scoring. Explores multiple approaches before
  committing to implementation.
---

# /brainstorm — Structured Idea Exploration v3.0

$ARGUMENTS

---

## Sub-commands

```
/brainstorm [topic]          - Full structured exploration
/brainstorm:quick [topic]    - Fast 3-option comparison
/brainstorm:team [topic]     - Multi-perspective exploration
```

---

## GOLDEN RULES

```
1. NO CODE — Ideas only, implementation comes later
2. 3+ OPTIONS MINIMUM — Never present just one approach
3. HONEST TRADEOFFS — Don't hide complexity or risk
4. USER DECIDES — Present, don't dictate
5. RESEARCH FIRST — search_web for current best practices
```

---

## Phase 1: Problem Understanding

```
BEFORE generating ideas:

1. WHAT problem are we solving?
   → Core need (not symptom)

2. WHO is affected?
   → User types, stakeholders

3. WHAT constraints exist?
   → Time, budget, tech stack, team size

4. WHAT does success look like?
   → Measurable outcomes

5. WHAT has been tried before?
   → Past approaches, why they failed

Report:
  "🧠 BRAINSTORM: [Topic]
   🎯 Problem: [core need]
   👤 Users: [who]
   ⚠️ Constraints: [limits]
   📊 Success metric: [measurable outcome]"
```

---

## Phase 2: Research (MANDATORY for tech decisions)

```
For technical decisions:
□ search_web for current best practices (2025+)
□ Check ecosystem maturity (GitHub stars, npm downloads)
□ Find real-world case studies
□ Identify common pitfalls

For product decisions:
□ Competitor analysis (how do others solve this?)
□ User behavior patterns
□ Market trends
```

---

## Phase 3: SCAMPER Ideation

```
Apply SCAMPER framework to generate diverse ideas:

S — SUBSTITUTE: What can we replace?
C — COMBINE: What can we merge?
A — ADAPT: What can we borrow from elsewhere?
M — MODIFY: What can we change/enhance?
P — PUT TO OTHER USE: Can we repurpose?
E — ELIMINATE: What can we remove?
R — REVERSE: What if we flip the approach?

→ Generate at least 5 raw ideas
→ Filter to top 3 viable options
```

---

## Phase 4: Option Exploration (minimum 3)

```markdown
### Option A: [Name] — [1-line summary]

**How it works:**
[2-3 sentences explaining the approach]

**Architecture sketch:**
[ASCII diagram if applicable]

✅ Pros:
- [benefit with specifics]
- [benefit with specifics]

❌ Cons:
- [risk with mitigation]
- [risk with mitigation]

📊 Effort: [Low/Medium/High] | Risk: [Low/Medium/High]
🔧 Tech: [key technologies/libraries]
⏱️ Timeline: [estimate]
```

Repeat for Options B, C (minimum 3).

---

## Phase 5: Decision Matrix

```markdown
| Criteria (weighted) | Option A | Option B | Option C |
|---------------------|:--------:|:--------:|:--------:|
| Effort (25%) | [1-5] | [1-5] | [1-5] |
| Scalability (20%) | [1-5] | [1-5] | [1-5] |
| User Experience (20%) | [1-5] | [1-5] | [1-5] |
| Maintainability (15%) | [1-5] | [1-5] | [1-5] |
| Risk (10%) | [1-5] | [1-5] | [1-5] |
| Time to Market (10%) | [1-5] | [1-5] | [1-5] |
| **WEIGHTED TOTAL** | **[X]** | **[Y]** | **[Z]** |

🏆 Winner: Option [X] — Score: [N]/5
```

---

## Phase 6: Recommendation

```
"💡 RECOMMENDATION: Option [X]

WHY: [2-3 sentences with reasoning]

RISKS: [main risk + mitigation]

NEXT STEPS:
1. /plan [approved option]
2. /architect [detailed design]
3. /create [implementation]

What direction would you like to explore?"
```

---

## :team Variant — Multi-Perspective

```
For :team mode, explore from 3 viewpoints:

👤 USER PERSPECTIVE:
   "As a user, I would prefer... because..."

🔧 ENGINEER PERSPECTIVE:
   "Technically, the best approach is... because..."

💰 BUSINESS PERSPECTIVE:
   "For growth/cost, we should... because..."

Then synthesize into unified recommendation.
```
