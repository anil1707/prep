# Module 04 - Scope & Lexical Environment

> ⭐ Difficulty: Intermediate
>
> 🔥 Interview Importance: ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Scope is one of the fundamental concepts in JavaScript.

Almost every JavaScript feature depends on Scope.

Examples:

- Closures
- Hoisting
- this Keyword
- Event Loop
- Modules
- Functions

If you don't understand Scope, understanding Closures becomes very difficult.

---

# 🤔 Why Do We Need Scope?

Imagine JavaScript had no Scope.

```javascript
let username = "Anil";

function login() {
    let password = "123456";
}
```

If Scope didn't exist,

anyone could write

```javascript
console.log(password);
```

Output

```text
123456
```

This would expose sensitive data.

JavaScript solves this problem using Scope.

Scope controls

- Who can access a variable.
- Where a variable is accessible.
- How long a variable exists.

---

# ✅ Definition

> Scope determines the accessibility (visibility) of variables and functions in different parts of a JavaScript program.

In simple words,

Scope answers one question:

> **"Can this piece of code access this variable?"**

---

# ⚙️ Internal Working

When JavaScript executes code,

every Execution Context creates something called a **Lexical Environment**.

```
Execution Context
        │
        ▼
Lexical Environment
        │
        ▼
Variables
Functions
Reference to Parent Scope
```

When JavaScript needs a variable,

it first checks

```
Current Lexical Environment
```

If not found,

it checks

```
Parent Lexical Environment
```

If still not found,

it continues until the Global Scope.

---

# 🧠 Engine Working

Whenever JavaScript enters a new block or function,

it creates a new Lexical Environment.

Example

```javascript
let company = "Google";

function employee() {

    let name = "Anil";

    console.log(company);

}
```

Conceptually,

JavaScript creates

```
Global Lexical Environment

company

employee()

↓

Employee Lexical Environment

name

↓

Reference

↓

Global Lexical Environment
```

Notice

Employee Environment has a reference to its parent.

This reference is called the **Outer Lexical Environment Reference**.

---

# 💻 Syntax

Global Variable

```javascript
let company = "Google";
```

Function Scope

```javascript
function test() {

    let age = 25;

}
```

Block Scope

```javascript
if (true) {

    let city = "Varanasi";

}
```

---

# 📦 Types of Scope

JavaScript mainly has

- Global Scope
- Function Scope
- Block Scope

Let's understand each one.

---

# 🌍 Global Scope

A variable declared outside every function and block belongs to the Global Scope.

Example

```javascript
let language = "JavaScript";

function print() {

    console.log(language);

}

print();

console.log(language);
```

Output

```text
JavaScript

JavaScript
```

Reason

Global variables are accessible from everywhere.

---

## Memory Diagram

```
Global Scope

language

↓

print()

↓

Accessible Everywhere
```

---

## Real-world Example

Configuration

```javascript
const API_BASE_URL = "https://api.example.com";
```

Every module can access it.

---

# 📦 Function Scope

Variables declared inside a function can only be accessed inside that function.

Example

```javascript
function employee() {

    let salary = 50000;

    console.log(salary);

}

employee();

console.log(salary);
```

Output

```text
50000

ReferenceError
```

Why?

Because

```
salary

↓

Employee Scope
```

Outside the function,

JavaScript cannot access it.

---

## Memory Diagram

```
Global Scope

employee()

↓

Employee Scope

salary
```

Only code inside Employee Scope can access salary.

---

## Real-world Example

Authentication

```javascript
function login() {

    const token = "abc123";

    return true;

}
```

Outside

```javascript
console.log(token);
```

Output

```text
ReferenceError
```

This prevents accidental access to sensitive data.

---

# 📦 Block Scope

A Block is anything enclosed by

```
{}
```

Examples

- if
- for
- while
- switch

Variables declared using

```javascript
let
```

or

```javascript
const
```

are Block Scoped.

Example

```javascript
if (true) {

    let city = "Mumbai";

    console.log(city);

}

console.log(city);
```

Output

```text
Mumbai

ReferenceError
```

---

# Memory Diagram

```
Global

↓

If Block

↓

city
```

city dies after the block finishes.

---

# Why Was Block Scope Introduced?

Imagine

```javascript
for (var i = 0; i < 5; i++) {

}

console.log(i);
```

Output

```text
5
```

Oops.

Variable leaked outside.

ES6 introduced

```javascript
let
```

to solve this problem.

---

# 📦 var Scope (Important)

One of the biggest differences between `var` and `let` is **Scope**.

Many developers think `var` is globally scoped.

❌ That's incorrect.

`var` is **Function Scoped**, not Block Scoped.

---

## Example 1

```javascript
function test() {

    var age = 25;

    console.log(age);

}

test();

console.log(age);
```

Output

```text
25

ReferenceError
```

Why?

Because `age` belongs to the function.

```
Global Scope

↓

Function Scope

↓

age
```

---

## Example 2

```javascript
if (true) {

    var city = "Mumbai";

}

console.log(city);
```

Output

```text
Mumbai
```

Question:

Why?

