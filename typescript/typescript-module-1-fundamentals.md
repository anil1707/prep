# TypeScript — Module 1: Fundamentals

## Introduction

TypeScript is a **statically typed superset of JavaScript** developed by Microsoft.

It adds a type system and other features on top of JavaScript to help catch errors during development, improve code readability, provide better IDE support, and make large applications easier to maintain.

TypeScript code is eventually compiled/transpiled into JavaScript.

```text
TypeScript
    ↓
TypeScript Compiler / Bundler
    ↓
JavaScript
    ↓
Browser / Node.js
```

---

## Why Do We Need TypeScript?

JavaScript is dynamically typed:

```js
let user = "Anil";

user = 100;
user = true;
```

JavaScript allows the variable to change its type.

In a large application, this can lead to unexpected behavior.

With TypeScript:

```ts
let user: string = "Anil";

user = 100; // TypeScript error
```

TypeScript catches the problem during development.

### Main Benefits

- Type safety
- Compile-time error detection
- Better IDE autocomplete
- Better refactoring
- Improved code readability
- Better maintainability
- Better developer experience
- Easier collaboration in large applications

---

## TypeScript vs JavaScript

| Feature | JavaScript | TypeScript |
|---|---|---|
| Typing | Dynamic | Static/structural |
| Type annotations | ❌ | ✅ |
| Compile-time type checking | ❌ | ✅ |
| Interfaces | ❌ | ✅ |
| Generics | ❌ | ✅ |
| Type aliases | ❌ | ✅ |
| Type inference | Limited | Strong |
| Browser execution | Directly | Compiled/transpiled to JavaScript |
| IDE support | Good | Excellent |

### Interview Answer

> TypeScript is a statically typed superset of JavaScript. It adds features such as type annotations, interfaces, generics, and compile-time type checking. It helps catch errors during development, improves code readability, and makes large applications easier to maintain. TypeScript is eventually compiled or transpiled to JavaScript for execution.

---

# Type Annotations

A type annotation explicitly tells TypeScript what type a variable should have.

### Syntax

```ts
let variableName: type = value;
```

### Examples

```ts
let name: string = "Anil";
let age: number = 30;
let isDeveloper: boolean = true;
```

Now this produces a TypeScript error:

```ts
age = "30";
```

because `age` was declared as a `number`.

---

# Primitive Types

Common primitive types in TypeScript include:

```text
string
number
boolean
null
undefined
bigint
symbol
```

## string

```ts
let name: string = "Anil";
```

## number

TypeScript uses `number` for both integers and floating-point numbers.

```ts
let age: number = 30;
let salary: number = 1100000;
let rating: number = 4.5;
```

There is no separate `int` or `float` type.

## boolean

```ts
let isLoggedIn: boolean = true;
```

## undefined

```ts
let value: undefined = undefined;
```

## null

```ts
let value: null = null;
```

With strict TypeScript settings, `null` and `undefined` are commonly used with union types:

```ts
let username: string | null = null;
```

---

# Type Inference

TypeScript can automatically determine a variable's type from its assigned value.

This is called **type inference**.

```ts
let name = "Anil";
```

TypeScript infers:

```text
name: string
```

Similarly:

```ts
let age = 30;
```

TypeScript infers:

```text
age: number
```

And:

```ts
let isActive = true;
```

TypeScript infers:

```text
isActive: boolean
```

## Explicit Typing vs Type Inference

### Explicit

```ts
let name: string = "Anil";
```

### Inferred

```ts
let name = "Anil";
```

Both are valid.

### Best Practice

Avoid unnecessary type annotations when TypeScript can clearly infer the type.

Prefer:

```ts
const userName = "Anil";
```

instead of:

```ts
const userName: string = "Anil";
```

However, explicitly define types when creating contracts, function signatures, complex objects, public APIs, or when inference cannot express the intended type clearly.

---

# `any`

`any` tells TypeScript to effectively stop type checking a value.

```ts
let value: any = "Hello";

value = 100;
value = true;
value = {};
```

All of these are allowed.

You can also perform potentially unsafe operations:

