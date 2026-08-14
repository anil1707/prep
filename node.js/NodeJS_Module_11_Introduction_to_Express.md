# Module 11 – Introduction to Express ⭐⭐⭐⭐⭐

## Topics

- Why Express?
- Express architecture
- Creating server
- Routes
- Request
- Response
- `app.listen`
- Route parameters
- Query parameters
- Request body

---

# 1. What is Express?

**Express.js** is a lightweight web framework built on top of Node.js.

It provides convenient APIs for:

```text
Routing
Middleware
Request handling
Response handling
Error handling
REST API development
```

Without Express:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (
    req.method === "GET" &&
    req.url === "/users"
  ) {
    res.end("Users");
  }
});
```

With Express:

```js
const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  res.send("Users");
});
```

Express reduces boilerplate and makes backend code easier to organize.

---

# 2. Why Express? ⭐⭐⭐⭐⭐

Node's `http` module is relatively low-level.

Without Express, you often have to manually handle:

```text
Routing
Request body parsing
Headers
Response handling
Method checking
Middleware flow
```

Express provides convenient abstractions for these tasks.

### Node HTTP

```js
if (
  req.method === "GET" &&
  req.url === "/users"
) {
  // ...
}
```

### Express

```js
app.get("/users", (req, res) => {
  // ...
});
```

### Main advantages

```text
Simple routing
Middleware support
Cleaner request/response APIs
Easy REST API development
Better project organization
Large ecosystem
```

---

# 3. Express Architecture ⭐⭐⭐⭐⭐

A typical Express request flow:

```text
Client
   ↓
HTTP Request
   ↓
Node HTTP Server
   ↓
Express Application
   ↓
Middleware
   ↓
Router
   ↓
Route Handler
   ↓
Business Logic
   ↓
Database / External API
   ↓
Response
   ↓
Client
```

Example:

```text
GET /users/101
       ↓
Logger Middleware
       ↓
Auth Middleware
       ↓
Router
       ↓
User Controller
       ↓
Database
       ↓
Response
```

---

# 4. Creating an Express Application ⭐⭐⭐⭐⭐

First install Express:

```bash
npm install express
```

Create the application:

```js
const express = require("express");

const app = express();
```

Here:

```text
express()
    ↓
Creates Express application
    ↓
app
```

The `app` object provides methods such as:

```text
app.get()
app.post()
app.put()
app.patch()
app.delete()
app.use()
app.listen()
```

---

# 5. Creating an Express Server ⭐⭐⭐⭐⭐

Basic server:

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Open:

```text
http://localhost:3000
```

Response:

```text
Hello World
```

---

# 6. `app.listen()` ⭐⭐⭐⭐⭐

`app.listen()` starts the Express application listening for incoming connections.

```js
app.listen(3000, () => {
  console.log("Server started");
});
```

Conceptually:

```text
Express App
    ↓
Listen
    ↓
Port 3000
    ↓
Accept HTTP requests
```

You can also specify a host:

```js
app.listen(
  3000,
  "localhost",
  () => {
    console.log("Server started");
  }
);
```

---

# 7. What Happens Internally?

Express ultimately uses Node's HTTP infrastructure.

Conceptually:

```text
Express
   ↓
Node.js HTTP Server
   ↓
HTTP Request
   ↓
Express Middleware / Router
   ↓
Route Handler
   ↓
HTTP Response
```

This is why understanding the Node.js `http` module before Express is useful.

---

# 8. Express Routes ⭐⭐⭐⭐⭐

A route defines how the application responds to a particular HTTP method and path.

General syntax:

```js
app.METHOD(PATH, HANDLER);
```

Example:

```js
app.get("/users", (req, res) => {
  res.send("Get users");
});
```

Breakdown:

```text
app.get
   ↓
HTTP Method

/users
   ↓
Route Path

(req, res) => {}
   ↓
Handler
```

---

# 9. GET Route

```js
app.get("/users", (req, res) => {
  res.send("Get users");
});
```

Request:

```http
GET /users
```

Response:

```text
Get users
```

---

# 10. POST Route

```js
app.post("/users", (req, res) => {
  res.send("Create user");
});
```

Request:

```http
POST /users
```

---

# 11. PUT Route

```js
app.put("/users/:id", (req, res) => {
  res.send("Replace user");
});
```

---

# 12. PATCH Route

```js
app.patch("/users/:id", (req, res) => {
  res.send("Update user");
});
```

---

# 13. DELETE Route

```js
app.delete("/users/:id", (req, res) => {
  res.send("Delete user");
});
```

---

# 14. Express Route Summary ⭐⭐⭐⭐⭐

```js
app.get("/users", handler);

