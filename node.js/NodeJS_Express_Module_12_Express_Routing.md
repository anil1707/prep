# Module 12 – Express Routing ⭐⭐⭐⭐⭐

## Topics

- GET
- POST
- PUT
- PATCH
- DELETE
- Route parameters
- Query parameters
- Nested routes
- Router
- Route organization

---

# 1. What is Routing?

**Routing** determines how an Express application responds to a specific HTTP method and URL path.

```text
HTTP Request
     ↓
Method + URL
     ↓
Express Router
     ↓
Matching Route
     ↓
Handler
     ↓
Response
```

Example:

```js
app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched"
  });
});
```

This route handles:

```http
GET /users
```

---

# 2. Basic Express Route ⭐⭐⭐⭐⭐

Syntax:

```js
app.METHOD(PATH, HANDLER);
```

Example:

```js
app.get("/users", (req, res) => {
  res.send("Users");
});
```

Breakdown:

```text
app.get()
   ↓
HTTP Method

/users
   ↓
Route Path

(req, res) => {}
   ↓
Route Handler
```

---

# 3. GET Route ⭐⭐⭐⭐⭐

Used to retrieve data.

```js
app.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Anil"
    }
  ]);
});
```

Request:

```http
GET /users
```

Typical uses:

```text
Get users
Get products
Get orders
Get profile
```

---

# 4. POST Route ⭐⭐⭐⭐⭐

Used to create or submit data.

```js
app.post("/users", (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: "User created",
    user
  });
});
```

Request:

```http
POST /users
```

Body:

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

---

# 5. PUT Route ⭐⭐⭐⭐⭐

Generally used to replace a resource representation.

```js
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;

  res.json({
    message: "User replaced",
    userId
  });
});
```

Request:

```http
PUT /users/101
```

---

# 6. PATCH Route ⭐⭐⭐⭐⭐

Generally used for a partial update.

```js
app.patch("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  res.json({
    userId,
    updates
  });
});
```

Request:

```http
PATCH /users/101
```

Body:

```json
{
  "name": "Anil Kumar"
}
```

---

# 7. DELETE Route ⭐⭐⭐⭐⭐

Used to delete a resource.

```js
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  res.status(204).send();
});
```

Request:

```http
DELETE /users/101
```

---

# 8. HTTP Methods Summary ⭐⭐⭐⭐⭐

| Method | Typical Purpose | Example |
|---|---|---|
| GET | Retrieve | `/users` |
| POST | Create/submit | `/users` |
| PUT | Replace | `/users/101` |
| PATCH | Partial update | `/users/101` |
| DELETE | Delete | `/users/101` |

Mental model:

```text
GET
 ↓
Read

POST
 ↓
Create / Submit

PUT
 ↓
Replace

PATCH
 ↓
Partial Update

DELETE
 ↓
Delete
```

---

# 9. Route Parameters ⭐⭐⭐⭐⭐

Route parameters are dynamic values inside the URL path.

Example:

```js
app.get("/users/:id", (req, res) => {
  console.log(req.params);
});
```

Request:

```text
GET /users/101
```

Result:

```js
req.params
```

```js
{
  id: "101"
}
```

Access it:

```js
const id = req.params.id;
```

Important:

> Route parameter values are strings by default.

Convert when necessary:

```js
const id = Number(req.params.id);
```

---

# 10. Why Use Route Parameters?

Use route parameters when identifying a specific resource.

Good examples:

```text
/users/101
/orders/500
/products/20
```

Mental model:

```text
/users/101
       ↑
   Which user?
```

---

# 11. Multiple Route Parameters

```js
app.get(
  "/users/:userId/orders/:orderId",
  (req, res) => {
    const {
      userId,
      orderId
    } = req.params;

    res.json({
      userId,
      orderId
    });
  }
);
```

Request:

```text
/users/101/orders/500
```

Result:

```js
{
  userId: "101",
  orderId: "500"
}
```

---

# 12. Query Parameters ⭐⭐⭐⭐⭐

Query parameters appear after `?`.

Example:

```text
/users?city=mumbai&active=true
```

Access them using:

```js
req.query
```

Example:

```js
app.get("/users", (req, res) => {
  const {
    city,
    active
  } = req.query;

  res.json({
    city,
    active
  });
});
```

Request:

```text
/users?city=mumbai&active=true
```

Result:

```js
{
  city: "mumbai",
  active: "true"
}
```

---

# 13. Query Parameter Use Cases

Common uses:

```text
Filtering
Searching
Sorting
Pagination
Optional behavior
```

Examples:

```text
/products?category=mobile

/users?city=mumbai

/products?sort=price

/users?page=2&limit=20

/users?search=anil
```

---

# 14. Route Params vs Query Params ⭐⭐⭐⭐⭐

### Route parameter

