# Module 9 – HTTP Fundamentals ⭐⭐⭐⭐⭐

## Topics
- HTTP
- Request
- Response
- HTTP methods
- Headers
- Status codes
- Query parameters
- Path parameters
- Request body
- `Content-Type`
- REST API

---

## 1. What is HTTP?

**HTTP (HyperText Transfer Protocol)** is an application-layer protocol used for communication between clients and servers.

```text
Client
  ↓
HTTP Request
  ↓
Server
  ↓
HTTP Response
  ↓
Client
```

Examples of clients:
- Browser
- React application
- Mobile application
- Postman
- Another backend service

Examples of servers:
- Node.js
- Express
- Java/Spring
- Python/Django

---

## 2. HTTP Request ⭐⭐⭐⭐⭐

An HTTP request is a message sent by a client to a server.

It can contain:

```text
HTTP Method
URL
Headers
Query Parameters
Path Parameters
Request Body
```

Example:

```http
POST /users?source=mobile HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer token

{
  "name": "Anil",
  "email": "anil@example.com"
}
```

### Request structure

```text
Request
│
├── Method
├── URL
│   ├── Path
│   └── Query Parameters
├── Headers
└── Body
```

---

## 3. HTTP Response ⭐⭐⭐⭐⭐

An HTTP response is a message sent by the server back to the client.

It contains:

```text
Status Code
Headers
Response Body
```

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 101,
  "name": "Anil"
}
```

### Request vs Response

| Request | Response |
|---|---|
| Client → Server | Server → Client |
| Contains method | Contains status code |
| Contains URL | Contains response headers |
| Can contain body | Can contain body |

---

## 4. HTTP Methods ⭐⭐⭐⭐⭐

Common methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Other methods:

```text
HEAD
OPTIONS
```

### GET

Used to retrieve data.

```http
GET /users
GET /users/101
GET /products
```

```text
GET → Read / Retrieve
```

### POST

Used to submit data, commonly to create a resource.

```http
POST /users
```

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

```text
POST → Create / Submit
```

### PUT

Generally used to replace the representation of a resource.

```http
PUT /users/101
```

```text
PUT → Replace
```

### PATCH

Generally used for a partial update.

```http
PATCH /users/101
```

```json
{
  "name": "Anil Kumar"
}
```

```text
PATCH → Partial update
```

### DELETE

Used to delete a resource.

```http
DELETE /users/101
```

```text
DELETE → Remove
```

### Method summary

| Method | Common purpose |
|---|---|
| GET | Retrieve |
| POST | Create / Submit |
| PUT | Replace |
| PATCH | Partial update |
| DELETE | Delete |
| HEAD | Headers without response body |
| OPTIONS | Discover supported communication/options |

> GET request bodies have poor interoperability and should generally not be relied upon.

---

## 5. HTTP Headers ⭐⭐⭐⭐⭐

Headers provide metadata about a request or response.

Example:

```http
Content-Type: application/json
Authorization: Bearer token
Accept: application/json
```

### Common request headers

#### `Content-Type`

Describes the format of the request body.

```http
Content-Type: application/json
```

#### `Accept`

Describes the response formats the client accepts.

```http
Accept: application/json
```

#### `Authorization`

Used for authentication credentials.

```http
Authorization: Bearer eyJ...
```

Other common headers:

```text
User-Agent
Host
Cache-Control
```

### Common response headers

```http
Content-Type: application/json
Content-Length: 1234
Cache-Control: max-age=3600
Set-Cookie: sessionId=abc
Location: /users/101
```

### Content-Type vs Accept ⭐⭐⭐⭐⭐

```text
Content-Type → What body am I sending?

Accept → What response format do I want?
```

---

## 6. HTTP Status Codes ⭐⭐⭐⭐⭐

Status codes tell the client what happened.

```text
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client Error
5xx → Server Error
```

### 2xx Success

```text
200 OK
201 Created
202 Accepted
204 No Content
```

- **200** → Successful request
- **201** → Resource created
- **202** → Accepted for processing, potentially asynchronously
- **204** → Success with no response body

### 3xx Redirection

```text
301 Moved Permanently
302 Found
304 Not Modified
307 Temporary Redirect
308 Permanent Redirect
```

### 4xx Client Errors

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
409 Conflict
422 Unprocessable Content
429 Too Many Requests
```

#### 400

Request is invalid or malformed.

#### 401 ⭐⭐⭐⭐⭐

Authentication problem.

```text
401 → Authentication
```

Examples:
- Missing credentials
- Invalid token
- Expired credentials

