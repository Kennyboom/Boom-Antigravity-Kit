# Reference: OWASP Top 10 + STRIDE Deep Details

> Load this file via `view_file` when running Phase 2-3
> of `/security-audit` workflow.

---

## OWASP Top 10 (2021) — Extended Checklists

### A01: Broken Access Control

```
CHECKS:
□ Every API route has auth middleware
□ Object-level authorization (not just auth)
□ IDOR test: change resource ID → should get 403
□ Role hierarchy enforced server-side
□ Directory listing disabled
□ CORS restrictive (no *)
□ JWT claims validated on every request
□ Rate limiting on sensitive operations

COMMON VULNERABILITIES:
- Missing auth middleware on new routes
- Checking auth but not authorization
- Client-side role checks only
- Predictable resource IDs (sequential integers)

FIX PATTERNS:
- Middleware: authRequired + requireRole('admin')
- Always check: resource.userId === currentUser.id
- Use UUIDs instead of sequential IDs
```

### A02: Cryptographic Failures

```
CHECKS:
□ Password hashing: bcrypt (rounds ≥ 10) or argon2
□ NEVER: MD5, SHA1, SHA256 for passwords
□ HTTPS everywhere (no mixed content)
□ TLS 1.2+ only (no SSLv3, TLS 1.0/1.1)
□ Secrets in environment variables, NOT code
□ Database connection uses SSL
□ Cookie flags: Secure, HttpOnly, SameSite=Strict
□ No sensitive data in URLs/query strings

AUDIT COMMAND:
  grep -rn "md5\|sha1\|sha256" --include="*.ts" src/
  grep -rn "password\|secret\|api_key" --include="*.ts" src/
```

### A03: Injection

```
SQL INJECTION:
□ ORM or parameterized queries ONLY
□ No string concatenation in queries
□ NEVER: `SELECT * FROM users WHERE id = ${userId}`
□ ALWAYS: `SELECT * FROM users WHERE id = $1`, [userId]

XSS (Cross-Site Scripting):
□ Output encoding for all user data
□ No dangerouslySetInnerHTML (React)
□ CSP headers block inline scripts
□ Input sanitization with DOMPurify

COMMAND INJECTION:
□ No user input in shell commands
□ No eval() or Function() with user data
□ Whitelist allowed values, don't blacklist
```

### A04: Insecure Design

```
□ Threat model created (STRIDE)
□ Abuse cases documented per feature
□ Rate limiting designed in, not bolted on
□ Fail-safe defaults (deny by default)
□ Defense in depth (multiple layers)
```

### A05: Security Misconfiguration

```
□ Default credentials changed/removed
□ Debug mode OFF in production
□ Unused features disabled
□ Error pages don't expose stack traces
□ HTTP security headers set
□ Directory listing disabled
□ Admin panel not on default path
```

### A06: Vulnerable Components

```
COMMANDS:
  npm audit
  npx better-npm-audit audit
  npx snyk test

CHECKS:
□ 0 critical/high vulnerabilities
□ All patches applied
□ No end-of-life packages
□ lockfile committed and reviewed
```

### A07: Authentication Failures

```
□ Multi-factor authentication available
□ No default/weak passwords
□ Brute force protection (rate limit + lockout)
□ Credential stuffing protection
□ Secure password reset flow
□ Session timeout configured
□ Password complexity enforced
```

### A08: Data Integrity Failures

```
□ CI/CD pipeline secured
□ Dependencies from trusted sources
□ Code review required for merges
□ Signed commits/releases
□ No deserialization of untrusted data
```

### A09: Logging + Monitoring Failures

```
□ Authentication events logged
□ Authorization failures logged
□ Input validation failures logged
□ No sensitive data in logs (passwords, tokens, PII)
□ Log injection prevention (sanitize log input)
□ Centralized log management
□ Alerting on suspicious patterns
```

### A10: Server-Side Request Forgery (SSRF)

```
□ URL allowlist for external requests
□ Block requests to internal networks
□ No user-controlled redirect URLs
□ DNS rebinding protection
□ Response type validation
```

---

## STRIDE Threat Modeling — Per Component Template

```markdown
### Component: [Name]

| Threat | Risk | Attack Scenario | Mitigation | Status |
|--------|:----:|----------------|------------|:------:|
| **Spoofing** | 🔴/🟡/🟢 | [How attacker impersonates] | [Defense] | ☐ |
| **Tampering** | 🔴/🟡/🟢 | [How data gets modified] | [Defense] | ☐ |
| **Repudiation** | 🔴/🟡/🟢 | [How actions are denied] | [Defense] | ☐ |
| **Info Disclosure** | 🔴/🟡/🟢 | [How data leaks] | [Defense] | ☐ |
| **DoS** | 🔴/🟡/🟢 | [How service is disrupted] | [Defense] | ☐ |
| **Escalation** | 🔴/🟡/🟢 | [How privileges are gained] | [Defense] | ☐ |
```

### Example: Login Component

| Threat | Risk | Attack | Mitigation |
|--------|:----:|--------|------------|
| Spoofing | 🔴 | Credential stuffing | Rate limit + MFA |
| Tampering | 🟡 | Modify login request | HTTPS + server validate |
| Repudiation | 🟡 | Deny login attempt | Audit logs with IP |
| Info Disclosure | 🟡 | "User not found" vs "Wrong password" | Generic error msg |
| DoS | 🔴 | Flood login endpoint | Rate limit 5/min/IP |
| Escalation | 🔴 | SQL injection in credentials | Parameterized queries |
