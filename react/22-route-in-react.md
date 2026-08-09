# Module 22 – React Routing ⭐⭐⭐⭐⭐

## Topics Covered

- React Router
- BrowserRouter
- Routes and Route
- Link and NavLink
- Programmatic Navigation
- Nested Routes
- Outlet
- Index Routes
- Dynamic Routes
- Route Parameters
- Query Parameters
- Protected Routes
- Authentication vs Authorization
- Role-Based Routes
- Lazy Routes
- Route-Level Code Splitting
- 404 / Catch-All Routes
- Navigation History
- Route State
- Common Mistakes
- Interview Questions
- Senior Scenario
- Quick Revision
- Interview One-Liners
- 2-Minute Interview Answer

---

# 1. What is Routing?

Routing determines **which UI should be displayed for a particular URL**.

```text
/products
   ↓
Products Component

/products/101
   ↓
Product Details Component
```

In a React SPA:

```text
URL
 ↓
React Router
 ↓
Match Route
 ↓
Render Component
```

---

# 2. React Router ⭐⭐⭐⭐⭐

React Router is the commonly used routing solution for React applications.

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

# 3. BrowserRouter

`BrowserRouter` uses the browser's History API to synchronize the URL and React UI.

```text
Browser URL
     ↓
BrowserRouter
     ↓
Route Matching
     ↓
React UI
```

It enables client-side navigation without a normal full-page reload.

---

# 4. Routes and Route

## Routes

Contains route definitions:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users" element={<Users />} />
</Routes>
```

## Route

Defines a URL pattern and the UI associated with it:

```jsx
<Route
  path="/users"
  element={<Users />}
/>
```

---

# 5. Navigation

## Link

```jsx
<Link to="/about">
  About
</Link>
```

Used for client-side navigation.

## NavLink

```jsx
<NavLink to="/dashboard">
  Dashboard
</NavLink>
```

`NavLink` is useful when you need the active route state.

```jsx
<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Dashboard
</NavLink>
```

## Programmatic Navigation

```jsx
const navigate = useNavigate();

navigate("/dashboard");
```

---

# 6. Nested Routes ⭐⭐⭐⭐⭐

Nested routes allow routes to be organized inside a parent route.

```text
/dashboard
/dashboard/profile
/dashboard/settings
/dashboard/orders
```

```jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route
      path="profile"
      element={<Profile />}
    />

    <Route
      path="settings"
      element={<Settings />}
    />

    <Route
      path="orders"
      element={<Orders />}
    />
  </Route>
</Routes>
```

---

# 7. Outlet ⭐⭐⭐⭐⭐

The parent component needs `<Outlet />` to specify where the matched child route should render.

```jsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}
```

Conceptually:

```text
Dashboard
 ├── Header
 ├── Navigation
 └── Outlet
      ↓
   Child Route
```

---

# 8. Index Routes

An index route is the default child route.

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route
    index
    element={<DashboardHome />}
  />

  <Route
    path="profile"
    element={<Profile />}
  />
</Route>
```

Therefore:

```text
/dashboard
       ↓
DashboardHome
```

while:

```text
/dashboard/profile
       ↓
Profile
```

---

# 9. Dynamic Routes ⭐⭐⭐⭐⭐

Dynamic routes contain parameters.

```jsx
<Route
  path="/users/:userId"
  element={<UserDetails />}
/>
```

These all match:

```text
/users/101
/users/202
/users/999
```

---

# 10. Reading Dynamic Parameters

Use `useParams()`:

```jsx
function UserDetails() {
  const { userId } = useParams();

  return (
    <h1>User ID: {userId}</h1>
  );
}
```

For `/users/101`:

```js
userId === "101"
```

### Important

Route parameters are strings.

```js
const id = Number(userId);
```

if a number is required.

---

# 11. Multiple Dynamic Parameters

```jsx
<Route
  path="/users/:userId/orders/:orderId"
  element={<OrderDetails />}
/>
```

URL:

```text
/users/101/orders/5001
```

Read them:

```jsx
const { userId, orderId } = useParams();
```

---

# 12. Query Parameters ⭐⭐⭐⭐⭐

Query parameters are different from route parameters.

```text
/products?category=mobile&page=2
```

Use `useSearchParams()`:

```jsx
const [searchParams] = useSearchParams();

const category =
  searchParams.get("category");

const page =
  searchParams.get("page");
```

Difference:

```text
/products/:id
       ↑
Route Parameter

/products?category=mobile
          ↑
Query Parameter
```

---

# 13. Protected Routes ⭐⭐⭐⭐⭐

Protected routes require authentication or authorization.

