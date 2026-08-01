# Module 2 - Execution Context

> ⭐ Difficulty: Intermediate
>
> 🔥 Interview Importance: ⭐⭐⭐⭐⭐
>
> **Prerequisites:**
>
> - Variables
> - Functions
> - Scope (Basic)
> - JavaScript Engine (Basic)

---

# 📖 Introduction

Execution Context is one of the most important concepts in JavaScript.

Almost every advanced JavaScript concept depends on it:

- Hoisting
- Closures
- Scope
- `this`
- Event Loop
- Async JavaScript

Without understanding Execution Context, these topics often feel confusing.

---

# 🤔 Why Do We Need Execution Context?

Imagine you write:

```javascript
let a = 10;
let b = 20;

console.log(a + b);
```

When you click **Run**, JavaScript has to answer several questions:

- Where should `a` be stored?
- Where should `b` be stored?
- Which line should execute first?
- How are functions tracked?
- What should `this` refer to?

To manage all this information, JavaScript creates an **Execution Context**.

---

# ✅ Definition

> **Execution Context is the environment created by the JavaScript engine to execute JavaScript code.**

Think of it as a **workspace** created by the JavaScript engine before running your code.

---

# 🎯 Why Is It Important?

Execution Context explains:

- Why hoisting happens
- Why functions can be called before declaration
- How variables are stored
- How function calls work
- Why recursion works
- Why Stack Overflow occurs

---

# ⚙️ JavaScript Engine (Quick Revision)

Before execution begins, the JavaScript Engine performs several steps.

```
Source Code
      │
      ▼
Parser
      │
      ▼
Abstract Syntax Tree (AST)
      │
      ▼
Execution Context Created
      │
      ▼
Memory Creation Phase
      │
      ▼
Execution Phase
```

The Parser checks syntax and creates an AST.

The engine then creates an Execution Context before executing the code.

---

# 🧠 What Does an Execution Context Contain?

Every Execution Context contains three important components.

```
Execution Context
│
├── Variable Environment (Memory)
├── Code Execution Information
└── this Binding
```

---

## 1. Variable Environment

Stores:

- Variables
- Function Declarations
- Function Parameters

Example

```javascript
let a = 10;

const b = 20;

function greet() {}
```

Memory Conceptually

```
Variable Environment

a → ?

b → ?

greet → function
```

---

## 2. Code Execution Information

Keeps track of:

- Current executing line
- Next line
- Function calls

Example

```javascript
let a = 10;

let b = 20;

console.log(a + b);
```

Execution Order

```
Line 1
↓

Line 2
↓

Line 3
```

---

## 3. `this` Binding

Every Execution Context has its own value of `this`.

Example

```javascript
const user = {

    name: "Anil",

    greet() {
        console.log(this.name);
    }

};

user.greet();
```

Inside `greet()`, `this` refers to `user`.

> We'll study `this` in detail in Module 6.

---

# 📦 Types of Execution Context

JavaScript mainly creates two types of Execution Contexts.

```
Execution Context
│
├── Global Execution Context
└── Function Execution Context
```

---

# 🌍 Global Execution Context (GEC)

The Global Execution Context is created **once** when the JavaScript program starts.

Example

```javascript
let a = 10;

function greet() {}

console.log(a);
```

Memory

```
Global Execution Context

a → undefined

greet → function
```

Characteristics

- Created once
- Exists until the program finishes
- Contains global variables and functions

---

# 🔄 Function Execution Context (FEC)

A Function Execution Context is created every time a function is invoked.

Example

```javascript
function greet() {
    console.log("Hello");
}

greet();
greet();
```

Execution

```
Global Execution Context

↓

Function Execution Context

↓

Destroyed

↓

Function Execution Context

↓

Destroyed
```

Every function call gets a **new** Execution Context.

---

# 🔄 Life Cycle of an Execution Context

Every Execution Context goes through two phases.

```
Execution Context Created
          │
          ▼
Memory Creation Phase
          │
          ▼
Execution Phase
```

These two phases explain many JavaScript behaviors such as hoisting.

---

# 🧠 Phase 1 - Memory Creation Phase

Before executing any code, JavaScript allocates memory.

During this phase:

- Memory is allocated for variables.
- Function declarations are stored completely.
- `var` variables are initialized with `undefined`.
- `let` and `const` remain uninitialized (TDZ).

Example

```javascript
console.log(a);

var a = 10;
```

Memory

```
a → undefined
```

No code has executed yet.

---

Another example

```javascript
function greet() {
    console.log("Hello");
}
```

Memory

```
greet → Entire Function
```

The complete function is available before execution begins.

---

# ⚡ Phase 2 - Execution Phase

After memory allocation, JavaScript starts executing code line by line.

Example

```javascript
let a = 10;

let b = 20;

console.log(a + b);
```

Execution

```
Line 1

↓

a = 10

↓

Line 2

↓

b = 20

↓

Line 3

↓

30
```

Variables receive actual values during this phase.

Functions are invoked during this phase.

---

# 💻 Example

```javascript
console.log(a);

var a = 10;

console.log(a);
```

## Memory Creation

```
a → undefined
```

## Execution

Line 1

```javascript
console.log(a);
```

Output

```text
undefined
```

---

Line 2

```javascript
var a = 10;
```

Memory

```
a → 10
```

---

Line 3

```javascript
console.log(a);
```

Output

```text
10
```

---

# 📚 Call Stack

## 🤔 Why Do We Need a Call Stack?

JavaScript is **single-threaded**, meaning it can execute only **one task at a time**.

When multiple functions are called, JavaScript needs a mechanism to remember:

- Which function is currently executing.
- Which function called it.
- Where to return after the function finishes.

