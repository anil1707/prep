# TypeScript Module 8 — Enums, Literal Types & `as const`

## Introduction

This module covers TypeScript features used to represent a **fixed set of allowed values**:

- Literal Types
- String, Number, and Boolean Literal Types
- Literal Type Unions
- `as const`
- `const` vs `as const`
- Enums
- String and Numeric Enums
- `const enum`
- Enum vs Union Types
- Discriminated Unions with Literal Types

---

# 1. Literal Types

A literal type represents **one exact value** instead of a general type.

```ts
let status: "success";
```

Only `"success"` is allowed:

```ts
status = "success"; // ✅
status = "error";   // ❌
```

Compare:

```ts
let status: string;
```

Here any string is allowed.

```text
string
  ↓
any string

"success"
  ↓
only "success"
```

---

# 2. String Literal Types

A common pattern is combining literal types with unions.

```ts
type Status = "loading" | "success" | "error";
```

Now:

```ts
let status: Status;

status = "loading"; // ✅
status = "success"; // ✅
status = "error";   // ✅
```

But:

```ts
status = "pending"; // ❌
```

This gives us a controlled set of values.

---

# 3. Why Not Just Use `string`?

Consider:

```ts
function setStatus(status: string) {
  // ...
}
```

This accepts anything:

```ts
setStatus("loading");
setStatus("success");
setStatus("hello");
setStatus("random");
```

Instead:

```ts
type Status = "loading" | "success" | "error";

function setStatus(status: Status) {
  // ...
}
```

Now TypeScript restricts the allowed values.

```ts
setStatus("loading"); // ✅
setStatus("success"); // ✅
setStatus("error");   // ✅

setStatus("random");  // ❌
```

---

# 4. Numeric Literal Types

Literal types can also be numbers.

```ts
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;
```

```ts
let statusCode: StatusCode;

statusCode = 200; // ✅
statusCode = 404; // ✅
statusCode = 500; // ✅

statusCode = 301; // ❌
```

---

# 5. Boolean Literal Types

Boolean literals can also be used:

```ts
type TrueOnly = true;

let value: TrueOnly = true;

value = false; // ❌
```

This is less common than string literal unions.

---

# 6. Literal Types in Function Parameters

A common React example:

```ts
type ButtonVariant = "primary" | "secondary" | "danger";

function createButton(variant: ButtonVariant) {
  // ...
}
```

Valid:

```ts
createButton("primary");
createButton("secondary");
createButton("danger");
```

Invalid:

```ts
createButton("green"); // ❌
```

This pattern is commonly used for component props.

---

# 7. Literal Types for API Methods

```ts
type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";
```

```ts
function request(method: HttpMethod) {
  // ...
}
```

Valid:

```ts
request("GET");
request("POST");
request("PATCH");
```

Invalid:

```ts
request("CONNECT"); // ❌
```

---

# 8. `as const`

`as const` is one of the most useful TypeScript features in modern code.

Without `as const`:

```ts
const user = {
  name: "Anil",
  role: "admin"
};
```

TypeScript generally infers:

```ts
{
  name: string;
  role: string;
}
```

With `as const`:

```ts
const user = {
  name: "Anil",
  role: "admin"
} as const;
```

TypeScript infers approximately:

```ts
{
  readonly name: "Anil";
  readonly role: "admin";
}
```

So `as const` does two important things:

1. Preserves literal values.
2. Makes the resulting properties readonly.

---

# 9. `const` vs `as const`

This is a common interview question.

## `const`

```ts
const role = "admin";
```

The variable cannot be reassigned:

```ts
role = "user"; // ❌
```

But `const` does not make object properties readonly:

```ts
const user = {
  role: "admin"
};

user.role = "user"; // ✅
```

## `as const`

```ts
const user = {
  role: "admin"
} as const;
```

Now:

```ts
user.role = "user"; // ❌
```

### Remember

```text
const
↓
variable cannot be reassigned

as const
↓
preserve literal types + readonly
```

