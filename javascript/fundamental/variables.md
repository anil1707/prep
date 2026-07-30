# 📦 Variables in JavaScript (`var`, `let`, `const`)

## 📖 Introduction

A **variable** is a named container used to store data in memory. Variables allow us to store, retrieve, and manipulate values throughout a program.

JavaScript provides three ways to declare variables:

- `var`
- `let`
- `const`

Although all three are used to declare variables, they differ in terms of:

- Scope
- Hoisting
- Re-declaration
- Re-assignment
- Initialization
- Temporal Dead Zone (TDZ)

---

# 🤔 Why Do We Need Variables?

Variables help us:

- Store data
- Reuse values
- Update application state
- Pass values between functions
- Improve readability and maintainability

### Example

```javascript
const username = "Anil";

console.log(`Welcome ${username}`);
```

Without variables:

```javascript
console.log("Welcome Anil");
console.log("Anil has logged in.");
console.log("Anil purchased a product.");
```

Using variables avoids repetition and makes updates easier.

---

# ⚙️ Internal Working

When JavaScript executes a program, the engine allocates memory for variables.

Conceptually:

```text
Memory
─────────────────────
name  → "Anil"
age   → 27
isAdmin → false
```

Each variable stores:

- Identifier (variable name)
- Value
- Scope
- Memory reference

> **Note**
>
> We'll study how memory is created during the **Execution Context** module.

---

# 📌 Variable Declaration

```javascript
var name = "John";

let age = 25;

const country = "India";
```

---

# 1️⃣ var

## Definition

`var` is the oldest way of declaring variables in JavaScript (introduced in ES1).

### Characteristics

- Function Scoped
- Can be Re-declared
- Can be Re-assigned
- Hoisted
- Initialized with `undefined`

### Example

```javascript
var name = "Anil";

name = "Rahul";

var name = "Amit";

console.log(name);
```

**Output**

```text
Amit
```

### Scope Example

```javascript
if (true) {
    var city = "Delhi";
}

console.log(city);
```

**Output**

```text
Delhi
```

Since `var` is **function-scoped**, it ignores block scope.

---

# 2️⃣ let

## Definition

`let` was introduced in ES6 (ECMAScript 2015) to solve many problems associated with `var`.

### Characteristics

- Block Scoped
- Cannot be Re-declared in the same scope
- Can be Re-assigned
- Hoisted
- Temporal Dead Zone (TDZ)

### Example

```javascript
let age = 25;

age = 30;

console.log(age);
```

**Output**

```text
30
```

### Invalid Example

```javascript
let age = 25;
let age = 30;
```

**Output**

```text
SyntaxError
```

### Block Scope Example

```javascript
if (true) {
    let city = "Delhi";
}

console.log(city);
```

**Output**

```text
ReferenceError
```

---

# 3️⃣ const

## Definition

`const` declares a constant binding whose reference cannot be reassigned.

### Characteristics

- Block Scoped
- Cannot be Re-declared
- Cannot be Re-assigned
- Must be Initialized
- Supports Object Mutation

### Example

```javascript
const PI = 3.14;

console.log(PI);
```

### Invalid Example

```javascript
const PI;
```

**Output**

```text
SyntaxError: Missing initializer in const declaration
```

---

# 🔥 const with Objects

Many developers think `const` makes an object immutable.

It does **not**.

### Example

```javascript
const user = {
    name: "Anil"
};

user.name = "Rahul";

console.log(user.name);
```

**Output**

```text
Rahul
```

### Invalid Example

```javascript
const user = {};

user = {};
```

**Output**

```text
TypeError: Assignment to constant variable.
```

> `const` protects the **binding**, not the object itself.

---

# 🌍 Scope

## Global Scope

```javascript
let name = "Anil";

function greet() {
    console.log(name);
}
```

---

## Function Scope

```javascript
function test() {
    var x = 10;
}

console.log(x);
```

**Output**

```text
ReferenceError
```

---

## Block Scope

```javascript
{
    let x = 10;
    const y = 20;
}

console.log(x);
console.log(y);
```

**Output**

```text
ReferenceError
ReferenceError
```

---

# 📊 var vs let inside Block

```javascript
{
    var a = 10;
    let b = 20;
}

console.log(a);
console.log(b);
```

**Output**

```text
10
ReferenceError
```

---

# 🔄 Re-declaration & Re-assignment

| Keyword | Re-declare | Re-assign |
|----------|------------|-----------|
| `var` | ✅ | ✅ |
| `let` | ❌ | ✅ |
| `const` | ❌ | ❌ |

---

# 📈 Comparison Table

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisted | ✅ | ✅ | ✅ |
| Initialized During Hoisting | `undefined` | ❌ | ❌ |
| TDZ | ❌ | ✅ | ✅ |
| Re-declare | ✅ | ❌ | ❌ |
| Re-assign | ✅ | ✅ | ❌ |
| Must Initialize | ❌ | ❌ | ✅ |

---

# 💻 Output Based Questions

## Question 1

```javascript
var x = 10;

{
    var x = 20;
}

console.log(x);
```

**Output**

```text
20
```

---

## Question 2

```javascript
let x = 10;

{
    let x = 20;
}

console.log(x);
```

**Output**

```text
10
```

---

## Question 3

```javascript
const obj = {
    name: "Anil"
};

obj.name = "Rahul";

console.log(obj.name);
```

**Output**

```text
Rahul
```

---

## Question 4

```javascript
const x = 10;

x = 20;
```

**Output**

```text
TypeError
```

---

## Question 5

```javascript
var a = 10;

function test() {
    var a = 20;

    console.log(a);
}

test();

console.log(a);
```

**Output**

```text
20
10
```

---

# 🎯 Frequently Asked Interview Questions

## 1. Difference between `var`, `let`, and `const`?

Discuss:

- Scope
- Hoisting
- TDZ
- Re-declaration
- Re-assignment
- Initialization

---

## 2. Why was `let` introduced?

To solve problems with:

- Function scope of `var`
- Variable re-declaration
- Bugs caused by hoisting

---

## 3. Is `const` immutable?

No.

`const` only prevents reassignment of the variable binding.

Objects and arrays declared with `const` can still be mutated.

---

## 4. Are `let` and `const` hoisted?

Yes.

They are hoisted but remain inside the **Temporal Dead Zone (TDZ)** until initialization.

---

## 5. Which keyword should you use?

- ✅ Use `const` by default.
- ✅ Use `let` when reassignment is required.
- ❌ Avoid `var` in modern JavaScript unless maintaining legacy code.

---

# ⚠️ Common Mistakes

### ❌ Thinking `const` makes objects immutable

```javascript
const obj = {
    name: "Anil"
};

obj.name = "Rahul"; // Valid
```

---

### ❌ Using `var` inside loops

```javascript
for (var i = 0; i < 3; i++) {}
```

This often causes unexpected behavior because `var` is function-scoped.

---

### ❌ Re-declaring `let`

```javascript
let age = 20;
let age = 30;
```

Results in a `SyntaxError`.

---

### ❌ Forgetting to initialize `const`

```javascript
const PI;
```

Results in a `SyntaxError`.

---

# 💡 Best Practices

- Prefer `const` by default.
- Use `let` only when reassignment is needed.
- Avoid `var` in new code.
- Keep variable scope as small as possible.
- Use meaningful variable names.

---

# 📝 Summary

| Keyword | Scope | Re-declare | Re-assign | Recommended |
|----------|-------|------------|------------|-------------|
| `var` | Function | ✅ | ✅ | ❌ |
| `let` | Block | ❌ | ✅ | ✅ |
| `const` | Block | ❌ | ❌ | ✅ |
