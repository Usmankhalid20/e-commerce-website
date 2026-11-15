# ARCHITECTURE.md — OneDrop E-Commerce

> Updated: 2026-08-19 | Reflects actual codebase state

---

## System Architecture Overview

```
Browser (React 19 + Vite)
        │
        │  HTTP + HTTP-only Cookie (JWT)
        │  withCredentials: true
        ▼
   Axios Instance
   (src/lib/axios.js)
        │
        │  HTTPS (production) / HTTP (dev)
        ▼
 ┌─────────────────────────────────────────────┐
 │         Express API Server                  │
 │                                             │
 │  Middleware Stack (app.js):                 │
 │  1. Helmet (security headers)               │
 │  2. Morgan (request logging)                │
 │  3. Rate Limiter (100 req/15min)            │
 │  4. JSON body parser (10kb limit)           │
 │  5. Cookie Parser                           │
 │  6. Mongo Sanitize (NoSQL injection)        │
 │  7. CORS (explicit origins)                 │
 │  8. Static files (/uploads)                 │
 │                                             │
 │  Routes:                                    │
 │  POST   /api/auth/signup                    │
 │  POST   /api/auth/login                     │
 │  POST   /api/auth/logout                    │
 │  GET    /api/auth/check          [protected]│
 │  PUT    /api/auth/updateProfile  [protected]│
 │  GET    /api/auth/getusers   [admin+protect]│
 │  GET    /api/admin/dashboard  [admin+protect│
 │  POST   /api/admin/listing    [admin+protect│
 │  GET    /api/admin/products      [protected]│
 │                                             │
 │  Controllers → Models → MongoDB             │
 └─────────────────────────────────────────────┘
        │
        │  Mongoose ODM
        ▼
   MongoDB Atlas (Cloud)
   ├── users collection
   └── products collection
   (missing: orders collection)
```

---

## Authentication Flow

```
1. POST /api/auth/signup or /api/auth/login
       │
       ▼
2. Controller validates input
       │
       ▼
3. Password verified with bcrypt.compare()
       │
       ▼
4. jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
       │
       ▼
5. res.cookie('jwt', token, {
     httpOnly: true,
     secure: true (production),
     sameSite: 'strict' (production) / 'lax' (dev),
     maxAge: 7 days
   })
       │
       ▼
6. User object returned in response (no password)
       │
       ▼
7. Frontend stores user in useAuthStore (Zustand)
       │
       ▼
8. All subsequent requests send cookie automatically (withCredentials: true)
       │
       ▼
9. protectRoute middleware:
   - reads req.cookies.jwt
   - verifies JWT signature and expiry
   - loads user from MongoDB
   - attaches to req.user
       │
       ▼
10. Controller handles request with req.user available
```

---

## Authorization Flow

```
protectRoute middleware (authentication check)
       │
       ▼
adminOnly middleware (role check: req.user.role === 'admin')
       │
       ▼
Controller (business logic)
```

---

## Product Flow (Current — Has Bugs)

```
Frontend                    Backend
   │                           │
   │ fetchProducts()            │
   ├──────────────────────────►│
   │ GET /api/admin/products    │  ← BUG: requires auth; should be public
   │                           │
   │◄──────────────────────────┤
   │ products[]                 │
   │                           │
   │ User clicks product       │
   │ → ProductPage (id param)  │
   │ → getProductById(id)      │  ← searches local Zustand state (no fresh fetch)
   │ → renders product         │
```

**Issue**: If user navigates directly to `/product/:id` without visiting `/shop` first, `products` state is empty and product won't be found.

---

## Cart Flow (Client-Side Only)

```
User clicks "Add to Cart"
       │
       ▼
useCartStore.addToCart(product, quantity)
       │
       ▼
Zustand updates cart[] in memory
       │
       ▼
Persisted to localStorage key "onedrop-cart"
       │
       ▼
Cart page reads from Zustand cart[]
Calculates subtotal CLIENT-SIDE (price × quantity)
       │
       ▼
Checkout page (CURRENTLY A MOCK)
Only shows alert() — NO backend call
```

**Critical gap**: No order is created in database. Cart contents disappear after browser clear.

---

## Admin Flow

```
Admin user logs in → role = 'admin' in Zustand
       │
       ▼
Frontend ProtectedRoute checks role === 'admin'
If not: redirect to /admin/unauthorized
       │
       ▼
Admin page loads
       │
       ▼
Admin component calls API with axios (sends cookie)
       │
       ▼
Backend protectRoute verifies JWT → req.user
Backend adminOnly verifies req.user.role === 'admin'
       │
       ▼
Admin controller executes (dashboard stats, product CRUD)
```

---

## File Upload Flow

```
Admin submits product form (multipart/form-data)
       │
       ▼
Multer upload.single('productImage') middleware
       │
       ▼
MIME type check (jpeg/jpg/png/webp only)
File size check (≤5MB)
Filename sanitized (timestamp + random suffix + extension)
       │
       ▼
File saved to backend/uploads/products/
       │
       ▼
Image URL constructed:
  `${protocol}://${host}/uploads/products/${filename}`
       │
       ▼
URL stored in product.image field (MongoDB)
       │
       ▼
Express serves static files from /uploads
```

**Limitation**: Files are stored locally on the server disk. Not suitable for distributed/cloud hosting without persistent storage.

---

## Data Relationships

```
User
  _id (ObjectId)
  fullName (String)
  email (String, unique)
  password (String, select: false)
  role (enum: 'user' | 'admin')
  profilePic (String)
  bio (String)
  createdAt, updatedAt

Product
  _id (ObjectId)
  title (String)
  description (String)
  price (Number)
  mrp (Number)
  discount (Number, 0-100)
  category (String, lowercase)
  inStock (Number)
  image (String, URL)
  createdAt, updatedAt
  [MISSING: rating, reviews — referenced in UI]

Order [DOES NOT EXIST YET]
  — Needs to be designed and implemented —
```

---

## Frontend Component Tree (Key Paths)

```
main.jsx
  └── BrowserRouter
        └── App.jsx (checkAuth on mount)
              └── AppRoutes.jsx
                    ├── /login → Login.jsx
                    ├── /signup → SignUp.jsx
                    ├── LayoutUser
                    │     ├── / → Home.jsx (uses MainCards component)
                    │     ├── /shop → Shop.jsx (uses useProductStore)
                    │     ├── /product/:id → ProductPage.jsx
                    │     ├── /about → About.jsx
                    │     ├── /contact → Contact.jsx
                    │     └── [ProtectedRoute]
                    │           ├── /cart → Cart.jsx
                    │           ├── /checkout → CheckOut.jsx
                    │           └── /profileUpdate → ProfileUpdate.jsx
                    └── [ProtectedRoute role=admin]
                          └── LayoutAdmin
                                ├── /admin → AdminHome.jsx
                                ├── /admin/users → UserPage.jsx
                                ├── /admin/listing → ListingPage.jsx
                                └── /admin/orders → OrdersPage.jsx
```

---

## State Management

```
useAuthStore (Zustand)
  state: authUser, role, isCheckingAuth, isSigningUp, isSigninIn, isLoggingOut, error
  actions: checkAuth, signup, login, logout, updateProfile

useCartStore (Zustand + localStorage persist)
  state: cart[], quantity (global — BUG)
  actions: addToCart, removeFromCart, increment, decrement, setQuantity, resetQuantity

useProductStore (Zustand)
  state: products[], isLoading, error
  actions: fetchProducts, getProductById
```

---

*Update this document whenever architecture changes.*
