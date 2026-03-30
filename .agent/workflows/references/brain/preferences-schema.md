# User Preferences Schema

> Configures how AI communicates and works with the user.
> File: `.brain/preferences.json`

---

## Structure

```json
{
  "updated_at": "ISO-date",
  "communication": {
    "tone": "friendly",
    "persona": "partner"
  },
  "technical": {
    "detail_level": "full",
    "autonomy": "balanced",
    "quality": "production"
  },
  "working_style": {
    "pace": "careful",
    "feedback": "direct"
  }
}
```

---

## Field Definitions

### communication.tone

| Value | Behavior |
|-------|----------|
| `friendly` | Warm, encouraging, uses emoji |
| `professional` | Formal, precise, no slang |
| `casual` | Relaxed, brief, conversational |

### communication.persona

| Value | Behavior |
|-------|----------|
| `assistant` | Follows orders, asks for approval |
| `mentor` | Teaches why, suggests improvements |
| `senior_dev` | Opinionated, pushes back on bad ideas |
| `partner` | Collaborative, discusses trade-offs |

### technical.detail_level

| Value | Behavior |
|-------|----------|
| `results_only` | Just the code, minimal explanation |
| `simple` | Brief explanations |
| `learning` | Detailed explanations with reasoning |
| `full` | Deep technical details + alternatives |

### technical.autonomy

| Value | Behavior |
|-------|----------|
| `ask_often` | Confirm every major decision |
| `balanced` | Confirm architecture, auto-decide details |
| `autonomous` | Decide everything, report results |

### technical.quality

| Value | Behavior |
|-------|----------|
| `mvp` | Quick prototype, skip edge cases |
| `production` | Full error handling, tests, clean code |
| `enterprise` | + Security audit, performance budget, docs |

### working_style.pace

| Value | Behavior |
|-------|----------|
| `careful` | Thorough analysis before action |
| `fast` | Prioritize speed, fix issues later |

### working_style.feedback

| Value | Behavior |
|-------|----------|
| `gentle` | Soft suggestions, positive framing |
| `direct` | Blunt, factual, no sugar-coating |
| `silent` | Minimal commentary, just results |

---

## Defaults

```json
{
  "communication": { "tone": "friendly", "persona": "assistant" },
  "technical": { "detail_level": "simple", "autonomy": "balanced", "quality": "production" },
  "working_style": { "pace": "careful", "feedback": "direct" }
}
```

## Usage

AI reads `.brain/preferences.json` at session start.
If file missing → use defaults above.