Because `if` **does not create Function Scope**.

`var` ignores blocks.

Conceptually

```
Global Scope

city
```

instead of

```
If Block

↓

city
```

---

## Example 3

```javascript
for (var i = 0; i < 3; i++) {

}

console.log(i);
```

Output

```text
3
```

Because

```
for

↓

No Function Scope

↓

Global Scope
```

---

## Example 4

```javascript
for (let i = 0; i < 3; i++) {

}

console.log(i);
```

Output

```text
ReferenceError
```

Because

```
For Block

↓

i

↓

Destroyed
```

---

# 📊 var vs let Scope

| Feature | var | let |
|----------|-----|-----|
| Function Scoped | ✅ | ❌ |
| Block Scoped | ❌ | ✅ |
| Leaks outside block | ✅ | ❌ |
| Recommended | ❌ | ✅ |

---

# 🧠 Lexical Environment

Now comes one of the most important interview topics.

---

## What does "Lexical" mean?

Lexical simply means

> **Where the code is written.**

Not

> Where the function is called.

This is extremely important.

---

## Definition

A **Lexical Environment** is an internal structure created by JavaScript that stores:

- Variables
- Functions
- Reference to the Parent Lexical Environment

Every Execution Context has its own Lexical Environment.

---

## Example

```javascript
let company = "Google";

function employee() {

    let name = "Anil";

    console.log(company);

}

employee();
```

Conceptually

```
Global Lexical Environment

company

employee()

↓

Employee Lexical Environment

name

↓

Reference

↓

Global Lexical Environment
```

Notice

Employee Environment has a reference to Global.

That reference is called

```
Outer Lexical Environment Reference
```

---

# Scope Chain

Suppose JavaScript needs

```javascript
company
```

Where does it search?

Step 1

```
Employee Scope
```

Not found.

↓

Step 2

```
Global Scope
```

Found.

↓

Return value.

This searching process is called the

> **Scope Chain**

---

## Example

```javascript
let a = 10;

function one() {

    let b = 20;

    function two() {

        let c = 30;

        console.log(a);

        console.log(b);

        console.log(c);

    }

    two();

}

one();
```

---

### Searching for `a`

```
Current Scope

↓

Not Found

↓

Parent Scope

↓

Not Found

↓

Global Scope

↓

Found
```

---

### Searching for `b`

```
Current Scope

↓

Not Found

↓

Parent Scope

↓

Found
```

---

### Searching for `c`

```
Current Scope

↓

Found
```

---

Output

```text
10

20

30
```

---

# Variable Shadowing

A variable inside a child scope can have the same name as a variable in the parent scope.

The child variable **shadows** the parent variable.

---

## Example

```javascript
let city = "Delhi";

function test() {

    let city = "Mumbai";

    console.log(city);

}

test();

console.log(city);
```

Output

```text
Mumbai

Delhi
```

Why?

Inside the function,

JavaScript finds

```
city

↓

Current Scope

↓

Stop Searching
```

The Global variable is ignored.

---

# Illegal Shadowing

```javascript
let age = 25;

{

    var age = 30;

}
```

Output

```text
SyntaxError
```

Why?

Because

```
let

↓

Block Scoped

↓

Cannot be shadowed by var
```

---

# Browser Example

```javascript
const API_URL = "...";

function fetchUsers() {

    fetch(API_URL);

}
```

`fetchUsers()` accesses `API_URL` using the Scope Chain.

---

# React Example

```javascript
function App() {

    const theme = "dark";

    function Button() {

        console.log(theme);

    }

    return <Button />;

}
```

`Button` accesses `theme` through its lexical environment.

This is also the foundation of **Closures**.

---

# Node.js Example

```javascript
const db = createConnection();

function getUsers() {

    db.query(...);

}
```

`db` is found through the Scope Chain.

---

# 🌍 Real World Usage

Scope is used everywhere:

- React Components
- Event Handlers
- API Calls
- Authentication
- Closures
- Modules
- Node.js Services
- Browser APIs

Without Scope,

JavaScript applications would not be secure or maintainable.

---

# ⚠️ Common Mistakes

## ❌ Mistake 1: Thinking `var` is Block Scoped

```javascript
if (true) {
    var age = 25;
}

console.log(age);
```

Output

```text
25
```

### Why?

`var` is **Function Scoped**, not Block Scoped.

---

## ❌ Mistake 2: Thinking `let` and `const` are Function Scoped

```javascript
if (true) {
    let city = "Mumbai";
}

console.log(city);
```

Output

```text
ReferenceError
```

`let` and `const` are **Block Scoped**.

---

## ❌ Mistake 3: Confusing Scope with Execution Context

Many developers think they are the same.

**Execution Context**

- Controls code execution.
- Created when code runs.

**Scope**

- Controls variable accessibility.
- Determined by where variables are declared.

---

## ❌ Mistake 4: Thinking JavaScript Searches Everywhere

JavaScript doesn't search all variables.

It follows the **Scope Chain**.

```
Current Scope
      │
      ▼
Parent Scope
      │
      ▼
Global Scope
      │
      ▼
ReferenceError
```

