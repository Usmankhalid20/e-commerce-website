# API.md — OneDrop E-Commerce

> Documents all backend API endpoints.
> Updated: 2026-08-19 | Reflects actual codebase state.

---

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://<your-domain>/api`

## Authentication

All protected endpoints require a valid JWT stored in the `jwt` HTTP-only cookie (set on login/signup).

---

## Auth Endpoints (`/api/auth`)

---

### POST /api/auth/signup

Register a new user account.

**Authentication**: Not required  
**Authorization**: Public

**Request Body**:
```json
{
  "fullName": "string (required, max 100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

> ⚠️ **BUG (T-001)**: Currently also accepts `role` from body — should be ignored and always default to `"user"`

**Response 201**:
```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "_id": "ObjectId",
    "fullName": "string",
    "email": "string",
    "role": "user",
    "profilePic": "string",
    "createdAt": "ISO date"
  }
}
```

**Response 400**: Missing required fields or password too short  
**Response 409**: Email already in use  
**Cookies Set**: `jwt` (httpOnly, secure in production)

---

### POST /api/auth/login

Log in with email and password.

**Authentication**: Not required  
**Authorization**: Public

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200**:
```json
{
  "success": true,
  "message": "Logged in successfully.",
  "data": {
    "_id": "ObjectId",
    "fullName": "string",
    "email": "string",
    "role": "user | admin",
    "profilePic": "string",
    "bio": "string"
  }
}
```

**Response 400**: Missing fields  
**Response 401**: Invalid credentials  
**Cookies Set**: `jwt` (httpOnly)

---

### POST /api/auth/logout

Log out the current user.

**Authentication**: Not required (but only meaningful if logged in)  
**Authorization**: Public

**Request**: No body required

**Response 200**:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

**Cookies Cleared**: `jwt`

---

### GET /api/auth/check

Check current authentication status. Used on page load.

**Authentication**: Required (JWT cookie)  
**Authorization**: Any authenticated user

**Request**: No body

**Response 200**: Returns the `req.user` object (user without password):
```json
{
  "_id": "ObjectId",
  "fullName": "string",
  "email": "string",
  "role": "user | admin",
  "profilePic": "string",
  "bio": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

**Response 401**: No valid token

---

### PUT /api/auth/updateProfile/:userId

Update the authenticated user's profile.

**Authentication**: Required  
**Authorization**: Authenticated user (uses `req.user._id`, not `:userId` — `:userId` param is not validated)

**Request**: multipart/form-data
```
fullName: string (required)
email: string (required)
bio: string (optional, max 300 chars)
avatar: file (optional, image upload)
```

**Response 200**:
```json
{
  "success": true,
  "data": { /* updated user object */ }
}
```

**Response 400**: Missing required fields  
**Response 409**: Email taken by another account  
**Response 404**: User not found

---

### GET /api/auth/getusers

Get all users. Admin only.

**Authentication**: Required  
**Authorization**: Admin only

> ⚠️ **TODO (T-028)**: Returns unbounded list of all users without pagination.

**Response 200**: Array of user objects (without passwords)

---

## Admin Endpoints (`/api/admin`)

---

### GET /api/admin/dashboard

Get dashboard statistics.

**Authentication**: Required  
**Authorization**: Admin only

**Response 200**:
```json
{
  "success": true,
  "data": {
    "totalProducts": 42,
    "totalStock": 1200
  }
}
```

> ⚠️ **NOTE**: `totalUsers` and `totalAdmins` are NOT returned here — AdminHome.jsx fetches them separately from `/api/auth/getusers`

---

### POST /api/admin/listing

Create a new product.

**Authentication**: Required  
**Authorization**: Admin only

**Request**: multipart/form-data
```
title: string (required, max 200 chars)
description: string (required)
price: number (required, ≥0)
mrp: number (required, ≥0)
discount: number (optional, 0-100, default 0)
category: string (required)
inStock: number (required, ≥0)
productImage: file (required, image/jpeg|png|webp, max 5MB)
```

> ⚠️ **BUG (T-004)**: `ListingPage.jsx` calls `/adminAuth/listing` — should call `/admin/listing`

**Response 201**:
```json
{
  "success": true,
  "message": "Product listed successfully.",
  "data": { /* product object */ }
}
```

**Response 400**: Missing fields or missing image  
**Response 401/403**: Auth/authorization failure

---

### GET /api/admin/products

Get all products with optional filtering, sorting, pagination.

**Authentication**: Required (any authenticated user)  
**Authorization**: Any authenticated user

> ⚠️ **BUG (T-007)**: Should be public — unauthenticated users cannot browse shop
> ⚠️ **BUG (T-004)**: `AdminHome.jsx` calls `/adminAuth/products` — should call `/admin/products`
> ⚠️ **BUG (T-005)**: `sort` query param is not sanitized

**Query Parameters**:
```
category: string (optional, filter by category)
sort: string (optional, default: '-createdAt')
page: number (optional, default: 1)
limit: number (optional, default: 50)
```

**Response 200**: Array of product objects (plain array, not wrapped in success envelope)

> ⚠️ **Inconsistency**: Other endpoints return `{ success, data }` but this returns a plain array

---

## Planned Endpoints (Not Yet Implemented)

### PUT /api/admin/products/:id
Update a product. *(T-012)*

### DELETE /api/admin/products/:id
Delete a product. *(T-012)*

### GET /api/products
Public product listing (no auth required). *(T-007)*

### POST /api/orders
Submit a checkout order. *(T-010, T-011)*

### GET /api/orders
List orders for a user. *(T-010)*

### GET /api/admin/orders
List all orders (admin). *(T-010)*

### GET /api/health
Health check endpoint. *(T-022)*

---

## Response Envelope Convention

Most endpoints use:
```json
{ "success": true/false, "message": "...", "data": { ... } }
```

**Exception**: `GET /api/admin/products` returns a plain array — inconsistency should be fixed.
`GET /api/auth/check` returns user object directly — also inconsistent.

---

## Error Response Format

```json
{
  "success": false,
  "message": "Human readable error message",
  "stack": "..." // only in development (NODE_ENV !== 'production')
}
```

---

*Update this file when APIs are added, changed, or removed.*
