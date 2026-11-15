# CHANGELOG.md — OneDrop E-Commerce

## [1.0.0] - 2026-08-19 — Production Revamp Release

### Added
- **Service Architecture**: Introduced `AuthService`, `ProductService`, `OrderService`, and `AdminService` layers.
- **Input Validation**: Added middleware validators for user registration, login, product creation, and order placement.
- **Super Admin Auto-Seeding**: Automatic boot seeding for initial Super Admin (`admin@onedrop.com`).
- **Create Admin Endpoint**: `POST /api/admin/create-admin` restricted to `superAdminOnly`.
- **UI Design System**: Created reusable `Button`, `Input`, `Select`, `Badge`, `Card`, `Modal`, `Skeleton`, `EmptyState`, `Pagination` components.
- **Isolated Admin Layout**: `AdminSidebar` with active route highlighting & mobile drawer, `AdminHeader`.
- **Order Management & Checkout Backend**: Server-calculated pricing & shipping totals, checkout order placement, and order status updates.

### Fixed
- Fixed privilege escalation by forcing `role: 'user'` on public signups.
- Fixed admin login redirection and route guards (`AdminRoute.jsx`).
- Fixed Multer file upload security with strict extension & MIME validation.
- Fixed public product browsing by allowing unauthenticated access to `/api/products`.
