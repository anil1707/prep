# Module 10 – Node.js HTTP Module ⭐⭐⭐⭐⭐

## Topics

- `http.createServer`
- Request handling
- Response handling
- Manual routing
- Middleware concept
- HTTP headers

---

# 1. What is Node.js `http` Module?

Node.js provides a built-in `http` module for creating HTTP servers and handling HTTP requests and responses.

```js
const http = require("http");
```

Basic flow:

```text
Client
   ↓
HTTP Request
   ↓
Node.js HTTP Server
   ↓
Request Handler
   ↓
HTTP Response
   ↓
Client
```

---

# 2. `http.createServer()` ⭐⭐⭐⭐⭐

The most important method is:

```js
http.createServer()
```

Example:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000);
```

Open:

```text
http://localhost:3000
```

Response:

```text
Hello World
```

The callback receives two important objects:

```text
req → IncomingMessage
res → ServerResponse
```

Mental model:

```text
              createServer()
                   │
          ┌────────┴────────┐
          ↓                 ↓
        req                res
     Incoming             Outgoing
      Request             Response
```

---

# 3. Starting the Server

```js
server.listen(3000, () => {
  console.log("Server started");
});
```

This means the server listens on port `3000`.

You can also specify a host:

```js
server.listen(3000, "localhost", () => {
  console.log("Server running");
});
```

---

# 4. Request Handling ⭐⭐⭐⭐⭐

The request object contains information about the incoming HTTP request.

```js
const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
});
```

Important properties:

```text
req.method
req.url
req.headers
```

---

# 5. `req.method`

Returns the HTTP method.

```js
console.log(req.method);
```

Possible values:

```text
GET
POST
PUT
PATCH
DELETE
```

Example:

```text
GET /users
```

Then:

```js
req.method === "GET"
```

---

# 6. `req.url`

Returns the request target/path as received by Node.

For:

```text
GET /users?page=2
```

you may get:

```js
req.url
```

as:

```text
/users?page=2
```

Important:

> `req.url` is not a fully parsed URL object. Use the `URL` API when you need structured path/query information.

---

# 7. `req.headers`

Contains request headers.

```js
console.log(req.headers);
```

Example:

```js
{
  host: "localhost:3000",
  accept: "application/json",
  "content-type": "application/json"
}
```

Access a specific header:

```js
console.log(req.headers.authorization);

console.log(req.headers["content-type"]);
```

Node normalizes incoming header names to lowercase.

---

# 8. Request Body ⭐⭐⭐⭐⭐

In the basic Node.js HTTP module, the request body is not automatically parsed into a JavaScript object.

The incoming request is a **Readable Stream**.

Therefore, the body arrives in chunks.

```js
const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log(body);

    res.end("Received");
  });
});
```

For a JSON request:

```http
POST /users
Content-Type: application/json

{
  "name": "Anil"
}
```

You can parse the body after receiving it:

```js
const data = JSON.parse(body);
```

---

# 9. Why Does the Request Body Arrive in Chunks?

Network data does not necessarily arrive as one complete piece.

Conceptually:

```text
Client
  ↓
Network
  ↓
Chunk 1
Chunk 2
Chunk 3
Chunk 4
  ↓
Node.js
  ↓
req stream
```

That's why we use:

```js
req.on("data", ...)
```

and:

```js
req.on("end", ...)
```

---

# 10. Handling JSON Request Body ⭐⭐⭐⭐⭐

Complete example:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (
    req.method === "POST" &&
    req.url === "/users"
  ) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const user = JSON.parse(body);

        console.log(user);

        res.statusCode = 201;
        res.setHeader(
          "Content-Type",
          "application/json"
        );

        res.end(
          JSON.stringify({
            message: "User created",
            user
          })
        );
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid JSON");
      }
    });

    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3000);
```

---

# 11. Response Handling ⭐⭐⭐⭐⭐

The `res` object is used to construct the HTTP response.

Important APIs:

```text
res.statusCode
res.setHeader()
res.writeHead()
res.write()
res.end()
```

---

# 12. `res.statusCode`

Used to set the HTTP status code.

```js
res.statusCode = 200;
```

Example:

```js
res.statusCode = 404;
res.end("User not found");
```

---

# 13. `res.setHeader()`

Used to set a response header.

