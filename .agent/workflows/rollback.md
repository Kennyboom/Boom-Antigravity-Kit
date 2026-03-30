---
description: Emergency recovery when things break. Rollback code, deployments, or database changes with severity-based protocols.
---

# /rollback — Emergency Recovery Commander v1.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. STAY CALM — Panic causes mistakes
2. ASSESS BEFORE ACT — Severity first, action second
3. BACKUP BEFORE ROLLBACK — Always
4. ROLLBACK BEFORE DEBUG (P0/P1) — Uptime first
5. NOTIFY TEAM — Transparency is key
6. POST-MORTEM — Every P0/P1 must have lessons learned
```

---

## Phase 1: Incident Assessment

```
"⏪ EMERGENCY RECOVERY — Assessing situation now.

1️⃣ WHAT BROKE?
   A) App won't load (blank page / 500 error)
   B) Recent deploy broke something
   C) Database issue (data loss / query errors)
   D) Code changes broke local development
   E) Other — describe the issue

2️⃣ WHO IS AFFECTED?
   A) Just me (development)
   B) Team (staging)
   C) Customers (production) ← HIGHEST PRIORITY"
```

### Severity Classification

| Level | Name | Target | Action |
|:-----:|------|--------|--------|
| 🔴 P0 | CRITICAL | < 15 min | Rollback NOW, investigate LATER |
| 🟠 P1 | HIGH | < 30 min | Quick assess, rollback if needed |
| 🟡 P2 | MEDIUM | < 1 hour | Debug first, rollback if stuck |
| 🟢 P3 | LOW | When free | Use /debug instead |

---

## Phase 2: Recovery Options

### 2.1 Local Development Rollback

```
A) Rollback SPECIFIC FILE
   → git checkout -- [file]

B) Rollback ALL uncommitted changes
   → git stash (keeps changes for later)

C) Rollback to SPECIFIC COMMIT
   → git log --oneline -10
   → git revert [commit-hash]

D) Don't rollback — fix instead
   → Switch to /debug
```

### 2.2 Production Rollback

```
VERCEL:
  □ vercel rollback [deployment-url]
  □ Or: Dashboard → Deployments → Promote previous
  □ Instant rollback (< 5 seconds)

RAILWAY:
  □ railway environment rollback
  □ Or: Dashboard → Deployments → Redeploy previous

DOCKER:
  □ docker compose down
  □ docker compose -f docker-compose.previous.yml up -d
  □ Or: docker tag app:previous app:latest && docker compose up -d

KUBERNETES:
  □ kubectl rollout undo deployment/[app-name]
  □ kubectl rollout status deployment/[app-name]
  □ Verify: kubectl get pods (all Running?)

PM2 (Node.js):
  □ pm2 deploy production revert 1

GIT-BASED CI/CD:
  □ git revert HEAD
  □ git push (triggers new deploy with old code)
```

### 2.3 Database Rollback

```
⚠️ DANGEROUS — Backup current state FIRST!

A) Revert latest migration
   → prisma migrate reset (careful!)
   → npm run migrate:rollback
   → Reverts ONLY the most recent migration

B) Restore from backup
   → pg_restore -d [db_name] [backup_file]
   → ⚠️ Data since backup will be LOST

C) Point-in-time recovery (managed DBs)
   → AWS RDS / Supabase / PlanetScale support this
   → Restore to exact timestamp

⚠️ ALWAYS:
  □ Backup before restore
  □ Test on staging first
  □ Notify team before touching production DB
```

---

## Phase 3: Execution Protocol

```
ROLLBACK STEPS (in order):
1. ✅ BACKUP current state (git stash / db dump)
2. ✅ Notify team (if production)
3. ✅ Execute rollback command
4. ✅ Verify: App loads?
5. ✅ Verify: Data integrity OK?
6. ✅ Verify: Core functions work?
7. ✅ Notify: "System restored"
```

---

## Phase 4: Post-Rollback Verification

```
HEALTH CHECK:
□ App loads? (homepage, login page)
□ Core actions work? (CRUD operations)
□ API health: GET /api/health → 200?
□ Database queries executing?
□ No data loss? (check row counts)
□ Error monitoring: back to normal?
```

---

## Phase 5: Post-Mortem (MANDATORY for P0/P1)

```markdown
## Incident Report
Date: [date] | Severity: [P0/P1/P2]
Duration: [X] minutes downtime
Affected: [N] users

## Timeline
[HH:MM] Issue detected
[HH:MM] Investigation started
[HH:MM] Root cause identified
[HH:MM] Rollback executed
[HH:MM] System restored

## Root Cause
[What actually went wrong]

## What Went Well
- [Positive 1]

## What Went Wrong
- [Improvement 1]

## Action Items (prevent recurrence)
□ [Prevention action 1]
□ [Prevention action 2]
```

---

## Phase 6: Handover

```
⏪ RECOVERY COMPLETE!

📊 Results:
  ✅ System: Online
  ✅ Severity: [P0-P3]
  ✅ Downtime: [X] minutes
  ✅ Data integrity: OK
  ✅ Post-mortem: [Done/Needed]

Next steps:
  1. /debug — Find root cause
  2. /test — Verify everything works
  3. /deploy — Redeploy (after fix)
  4. /save — Persist context
```
