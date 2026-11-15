# SECURITY.md — OneDrop E-Commerce

> Security state as of 2026-08-19 initial audit.
> ⚠️ Never place real secrets in this file.

---

## Authentication Security

### Status: Partially Secure

| Check                          | Status | Notes |
|-------------------------------|--------|-------|
| Passwords hashed with bcrypt  | ✅ PASS | 12 salt rounds |
| Plaintext passwords never stored | ✅ PASS | |
| Passwords not returned in API | ✅ PASS | `select: false` in schema |
| JWT secret in env var         | ⚠️ RISK | Secret is weak (`secrectKey123`) — must be replaced |
| JWT expiration configured     | ✅ PASS | 7 days |
| JWT verified on every request | ✅ PASS | `protectRoute` middleware |
| Expired tokens rejected       | ✅ PASS | `TokenExpiredError` handled |
| Invalid tokens rejected       | ✅ PASS | `JsonWebTokenError` handled |
| Logout clears cookie          | ✅ PASS | `clearCookie` with matching options |
| Auth middleware consistent    | ✅ PASS | All protected routes use `protectRoute` |

---

## Critical Security Issues (Must Fix)

### 🔴 SEC-001: Weak JWT Secret [CRITICAL]
- **Issue**: `JWT_SECRET=secrectKey123` — trivially guessable, committed to `.env`
- **Risk**: Attacker can sign arbitrary JWTs and impersonate any user, including admins
- **Fix**: Generate a cryptographically strong secret (min 64 characters, random):
  ```
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  Update in backend `.env` only. Never commit the real secret.

### 🔴 SEC-002: Role Injection on Signup [CRITICAL]
- **Issue**: `auth.controller.js` line 35: `role: role || 'user'` uses `role` from `req.body`
- **Risk**: Any user can POST `{"fullName":"...","email":"...","password":"...","role":"admin"}` and become an admin
- **Fix**: Remove `role` from destructured body params in `signUp`. Always default to `'user'`.
  ```js
  const { fullName, email, password } = req.body; // remove role
  // then:
  role: 'user', // hardcoded, never from client
  ```

### 🔴 SEC-003: `.env` Exposed in Git [CRITICAL]
- **Issue**: No `backend/.gitignore` file exists — `backend/.env` contains real DB credentials and JWT secret
- **Risk**: If repository is pushed to any remote (GitHub, etc.), credentials are exposed
- **Fix**: Create `backend/.gitignore` with at minimum:
  ```
  .env
  node_modules/
  uploads/
  ```
- **Also**: Create `backend/.env.example` with placeholder values only

---

## High Security Issues

### 🟠 SEC-004: Unsanitized Sort Parameter [HIGH]
- **Issue**: `admin.controller.js` — `sort = '-createdAt'` from `req.query.sort` passed directly to `.sort()`
- **Risk**: MongoDB operator injection through sort field
- **Fix**: Whitelist allowed sort values:
  ```js
  const ALLOWED_SORTS = ['-createdAt', 'createdAt', 'price', '-price', 'title', '-title'];
  const safeSort = ALLOWED_SORTS.includes(sort) ? sort : '-createdAt';
  ```

### 🟠 SEC-005: `getUsers` Returns Sensitive Fields [HIGH]
- **Issue**: `auth.controller.js` — `User.find({}).sort(...)` returns all user fields (though password is select:false, `createdAt`, `updatedAt`, `bio`, etc. all exposed)
- **Risk**: Information disclosure; admin panel leaks full user details
- **Fix**: Use `.select('fullName email role profilePic createdAt')` — explicit projection

### 🟠 SEC-006: File MIME Type Trust [HIGH]
- **Issue**: `upload.middleware.js` validates `file.mimetype` only — set by browser/client, not verified against actual file content
- **Risk**: Attacker can send a malicious file (e.g., PHP script) with `mimetype: 'image/jpeg'`
- **Fix**: Implement magic number validation using `file-type` library, OR use file extension cross-check. Also rename files to never preserve original extension without validation.
- **Current partial mitigation**: Multer filename uses `path.extname(file.originalname).toLowerCase()` — extension from original name (client-controlled)

### 🟠 SEC-007: CORS Not Configured for Production [HIGH]
- **Issue**: `ALLOWED_ORIGINS` env var not set — defaults to `http://localhost:5173,http://localhost:5174`
- **Risk**: In production, API will reject requests from the actual frontend domain
- **Fix**: Set `ALLOWED_ORIGINS=https://yourdomain.com` in production `.env`

---

## JWT Configuration

| Setting   | Value        | Recommended | Notes |
|-----------|-------------|-------------|-------|
| Algorithm | HS256 (default) | HS256 or RS256 | Current is acceptable |
| Expiry    | 7 days       | 1-7 days    | Acceptable for e-commerce |
| Storage   | HTTP-only cookie | ✅ Correct | |
| Secret    | `secrectKey123` | 64+ random hex chars | ⚠️ MUST CHANGE |

