---
description: >-
  Speed Alchemist v3 — Performance budgets, frontend/backend
  profiling, 6-layer caching, bundle optimization, database
  tuning, Core Web Vitals, and CI/CD performance gates.
---

# /performance — The Speed Alchemist v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. MEASURE FIRST, OPTIMIZE SECOND — No blind optimization
2. BUDGET IS LAW — Exceeding budget = no deploy
3. REAL DATA > LAB DATA — RUM over Lighthouse
4. OPTIMIZE BOTTLENECK — Slowest part, not easiest
5. CACHE SMART — Right data, right TTL, right invalidation
```

---

## Phase 1: Performance Audit + Baseline

```
MANDATORY — scan and measure BEFORE optimizing:

1. Bundle size (JS + CSS)
2. Image count + total size
3. API endpoint count
4. Dependencies count

Baseline Report:
  "⚡ BASELINE:
   📦 Bundle: [X]KB | Images: [Y]KB | Fonts: [Z]KB
   🔌 API endpoints: [N] | Dependencies: [M]"
```

### Optimization Tracker (MANDATORY)

```markdown
| # | Optimization | Before | After | Savings | Status |
|---|-------------|:------:|:-----:|:-------:|:------:|
| 1 | [fix] | [X]KB | [Y]KB | [Z]% | ☐ |

📊 TOTAL SAVINGS: [X]KB / [Y]ms
```

---

## Phase 2: Performance Budget

```
FRONTEND:
| Metric | Budget | Tool |
|--------|:------:|------|
| LCP | < 2.5s | Lighthouse |
| INP | < 200ms | Web Vitals |
| CLS | < 0.1 | Lighthouse |
| Bundle (JS) | < 300KB gz | Analyzer |
| Bundle (CSS) | < 50KB gz | Analyzer |
| Images | < 200KB/img | ImageOptim |

BACKEND:
| API (p95) | < 500ms | Custom |
| DB query | < 100ms | EXPLAIN |
| Auth | < 200ms | Custom |

NETWORK:
| TTFB | < 600ms | DevTools |
| Total size | < 1MB | Network |
| Requests | < 30 | Network |
```

---

## Phase 3: Frontend Optimization

### Rendering
```
□ Lazy load images (loading="lazy")
□ Lazy load components (React.lazy + Suspense)
□ Virtualize long lists (react-window)
□ Skeleton loading instead of spinners
□ CSS containment where appropriate
```

### Bundle
```
□ Tree shaking enabled (ESM imports)
□ Code splitting per route
□ Dynamic imports for heavy libs
□ Analyze: npx webpack-bundle-analyzer
□ Target: < 300KB gzipped total JS
```

### Images + Media
```
□ WebP/AVIF format (80%+ savings)
□ Responsive srcset + sizes
□ Blur placeholder while loading
□ CDN for static assets
□ Font subsetting: only used characters
□ Font display: swap
```

### CSS + Animations
```
□ Critical CSS inline in <head>
□ No unused CSS (PurgeCSS)
□ GPU-accelerated animations (transform/opacity)
□ prefers-reduced-motion respect
```

### React Specific
```
□ React.memo for expensive components
□ useMemo/useCallback where MEASURED beneficial
□ Stable key props (NEVER array index)
□ No inline object/function props
```

---

## Phase 4: Backend + Database

### Database
```
□ Index ALL columns in WHERE/ORDER BY/JOIN
□ EXPLAIN ANALYZE on every query > 50ms
□ N+1 detection: log query count per request
□ Connection pooling
□ Pagination ALWAYS (no unbounded queries)
□ Avoid SELECT * — only needed columns
□ Batch operations for bulk writes
```

### API
```
□ Response compression (gzip/brotli)
□ Async for heavy tasks (queue)
□ Streaming for large responses
□ ETag/If-None-Match for conditional requests
□ Pagination + filtering + sorting
```

---

## Phase 5: 6-Layer Caching Strategy

```
| Layer | Tool | TTL | Hit Target |
|-------|------|:---:|:----------:|
| Browser | Service Worker | Variable | 80%+ |
| CDN | CloudFlare | 1 hour | 90%+ |
| API Response | TanStack Query | 5 min | 70%+ |
| Server | Redis/Memcache | 15 min | 85%+ |
| DB Query | Query cache | Auto | 60%+ |
| Computed | Memoization | Per-request | 95%+ |

Cache Headers:
  Static: max-age=31536000, immutable
  HTML: no-cache (always revalidate)
  API: max-age=0, stale-while-revalidate=60

🚫 NEVER CACHE: Auth tokens, user-specific, real-time
```

---

## Phase 6: Network Optimization

```
□ HTTP/2 or HTTP/3 enabled
□ Gzip/Brotli compression
□ DNS prefetch for external domains
□ Preconnect to critical origins
□ Preload critical assets
□ CDN for all static assets
```

---

## Phase 7: Performance Coverage Audit

> ⛔ NO report if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|:------:|
| Budget Met | All metrics within budget | ☐ |
| Frontend | Render+Bundle+Images done | ☐ |
| Backend | DB+API optimized | ☐ |
| Caching | 6 layers configured | ☐ |
```

---

## Phase 8: Performance Report

```
"⚡ PERFORMANCE REPORT
📊 Lighthouse: [N]/100
🖥️ LCP: [X]s | INP: [Y]ms | CLS: [Z]
📦 Bundle: [A]KB | Images: [B]KB
💾 API p95: [D]ms | DB avg: [E]ms
✅ Coverage Audit: ALL PASS

🏆 VERDICT: [FAST / OK / NEEDS WORK / CRITICAL]

TOP OPTIMIZATIONS:
1. [Fix] — Impact: HIGH — Savings: [X]ms
2. [Fix] — Impact: MED — Savings: [Y]KB

Next:
1. Fix issues? /create
2. Security? /security-audit
3. Deploy? /deploy"
```
