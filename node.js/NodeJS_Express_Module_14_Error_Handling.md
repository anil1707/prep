# Module 14 – Express Error Handling ⭐⭐⭐⭐⭐

## Topics
- Synchronous errors
- Async errors
- Error middleware
- Custom Error class
- Centralized error handling
- HTTP error responses
- Production error handling
- Logging errors

---

## 1. What is Error Handling?

Error handling means detecting, handling, logging, and responding to errors during request processing.

```text
Request
   ↓
Route / Controller
   ↓
Error
   ↓
Error Middleware
   ↓
Log Error
   ↓
HTTP Response
```

---

## 2. Synchronous Errors ⭐⭐⭐⭐⭐

A synchronous error occurs during normal synchronous execution.

```js
app.get("/users", (req, res) => {
  throw new Error("Something went wrong");
});
```

Express catches synchronous errors thrown from route handlers/middleware and passes them to the error-handling flow.

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
GET /users
    ↓
Route
    ↓
throw Error
    ↓
Error Middleware
    ↓
500 Response
```

You can also explicitly catch errors:

```js
app.get("/users", (req, res, next) => {
  try {
    const result = JSON.parse("invalid json");
    res.json(result);
  } catch (error) {
    next(error);
  }
});
```

---

## 3. Asynchronous Errors ⭐⭐⭐⭐⭐

Async errors occur during asynchronous operations.

Common pattern:

```js
app.get("/users", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
```

Flow:

```text
getUsers()
    ↓
Promise rejected
    ↓
catch(error)
    ↓
next(error)
    ↓
Error Middleware
```

### Express 5

Express 5 automatically forwards rejected promises returned by route handlers and middleware to `next()`.

```js
app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});
```

If `getUsers()` rejects:

```text
Promise rejected
      ↓
Express 5
      ↓
Error middleware
```

Still understand `try/catch + next(error)` because it is common in existing codebases and useful for explicit/custom error handling.

---

## 4. Error Middleware ⭐⭐⭐⭐⭐

Error-handling middleware has four parameters:

```js
(err, req, res, next)
```

Example:

```js
const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong"
  });
};

app.use(errorMiddleware);
```

Normal middleware:

```js
(req, res, next)
```

Error middleware:

```js
(err, req, res, next)
```

The first `err` argument identifies it as an error handler.

---

## 5. `next()` vs `next(error)` ⭐⭐⭐⭐⭐

### `next()`

Continues normal execution:

```js
next();
```

```text
Middleware
    ↓
Next middleware
```

### `next(error)`

Switches to error handling:

```js
next(error);
```

```text
Middleware
    ↓
Error
    ↓
Error Middleware
```

---

## 6. Centralized Error Handling ⭐⭐⭐⭐⭐

Instead of handling errors separately in every route:

```js
app.get("/users", ...);
app.get("/products", ...);
app.post("/orders", ...);
```

use one centralized handler:

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
Consistent responses
Centralized logging
Cleaner controllers
Less duplicate code
Easier maintenance
Easier debugging
```

Register it after your routes:

```js
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.use(errorMiddleware);
```

---

## 7. Custom Error Class ⭐⭐⭐⭐⭐

A custom error class can store application-specific information such as an HTTP status code.

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(
      this,
      this.constructor
    );
  }
}
```

Use:

```js
throw new AppError(
  "User not found",
  404
);
```

Now the error contains:

```text
message
statusCode
stack
```

Why use it?

```text
Normal Error
    ↓
message only

AppError
    ↓
message + statusCode + stack
```

---

## 8. Custom Error Example

`AppError.js`

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(
      this,
      this.constructor
    );
  }
}

module.exports = AppError;
```

Controller:

```js
const AppError = require("./AppError");

app.get("/users/:id", (req, res, next) => {
  const user = null;

  if (!user) {
    return next(
      new AppError(
        "User not found",
        404
      )
    );
  }

  res.json(user);
});
```

Centralized handler:

```js
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message:
      err.message ||
      "Internal Server Error"
  });
};
```

---

## 9. HTTP Error Responses ⭐⭐⭐⭐⭐

Use an appropriate status code.

| Status | Meaning | Example |
|---|---|---|
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Content | Validation/business-rule failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server failure |
| 502 | Bad Gateway | Upstream service failure |
| 503 | Service Unavailable | Temporary service failure |

### 400

```js
next(new AppError("Invalid request", 400));
```

### 401

```js
next(new AppError("Authentication required", 401));
```

### 403

```js
next(new AppError("Access denied", 403));
```

Remember:

```text
401
→ Authentication is missing/invalid.

403
→ User is authenticated but not allowed.
```

### 404

