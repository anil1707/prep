# 🚨 Errors in JavaScript

## 📖 Introduction

An **error** is an unexpected condition that prevents a JavaScript program from executing as expected.

Errors can occur:

- **Before execution (Compile Time)**
- **During execution (Runtime)**

---

# 📌 Types of JavaScript Errors

```text
JavaScript Errors
│
├── Syntax Errors (Compile Time)
│
└── Runtime Errors
      │
      ├── ReferenceError
      ├── TypeError
      ├── RangeError
      ├── URIError
      ├── EvalError
      ├── AggregateError
      └── Custom Errors
```

---

# 1️⃣ SyntaxError

## Definition

A **SyntaxError** occurs when the JavaScript parser encounters invalid JavaScript syntax.

Since the parser detects it before execution begins, the program never starts running.

### Example

```javascript
let = x 10;
```

**Output**

```text
SyntaxError: Unexpected token '='
```

Another example:

```javascript
if ( {
    console.log("Hello");
}
```

### Key Points

- ✅ Occurs during parsing.
- ✅ Execution never starts.
- ✅ Cannot be caught using `try...catch` if the script itself contains invalid syntax.

---

# 2️⃣ ReferenceError

## Definition

A **ReferenceError** occurs when JavaScript tries to access a variable that doesn't exist or isn't accessible in the current scope.

### Example

```javascript
console.log(age);
```

**Output**

```text
ReferenceError: age is not defined
```

### Another Example

```javascript
function test() {
    let x = 10;
}

console.log(x);
```

### Temporal Dead Zone (TDZ)

```javascript
console.log(a);

let a = 10;
```

**Output**

```text
ReferenceError:
Cannot access 'a' before initialization
```

> **Note**
>
> We'll understand this in detail while studying **Hoisting** and the **Temporal Dead Zone (TDZ)**.

### Common Causes

- Accessing undeclared variables.
- Accessing variables outside their scope.
- Accessing `let` or `const` variables before initialization.

---

# 3️⃣ TypeError

## Definition

A **TypeError** occurs when an operation is performed on a value of an inappropriate type.

### Example 1

```javascript
let user = null;

console.log(user.name);
```

**Output**

```text
TypeError:
Cannot read properties of null
```

### Example 2

```javascript
const x = 10;

x();
```

**Output**

```text
TypeError:
x is not a function
```

### Example 3

```javascript
undefined.toString();
```

### Common Causes

- Calling a non-function.
- Accessing properties of `null` or `undefined`.
- Using unsupported methods.

---

# 4️⃣ RangeError

## Definition

A **RangeError** occurs when a value is outside the allowed range.

### Example 1

```javascript
new Array(-1);
```

**Output**

```text
RangeError:
Invalid array length
```

### Example 2

```javascript
function test() {
    test();
}

test();
```

**Output**

```text
RangeError:
Maximum call stack size exceeded
```

### Common Causes

- Invalid array length.
- Infinite recursion.
- Invalid numeric values passed to built-in APIs.

---

# 5️⃣ URIError

## Definition

A **URIError** occurs when URI encoding or decoding functions receive malformed input.

### Example

```javascript
decodeURIComponent("%");
```

**Output**

```text
URIError:
URI malformed
```

### URI Functions

- `encodeURI()`
- `decodeURI()`
- `encodeURIComponent()`
- `decodeURIComponent()`

---

# 6️⃣ EvalError

## Definition

`EvalError` is a legacy error type associated with the `eval()` function.

Modern JavaScript engines rarely throw this error directly.

> **Interview Tip**
>
> Know that it exists, but don't expect to see it in modern applications.

---

# 7️⃣ AggregateError

## Definition

An **AggregateError** represents multiple errors grouped into a single error object.

Most commonly used with **`Promise.any()`**.

### Example

```javascript
Promise.any([
    Promise.reject("Error A"),
    Promise.reject("Error B")
]);
```

**Output**

```text
AggregateError
```

---

# 🌳 Error Hierarchy

All JavaScript errors inherit from the `Error` object.

