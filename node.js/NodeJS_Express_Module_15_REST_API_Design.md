# Module 15 – REST API Design ⭐⭐⭐⭐⭐

## Topics
- REST principles
- Resources
- HTTP methods
- Status codes
- API naming
- Request/response structure
- Pagination
- Filtering
- Sorting
- Searching
- Versioning

---

## 1. What is REST? ⭐⭐⭐⭐⭐

**REST (Representational State Transfer)** is an architectural style for designing web APIs.

A REST API exposes **resources** through URLs and uses standard HTTP methods to operate on them.

```text
GET    /users
GET    /users/101
POST   /users
PUT    /users/101
PATCH  /users/101
DELETE /users/101
```

Mental model:

```text
Client → HTTP Request → REST API → Resource → HTTP Response
```

---

## 2. REST Principles ⭐⭐⭐⭐⭐

Important REST constraints:

```text
1. Client-Server
2. Stateless
3. Cacheable
4. Uniform Interface
5. Layered System
6. Code on Demand (optional)
```

### Client-Server

Client and server have separate responsibilities.

```text
React
  ↓
Express API
  ↓
Database
```

### Stateless ⭐⭐⭐⭐⭐

Each request contains enough information for the server to process it independently.

```http
GET /profile
Authorization: Bearer <token>
```

**Interview answer:** Each request contains the information needed to process it without relying on previous requests.

---

## 3. Resources ⭐⭐⭐⭐⭐

REST APIs are organized around resources.

```text
/users
/products
/orders
/payments
/posts
/comments
```

```text
/users       → Collection
/users/101   → Individual resource
```

---

## 4. Resource Naming ⭐⭐⭐⭐⭐

Use **nouns**, not verbs.

### Good

```text
GET  /users
GET  /products
POST /orders
GET  /orders/101
```

### Bad

```text
GET  /getUsers
POST /createUser
GET  /getProduct
POST /deleteUser
```

The HTTP method already represents the operation.

```text
GET    → retrieve
POST   → create
PUT    → replace
PATCH  → partial update
DELETE → delete
```

Prefer lowercase and consistent naming:

```text
/users
/product-orders
/user-profiles
```

---

## 5. HTTP Methods ⭐⭐⭐⭐⭐

### GET

Retrieve resources:

```http
GET /users
GET /users/101
```

### POST

Create a resource or perform a non-idempotent operation:

```http
POST /users
```

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Usually returns:

```http
201 Created
```

### PUT

Generally replaces a resource:

```http
PUT /users/101
```

### PATCH

Partially updates a resource:

```http
PATCH /users/101
```

```json
{
  "age": 29
}
```

### DELETE

Deletes a resource:

```http
DELETE /users/101
```

Possible response:

```http
204 No Content
```

---

## 6. PUT vs PATCH ⭐⭐⭐⭐⭐

| PUT | PATCH |
|---|---|
| Usually replaces resource | Partially updates resource |
| Complete representation commonly sent | Changed fields commonly sent |
| Idempotent | Can be idempotent depending on operation |
| Example: replace profile | Example: update email |

**Interview answer:**

> PUT is generally used to replace a resource representation, while PATCH is used for partial updates.

---

## 7. HTTP Status Codes ⭐⭐⭐⭐⭐

```text
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client Error
5xx → Server Error
```

Important codes:

| Status | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Content |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

### 401 vs 403

```text
401 → Authentication missing/invalid
403 → Authenticated but not permitted
```

---

## 8. Nested Resources

When one resource belongs strongly to another:

```text
/users/101/orders
/users/101/orders/500
/posts/10/comments
```

Avoid excessive nesting:

```text
/users/1/orders/2/products/3/reviews/4
```

Prefer flatter endpoints when appropriate:

```text
/orders/2
/products/3/reviews
```

---

## 9. Request Structure ⭐⭐⭐⭐⭐

A request can contain:

```text
Method
URL
Headers
Query Parameters
Path Parameters
Body
```

Example:

```http
POST /users?source=mobile
Authorization: Bearer token
Content-Type: application/json
```

### Path parameter

```text
/users/101
```

Express:

```js
req.params.id
```

### Query parameter