```js
next(new AppError("User not found", 404));
```

### 409

Useful for conflicts such as duplicate email:

```js
next(new AppError("Email already exists", 409));
```

### 422

Useful for validation/business-rule failures:

```js
next(new AppError("Invalid email address", 422));
```

### 429

Used when rate limits are exceeded.

### 500

Used for unexpected server-side failures.

---

## 10. Production Error Handling ⭐⭐⭐⭐⭐

Development and production error responses should be different.

### Development

Detailed information may be useful:

```text
Error message
Stack trace
Debug information
```

### Production

Return a safe response:

```json
{
  "message": "Internal Server Error"
}
```

while logging detailed information internally.

Mental model:

```text
Development
   ↓
Detailed error

Production
   ↓
Safe client response
+
Detailed internal logs
```

---

## 11. Don't Expose Stack Traces

Avoid returning:

```js
res.status(500).json({
  message: err.stack
});
```

Stack traces may reveal:

```text
Internal file paths
Database details
Implementation details
Sensitive information
```

Prefer:

```js
res.status(500).json({
  message: "Internal Server Error"
});
```

Log the detailed error internally.

---

## 12. Logging Errors ⭐⭐⭐⭐⭐

Basic:

```js
console.error(err);
```

Better:

```js
app.use((err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });

  res.status(500).json({
    message: "Internal Server Error"
  });
});
```

Production applications commonly use dedicated logging/monitoring tools such as:

```text
Winston
Pino
Cloud logging services
Application monitoring platforms
```

Useful information to log:

```text
Error message
Stack trace
HTTP method
Request URL
Timestamp
Status code
Request/correlation ID
Relevant context
```

Never log:

```text
Passwords
Authentication tokens
Credit card information
API secrets
Private sensitive data
```

---

## 13. Error Logging vs Error Response

These are different responsibilities.

```text
Error
 ├──→ Internal Log → Detailed
 │
 └──→ Client Response → Safe
```

Internal log:

```text
Database connection failed
Stack trace...
```

Client response:

```json
{
  "message": "Internal Server Error"
}
```

---

## 14. Production-Style Error Middleware ⭐⭐⭐⭐⭐

```js
const errorMiddleware = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });

  const statusCode =
    err.statusCode || 500;

  const message =
    statusCode >= 500
      ? "Internal Server Error"
      : err.message;

  res.status(statusCode).json({
    message
  });
};

app.use(errorMiddleware);
```

---

## 15. Complete Error Architecture ⭐⭐⭐⭐⭐

### `AppError.js`

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(
      this,
      this.constructor
    );
  }
}

module.exports = AppError;
```

### Controller

```js
const AppError = require("../utils/AppError");

const getUser = async (req, res, next) => {
  const user = null;

  if (!user) {
    return next(
      new AppError(
        "User not found",
        404
      )
    );
  }

  res.json(user);
};

module.exports = {
  getUser
};
```

### Error Middleware

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

module.exports = errorMiddleware;
```

### App

```js
app.use("/users", userRouter);

app.use(errorMiddleware);
```

Flow:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
AppError
   ↓
next(error)
   ↓
Central Error Middleware
   ↓
Log Error
   ↓
HTTP Response
```

---

## 16. Async Controller Example

```js
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
};
```

If the database operation fails:

```text
User.find()
    ↓
Rejected
    ↓
catch(error)
    ↓
next(error)
    ↓
Error Middleware
```

---

## 17. Not Found vs Server Error

Don't return `500` for every error.

If a user doesn't exist:

```text
404 Not Found
```

not:

```text
500 Internal Server Error
```

If input is invalid:

```text
400 Bad Request
```

or, depending on the API:

```text
422 Unprocessable Content
```

The HTTP status should communicate what happened.

---

## 18. Real-World Error Flow ⭐⭐⭐⭐⭐

```text
Client
  ↓
Express
  ↓
Middleware
  ↓
Router
  ↓
Controller
  ↓
Service
  ↓
Database / External API
  ↓
     ┌──────────────┐
     │              │
   Success        Error
     │              │
     ↓              ↓
 Response       next(error)
                    ↓
              Error Middleware
                    ↓
               Log Error
                    ↓
              Safe Response
