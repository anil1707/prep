# TypeScript Module 6 — `keyof`, `typeof` & Indexed Access Types

## `keyof`

`keyof` creates a union of property names.

```ts
type User = {
  name: string;
  age: number;
  email: string;
};

type UserKeys = keyof User;
// "name" | "age" | "email"
```

## Indexed Access Types

```ts
type Name = User["name"]; // string
type Age = User["age"];   // number
```

The general form is `T[K]`: the type of property `K` in `T`.

## `keyof` + Indexed Access

```ts
type UserValues = User[keyof User];
```

This produces the union of all property value types.

## `keyof` + Generics

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

This preserves the exact return type for the selected key.

## Type-Level `typeof`

Runtime JavaScript:

```ts
typeof value
```

TypeScript type-level:

```ts
const user = {
  name: "Anil",
  age: 30
};

type User = typeof user;
```

The second form derives a type from an existing value.

## `keyof typeof`

```ts
const statusConfig = {
  loading: "Loading...",
  success: "Success!",
  error: "Something went wrong"
};

type Status = keyof typeof statusConfig;
// "loading" | "success" | "error"
```

## `as const`

```ts
const roles = ["admin", "manager", "user"] as const;

type Role = typeof roles[number];
// "admin" | "manager" | "user"
```

`as const` preserves literal types and makes the structure readonly.

## Object Values

```ts
const roles = {
  admin: "Administrator",
  user: "Regular User",
  manager: "Manager"
} as const;

type Role = keyof typeof roles;
type RoleLabel = typeof roles[keyof typeof roles];
```

## Real-World React Example

```ts
const buttonVariants = [
  "primary",
  "secondary",
  "danger"
] as const;

type ButtonVariant = typeof buttonVariants[number];
```

## Interview Questions
1. What does `keyof` do?
2. What is an Indexed Access Type?
3. What does `T[K]` mean?
4. Runtime `typeof` vs type-level `typeof`?
5. What does `keyof typeof obj` mean?
6. Why use `as const`?
7. How do you derive a union from an array?
8. How do you derive a union from object keys and values?
9. Explain `K extends keyof T`.

## Summary

```text
keyof T
→ union of keys

typeof value
→ derive a type from a value

T[K]
→ property type

keyof typeof obj
→ keys of an object value

typeof arr[number]
→ union of array element types
```
