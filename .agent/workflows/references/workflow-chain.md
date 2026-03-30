# Workflow Chain Reference v1.0

> Official routing map for AG-Kit workflows.
> AI reads this to determine the next workflow automatically.

---

## Main Pipeline

```
/init → /brainstorm → /plan → /architect → /create
                                              │
                                    ┌─────────┼──────────┐
                                    ▼         ▼          ▼
                                 /debug    /test    /enhance
                                    │         │          │
                                    └─────────┼──────────┘
                                              ▼
                              /deep-audit → /security-audit
                                              │
                                              ▼
                                   /deploy → /save
                                              │
                                     (new session)
                                              │
                                           /recap → /next
```

---

## Phase-to-Workflow Mapping

| Current Phase | Completed | Next Workflow |
|---------------|-----------|---------------|
| Nothing exists | — | `/init` or `/brainstorm` |
| Have rough idea | /brainstorm | `/plan` |
| Have specs | /plan | `/architect` |
| Have design | /architect | `/create` |
| Coding in progress | /create (partial) | `/create` (continue) |
| Coding done | /create | `/test` or `/deep-audit` |
| Tests pass | /test | `/deploy` or `/security-audit` |
| Audit pass | /deep-audit | `/deploy` |
| Deployed | /deploy | `/save` |
| New session | — | `/recap` → `/next` |

---

## Support Workflow Triggers

| Situation | Trigger Workflow |
|-----------|-----------------|
| Bug found during coding | `/debug` |
| Code quality concern | `/review` |
| Need more features | `/enhance` |
| Code is messy | `/refactor` |
| Performance issues | `/performance` |
| Security review needed | `/security-audit` |
| Need documentation | `/docs` |
| Something broke badly | `/rollback` |
| Don't know what's next | `/next` |
| End of work session | `/save` |
| Start of new session | `/recap` |

---

## Auto-Chaining Rules

After completing any workflow, AI should suggest the next one:

```
/init DONE → suggest /plan
/brainstorm DONE → suggest /plan
/plan DONE (audit pass) → suggest /architect
/architect DONE (audit pass) → suggest /create
/create DONE (audit pass) → suggest /test or /deep-audit
/test DONE (all pass) → suggest /deploy or /security-audit
/deep-audit DONE (pass) → suggest /deploy
/security-audit DONE (pass) → suggest /deploy
/deploy DONE (smoke pass) → suggest /save
/debug DONE (fixed) → return to previous workflow
/rollback DONE → suggest /debug or /deploy
/refactor DONE → suggest /test (verify no regressions)
/enhance DONE → suggest /create (implement new features)
/docs DONE → suggest /deploy or /save
```

---

## Emergency Exits

At ANY point in the chain:
- `/rollback` — if something breaks
- `/save` — if session is ending
- `/next` — if unsure what to do

---

## Quality Gate Chain

```
/plan ──── Plan Audit (5 checks) ──── PASS → /architect
/architect ── Design Audit (6 checks) ── PASS → /create
/create ── Code Audit (7 checks) ── PASS → done
/deep-audit ── Deep Audit (10 dims) ── PASS → release
/security-audit ── Security Gate (5) ── PASS → deploy
/deploy ── Smoke Tests ──────────── PASS → live

ANY gate FAIL → fix and re-run that workflow
```
