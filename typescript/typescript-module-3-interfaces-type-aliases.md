# TypeScript — Module 3: Interfaces & Type Aliases

## Introduction

Interfaces and type aliases define the **shape and contract of data** in TypeScript.

They are heavily used in:

- React component props
- API request/response models
- Redux state
- Node.js/Express models
- Reusable utility types
- Function contracts

The two main approaches are:

```ts
interface User {
  id: number;
  name: string;
}
```

and:

```ts
type User = {
  id: number;
  name: string;
};
```

Both can describe object shapes, but they have important differences.

---

# What Is an Interface?

An `interface` defines the structure or shape of an object.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Usage:

```ts
const user: User = {
  id: 1,
  name: "Anil",
  email: "anil@example.com"
};
```

TypeScript ensures that the object follows the `User` structure.

---

# Why Do We Need Interfaces?

Interfaces allow us to define a reusable contract.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Now multiple components or functions can reuse it:

```ts
function UserProfile({ user }: { user: User }) {
  // ...
}

function UserCard({ user }: { user: User }) {
  // ...
}
```

This keeps the application's data structures consistent.

---

# Optional Properties

A property can be made optional using `?`.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

Both are valid:

```ts
const user1: User = {
  id: 1,
  name: "Anil"
};
```

```ts
const user2: User = {
  id: 1,
  name: "Anil",
  email: "anil@example.com"
};
```

An optional property can be treated as potentially `undefined`.

---

# Readonly Properties

The `readonly` modifier prevents reassignment of a property through the TypeScript type.

```ts
interface User {
  readonly id: number;
  name: string;
}
```

Usage:

```ts
const user: User = {
  id: 1,
  name: "Anil"
};

user.name = "Rahul"; // ✅

user.id = 2; // ❌
```

`readonly` is primarily a compile-time restriction. It does not automatically make nested objects deeply immutable at runtime.

---

# Nested Objects

Interfaces can contain other interfaces.

```ts
interface Address {
  city: string;
  state: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
}
```

Usage:

```ts
const user: User = {
  id: 1,
  name: "Anil",
  address: {
    city: "Varanasi",
    state: "Uttar Pradesh"
  }
};
```

This is very common when modeling API responses.

---

# Arrays With Interfaces

```ts
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Anil"
  },
  {
    id: 2,
    name: "Rahul"
  }
];
```

You can also write:

```ts
const users: Array<User> = [];
```

Both are valid.

---

# Interfaces With Functions

An interface can contain function properties.

```ts
interface User {
  id: number;
  name: string;
  getDisplayName: () => string;
}
```

Implementation:

```ts
const user: User = {
  id: 1,
  name: "Anil",

  getDisplayName() {
    return this.name;
  }
};
```

You can also use method syntax:

```ts
interface User {
  id: number;
  name: string;
  getDisplayName(): string;
}
```

---

# Extending Interfaces

One interface can extend another.

```ts
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}
```

`Employee` now contains:

```text
name
age
employeeId
```

Example:

```ts
const employee: Employee = {
  name: "Anil",
  age: 30,
  employeeId: 101
};
```

---

# Multiple Interface Inheritance

An interface can extend multiple interfaces.

```ts
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

interface Developer extends Person, Employee {
  language: string;
}
```

Usage:

```ts
const developer: Developer = {
  name: "Anil",
  employeeId: 101,
  language: "TypeScript"
};
```

---

# What Is a Type Alias?

A type alias gives a name to a type.

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

Usage:

```ts
const user: User = {
  id: 1,
  name: "Anil",
  email: "anil@example.com"
};
```

For basic object shapes, a type alias and interface can look almost identical.

---

# Interface vs Type

### Interface

```ts
interface User {
  id: number;
  name: string;
}
```

### Type

```ts
type User = {
  id: number;
  name: string;
};
```

Both can describe the same object shape.

The differences become more important when using:

- Unions
- Intersections
- Declaration merging
- Extending/composition
- Tuples
- Primitive aliases
- Function types

---

# Extending Interface vs Type

## Interface

Interfaces use `extends`:

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

## Type

Type aliases commonly use intersections:

```ts
type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
};
```

The `&` operator creates an intersection type.

---

# Union Types

A union means:

> A value can be one of multiple types.

```ts
type Status = string | number;
```

Now:

```ts
let status: Status;

status = "success";
status = 200;
```

Both are valid.

But:

```ts
status = true; // ❌
```

because `boolean` is not part of the union.

---

# Literal Union Types

Literal unions are very common in React applications.

```ts
type Status = "loading" | "success" | "error";
```

Usage:

```ts
let status: Status = "loading";

status = "success";
status = "error";
```

Invalid:

```ts
status = "pending"; // ❌
```

This is safer than:

```ts
let status: string;
```

because only known values are allowed.

---

# Intersection Types

An intersection combines multiple types.

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type Developer = Person & Employee;
```

Now `Developer` requires properties from both types:

```ts
const developer: Developer = {
  name: "Anil",
  employeeId: 101
};
```

Think of it as:

```text
Person
   +
Employee
   ↓
Developer
```

---

# Union vs Intersection

This is an important interview question.

## Union — `|`

Means:

> OR

```ts
type ID = string | number;
```

A value can be a `string` OR a `number`.

## Intersection — `&`

Means:

> AND

```ts
type Developer = Person & Employee;
```

The object must satisfy both types.

### Easy way to remember

```text
| → OR

& → AND
```

---

# Type Aliases Can Represent More Than Objects

Type aliases can represent many kinds of types.

## Primitive / Union

```ts
type ID = string | number;
```

## Tuple

```ts
type Coordinates = [number, number];
```

## Function Type

```ts
type Operation = (a: number, b: number) => number;
```

## Literal Union

```ts
type Status = "loading" | "success" | "error";
```

This flexibility is one of the major strengths of type aliases.

---

# Literal Types

A literal type restricts a value to specific literal values.

```ts
type Direction = "left" | "right";
```

Another example:

```ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
```

Usage:

```ts
let method: HttpMethod = "GET";
```

Invalid:

```ts
method = "PATCH"; // ❌
```

---

# Declaration Merging

Interfaces support declaration merging.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

TypeScript merges these declarations.

The resulting interface is effectively:

```ts
interface User {
  name: string;
  age: number;
}
```

This is called **declaration merging**.

---

# Type Aliases Do Not Support Declaration Merging

This is invalid:

```ts
type User = {
  name: string;
};

type User = {
  age: number;
};
```

It results in a duplicate identifier error.

Unlike interfaces, type aliases cannot be redeclared and merged.

---

# Interface vs Type — Comparison

| Feature | Interface | Type |
|---|---|---|
| Object shapes | ✅ | ✅ |
| Optional properties | ✅ | ✅ |
| `readonly` | ✅ | ✅ |
| Extending | `extends` | `&` |
| Union types | ❌ directly | ✅ |
| Intersection types | Composition supported | ✅ |
| Tuples | Not the primary use | ✅ |
| Primitive aliases | ❌ | ✅ |
| Function types | ✅ | ✅ |
| Declaration merging | ✅ | ❌ |
| Class `implements` | ✅ | ✅ |

---

# Which One Should We Use?

There is no universal rule that one must always be used.

A common convention is:

## Use `interface` for object contracts

```ts
interface User {
  id: number;
  name: string;
}
```

Interfaces are particularly useful for:

- Object structures
- React component props
- Extensible contracts
- Class contracts
- Public library definitions

## Use `type` when type composition is useful

For example:

```ts
type ID = string | number;
```

```ts
type Status = "loading" | "success" | "error";
```

```ts
type UserWithRole = User & {
  role: string;
};
```

```ts
type Callback = (value: string) => void;
```

### Interview Answer

> Both `interface` and `type` can describe object shapes. Interfaces are particularly useful for extensible object contracts and declaration merging, while type aliases are more flexible for unions, intersections, tuples, primitive aliases, and function types. In real projects, teams often choose a consistent convention.

---

# React Example — Component Props

Interfaces are commonly used for React props.

```tsx
interface UserProps {
  name: string;
  age: number;
}

function UserCard({ name, age }: UserProps) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

