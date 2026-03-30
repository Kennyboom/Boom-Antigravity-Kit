---
description: >-
  Fortress Builder v3 — OWASP Top 10 scan, STRIDE Threat Modeling,
  Auth/Authorization audit, Data Protection, API Security,
  Frontend/Infrastructure hardening, Supply Chain, and Zero Trust.
  Creates Security Report with severity scoring.
---

# /security-audit — The Fortress Builder v3.0

$ARGUMENTS

---

## GOLDEN RULES

```
1. THINK LIKE A HACKER — "If I wanted to hack this, I would..."
2. DEFENSE IN DEPTH — Multiple protection layers
3. LEAST PRIVILEGE — Grant minimum permissions
4. VALIDATE EVERYTHING — Server-side, always
5. ENCRYPT EVERYTHING — At rest + in transit
6. LOG EVERYTHING — But never log sensitive data
```

---

## Phase 1: Context + Codebase Scanner

### 1.1 Auto-Scope (MANDATORY)

```
1. Read source code → count files, endpoints, routes
2. Read package.json → dependencies
3. Read .env.example → environment variables
4. Read DESIGN.md → architecture

Report:
  "🔐 Found:
   [X] API endpoints | [Y] source files
   [Z] dependencies | [W] env variables

   Starting Full Audit."
```

### 1.2 Audit Tracker (MANDATORY)

```markdown
| # | File/Endpoint | Category | Findings | Severity |
|---|--------------|----------|----------|----------|
| 1 | /api/auth | Auth | [finding] | 🔴 |
| 2 | ProfileForm | XSS | None | 🟢 |

📊 AUDIT: 5/15 files scanned (33%)
```

---

## Phase 2: OWASP Top 10 Scan

> 🚨 MUST `view_file` this reference BEFORE Phase 2:
> `.agent/workflows/references/security/owasp-stride.md`

```
A01: Broken Access Control
  □ IDOR: Change user_id in URL → see other's data?
  □ Horizontal: User A sees User B data?
  □ Vertical: Regular user does Admin actions?

A02: Cryptographic Failures
  □ Passwords: bcrypt/argon2 (NOT MD5/SHA1)?
  □ Data at rest encrypted (AES-256)?
  □ HTTPS everywhere?
  □ Secrets hardcoded in code?

A03: Injection
  □ SQL: Parameterized queries / ORM?
  □ XSS: Output encoding?
  □ OS Command: No user input in shell?

A05: Security Misconfiguration
  □ Default credentials removed?
  □ Debug mode OFF in production?
  □ Error messages don't leak internals?

A06: Vulnerable Components
  □ npm audit → 0 critical, 0 high?

A07: Auth Failures
  □ Brute force protection?
  □ Weak password allowed?

A09: Logging Failures
  □ Failed login logged?
  □ No sensitive data in logs?

A10: SSRF
  □ User-supplied URLs validated?
```

---

## Phase 3: STRIDE Threat Modeling

```markdown
Per component, analyze 6 threats:

| Threat | Description | Example | Mitigation |
|--------|------------|---------|------------|
| Spoofing | Impersonation | Fake login | MFA, JWT |
| Tampering | Data modification | Edit price | Server validation |
| Repudiation | Deny action | "I didn't buy" | Audit logs |
| Info Disclosure | Leak data | Error shows DB | Error filtering |
| DoS | Crash service | 10K req/sec | Rate limiting |
| Escalation | Gain privilege | User → Admin | RBAC strict |
```

---

## Phase 4: Authentication Audit

> 🚨 MUST `view_file` this reference BEFORE Phase 4:
> `.agent/workflows/references/security/auth-data-api.md`

```
□ Password: bcrypt rounds ≥ 10 or argon2
□ JWT: httpOnly, secure, sameSite=strict
□ Token expiry: Access 15min + Refresh 7 days
□ Refresh token rotation (single use)
□ Rate limit login: 5 attempts → lockout 15min
□ Password requirements: ≥ 8 chars, mixed case + number
□ Session invalidation on password change
```

---

## Phase 5: Authorization Audit

```
□ RBAC: Admin > Manager > User roles defined
□ EVERY API checks permissions (middleware)
□ No object-level access bypass (IDOR protection)
□ Admin routes separated + double-checked
□ Cannot escalate own role
□ API keys scoped with minimal permissions
```

---

## Phase 6: Data Protection

```
□ HTTPS everywhere (no mixed content)
□ No secrets in code/git (truffleHog/gitleaks)
□ Input validation on SERVER (never trust client)
□ Output encoding (XSS prevention)
□ File upload: type + size check + no execution
□ Database: parameterized queries ONLY
□ Sensitive data: encrypt at rest (AES-256)
□ .env.example without real values committed
```

---

## Phase 7: API Security

```
□ Auth on every non-public endpoint
□ Rate limiting: per endpoint + per user + per IP
□ Input validation: zod/joi schema
□ Output filtering: no internal data leaking
□ CORS: explicit origin whitelist (no wildcard *)
□ No verbose errors in production
□ Request size limit (body + file upload)
□ Pagination enforced (no unbounded queries)
□ HTTPS only (redirect HTTP → HTTPS)
```

---

## Phase 8: Frontend + Infrastructure

```
FRONTEND:
□ XSS: No dangerouslySetInnerHTML
□ CSP headers configured
□ No secrets in client-side code
□ Secure cookie flags (httpOnly, secure, sameSite)

INFRASTRUCTURE:
□ Security headers: HSTS, X-Frame-Options
□ Database not publicly accessible
□ Firewall: only needed ports open
□ Logging: no sensitive data in logs
```

---

## Phase 9: Supply Chain + Zero Trust

```
DEPENDENCIES:
□ npm audit → 0 critical, 0 high
□ Lock file committed (package-lock.json)
□ No wildcard versions
□ Automated: Dependabot/Renovate

ZERO TRUST:
□ Verify explicitly: every request authenticated
□ Least privilege: minimal permissions
□ Assume breach: defense in depth
```

---

## Phase 10: Security Coverage Audit (MANDATORY)

> ⛔ NO report if audit FAILS.

```markdown
| Check | Requirement | Status |
|-------|-------------|--------|
| OWASP Coverage | 10/10 categories checked | ☐ |
| STRIDE Coverage | All components modeled | ☐ |
| File Coverage | 100% files audited | ☐ |
| Dependencies | npm audit 0 critical | ☐ |
| Secrets | No hardcoded secrets | ☐ |

IF any FAIL → fix before writing report.
```

---

## Phase 11: Security Report + Handover

```
🔐 SECURITY REPORT
🔴 Critical: [X] | 🟡 High: [Y] | 🟠 Medium: [Z]
📊 Security Score: [N]/100

OWASP: 10/10 | STRIDE: [Y] components
File Coverage: 100% | Audit: ALL PASS

TOP ISSUES:
1. [Issue] — CRITICAL — Fix: [solution]
2. [Issue] — HIGH — Fix: [solution]

Next:
1. Fix security issues? /create
2. Performance? /performance
3. Deploy? /deploy
```