```text
/users?page=2&limit=10
```

Express:

```js
req.query
```

### Request body

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

Express:

```js
req.body
```

---

## 10. Response Structure ⭐⭐⭐⭐⭐

A consistent response structure makes APIs easier to consume.

Example:

```json
{
  "success": true,
  "data": {
    "id": 101,
    "name": "Anil"
  }
}
```

Error:

```json
{
  "success": false,
  "message": "User not found"
}
```

For lists:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

There is no single universal response envelope; **consistency is the important part.**

---

## 11. Pagination ⭐⭐⭐⭐⭐

Pagination prevents an API from returning huge datasets.

```http
GET /users?page=1&limit=20
```

```text
page  → Current page
limit → Records per page
```

### Offset/Page Pagination

```http
GET /users?page=2&limit=10
```

Conceptually:

```text
offset = (page - 1) * limit
       = 10
```

Mongoose example:

```js
User.find()
  .skip(10)
  .limit(10);
```

Response:

```json
{
  "data": [],
  "meta": {
    "page": 2,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 12. Cursor Pagination ⭐⭐⭐⭐⭐

Cursor pagination uses a value representing the current position.

```http
GET /users?limit=20&cursor=abc123
```

Response:

```json
{
  "data": [],
  "nextCursor": "xyz789"
}
```

Flow:

```text
First Request
     ↓
Data + nextCursor
     ↓
Next Request
     ↓
Use nextCursor
     ↓
Next Page
```

Often useful for large or frequently changing datasets.

### Offset vs Cursor

| Offset/Page | Cursor |
|---|---|
| Simple | More complex |
| Easy page numbers | Usually no page numbers |
| Good for smaller/static datasets | Good for large/changing datasets |
| Large offsets can become inefficient | Better suited to sequential traversal |
| Changing records can shift pages | More stable traversal |

---

## 13. Filtering ⭐⭐⭐⭐⭐

Filtering returns resources matching conditions.

```http
GET /products?category=mobile
```

Multiple filters:

```http
GET /products?category=mobile&brand=apple
```

Express:

```js
const { category, brand } = req.query;
```

Database concept:

```js
Product.find({
  category,
  brand
});
```

---

## 14. Sorting ⭐⭐⭐⭐⭐

Controls result order.

```http
GET /products?sort=price
```

Descending convention:

```http
GET /products?sort=-price
```

Multiple fields:

```http
GET /products?sort=price,-rating
```

The exact syntax is a project decision; document it consistently.

---

## 15. Searching ⭐⭐⭐⭐⭐

Searches resources using a search term.

```http
GET /products?search=iphone
```

Express:

```js
const { search } = req.query;
```

Simple MongoDB example:

```js
Product.find({
  name: {
    $regex: search,
    $options: "i"
  }
});
```

For large applications, dedicated search technologies may be more appropriate than simple regex queries.

---

## 16. Combining Query Features ⭐⭐⭐⭐⭐

Example:

```http
GET /products
  ?page=2
  &limit=20
  &category=mobile
  &search=iphone
  &sort=-price
