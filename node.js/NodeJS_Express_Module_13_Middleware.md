# Module 13 – Express Middleware ⭐⭐⭐⭐⭐

## Topics
- What is middleware?
- Application middleware
- Router middleware
- Built-in middleware
- Third-party middleware
- Custom middleware
- Middleware execution order
- `next()`
- Error middleware

---

## 1. What is Middleware?

Middleware is a function that runs between the incoming request and the final response.

```js
(req, res, next) => {
  // middleware logic
}
```

It has access to:

```text
req  → Request
res  → Response
next → Pass control to the next middleware/handler
```

Mental model:

```text
Client
   ↓
Request
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Route Handler
   ↓
Response
   ↓
Client
```

Common use cases:

```text
Logging
Authentication
Authorization
Validation
Request parsing
CORS
Rate limiting
Security
Error handling
```

---

## 2. Basic Middleware

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(logger);
```

Flow:

```text
Request
   ↓
logger
   ↓
next()
   ↓
Route
```

If middleware neither calls `next()` nor sends a response, the request can hang.

A middleware generally either:

```js
next();
```

or ends the request:

```js
return res.status(401).json({
  message: "Unauthorized"
});
```

---

## 3. Middleware Can Modify `req` and `res`

### Modify `req`

```js
app.use((req, res, next) => {
  req.user = {
    id: 101,
    name: "Anil"
  };

  next();
});
```

Later:

```js
app.get("/profile", (req, res) => {
  res.json(req.user);
});
```

### Modify `res`

```js
app.use((req, res, next) => {
  res.setHeader("X-App-Version", "1.0");
  next();
});
```

---

## 4. `next()` ⭐⭐⭐⭐⭐

`next()` tells Express to continue processing the request.

```js
const logger = (req, res, next) => {
  console.log("Request received");
  next();
};
```

Without `next()`:

```text
Request
   ↓
Middleware
   ↓
STOP
```

With `next()`:

```text
Request
   ↓
Middleware
   ↓
next()
   ↓
Next middleware
   ↓
Route
```

---

## 5. Application Middleware ⭐⭐⭐⭐⭐

Application-level middleware is attached to the Express application.

```js
app.use(logger);
```

It can run for all matching requests.

You can also use a path prefix:

```js
app.use("/users", (req, res, next) => {
  console.log("User middleware");
  next();
});
```

This applies to matching `/users` paths.

---

## 6. Router Middleware ⭐⭐⭐⭐⭐

Router-level middleware is attached to an `express.Router()` instance.

```js
const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log("User router middleware");
  next();
});

router.get("/", (req, res) => {
  res.send("Users");
});

router.get("/:id", (req, res) => {
  res.send("User");
});

app.use("/users", router);
```

Flow:

```text
/users
   ↓
User Router
   ↓
Router Middleware
   ↓
Route Handler
```

### Application vs Router Middleware

```text
app.use(logger)
   ↓
Application-level

router.use(auth)
   ↓
Router-level
```

---

## 7. Built-in Middleware ⭐⭐⭐⭐⭐

Important Express built-in middleware:

```js
express.json()
express.urlencoded()
express.static()
```

### `express.json()`

Parses JSON request bodies:

```js
app.use(express.json());
```

Request:

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Anil"
}
```

Then:

```js
req.body
```

contains the parsed object.

### `express.urlencoded()`

Parses URL-encoded form bodies:

```js
app.use(
  express.urlencoded({
    extended: true
  })
);
```

Example:

```text
name=Anil&age=28
```

### `express.static()`

Serves static files:

```js
app.use(express.static("public"));
```

Example:

```text
public/
 ├── index.html
 ├── image.png
 └── style.css
```

---

## 8. Third-Party Middleware ⭐⭐⭐⭐⭐

Third-party middleware comes from external npm packages.

Common examples:

```text
cors
helmet
morgan
cookie-parser
compression
```

Example:

```bash
npm install cors
```

```js
const cors = require("cors");

app.use(cors());
```

### CORS

Controls cross-origin browser requests.

```js
app.use(
  cors({
    origin: "https://example.com"
  })
);
```

### Morgan

HTTP request logging:

```bash
npm install morgan
```

```js
const morgan = require("morgan");

app.use(morgan("dev"));
```

### Helmet

Adds security-related HTTP headers:

```bash
npm install helmet
```

```js
const helmet = require("helmet");

app.use(helmet());
```

---

## 9. Custom Middleware ⭐⭐⭐⭐⭐

Custom middleware is middleware written by you.

### Logger

```js
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.url}`
  );

  next();
};

app.use(logger);
```

### Authentication

```js
const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};
```

Use it:

```js
app.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Profile"
    });
  }
);
```

A real authentication middleware commonly validates the token and attaches the authenticated user:

```js
req.user = {
  id: 101,
  role: "user"
};

next();
```

---

## 10. Middleware Execution Order ⭐⭐⭐⭐⭐

**Order matters.**

Express processes middleware and routes in registration order.

```js
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.get("/", (req, res) => {
  console.log("Route");
  res.send("Hello");
});
```

Output:

```text
Middleware 1
Middleware 2
Route
```

Flow:

```text
Request
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Route
   ↓
