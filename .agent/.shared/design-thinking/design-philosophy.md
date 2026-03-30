# Design Thinking Reference

> Extracted from frontend-specialist agent.
> Shared resource for design decision-making.
> Referenced by `frontend-specialist` and any UI-focused workflow.

---

## Self-Questioning Process (Internal Analysis)

Before any design work, answer internally:

```
🔍 CONTEXT ANALYSIS:
├── Sector? → What emotions should it evoke?
├── Target audience? → Age, tech-savviness, expectations?
├── Competitors? → What should I NOT do?
└── Soul of this site? → In one word?

🎨 DESIGN IDENTITY:
├── What makes this design UNFORGETTABLE?
├── What unexpected element can I use?
├── How do I avoid standard layouts?
├── 🚫 CLICHÉ CHECK: Bento Grid? Mesh Gradient? → CHANGE!
└── Will I remember this design in a year?

📐 LAYOUT HYPOTHESIS:
├── How can the Hero be DIFFERENT?
├── Where can I break the grid?
├── Which element can be in unexpected place?
└── Can Navigation be unconventional?

🎭 EMOTION MAPPING:
├── Primary emotion: [Trust/Energy/Calm/Luxury/Fun]
├── Color implication: [Blue/Orange/Green/Black-Gold/Bright]
├── Typography: [Serif=Classic, Sans=Modern, Display=Bold]
└── Animation: [Subtle=Professional, Dynamic=Energetic]
```

---

## Modern Cliché Scan (Anti-Safe Harbor)

These patterns are FORBIDDEN as defaults:

| # | Cliché | Why It Fails |
|---|--------|-------------|
| 1 | Standard Hero Split (left text / right image) | Most overused layout |
| 2 | Bento Grids | Only for complex data, not landing pages |
| 3 | Mesh/Aurora Gradients | Floating colored blobs = generic |
| 4 | Glassmorphism | Blur + thin border = AI cliché |
| 5 | Deep Cyan / Fintech Blue | "Safe" palette = forgettable |
| 6 | Generic Copy | "Orchestrate", "Empower", "Elevate" |

---

## Layout Alternatives

| Pattern | Description |
|---------|-------------|
| Massive Typographic Hero | 300px+ headline, visual behind text |
| Center-Staggered | Each element different alignment |
| Layered Depth (Z-axis) | Overlapping visuals for depth |
| Vertical Narrative | No hero, immediate vertical flow |
| Extreme Asymmetry (90/10) | Everything to one edge |

---

## Design Commitment Format

Present to user before coding:

```markdown
🎨 DESIGN COMMITMENT: [Style Name]

- Topological Choice: [How I broke standard layout]
- Risk Factor: [What might be "too far"]
- Readability Conflict: [Intentional challenges]
- Cliché Liquidation: [Safe Harbor elements I killed]
```

---

## Visual Style Rules

### Geometry (MANDATORY decision)

| Style | Border Radius | When to Use |
|-------|:------------:|-------------|
| Sharp/Crisp | 0-2px | Tech, Luxury, Brutalist |
| Safe Zone | 4-8px | ⚠️ AVOID — looks generic |
| Friendly/Soft | 16-32px | Social, Lifestyle, Bento |

### Animation (MANDATORY)

| Layer | Requirement |
|-------|-------------|
| Reveal | Scroll-triggered entrance animations |
| Micro-interactions | Hover/click feedback on every element |
| Spring Physics | Organic feel, not linear |

### Performance

| Rule | Implementation |
|------|---------------|
| GPU-accelerated only | `transform`, `opacity` |
| Strategic will-change | Heavy animations only |
| Reduced motion | `prefers-reduced-motion` MANDATORY |

---

## Purple Ban

> ❌ **NEVER** use purple, violet, indigo, or magenta as primary
> color unless explicitly requested.
> Purple is the #1 AI design cliché.

---

## Reality Check (Before Delivery)

| Test | FAIL Answer | PASS Answer |
|------|-------------|-------------|
| Template Test | "It's clean..." | "No way this is a template" |
| Dribbble Test | "Professional..." | "I'd stop scrolling" |
| Memory Test | "It's... corporate" | "Brutalist with aurora accents" |
