# 5 UI States Protocol

> Every component that displays data MUST implement all 5 states.
> Referenced by `/create`, `/enhance`, and `frontend-specialist` agent.

---

## Required States (ALL data-driven components)

| # | State | Description | Example UI |
|---|-------|-------------|------------|
| 1 | **IDLE** | Initial state, no action taken | Default layout, ready |
| 2 | **LOADING** | Data is being fetched | Skeleton shimmer or spinner |
| 3 | **SUCCESS** | Data loaded and displayed | Rendered content |
| 4 | **ERROR** | Fetch or processing failed | Error message + Retry button |
| 5 | **EMPTY** | Fetch succeeded but no data | Illustration + CTA to create |

---

## Required States (ALL interactive elements)

| State | Applies To |
|-------|-----------|
| Default | All elements |
| Hover | Buttons, links, cards |
| Active/Pressed | Buttons, toggles |
| Focus (keyboard) | All focusable elements |
| Disabled | Buttons, inputs when unavailable |
| Loading | Submit buttons, async actions |
| Selected | Tabs, filters, multi-select items |

---

## Implementation Checklist

```
For each component, verify:
□ Idle state renders correctly
□ Loading shows skeleton (NOT just a spinner)
□ Success displays data with proper formatting
□ Error shows user-friendly message + Retry action
□ Empty shows illustration + clear CTA
□ All interactive elements have hover/focus states
□ Disabled state is visually distinct
```

---

## Anti-Patterns

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| Only coding the success state | All 5 states implemented |
| Generic "Loading..." text | Skeleton that matches layout |
| Console.log for errors | User-facing error + Retry |
| Blank page when no data | Empty state with guidance |
| No focus styles | Visible focus ring for a11y |
