# PROJECT_MEMORY.md — OneDrop E-Commerce

> Long-term decision and context memory.
> New developers or AI assistants should read this alongside PROJECT_CONTEXT.md.

---

## Project Decisions

### Project Name & Brand
- **What**: App name is "OneDrop", a skincare e-commerce brand
- **Why**: Hardcoded in UI copy, localStorage key (`onedrop-cart`), component text
- **When**: Original design decision, pre-audit
- **Impact**: Any rename requires updating UI strings and localStorage key

### Monorepo Structure
- **What**: `frontend/` and `backend/` in same repository root with no monorepo tooling
- **Why**: Simple co-location for solo/small-team dev
- **When**: Project initialization
- **Impact**: No shared packages; must manually keep types consistent; fine for current scale

---

## Architecture Decisions

### JWT in HTTP-only Cookie (not localStorage)
- **What**: JWT stored as httpOnly cookie named `jwt`
- **Why**: Prevents XSS-based token theft
- **When**: Original design — correctly chosen
- **Impact**: Axios must use `withCredentials: true`; CORS must allow credentials; CSRF risk must be evaluated

### Axios withCredentials: true
- **What**: `axiosInstance` created with `withCredentials: true`
- **Why**: Required for HTTP-only cookie auth
- **When**: Set at project start
- **Impact**: Backend CORS must specify explicit `origin` (never `*`)

### Zustand for State Management
- **What**: Zustand v5 for auth, cart, products
- **Why**: Lightweight, simple API, no boilerplate
- **When**: Project start
- **Impact**: Fine for current scale; no Redux migration needed

### Cart Persisted to localStorage
- **What**: `useCartStore` uses `zustand/middleware` persist to localStorage
- **Why**: Guest cart persistence across page refreshes
- **When**: Project start
- **Impact**: Cart is client-side only; price/stock validation must happen at checkout on server

### Local File Storage for Uploads
- **What**: Multer saves to `backend/uploads/products/` and `backend/uploads/profiles/`
- **Why**: Simple for development
- **When**: Initial implementation
- **Impact**: Does NOT scale to production — files are lost on server restart/redeploy; must migrate to S3-compatible storage before real production deployment

### No Service Layer Currently
- **What**: Business logic lives directly in controllers
- **Why**: Kept simple for early dev
- **When**: Initial implementation
- **Impact**: Controllers are not too large yet — acceptable. Recommend extracting services only when controllers grow beyond ~150 lines or logic is shared across routes.

---

## Security Decisions

### bcrypt SALT_ROUNDS = 12
- **What**: 12 rounds used for password hashing
- **Why**: Good balance of security vs. performance; 12 rounds is industry-appropriate for 2026
- **When**: Auth controller
- **Impact**: Slightly slower login (intentional); makes brute-force harder

### SameSite Cookie Policy
- **What**: `sameSite: 'strict'` in production, `'lax'` in development
- **Why**: Strict prevents CSRF from cross-origin requests in production
- **When**: jwt.js
- **Impact**: With SameSite=Strict, traditional form-based CSRF is mitigated for same-site deploys

### Password select: false
- **What**: Mongoose schema has `password: { select: false }`
- **Why**: Password never returned by default in queries
- **When**: user.model.js
- **Impact**: Must use `.select('+password')` explicitly when login requires password comparison

---

## Important Bugs Discovered

### BUG-001: Role Injection on Signup
- **What**: `role: role || 'user'` uses `role` from `req.body` directly
- **Why it matters**: Any user can POST `{"role": "admin"}` and get admin access
- **Found**: 2026-08-19 audit
- **Fix**: Ignore `role` from req.body on signup; always default to `'user'`

### BUG-002: Wrong API URLs in Admin Components
- **What**: `ListingPage.jsx` calls `/adminAuth/listing`; `AdminHome.jsx` calls `/adminAuth/products`
- **Why it matters**: API routes are `/api/admin/listing` and `/api/admin/products` — these calls will 404
- **Found**: 2026-08-19 audit
- **Fix**: Change to `/admin/listing` and `/admin/products`

### BUG-003: Cart ID Mismatch
- **What**: Cart `removeFromCart` filters by `item.id` but MongoDB documents use `_id`
- **Why it matters**: Cannot remove items from cart (silently fails)
- **Found**: 2026-08-19 audit
- **Fix**: Normalize ID usage; use `item._id` consistently

### BUG-004: Products Require Authentication
- **What**: `GET /api/admin/products` requires `protectRoute` — unauthenticated visitors cannot browse the shop
- **Why it matters**: Core UX broken for non-logged-in users
- **Found**: 2026-08-19 audit
- **Fix**: Create public product route, or remove protectRoute from product listing

### BUG-005: Checkout is Non-Functional
- **What**: `CheckOut.jsx` handleSubmit only calls `console.log()` and `alert()` — no API call
- **Why it matters**: Orders cannot be placed
- **Found**: 2026-08-19 audit
- **Fix**: Implement Order model + checkout API endpoint + connect frontend

### BUG-006: rating & reviews Fields Referenced But Missing
- **What**: `ProductPage.jsx` renders `product.rating` and `product.reviews` but Product schema has no such fields
- **Why it matters**: Star display always renders empty/zero
- **Found**: 2026-08-19 audit
- **Fix**: Add rating/reviews to schema OR remove from UI

### BUG-007: Global quantity State in Cart Store
- **What**: `useCartStore` has a single `quantity: 1` global counter, not per-product
- **Why it matters**: Opening two product pages simultaneously would have shared quantity state
- **Found**: 2026-08-19 audit
- **Fix**: Move quantity to local component state on ProductPage

### BUG-008: Unsanitized sort Parameter
- **What**: `getAllProducts` passes `req.query.sort` directly to `.sort()` without whitelist validation
- **Why it matters**: Potential MongoDB operator injection
- **Found**: 2026-08-19 audit

---

## Known Limitations

- No payment gateway integration (only "Cash on Delivery" mock)
- No email notification system
- No password reset flow
- No product image gallery (single image per product)
- No reviews/ratings system
- No promotions/coupons system
- File uploads stored locally (not scalable)
- No database seeding scripts

## Dependencies Intentionally NOT Changed

- `bcrypt` AND `bcryptjs` both exist — `bcrypt` is used. `bcryptjs` should be removed (unused duplicate)
- DaisyUI installed but minimal usage — keep; may be used in future components
- `body-parser` installed but Express 4.x has built-in body parsing — can be removed

## Deployment Decisions

- No deployment configuration exists yet (no Dockerfile, no CI/CD, no Procfile)
- Backend `NODE_ENV=production` is set in `.env` but CORS still defaults to localhost — must fix before real deployment

---

*Update this file when long-term decisions are made or important bugs are found/fixed.*
