# Module 16 – API Validation ⭐⭐⭐⭐⭐

## Topics

- Request validation
- Schema validation
- Body validation
- Query validation
- Parameter validation
- Yup
- Joi
- Zod

---

## 1. What is API Validation? ⭐⭐⭐⭐⭐

API validation means checking whether incoming client data is valid, complete, and follows the expected format before processing it.

```text
Client
   ↓
Request
   ↓
Validation
   ↓
Valid? ── No ──→ 400/422 Response
   │
  Yes
   ↓
Controller
   ↓
Service
   ↓
Database
```

Never trust client input. Frontend validation improves UX, but backend validation protects the API and data.

---

## 2. What Can Be Validated?

An HTTP request can contain:

```text
Request Body
Query Parameters
Path Parameters
Headers
```

Express access:

```js
req.body
req.query
req.params
req.headers
```

Example:

```http
POST /users/101?page=1
Content-Type: application/json
Authorization: Bearer token
```

---

## 3. Request Validation ⭐⭐⭐⭐⭐

Request validation checks whether incoming data satisfies the API's rules.

Example user request:

```json
{
  "name": "Anil",
  "email": "anil@example.com",
  "age": 28
}
```

Rules:

```text
name  → required string
email → required valid email
age   → integer, minimum 18
```

Without validation, invalid data can reach your business logic or database.

---

## 4. Schema Validation ⭐⭐⭐⭐⭐

A schema defines the expected structure and rules.

```text
User Schema

name
 ├── required
 └── string

email
 ├── required
 ├── string
 └── valid email

age
 ├── integer
 └── minimum 18
```

Mental model:

```text
Input
  ↓
Schema
  ↓
Valid / Invalid
```

Schema validation is better than repeating many manual `if` checks throughout controllers.

---

## 5. Manual Body Validation

```js
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  if (typeof age !== "number") {
    return res.status(400).json({
      message: "Age must be a number"
    });
  }

  res.json({
    message: "Valid request"
  });
});
```

This works, but becomes difficult to maintain when there are many fields, nested objects, arrays, conditional rules, and routes.

---

## 6. Body Validation ⭐⭐⭐⭐⭐

Body validation checks:

```js
req.body
```

Typical rules:

```text
Required fields
Data types
String length
Email format
Number ranges
Allowed values
Nested objects
Arrays
```

Example:

```json
{
  "name": "Anil",
  "email": "anil@example.com",
  "age": 28
}
```

---

## 7. Query Validation ⭐⭐⭐⭐⭐

Query parameters come from:

```js
req.query
```

Example:

```http
GET /products?page=2&limit=20&sort=price
```

```js
const {
  page,
  limit,
  sort
} = req.query;
```

Important:

> Query parameters arrive as strings by default.

For example:

```http
?page=2
```

may produce:

```js
{
  page: "2"
}
```

not:

```js
{
  page: 2
}
```

Therefore, parsing and validation are important.

Example rules:

```text
page
 → integer
 → minimum 1

limit
 → integer
 → minimum 1
 → maximum 100
```

---

## 8. Parameter Validation ⭐⭐⭐⭐⭐

Path parameters are available through:

```js
req.params
```

Example:

```http
GET /users/101
```

Route:

```js
app.get("/users/:id", ...);
```

Access:

```js
req.params.id
```

Possible rules:

```text
id → required
id → positive integer
```

or for MongoDB:

```text
id → valid ObjectId
```

Example:

```js
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  res.json({
    message: "Valid ID"
  });
});
```

---

## 9. Headers Validation

Headers can also require validation.

Example:

```http
Authorization: Bearer token
Content-Type: application/json
```

Authentication middleware may check:

```text
Authorization
 ↓
Token exists?
 ↓
Token valid?
 ↓
User authenticated?
```

Headers are usually handled separately from body/query schemas.

---

## 10. Validation vs Authentication vs Authorization ⭐⭐⭐⭐⭐

These are different concepts.

### Validation

```text
Is the data valid?
```

Example:

```text
Is email correctly formatted?
```

### Authentication

```text
Who are you?
```

Example:

```text
Is this JWT valid?
```

### Authorization

```text
Are you allowed to do this?
```

Example:

```text
Can this user delete this account?
```

Mental model:

```text
Request
  ↓
Validation
  ↓
Authentication
  ↓
Authorization
  ↓
Business Logic
```

The exact middleware ordering can vary by application.

---

# 11. Yup ⭐⭐⭐⭐⭐

**Yup** is a JavaScript schema validation library, especially common in frontend forms and Formik applications.

Install:

```bash
npm install yup
```