app.post("/users", handler);

app.put("/users/:id", handler);

app.patch("/users/:id", handler);

app.delete("/users/:id", handler);
```

Mental model:

```text
HTTP Method + URL
        ↓
      Route
        ↓
     Handler
```

---

# 15. Request Object ⭐⭐⭐⭐⭐

Express provides the `req` object.

Common properties:

```text
req.params
req.query
req.body
req.headers
req.method
req.path
req.url
```

Example:

```js
app.get("/users", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
});
```

---

# 16. Response Object ⭐⭐⭐⭐⭐

Express provides the `res` object.

Common methods:

```text
res.send()
res.json()
res.status()
res.end()
res.set()
res.redirect()
```

Example:

```js
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users fetched"
  });
});
```

---

# 17. `res.send()` ⭐⭐⭐⭐⭐

Used to send a response.

```js
res.send("Hello World");
```

Can also send HTML:

```js
res.send("<h1>Hello</h1>");
```

`res.send()` is a general-purpose response helper.

---

# 18. `res.json()` ⭐⭐⭐⭐⭐

Used to send JSON.

```js
app.get("/users", (req, res) => {
  res.json({
    id: 1,
    name: "Anil"
  });
});
```

Express handles JSON serialization and the appropriate response content type.

---

# 19. `res.status()` ⭐⭐⭐⭐⭐

Used to set the HTTP status code.

```js
res.status(200).json({
  message: "Success"
});
```

Example:

```js
res.status(404).json({
  message: "User not found"
});
```

Common patterns:

```js
res.status(200).json(data);

res.status(201).json(data);

res.status(400).json(error);

res.status(401).json(error);

res.status(404).json(error);

res.status(500).json(error);
```

---

# 20. Combining `status()` and `json()`

Very common Express pattern:

```js
res
  .status(201)
  .json({
    message: "User created",
    user
  });
```

This is method chaining.

---

# 21. Route Parameters ⭐⭐⭐⭐⭐

Route parameters are dynamic values inside the URL path.

Example:

```js
app.get(
  "/users/:id",
  (req, res) => {
    console.log(req.params);
  }
);
```

Request:

```text
GET /users/101
```

Then:

```js
req.params
```

contains:

```js
{
  id: "101"
}
```

---

# 22. Accessing a Route Parameter

```js
app.get(
  "/users/:id",
  (req, res) => {

    const userId =
      req.params.id;

    res.json({
      userId
    });
  }
);
```

Request:

```text
/users/101
```

Response:

```json
{
  "userId": "101"
}
```

Important:

> Route parameter values are strings by default.

If you need a number:

```js
const userId =
  Number(req.params.id);
