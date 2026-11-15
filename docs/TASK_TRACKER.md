# TASK_TRACKER.md — OneDrop E-Commerce

> Priority: P0=Critical | P1=High | P2=Medium | P3=Low
> Status: TODO | IN_PROGRESS | BLOCKED | TESTING | COMPLETED

---

## P0 — Critical (Must Fix Before Production)

| ID     | Priority | Task                                              | Reason                                              | Status | Files Affected                                | Started    | Completed | Notes |
|--------|----------|---------------------------------------------------|-----------------------------------------------------|--------|-----------------------------------------------|------------|-----------|-------|
| T-001  | P0       | Remove `role` from signup body parsing            | Privilege escalation: anyone can self-assign admin  | TODO   | auth.controller.js                            | —          | —         |       |
| T-002  | P0       | Replace weak JWT_SECRET with strong secret        | `secrectKey123` is trivially guessable              | TODO   | backend/.env, docs/SECURITY.md                | —          | —         | Must regenerate and update .env |
| T-003  | P0       | Add backend `.gitignore` to exclude `.env`        | Real DB credentials and JWT secret in .env          | TODO   | backend/.gitignore                            | —          | —         |       |
| T-004  | P0       | Fix wrong API URLs in admin components            | ListingPage and AdminHome call non-existent routes  | TODO   | ListingPage.jsx, AdminHome.jsx                | —          | —         |       |
| T-005  | P0       | Secure `getAllProducts` sort parameter            | Unsanitized sort field → MongoDB injection risk     | TODO   | admin.controller.js                           | —          | —         |       |
| T-006  | P0       | Fix `getUsers` — exclude sensitive fields explicitly | Returns all user fields by default             | TODO   | auth.controller.js                            | —          | —         |       |

---

## P1 — High (Should Fix Before Production)

| ID     | Priority | Task                                              | Reason                                              | Status | Files Affected                                | Started    | Completed | Notes |
|--------|----------|---------------------------------------------------|-----------------------------------------------------|--------|-----------------------------------------------|------------|-----------|-------|
| T-007  | P1       | Make product listing public (no auth required)    | Unauthenticated users can't browse the shop         | TODO   | admin.routes.js, admin.controller.js          | —          | —         | Create `/api/products` public route |
| T-008  | P1       | Fix cart `removeFromCart` ID mismatch             | Uses `item.id` but MongoDB uses `item._id`          | TODO   | useCartStore.js, Cart.jsx                     | —          | —         |       |
| T-009  | P1       | Implement Order model                             | No order persistence exists                         | TODO   | backend/src/models/order.model.js [NEW]       | —          | —         |       |
| T-010  | P1       | Implement checkout API endpoint                   | Checkout does nothing currently                     | TODO   | backend/src/controllers/order.controller.js [NEW], routes | — | — | Server-side price calculation |
| T-011  | P1       | Connect checkout frontend to backend              | handleSubmit only alerts()                          | TODO   | CheckOut.jsx, useCartStore.js                 | —          | —         |       |
| T-012  | P1       | Add product update/delete endpoints               | Admin can create but not edit or delete products    | TODO   | admin.controller.js, admin.routes.js          | —          | —         |       |
| T-013  | P1       | Set ALLOWED_ORIGINS correctly in production .env  | CORS defaults to localhost even with NODE_ENV=production | TODO | backend/.env, backend/src/config/env.js   | —          | —         |       |
| T-014  | P1       | Move `quantity` out of cart store to local state  | Global quantity causes cross-product state bugs     | TODO   | useCartStore.js, ProductPage.jsx              | —          | —         |       |
| T-015  | P1       | Remove `bcryptjs` (duplicate of `bcrypt`)         | Both installed; only `bcrypt` is used               | TODO   | backend/package.json                          | —          | —         |       |
| T-016  | P1       | Remove `body-parser` (redundant with Express 4)   | Express has built-in body parsing                   | TODO   | backend/package.json, backend/src/app.js      | —          | —         |       |
| T-017  | P1       | Implement server-side price/stock validation at checkout | Never trust client-side totals             | TODO   | order.controller.js [NEW]                     | —          | —         |       |

---

## P2 — Medium (Should Fix Soon)