#### 403 ⭐⭐⭐⭐⭐

Client is authenticated/identified but does not have permission.

```text
403 → Authorization / Permission
```

Remember:

```text
401 → Authentication problem
403 → Authorization problem
```

#### 404

Resource not found.

#### 409

Request conflicts with the current resource state.

Example:

```text
Creating a user with an email that already exists
```

#### 422

Request is syntactically valid but fails semantic/business validation.

#### 429

Client exceeded a rate limit.

```http
Retry-After: 60
```

### 5xx Server Errors

```text
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

- **500** → Unexpected server failure
- **502** → Gateway received an invalid upstream response
- **503** → Service temporarily unavailable
- **504** → Gateway timed out waiting for upstream

### Important table

| Status | Meaning | Common use |
|---|---|---|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 202 | Accepted | Async processing accepted |
| 204 | No Content | Success without body |
| 301 | Moved Permanently | Permanent redirect |
| 304 | Not Modified | Cache validation |
| 400 | Bad Request | Invalid request |
| 401 | Unauthorized | Authentication problem |
| 403 | Forbidden | Permission problem |
| 404 | Not Found | Resource missing |
| 405 | Method Not Allowed | Method unsupported |
| 409 | Conflict | State conflict |
| 422 | Unprocessable Content | Semantic validation failure |
| 429 | Too Many Requests | Rate limit |
| 500 | Internal Server Error | Server failure |
| 502 | Bad Gateway | Invalid upstream response |
| 503 | Service Unavailable | Temporarily unavailable |
| 504 | Gateway Timeout | Upstream timeout |

---

## 7. Query Parameters ⭐⭐⭐⭐⭐

Query parameters appear after `?`.

```text
/users?city=mumbai&age=28
```

Values:

```text
city = mumbai
age = 28
```

Syntax:

```text
/path?key=value&key2=value2
```

Common uses:

```text
Filtering
Searching
Sorting
Pagination
Optional parameters
```

Examples:

```text
/products?category=mobile
/users?city=mumbai
/products?sort=price
/products?page=2&limit=20
/users?search=anil
```

Query parameters are usually optional:

```text
/products
```

vs.

```text
/products?category=mobile
```

---

## 8. Path Parameters ⭐⭐⭐⭐⭐

Path parameters identify a specific resource.

```text
/users/101
```

Here:

```text
101 → User ID
```

Another example:

```text
/orders/500
```

Here:

```text
500 → Order ID
```

### Query vs Path

```text
/users/101
       ↑
   Which user?

/users?active=true
       ↑
   Which subset?
```

Simple rule:

```text
Path parameter → Identify a resource

Query parameter → Filter / search / sort / options
```

Combined:

```text
/products/101?currency=INR&includeReviews=true
```

---

## 9. Request Body ⭐⭐⭐⭐⭐

The request body contains data sent by the client to the server.

Commonly used with:

```text
POST
PUT
PATCH
```

Example:

```http
POST /users
Content-Type: application/json

{
  "name": "Anil",
  "email": "anil@example.com"
}
```

The JSON object is the request body.

### Body vs Query

Query:

```text
/products?category=mobile
```

Commonly used for filtering/search/pagination.

Body:

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Commonly used for creating/updating/submitting structured data.

---

## 10. Content-Type ⭐⭐⭐⭐⭐

`Content-Type` tells the receiver the media type/format of the message body.

### JSON

```http
Content-Type: application/json
```

### Form URL Encoded

```http
Content-Type: application/x-www-form-urlencoded
```

### Multipart Form Data

```http
Content-Type: multipart/form-data
```

Commonly used for:

```text
File uploads
Forms containing files
```

### Plain Text

```http
Content-Type: text/plain
```

### HTML

```http
Content-Type: text/html
```

---

## 11. REST API ⭐⭐⭐⭐⭐

REST stands for:

> **Representational State Transfer**

REST is an architectural style for designing network APIs.

A RESTful API generally:

```text
Uses resources
Uses HTTP methods
Uses meaningful URLs
Uses HTTP status codes
Is stateless
```

### Resource-based URLs

Instead of:

```text
/getUsers
/createUser
/deleteUser
```

prefer:

```text
GET    /users
POST   /users
GET    /users/101
PATCH  /users/101
DELETE /users/101
```

The URL identifies the resource.

The HTTP method describes the operation.

---

## 12. REST API Example

### Get all users

```http
GET /users
```

### Get one user

```http
GET /users/101
```

### Create user

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

### Update user

```http
PATCH /users/101
```

### Delete user

```http
DELETE /users/101
```

---

## 13. REST Statelessness ⭐⭐⭐⭐⭐

A REST API is generally designed to be **stateless**.

Each request should contain the information needed to process it rather than relying on hidden conversational state from previous requests.

Example:

```http
GET /profile
Authorization: Bearer token
```

Conceptually:

```text
Request 1 → Self-contained
Request 2 → Self-contained
Request 3 → Self-contained
```

Important:

> Stateless does not mean the server cannot use a database, cache, or persistent storage.

---

## 14. Nested Resources

Relationships can sometimes be represented using nested paths.

```text
/users/101/orders
```

Meaning:

> Orders belonging to user 101.

Another:

```text
/users/101/orders/500
```

Meaning:

> Order 500 belonging to user 101.

Avoid excessive nesting because deeply nested URLs can become difficult to maintain.

---

## 15. REST Error Response ⭐⭐⭐⭐⭐

APIs should preferably return consistent error structures.

Example:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "message": "Invalid email address",
  "code": "INVALID_EMAIL"
}
```

