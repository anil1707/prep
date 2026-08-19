# TypeScript — Module 2: Functions

## Introduction

Functions are one of the most important parts of TypeScript because TypeScript allows us to define a clear **contract** for:

- Function parameters
- Return values
- Optional parameters
- Callback functions
- Rest parameters
- Async functions
- Function overloads

This is especially important in React and Node.js applications because callbacks, API functions, event handlers, and utility functions are used everywhere.

---

# Function Parameter Types

In JavaScript:

```js
function add(a, b) {
  return a + b;
}
```

TypeScript allows us to define parameter types:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

Now:

```ts
add(10, 20); // ✅

add("10", "20"); // ❌
```

TypeScript knows that both parameters must be numbers.

---

# Return Types

We can explicitly specify what a function should return.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Syntax

```ts
function functionName(parameters): returnType {
  // ...
}
```

Examples:

```ts
function getName(): string {
  return "Anil";
}
```

```ts
function isAdult(age: number): boolean {
  return age >= 18;
}
```

---

# Return Type Inference

We don't always need to explicitly specify a return type.

TypeScript can infer it:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

TypeScript understands:

```text
(a: number, b: number) => number
```

Similarly:

```ts
function getName() {
  return "Anil";
}
```

TypeScript infers:

```text
() => string
```

### Best Practice

For simple internal functions, inference is usually enough.

Explicit return types can be useful for:

- Exported functions
- Public APIs
- Complex functions
- Important contracts
- Functions where an unintended return value should be caught

---

# Functions With No Return Value

Use `void` when a function doesn't return a meaningful value.

```ts
function printMessage(message: string): void {
  console.log(message);
}
```

Another example:

```ts
function greet(): void {
  console.log("Hello");
}
```

---

# Optional Parameters

A function parameter can be made optional using `?`.

```ts
function greet(name?: string) {
  console.log(`Hello ${name}`);
}
```

Both are valid:

```ts
greet("Anil");

greet();
```

An optional parameter is effectively:

```ts
string | undefined
```

So:

```ts
function greet(name?: string) {}
```

is conceptually similar to:

```ts
function greet(name: string | undefined) {}
```

---

# Optional Parameter Ordering

Required parameters should come before optional parameters.

Valid:

```ts
function greet(name: string, age?: number) {
  // ...
}
```

Invalid:

```ts
function greet(age?: number, name: string) {
  // ❌
}
```

---

# Default Parameters

JavaScript default parameters work normally in TypeScript.

```ts
function greet(name: string = "Guest") {
  console.log(`Hello ${name}`);
}
```

Usage:

```ts
greet("Anil");
```

Output:

```text
Hello Anil
```

And:

```ts
greet();
```

Output:

```text
Hello Guest
```

TypeScript understands that `name` is a string.

---

# Rest Parameters

Rest parameters allow a function to accept multiple values.

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}
```

Usage:

```ts
sum(10, 20, 30);
```

Result:

```text
60
```

The important syntax is:

```ts
...numbers: number[]
```

Every argument must be a number.

---

# Function Types

A function itself can have a type.

```ts
let add: (a: number, b: number) => number;
```

Now we can assign a function:

```ts
add = (a, b) => {
  return a + b;
};
```

The function type means:

```text
Parameters:
a → number
b → number