```js
res.setHeader(
  "Content-Type",
  "application/json"
);
```

Other examples:

```js
res.setHeader(
  "Cache-Control",
  "no-cache"
);

res.setHeader(
  "X-Request-ID",
  "12345"
);
```

---

# 14. `res.writeHead()` ⭐⭐⭐⭐

Can set the status code and headers together.

```js
res.writeHead(200, {
  "Content-Type": "application/json"
});
```

Conceptually similar to:

```js
res.statusCode = 200;

res.setHeader(
  "Content-Type",
  "application/json"
);
```

---

# 15. `res.write()`

Used to write response data.

```js
res.write("Hello ");
res.write("World");
res.end();
```

Response:

```text
Hello World
```

Because response data can be streamed, `res.write()` can send data incrementally.

---

# 16. `res.end()` ⭐⭐⭐⭐⭐

Ends the HTTP response.

```js
res.end();
```

You can also send the final data:

```js
res.end("Hello World");
```

Or:

```js
res.end(
  JSON.stringify({
    message: "Success"
  })
);
```

Important:

> The response must eventually be ended unless the connection is intentionally being kept open.

---

# 17. `res.write()` vs `res.end()`

```text
res.write()
    ↓
Write data
    ↓
Response remains open
```

```text
res.end()
    ↓
Optionally sends final data
    ↓
Response finishes
```

Example:

```js
res.write("Hello ");
res.write("Node");
res.end("!");
```

Output:

```text
Hello Node!
```

---

# 18. Sending JSON Response ⭐⭐⭐⭐⭐

Node's `http` module does not automatically serialize JavaScript objects.

Incorrect:

```js
res.end({
  message: "Hello"
});
```

Correct:

```js
res.setHeader(
  "Content-Type",
  "application/json"
);

res.end(
  JSON.stringify({
    message: "Hello"
  })
);
```

---

# 19. Manual Routing ⭐⭐⭐⭐⭐

The basic `http` module does not provide Express-style routing.

You manually check:

```text
req.method
req.url
```

Example:

```js
const server = http.createServer((req, res) => {
  if (
    req.method === "GET" &&
    req.url === "/users"
  ) {
    res.end("Users");
    return;
  }

  if (
    req.method === "GET" &&
    req.url === "/products"
  ) {
    res.end("Products");
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});
```

---

# 20. Routing Based on HTTP Method

```js
const server = http.createServer((req, res) => {

  if (
    req.method === "GET" &&
    req.url === "/users"
  ) {
    res.end("Get users");
    return;
  }

  if (
    req.method === "POST" &&
    req.url === "/users"
  ) {
    res.end("Create user");
    return;
  }

  if (
    req.method === "DELETE" &&
    req.url === "/users"
  ) {
    res.end("Delete users");
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});
```

---

# 21. Dynamic Routes Manually ⭐⭐⭐⭐⭐

Suppose the API has:

```text
/users/101
/users/102
/users/103
```

You cannot hard-code every ID.

Use the `URL` API:

```js
const url = new URL(
  req.url,
  `http://${req.headers.host}`
);

console.log(url.pathname);
```

Then:

```js
const parts =
  url.pathname.split("/");

if (
  req.method === "GET" &&
  parts[1] === "users" &&
  parts[2]
) {
  const userId = parts[2];

  console.log(userId);
}
```

For:

```text
/users/101
```

you get:

```text
parts[0] → ""
parts[1] → "users"
parts[2] → "101"
```

---

# 22. Query Parameters Manually ⭐⭐⭐⭐⭐

Use the `URL` API.

```js
const url = new URL(
  req.url,
  `http://${req.headers.host}`
);

console.log(url.pathname);
console.log(url.searchParams);
```

For:

```text
/products?page=2&limit=20
```

use:

```js
const page =
  url.searchParams.get("page");

const limit =
  url.searchParams.get("limit");
```

Result:

```text
page  → "2"
limit → "20"
```

---

# 23. Path + Query Parameters

URL:

```text
/users/101?includeOrders=true
```

Code:

```js
const url = new URL(
  req.url,
  `http://${req.headers.host}`
);

const parts =
  url.pathname.split("/");

const userId = parts[2];

const includeOrders =
  url.searchParams.get(
    "includeOrders"
  );