```

Meaning:

```text
page=2       → Second page
limit=20     → 20 records
category     → Filtering
search       → Searching
sort=-price  → Highest price first
```

Express example:

```js
app.get("/products", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    sort
  } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i"
    };
  }

  const products = await Product.find(filter)
    .sort(sort || "createdAt")
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: products
  });
});
```

In production, validate and normalize query parameters before using them.

---

## 17. API Versioning ⭐⭐⭐⭐⭐

Versioning allows an API to evolve without immediately breaking existing clients.

```text
/api/v1/users
/api/v2/users
```

Example:

```http
GET /api/v1/users
GET /api/v2/users
```

If v1 returns:

```json
{
  "name": "Anil",
  "email": "anil@example.com"
}
```

and v2 makes a breaking change:

```json
{
  "fullName": "Anil",
  "emailAddress": "anil@example.com"
}
```

existing v1 clients can continue using v1.

### Versioning strategies

URL:

```text
/api/v1/users
```

Header:

```http
Accept: application/vnd.myapi.v2+json
```

Query parameter:

```text
/api/users?version=2
```

Choose one strategy and use it consistently.

---

## 18. Complete REST API Design

### Users

```text
GET    /api/v1/users
GET    /api/v1/users/101
POST   /api/v1/users
PATCH  /api/v1/users/101
DELETE /api/v1/users/101
```

### Products

```text
GET    /api/v1/products
GET    /api/v1/products/10
POST   /api/v1/products
PATCH  /api/v1/products/10
DELETE /api/v1/products/10
```

### Orders

```text
GET   /api/v1/orders
GET   /api/v1/orders/500
POST  /api/v1/orders
PATCH /api/v1/orders/500
```

### User Orders

```text
GET /api/v1/users/101/orders
```

---

## 19. Idempotency ⭐⭐⭐⭐⭐

An operation is **idempotent** if repeating the same request has the same intended server-side effect as making it once.

Generally:

```text
GET    → Idempotent
PUT    → Idempotent
DELETE → Idempotent
```

POST is generally not idempotent.

PATCH may or may not be idempotent depending on its design.

Important:

> Idempotent does not mean the response must be identical every time. It means the intended state-changing effect is the same.

---

## 20. Safe vs Idempotent

### Safe

A safe method does not intentionally modify server state.

```text
GET
```

### Idempotent

Repeating it has the same intended effect.

```text
GET
PUT
DELETE
```

Summary:

```text
GET
→ Safe + Idempotent

PUT
→ Not Safe + Idempotent

DELETE
→ Not Safe + Idempotent

POST
→ Not Safe + Generally Not Idempotent
```

---

## 21. REST API Best Practices ⭐⭐⭐⭐⭐

```text
Use nouns
Use correct HTTP methods
Use appropriate status codes
Keep APIs stateless
Paginate large datasets
Validate input
Keep response formats consistent
Version breaking APIs
Document the API
Don't expose sensitive data
```

Common API documentation standard:

```text
OpenAPI / Swagger
```

---

## 22. Common REST API Mistakes

### Verbs in URLs

Bad:

```text
/getUsers
/createUser
/deleteUser
```

Better:

```text
GET /users
POST /users
DELETE /users/101
```

### Always returning 200

Don't use:

```http
200 OK
```

for every situation.

Use appropriate codes:

```text
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
409 → Conflict
500 → Server Error
```

### Returning huge datasets

Bad:

```text
GET /users
→ 1,000,000 records
```

Better:

```text
GET /users?page=1&limit=20
```

### Inconsistent responses

Bad:

```json
{ "users": [] }
```

and elsewhere:

```json
{ "data": [] }
```

Prefer a consistent API contract.

### Exposing sensitive data

Never return:

```text
password
passwordHash
private tokens
internal secrets
```

unless explicitly required and properly protected.

---

# Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is REST?

> REST is an architectural style for designing networked applications around resources using a uniform interface, commonly HTTP.

### Q2. What are REST principles?

```text
Client-Server
Stateless
Cacheable
Uniform Interface
Layered System
Code on Demand (optional)
```

### Q3. What does stateless mean?

> Every request contains the information needed to process it independently of previous requests.

### Q4. What is a resource?

> A resource is an entity exposed through an API, such as a user, product, order, or post.

### Q5. Should REST URLs contain verbs?

Generally no. Prefer nouns and use HTTP methods for operations.

### Q6. Difference between PUT and PATCH?

> PUT generally replaces a resource representation, while PATCH applies a partial update.

### Q7. What is pagination?

> Pagination divides a large dataset into smaller result sets so the server doesn't return all records at once.

### Q8. Offset vs cursor pagination?

> Offset pagination uses page/offset values, while cursor pagination uses a position marker to continue from a specific point in the dataset.

### Q9. What is filtering?

```text
/products?category=mobile
```

Returns matching resources.

### Q10. What is sorting?

```text
/products?sort=-price
```

Controls result ordering.

### Q11. What is searching?

```text
/products?search=iphone
```

Finds resources matching a search term.

### Q12. Why version an API?

> To introduce breaking changes without immediately breaking existing clients.

### Q13. What is idempotency?

> Repeating an idempotent request has the same intended server-side effect as making it once.

### Q14. Is POST idempotent?

> POST is generally not idempotent.

### Q15. Is DELETE idempotent?

> DELETE is generally idempotent, although repeated requests can return different status codes.

### Q16. Status after creating a resource?

```text
201 Created
```

### Q17. Status when a resource isn't found?

```text
404 Not Found
```

### Q18. Difference between 401 and 403?

```text
401 → Authentication missing/invalid
403 → Authenticated but not permitted
```

---

# ⭐ Most Important Interview Points

```text
⭐⭐⭐⭐⭐ What is REST?
⭐⭐⭐⭐⭐ REST principles
⭐⭐⭐⭐⭐ Statelessness
⭐⭐⭐⭐⭐ Resources
⭐⭐⭐⭐⭐ HTTP methods
⭐⭐⭐⭐⭐ GET vs POST
⭐⭐⭐⭐⭐ PUT vs PATCH
⭐⭐⭐⭐⭐ HTTP status codes
⭐⭐⭐⭐⭐ RESTful URL naming
⭐⭐⭐⭐⭐ Request/response structure
⭐⭐⭐⭐⭐ Pagination
⭐⭐⭐⭐⭐ Offset vs Cursor pagination
⭐⭐⭐⭐⭐ Filtering
⭐⭐⭐⭐⭐ Sorting
⭐⭐⭐⭐⭐ Searching
⭐⭐⭐⭐⭐ API versioning
⭐⭐⭐⭐⭐ Idempotency
⭐⭐⭐⭐⭐ Safe vs Idempotent
```

---

# Final Mental Model

```text
                    REST API
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     Resource       HTTP Method    HTTP Status
        │              │              │
     /users           GET            200
     /users/101       POST           201
     /orders          PUT            204
     /products        PATCH          400
                      DELETE          404
                                      500