Return:
number
```

This is invalid:

```ts
add = (a, b) => {
  return "Hello"; // ❌
};
```

because the function is expected to return a number.

---

# Function Type Syntax

The general syntax is:

```ts
(parameterType) => returnType
```

Example:

```ts
(a: number, b: number) => number
```

means:

> A function that accepts two numbers and returns a number.

Another example:

```ts
(name: string) => void
```

means:

> A function that accepts a string and doesn't return a meaningful value.

---

# Callback Functions

Callback typing is extremely important in React and JavaScript development.

Example:

```ts
function processUser(
  name: string,
  callback: (name: string) => void
) {
  callback(name);
}
```

Usage:

```ts
processUser("Anil", (name) => {
  console.log(name);
});
```

Here:

```ts
callback: (name: string) => void
```

means:

> `callback` must be a function that accepts a string and returns `void`.

---

# Another Callback Example

```ts
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}
```

Usage:

```ts
const result = calculate(10, 20, (x, y) => {
  return x + y;
});
```

The callback must:

```text
accept number
accept number
return number
```

---

# Optional Callback

A callback can also be optional.

```ts
function fetchUser(
  callback?: (user: string) => void
) {
  if (callback) {
    callback("Anil");
  }
}
```

Both are valid:

```ts
fetchUser();
```

```ts
fetchUser((user) => {
  console.log(user);
});
```

---

# Reusable Function Types

When a function type becomes complex or is used in multiple places, use a type alias.

```ts
type Operation = (a: number, b: number) => number;
```

Now:

```ts
const add: Operation = (a, b) => a + b;

const multiply: Operation = (a, b) => a * b;
```

This makes the function contract reusable.

---

# Function Types With Interfaces

Functions can also be described using interfaces.

```ts
interface Calculator {
  (a: number, b: number): number;
}
```

Then:

```ts
const add: Calculator = (a, b) => {
  return a + b;
};
```

Interfaces will be covered in more detail in Module 3.

---

# Function Overloads

Function overloads allow us to define multiple valid function signatures for the same function.

Example:

```ts
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return String(value);
}
```

Now both are valid:

```ts
format("Hello");

format(100);
```

The implementation handles the actual logic:

```ts
function format(value: string | number): string {
  return String(value);
}
```

---

# Why Do We Need Function Overloads?

Consider:

```ts
function getValue(value: string | number) {
  return value;
}
```

This accepts both types, but the relationship between input and output may not be precise enough.

Using overloads:

```ts
function getValue(value: string): string;
function getValue(value: number): number;

function getValue(value: string | number) {
  return value;
}
```

Now TypeScript understands:

```ts
const result1 = getValue("Hello");
// string

const result2 = getValue(100);
// number
```

---

# Arrow Functions

TypeScript works naturally with arrow functions.

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

The return type can also be inferred:

```ts
const add = (a: number, b: number) => {
  return a + b;
};
```

---

# Async Functions

An `async` function returns a Promise.

```ts
async function getUser(): Promise<string> {
  return "Anil";
}
```

The return type is:

```text
Promise<string>
```

Another example:

```ts
async function getAge(): Promise<number> {
  return 30;
}
```

Conceptually:

```text
string
   ↓
async function
   ↓
Promise<string>
```

---

# Async Function With an Object

Suppose we have:

```ts
type User = {
  id: number;
  name: string;
};
```

We can write:

```ts
async function getUser(): Promise<User> {
  return {
    id: 1,
    name: "Anil"
  };
}
```

Now:

```ts
const user = await getUser();

console.log(user.id);
console.log(user.name);
```

TypeScript knows:

```text
user → User
```

---

# Why Does an Async Function Return `Promise<T>`?

When we write:

```ts
async function getUser(): Promise<User> {
  return {
    id: 1,
    name: "Anil"
  };
}
```

We return a `User`, but the function's return type is `Promise<User>`.

This is because `async` automatically wraps the returned value in a Promise.

Conceptually:

```ts
async function getUser(): Promise<User> {
  return user;
}
```

is similar to:

```ts
function getUser(): Promise<User> {
  return Promise.resolve(user);
}
```

---

# Function Parameter Destructuring

We can type destructured parameters.

```ts
function printUser({
  name,
  age
}: {
  name: string;
  age: number;
}) {
  console.log(name, age);
}
```

Usage:

```ts
printUser({
  name: "Anil",
  age: 30
});
```

Later, an interface or type alias makes this cleaner:

```ts
interface User {
  name: string;
  age: number;
}