```

Result:

```text
userId        → "101"
includeOrders → "true"
```

---

# 24. Middleware Concept ⭐⭐⭐⭐⭐

The basic Node.js `http` module does not provide Express-style middleware out of the box.

But the **middleware pattern** can be implemented manually.

Middleware means:

> Code that participates in request/response processing and can perform work, terminate the request, or pass control to the next step.

Conceptually:

```text
Request
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Middleware 3
   ↓
Route Handler
   ↓
Response
```

Common middleware responsibilities:

```text
Logging
Authentication
Authorization
Validation
Rate limiting
Parsing
Error handling
```

---

# 25. Simple Middleware Function

```js
function logger(req, res, next) {
  console.log(
    req.method,
    req.url
  );

  next();
}
```

Usage:

```js
logger(req, res, () => {
  console.log("Next handler");
});
```

Basic middleware signature:

```text
(req, res, next)
```

---

# 26. Middleware Can Stop the Request

Middleware does not always need to call `next()`.

Example:

```js
function authMiddleware(
  req,
  res,
  next
) {
  const token =
    req.headers.authorization;

  if (!token) {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  next();
}
```

Flow:

```text
No token
   ↓
401
   ↓
STOP
```

With token:

```text
Token
  ↓
next()
  ↓
Next middleware / handler
```

---

# 27. Important Middleware Rule ⭐⭐⭐⭐⭐

If middleware neither:

```text
sends a response
```

nor:

```text
calls next()
```

the request can remain hanging.

Bad:

```js
function middleware(req, res, next) {
  console.log("Hello");

  // Forgot next()
}
```

Good:

```js
function middleware(req, res, next) {
  console.log("Hello");

  next();
}
```

Or terminate:

```js
function middleware(req, res, next) {
  res.end("Done");
}
```

---

# 28. Simple Middleware Runner

You can implement a middleware chain manually:

```js
function runMiddleware(
  req,
  res,
  middlewares,
  finalHandler
) {
  let index = 0;

  function next() {
    const middleware =
      middlewares[index++];

    if (!middleware) {
      return finalHandler(req, res);
    }

    middleware(req, res, next);
  }

  next();
}
```

Usage:

```js
const middlewares = [
  (req, res, next) => {
    console.log("Logger");
    next();
  },

  (req, res, next) => {
    console.log("Auth");
    next();
  }
];

runMiddleware(
  req,
  res,
  middlewares,
  (req, res) => {
    res.end("Route handler");
  }
);
```

Flow:

```text
Request
   ↓
Logger
   ↓
Auth
   ↓
Route Handler
   ↓
Response
```

---

# 29. Logging Middleware

```js
function logger(req, res, next) {
  console.log(
    `${req.method} ${req.url}`
  );

  next();
}
```

Output:

```text
GET /users
POST /users
GET /products
```

---

# 30. Authentication Middleware

```js
function authMiddleware(
  req,
  res,
  next
) {
  const token =
    req.headers.authorization;

  if (!token) {
    res.statusCode = 401;
    res.end("Unauthorized");
    return;
  }

  next();
}
```

Flow:

```text
Request
   ↓
Auth Middleware
   │
   ├── No token → 401
   │
   └── Token → next()
                 ↓
             Route Handler
```

---

# 31. HTTP Headers ⭐⭐⭐⭐⭐

Headers provide metadata about HTTP communication.

Request:

```http
GET /users HTTP/1.1
Host: localhost:3000
Accept: application/json
Authorization: Bearer token
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
```

---

# 32. Reading Request Headers

```js
const server = http.createServer((req, res) => {
  console.log(req.headers);
});
```

Specific header:

```js
const auth =
  req.headers.authorization;
```

Content type:

```js
const contentType =
  req.headers["content-type"];
```

---

# 33. Setting Response Headers

```js
res.setHeader(
  "Content-Type",
  "application/json"
);
```

Other examples:

```js
res.setHeader(
  "Cache-Control",
  "no-cache"
);

res.setHeader(
  "X-Request-ID",
  "12345"
);
```

---

# 34. Headers Must Be Set Before They Are Sent ⭐⭐⭐⭐⭐

Correct:

```js
res.setHeader(
  "Content-Type",
  "application/json"
);

res.end(
  JSON.stringify(data)
);
```

Do not try to change headers after response data has already been sent.

For example:

```js
res.write("Hello");

res.setHeader(
  "Content-Type",
  "application/json"
);
```

This can fail because the response headers may already have been sent.

---

# 35. `res.headersSent`

Node provides:

```js
res.headersSent
```

Example:

```js
if (!res.headersSent) {
  res.statusCode = 500;
}
```

Useful when handling errors safely.

---

# 36. Complete HTTP Server Example ⭐⭐⭐⭐⭐

```js
const http = require("http");

const server = http.createServer(
  (req, res) => {

    console.log(
      `${req.method} ${req.url}`
    );

    if (
      req.method === "GET" &&
      req.url === "/"
    ) {
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });

      res.end("Home");
      return;
    }

    if (
      req.method === "GET" &&
      req.url === "/users"
    ) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(
        JSON.stringify([
          {
            id: 1,
            name: "Anil"
          }
        ])
      );

      return;
    }

    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: "Route not found"
      })
    );
  }
);

