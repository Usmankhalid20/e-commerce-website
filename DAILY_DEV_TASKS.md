# DAILY_DEV_TASKS.md — OneDrop E-Commerce Automated Development

> **Daily Development Tracker & Contribution Log**  
> **Automation Schedule:** Daily at 10:00 PM (`Asia/Karachi`)  
> **Repository:** `https://github.com/Usmankhalid20/e-commerce-website`  
> **Author:** `Usmankhalid20` (`usmankhalid399354@gmail.com`)  
> **Target:** 50+ meaningful Git commits per execution when legitimate development work exists.

---

## 1. Completed Tasks (Revamp & Daily Cycle)

### P0 — Critical Security & Architecture
- [x] **T-001**: Remove `role` from public signup body parsing (`AuthService.register` forces `user` role).
- [x] **T-002**: Untrack `.env` from git and establish `.env.example` templates for backend and frontend.
- [x] **T-003**: Configure `.gitignore` across root and backend to exclude `node_modules`, `.env`, and uploads.
- [x] **T-004**: Fix API endpoints in admin components (`ListingPage.jsx`, `AdminHome.jsx`).
- [x] **T-005**: Sanitize `getAllProducts` sort parameters against NoSQL injection in `ProductService`.
- [x] **T-006**: Explicitly exclude password/sensitive hashes in user query projections.

### P1 — Core Features & Decoupled Architecture
- [x] **T-007**: Expose public read-only product browse endpoints (`/api/products`) without requiring admin authentication.
- [x] **T-008**: Fix cart `removeFromCart` MongoDB `_id` vs `id` property mismatch in `useCartStore.js`.
- [x] **T-009**: Implement full `Order` model with shipping address, items, and status tracking.
- [x] **T-010**: Implement backend checkout API endpoint with server-validated pricing in `OrderService`.
- [x] **T-011**: Connect checkout frontend flow (`CheckOut.jsx`) to order API.
- [x] **T-012**: Add admin product update and delete API endpoints in `AdminService`.
- [x] **T-013**: Add automated unit test suites for domain constants and pricing calculations in `backend/test`.
- [x] **T-014**: Remove deprecated standalone `adminDashboard` folder in favor of integrated admin layout.

---

## 2. GitHub Contribution Eligibility Checklist
- [x] **Author Identity**: `git config user.name "Usmankhalid20"` matches GitHub account.
- [x] **Author Email**: `git config user.email "usmankhalid399354@gmail.com"` is associated with the GitHub account.
- [x] **Remote Config**: Configured to `https://github.com/Usmankhalid20/e-commerce-website`.
- [x] **Default Branch**: `main` (verified on GitHub remote).
- [x] **Contribution Graph Registration**: All feature commits merged directly into `main` and pushed to `origin/main`.

---

## 3. Daily Execution Logs

| Date | Time (PKT) | Branch | Commits | Tests Status | Build Status | Push Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-11-16 | 00:40 | `main` | 68 commits | 6/6 tests passing | Verified | Pushed to main | Full revamp + test suite merged and pushed to default branch |

---
