# TypeScript Module 4 — Unions, Intersections & Type Narrowing

## Introduction
This module covers union types, intersection types, discriminated unions, and type narrowing.

## Union Types
A union allows a value to be one of multiple types.

```ts
let value: string | number;
```

## Intersection Types
An intersection combines multiple type requirements.

```ts
type Person = {
  name: string;
  age: number;
};

type Developer = {
  language: string;
};

type Employee = Person & Developer;
```

`Employee` must contain all properties from both types.

### Intersection vs Object Spread

```ts
type A = Person & Employee;
```

This is a TypeScript compile-time type operation.

```ts
const A = {
  ...person,
  ...employee
};
```

This is JavaScript runtime object-spread behavior. If properties overlap, later spread properties overwrite earlier ones.

## Discriminated Unions

```ts
type ApiResponse =
  | { status: "success"; data: User[] }
  | { status: "error"; message: string };
```

Here `status` is the discriminant.

```ts
function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.log(response.message);
  }
}
```

## Type Narrowing

Type narrowing reduces a broad type to a more specific type based on runtime checks.

### `typeof`

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else {
    value.toFixed(2);
  }
}
```

### `in`

```ts
if ("permissions" in person) {
  // Admin
}
```

### `instanceof`

```ts
if (value instanceof Date) {
  console.log(value.getFullYear());
}
```

### Equality and Truthiness

```ts
if (value !== null) {
  // value is no longer null
}
```

Be careful with truthiness when `0`, `false`, or `""` are valid values.

### `Array.isArray`

```ts
if (Array.isArray(value)) {
  console.log(value.length);
}
```

## Custom Type Guards

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

`value is string` is a type predicate.

## `unknown` vs `any`

`any` largely disables type checking.

`unknown` requires narrowing before type-specific operations.

```ts
function process(value: unknown) {
  if (typeof value === "string") {
    value.toUpperCase();
  }
}
```

## Exhaustive Checking

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
```

Use `never` to ensure every union case is handled.

## React Example

```ts
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; message: string };
```

A `switch` on `state.status` narrows each state automatically.

## Interview Questions
1. What is a union type?
2. What is an intersection type?
3. Difference between `&` and object spread?
4. What is a discriminated union?
5. What is type narrowing?
6. How do `typeof`, `in`, and `instanceof` narrow types?
7. What is a custom type guard?
8. What does `value is string` mean?
9. Difference between `any` and `unknown`?
10. What is exhaustive checking with `never`?

## Summary
- `|` creates a union.
- `&` combines type requirements.
- Discriminated unions use a common literal property.
- Type narrowing makes unions more specific.
- Custom type guards provide reusable narrowing logic.
- `unknown` is safer than `any`.
- `never` can be used for exhaustive checks.