server.listen(3000, () => {
  console.log(
    "Server running on port 3000"
  );
});
```

---

# 37. Complete POST Example ⭐⭐⭐⭐⭐

```js
const http = require("http");

const server = http.createServer(
  (req, res) => {

    if (
      req.method === "POST" &&
      req.url === "/users"
    ) {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const user = JSON.parse(body);

          console.log(user);

          res.writeHead(201, {
            "Content-Type":
              "application/json"
          });

          res.end(
            JSON.stringify({
              message: "User created",
              user
            })
          );
        } catch (error) {
          res.writeHead(400, {
            "Content-Type":
              "application/json"
          });

          res.end(
            JSON.stringify({
              message: "Invalid JSON"
            })
          );
        }
      });

      return;
    }

    res.writeHead(404);
    res.end("Not Found");
  }
);

server.listen(3000);
```

---

# 38. `req` and `res` Are Related to Streams ⭐⭐⭐⭐⭐

This connects Module 8 with the HTTP module.

### Incoming request

```text
req
 ↓
Readable Stream
 ↓
Request body arrives in chunks
```

### Response

The response supports streaming response data:

```text
Application
 ↓
res.write()
 ↓
HTTP Response
 ↓
Client
```

Mental model:

```text
Client
  ↓
Request Stream
  ↓
Node.js
  ↓
Response
  ↓
Client
```

This is one reason Node.js can handle large HTTP bodies efficiently.

---

# 39. Node HTTP vs Express ⭐⭐⭐⭐⭐

### Node `http`

You manually handle:

```text
Routing
Request body parsing
Middleware flow
Headers
Responses
Method checks
```

Example:

```js
if (
  req.method === "GET" &&
  req.url === "/users"
) {
  // ...
}
```

### Express

Express provides convenient abstractions:

```js
app.get("/users", handler);

app.post("/users", handler);

app.use(logger);

app.use(auth);
```

Conceptually:

```text
Node HTTP
   ↓
Low-level HTTP APIs
   ↓
Express
   ↓