Used to identify a resource.

```text
/users/101
```

```js
req.params.id
```

### Query parameter

Used to filter or modify the request.

```text
/users?active=true
```

```js
req.query.active
```

Simple rule:

```text
Path parameter
→ Which resource?

Query parameter
→ Which subset / options?
```

---

# 15. Combined Params + Query Example

URL:

```text
/users/101/orders?status=completed&page=2
```

Route:

```js
app.get(
  "/users/:userId/orders",
  (req, res) => {

    const userId =
      req.params.userId;

    const {
      status,
      page
    } = req.query;

    res.json({
      userId,
      status,
      page
    });
  }
);
```

Result:

```js
{
  userId: "101",
  status: "completed",
  page: "2"
}
```

---

# 16. Nested Routes ⭐⭐⭐⭐⭐

Nested routes represent relationships between resources.

Example:

```text
/users/101/orders
```

Meaning:

> Orders belonging to user `101`.

Another example:

```text
/users/101/orders/500
```

Meaning:

> Order `500` belonging to user `101`.

---

# 17. Nested Route Example

```js
app.get(
  "/users/:userId/orders",
  (req, res) => {

    const userId =
      req.params.userId;

    res.json({
      message: "User orders",
      userId
    });
  }
);
```

Request:

```text
GET /users/101/orders
```

Response:

```json
{
  "message": "User orders",
  "userId": "101"
}
```

---

# 18. Avoid Excessive Nesting

Technically you can create:

```text
/users/:userId/orders/:orderId/items/:itemId
```

But excessive nesting can make APIs difficult to read and maintain.

For example:

```text
/users/101/orders/500/items/10
```

may sometimes be better represented by:

```text
/orders/500/items/10
```

depending on the API's resource model.

---

# 19. What is `express.Router()`? ⭐⭐⭐⭐⭐

`express.Router()` creates a modular router that can contain related routes and middleware.

Example:

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users");
});

router.post("/", (req, res) => {
  res.send("Create user");
});

module.exports = router;
```

---

# 20. Why Use `express.Router()`?

Without routers, everything might be placed inside:

```text
app.js
```

For a large application:

```text
app.js
 ├── users
 ├── products
 ├── orders
 ├── authentication
 ├── payments
 └── admin
```

This becomes difficult to maintain.

Instead:

```text
routes/
 ├── user.routes.js
 ├── product.routes.js
 ├── order.routes.js
 ├── auth.routes.js
 └── payment.routes.js
```

This improves organization and maintainability.

---

# 21. Creating a User Router

`routes/user.routes.js`

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Get users"
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Create user"
  });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Get user",
    id: req.params.id
  });
});

module.exports = router;
```

---

# 22. Mounting a Router ⭐⭐⭐⭐⭐

In `app.js`:

```js
const express = require("express");

const userRouter =
  require("./routes/user.routes");

const app = express();

app.use("/users", userRouter);

app.listen(3000);
```

The router's routes become:

```text
GET  /users
POST /users
GET  /users/:id
```

Because:

```js
app.use("/users", userRouter);
```

adds `/users` as the router prefix.

---

# 23. How Router Prefix Works

Router:

```js
router.get("/", handler);
```

Mounted at:

```js
app.use("/users", router);
```

Final route:

```text
GET /users
```

Another:

```js
router.get("/:id", handler);
```

Final route:

```text
GET /users/:id
```

Mental model:

```text
app.use("/users", userRouter)
             +
router.get("/:id")
             ↓
GET /users/:id
```

---

# 24. Nested Router ⭐⭐⭐⭐⭐

Suppose you need:

```text
/users/:userId/orders
```

Create an order router:

```js
const express = require("express");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  const userId =
    req.params.userId;

  res.json({
    userId,
    message: "User orders"
  });
});

module.exports = router;
```

Mount it:

```js
const orderRouter =
  require("./routes/order.routes");

app.use(
  "/users/:userId/orders",
  orderRouter
);
```

---

# 25. Why `mergeParams: true`? ⭐⭐⭐⭐⭐

When a router is mounted under a parent path containing a parameter:

```text
/users/:userId/orders
```

the child router needs:

```js
express.Router({
  mergeParams: true
});
```

to access the parent route parameter.

Then:

```js
req.params.userId
```

is available inside the child router.

Without `mergeParams: true`, parent route parameters are not automatically available in the child router.

---

# 26. Route Organization ⭐⭐⭐⭐⭐

A common Express project structure:

```text
src/
│
├── app.js
│
├── routes/
│   ├── user.routes.js
│   ├── product.routes.js
│   ├── order.routes.js
│   └── auth.routes.js
│
├── controllers/
│   ├── user.controller.js
│   ├── product.controller.js
│   └── order.controller.js
│
├── services/
│   ├── user.service.js
│   └── order.service.js
│
├── models/
│   ├── user.model.js
│   └── order.model.js
│
└── middleware/
    ├── auth.middleware.js
    └── error.middleware.js
```