```text
User Requests /dashboard
          ↓
       Logged In?
       ↙       ↘
     Yes        No
      ↓          ↓
 Dashboard    Login
```

Example:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Usage:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

# 14. Protected Layout with Outlet

For multiple protected routes:

```jsx
function ProtectedLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

Routes:

```jsx
<Route element={<ProtectedLayout />}>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/settings"
    element={<Settings />}
  />
</Route>
```

This avoids repeating authentication logic.

---

# 15. Authentication vs Authorization ⭐⭐⭐⭐⭐

## Authentication

> Who are you?

Example:

```text
Is the user logged in?
```

## Authorization

> What are you allowed to access?

Example:

```text
Admin → Admin Dashboard
User  → User Dashboard
```

---

# 16. Role / Permission-Based Routes

```jsx
function AdminRoute({ children }) {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

In larger applications, permission-based checks can be more flexible than checking only a single role.

---

# 17. Lazy Routes ⭐⭐⭐⭐⭐

Lazy routes load route components only when needed.

```jsx
const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const Reports = lazy(() =>
  import("./pages/Reports")
);
```

Then:

```jsx
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/reports"
      element={<Reports />}
    />
  </Routes>
</Suspense>
```

---

# 18. Why Lazy Routes?

Without lazy loading:

```text
Initial Bundle
 ├── Home
 ├── Dashboard
 ├── Reports
 ├── Admin
 ├── Settings
 └── Analytics
```

With lazy routes:

```text
Initial
 ↓
Home

Visit Dashboard
 ↓
Dashboard Chunk

Visit Reports
 ↓
Reports Chunk
```

This can reduce the initial JavaScript payload.

---

# 19. Route-Level Code Splitting

Lazy routes are a common form of route-level code splitting.

```text
Application
     ↓
Routes
     ↓
Separate Chunks
```

Example:

```text
main.js
dashboard.js
reports.js
admin.js
settings.js
```

---

# 20. 404 / Catch-All Routes

Use a catch-all route for unmatched URLs:

```jsx
<Route
  path="*"
  element={<NotFound />}
/>
```

Example:

```text
/random-url
     ↓
NotFound
```

---

# 21. Navigation History ⭐⭐⭐⭐⭐

Normal navigation:

```jsx
navigate("/dashboard");
```

adds a history entry.

Using:

```jsx
navigate("/dashboard", {
  replace: true
});
```

replaces the current history entry.

Common login flow:

```text
/login
   ↓
Successful Login
   ↓
/dashboard
```

Using `replace` can prevent returning to the login page using Back.

---

# 22. Route State

You can pass temporary state during navigation:

```jsx
navigate("/profile", {
  state: {
    from: "dashboard"
  }
});
```

Read it:

```jsx
const location = useLocation();

console.log(location.state);
```

Don't use route state as a replacement for persistent application state.

---

# 23. React Router Navigation vs Browser Navigation

### React Router

```jsx
<Link to="/dashboard">
```

or:

```jsx
navigate("/dashboard");
```

Normally performs client-side navigation.

### Browser Navigation

```js
window.location.href = "/dashboard";
```

Causes normal browser navigation and may reload the application.

For SPA navigation, prefer React Router APIs.

---

# 24. Routing Error Handling

Production routing should consider:

- 404 pages
- Unauthorized pages
- Authentication redirects
- Failed lazy imports
- Error boundaries
- Network/API failures

Use appropriate fallback and error UI instead of leaving the application broken.

---

# 25. Common Mistakes ⭐⭐⭐⭐⭐

### Forgetting `<Outlet />`

Nested child routes need an appropriate outlet in the parent layout.

### Confusing route and query parameters

```text
/users/101
       ↑
Route Param
```

```text
/users?id=101
       ↑
Query Param
```

### Using `window.location` for normal SPA navigation

This can cause a full page reload.

### Storing sensitive information in URLs

URLs can appear in browser history, logs, analytics, and other systems.

### Treating frontend protection as security

Frontend protected routes improve UX but are **not a security boundary**.

Backend authorization must always enforce access.

### Loading every route initially

Large applications should consider route-level code splitting.

---

# 26. Production Routing Architecture ⭐⭐⭐⭐⭐

```text
App
│
├── Public Routes
│   ├── Login
│   ├── Register
│   └── About
│
├── Protected Layout
│   │
│   ├── Dashboard
│   │   ├── Overview
│   │   └── Analytics
│   │
│   ├── Profile
│   │
│   ├── Orders
│   │   └── :orderId
│   │
│   └── Admin Layout
│       ├── Users
│       └── Reports (Lazy)
│
└── 404
```

Combined concepts:

```text
Protected Routes
       +
Nested Routes
       +
Dynamic Routes
       +
Lazy Routes
       +
404 Handling
```

---

# 27. Senior Interview Scenario ⭐⭐⭐⭐⭐

Suppose an application has:

```text
Login
Dashboard
Profile
Orders
Admin
Reports
```

Requirements:

- Dashboard requires login.
- Admin requires admin permission.
- Orders have dynamic IDs.
- Reports should load only when visited.
- Dashboard has nested pages.

A good architecture:

```text
App
│
├── Public
│   └── Login
│
└── ProtectedLayout
    │
    ├── Dashboard
    │   ├── Overview
    │   └── Analytics
    │
    ├── Profile
    │
    ├── Orders
    │   └── :orderId
    │
    └── AdminRoute
        ├── Users
        └── Reports (Lazy)
```

---

# 28. Common Interview Questions ⭐⭐⭐⭐⭐

### What is React Router?

A routing solution that allows React applications to map URLs to UI and perform client-side navigation.

### What is a nested route?

A route defined inside another route that renders its UI within the parent's `<Outlet />`.

### What is `<Outlet />`?

A placeholder where the matched child route renders.

### What are dynamic routes?

Routes containing parameters such as:

```text
/users/:userId
```

### How do you get route parameters?

```jsx
useParams()
```

### How do you get query parameters?

```jsx
useSearchParams()
```

### What is a protected route?

A route that checks authentication or authorization before allowing access.

### How do you redirect?

```jsx
<Navigate to="/login" />
```

or:

```jsx
navigate("/login");
```

### What is lazy routing?

Loading route components only when they are needed.

### Why use lazy routes?

To reduce the initial JavaScript payload and improve initial loading performance.

### Difference between `Link` and `NavLink`?

`Link` provides navigation. `NavLink` additionally provides active-route state, making it useful for navigation menus.

---

# 29. Quick Revision ⭐⭐⭐⭐⭐

```text
React Router
→ URL → React UI

BrowserRouter
→ Browser History + Router

Routes
→ Route Definitions

Route
→ URL Pattern + UI

Link
→ Client-Side Navigation

NavLink
→ Navigation + Active State

Nested Routes
→ Parent + Child Routes

Outlet
→ Child Route Placeholder

Index Route
→ Default Child Route

Dynamic Route
→ /users/:id

useParams
→ Read Route Params

Query Params
→ ?page=2

useSearchParams
→ Read Query Params

Protected Route
→ Authentication / Authorization

Navigate
→ Programmatic / Declarative Navigation

replace
→ Replace History Entry

Lazy Route
→ Load Route Component On Demand

Suspense
→ Loading Fallback

path="*"
→ 404 Route
```

---

# 30. Interview One-Liners

- React Router maps URLs to React UI.
- `<Routes>` contains route definitions.
- `<Route>` defines a route.
- `<Outlet />` renders a matched child route.
- `useParams()` reads dynamic route parameters.
- `useSearchParams()` reads query parameters.
- `Navigate` performs declarative navigation.
- `useNavigate()` performs programmatic navigation.
- Protected routes control access based on authentication/authorization.
- Lazy routes reduce the initial JavaScript payload.
- Frontend route protection is not a replacement for backend authorization.
- `replace: true` replaces the current browser history entry.

---

# 31. 2-Minute Interview Answer

> **In React applications, I use React Router to map URLs to components and provide client-side navigation. For complex applications, I use nested routes with `Outlet` so child pages can share a common layout. Dynamic routes allow parameters such as `/orders/:orderId`, which I can read using `useParams`. For authentication, I use protected route or protected layout patterns that redirect unauthenticated users to the login page, while authorization checks roles or permissions. For performance, I use lazy-loaded routes with `React.lazy` and `Suspense` so large pages such as reports or admin modules are loaded only when needed. I also handle 404 routes with a catch-all route. However, frontend route protection is mainly for user experience; actual authorization must always be enforced on the backend.**

---

# 32. Senior Interview Mental Model ⭐⭐⭐⭐⭐

```text
                    React Router
                         ↓
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
      Navigation       Routing       Performance
          ↓              ↓              ↓
   Link / navigate   Nested Routes   Lazy Routes
                    Dynamic Routes
                    Protected Routes
                         ↓
                       Outlet
```

## The 5 Things to Remember

```text
React Router
    ↓
Nested Routes → Outlet
    ↓
Dynamic Routes → useParams
    ↓
Protected Routes → Auth / Authorization
    ↓
Lazy Routes → lazy + Suspense
```