Usage:

```tsx
<UserCard name="Anil" age={30} />
```

Invalid:

```tsx
<UserCard name="Anil" age="30" />
```

---

# React Props With Optional Properties

```tsx
interface UserProps {
  name: string;
  age: number;
  email?: string;
}
```

Both are valid:

```tsx
<UserCard name="Anil" age={30} />
```

```tsx
<UserCard
  name="Anil"
  age={30}
  email="anil@example.com"
/>
```

---

# API Response Example

Suppose the backend returns:

```json
{
  "id": 1,
  "name": "Anil",
  "email": "anil@example.com"
}
```

Define:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Then:

```ts
async function getUser(): Promise<User> {
  const response = await fetch("/api/user");

  return response.json();
}
```

Now:

```ts
const user = await getUser();

user.id;
user.name;
user.email;
```

has proper type information.

---

# Common Mistakes

## 1. Thinking `interface` and `type` are completely different

They overlap significantly.

```ts
interface User {
  name: string;
}
```

and:

```ts
type User = {
  name: string;
};
```

can describe the same object shape.

---

## 2. Confusing Union and Intersection

Remember:

```text
| → OR

& → AND
```

---

## 3. Using `string` when a literal union is better

Instead of:

```ts
type Status = string;
```

if only certain values are valid:

```ts
type Status = "loading" | "success" | "error";
```

---

## 4. Thinking `readonly` means deep immutability

```ts
interface User {
  readonly id: number;
}
```

does not automatically make nested objects immutable.

---

# Interview Questions

1. What is an interface?
2. Why do we use interfaces?
3. What is a type alias?
4. What is the difference between interface and type?
5. Can interfaces extend other interfaces?
6. Can an interface extend multiple interfaces?
7. What is declaration merging?
8. Can type aliases support declaration merging?
9. What is a union type?
10. What is an intersection type?
11. What is the difference between `|` and `&`?
12. What are literal types?
13. Can a type alias represent a union?
14. Can an interface represent a union directly?
15. When would you choose interface over type?
16. When would you choose type over interface?
17. How do you define optional properties?
18. How do you define readonly properties?
19. How do you type React component props?
20. How would you model an API response using TypeScript?

---

# Practical Exercises

## Exercise 1 — User Interface

Create a `User` interface containing:

```text
id → number
name → string
email → string
phone → optional string
```

Then create a valid user object.

## Exercise 2 — Interface Extension

Create:

```text
Person
   ↓
Employee
```

`Person` should contain:

```text
name
age
```

`Employee` should additionally contain:

```text
employeeId
department
```

## Exercise 3 — Union

Create:

```text
ID → string OR number
```

Then create variables using both types.

## Exercise 4 — Literal Union

Create:

```text
Status → "loading" | "success" | "error"
```

Try assigning an invalid value and observe the TypeScript error.

## Exercise 5 — Intersection

Create:

```text
Person
Employee
```

Then create:

```text
Developer = Person & Employee
```

The resulting object should contain properties from both.

## Exercise 6 — React Props

Create:

```ts
interface UserCardProps {
  name: string;
  age: number;
  isActive: boolean;
}
```

Then create a React component using these props.

---

# Module 3 Summary

```text
interface
    ↓
Object contract

type
    ↓
Reusable type definition

?
    ↓
Optional property

readonly
    ↓
Cannot reassign through that property in checked TypeScript code

extends
    ↓
Interface inheritance

|
    ↓
Union → OR

&
    ↓
Intersection → AND

"loading" | "success" | "error"
    ↓
Literal union

interface declaration merging
    ↓
Supported

type declaration merging
    ↓
Not supported
```

## Key Interview Takeaway

> Both `interface` and `type` can describe object shapes. Interfaces are particularly useful for extensible object contracts and declaration merging, while type aliases are more flexible for unions, intersections, tuples, primitive aliases, and function types. Both are widely used in real-world TypeScript applications.

---

## Related Topics

- TypeScript Fundamentals
- TypeScript Functions
- Union & Intersection Types
- Type Narrowing
- Generics
- Utility Types
- TypeScript with React
- TypeScript with Node.js
