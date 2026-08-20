# TypeScript Module 7 — Utility Types

Utility types transform existing types without requiring us to rewrite them.

## `Partial<T>`

Makes all properties optional.

```ts
type UpdateUser = Partial<User>;
```

Useful for PATCH/update APIs.

## `Required<T>`

Makes all properties required.

```ts
type CompleteUser = Required<User>;
```

## `Readonly<T>`

Makes properties readonly at compile time.

```ts
type ReadonlyUser = Readonly<User>;
```

This does not freeze the object at runtime.

## `Pick<T, K>`

Selects specific properties.

```ts
type UserProfile = Pick<User, "id" | "name" | "email">;
```

## `Omit<T, K>`

Removes specific properties.

```ts
type PublicUser = Omit<User, "password">;
```

### Pick vs Omit

```text
Pick → choose what to keep
Omit → choose what to remove
```

## `Record<K, T>`

Creates an object type from a set of keys.

```ts
type Roles = "admin" | "user" | "manager";

type RolePermissions = Record<Roles, string[]>;
```

## `Exclude<T, U>`

Removes matching members from a union.

```ts
type Status = "loading" | "success" | "error";

type FinalStatus = Exclude<Status, "loading">;
// "success" | "error"
```

## `Extract<T, U>`

Keeps matching members from a union.

```ts
type Selected = Extract<Status, "success" | "error">;
// "success" | "error"
```

## `NonNullable<T>`

Removes `null` and `undefined`.

```ts
type Value = string | number | null | undefined;

type CleanValue = NonNullable<Value>;
// string | number
```

## `ReturnType<T>`

Extracts the return type of a function.

```ts
function getUser() {
  return {
    id: 1,
    name: "Anil"
  };
}

type User = ReturnType<typeof getUser>;
```

## `Parameters<T>`

Extracts function parameters as a tuple.

```ts
function createUser(name: string, age: number) {}

type Params = Parameters<typeof createUser>;
// [string, number]
```

## `Awaited<T>`

Extracts the resolved value of a Promise.

```ts
type Result = Awaited<Promise<string>>;
// string
```

## `Awaited` + `ReturnType`

```ts
async function fetchData() {
  return {
    id: 1,
    name: "Anil"
  };
}

type Data = Awaited<ReturnType<typeof fetchData>>;
```

`Data` is the resolved object type rather than the Promise type.

## Utility Types Cheat Sheet

| Utility | Purpose |
|---|---|
| `Partial<T>` | Make properties optional |
| `Required<T>` | Make properties required |
| `Readonly<T>` | Make properties readonly |
| `Pick<T, K>` | Select properties |
| `Omit<T, K>` | Remove properties |
| `Record<K, T>` | Map keys to a value type |
| `Exclude<T, U>` | Remove union members |
| `Extract<T, U>` | Keep matching union members |
| `NonNullable<T>` | Remove null/undefined |
| `ReturnType<T>` | Get function return type |
| `Parameters<T>` | Get function parameters |
| `Awaited<T>` | Get resolved Promise value |

## Most Important for Interviews

Prioritize:

```text
Partial
Pick
Omit
Record
ReturnType
Awaited
Exclude
Extract
```

## Interview Questions
1. What is `Partial<T>`?
2. Difference between `Pick` and `Omit`?
3. What does `Record<K, T>` do?
4. Difference between `Exclude` and `Extract`?
5. What does `NonNullable` do?
6. How does `ReturnType` work?
7. What does `Parameters` return?
8. What does `Awaited` do?
9. Explain `Awaited<ReturnType<typeof fetchData>>`.
10. Which utility type would you use for a PATCH API?

## Summary

Utility types let you derive reusable types from existing types and functions, reducing duplication and improving type safety.
