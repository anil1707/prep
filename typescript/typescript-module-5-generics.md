# TypeScript Module 5 — Generics

## Introduction
Generics allow reusable code to work with different types while preserving type safety.

## Generic Function

```ts
function identity<T>(value: T): T {
  return value;
}
```

TypeScript can infer `T`:

```ts
identity("Anil"); // string
identity(100);    // number
```

## Generics vs `any`

```ts
function identity(value: any): any {
  return value;
}
```

loses useful type information.

```ts
function identity<T>(value: T): T {
  return value;
}
```

preserves it.

## Generic Arrays

```ts
function getFirst<T>(items: T[]): T {
  return items[0];
}
```

## Multiple Generic Parameters

```ts
function pair<T, U>(first: T, second: U) {
  return { first, second };
}
```

## Generic Interfaces

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

Examples:

```ts
ApiResponse<User>
ApiResponse<User[]>
```

## Generic Constraints

```ts
function getLength<T extends { length: number }>(value: T) {
  return value.length;
}
```

`extends` constrains what `T` can be.

## `keyof` + Generics

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

This ensures `key` is valid and preserves the exact property type.

## Generic Classes

```ts
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

## Generic React Components

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
```

## Generic Custom Hooks

```ts
function useData<T>(data: T) {
  return data;
}
```

## Generic Promises

```ts
async function getUser(): Promise<User> {
  // ...
}
```

`Promise<T>` is itself a generic.

## Generic vs Union

A union defines a fixed set of possible types, while a generic allows a type to be inferred and preserved based on the caller.

## Interview Questions
1. What are generics?
2. Why use generics instead of `any`?
3. What is generic type inference?
4. What does `T extends ...` mean?
5. How do multiple generic parameters work?
6. How are generics used with interfaces and classes?
7. Explain `K extends keyof T`.
8. Difference between generics and union types?
9. What is `Promise<T>`?
10. How are generics used in React?

## Summary
- Generics make code reusable without losing type safety.
- `T` is a conventional generic parameter.
- TypeScript often infers generic parameters automatically.
- Constraints use `extends`.
- Generics work with functions, interfaces, types, classes, React components, hooks, and Promises.