---

# ✅ Best Practices

## Prefer `const`

```javascript
const API_URL = "...";
```

Use `const` unless reassignment is required.

---

## Use `let` for Reassignable Variables

```javascript
let count = 0;

count++;
```

---

## Avoid `var`

```javascript
// Avoid
var name = "Anil";
```

Reasons:

- Function Scoped
- Can leak outside blocks
- More prone to bugs

---

## Keep Scope Small

❌ Bad

```javascript
let data;

if (condition) {
    data = fetchData();
}
```

✅ Good

```javascript
if (condition) {
    const data = fetchData();
}
```

Smaller scope means cleaner and safer code.

---

## Don't Shadow Variables Unnecessarily

❌

```javascript
let name = "Anil";

function test() {
    let name = "Rahul";
}
```

While legal, excessive shadowing reduces readability.

---

# 📊 Comparison Tables

## Global Scope vs Function Scope vs Block Scope

| Feature | Global | Function | Block |
|---------|--------|----------|--------|
| Accessible Everywhere | ✅ | ❌ | ❌ |
| Created By | Global Code | Function | `{}` |
| Lifetime | Entire Program | Until Function Ends | Until Block Ends |

---

## `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|---------|------|------|---------|
| Scope | Function | Block | Block |
| Reassignable | ✅ | ✅ | ❌ |
| Redeclarable | ✅ | ❌ | ❌ |
| Hoisted | ✅ | ✅ | ✅ |
| TDZ | ❌ | ✅ | ✅ |
| Recommended | ❌ | ✅ | ✅ |

---

## Scope vs Lexical Environment

| Scope | Lexical Environment |
|--------|---------------------|
| Rules for variable access | Internal engine structure |
| Visible to developers | Internal JavaScript concept |
| Determines accessibility | Stores variables + parent reference |

---

# 🎯 Interview Questions

## 🟢 Basic

### What is Scope?

### What are the different types of Scope?

### Difference between Global Scope and Function Scope?

### Difference between `var`, `let`, and `const`?

### What is Block Scope?

---

## 🟡 Intermediate

### What is the Lexical Environment?

### Explain the Scope Chain.

### What is Variable Shadowing?

### What is Illegal Shadowing?

### Why does `var` ignore blocks?

---

## 🔴 Advanced

### Difference between Scope and Execution Context.

### Difference between Scope and Lexical Environment.

### Explain Scope Chain with an Execution Context.

### How do Closures use the Lexical Environment?

### Why are React Hooks based on Lexical Scope?

---

# 🧩 Output-Based Questions

## Question 1

```javascript
let a = 10;

function test() {
    console.log(a);
}

test();
```

Output

```text
10
```

---

## Question 2

```javascript
function test() {
    let a = 20;
}

console.log(a);
```

Output

```text
ReferenceError
```

---

## Question 3

```javascript
if (true) {
    var age = 25;
}

console.log(age);
```

Output

```text
25
```

---

## Question 4

```javascript
if (true) {
    let age = 25;
}

console.log(age);
```

Output

```text
ReferenceError
```

---

## Question 5

```javascript
let city = "Delhi";

function test() {
    let city = "Mumbai";
    console.log(city);
}

test();

console.log(city);
```

Output

```text
Mumbai
Delhi
```

---

## Question 6

```javascript
let a = 1;

function one() {

    let b = 2;

    function two() {

        let c = 3;

        console.log(a, b, c);

    }

    two();
}

one();
```

Output

```text
1 2 3
```

---

## Question 7

```javascript
let x = 10;

function test() {

    console.log(x);

    let x = 20;

}

test();
```

Output

```text
ReferenceError
```

Reason:

`x` exists in the current scope but is inside the TDZ, so JavaScript doesn't continue searching the parent scope.

---

## Question 8

```javascript
var x = 10;

function test() {

    console.log(x);

    var x = 20;

}

test();
```

Output

```text
undefined
```

Reason:

`var x` is hoisted and initialized to `undefined` within the function.

---

## Question 9

```javascript
const language = "JavaScript";

function one() {

    function two() {
        console.log(language);
    }

    two();
}

one();
```

Output

```text
JavaScript
```

---

## Question 10 ⭐⭐⭐⭐⭐

```javascript
let a = 10;

function outer() {

    let a = 20;

    function inner() {

        console.log(a);

    }

    inner();
}

outer();
```

Output

```text
20
```

Reason:

`inner()` uses the **lexical environment** where it was **defined**, not where it is called.

---

# 📝 Summary

- Scope controls where variables can be accessed.
- JavaScript provides:
  - Global Scope
  - Function Scope
  - Block Scope
- `var` is Function Scoped.
- `let` and `const` are Block Scoped.
- Every Execution Context creates a Lexical Environment.
- JavaScript searches variables using the Scope Chain.
- Variable Shadowing allows inner variables to hide outer variables.
- Scope is the foundation of Closures.

---

# 🔗 Related Topics

- Module 02 – Execution Context
- Module 03 – Hoisting
- Module 05 – Closures ⭐ (Next Module)
- Module 06 – `this` Keyword