---

## Cookie Configuration

| Setting   | Dev Value | Prod Value | Correct? |
|-----------|-----------|-----------|---------|
| httpOnly  | true      | true      | ✅ |
| secure    | false     | true      | ✅ |
| sameSite  | 'lax'     | 'strict'  | ✅ |
| path      | /         | /         | ✅ |
| maxAge    | 7 days    | 7 days    | ✅ |
| domain    | not set   | not set   | ✅ (defaults to current host) |

---

## CORS

| Setting         | Current Value          | Correct? |
|----------------|----------------------|---------|
| origin          | `ALLOWED_ORIGINS` (comma-separated env var) | ✅ (when env set) |
| credentials     | true                 | ✅ |
| Wildcard `*`   | Not used             | ✅ |

---

## CSRF Risk

- Cookie `sameSite: 'strict'` (production) mitigates most CSRF attacks
- Application currently has no state-changing GET requests — safe
- No separate CSRF token implemented
- **Assessment**: With SameSite=Strict, traditional CSRF risk is low for same-site deployments. Acceptable for current architecture.

---

## Helmet (Security Headers)

Helmet is configured with defaults. Current default Helmet 8.x headers include:
- `X-DNS-Prefetch-Control`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `X-XSS-Protection: 0` (modern approach — relies on CSP)
- Content Security Policy: **NOT configured** (Helmet default is permissive) — ⚠️ Review

---

## Rate Limiting

| Limit    | Scope     | Config                | Adequate? |
|----------|----------|-----------------------|---------|
| 100/15min | /api/*  | Global for all API    | ⚠️ Not enough — auth endpoints should be stricter |

**Recommendation**: Add separate tighter limits for:
- `POST /api/auth/login` — e.g., 10 attempts / 15 min per IP
- `POST /api/auth/signup` — e.g., 5 attempts / hour per IP

---

## Input Validation

| Area           | Status | Notes |
|---------------|--------|-------|
| Signup        | ⚠️ Partial | Basic checks; no email format validation beyond schema regex |
| Login         | ✅ Pass | Required fields checked |
| Product Create | ⚠️ Partial | Required fields checked; no price range limit |
| Sort param    | ❌ Fail | Unsanitized |
| Page/limit param | ⚠️ Partial | Converted to Number; no min/max bounds enforced |
| File uploads  | ⚠️ Partial | MIME type checked; content not verified |
| Profile update | ✅ Pass | Email uniqueness, required fields checked |

---

## NoSQL Injection

| Protection           | Status | Notes |
|---------------------|--------|-------|
| express-mongo-sanitize | ✅ Active | Strips `$` from request body/query/params |
| Manual sort whitelist | ❌ Missing | T-005 |
| Mongoose typed schemas | ✅ Active | Types enforce basic type safety |

---

## Authorization

| Check                     | Status | Notes |
|--------------------------|--------|-------|
| Admin routes use adminOnly | ✅ | `/api/admin/dashboard`, `/api/admin/listing` |
| Product listing unprotected | ❌ | `/api/admin/products` uses only `protectRoute` |
| Users cannot change their role | ❌ | Signup role injection (SEC-002) |
| User can only update own profile | ✅ | Uses `req.user._id` not `req.params.userId` |
| IDOR in updateProfile route | ⚠️ | Route param `:userId` exists but not used — logic uses `req.user._id` (safe) |

---

## Secret Management

| Secret         | Location          | Committed? | Risk |
|---------------|-------------------|-----------|------|
| MongoDB URI    | backend/.env      | Likely yes | 🔴 Critical |
| JWT_SECRET    | backend/.env      | Likely yes | 🔴 Critical |

**Immediate action required**: Rotate MongoDB credentials and JWT secret after fixing .gitignore.

---

## Known Vulnerabilities

| ID     | Severity | Issue | Status |
|--------|---------|-------|--------|
| SEC-001 | Critical | Weak JWT secret | TODO (T-002) |
| SEC-002 | Critical | Role injection on signup | TODO (T-001) |
| SEC-003 | Critical | .env in git | TODO (T-003) |
| SEC-004 | High | Unsanitized sort param | TODO (T-005) |
| SEC-005 | High | getUsers info disclosure | TODO (T-006) |
| SEC-006 | High | MIME-only file validation | TODO |
| SEC-007 | High | CORS not set for production | TODO (T-013) |

---

## Resolved Vulnerabilities

*None yet — audit just completed.*

---

## Remaining Risks After P0 Fixes

- Local file storage (not scalable, no CDN, direct URL exposure)
- No CSP configured in Helmet
- No separate rate limits for auth endpoints
- No automated security scanning (npm audit) in CI/CD

---

*Update this document whenever security vulnerabilities are found or fixed.*