Response
```

---

## 11. Multiple Middleware on One Route ⭐⭐⭐⭐⭐

```js
app.post(
  "/users",
  authMiddleware,
  validateUser,
  createUser
);
```

Flow:

```text
POST /users
      ↓
authMiddleware
      ↓
validateUser
      ↓
createUser
      ↓
Response
```

Each middleware must either:

```text
next()
```

or:

```text
Send a response
```

---

## 12. Middleware Can Stop Execution

```js
const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  next();
};
```

If authentication fails:

```text
Request
   ↓
authMiddleware
   ↓
401 Response
   ↓
STOP
```

The later route does not execute.

---

## 13. Error Middleware ⭐⭐⭐⭐⭐

Error-handling middleware has **four arguments**:

```js
(err, req, res, next)
```

Example:

```js
const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong"
  });
};
```

The first `err` argument identifies this as error-handling middleware.

Normal middleware:

```js
(req, res, next)
```

Error middleware:

```js
(err, req, res, next)
```

---

## 14. `next()` vs `next(error)` ⭐⭐⭐⭐⭐

### Normal flow

```js
next();
```

Means:

```text
Continue normal middleware chain
```

### Error flow

```js
next(error);
```

Means:

```text
Skip normal middleware
        ↓
Error-handling middleware
```

Example:

```js
app.get("/users", (req, res, next) => {
  try {
    throw new Error("Database failed");
  } catch (error) {
    next(error);
  }
});
```

Error middleware:

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });
});
```

Flow:

```text
Request
   ↓
Route
   ↓
Error
   ↓
next(error)
   ↓
Error Middleware
   ↓
500 Response
```

---

## 15. Error Middleware Order ⭐⭐⭐⭐⭐

Error middleware is generally registered after routes and middleware that may pass errors to it.

Correct:

```js
app.get("/users", handler);

app.get("/products", handler);

app.use(errorMiddleware);
```

Flow:

```text
Routes
   ↓
Error
   ↓
Error Middleware
```

---

## 16. Centralized Error Handling

Instead of handling errors separately in every route:

```js
app.get("/users", ...);
app.get("/products", ...);
app.post("/orders", ...);
```

use a centralized handler:

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });
});
```

Benefits:

```text
Consistent error responses
Centralized logging
Cleaner controllers
Easier maintenance
```

A production-style pattern:

```js
const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    message:
      err.message ||
      "Internal Server Error"
  });
};
```

---

## 17. Don't Expose Sensitive Errors

Avoid returning detailed stack traces in production:

```js
res.status(500).json({
  message: err.stack
});
```

Stack traces can reveal:

```text
File paths
Database information
Internal implementation details
Sensitive information
```

Prefer:

```js
res.status(500).json({
  message: "Internal Server Error"
});
```

Log detailed information internally.

---

## 18. Full Middleware Request Flow ⭐⭐⭐⭐⭐

```js
const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Logger");
  next();
});

const auth = (req, res, next) => {
  console.log("Auth");
  next();
};

const validate = (req, res, next) => {
  console.log("Validation");
  next();
};

app.post(
  "/users",
  auth,
  validate,
  (req, res) => {
    console.log("Controller");

    res.status(201).json({
      message: "User created"
    });
  }
);

app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
);

app.listen(3000);
```

Flow:

```text
POST /users
     ↓
express.json()
     ↓
Logger
     ↓
Auth
     ↓
Validation
     ↓
Controller
     ↓
Response
```

If an error occurs:

```text
Any middleware / controller
           ↓
      next(error)
           ↓
     Error Middleware
           ↓
       Error Response
```

---

## 19. Middleware Categories

Remember these six categories:

```text
1. Application middleware
2. Router middleware
3. Built-in middleware
4. Third-party middleware
5. Custom middleware
6. Error-handling middleware
```

| Type | Example | Purpose |
|---|---|---|
| Application | `app.use(logger)` | App-wide processing |
| Router | `router.use(auth)` | Router-specific processing |
| Built-in | `express.json()` | Express-provided functionality |
| Third-party | `cors()`, `helmet()` | External functionality |
| Custom | `authMiddleware` | Your own logic |
| Error | `(err, req, res, next)` | Centralized error handling |

---

## 20. Real-World Request Flow ⭐⭐⭐⭐⭐

A production API might look like:

```text
Client
  ↓
CORS
  ↓
Security Headers
  ↓
JSON Parser
  ↓
Logger
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Response
```

If something fails:

```text
Any Layer
   ↓
next(error)
   ↓
Error Middleware
   ↓
Log Error
   ↓