```text
Error
│
├── SyntaxError
├── ReferenceError
├── TypeError
├── RangeError
├── URIError
├── EvalError
└── AggregateError
```

---

# 🛠 Creating Custom Errors

```javascript
throw new Error("Something went wrong");
```

### Example

```javascript
function validateAge(age) {
    if (age < 18) {
        throw new Error("Age must be at least 18.");
    }

    return "Eligible";
}
```

---

# 🔥 throw Statement

The `throw` statement is used to explicitly raise an exception.

```javascript
throw new Error("Network Error");
```

---

# 🧩 try...catch

Used to handle runtime errors gracefully.

```javascript
try {
    let user = null;

    console.log(user.name);
} catch (error) {
    console.log(error.message);
}
```

---

# 🏁 finally

The `finally` block always executes whether an error occurs or not.

```javascript
try {
    console.log("Try");
} finally {
    console.log("Finally");
}
```

**Output**

```text
Try
Finally
```

### finally with return

```javascript
function test() {
    try {
        return 10;
    } finally {
        console.log("Finally");
    }
}

console.log(test());
```

**Output**

```text
Finally
10
```

---

# 📦 Error Object Properties

```javascript
try {
    throw new Error("Invalid Input");
} catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
}
```

| Property | Description |
|----------|-------------|
| `name` | Error type |
| `message` | Error message |
| `stack` | Stack trace |

---

# 📊 Common Errors Comparison

| Error | Cause | Example |
|--------|-------|---------|
| SyntaxError | Invalid syntax | `let = x 10;` |
| ReferenceError | Variable not found | `console.log(a)` |
| TypeError | Invalid operation | `null.name` |
| RangeError | Invalid range | `new Array(-1)` |
| URIError | Invalid URI | `decodeURIComponent("%")` |
| AggregateError | Multiple promise failures | `Promise.any()` |
| EvalError | Legacy `eval()` | Rare today |

---

# ⚖️ SyntaxError vs ReferenceError vs TypeError

| Feature | SyntaxError | ReferenceError | TypeError |
|----------|-------------|----------------|------------|
| Occurs | Parsing | Runtime | Runtime |
| Execution Starts | ❌ No | ✅ Yes | ✅ Yes |
| Cause | Invalid syntax | Variable missing | Invalid operation |

---

# 🎯 Frequently Asked Interview Questions

## 1. Can `try...catch` catch every JavaScript error?

**No.**

It catches **runtime errors** but **cannot catch syntax errors** already present in the script because parsing fails before execution begins.

---

## 2. Difference between `throw` and `return`?

| throw | return |
|--------|---------|
| Throws an exception | Returns a value |
| Stops execution | Continues normal flow |
| Handled by `catch` | Handled by the caller |

---

## 3. Can we create custom errors?

Yes.

```javascript
throw new Error("Custom Error");
```

You can also extend the built-in `Error` class to create custom error types.

---

## 4. Does `finally` execute after `return`?

**Yes.**

The `finally` block executes before the function actually returns.

---

# 📝 Summary

| Error Type | When It Occurs | Example |
|------------|----------------|---------|
| SyntaxError | Parsing | `let = x 10;` |
| ReferenceError | Runtime | `console.log(a)` |
| TypeError | Runtime | `null.name` |
| RangeError | Runtime | `new Array(-1)` |
| URIError | Runtime | `decodeURIComponent("%")` |
| AggregateError | Runtime | `Promise.any()` |
| EvalError | Runtime | Rarely used |

---

# ✅ Key Takeaways

- **SyntaxError** → Invalid JavaScript syntax.
- **ReferenceError** → Variable not found or inaccessible.
- **TypeError** → Invalid operation on a value.
- **RangeError** → Value outside the allowed range.
- **URIError** → Invalid URI encoding/decoding.
- **AggregateError** → Multiple errors grouped together.
- Use **`try...catch...finally`** for runtime error handling.
- Use **`throw`** to create custom exceptions.
- All JavaScript errors inherit from the **`Error`** object.