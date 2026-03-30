# Reference: Plan Feature Templates v4.0

> Every feature in a Phase file MUST use the appropriate template.
> Template = MANDATORY skeleton. Add sections if needed, NEVER remove.

---

## Template Selection Guide

```
Feature has UI?
├── YES → Template 1 (UI/Frontend)
│        Also has API?
│        ├── YES → Template 3 (Full-stack)
│        └── NO → Template 1 only
├── Feature is API/Backend? → Template 2
├── Feature uses AI/LLM? → Template 4
├── Feature is protocol/IPC? → Template 5
└── Feature involves permissions? → Template 6

⚠️ Complex features may combine templates.
   E.g.: AI feature with UI = Template 4 + Template 1
```

---

## Template 1: 🎨 UI/Frontend Feature

```markdown
## Feature [X.Y]: [Name]

### Summary
[1-2 sentences]

### User Story
As a [role], I want to [action], so that [benefit].

### Acceptance Criteria

| # | Given | When | Then |
|:-:|-------|------|------|
| 1 | [specific condition] | [specific action] | [measurable result] |
| 2 | [error case] | [trigger] | [error handling] |
| 3 | [empty state] | [first visit] | [empty UI + CTA] |

### UI Description (MANDATORY)

```
┌───────────────────────────────────────┐
│ [Header / Navigation]                  │
│                                        │
│ [Content Area — detailed layout]       │
│ ┌──────────┐  ┌──────────┐           │
│ │ Component│  │ Component│           │
│ └──────────┘  └──────────┘           │
│                                        │
│ [Actions: buttons, links]              │
└───────────────────────────────────────┘
```

### States (MANDATORY — minimum 5)

| State | UI | User Action | Next State |
|-------|-----|-------------|-----------|
| Idle | [normal] | [click/type] | Loading |
| Loading | Skeleton shimmer | — | Success/Error |
| Success | [data displayed] | [next action] | Idle |
| Error | Toast + [Retry] btn | Retry | Loading |
| Empty | Illustration + CTA | [Create] | Loading |

### Validation Rules (if form)

| Field | Type | Required | Rules | Error Message |
|-------|------|:--------:|-------|---------------|
| email | string | ✅ | valid format | "Invalid email" |

### Edge Cases (MANDATORY ≥ 5)

| Case | Behavior |
|------|----------|
| Double-click button | Debounce, trigger once |
| Token expired | Redirect login, save draft |
| Null/undefined data | Fallback text, no crash |
| 1000+ items | Pagination or virtual scroll |
| Offline | Queue action, sync when online |
| Screen < 320px | Responsive, no broken layout |
```

---

## Template 2: ⚙️ Backend/API Feature