Another:

```http
HTTP/1.1 404 Not Found
```

```json
{
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

Consistency makes frontend integration easier.

---

## 16. Complete HTTP Request Example ⭐⭐⭐⭐⭐

```http
POST /users?source=mobile HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer abc123

{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Breakdown:

```text
POST
 ↓
HTTP Method

/users
 ↓
Path

source=mobile
 ↓
Query parameter

Content-Type
 ↓
Request body format

Accept
 ↓
Expected response format

Authorization
 ↓
Authentication credentials

JSON
 ↓
Request body
```

---

## 17. Complete HTTP Response Example

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /users/101

{
  "id": 101,
  "name": "Anil",
  "email": "anil@example.com"
}
```

Breakdown:

```text
201
 ↓
Resource created

Content-Type
 ↓
Response body is JSON

Location
 ↓
New resource location

JSON
 ↓
Response body
```

---

## 18. HTTP in Node.js ⭐⭐⭐⭐⭐

Node.js provides the built-in `http` module.

```js
const http = require("http");

const server = http.createServer(
  (req, res) => {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        message: "Hello Node.js"
      })
    );
  }
);

server.listen(3000);
```

Conceptually:

```text
Browser
   ↓
HTTP Request
   ↓
Node HTTP Server
   ↓
req + res
   ↓
HTTP Response
```

Express builds on Node's HTTP capabilities and provides a more convenient API for routing, middleware, request handling, and responses.

---

## 19. Request in Node.js

With Node's HTTP module:

```js
http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
});
```

Common properties:

```text
req.method
req.url
req.headers
```

Important:

> The incoming HTTP request is a readable stream, so the request body arrives in chunks.

---

## 20. Response in Node.js

```js
res.statusCode = 200;

res.setHeader(
  "Content-Type",
  "application/json"
);

res.end(
  JSON.stringify({
    message: "Success"
  })
);
```

---

## 21. HTTP Request Lifecycle ⭐⭐⭐⭐⭐

High-level flow:

```text
Client
   ↓
DNS / Network
   ↓
TCP/TLS connection
   ↓
HTTP Request
   ↓
Server
   ↓
Routing
   ↓
Authentication
   ↓
Business Logic
   ↓
Database / External Services
   ↓
Create Response
   ↓
HTTP Response
   ↓
Client
```

At the HTTP level:

```text
Request
  ↓
Method
URL
Headers
Body
  ↓
Server Processing
  ↓
Response
  ↓
Status
Headers
Body
```

---

# 22. Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is HTTP?

> HTTP is an application-layer protocol used for communication between clients and servers.

### Q2. What is an HTTP request?

> A message sent by a client to a server containing information such as method, URL, headers, and optionally a body.

### Q3. What is an HTTP response?

> A message sent by the server containing a status code, headers, and optionally a body.

### Q4. PUT vs PATCH?

> PUT generally replaces the resource representation, while PATCH performs a partial modification.

### Q5. 401 vs 403?

```text
401 → Authentication problem
403 → Authorization / permission problem
```

### Q6. Query vs path parameter?

```text
/users/101
→ Path parameter identifies a resource

/users?active=true
→ Query parameter filters/modifies the request
```

### Q7. What is Content-Type?

> It describes the media type/format of the message body.

### Q8. Content-Type vs Accept?

```text
Content-Type → What body am I sending?