```

Advanced query:

```http
GET /api/v1/products
    ?page=2
    &limit=20
    &category=mobile
    &search=iphone
    &sort=-price
```

Supports:

```text
Versioning → /api/v1
Pagination → page + limit
Filtering  → category
Searching  → search
Sorting    → sort
```

---

# Module 15 Checklist

```text
✅ REST
  ✅ What is REST?
  ✅ REST principles
  ✅ Client-Server
  ✅ Stateless
  ✅ Cacheable
  ✅ Uniform Interface
  ✅ Layered System
  ✅ Code on Demand

✅ Resources
  ✅ Resource concept
  ✅ Collections
  ✅ Individual resources
  ✅ Resource naming
  ✅ Nested resources

✅ HTTP
  ✅ GET
  ✅ POST
  ✅ PUT
  ✅ PATCH
  ✅ DELETE
  ✅ PUT vs PATCH
  ✅ Idempotency
  ✅ Safe methods

✅ Status Codes
  ✅ 200
  ✅ 201
  ✅ 204
  ✅ 400
  ✅ 401
  ✅ 403
  ✅ 404
  ✅ 409
  ✅ 422
  ✅ 429
  ✅ 500
  ✅ 502
  ✅ 503

✅ API Design
  ✅ Naming
  ✅ Request structure
  ✅ Response structure
  ✅ Pagination
  ✅ Cursor pagination
  ✅ Filtering
  ✅ Sorting
  ✅ Searching
  ✅ Versioning

✅ Best Practices
  ✅ Consistent responses
  ✅ Input validation
  ✅ Pagination
  ✅ Appropriate status codes
  ✅ Stateless design
  ✅ API documentation
  ✅ Avoid sensitive data exposure
```

# Quick Revision

```text
REST
 ↓
Resource-oriented API design

/users
 ↓
Collection

/users/101
 ↓
Individual resource

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

?page=2&limit=20
 ↓
Pagination

?category=mobile
 ↓
Filtering

?sort=-price
 ↓
Sorting

?search=iphone
 ↓
Searching

/api/v1/users
 ↓
API Versioning

GET / PUT / DELETE
 ↓
Idempotent

GET
 ↓
Safe + Idempotent
```

## Interview One-Liner

> **A REST API is a resource-oriented HTTP API that follows principles such as statelessness and a uniform interface, uses HTTP methods and status codes correctly, and provides predictable resource naming, request/response structures, pagination, filtering, sorting, searching, and versioning.**