```markdown
## Feature [X.Y]: [Name]

### Summary
[1-2 sentences]

### Acceptance Criteria

| # | Given | When | Then |
|:-:|-------|------|------|
| 1 | [valid input] | [API call] | [200 + response] |
| 2 | [invalid input] | [API call] | [400 + error] |
| 3 | [no permission] | [API call] | [403 + message] |

### Processing Contract

| Input | Output | Side Effects |
|-------|--------|-------------|
| [params/body] | [return data] | [DB write? Event?] |

### API Contract

| Method | Path | Auth | Body | Response |
|--------|------|:----:|------|----------|
| POST | /api/v1/[resource] | ✅ | {fields} | {result} |

### Business Rules

| # | Rule | Logic |
|:-:|------|-------|
| 1 | [Rule name] | if X then Y |
| 2 | [Constraint] | limit/validation |

### Data Model

```sql
CREATE TABLE [table_name] (
  id TEXT PRIMARY KEY,
  [column] [TYPE] [CONSTRAINTS],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_[name] ON [table]([column]);
```

### Error Cases

| Error | Code | Response | Action |
|-------|------|----------|--------|
| Invalid input | 400 | "{field} invalid" | Return |
| Not found | 404 | "Not found" | Return |
| No permission | 403 | "Need role X" | Return |
| Server error | 500 | "System error" | Log |

### Edge Cases (MANDATORY ≥ 5)

| Case | Behavior |
|------|----------|
| Concurrent writes | Optimistic locking |
| Payload > 10MB | Reject with 413 |
| Rate limit exceeded | 429 + retry-after |
| DB connection lost | Retry 3x → circuit breaker |
| Null/missing fields | Validation → specific error |
```

---

## Template 3: 🔗 Full-stack Feature

> Combine Template 1 (UI sections) + Template 2 (API sections).
> Phase file MUST have BOTH: UI Description + API Contract.

---

## Template 4: 🤖 AI/LLM Pipeline Feature

```markdown
## Feature [X.Y]: [Name]

### Acceptance Criteria

| # | Given | When | Then |
|:-:|-------|------|------|
| 1 | [model available] | [task submit] | [result in < Xs] |
| 2 | [model unavailable] | [task submit] | [fallback] |
| 3 | [quality < threshold] | [after inference] | [retry/escalate] |

### AI Tier Routing

| Complexity | Tier | Model | Latency | Cost |
|-----------|:----:|-------|:-------:|:----:|
| Simple | 1 | Small (1-3B) | < 2s | $0 |
| Medium | 2 | Medium (7B) | < 5s | $0 |
| Complex | 3 | Large (32B+) | < 15s | $0 |
| Fallback | 4 | Cloud API | < 3s | $$ |

### Pipeline States

| State | Description | Transition | Timeout |
|-------|-----------|-----------|:-------:|
| Cold | Not loaded | → Loading | — |
| Loading | Loading model | → Ready/Failed | 60s |
| Ready | Available | → Inferencing | — |
| Inferencing | Processing | → Streaming/Error | 30s |
| Streaming | Sending tokens | → Complete/Timeout | 120s |

### Prompt Template

```
[System] You are...
[User] Given: {context}
Task: {task}
Return: {expected_format}
```

### Fallback Chain

```
Primary (Tier 2) → retry 1x
  → fail → Secondary (Tier 3)
    → fail → Cloud (Tier 4)
      → fail → Error: "Cannot process"
```

### Edge Cases (MANDATORY ≥ 5)

| Case | Behavior |
|------|----------|
| Model OOM | Unload others → retry |
| Hallucination | Validation → retry stricter |
| Stream interrupted | Resume from last token |
| No GPU | CPU fallback (slower) |
| User cancels | Abort + cleanup RAM |
```

---

## Template 5: 🔌 System/IPC Feature

```markdown
## Feature [X.Y]: [Name]

### Protocol Definition

| Message Type | Direction | Payload | Response |
|-------------|-----------|---------|----------|
| [type] | Client → Server | {fields} | {result} |

### Connection Lifecycle

| State | Transition | Timeout | Retry |
|-------|-----------|:-------:|:-----:|
| Disconnected | → Connecting | — | — |
| Connecting | → Connected/Failed | 10s | 3x |
| Connected | → Active | — | — |
| Reconnecting | → Connected/Failed | 5s | 5x backoff |

### Edge Cases (MANDATORY ≥ 5)

| Case | Behavior |
|------|----------|
| Connection dropped | Auto-reconnect backoff |
| Message queue full | Block sender, drain oldest |
| Protocol mismatch | Negotiate or reject |
| Payload too large | Chunk or reject > limit |
| Deadlock | Timeout + force-close |
```

---

## Template 6: 🛡️ Security/Permission Feature

```markdown
## Feature [X.Y]: [Name]

### Permission Model

| Permission | Scope | Default | Override |
|-----------|-------|:-------:|:--------:|
| [action] | [resource] | ❌ Deny | Admin |

### Security Boundary

| Layer | Protection | Implementation |
|-------|-----------|----------------|
| Transport | TLS 1.3 | [config] |
| Data at rest | AES-256 | [storage] |
| Auth | JWT / Session | [method] |

### Attack Surface

| Vector | Severity | Mitigation |
|--------|:--------:|-----------|
| [attack] | 🔴/🟡/🟢 | [defense] |

### Edge Cases (MANDATORY ≥ 5)
```