Typical flow:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model / Database
```

---

# 27. Keep Routes Thin

Avoid putting large amounts of business logic directly inside routes.

Not ideal:

```js
app.post("/users", async (req, res) => {

  // validation

  // password hashing

  // database query

  // email

  // business logic

  // response
});
```

Better:

```js
app.post(
  "/users",
  userController.createUser
);
```

Then:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

This improves:

```text
Maintainability
Testing
Readability
Reusability
```

---

# 28. Controller Example

```js
const createUser = async (req, res) => {
  const user = req.body;

  // Call service here

  res.status(201).json({
    message: "User created",
    user
  });
};

module.exports = {
  createUser
};
```

Route:

```js
const express = require("express");

const {
  createUser
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
```

---

# 29. Route Middleware ⭐⭐⭐⭐⭐

Middleware can be attached to a specific route.

```js
router.get(
  "/profile",
  authMiddleware,
  getProfile
);
```

Flow:

```text
GET /profile
      ↓
authMiddleware
      ↓
getProfile
      ↓
Response
```

Multiple middleware:

```js
router.post(
  "/",
  authMiddleware,
  validateUser,
  createUser
);
```

Flow:

```text
Request
   ↓
Authentication
   ↓
Validation
   ↓
Controller
   ↓
Response
```

---

# 30. Router-Level Middleware

You can apply middleware to all routes in a router:

```js
router.use(authMiddleware);
```

Now all routes in that router pass through:

```text
authMiddleware
```

Example:

```text
GET /
POST /
GET /:id
DELETE /:id
```

---

# 31. Route-Specific vs Router-Level Middleware

### Route-specific

```js
router.get(
  "/profile",
  authMiddleware,
  getProfile
);
```

Only `/profile` uses it.

### Router-level

```js
router.use(authMiddleware);
```

All routes in that router use it.

---

# 32. Complete Route Organization Example ⭐⭐⭐⭐⭐

## `app.js`

```js
const express = require("express");

const userRouter =
  require("./routes/user.routes");

const productRouter =
  require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use(
  "/users",
  userRouter
);

app.use(
  "/products",
  productRouter
);

app.listen(3000, () => {
  console.log(
    "Server running on port 3000"
  );
});
```

## `routes/user.routes.js`

```js
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Get users"
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Create user"
  });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Get user",
    id: req.params.id
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "Update user",
    id: req.params.id
  });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

module.exports = router;
```

Final API:

```text
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

---

# 33. Route Matching ⭐⭐⭐⭐⭐

Express matches requests based on:

```text
HTTP Method
+
Route Path
```

Example:

```js
app.get("/users", handler);
```

matches:

```text
GET /users
```

but not:

```text
POST /users
```

because the HTTP method is different.

A dynamic route:

```js
app.get("/users/:id", handler);
```

can match:

```text
GET /users/101
GET /users/500
GET /users/999
```

---

# 34. Route Order Matters ⭐⭐⭐⭐⭐

Express processes routes and middleware in registration order.

For overlapping routes, place more specific routes before general dynamic routes.

Example:

```js
app.get("/users/me", (req, res) => {
  res.send("My profile");
});

app.get("/users/:id", (req, res) => {
  res.send("Dynamic user");
});
```

Request:

```text
GET /users/me
```

will match the specific `/users/me` route first.

General rule:

> Put specific routes before overlapping dynamic routes.

---

# 35. `app.use()` vs HTTP Route Methods ⭐⭐⭐⭐⭐

### `app.get()`

Handles GET requests for a route:

```js
app.get("/users", handler);
```

### `app.post()`

Handles POST requests:

```js
app.post("/users", handler);
```

### `app.use()`

Primarily used to mount middleware or routers:

```js
app.use("/users", userRouter);
```

Mental model:

```text
app.get()
   ↓
Specific GET route

app.post()
   ↓
Specific POST route

app.use()
   ↓
Middleware / Router mounting
```

---

# 36. Common REST Route Design

For users:

```text
GET    /users
POST   /users
GET    /users/:id
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

For products:

```text
GET    /products
POST   /products
GET    /products/:id
PATCH  /products/:id
DELETE /products/:id
```

For orders:

```text
GET    /orders
POST   /orders
GET    /orders/:id
PATCH  /orders/:id
DELETE /orders/:id
```

---

# 37. Avoid Verb-Based URLs

Avoid:

```text
/getUsers
/createUser
/updateUser
/deleteUser
```

Prefer resource-oriented URLs:

```text
GET    /users
POST   /users
PATCH  /users/:id
DELETE /users/:id
```

The HTTP method already describes the operation.

---

# 38. Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is routing in Express?

> Routing defines how an Express application responds to requests based on the HTTP method and URL path.

### Q2. How do you define a GET route?

```js
app.get("/users", handler);
```

### Q3. How do you define a POST route?

```js
app.post("/users", handler);
```

### Q4. Where are route parameters stored?

```js
req.params
```

### Q5. Where are query parameters stored?

```js
req.query
```

### Q6. What is `express.Router()`?

> `express.Router()` creates a modular router that can contain related routes and middleware and can be mounted into an Express application.

### Q7. Why use `express.Router()`?

> To split routes into separate modules and keep the application maintainable.

### Q8. What are nested routes?

> Routes that represent a relationship between resources, such as `/users/:userId/orders`.

### Q9. Why use `mergeParams: true`?

> It allows a child router to access parameters defined in the parent route.

### Q10. Are route parameters numbers?

> No. They are strings by default.

### Q11. Difference between `app.use()` and `app.get()`?

```text
app.get()
→ Handles GET routes

app.use()
→ Mounts middleware or routers
```

### Q12. Does route order matter?

> Yes. Express processes routes and middleware in registration order, so overlapping routes should be ordered carefully.

### Q13. Should business logic be inside route handlers?

> Small examples can put logic there, but production applications generally separate routes, controllers, services, and data-access logic.

### Q14. What is the difference between PUT and PATCH?

> PUT generally represents replacing the resource representation, while PATCH represents a partial update.

---

# 39. ⭐ Most Important Interview Points

Be able to explain these without hesitation:

```text
⭐⭐⭐⭐⭐ What is routing?
⭐⭐⭐⭐⭐ GET
⭐⭐⭐⭐⭐ POST
⭐⭐⭐⭐⭐ PUT
⭐⭐⭐⭐⭐ PATCH
⭐⭐⭐⭐⭐ DELETE
⭐⭐⭐⭐⭐ Route parameters
⭐⭐⭐⭐⭐ Query parameters
⭐⭐⭐⭐⭐ Params vs Query
⭐⭐⭐⭐⭐ Nested routes
⭐⭐⭐⭐⭐ express.Router()
⭐⭐⭐⭐⭐ app.use()
⭐⭐⭐⭐⭐ Router mounting
⭐⭐⭐⭐⭐ Route organization
⭐⭐⭐⭐⭐ Route order
⭐⭐⭐⭐⭐ Route middleware
⭐⭐⭐⭐⭐ Router-level middleware
⭐⭐⭐⭐⭐ REST route design
```

---

# 40. Final Mental Model

```text
                    Express App
                         │
                         ↓
                       Router
                         │
            ┌────────────┼────────────┐
            ↓            ↓            ↓
          Users       Products       Orders
           Router       Router        Router
             │            │             │
             ↓            ↓             ↓
          Routes        Routes        Routes
             │
             ↓
        Route Handler
             │
             ↓
         Controller
             │
             ↓
          Service
             │
             ↓
          Database
             │
             ↓
          Response
```

Request:

```text
GET /users/101?active=true
```

Express extracts:

```text
Method
  ↓
GET

Route parameter
  ↓
id = "101"

Query parameter
  ↓
active = "true"
```

Then:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Response
```

---

# Module 12 Checklist

```text
✅ HTTP Methods
  ✅ GET
  ✅ POST
  ✅ PUT
  ✅ PATCH
  ✅ DELETE

✅ Routing
  ✅ Route definition
  ✅ Route matching
  ✅ HTTP method + path
  ✅ Route order

✅ Parameters
  ✅ Route parameters
  ✅ Multiple parameters
  ✅ Query parameters
  ✅ Params vs query

✅ Nested Routes
  ✅ Nested resources
  ✅ Parent/child routes
  ✅ mergeParams

✅ Router
  ✅ express.Router()
  ✅ Router creation
  ✅ Router mounting
  ✅ app.use()

✅ Route Organization
  ✅ Separate route files
  ✅ Resource-based routes
  ✅ Controllers
  ✅ Services
  ✅ Middleware

✅ Middleware
  ✅ Route middleware
  ✅ Router-level middleware

✅ REST Design
  ✅ Resource-oriented URLs
  ✅ HTTP methods
  ✅ Avoid verb-based URLs
```

---

# Quick Revision

```text
Routing
   ↓
HTTP Method + Path
   ↓
Matching Handler

GET
   ↓
Read

POST
   ↓
Create

PUT
   ↓
Replace

PATCH
   ↓
Partial update

DELETE
   ↓
Delete

req.params
   ↓
Route parameters

req.query
   ↓
Query parameters

express.Router()
   ↓
Create modular router

app.use()
   ↓
Mount middleware/router

Nested route
   ↓
Resource relationship

Route organization
   ↓
Routes → Controllers → Services → Database
```
