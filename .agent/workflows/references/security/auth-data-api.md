# Reference: Auth, Data Protection, API Security

> Load this file via `view_file` when running Phase 4-7
> of `/security-audit` workflow.

---

## Authentication Deep Checklist

### Password Security

```
HASHING:
□ bcrypt with rounds ≥ 10 (or argon2id)
□ NEVER: MD5, SHA1, SHA256, plain text
□ Salt: auto-generated per password (bcrypt does this)
□ Pepper: app-level secret added before hash (optional)

AUDIT:
  grep -rn "createHash\|md5\|sha1" --include="*.ts" src/
```

### JWT Security

```
TOKEN CONFIGURATION:
□ Access token: short-lived (15 minutes max)
□ Refresh token: longer (7-30 days), rotated on use
□ Algorithm: RS256 or ES256 (NOT HS256 in prod)
□ Claims: exp, iat, sub, iss (verify all)
□ Storage: httpOnly cookie (NOT localStorage)

COOKIE FLAGS:
  Set-Cookie: token=xxx;
    HttpOnly;      ← JS cannot read
    Secure;        ← HTTPS only
    SameSite=Strict; ← No CSRF
    Path=/;
    Max-Age=900;   ← 15 minutes

COMMON MISTAKES:
❌ Storing JWT in localStorage (XSS can steal it)
❌ Not validating expiration server-side
❌ Using HS256 with weak secret
❌ Not rotating refresh tokens
❌ Not invalidating on password change
```

### Login Protection

```
BRUTE FORCE:
□ Max 5 failed attempts → 15 min lockout
□ Progressive delays: 1s, 2s, 4s, 8s...
□ CAPTCHA after 3 failed attempts
□ Account lockout notification via email

CREDENTIAL STUFFING:
□ Rate limit per IP (not just per user)
□ Detect unusual login patterns
□ Notify on login from new device/location
□ Support have-i-been-pwned API check
```

### Session Management

```
□ Invalidate all sessions on password change
□ Session timeout: 30 min idle
□ Concurrent session limit (optional)
□ Logout invalidates token server-side
□ Session ID regeneration after auth level change
```

---

## Data Protection Deep Checklist

### Input Validation

```
SERVER-SIDE (MANDATORY):
□ Use validation library: zod, joi, or yup
□ Validate type, length, range, format
□ Whitelist allowed values (don't blacklist)
□ Reject early: validate before processing

EXAMPLE (Zod):
  const createUserSchema = z.object({
    email: z.string().email().max(254),
    name: z.string().min(2).max(100),
    password: z.string().min(8).max(72),
  });

COMMON MISTAKES:
❌ Client-side validation only
❌ Missing max length (memory attacks)
❌ Trusting Content-Type header
❌ Not validating file types server-side
```

### Output Encoding

```
□ HTML entities for HTML context
□ URL-encode for URL parameters
□ JSON.stringify for JSON context
□ Never render raw user content
□ Use framework auto-escaping (React JSX)

REACT SPECIFIC:
❌ dangerouslySetInnerHTML with user data
✅ {userContent} — auto-escaped by React
❌ href={userUrl} — check protocol first
✅ href={sanitizeUrl(userUrl)}
```

### File Upload Security

```
□ Validate MIME type AND file extension
□ Max file size enforced (server-side)
□ Rename uploaded files (no user-controlled names)
□ Store outside webroot (or in cloud storage)
□ No execution permissions on upload directory
□ Scan for malware (ClamAV or cloud API)
□ Generate thumbnails server-side (don't trust images)
```

### Sensitive Data

```
□ PII encrypted at rest (AES-256)
□ PII masked in logs ([email]@[domain])
□ Right to delete implementation (GDPR)
□ Data retention policy defined
□ Backup data encrypted
□ No sensitive data in error messages
□ No sensitive data in URLs
```

---

## API Security Deep Checklist

### Rate Limiting

```
TIERS:
  Global: 1000 req/min per IP
  Auth endpoints: 5 req/min per IP
  Sensitive ops: 10 req/min per user
  File upload: 5 req/min per user

HEADERS:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1234567890
  Retry-After: 60 (when limited)

IMPLEMENTATION:
  - Redis-based sliding window
  - Return 429 Too Many Requests
  - Include Retry-After header
```

### CORS Configuration

```
SECURE:
  Access-Control-Allow-Origin: https://myapp.com
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Authorization, Content-Type
  Access-Control-Allow-Credentials: true
  Access-Control-Max-Age: 86400

INSECURE (NEVER IN PROD):
❌ Access-Control-Allow-Origin: *
❌ Access-Control-Allow-Headers: *
```

### Security Headers

```
MANDATORY HEADERS:
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 0 (deprecated, use CSP)
  Content-Security-Policy: default-src 'self'
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Error Responses

```
PRODUCTION ERROR FORMAT:
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Email format is invalid"
    }
  }

NEVER EXPOSE:
❌ Stack traces
❌ Database schema
❌ Internal file paths
❌ Server software versions
❌ SQL error messages
```
