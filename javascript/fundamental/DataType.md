# Data Types in JavaScript

## 📖 Introduction

A **data type** defines the kind of value stored in a variable. It tells the JavaScript engine how to interpret a value and what operations can be performed on it.

Example:

```javascript
let name = "Anil";      // String
let age = 27;           // Number
let isLoggedIn = true;  // Boolean
```

---

## 🤔 Why Do We Need Data Types?

Data types help JavaScript understand how a value should behave.

Example:

```javascript
10 + 20;
```

Output:

```text
30
```

```javascript
"10" + "20";
```

Output:

```text
1020
```

Although the operator is the same (`+`), the result is different because the operands have different data types.

---

## ⚙️ Dynamic Typing

JavaScript is a **dynamically typed language**, which means **variables don't have fixed types; values do**.

```javascript
let value = 10;

value = "Hello";

value = true;
```

All of the above assignments are valid because the variable can hold values of different data types during its lifetime.

---

## 📦 Types of Data

JavaScript has **8 built-in data types**, grouped into two categories.

### 1. Primitive Data Types (7)

Primitive values are simple and immutable.

| Data Type | Example |
|-----------|---------|
| String | `"Hello"` |
| Number | `10`, `3.14` |
| Boolean | `true`, `false` |
| Undefined | `undefined` |
| Null | `null` |
| Symbol | `Symbol("id")` |
| BigInt | `123456789n` |

### 2. Non-Primitive (Reference) Data Types

Everything that is not primitive is an object.

Examples:

```javascript
const user = { name: "Anil" };

const numbers = [1, 2, 3];

function greet() {}

new Date();

new Map();

new Set();
```

Common reference types include:

- Object
- Array
- Function
- Date
- Map
- Set
- WeakMap
- WeakSet
- RegExp

---

## 🔍 typeof Operator

The `typeof` operator returns the type of a value.

| Expression | Output |
|------------|--------|
| `typeof "Hello"` | `"string"` |
| `typeof 10` | `"number"` |
| `typeof true` | `"boolean"` |
| `typeof undefined` | `"undefined"` |
| `typeof Symbol()` | `"symbol"` |
| `typeof 10n` | `"bigint"` |
| `typeof {}` | `"object"` |
| `typeof []` | `"object"` |
| `typeof function(){}` | `"function"` |
| `typeof null` | `"object"` *(historical bug)* |

> **Note:** `typeof null` returning `"object"` is a well-known historical bug retained for backward compatibility.

---

## 📊 Primitive vs Non-Primitive

| Primitive | Non-Primitive |
|------------|---------------|
| Stores a single value | Stores collections or complex data |
| Immutable | Usually mutable |
| Compared by value | Compared by reference |
| 7 built-in types | Objects and object-based structures |

---

## 🎯 Interview Questions

### Q1. How many data types are there in JavaScript?

JavaScript has **8 built-in data types**:

- 7 Primitive types
- Reference types (Objects)

### Q2. Is an array a primitive type?

No. Arrays are objects.

### Q3. Is a function an object?

Yes. Functions are special callable objects.

### Q4. What does `typeof null` return?

It returns `"object"` due to a historical bug in JavaScript.

---

## ⚠️ Common Mistakes

```javascript
typeof null;
```

Output:

```text
"object"
```

Many developers expect `"null"`, but the actual result is `"object"`.

---

## 📝 Summary

- A data type defines the kind of value stored in a variable.
- JavaScript is dynamically typed.
- JavaScript has **8 built-in data types**.
- There are **7 primitive types** and **reference types** (objects).
- Use `typeof` to determine the type of most values.
- Arrays and functions are objects, although `typeof function(){}` returns `"function"`.

---

# Type Coercion in JavaScript

## 📖 Introduction

**Type coercion** is the process of converting one data type into another.

The conversion may happen automatically by JavaScript or manually by the developer.

---

## 🤔 Why Do We Need Type Coercion?

JavaScript is a **weakly typed language**, so it automatically converts values when required.

Example:

```javascript
"10" + 5;
```

Output:

```text
105
```

Here, JavaScript converts `5` into `"5"` and performs string concatenation.

---

## ⚙️ Types of Type Coercion

### 1. Implicit Type Coercion

JavaScript automatically converts values.

Examples:

```javascript
"5" + 2; // "52"

"5" - 2; // 3

"6" * "2"; // 12

"20" / "4"; // 5
```

---

### 2. Explicit Type Conversion

The developer manually converts the value.

```javascript
Number("123"); // 123

String(123); // "123"

Boolean(1); // true

Boolean(0); // false
```

---

## 📌 Rules of Implicit Type Coercion

### `+` Operator

If either operand is a string, the other operand is converted to a string.

```javascript
10 + "20"; // "1020"
```

### `-`, `*`, `/`, `%` Operators

These operators convert operands to numbers.

```javascript
"10" - "5"; // 5

"10" * "2"; // 20

"10" / "2"; // 5
```

---

## 💻 Common Examples

```javascript
true + 1;          // 2

false + 10;        // 10

null + 1;          // 1

undefined + 1;     // NaN

"5" + true;        // "5true"

"5" - true;        // 4
```

---

## 📊 Common Conversion Table

| Value | Number | Boolean | String |
|-------|--------|----------|---------|
| `"123"` | 123 | true | `"123"` |
| `""` | 0 | false | `""` |
| `true` | 1 | true | `"true"` |
| `false` | 0 | false | `"false"` |
| `null` | 0 | false | `"null"` |
| `undefined` | NaN | false | `"undefined"` |

---

## 🎯 Interview Questions

### Q1. What is type coercion?

Type coercion is the automatic or explicit conversion of one data type into another.

### Q2. Why is JavaScript called weakly typed?

Because it automatically converts values between data types when needed.

### Q3. What is the difference between implicit and explicit type coercion?

| Implicit | Explicit |
|----------|----------|
| Automatic conversion | Manual conversion |
| Performed by JavaScript | Performed by the developer |

### Q4. Why does `"5" + 2` return `"52"` but `"5" - 2` returns `3`?

- `+` performs string concatenation if either operand is a string.
- `-` is a numeric operator, so both operands are converted to numbers.

---

## ⚠️ Common Mistakes

```javascript
"5" + 2; // "52"

"5" - 2; // 3
```

Many developers assume both expressions should produce the same result, but different operators follow different coercion rules.

---

## 📝 Summary

- Type coercion is the conversion of one data type into another.
- JavaScript performs **implicit** coercion automatically.
- Developers can perform **explicit** conversion using functions like `Number()`, `String()`, and `Boolean()`.
- The `+` operator performs string concatenation when one operand is a string.
- Other arithmetic operators convert operands to numbers before performing the operation.