```ts
let value: any = "Hello";

value.toUpperCase();
value.someRandomFunction();
```

TypeScript will not protect you from the second operation.

## Why Is `any` Dangerous?

`any` defeats one of the main benefits of TypeScript.

```ts
const user: any = {
  name: "Anil"
};

user.getSalary();
```

The code can fail at runtime because TypeScript did not check the property.

### Best Practice

Avoid `any` whenever possible.

If the type is genuinely unknown, prefer:

```ts
unknown
```

---

# `unknown`

`unknown` represents a value whose type is not known yet.

```ts
let value: unknown;

value = "Anil";
value = 100;
value = true;
```

Unlike `any`, TypeScript does not allow arbitrary operations on an `unknown` value.

```ts
let value: unknown = "Anil";

value.toUpperCase(); // Error
```

You must first check/narrow the type:

```ts
let value: unknown = "Anil";

if (typeof value === "string") {
  value.toUpperCase();
}
```

This makes `unknown` safer than `any`.

---

# `void`

`void` is commonly used for functions that do not return a meaningful value.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

Another example:

```ts
function greet(): void {
  console.log("Hello");
}
```

The function executes but does not return a useful value.

---

# `never`

`never` represents a value that can never occur because the function never successfully completes.

A common example is a function that always throws an error:

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

Another example is an infinite loop:

```ts
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}
```

## `void` vs `never`

| `void` | `never` |
|---|---|
| Function completes | Function never successfully completes |
| Doesn't return a meaningful value | Cannot produce a value |
| Common for logging/event handlers | Common for functions that always throw or never terminate |

Example:

```ts
function logMessage(): void {
  console.log("Hello");
}
```

```ts
function fail(): never {
  throw new Error("Something went wrong");
}
```

---

# Arrays

There are two common ways to type arrays.

## Syntax 1

```ts
let numbers: number[] = [1, 2, 3, 4];
```

## Syntax 2

```ts
let numbers: Array<number> = [1, 2, 3, 4];
```

Both mean the same thing.

### String Array

```ts
let names: string[] = ["Anil", "Rahul", "Amit"];
```

### Object Array

```ts
let users: {
  name: string;
  age: number;
}[] = [
  {
    name: "Anil",
    age: 30
  }
];
```

For larger applications, interfaces or type aliases make object types cleaner.

---

# Tuples

A tuple is an array where the **position and type of each element are known**.

```ts
let user: [string, number] = ["Anil", 30];
```

The structure is:

```text
index 0 → string
index 1 → number
```

This is invalid:

```ts
let user: [string, number] = [30, "Anil"];
```

## Example

```ts
let response: [number, string] = [200, "Success"];
```

Tuples are useful when the number and order of values are fixed.

---

# Object Types

You can directly define an object's structure:

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Anil",
  age: 30
};
```

This is invalid:

```ts
const user: {
  name: string;
  age: number;
} = {
  name: "Anil",
  age: "30"
};
```

Later, interfaces and type aliases will make these structures cleaner.

---

# Optional Properties

A property can be made optional using `?`.

```ts
interface User {
  name: string;
  age: number;
  email?: string;
}
```

Both objects are valid:

```ts
const user1: User = {
  name: "Anil",
  age: 30
};
```

```ts
const user2: User = {
  name: "Anil",
  age: 30,
  email: "anil@example.com"
};
```

Interfaces will be covered in detail in a later module.

---

# TypeScript Is Not Runtime Type Safety

This is an important interview concept.

TypeScript primarily performs type checking during development/compilation.

It does **not automatically validate external runtime data**.

For example:

```ts
interface User {
  name: string;
}

const user: User = await fetchUser();
```

TypeScript assumes the returned value follows the `User` type.

But an API could actually return:

```json
{
  "name": 100
}
```

TypeScript itself does not automatically inspect and validate the API response at runtime.

For runtime validation, applications may use libraries such as Zod or custom validation logic.

### Remember

```text
TypeScript
    ↓
Compile-time / static type checking

Runtime validation
    ↓