```

---

# Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. How does Express handle synchronous errors?

> Errors thrown synchronously inside Express route handlers or middleware are caught by Express and passed to the error-handling flow.

### Q2. How do you handle async errors?

Common pattern:

```js
try {
  await something();
} catch (error) {
  next(error);
}
```

In Express 5, rejected promises from route handlers and middleware are automatically forwarded to `next()`.

### Q3. What is error middleware?

> Middleware with the signature `(err, req, res, next)` used to centrally handle errors.

### Q4. Why does error middleware have four parameters?

> The four-argument signature tells Express that the function is an error handler.

### Q5. What is a custom Error class?

> A class extending `Error` that allows application-specific information such as HTTP status codes to be attached to errors.

### Q6. Why use centralized error handling?

> To provide consistent responses, centralize logging, avoid duplicated error-handling code, and simplify maintenance.

### Q7. Status code for a missing resource?

```text
404 Not Found
```

### Q8. Difference between 401 and 403?

```text
401
→ Authentication is missing/invalid.

403
→ User is authenticated but not allowed.
```

### Q9. What status code is commonly used for invalid input?

```text
400 Bad Request
```

or, depending on the API:

```text
422 Unprocessable Content
```

### Q10. What status code represents an unexpected server error?

```text
500 Internal Server Error
```

### Q11. Should stack traces be returned to clients in production?

> No. Detailed errors should be logged internally while clients receive safe error messages.

### Q12. What information should be logged?

```text
Error message
Stack trace
HTTP method
URL
Timestamp
Status code
Request/correlation ID
```

Never log secrets or sensitive credentials.

### Q13. Where should error middleware be placed?

> Generally after routes and other middleware that can forward errors.

---

# ⭐ Most Important Interview Points

```text
⭐⭐⭐⭐⭐ Synchronous errors
⭐⭐⭐⭐⭐ Async errors
⭐⭐⭐⭐⭐ next(error)
⭐⭐⭐⭐⭐ Error middleware
⭐⭐⭐⭐⭐ (err, req, res, next)
⭐⭐⭐⭐⭐ Custom Error class
⭐⭐⭐⭐⭐ Centralized error handling
⭐⭐⭐⭐⭐ 400
⭐⭐⭐⭐⭐ 401
⭐⭐⭐⭐⭐ 403
⭐⭐⭐⭐⭐ 404
⭐⭐⭐⭐⭐ 409
⭐⭐⭐⭐⭐ 422
⭐⭐⭐⭐⭐ 429
⭐⭐⭐⭐⭐ 500
⭐⭐⭐⭐⭐ Production error handling
⭐⭐⭐⭐⭐ Error logging
⭐⭐⭐⭐⭐ Don't expose stack traces
```

---

# Final Mental Model

### Normal request

```text
Request
   ↓
Middleware
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Response
```

### Error request

```text
Request
   ↓
Middleware
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Error
   ↓
next(error)
   ↓
Error Middleware
   ↓
Log Error
   ↓
Safe HTTP Response
```

### Custom error

```text
new AppError(
  "User not found",
  404
)
       ↓
next(error)
       ↓
Error Middleware
       ↓
404 Response
```

---

# Module 14 Checklist

```text
✅ Error Handling
  ✅ What is error handling?
  ✅ Synchronous errors
  ✅ Async errors
  ✅ next(error)

✅ Error Middleware
  ✅ Error middleware
  ✅ Four arguments
  ✅ Error middleware order
  ✅ Centralized error handling

✅ Custom Errors
  ✅ Custom Error class
  ✅ statusCode
  ✅ message
  ✅ Stack trace

✅ HTTP Errors
  ✅ 400 Bad Request
  ✅ 401 Unauthorized
  ✅ 403 Forbidden
  ✅ 404 Not Found
  ✅ 409 Conflict
  ✅ 422 Unprocessable Content
  ✅ 429 Too Many Requests
  ✅ 500 Internal Server Error
  ✅ 502 Bad Gateway
  ✅ 503 Service Unavailable

✅ Production
  ✅ Safe error responses
  ✅ Don't expose stack traces
  ✅ Centralized logging
  ✅ Don't log secrets
  ✅ Request/correlation IDs
```

# Quick Revision

```text
Synchronous Error
      ↓
Express catches it
      ↓
Error Middleware

Async Error
      ↓
try/catch + next(error)
      ↓
Error Middleware

Express 5
      ↓
Rejected Promise
      ↓
Automatically forwarded

Custom Error
      ↓
message + statusCode
      ↓
next(error)

Error Middleware
      ↓
(err, req, res, next)

Centralized Handler
      ↓
Log detailed error
      ↓
Return safe response

400 → Bad Request
401 → Authentication required/invalid
403 → Forbidden
404 → Not Found
409 → Conflict
422 → Validation/business-rule failure
429 → Too Many Requests
500 → Internal Server Error
```

## Interview One-Liner

> **Express error handling uses centralized error middleware with `(err, req, res, next)` to catch and process errors, custom Error classes can carry HTTP status information, and production applications should log detailed errors internally while returning safe, appropriate HTTP responses to clients.**
