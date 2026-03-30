---
description: Production deployment with pre-flight security gate, environment configs, post-deploy verification, and rollback integration.
---

# /deploy — Production Deployment v2.0

$ARGUMENTS

---

## Sub-commands

```
/deploy            — Interactive deployment wizard
/deploy check      — Run pre-deployment checks only
/deploy preview    — Deploy to preview/staging
/deploy production — Deploy to production
/deploy rollback   — Switch to /rollback workflow
```

---

## Phase 1: Pre-Flight Security Gate (MANDATORY)

```markdown
## 🚀 Pre-Deploy Checklist

### Code Quality (ALL must pass)
- [ ] TypeScript clean: `npx tsc --noEmit` → 0 errors
- [ ] Lint clean: `npx eslint . --quiet` → 0 errors
- [ ] Tests passing: `npm test` → all green
- [ ] Build succeeds: `npm run build` → 0 errors

### Security (ALL must pass)
- [ ] No hardcoded secrets (grep for API keys, passwords)
- [ ] No console.log in production code
- [ ] Dependencies audited: `npm audit` → 0 critical
- [ ] Environment variables: all documented in .env.example
- [ ] CORS configured for production origins only
- [ ] Rate limiting enabled on auth endpoints

### Performance
- [ ] Bundle size acceptable (check build output)
- [ ] Images optimized (no 5MB PNGs)
- [ ] No unnecessary dependencies
- [ ] Lazy loading for heavy components

### Documentation
- [ ] README up-to-date
- [ ] CHANGELOG updated with new version
- [ ] API docs reflect current endpoints

⛔ ANY check fails → FIX before deploying.
```

---

## Phase 2: Environment Configuration

```
DETECT deployment target:

| Platform | Detection | Command |
|----------|-----------|---------|
| Vercel | vercel.json or .vercel/ | vercel --prod |
| Railway | railway.toml | railway up |
| Fly.io | fly.toml | fly deploy |
| Docker | Dockerfile | docker compose up -d |
| K8s | k8s/ or helm/ | kubectl apply -f k8s/ |
| AWS | serverless.yml | sls deploy --stage prod |
| Netlify | netlify.toml | netlify deploy --prod |
| Self-hosted | PM2 ecosystem | pm2 deploy production |

VERIFY environment variables:
  □ .env.production has all required vars?
  □ Secrets stored in platform's secret manager?
  □ Database connection string points to production?
  □ API URLs point to production endpoints?
```

---

## Phase 3: Deploy Execution

```
DEPLOYMENT FLOW:

┌─────────────┐
│ Pre-flight   │ ← Phase 1 checks
│ checks       │
└──────┬──────┘
       │ ALL PASS
       ▼
┌─────────────┐
│ Build        │ ← npm run build
│ application  │
└──────┬──────┘
       │ BUILD OK
       ▼
┌─────────────┐
│ Deploy to    │ ← Platform-specific command
│ platform     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Post-deploy  │ ← Phase 4 verification
│ verification │
└──────┬──────┘
       │ ALL PASS
       ▼
┌─────────────┐
│ ✅ COMPLETE  │
└─────────────┘

At ANY failure → Ask: "Run /rollback?"
```

---

## Phase 4: Post-Deploy Verification (MANDATORY)

```
SMOKE TESTS (run within 2 minutes of deploy):

□ Homepage loads? (HTTP 200)
□ Login works? (auth flow)
□ API health: GET /api/health → 200
□ Database connected? (basic query works)
□ Static assets load? (CSS, JS, images)
□ SSL certificate valid? (HTTPS works)
□ Core user flow works? (create, read, update)

MONITORING CHECK:
□ Error rate normal? (check Sentry/LogRocket)
□ Response times normal? (< 500ms for API)
□ No spike in 4xx/5xx errors?
□ Memory/CPU usage stable?
```

---

## Phase 5: Success Report

```markdown
## 🚀 Deployment Complete!

### Summary
- Version: [version from package.json]
- Environment: production
- Platform: [detected platform]
- Duration: [X] seconds
- Commit: [git hash]

### URLs
- 🌐 Production: [url]
- 📊 Dashboard: [platform dashboard url]

### What Changed
- [feat: description]
- [fix: description]

### Smoke Test Results
✅ Homepage: OK (200, 340ms)
✅ API Health: OK (200, 45ms)
✅ Auth Flow: OK
✅ Core CRUD: OK

### Rollback Available
Previous version is still available.
If issues arise → /rollback
```

### Failed Deploy Report

```markdown
## ❌ Deployment Failed

### Error
[Error description]

### Resolution
1. [Fix step]
2. Run `npm run build` locally
3. Try /deploy again

### Rollback
Previous version still active.
Run /rollback if needed.
```

---

## Exit Gate

```
□ Pre-flight checks: ALL passed?
□ Build: succeeded?
□ Deploy: completed?
□ Smoke tests: ALL passed?
□ Monitoring: no anomalies?

IF ANY fails → Do NOT mark as complete.
Offer: /rollback or /debug
```
