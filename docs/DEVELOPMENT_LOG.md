# DEVELOPMENT_LOG.md — OneDrop E-Commerce

> Chronological session history for developer/AI continuity.

---

## Session 001 — 2026-08-19

**Task**: Full production readiness audit (Phases 1-36)  
**Duration**: ~1 hour  
**Performed by**: AI Audit (Senior Engineer Mode)

---

### Scope

Inspected every file in the repository:
- Backend: `main.js`, `server.js`, `app.js`, `config/env.js`, `config/db.js`, `controllers/*`, `middleware/*`, `models/*`, `routes/*`, `utils/jwt.js`, `.env`, `package.json`
- Frontend: `App.jsx`, `AppRoutes.jsx`, `axios.js`, `ProtectedRoute.jsx`, `useAuthStore.js`, `useCartStore.js`, `useProductStore.js`, all pages, `ListingPage.jsx`, `AdminHome.jsx`, `Login.jsx`, `package.json`, `.env`

---

### Findings Summary

#### 🔴 Critical (P0) — 6 issues

1. **Role injection on signup** — `role` from `req.body` directly sets user role; anyone can become admin
2. **Weak JWT secret** — `JWT_SECRET=secrectKey123` is trivially guessable; committed to `.env`
3. **No `.gitignore` for backend** — Real MongoDB credentials and JWT secret likely tracked by git
4. **Wrong API URLs in admin components** — `ListingPage.jsx` and `AdminHome.jsx` call `/adminAuth/*` which doesn't exist; admin features completely broken
5. **Unsanitized sort parameter** — `req.query.sort` passed directly to MongoDB `.sort()` → injection risk
6. **`getUsers` returns all user fields** — information disclosure; no explicit field projection

#### 🟠 High (P1) — 11 issues

1. Product listing requires authentication — unauthenticated users cannot browse shop
2. Cart `removeFromCart` uses `item.id` but MongoDB documents use `item._id` — remove silently fails
3. No Order model — orders cannot be persisted
4. Checkout is non-functional (mock `alert()` only)
5. No product update/delete endpoints
6. CORS not configured for production (defaults to localhost)
7. Global `quantity` state in cart store causes cross-product state issues
8. `bcrypt` and `bcryptjs` both installed (duplicate)
9. `body-parser` installed but redundant with Express 4
10. No server-side price validation at checkout
11. `ALLOWED_ORIGINS` not set in production env

#### 🟡 Medium (P2) — 12 issues

- Filter/Sort UI buttons are visual-only (non-functional)
- No server-side pagination (default limit: 50 products)
- `rating` and `reviews` fields in ProductPage but missing from product schema
- No Axios 401 interceptor (stale session not handled)
- No health check endpoint
- No `.env.example` files
- `console.log` in production code (stores, admin components)
- No quantity update in cart page (only add/remove)
- Broken image URL in Home.jsx hero (Unsplash page URL, not direct image)
- Unbounded `getUsers` query without pagination
- No max quantity per item check
- No text search index on product title

#### 🔵 Low (P3) — 10 issues

- Inconsistent currency symbols (RS., RS, $)
- No `prefers-reduced-motion` CSS rule
- Missing `aria-label` on icon buttons
- No skeleton loaders
- Alt text review needed
- Local file upload storage (not production-scalable)
- No structured logging
- Possible unused `ShoppingCart.jsx` (duplicate of Cart.jsx)
- No Docker/deployment configuration
- No separate rate limits for auth endpoints

---

### Root Cause Analysis

The application is built by a developer actively learning full-stack development. The architecture choices are good (JWT in httpOnly cookies, Zustand, Vite) but several classic beginner mistakes exist:

1. **Copy-paste error** — Admin API paths changed (from `adminAuth` to `admin`) but components weren't updated
2. **Development shortcuts** — Weak JWT secret, mock checkout, visual-only filters
3. **Missing basics** — No `.gitignore`, no `.env.example`, no real order system
4. **Schema/UI divergence** — Rating/reviews added to UI but not to MongoDB schema

---

### Files Changed This Session

Only documentation files created — no source code modified:
- `docs/PROJECT_CONTEXT.md` [NEW]
- `docs/PROJECT_MEMORY.md` [NEW]
- `docs/TASK_TRACKER.md` [NEW]
- `docs/ARCHITECTURE.md` [NEW]
- `docs/SECURITY.md` [NEW]
- `docs/API.md` [NEW]
- `docs/CHANGELOG.md` [NEW]
- `docs/DEVELOPMENT_LOG.md` [NEW]

---

### Tests Performed

Code inspection only. No automated tests run.

---

### Result

Documentation complete. Implementation plan created. Ready for P0 fixes.

---

### Remaining Work

All 39 tasks in TASK_TRACKER.md.

---

### Next Session

**Start with TASK_TRACKER.md and verify each P0 task.**

Priority order:
1. T-003: Create `backend/.gitignore` (protect credentials in git NOW)
2. T-002: Regenerate strong JWT secret
3. T-001: Fix role injection in `auth.controller.js`
4. T-004: Fix wrong API URLs in `ListingPage.jsx` and `AdminHome.jsx`
5. T-005: Whitelist sort parameter in `admin.controller.js`
6. T-006: Add field projection to `getUsers`

After P0: Move to P1 tasks starting with T-007 (public product route).

---

*Start every new session by reading PROJECT_CONTEXT.md first, then verify the task status against the actual code.*
