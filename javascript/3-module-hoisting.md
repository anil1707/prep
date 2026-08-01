# Module 03 - Hoisting

> ⭐ Difficulty: Intermediate\
> 🔥 Interview Importance: ⭐⭐⭐⭐⭐

------------------------------------------------------------------------

# 📖 Introduction

Hoisting is one of the most misunderstood concepts in JavaScript.

Many developers think JavaScript "moves declarations to the top" of the
file. That is **not true**.

Hoisting is actually a **side effect of the Memory Creation Phase** of
the Execution Context.

If you understand Execution Context, Hoisting becomes very easy.

------------------------------------------------------------------------

# 🎯 Learning Objectives

After completing this module, you will be able to:

-   Explain what Hoisting is.
-   Explain why Hoisting happens.
-   Differentiate between `var`, `let`, and `const`.
-   Explain the Temporal Dead Zone (TDZ).
-   Explain Function Hoisting.
-   Explain Function Expression and Arrow Function Hoisting.
-   Solve output-based interview questions.
-   Explain Hoisting from the JavaScript engine's perspective.

------------------------------------------------------------------------

# 🤔 Why Do We Need Hoisting?

Imagine JavaScript executed code without creating memory first.

``` javascript
console.log(a);
var a = 10;
```

Without memory allocation before execution, JavaScript would fail
immediately.

To solve this, JavaScript first scans the code, allocates memory for
variables and functions, and only then starts executing it.

This preprocessing step is what gives rise to **Hoisting**.

------------------------------------------------------------------------

# ✅ Definition

> **Hoisting is the behavior where JavaScript allocates memory for
> variables and function declarations before executing the code.**

JavaScript **does not move your code**.

------------------------------------------------------------------------

# ⚙️ Internal Working

    Execution Context
            │
            ▼
    Memory Creation Phase
            │
            ▼
    Execution Phase

Hoisting happens during the **Memory Creation Phase**.

------------------------------------------------------------------------

# 🧠 Memory Creation Phase

JavaScript:

-   Allocates memory for variables
-   Stores function declarations
-   Initializes `var` with `undefined`
-   Leaves `let` and `const` uninitialized (TDZ)

Example:

``` javascript
var a = 10;
let b = 20;
const c = 30;

function greet() {}
```

Memory:

    a      → undefined
    b      → <uninitialized>
    c      → <uninitialized>
    greet  → Entire Function

------------------------------------------------------------------------

# 📦 Variable Hoisting

## `var`

``` javascript
console.log(a);
var a = 10;
```

Output:

``` text
undefined
```

Reason:

    Memory:
    a → undefined

------------------------------------------------------------------------

## `let`

``` javascript
console.log(age);
let age = 25;
```

Output:

``` text
ReferenceError: Cannot access 'age' before initialization
```

------------------------------------------------------------------------

## `const`

``` javascript
console.log(PI);
const PI = 3.14;
```

Output:

``` text
ReferenceError
```

------------------------------------------------------------------------

# 🚧 Temporal Dead Zone (TDZ)

The **Temporal Dead Zone** is the period between:

-   Memory allocation
-   Variable initialization

During this period, accessing a `let` or `const` variable throws a
`ReferenceError`.

------------------------------------------------------------------------

# 📊 var vs let vs const

  Feature                              var           let   const
  ------------------------------------ ------------- ----- -------
  Hoisted                              ✅            ✅    ✅
  Initialized during Memory Creation   `undefined`   ❌    ❌
  TDZ                                  ❌            ✅    ✅
  Reassignable                         ✅            ✅    ❌
  Block Scoped                         ❌            ✅    ✅

------------------------------------------------------------------------

# Function Hoisting

Function declarations are **fully hoisted** during the Memory Creation Phase.

Unlike variables, JavaScript stores the **entire function definition** in memory before execution starts.

---

## Example

```javascript
greet();

function greet() {
    console.log("Hello World");
}
```

### Memory Creation Phase

```
Global Memory

greet → Entire Function
```

### Execution Phase

```javascript
greet();
```

Since the function already exists in memory, JavaScript executes it successfully.

Output

```text
Hello World
```

---

## Why Does It Work?

Because during Memory Creation Phase JavaScript stores:

```
greet

↓

Entire Function
```

instead of

```
greet

↓

undefined
```

---

# Real-world Example

Suppose your application starts with:

```javascript
initializeApp();

function initializeApp() {
    loadConfig();
    connectDatabase();
}
```

This works because function declarations are completely hoisted.

---

# Function Expression Hoisting

A Function Expression is **not hoisted like a function declaration**.

Example

```javascript
sayHello();

var sayHello = function () {
    console.log("Hello");
};
```

---

## Memory Creation Phase

```
sayHello → undefined
```

Notice that JavaScript hoists **only the variable**.

The function assignment happens later.

---

## Execution Phase

Line 1