Import:

```js
import * as yup from "yup";
```

Schema:

```js
const userSchema = yup.object({
  name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  age: yup
    .number()
    .required()
    .min(18)
});
```

Validate:

```js
try {
  const data = await userSchema.validate(
    req.body,
    {
      abortEarly: false
    }
  );

  console.log(data);
} catch (error) {
  console.log(error.errors);
}
```

`abortEarly: false` collects multiple validation errors instead of stopping at the first one.

---

## 12. Yup Express Middleware

```js
const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true
        }
      );

      next();
    } catch (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }
  };
};
```

Usage:

```js
app.post(
  "/users",
  validate(userSchema),
  createUser
);
```

Flow:

```text
POST /users
     ↓
Validation Middleware
     ↓
Valid?
 ┌───┴────┐
No       Yes
 ↓         ↓
400     Controller
```

---

# 13. Joi ⭐⭐⭐⭐⭐

**Joi** is a popular schema validation library commonly used in Node.js applications and APIs.

Install:

```bash
npm install joi
```

Import:

```js
const Joi = require("joi");
```

Schema:

```js
const userSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email()
    .required(),

  age: Joi.number()
    .integer()
    .min(18)
    .required()
});
```

Validate:

```js
const { error, value } =
  userSchema.validate(req.body, {
    abortEarly: false
  });

if (error) {
  return res.status(400).json({
    message: "Validation failed",
    errors: error.details
  });
}

console.log(value);
```

Joi provides:

```text
error → validation details
value → validated/processed value
```

---

## 14. Joi Middleware

```js
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } =
      schema.validate(req.body, {
        abortEarly: false
      });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details
      });
    }

    req.body = value;
    next();
  };
};
```

Usage:

```js
app.post(
  "/users",
  validate(userSchema),
  createUser
);
```

---

# 15. Zod ⭐⭐⭐⭐⭐

**Zod** is a TypeScript-first schema validation library.

Install:

```bash
npm install zod
```

Import:

```js
import { z } from "zod";
```

Schema:

```js
const userSchema = z.object({
  name: z.string().min(1),

  email: z.string().email(),

  age: z
    .number()
    .int()
    .min(18)
});
```

Validate:

```js
const result =
  userSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({
    message: "Validation failed",
    errors: result.error.issues
  });
}

const data = result.data;
```

`safeParse()` returns a result instead of throwing on validation failure.

```text
success: true
→ data

success: false
→ error
```

---

# 16. Zod with TypeScript ⭐⭐⭐⭐⭐

One major advantage of Zod is type inference.

```ts
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number()
});

type User = z.infer<typeof userSchema>;
```

Type:

```ts
type User = {
  name: string;
  email: string;
  age: number;
};
```

Mental model:

```text
Zod Schema
    ↓
Runtime Validation
    +
TypeScript Type
```

---

# 17. Yup vs Joi vs Zod ⭐⭐⭐⭐⭐

| Feature | Yup | Joi | Zod |
|---|---|---|---|
| JavaScript | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| Strong type inference | Limited | Limited | ⭐⭐⭐⭐⭐ |
| Node.js APIs | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Frontend forms | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Formik usage | ⭐⭐⭐⭐⭐ | Less common | Less common |
| Runtime validation | ✅ | ✅ | ✅ |
| Schema based | ✅ | ✅ | ✅ |
| TypeScript-first | ❌ | ❌ | ✅ |

### Practical guideline

```text
React/Formik
    ↓
Yup

Traditional Node.js API
    ↓
Joi

TypeScript project
    ↓
Zod
```

These are guidelines, not strict rules. All three can be used in JavaScript/Node applications.

---

# 18. Create User vs Update User

Create and update often require different validation rules.

### Create

```text
name     → required
email    → required
password → required
```

### Update

```text
name     → optional
email    → optional
password → optional
```

Zod example:

```js
const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});

const updateUserSchema =
  createUserSchema.partial();
```

`partial()` makes the fields optional.

---

# 19. Validation Middleware Architecture ⭐⭐⭐⭐⭐

Reusable Zod middleware:

```js
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result =
      schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues
      });
    }

    req[source] = result.data;

    next();
  };
};
```

Usage:

```js
app.post(
  "/users",
  validate(userSchema, "body"),
  createUser
);
```

Query:

```js
app.get(
  "/users",
  validate(userQuerySchema, "query"),
  getUsers
);
```

Params:

```js
app.get(
  "/users/:id",
  validate(userParamsSchema, "params"),
  getUser
);
```

---

# 20. Validation Error Response ⭐⭐⭐⭐⭐

