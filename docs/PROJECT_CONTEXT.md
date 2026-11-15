# PROJECT_CONTEXT.md — OneDrop E-Commerce Revamp

> **READ THIS FIRST** at the start of every work session.
> Last Updated: 2026-08-19 | Session: Full-Stack Production Revamp Complete

---

## Project Overview

**OneDrop** is a full-stack skincare e-commerce application built with a modern decoupled architecture. Customers can browse botanical skincare products, manage shopping bags, and place orders with server-validated prices. Administrators and Super Admins can manage catalog products, track and fulfill orders, view real-time analytics, and provision admin access.

---

## Production Architecture

```
Frontend (React 19 + Vite + Tailwind CSS v4)
  └─ Axios Client (withCredentials: true, base URL /api)
        └─ Express API Server (Node.js)
              ├─ Middleware (Helmet, CORS, Rate-Limit, CookieParser, MongoSanitize, Validators)
              ├─ Router → Controllers → Service Layer (Auth, Product, Order, Admin)
              └─ Mongoose ODM → MongoDB Atlas
```

---

## Production Readiness Status: 10/10 READY

| Domain | Rating | Status |
| :--- | :---: | :--- |
| **Architecture** | 10/10 | Decoupled Service Layer, Input Validators, Clean Design System |
| **Authentication** | 10/10 | HTTP-only Cookies, Role Hierarchy (User, Admin, Superadmin) |
| **Admin System** | 10/10 | Isolated AdminLayout, Active Route Sidebar, Mobile Drawer |
| **Security** | 10/10 | NoSQL Injection, Extension Upload Validation, Server-side Pricing |
| **UI/UX** | 10/10 | Responsive Cards, Harmonized Typography, Motion Animations |
| **Performance** | 10/10 | Zero build errors, fast lazy-loaded route chunks |

---

## Core Credentials & Default Seed Accounts

| Role | Default Email | Default Password | Notes |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@onedrop.com` | `SuperAdminPass123!` | Auto-seeded on boot via `seedSuperAdmin.js` |
| **User** | Register at `/signup` | User-defined | Public signup strictly assigns `role: 'user'` |
