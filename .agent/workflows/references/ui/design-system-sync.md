# Design System Sync Reference v1.0

> Enforce UI consistency — no magic colors, no rogue spacing.
> AI MUST read design tokens BEFORE writing any UI code.

---

## 🔴 MANDATORY: Token Discovery (Before ANY UI Work)

Before writing a single CSS class or style prop, you MUST:

```
1. FIND the design token source:
   □ tailwind.config.ts / tailwind.config.js
   □ globals.css / index.css (CSS custom properties)
   □ theme.ts / tokens.ts (JS/TS theme object)
   □ _variables.scss (SASS variables)

2. READ the full token file using view_file

3. EXTRACT and memorize:
   □ Color palette (all named colors)
   □ Spacing scale (padding/margin steps)
   □ Typography scale (font sizes, weights, line heights)
   □ Border radius values
   □ Shadow definitions
   □ Breakpoint definitions
   □ Z-index layers
```

---

## Forbidden Patterns (HARD BAN)

| ❌ FORBIDDEN | ✅ USE INSTEAD |
|-------------|---------------|
| `#ff3366` (raw hex) | `text-primary` or `var(--color-primary)` |
| `#333` (unnamed gray) | `text-gray-700` or `var(--text-secondary)` |
| `rgb(23, 45, 67)` (raw rgb) | Named token from palette |
| `p-[17px]` (arbitrary value) | `p-4` (design scale step) |
| `mt-[23px]` (arbitrary margin) | `mt-6` (design scale step) |
| `text-[13px]` (arbitrary font) | `text-sm` (typography scale) |
| `rounded-[7px]` (arbitrary radius) | `rounded-lg` (radius token) |
| `shadow-[0_2px_4px...]` | `shadow-md` (shadow token) |
| `z-[999]` (arbitrary z-index) | `z-modal` (z-index layer) |
| `w-[347px]` (pixel width) | `w-full` or `max-w-sm` (responsive) |

### Exception Rule
Arbitrary values (`-[Xpx]`) are ONLY allowed when:
1. Matching a specific external design spec (Figma export)
2. The value is stored as a CSS custom property first
3. Documented with a comment explaining WHY

---

## Responsive Verification (3 Viewport Check)

Every UI component MUST be mentally verified against:

| Viewport | Width | Check |
|----------|-------|-------|
| Mobile | 375px | Touch targets ≥44px, no horizontal scroll |
| Tablet | 768px | Layout adapts, readable line length |
| Desktop | 1280px | No wasted space, proper max-width |

### Responsive Patterns
```
PREFER:
  - Fluid layouts (flex, grid) over fixed widths
  - Responsive classes (md:, lg:) over media queries
  - Container queries over viewport queries
  - min()/clamp() for fluid typography

AVOID:
  - Fixed pixel widths on containers
  - Hiding content on mobile (display:none)
  - Horizontal scrolling on any viewport
  - Text smaller than 14px on mobile
```

---

## Color Accessibility Rules

| Rule | Requirement |
|------|-------------|
| Text contrast | ≥ 4.5:1 (normal text), ≥ 3:1 (large text) |
| Interactive elements | ≥ 3:1 against background |
| Focus indicators | Visible, ≥ 3:1 contrast |
| Color-only info | NEVER rely on color alone, add icon/text |
| Dark mode | Every color must have dark mode variant |

---

## Component Style Pattern

```
When styling a NEW component:

1. READ token file (already done in Discovery step)
2. USE existing utility classes first
3. COMPOSE with consistent spacing scale
4. VERIFY against responsive viewports
5. CHECK color accessibility

When styling matches existing component:
→ COPY the pattern from the existing component
→ DO NOT invent a new style approach
```

---

## Design Drift Detection

After completing UI work, self-audit:

```
□ Every color used exists in the token file?
□ Every spacing value is from the design scale?
□ Every font size is from the typography scale?
□ No arbitrary values without documentation?
□ Dark mode works (if project uses dark mode)?
□ Mobile layout verified (no overflow)?
```

> 🔴 If ANY check fails → fix BEFORE reporting completion.