Accept → What response format do I want?
```

### Q9. What is REST?

> REST is an architectural style for designing networked applications around resources and standard HTTP semantics.

### Q10. What does stateless mean in REST?

> Each request contains the information needed to process it without relying on hidden conversational state from previous requests.

### Q11. 200 vs 201?

```text
200 → Successful request
201 → Resource successfully created
```

### Q12. When use 204?

> When the operation succeeds but there is intentionally no response body.

### Q13. When use 409?

> When a request conflicts with the current state of a resource.

### Q14. When use 429?

> When the client exceeds a server-defined rate limit.

### Q15. How does Node.js receive an HTTP request body?

> In the Node.js HTTP module, the incoming request is a readable stream, so the body arrives in chunks.

---

# 23. ⭐ Most Important Interview Points

```text
⭐⭐⭐⭐⭐ HTTP Request
⭐⭐⭐⭐⭐ HTTP Response
⭐⭐⭐⭐⭐ HTTP Methods
⭐⭐⭐⭐⭐ GET / POST / PUT / PATCH / DELETE
⭐⭐⭐⭐⭐ Headers
⭐⭐⭐⭐⭐ Status Codes
⭐⭐⭐⭐⭐ 401 vs 403
⭐⭐⭐⭐⭐ 400 vs 422
⭐⭐⭐⭐⭐ 500 vs 502 vs 503 vs 504
⭐⭐⭐⭐⭐ Query Parameters
⭐⭐⭐⭐⭐ Path Parameters
⭐⭐⭐⭐⭐ Request Body
⭐⭐⭐⭐⭐ Content-Type
⭐⭐⭐⭐⭐ Content-Type vs Accept
⭐⭐⭐⭐⭐ REST API
⭐⭐⭐⭐⭐ REST Statelessness
```

---

# 24. Final Mental Model

```text
                         HTTP
                          │
             ┌────────────┴────────────┐
             ↓                         ↓
          Request                   Response
             │                         │
      ┌──────┼──────┐           ┌──────┼──────┐
      ↓      ↓      ↓           ↓      ↓      ↓
   Method   URL   Headers     Status Headers  Body
              │
        ┌─────┴─────┐
        ↓           ↓
      Path        Query
     Params       Params
              │
             Body
```

REST:

```text
Resource + HTTP Method
        ↓
Meaningful API
```

Example:

```text
GET    /users
POST   /users
GET    /users/101
PATCH  /users/101
DELETE /users/101
```

---

# Module 9 Checklist

```text
✅ HTTP
  ✅ Client
  ✅ Server
  ✅ HTTP communication
  ✅ Request/response lifecycle

✅ Request
  ✅ Method
  ✅ URL
  ✅ Headers
  ✅ Query parameters
  ✅ Path parameters
  ✅ Request body

✅ Response
  ✅ Status code
  ✅ Headers
  ✅ Response body

✅ HTTP Methods
  ✅ GET
  ✅ POST
  ✅ PUT
  ✅ PATCH
  ✅ DELETE
  ✅ HEAD
  ✅ OPTIONS

✅ Headers
  ✅ Content-Type
  ✅ Accept
  ✅ Authorization
  ✅ User-Agent
  ✅ Host
  ✅ Cache-Control
  ✅ Location

✅ Status Codes
  ✅ 2xx
  ✅ 3xx
  ✅ 4xx
  ✅ 5xx
  ✅ 401 vs 403
  ✅ 404
  ✅ 409
  ✅ 422
  ✅ 429
  ✅ 500
  ✅ 502
  ✅ 503
  ✅ 504

✅ Parameters
  ✅ Query parameters
  ✅ Path parameters
  ✅ Query vs path

✅ Request Body
  ✅ JSON
  ✅ Form data
  ✅ Multipart
  ✅ Content-Type

✅ REST API
  ✅ Resources
  ✅ HTTP methods
  ✅ Resource URLs
  ✅ Statelessness
  ✅ REST responses
  ✅ Error responses

✅ Node.js
  ✅ http module
  ✅ req
  ✅ res
  ✅ Request body as stream
```

# Quick Revision

```text
HTTP Request  → Client → Server

HTTP Response → Server → Client

GET           → Retrieve

POST          → Create / Submit

PUT           → Replace

PATCH         → Partial update

DELETE        → Delete

Headers       → Metadata

Status Code   → Result of request

Query Param   → Filter / Search / Options

Path Param    → Identify resource

Body          → Data sent to server

Content-Type  → Format of body

Accept        → Desired response format

REST          → Resource-oriented API design

401           → Authentication problem

403           → Permission problem

404           → Resource not found

429           → Rate limited

500           → Server error

503           → Service unavailable
```