Routing
Middleware
Request/Response helpers
```

---

# 40. Why Learn Node HTTP Before Express?

When you write:

```js
app.get("/users", (req, res) => {
  res.json(users);
});
```

Express is still ultimately dealing with:

```text
HTTP Request
HTTP Response
Methods
URLs
Headers
Streams
Status codes
```

Understanding the `http` module makes Express easier to understand rather than treating Express as magic.

---

# 41. Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is `http.createServer()`?

> It creates an HTTP server and accepts a callback that is invoked for incoming requests.

### Q2. What are `req` and `res`?

```text
req → Incoming HTTP request
res → Server response
```

### Q3. How do you get the HTTP method?

```js
req.method
```

### Q4. How do you get the URL?

```js
req.url
```

### Q5. How do you get request headers?

```js
req.headers
```

### Q6. How do you send a response?

```js
res.end("Hello");
```

### Q7. How do you set status code?

```js
res.statusCode = 200;
```

### Q8. How do you set a response header?

```js
res.setHeader(
  "Content-Type",
  "application/json"
);
```

### Q9. Difference between `res.write()` and `res.end()`?

> `res.write()` sends response data while keeping the response open. `res.end()` completes the response and can optionally send the final chunk.

### Q10. How do you handle the request body?

> The incoming request is a readable stream, so listen for `data` chunks and `end`, then parse the accumulated data if appropriate.

### Q11. How do you implement routing without Express?

> Check `req.method` and parse `req.url`, then execute the corresponding handler.

### Q12. What is middleware?

> Middleware is code that participates in request/response processing and can perform work, terminate the request, or call `next()` to pass control onward.

### Q13. Does Node's `http` module provide Express-style middleware?

> No. Node's basic `http` module provides HTTP primitives; middleware is an application pattern that frameworks such as Express provide directly.

### Q14. Why is the request body a stream?

> Because HTTP request data can arrive incrementally over the network, so Node exposes the incoming request as a readable stream.

### Q15. Why use Express if Node already has `http`?

> Node's `http` module is low-level. Express provides convenient routing, middleware composition, request/response helpers, and other abstractions that simplify backend development.

---

# 42. ⭐ Most Important Interview Points

Be able to explain these clearly:

```text
⭐⭐⭐⭐⭐ http.createServer()
⭐⭐⭐⭐⭐ req
⭐⭐⭐⭐⭐ res
⭐⭐⭐⭐⭐ req.method
⭐⭐⭐⭐⭐ req.url
⭐⭐⭐⭐⭐ req.headers
⭐⭐⭐⭐⭐ Request body as stream
⭐⭐⭐⭐⭐ res.statusCode
⭐⭐⭐⭐⭐ res.setHeader()
⭐⭐⭐⭐⭐ res.write()
⭐⭐⭐⭐⭐ res.end()
⭐⭐⭐⭐⭐ Manual routing
⭐⭐⭐⭐⭐ Middleware concept
⭐⭐⭐⭐⭐ next()
⭐⭐⭐⭐⭐ Request/response headers
⭐⭐⭐⭐⭐ Node HTTP vs Express
```

---

# 43. Final Mental Model

```text
                    Node.js HTTP
                         │
                  createServer()
                         │
                  ┌──────┴──────┐
                  ↓             ↓
                 req           res
                  │             │
             Incoming        Outgoing
              Request         Response
                  │             │
        ┌─────────┼──────┐      │
        ↓         ↓      ↓      ↓
      method     url   headers  status
                              headers
                              body
```

Request processing:

```text
Client
  ↓
HTTP Request
  ↓
req
  ↓
Middleware
  ↓
Routing
  ↓
Controller / Handler
  ↓
res
  ↓
HTTP Response
  ↓
Client
```

---

# Module 10 Checklist

```text
✅ Node.js HTTP Module
  ✅ http module
  ✅ http.createServer()
  ✅ server.listen()

✅ Request Handling
  ✅ req
  ✅ req.method
  ✅ req.url
  ✅ req.headers
  ✅ Request body
  ✅ Request body as stream

✅ Response Handling
  ✅ res
  ✅ res.statusCode
  ✅ res.setHeader()
  ✅ res.writeHead()
  ✅ res.write()
  ✅ res.end()
  ✅ JSON response

✅ Routing
  ✅ Manual routing
  ✅ Method + URL
  ✅ Dynamic routes
  ✅ Path parameters
  ✅ Query parameters
  ✅ URL API

✅ Middleware
  ✅ Middleware concept
  ✅ next()
  ✅ Logging middleware
  ✅ Authentication middleware
  ✅ Middleware can terminate request
  ✅ Middleware chain

✅ Headers
  ✅ Request headers
  ✅ Response headers
  ✅ Content-Type
  ✅ Authorization
  ✅ Cache-Control
  ✅ headersSent

✅ Architecture
  ✅ Incoming request is a Readable Stream
  ✅ Response supports streaming
  ✅ HTTP request lifecycle
  ✅ Node HTTP vs Express
```

# Quick Revision

```text
http.createServer()
        ↓
Creates HTTP server

req
        ↓
Incoming request

req.method
        ↓
GET / POST / PUT / PATCH / DELETE

req.url
        ↓
Request URL/path

req.headers
        ↓
Request metadata

req body
        ↓
Readable stream

res.statusCode
        ↓
HTTP status

res.setHeader()
        ↓
Response header

res.write()
        ↓
Send response chunk

res.end()
        ↓
Finish response

Manual routing
        ↓
Check method + URL

Middleware
        ↓
Process request before handler

next()
        ↓
Pass control to next middleware

Express
        ↓
Higher-level abstraction over Node HTTP
```