A consistent validation response helps frontend applications.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    },
    {
      "field": "age",
      "message": "Age must be at least 18"
    }
  ]
}
```

---

# 21. 400 vs 422 ⭐⭐⭐⭐⭐

Both are used in real-world APIs.

### 400 Bad Request

Commonly used for malformed or invalid request data.

```text
Invalid JSON
Invalid query
Invalid parameter
```

### 422 Unprocessable Content

Often used when the request is syntactically valid but fails semantic validation.

```text
Invalid email
Age below allowed minimum
Business validation failure
```

The important point is to choose a convention and apply it consistently.

---

# 22. Validation vs Database Validation ⭐⭐⭐⭐⭐

These are different layers.

### API Validation

Checks incoming data before business/database processing.

```text
email format
required fields
number range
string length
```

### Database Validation

Protects data at the persistence layer.

Examples:

```text
unique constraints
schema types
required fields
relationships
```

Mental model:

```text
Client
  ↓
API Validation
  ↓
Business Logic
  ↓
Database Constraints
  ↓
Database
```

You generally want appropriate validation at multiple layers.

---

# 23. Validation vs Sanitization

### Validation

Asks:

```text
Is this input valid?
```

Example:

```text
age = 25
→ valid
```

### Sanitization / Transformation

Asks:

```text
Can this input be normalized?
```

Example:

```text
"  anil@example.com  "
       ↓
"anil@example.com"
```

Schema libraries can also provide transformations/defaults/coercion depending on configuration.

---

# 24. Never Trust Client Validation ⭐⭐⭐⭐⭐

Frontend:

```js
if (!email) {
  showError();
}
```

This is useful for UX.

But a user can bypass it using:

```text
Postman
curl
Custom script
```

Therefore:

```text
Frontend Validation
      +
Backend Validation
```

not:

```text
Frontend Validation only
```

---

# 25. Validation Flow in Express ⭐⭐⭐⭐⭐

Typical architecture:

```text
Request
   ↓
Route
   ↓
Validation Middleware
   ↓
Authentication
   ↓
Authorization
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Response
```

Example:

```js
router.post(
  "/users",
  validate(createUserSchema),
  authenticate,
  authorize("admin"),
  createUser
);
```

The exact middleware ordering can vary by application; responsibilities should remain separate.

---

# 26. Common Validation Mistakes

### Mistake 1 – Only validating on frontend

Bad:

```text
React validation
      ↓
Trust API input
```

Better:

```text
React validation
      ↓
Backend validation
```

### Mistake 2 – Checking only required fields

Also validate:

```text
type
format
length
range
allowed values
```

### Mistake 3 – Not validating query parameters

Bad:

```http
GET /users?limit=999999999
```

Better:

```text
limit
→ integer
→ minimum 1
→ maximum 100
```

### Mistake 4 – Putting all validation inside controllers

Avoid:

```js
app.post("/users", (req, res) => {
  // lots of validation
  // business logic
  // database logic
});
```

Prefer:

```text
Route
 ↓
Validation Middleware
 ↓
Controller
 ↓
Service
```

### Mistake 5 – Returning unclear errors

Bad:

```json
{
  "message": "Invalid input"
}
```

Better:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

# 27. Real-World Example ⭐⭐⭐⭐⭐

Request:

```http
POST /api/v1/users
```

Body:

```json
{
  "name": "Anil",
  "email": "invalid",
  "age": 15
}
```

Rules:

```text
name
→ required string

email
→ required valid email

age
→ integer
→ minimum 18
```

Result:

```text
name
→ valid

email
→ invalid

age
→ invalid
```

Response:

```http
422 Unprocessable Content
```

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    },
    {
      "field": "age",
      "message": "Age must be at least 18"
    }
  ]
}
```

The controller should not execute.

```text
Request
   ↓
Validation
   ↓
❌ Invalid
   ↓
422
```

---

# Common Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is API validation?

> API validation verifies that incoming request data satisfies the API's expected structure, types, formats, and constraints before processing it.

### Q2. Why is backend validation necessary if frontend validation exists?

> Frontend validation can be bypassed, so backend validation is required to protect the API and maintain data integrity.

### Q3. What can you validate?

```text
Request body
Query parameters
Path parameters
Headers
```

### Q4. What is schema validation?

> Schema validation defines the expected structure and rules for input and checks incoming data against those rules.

### Q5. Difference between body, query, and parameter validation?

```text
req.body
→ Request payload

req.query
→ Query string

req.params
→ URL path parameters
```

### Q6. Why validate query parameters?