---

# 10. `as const` With Arrays

Without `as const`:

```ts
const roles = ["admin", "user", "manager"];
```

TypeScript sees:

```ts
string[]
```

With:

```ts
const roles = [
  "admin",
  "user",
  "manager"
] as const;
```

TypeScript sees approximately:

```ts
readonly ["admin", "user", "manager"]
```

Now we can derive a union:

```ts
type Role = typeof roles[number];
```

Result:

```ts
"admin" | "user" | "manager"
```

This is a very useful pattern.

---

# 11. `as const` With Objects

```ts
const roles = {
  admin: "Administrator",
  user: "Regular User",
  manager: "Manager"
} as const;
```

Get the keys:

```ts
type Role = keyof typeof roles;
```

Result:

```ts
"admin" | "user" | "manager"
```

Get the values:

```ts
type RoleName = typeof roles[keyof typeof roles];
```

Result:

```ts
"Administrator" | "Regular User" | "Manager"
```

---

# 12. Real-World React Example

Suppose an application has transaction types:

```ts
const transactionTypes = [
  "purchase",
  "redemption",
  "switch",
  "sip"
] as const;
```

Create the type:

```ts
type TransactionType =
  typeof transactionTypes[number];
```

Now:

```ts
function processTransaction(type: TransactionType) {
  // ...
}
```

Valid:

```ts
processTransaction("purchase");
processTransaction("redemption");
processTransaction("switch");
```

Invalid:

```ts
processTransaction("withdraw"); // ❌
```

When a new transaction is added to the array, the type automatically updates.

This creates a **single source of truth**.

---

# 13. Enums

Enums provide a fixed set of named values.

```ts
enum Status {
  Loading,
  Success,
  Error
}
```

Usage:

```ts
let status: Status;

status = Status.Loading;
status = Status.Success;
```

---

# 14. Numeric Enums

By default, enums use numbers.

```ts
enum Status {
  Loading,
  Success,
  Error
}
```

Values are:

```text
Loading → 0
Success → 1
Error   → 2
```

You can explicitly assign values:

```ts
enum Status {
  Loading = 1,
  Success = 2,
  Error = 3
}
```

---

# 15. String Enums

String enums are often easier to understand.

```ts
enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error"
}
```

Usage:

```ts
const status: Status = Status.Success;
```

The runtime value is:

```ts
"success"
```

Another example:

```ts
enum UserRole {
  Admin = "admin",
  Manager = "manager",
  User = "user"
}
```

```ts
function checkPermission(role: UserRole) {
  if (role === UserRole.Admin) {
    // admin logic
  }
}
```

---

# 16. Enum vs Literal Union

### Union

```ts
type Status =
  | "loading"
  | "success"
  | "error";
```

Usage:

```ts
let status: Status = "loading";
```

### Enum

```ts
enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error"
}
```

Usage:

```ts
let status: Status = Status.Loading;
```

### Comparison

| Feature | Union | Enum |
|---|---|---|
| Runtime object | No | Yes |
| Lightweight | Yes | Usually |
| Fixed compile-time values | Excellent | Good |
| Generates JavaScript | No | Yes |
| String values | Yes | Yes |
| Common modern TS pattern | Very common | Situational |

For many modern React applications, a union is simpler when no runtime enum object is required:

```ts
type Status = "loading" | "success" | "error";
```

Or:

```ts
const statuses = [
  "loading",
  "success",
  "error"
] as const;

type Status = typeof statuses[number];
```

---

# 17. When Should You Use an Enum?

Enums can be useful when you specifically want a **runtime namespace of named constants**:

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

Then:

```ts
Direction.Up;
Direction.Down;
```

is convenient.

If you only need compile-time restrictions:

```ts
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
```

is often simpler.

---

# 18. `const enum`

TypeScript also supports:

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

A `const enum` is intended to be inlined during compilation.

For interview purposes, remember:

> `const enum` is intended for compile-time inlining rather than requiring a normal runtime enum object.