```javascript
sayHello();
```

Current Memory

```
sayHello → undefined
```

JavaScript tries to execute:

```javascript
undefined();
```

Output

```text
TypeError: sayHello is not a function
```

---

Line 2

```javascript
sayHello = function() {}
```

Memory

```
sayHello → function
```

---

# Why TypeError Instead of ReferenceError?

Many people get confused here.

ReferenceError happens when the variable doesn't exist.

Here the variable **does exist**.

```
sayHello

↓

undefined
```

JavaScript is trying to execute:

```javascript
undefined();
```

Since `undefined` is not callable, it throws:

```text
TypeError
```

---

# Arrow Function Hoisting

Arrow functions behave exactly like Function Expressions.

Example

```javascript
greet();

const greet = () => {
    console.log("Hello");
};
```

Memory Creation Phase

```
greet

↓

<uninitialized>
```

The variable is inside the TDZ.

Execution

```javascript
greet();
```

Output

```text
ReferenceError:
Cannot access 'greet' before initialization
```

---

# Why?

Unlike `var`, `const` is not initialized during Memory Creation.

It remains inside the Temporal Dead Zone until execution reaches:

```javascript
const greet = () => {};
```

---

# Function Declaration vs Function Expression vs Arrow Function

| Feature | Function Declaration | Function Expression | Arrow Function |
|----------|----------------------|--------------------|----------------|
| Hoisted | ✅ Entire Function | Variable only | Variable only |
| Callable before declaration | ✅ Yes | ❌ No | ❌ No |
| Error | None | TypeError | ReferenceError (TDZ if let/const) |

---

# Class Hoisting

Classes are also hoisted.

But like `let` and `const`, they remain inside the TDZ.

Example

```javascript
const user = new Person();

class Person {}
```

Output

```text
ReferenceError:
Cannot access 'Person' before initialization
```

---

# Browser Example

```javascript
window.onload = function () {
    console.log("Loaded");
};
```

If you execute

```javascript
window.onload();
```

before assignment,

you'll get

```text
TypeError
```

because only the variable exists.

---

# React Example

❌ Bad

```javascript
App();

const App = () => {
    return <h1>Hello</h1>;
};
```

Output

```text
ReferenceError
```

---

✅ Correct

```javascript
const App = () => {
    return <h1>Hello</h1>;
};

App();
```

---

# Node.js Example

```javascript
startServer();

function startServer() {
    console.log("Server Started");
}
```

Perfectly valid because function declarations are hoisted.

---

# Common Mistakes

## ❌ Thinking JavaScript moves code

Wrong.

JavaScript allocates memory before execution.

---

## ❌ Thinking let/const are not hoisted

Wrong.

They are hoisted but remain inside the TDZ.

---

## ❌ Using var in modern applications

Prefer

```javascript
const
```

then

```javascript
let
```

Avoid

```javascript
var
```

unless working with legacy code.

---

# Best Practices

- Prefer `const` by default.
- Use `let` only when reassignment is required.
- Avoid `var`.
- Declare variables before using them.
- Prefer Function Declarations when the function should be available throughout the module.
- Prefer Arrow Functions for callbacks and React components.

---

# Interview Questions

## Basic

- What is Hoisting?
- Why does Hoisting happen?
- Difference between var and let?
- What is TDZ?

---

## Intermediate

- Difference between Function Declaration and Function Expression.
- Why does `var` print undefined?
- Why does Arrow Function throw ReferenceError?

---

## Advanced

- Explain Hoisting from the Execution Context perspective.
- Why is TDZ required?
- Are Classes hoisted?
- Why does Function Expression throw TypeError while Arrow Function throws ReferenceError?

---

# Output Questions

### Question 1

```javascript
console.log(a);

var a = 10;
```

Output

```text
undefined
```

---

### Question 2

```javascript
console.log(a);

let a = 10;
```

Output

```text
ReferenceError
```

---

### Question 3

```javascript
greet();

function greet() {
    console.log("Hello");
}
```

Output

```text
Hello
```

---

### Question 4

```javascript
greet();

var greet = function () {
    console.log("Hello");
};
```

Output

```text
TypeError
```

---

### Question 5

```javascript
greet();

const greet = () => {
    console.log("Hello");
};
```

Output

```text
ReferenceError
```

---

### Question 6 ⭐⭐⭐⭐

```javascript
var x = 10;

function test() {
    console.log(x);

    var x = 20;

    console.log(x);
}

test();

console.log(x);
```

Output

```text
undefined
20
10
```

---

# Summary

- Hoisting happens during the Memory Creation Phase.
- JavaScript never moves code.
- Function Declarations are fully hoisted.
- Function Expressions hoist only the variable.
- Arrow Functions behave like Function Expressions.
- `var` initializes to `undefined`.
- `let`, `const`, and `class` remain in the TDZ.
- Hoisting is a consequence of Execution Context.