Send Response
```

---

# Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is middleware?

> Middleware is a function that has access to the request, response, and `next` function and participates in the request-response lifecycle.

### Q2. What is `next()`?

> `next()` passes control to the next middleware or matching route handler.

### Q3. What happens if you don't call `next()`?

> If the middleware doesn't send a response either, the request can remain hanging.

### Q4. Can middleware modify `req`?

Yes:

```js
req.user = user;
```

### Q5. Can middleware modify `res`?

Yes:

```js
res.setHeader("X-App", "API");
```

### Q6. What is application-level middleware?

```js
app.use(middleware);
```

Middleware attached to the Express application.

### Q7. What is router-level middleware?

```js
router.use(middleware);
```

Middleware attached to a specific router.

### Q8. Name Express built-in middleware.

```js
express.json()
express.urlencoded()
express.static()
```

### Q9. What is third-party middleware?

> Middleware provided by an external npm package.

Examples:

```text
cors
helmet
morgan
```

### Q10. What is custom middleware?

> Middleware written by the developer for application-specific logic.

### Q11. How do you pass an error to error middleware?

```js
next(error);
```

### Q12. What is the signature of error middleware?

```js
(err, req, res, next)
```

### Q13. Why does error middleware have four arguments?

> Express identifies it as error-handling middleware based on the four-argument signature.

### Q14. Where should error middleware generally be registered?

> After the application's routes and other middleware that may pass errors to it.

### Q15. Does middleware execute in random order?

> No. Express processes middleware and routes in registration order.

### Q16. Difference between `next()` and `next(error)`?

```text
next()
    ↓
Continue normal flow

next(error)
    ↓
Enter error-handling flow
```

### Q17. Can multiple middleware be used on one route?

Yes:

```js
app.post(
  "/users",
  auth,
  validate,
  createUser
);
```

---

# ⭐ Most Important Interview Points

Be able to explain:

```text
⭐⭐⭐⭐⭐ What is middleware?
⭐⭐⭐⭐⭐ Request-response lifecycle
⭐⭐⭐⭐⭐ req, res, next
⭐⭐⭐⭐⭐ next()
⭐⭐⭐⭐⭐ next(error)
⭐⭐⭐⭐⭐ Middleware execution order
⭐⭐⭐⭐⭐ Application middleware
⭐⭐⭐⭐⭐ Router middleware
⭐⭐⭐⭐⭐ Built-in middleware
⭐⭐⭐⭐⭐ Third-party middleware
⭐⭐⭐⭐⭐ Custom middleware
⭐⭐⭐⭐⭐ Authentication middleware
⭐⭐⭐⭐⭐ Middleware modifying req
⭐⭐⭐⭐⭐ Error middleware
⭐⭐⭐⭐⭐ Error middleware signature
⭐⭐⭐⭐⭐ Centralized error handling
```

---

# Final Mental Model

```text
                    HTTP Request
                         │
                         ↓
                Application Middleware
                         │
                         ↓
                 Built-in Middleware
                         │
                         ↓
                Router Middleware
                         │
                         ↓
               Route Middleware
                         │
                         ↓
                   Controller
                         │
                         ↓
                    Response
```

### Normal flow

```text
Middleware
    ↓
next()
    ↓
Next Middleware
    ↓
next()
    ↓
Controller
    ↓
Response
```

### Error flow

```text
Middleware / Controller
          ↓
      next(error)
          ↓
    Error Middleware
          ↓
       Response
```

---

# Module 13 Checklist

```text
✅ Middleware
  ✅ What is middleware?
  ✅ Request-response lifecycle
  ✅ req
  ✅ res
  ✅ next()

✅ Middleware Types
  ✅ Application middleware
  ✅ Router middleware
  ✅ Built-in middleware
  ✅ Third-party middleware
  ✅ Custom middleware
  ✅ Error middleware

✅ Built-in
  ✅ express.json()
  ✅ express.urlencoded()
  ✅ express.static()

✅ Third-party
  ✅ cors
  ✅ helmet
  ✅ morgan

✅ Custom
  ✅ Logger
  ✅ Authentication
  ✅ Authorization
  ✅ Validation

✅ Execution
  ✅ Middleware order
  ✅ next()
  ✅ Sending response
  ✅ Stopping execution
  ✅ Multiple middleware

✅ Error Handling
  ✅ next(error)
  ✅ Error middleware
  ✅ Four arguments
  ✅ Centralized error handling
  ✅ Error middleware order
```

# Quick Revision

```text
Middleware
    ↓
Function between request and response

(req, res, next)
    ↓
req  → Request
res  → Response
next → Continue

next()
    ↓
Continue normal middleware chain

next(error)
    ↓
Error-handling chain

app.use()
    ↓
Application middleware

router.use()
    ↓
Router middleware

express.json()
    ↓
Built-in middleware

cors / helmet / morgan
    ↓
Third-party middleware

Custom middleware
    ↓
Your own logic

(err, req, res, next)
    ↓
Error middleware

Execution order
    ↓
Registration order
```

## Interview One-Liner

> **Express middleware is a function that sits in the request-response pipeline, can inspect or modify `req`/`res`, perform logic, call `next()` to continue, or terminate the request; errors are forwarded using `next(error)` to centralized error-handling middleware.**