It has tooling/configuration considerations, so it isn't something you need to use routinely.

---

# 19. Discriminated Union + Literal Types

Literal types become especially powerful with discriminated unions.

```ts
type ApiResponse =
  | {
      status: "success";
      data: User[];
    }
  | {
      status: "error";
      message: string;
    };
```

Now:

```ts
function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case "success":
      console.log(response.data);
      break;

    case "error":
      console.log(response.message);
      break;
  }
}
```

Because `"success"` and `"error"` are literal types, TypeScript knows exactly which properties exist in each case.

---

# 20. `as const` vs Type Annotation

Compare:

```ts
const roles: string[] = [
  "admin",
  "user"
];
```

This gives:

```ts
string[]
```

Whereas:

```ts
const roles = [
  "admin",
  "user"
] as const;
```

gives approximately:

```ts
readonly ["admin", "user"]
```

Therefore, if you want a specific literal union, `as const` is very useful.

---

# 21. Common Mistake

Don't confuse:

```ts
const
```

with:

```ts
as const
```

This:

```ts
const config = {
  mode: "dark"
};
```

still allows:

```ts
config.mode = "light"; // ✅
```

But:

```ts
const config = {
  mode: "dark"
} as const;
```

does not:

```ts
config.mode = "light"; // ❌
```

---

# Interview Questions

1. What is a literal type?
2. Difference between `string` and `"hello"`?
3. What is a union of literal types?
4. What does `as const` do?
5. Difference between `const` and `as const`?
6. What happens when `as const` is used on an array?
7. How do you derive a union from an `as const` array?
8. How do you derive object keys using `keyof typeof`?
9. What is an enum?
10. Difference between numeric and string enums?
11. What is a `const enum`?
12. Enum vs union type?
13. When would you prefer a union over an enum?
14. How do literal types help discriminated unions?

---

# Practice

## Exercise 1

Create a type that only allows:

```text
"admin"
"manager"
"user"
```

---

## Exercise 2

Create:

```ts
const environments = [
  "development",
  "staging",
  "production"
] as const;
```

Then derive:

```ts
type Environment = ???;
```

Expected:

```ts
"development" | "staging" | "production"
```

---

## Exercise 3

Create:

```ts
const transactionTypes = {
  purchase: "PURCHASE",
  redemption: "REDEMPTION",
  switch: "SWITCH"
} as const;
```

Derive the key union:

```ts
type TransactionType = ???;
```

Expected:

```ts
"purchase" | "redemption" | "switch"
```

Then derive the value union:

```ts
type TransactionValue = ???;
```

Expected:

```ts
"PURCHASE" | "REDEMPTION" | "SWITCH"
```

---

## Exercise 4

Create:

```ts
enum UserRole {
  Admin = "admin",
  Manager = "manager",
  User = "user"
}
```

Then create:

```ts
function hasAdminAccess(role: UserRole): boolean {
  // ...
}
```

---

## Exercise 5

Create a discriminated union:

```ts
type Result =
  | {
      status: "success";
      data: string;
    }
  | {
      status: "error";
      message: string;
    };
```

Write a function that correctly handles both cases.

---

# Module 8 Summary

```text
Literal Type
    ↓
"success"

Literal Union
    ↓
"loading" | "success" | "error"

as const
    ↓
Preserve literal values + readonly

keyof typeof
    ↓
Object keys

typeof arr[number]
    ↓
Array element union

enum
    ↓
Named runtime constants

Discriminated Union
    ↓
Literal property + type narrowing
```

## Most Important for React Interviews

Focus especially on:

```ts
type Status = "loading" | "success" | "error";
```

```ts
const statuses = [
  "loading",
  "success",
  "error"
] as const;

type Status = typeof statuses[number];
```

```ts
type Role = keyof typeof roles;
```

And remember:

```text
const !== as const
```

`const` prevents reassignment of the variable, while `as const` preserves literal types and applies readonly behavior to the inferred structure.