| ID     | Priority | Task                                              | Reason                                              | Status | Files Affected                                | Started    | Completed | Notes |
|--------|----------|---------------------------------------------------|-----------------------------------------------------|--------|-----------------------------------------------|------------|-----------|-------|
| T-018  | P2       | Add text search to product API                    | Filter buttons are visual-only                      | TODO   | admin.controller.js, Shop.jsx                 | —          | —         |       |
| T-019  | P2       | Implement server-side pagination                  | All products loaded at once — bad for performance   | TODO   | admin.controller.js, Shop.jsx, useProductStore.js | —       | —         | Limit default is 50 — too high |
| T-020  | P2       | Add `rating` and `reviews` fields to Product schema OR remove from UI | Currently shows empty stars | TODO | product.model.js OR ProductPage.jsx        | —          | —         |       |
| T-021  | P2       | Add 401 interceptor to Axios (auto-redirect on session expiry) | Silent session expiry — user stays on protected page | TODO | axios.js                                 | —          | —         |       |
| T-022  | P2       | Add health check endpoint (`GET /api/health`)     | No observability in production                      | TODO   | app.js or new health.routes.js                | —          | —         |       |
| T-023  | P2       | Add `.env.example` for both frontend and backend  | No reference for new developers                     | TODO   | backend/.env.example [NEW], frontend/.env.example [NEW] | — | — |       |
| T-024  | P2       | Remove console.log statements from frontend stores| Not appropriate for production                      | TODO   | useAuthStore.js, useCartStore.js, useProductStore.js, AdminHome.jsx | — | — |       |
| T-025  | P2       | Add quantity update to cart (not just add/remove) | Users can't change quantity in cart page            | TODO   | Cart.jsx, useCartStore.js                     | —          | —         |       |
| T-026  | P2       | Fix broken background image URL in Home.jsx       | Unsplash page URL instead of direct image URL       | TODO   | Home.jsx                                      | —          | —         | Line 15 — links to page not image |
| T-027  | P2       | Add Mongoose index on product title (for text search) | Performance for search                          | TODO   | product.model.js                              | —          | —         |       |
| T-028  | P2       | Limit `getUsers` to admin-only and paginate       | Currently unbounded query returning all users       | TODO   | auth.controller.js                            | —          | —         |       |
| T-029  | P2       | Add duplicate entry protection to cart addToCart  | No max quantity per item check vs stock             | TODO   | useCartStore.js                               | —          | —         |       |

---

## P3 — Low (Nice to Improve)

| ID     | Priority | Task                                              | Reason                                              | Status | Files Affected                                | Started    | Completed | Notes |
|--------|----------|---------------------------------------------------|-----------------------------------------------------|--------|-----------------------------------------------|------------|-----------|-------|
| T-030  | P3       | Consistent currency formatting (RS. everywhere)   | Inconsistent: "RS.", "RS", "$" used in different places | TODO | Cart.jsx, CheckOut.jsx, AdminHome.jsx, ProductPage.jsx | — | — |      |
| T-031  | P3       | Implement `prefers-reduced-motion` CSS rule       | Accessibility for motion-sensitive users            | TODO   | index.css                                     | —          | —         |       |
| T-032  | P3       | Add `aria-label` to icon buttons                  | Accessibility — screen reader support               | TODO   | Cart.jsx, various                             | —          | —         |       |
| T-033  | P3       | Implement skeleton loaders for product grid       | Better UX than basic spinner                        | TODO   | Shop.jsx, components                          | —          | —         |       |
| T-034  | P3       | Add `alt` attributes review pass                  | Some images have generic alt text                   | TODO   | Various pages                                 | —          | —         |       |
| T-035  | P3       | Migrate local file uploads to cloud storage (S3)  | Local storage is not production-scalable            | TODO   | upload.middleware.js                          | —          | —         | Requires S3 bucket + credentials |
| T-036  | P3       | Add structured logging (replace console.log)      | Console logs not searchable in production           | TODO   | backend                                       | —          | —         |       |
| T-037  | P3       | Remove unused `ShoppingCart.jsx` (duplicate of Cart.jsx?) | Possible dead code                            | TODO   | ShoppingCart.jsx                              | —          | —         | Verify if routed anywhere |
| T-038  | P3       | Add Docker / deployment configuration             | No deployment artifacts exist                       | TODO   | Dockerfile [NEW], docker-compose.yml [NEW]    | —          | —         |       |
| T-039  | P3       | Add rate limiting specifically for auth endpoints | Login/signup rate limit separate from general limit | TODO   | auth.routes.js, app.js                        | —          | —         |       |

---

*Mark tasks IN_PROGRESS when starting, COMPLETED when done. Never delete completed entries.*