```

---

# 23. Multiple Route Parameters

```js
app.get(
  "/users/:userId/orders/:orderId",
  (req, res) => {
    console.log(req.params);
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

# 24. Query Parameters ⭐⭐⭐⭐⭐

Query parameters appear after `?`.

Example:

```text
/users?city=mumbai&age=28
```

Express makes them available through:

```js
req.query
```

Example:

```js
app.get("/users", (req, res) => {
  console.log(req.query);
});
```

Request:

```text
/users?city=mumbai&age=28
```

Result:

```js
{
  city: "mumbai",
  age: "28"
}
```

Common uses:

```text
Filtering
Searching
Sorting
Pagination
Optional behavior
```

---

# 25. Query Parameter Example

```js
app.get("/products", (req, res) => {
  const {
    category,
    page,
    limit
  } = req.query;

  res.json({
    category,
    page,
    limit
  });
});
```

Request:

```text
/products?category=mobile&page=2&limit=20
```

Response:

```json
{
  "category": "mobile",
  "page": "2",
  "limit": "20"
}
```

If numbers are needed:

```js
const page = Number(req.query.page);
const limit = Number(req.query.limit);
```

---

# 26. Route Params vs Query Params ⭐⭐⭐⭐⭐

### Route parameter

Used to identify a specific resource.

```text
/users/101
```

```js
req.params.id
```

### Query parameter

Used for filtering, searching, sorting, pagination, or optional behavior.

```text
/users?active=true&page=2
```

```js
req.query.active
req.query.page
```

Mental model:

```text
/users/101
       ↑
    Which user?

/users?active=true
       ↑
   Which subset?
```

---

# 27. Request Body ⭐⭐⭐⭐⭐

The request body contains data sent by the client.

Example:

```http
POST /users
Content-Type: application/json

{
  "name": "Anil",
  "email": "anil@example.com"
}
```

In Express, access it using:

```js
req.body
```

But you must configure body-parsing middleware.

---

# 28. `express.json()` ⭐⭐⭐⭐⭐

For JSON request bodies:

```js
const express = require("express");

const app = express();

app.use(express.json());
```

Now:

```js
app.post("/users", (req, res) => {
  console.log(req.body);

  res.json(req.body);
});
```

Request:

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Then:

```js
req.body
```

contains:

```js
{
  name: "Anil",
  email: "anil@example.com"
}
```

---

# 29. Why `express.json()`?

Compare this with the Node `http` module.

### Node HTTP

```text
req
 ↓
Readable Stream
 ↓
data chunks
 ↓
end
 ↓
JSON.parse(body)
```

### Express

```text
req
 ↓
express.json()
 ↓
Parse JSON
 ↓
req.body
```

This is one of the major conveniences Express provides.

---

# 30. Complete POST Example ⭐⭐⭐⭐⭐

```js
const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  const user = req.body;

  console.log(user);

  res
    .status(201)
    .json({
      message: "User created",
      user
    });
});

app.listen(3000);
```

Request:

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Response:

```json
{
  "message": "User created",
  "user": {
    "name": "Anil",
    "email": "anil@example.com"
  }
}
```

---

# 31. Complete Example – Params + Query + Body ⭐⭐⭐⭐⭐

```js
const express = require("express");

const app = express();

app.use(express.json());

app.patch(
  "/users/:id",
  (req, res) => {

    const userId =
      req.params.id;

    const {
      notify
    } = req.query;

    const updates =
      req.body;

    res.json({
      userId,
      notify,
      updates
    });
  }
);

app.listen(3000);
```

Request:

```text
PATCH /users/101?notify=true
```

Body:

```json
{
  "name": "Anil Kumar"
}
```

Express gives:

```js
req.params
// { id: "101" }

req.query
// { notify: "true" }

req.body
// { name: "Anil Kumar" }
```

This is an extremely important interview concept.

---

# 32. Express Request Mental Model ⭐⭐⭐⭐⭐

```text
HTTP Request
      │
      ├── Method
      ├── URL
      ├── Headers
      ├── Params
      ├── Query
      └── Body
             ↓
          Express
             ↓
           req
```

Access:

```text
req.params  → Route parameters
req.query   → Query parameters
req.body    → Request body
req.headers → Headers
```

---

# 33. Express Response Mental Model

```text
Route Handler
      ↓
     res
      │
      ├── status()
      ├── json()
      ├── send()
      ├── end()
      ├── set()
      └── redirect()
```

Example:

```js
res
  .status(200)
  .json({
    message: "Success"
  });
```

---

# 34. Express Server Architecture ⭐⭐⭐⭐⭐

A real-world Express application often looks like:

```text
Client
   ↓
Express Server
   ↓
Global Middleware
   ↓
Router
   ↓
Route Middleware
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Controller
   ↓
Response
   ↓
Client
```

Example:

```text
POST /users
      ↓
Authentication
      ↓
Validation
      ↓
User Controller
      ↓
User Service
      ↓
Database
      ↓
201 Created
```

Middleware, controllers, services, databases, authentication, and error handling will be covered in later modules.

---

# 35. Express vs Node HTTP ⭐⭐⭐⭐⭐

| Node `http` | Express |
|---|---|
| Low-level | Higher-level framework |
| Manual routing | Routing APIs |
| Manual body parsing | Body-parsing middleware |
| Manual response handling | `res.json()`, `res.send()` |
| Manual middleware system | Middleware built in |
| More boilerplate | Less boilerplate |
| Core Node functionality | Built on Node HTTP |

Example:

### Node

```js
if (
  req.method === "GET" &&
  req.url === "/users"
) {
  res.end("Users");
}
```

### Express

```js
app.get("/users", (req, res) => {
  res.send("Users");
});
```

---

# 36. Express Does Not Replace Node.js

Express is not a replacement for Node.js.

Think:

```text
Node.js
   ↓
JavaScript Runtime
   ↓
HTTP / File System / Streams / etc.
   ↓
Express
   ↓
Web Framework
```

Express uses Node.js capabilities underneath.

---

# 37. Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is Express?

> Express is a lightweight web framework for Node.js that provides convenient abstractions for routing, middleware, request handling, and response handling.

### Q2. Why use Express instead of Node's `http` module?

> Node's `http` module is low-level and requires more manual work. Express provides routing, middleware, and convenient request/response APIs.

### Q3. How do you create an Express application?

```js
const express = require("express");

const app = express();
```

### Q4. How do you start an Express server?

```js
app.listen(3000);
```

### Q5. How do you define a GET route?

```js
app.get("/users", (req, res) => {
  res.send("Users");
});
```

### Q6. Where are route parameters stored?

```js
req.params
```

### Q7. Where are query parameters stored?

```js
req.query
```

### Q8. Where is the request body stored?

```js
req.body
```

after the appropriate body-parsing middleware has processed it.

### Q9. How do you parse JSON request bodies?

```js
app.use(express.json());
```

### Q10. Difference between `req.params` and `req.query`?

```text
req.params
→ Values embedded in route path

req.query
→ Values after ?
```

Example:

```text
/users/101?active=true
```

```js
req.params.id
// "101"

req.query.active
// "true"
```

### Q11. Difference between `res.send()` and `res.json()`?

> `res.send()` is a general-purpose response helper, while `res.json()` is specifically intended for JSON responses and serializes the value as JSON.

### Q12. How do you send a status code?

```js
res.status(404).json({
  message: "Not found"
});
```

### Q13. What happens if `express.json()` is not used?

> JSON request bodies will not be parsed by that middleware, so `req.body` will generally be undefined for those requests.

### Q14. Is Express a Node.js runtime?

> No. Node.js is the runtime; Express is a web framework that runs on Node.js.

### Q15. How does Express handle HTTP requests internally?

> Express receives requests through Node's HTTP infrastructure and passes them through its middleware and routing layers before the final handler sends a response.

---

# 38. ⭐ Most Important Interview Points

Be able to explain these without hesitation:

```text
⭐⭐⭐⭐⭐ What is Express?
⭐⭐⭐⭐⭐ Why Express?
⭐⭐⭐⭐⭐ Express architecture
⭐⭐⭐⭐⭐ express()
⭐⭐⭐⭐⭐ app.listen()
⭐⭐⭐⭐⭐ app.get()
⭐⭐⭐⭐⭐ app.post()
⭐⭐⭐⭐⭐ app.put()
⭐⭐⭐⭐⭐ app.patch()
⭐⭐⭐⭐⭐ app.delete()
⭐⭐⭐⭐⭐ req
⭐⭐⭐⭐⭐ res
⭐⭐⭐⭐⭐ req.params
⭐⭐⭐⭐⭐ req.query
⭐⭐⭐⭐⭐ req.body
⭐⭐⭐⭐⭐ express.json()
⭐⭐⭐⭐⭐ res.status()
⭐⭐⭐⭐⭐ res.json()
⭐⭐⭐⭐⭐ res.send()
⭐⭐⭐⭐⭐ Node HTTP vs Express
```

---

# 39. Final Mental Model

```text
                    Express
                       │
                 express()
                       │
                       ↓
                     app
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       Middleware     Router       Error Handler
                         │
                         ↓
                    Route Handler
                         │
                  ┌──────┴──────┐
                  ↓             ↓
                 req           res
                  │             │
          ┌───────┼───────┐     │
          ↓       ↓       ↓     ↓
       params   query   body  status/json
```

---

# Module 11 Checklist

```text
✅ Express
  ✅ What is Express?
  ✅ Why Express?
  ✅ Express architecture
  ✅ Node HTTP vs Express

✅ Server
  ✅ express()
  ✅ app
  ✅ app.listen()

✅ Routes
  ✅ GET
  ✅ POST
  ✅ PUT
  ✅ PATCH
  ✅ DELETE

✅ Request
  ✅ req
  ✅ req.params
  ✅ req.query
  ✅ req.body
  ✅ req.headers
  ✅ req.method
  ✅ req.url

✅ Response
  ✅ res
  ✅ res.send()
  ✅ res.json()
  ✅ res.status()
  ✅ res.end()
  ✅ res.set()

✅ Parameters
  ✅ Route parameters
  ✅ Multiple route parameters
  ✅ Query parameters
  ✅ Params vs query

✅ Request Body
  ✅ express.json()
  ✅ JSON body
  ✅ req.body

✅ Architecture
  ✅ Client
  ✅ Express
  ✅ Middleware
  ✅ Router
  ✅ Route handler
  ✅ Business logic
  ✅ Database
  ✅ Response
```

# Quick Revision

```text
Express
   ↓
Node.js web framework

express()
   ↓
Creates Express application

app.listen()
   ↓
Starts server

app.get()
   ↓
GET route

app.post()
   ↓
POST route

req.params
   ↓
Route parameters

req.query
   ↓
Query parameters

req.body
   ↓
Request body

express.json()
   ↓
Parses JSON request bodies

res.status()
   ↓
Set status code

res.json()
   ↓
Send JSON

res.send()
   ↓
Send general response

Node HTTP
   ↓
Low-level

Express
   ↓
Higher-level abstraction
```