Validating actual data received by the application
```

---

# Type Inference vs Runtime Validation

These concepts are different.

### Type inference

TypeScript determines a type from the code:

```ts
const name = "Anil";
```

TypeScript knows:

```text
name → string
```

### Runtime validation

The application checks actual data while it is running.

For example:

```text
API response
    ↓
Runtime validation
    ↓
Validated data
```

---

# Common Mistakes

## 1. Using `any` everywhere

Avoid:

```ts
const response: any = apiResponse;
```

Prefer a proper type or `unknown` when the type is genuinely unknown.

---

## 2. Adding unnecessary annotations

Avoid:

```ts
const name: string = "Anil";
const age: number = 30;
```

when inference is already obvious.

Prefer:

```ts
const name = "Anil";
const age = 30;
```

---

## 3. Confusing `unknown` and `any`

Remember:

```text
any
→ TypeScript trusts you without checking.

unknown
→ TypeScript requires you to check before using the value.
```

---

## 4. Assuming TypeScript validates API responses

TypeScript does not automatically validate data received from an API.

Static types and runtime validation are different concepts.

---

# Interview Questions

## Basic Questions

### 1. What is TypeScript?

TypeScript is a statically typed superset of JavaScript that adds features such as type annotations, interfaces, generics, and compile-time type checking.

### 2. Why do we use TypeScript?

Main reasons:

- Catch errors earlier
- Improve code maintainability
- Better autocomplete
- Safer refactoring
- Improve readability
- Define clear contracts between parts of an application

### 3. Is TypeScript executed directly by the browser?

No. TypeScript is compiled/transpiled to JavaScript, which is then executed by the browser or Node.js.

### 4. What is type annotation?

Explicitly specifying the type of a variable, parameter, property, or return value.

```ts
let age: number = 30;
```

### 5. What is type inference?

TypeScript automatically determines the type based on the value or context.

```ts
let age = 30;
```

TypeScript infers `number`.

### 6. What is `any`?

`any` disables most TypeScript type checking for a value.

### 7. Why should we avoid `any`?

Because it removes type safety and can allow errors that TypeScript could otherwise catch.

### 8. What is `unknown`?

`unknown` represents a value whose type is not known. Unlike `any`, the value must be narrowed or checked before performing most operations.

### 9. What is the difference between `any` and `unknown`?

| `any` | `unknown` |
|---|---|
| Disables type checking | Preserves type safety |
| Can perform operations directly | Must narrow/check first |
| Less safe | Safer |
| Should generally be avoided | Preferred for genuinely unknown data |

### 10. Difference between `void` and `never`?

`void` means a function doesn't return a meaningful value.

`never` means the function never successfully completes with a value.

### 11. What is a tuple?

A tuple is a fixed-position array type where each position can have a specific type.

```ts
let user: [string, number] = ["Anil", 30];
```

### 12. Does TypeScript provide runtime type safety?

No. TypeScript provides static/compile-time type checking. Runtime data must be validated separately when necessary.

---

# Practical Example

Here's a small example combining the concepts:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = {
  id: 1,
  name: "Anil"
};

function printUser(user: User): void {
  console.log(user.name);
}

printUser(user);
```

This example uses:

- Interface
- Object typing
- Optional property
- Function parameter typing
- `void`

Interfaces will be covered properly later.

---

# Summary

TypeScript adds static typing and compile-time checking to JavaScript.

The most important Module 1 concepts are:

```text
TypeScript
    ↓
JavaScript + Type System

Type Annotation
    ↓
let age: number = 30;

Type Inference
    ↓
let age = 30;

any
    ↓
Disables type checking

unknown
    ↓
Unknown value + requires type checking

void
    ↓
Function doesn't return a meaningful value

never
    ↓
Function never successfully returns

Array
    ↓
string[]

Tuple
    ↓
[string, number]

Optional Property
    ↓
email?: string
```

## Key Interview Takeaway

> TypeScript provides compile-time/static type checking while JavaScript remains the runtime language. Type inference reduces unnecessary annotations, while types such as `unknown`, unions, generics, and type guards help us write safer code without relying on `any`.