function printUser({ name, age }: User) {
  console.log(name, age);
}
```

---

# `void` vs `undefined` Return Types

These are not exactly the same.

## `void`

```ts
function log(): void {
  console.log("Hello");
}
```

The function is not expected to return a meaningful value.

## `undefined`

```ts
function getValue(): undefined {
  return undefined;
}
```

Here the function specifically returns `undefined`.

For normal "no return value" functions, `void` is generally preferred.

---

# Common Mistakes

## 1. Using `any` for callbacks

Avoid:

```ts
function process(callback: any) {
  callback();
}
```

Prefer:

```ts
function process(callback: () => void) {
  callback();
}
```

---

## 2. Forgetting `Promise<T>` for async functions

Incorrect:

```ts
async function getUser(): User {
  // ...
}
```

Correct:

```ts
async function getUser(): Promise<User> {
  // ...
}
```

An async function always returns a Promise.

---

## 3. Incorrect callback signature

If we define:

```ts
function process(callback: (id: number) => void) {
  callback(10);
}
```

The callback must accept a number.

Correct:

```ts
process((id) => {
  console.log(id);
});
```

---

## 4. Confusing Function Types

Remember the meaning of the function signature:

```ts
(a: number, b: number) => number
```

means:

> accepts two numbers → returns a number

While:

```ts
(value: string) => void
```

means:

> accepts a string → returns no meaningful value

And:

```ts
() => number
```

means:

> accepts nothing → returns a number

---

# Interview Questions

## Basic

1. How do you type function parameters in TypeScript?
2. How do you specify a function's return type?
3. Does every TypeScript function need an explicit return type?
4. What is a function type?
5. How do you type a callback function?
6. How do you make a function parameter optional?
7. What are rest parameters?
8. What are function overloads?
9. Why are function overloads useful?
10. What is the difference between `void` and `undefined`?
11. What is the return type of an async function?
12. Why do we use `Promise<T>`?
13. How do you type an arrow function?
14. How do you type a callback in React?
15. How do you define a reusable function type?
16. What is the difference between a function overload and a union parameter?

---

# Practical Exercises

## Exercise 1 — Add Two Numbers

Create a function that accepts two numbers and returns their sum.

```ts
function add(/* your parameters */) {
  // your code
}
```

Expected:

```ts
add(10, 20); // 30
```

---

## Exercise 2 — Optional Age

Create a function that accepts a name and an optional age.

```ts
function printUser(/* your parameters */) {
  // your code
}
```

Both should work:

```ts
printUser("Anil");

printUser("Anil", 30);
```

---

## Exercise 3 — Maximum Number

Create a function that accepts an array of numbers and returns the maximum number.

```ts
function findMax(/* your parameters */) {
  // your code
}
```

Expected:

```ts
findMax([10, 50, 20]); // 50
```

---

## Exercise 4 — Callback

Create a function that accepts a callback where:

```text
callback → accepts a string
callback → returns void
```

Example usage:

```ts
processMessage((message) => {
  console.log(message);
});
```

---

## Exercise 5 — Async User

Create an async function that returns a `User`.

```ts
interface User {
  id: number;
  name: string;
}
```

The function should have the return type:

```ts
Promise<User>
```

---

# Module 2 Summary

The most important concepts are:

```text
Parameter
↓
function add(a: number, b: number)

Return type
↓
function add(a: number, b: number): number

Optional parameter
↓
function greet(name?: string)

Rest parameter
↓
function sum(...numbers: number[])

Function type
↓
(a: number, b: number) => number

Callback
↓
callback: (value: string) => void

Async function
↓
Promise<T>

Function overload
↓
Multiple valid function signatures
```

## Key Interview Takeaway

> TypeScript allows us to define function contracts by specifying parameter types, return types, callback signatures, and overloads. Function types use the `(parameters) => returnType` syntax, and async functions return `Promise<T>`. These features provide strong type safety and are heavily used in React and Node.js applications.