> Query parameters are client-controlled and can contain invalid values that cause incorrect behavior, excessive database work, or unexpected errors.

### Q7. What is Yup?

> Yup is a JavaScript schema validation library commonly used for forms and object validation.

### Q8. What is Joi?

> Joi is a schema validation library commonly used in Node.js applications and APIs.

### Q9. What is Zod?

> Zod is a TypeScript-first schema validation library that provides runtime validation and strong type inference.

### Q10. Why is Zod popular with TypeScript?

> A Zod schema provides runtime validation and can also generate TypeScript types through inference.

### Q11. Yup vs Joi vs Zod?

```text
Yup
→ Strong frontend/form usage

Joi
→ Traditional Node.js/API validation

Zod
→ TypeScript-first runtime validation + type inference
```

### Q12. Should validation happen in the controller?

> It can, but reusable validation middleware and schemas are generally cleaner and keep controllers focused on business logic.

### Q13. 400 vs 422?

> 400 is commonly used for malformed or invalid requests, while 422 is often used when the request is syntactically valid but fails semantic validation.

### Q14. What is sanitization?

> Sanitization or transformation normalizes input into an expected form, whereas validation checks whether input satisfies defined rules.

### Q15. Should you rely only on schema validation?

> No. Schema validation is one layer. Authentication, authorization, business rules, and database constraints may also be required.

---

# ⭐ Most Important Interview Points

```text
⭐⭐⭐⭐⭐ Why API validation is needed
⭐⭐⭐⭐⭐ Backend validation vs frontend validation
⭐⭐⭐⭐⭐ Request validation
⭐⭐⭐⭐⭐ Schema validation
⭐⭐⭐⭐⭐ Body validation
⭐⭐⭐⭐⭐ Query validation
⭐⭐⭐⭐⭐ Parameter validation
⭐⭐⭐⭐⭐ Validation middleware
⭐⭐⭐⭐⭐ Yup
⭐⭐⭐⭐⭐ Joi
⭐⭐⭐⭐⭐ Zod
⭐⭐⭐⭐⭐ Yup vs Joi vs Zod
⭐⭐⭐⭐⭐ Validation error responses
⭐⭐⭐⭐⭐ 400 vs 422
⭐⭐⭐⭐⭐ Validation vs sanitization
⭐⭐⭐⭐⭐ Validation vs database constraints
```

---

# Final Mental Model

```text
                 HTTP Request
                      ↓
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
      Body          Query         Params
        │             │             │
        └─────────────┼─────────────┘
                      ↓
               Schema Validation
                      ↓
                Valid / Invalid
                 ┌────┴────┐
                No        Yes
                 ↓          ↓
             400/422    Authentication
                            ↓
                       Authorization
                            ↓
                        Controller
                            ↓
                         Service
                            ↓
                         Database
```

---

# Module 16 Checklist

```text
✅ API Validation
  ✅ What is validation?
  ✅ Why backend validation?
  ✅ Request validation

✅ Request Sources
  ✅ Body
  ✅ Query
  ✅ Parameters
  ✅ Headers

✅ Schema
  ✅ Schema validation
  ✅ Required fields
  ✅ Types
  ✅ Formats
  ✅ Length
  ✅ Range
  ✅ Allowed values

✅ Libraries
  ✅ Yup
  ✅ Joi
  ✅ Zod
  ✅ Yup vs Joi vs Zod
  ✅ Zod type inference

✅ Architecture
  ✅ Validation middleware
  ✅ Separate schemas
  ✅ Create vs update schemas
  ✅ Validation error response
  ✅ Controller separation

✅ Related Concepts
  ✅ 400 vs 422
  ✅ Validation vs sanitization
  ✅ Validation vs authentication
  ✅ Validation vs authorization
  ✅ Validation vs database constraints
```

# Quick Revision

```text
Client
  ↓
HTTP Request
  ↓
Body / Query / Params / Headers
  ↓
Schema Validation
  ↓
Valid?
 ┌───────┴───────┐
 No             Yes
 ↓                ↓
400/422       Authentication
                  ↓
              Authorization
                  ↓
              Controller
                  ↓
                Service
                  ↓
               Database
```

### Libraries

```text
Yup
 ↓
Frontend/forms + general JS validation

Joi
 ↓
Traditional Node.js/API validation

Zod
 ↓
TypeScript-first validation
+
Type inference
```

## Interview One-Liner

> **API validation ensures that client-controlled input matches the expected schema before business logic executes. In Express applications, validation is commonly implemented as reusable middleware using libraries such as Yup, Joi, or Zod, with separate validation for request bodies, query parameters, and path parameters.**