This mechanism is called the **Call Stack**.

---

## ✅ Definition

> The **Call Stack** is a LIFO (Last In, First Out) data structure used by the JavaScript engine to manage the execution of function calls.

Think of it like a stack of plates.

```
        _________
       | third() |
       |---------|
       | second()|
       |---------|
       | first() |
       |---------|
       | Global  |
       |_________|
```

The last function added is executed first.

---

## Example

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Hello");
}

one();
```

---

### Step 1

Program starts.

```
Call Stack

┌──────────────┐
│ Global       │
└──────────────┘
```

---

### Step 2

`one()` is called.

```
┌──────────────┐
│ one()        │
├──────────────┤
│ Global       │
└──────────────┘
```

---

### Step 3

`two()` is called.

```
┌──────────────┐
│ two()        │
├──────────────┤
│ one()        │
├──────────────┤
│ Global       │
└──────────────┘
```

---

### Step 4

`three()` is called.

```
┌──────────────┐
│ three()      │
├──────────────┤
│ two()        │
├──────────────┤
│ one()        │
├──────────────┤
│ Global       │
└──────────────┘
```

---

### Step 5

`three()` finishes.

```
┌──────────────┐
│ two()        │
├──────────────┤
│ one()        │
├──────────────┤
│ Global       │
└──────────────┘
```

---

### Step 6

`two()` finishes.

```
┌──────────────┐
│ one()        │
├──────────────┤
│ Global       │
└──────────────┘
```

---

### Step 7

`one()` finishes.

```
┌──────────────┐
│ Global       │
└──────────────┘
```

Program ends.

---

# 🧠 Complete Dry Run

Let's trace an example step by step.

```javascript
var x = 10;

function greet() {

    var y = 20;

    console.log(x);

    console.log(y);

}

greet();

console.log(x);
```

---

## Step 1 – Global Execution Context Created

Memory Creation Phase

```
Global Memory

x → undefined

greet → function
```

---

## Step 2 – Execution Phase

```javascript
var x = 10;
```

Memory

```
x → 10
```

---

Next line

```javascript
greet();
```

A new Function Execution Context is created.

---

## Function Memory Creation

```
Function Memory

y → undefined
```

---

## Function Execution

```javascript
var y = 20;
```

Memory

```
y → 20
```

---

```javascript
console.log(x);
```

JavaScript searches:

```
Function Scope

↓

Not Found

↓

Global Scope

↓

Found

x = 10
```

Output

```text
10
```

---

Next

```javascript
console.log(y);
```

Output

```text
20
```

---

Function completes.

Function Execution Context is removed from the Call Stack.

---

Back to Global

```javascript
console.log(x);
```

Output

```text
10
```

---

Final Output

```text
10
20
10
```

---

# 🌍 Real World Usage

Execution Context is used every time JavaScript executes code.

Examples include:

### React Components

```javascript
function Home() {
    return <h1>Hello</h1>;
}
```

Every render creates a new Function Execution Context.

---

### Event Handlers

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});
```

Each click creates a new Function Execution Context.

---

### API Calls

```javascript
fetchUsers()
```

The callback executes in its own Function Execution Context.

---

### Recursive Functions

```javascript
function factorial(n) {
    if (n === 1) return 1;

    return n * factorial(n - 1);
}
```

Each recursive call creates a new Function Execution Context.

---

### Browser Stack Trace

When an error occurs:

```
TypeError

at calculate()

at checkout()

at App()
```

This stack trace is a representation of the Call Stack.

---

# ⚠️ Common Mistakes

## ❌ Mistake 1

Thinking JavaScript executes code immediately.

Reality:

```
Execution Context

↓

Memory Creation

↓

Execution
```

Memory is always created first.

---

## ❌ Mistake 2

Thinking Hoisting is a separate feature.

Reality:

Hoisting happens because of the Memory Creation Phase.

---

## ❌ Mistake 3

Thinking Function Execution Context stays forever.

Reality:

It is destroyed when the function completes.

---

## ❌ Mistake 4

Confusing Execution Context with Scope.

Execution Context

- Controls execution.

Scope

- Controls variable accessibility.

---

# 📊 Comparison

| Execution Context | Scope |
|-------------------|-------|
| Created when code executes | Created where variables are declared |
| Temporary | Determined by code structure |
| Controls execution | Controls accessibility |
| Contains Memory + `this` + execution state | Defines visibility of variables |

---

# 🎯 Interview Questions

## 🟢 Basic

### What is Execution Context?

### What are the phases of an Execution Context?

### What is Global Execution Context?

### What is Function Execution Context?

### What is the Call Stack?

---

## 🟡 Intermediate

### Explain Memory Creation Phase.

### Explain Execution Phase.

### Why does Hoisting happen?

### What happens when a function is called?

### Explain Call Stack using an example.

---

## 🔴 Advanced

### Difference between Execution Context and Lexical Environment.

### Difference between Execution Context and Scope.

### Why does recursion work?

### What causes "Maximum Call Stack Size Exceeded"?

### Why is JavaScript called single-threaded?

### How does the Event Loop interact with the Call Stack?

---

# 📝 Summary

- JavaScript creates an Execution Context before executing code.
- Every Execution Context has:
  - Variable Environment
  - Code Execution Information
  - `this` Binding
- There are two main types:
  - Global Execution Context
  - Function Execution Context
- Every Execution Context has two phases:
  - Memory Creation Phase
  - Execution Phase
- JavaScript uses a Call Stack to manage function execution.
- Function Execution Contexts are destroyed after the function returns.
- Understanding Execution Context is essential for learning Hoisting, Scope, Closures, `this`, and Async JavaScript.


