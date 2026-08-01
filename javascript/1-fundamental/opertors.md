# Operators in JavaScript

## 📖 Introduction

Operators are special symbols or keywords that perform operations on one or more operands (values or variables) and return a result.

For example:

```javascript
let sum = 10 + 20;
```

Here:

- `10` and `20` are **operands**
- `+` is an **operator**

The result is:

```javascript
30
```

Without operators, we wouldn't be able to perform arithmetic calculations, comparisons, assignments, or logical decisions.

---

## 🤔 Why Do We Need Operators?

Imagine writing a program without operators.

Instead of writing:

```javascript
let total = price + tax;
```

You would need a separate function just to add two numbers.

Operators make code:

- Shorter
- More readable
- Easier to understand
- More expressive

Almost every JavaScript program uses operators.

---

# Types of Operators

JavaScript provides several types of operators:

1. Arithmetic Operators
2. Assignment Operators
3. Comparison Operators
4. Logical Operators
5. Unary Operators
6. Ternary Operator
7. Nullish Coalescing Operator (`??`)
8. Optional Chaining (`?.`)
9. Type Operators
10. Bitwise Operators (Less common in frontend)

---

# 1. Arithmetic Operators

Arithmetic operators perform mathematical calculations.

| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `5 + 2` |
| `-` | Subtraction | `5 - 2` |
| `*` | Multiplication | `5 * 2` |
| `/` | Division | `10 / 2` |
| `%` | Modulus (Remainder) | `10 % 3` |
| `**` | Exponentiation | `2 ** 3` |

### Addition

```javascript
10 + 20
```

Output

```javascript
30
```

---

### Subtraction

```javascript
20 - 5
```

Output

```javascript
15
```

---

### Multiplication

```javascript
5 * 6
```

Output

```javascript
30
```

---

### Division

```javascript
20 / 4
```

Output

```javascript
5
```

---

### Modulus

Returns the remainder.

```javascript
10 % 3
```

Output

```javascript
1
```

Commonly used for:

- Even/Odd numbers
- Circular indexing
- Pagination

Example

```javascript
if (number % 2 === 0) {
    console.log("Even");
}
```

---

### Exponentiation

```javascript
2 ** 4
```

Output

```javascript
16
```

Equivalent to:

```javascript
Math.pow(2,4)
```

---

# 2. Assignment Operators

Assignment operators assign values to variables.

## Assignment

```javascript
let x = 10;
```

---

## Addition Assignment

```javascript
x += 5;
```

Equivalent to

```javascript
x = x + 5;
```

---

## Subtraction Assignment

```javascript
x -= 3;
```

Equivalent to

```javascript
x = x - 3;
```

---

## Multiplication Assignment

```javascript
x *= 2;
```

---

## Division Assignment

```javascript
x /= 5;
```

---

## Modulus Assignment

```javascript
x %= 2;
```

---

## Exponentiation Assignment

```javascript
x **= 2;
```

---

# 3. Comparison Operators

Comparison operators always return a boolean value.

Either

```javascript
true
```

or

```javascript
false
```

| Operator | Description |
|----------|-------------|
| `>` | Greater Than |
| `<` | Less Than |
| `>=` | Greater Than or Equal |
| `<=` | Less Than or Equal |
| `==` | Loose Equality |
| `===` | Strict Equality |
| `!=` | Loose Not Equal |
| `!==` | Strict Not Equal |

Example

```javascript
10 > 5
```

Output

```javascript
true
```

---

```javascript
5 === "5"
```

Output

```javascript
false
```

---

# 4. Logical Operators

Logical operators combine or invert boolean values.

| Operator | Meaning |
|----------|---------|
| `&&` | AND |
| `||` | OR |
| `!` | NOT |

---

## AND (`&&`)

Returns `true` only if **both operands are truthy**.

```javascript
true && true
```

Output

```javascript
true
```

---

```javascript
true && false
```

Output

```javascript
false
```

Real-world example

```javascript
if (isLoggedIn && isVerified) {
    console.log("Access Granted");
}
```

---

## OR (`||`)

Returns the first truthy value.

```javascript
false || true
```

Output

```javascript
true
```

Example

```javascript
const username = input || "Guest";
```

If `input` is falsy, `"Guest"` will be used.

---

## NOT (`!`)

Reverses a boolean.

```javascript
!true
```

Output

```javascript
false
```

---

```javascript
!false
```

Output

```javascript
true
```

---

## Double NOT (`!!`)

Converts any value into a boolean.

```javascript
!!"Hello"
```

Output

```javascript
true
```

---

```javascript
!!0
```

Output

```javascript
false
```

---

# 5. Unary Operators

Unary operators operate on only one operand.

## typeof

Returns the data type.

```javascript
typeof "Hello"
```

Output

```javascript
"string"
```

---

## delete

Deletes an object property.

```javascript
const user = {
    name: "Anil",
    age: 27
};

delete user.age;

console.log(user);
```

Output

```javascript
{
  name: "Anil"
}
```

---

# 6. Ternary Operator

A shorthand for `if...else`.

Syntax

```javascript
condition ? value1 : value2
```

Example

```javascript
const age = 20;

const status = age >= 18 ? "Adult" : "Minor";
```

Output

```javascript
Adult
```

---

# 7. Nullish Coalescing Operator (`??`)

Returns the right-hand value **only when the left-hand value is `null` or `undefined`**.

```javascript
const username = null;

console.log(username ?? "Guest");
```

Output

```javascript
Guest
```

---

```javascript
const count = 0;

console.log(count ?? 100);
```

Output

```javascript
0
```

Notice that `0` is preserved because it is a valid value.

---

## Difference Between `||` and `??`

```javascript
const count = 0;

console.log(count || 100);
```

Output

```javascript
100
```

---

```javascript
const count = 0;

console.log(count ?? 100);
```

Output

```javascript
0
```

| `||` | `??` |
|------|------|
| Checks all falsy values | Checks only `null` and `undefined` |
| May replace valid values like `0` | Preserves valid values |

---

# 8. Optional Chaining (`?.`)

Safely accesses nested object properties.

Without optional chaining

```javascript
user.address.city
```

If `address` is `undefined`, JavaScript throws an error.

With optional chaining

```javascript
user?.address?.city
```

Output

```javascript
undefined
```

instead of throwing an error.

React applications use this operator extensively when working with API responses.

---

# 9. Type Operators

## typeof

```javascript
typeof 10
```

Output

```javascript
"number"
```

---

## instanceof

Checks whether an object is created from a particular constructor.

```javascript
const arr = [];

arr instanceof Array
```

Output

```javascript
true
```

---

```javascript
new Date() instanceof Date
```

Output

```javascript
true
```

---

# Operator Precedence

Not all operators are evaluated from left to right.

Example

```javascript
2 + 3 * 4
```

Output

```javascript
14
```

Because multiplication has higher precedence.

Equivalent to

```javascript
2 + (3 * 4)
```

Use parentheses whenever the order is important.

---

# 💻 Output-Based Questions

### Question 1

```javascript
10 + "5"
```

Output

```javascript
"105"
```

---

### Question 2

```javascript
10 - "5"
```

Output

```javascript
5
```

---

### Question 3

```javascript
!!"Hello"
```

Output

```javascript
true
```

---

### Question 4

```javascript
5 > 2 && 10 > 3
```

Output

```javascript
true
```

---

### Question 5

```javascript
null ?? "Guest"
```

Output

```javascript
"Guest"
```

---

### Question 6

```javascript
false || "JavaScript"
```

Output

```javascript
"JavaScript"
```

---

# 🎯 Interview Questions

### 1. What are operators?

Operators are symbols that perform operations on operands and return a result.

---

### 2. What is the difference between `||` and `??`?

- `||` checks all falsy values.
- `??` checks only `null` and `undefined`.

---

### 3. What is optional chaining?

It safely accesses nested properties without throwing an error if an intermediate property is `null` or `undefined`.

---

### 4. What is the purpose of `instanceof`?

It checks whether an object is an instance of a specific constructor.

---

### 5. What is operator precedence?

Operator precedence determines the order in which operators are evaluated.

---

# ⚠️ Common Mistakes

❌ Using `||` instead of `??` when `0`, `false`, or `""` are valid values.

❌ Assuming optional chaining works on undeclared variables.

```javascript
user?.name; // ✅ if user exists
unknown?.name; // ❌ ReferenceError
```

❌ Forgetting that `delete` removes object properties but does **not** free memory immediately. Garbage collection happens later when the object is no longer reachable.

❌ Assuming spread (`...`) creates a deep copy (it creates a shallow copy).

---

# 📝 Summary

- Operators perform operations on values.
- JavaScript provides arithmetic, assignment, comparison, logical, unary, ternary, nullish coalescing, optional chaining, type, and bitwise operators.
- Use `===` instead of `==` for predictable comparisons.
- Use `??` when only `null` and `undefined` should trigger a default value.
- Use `?.` to safely access nested properties.
- Understand operator precedence to avoid unexpected results.

---

## 🔗 Related Topics

- Variables
- Data Types
- Type Coercion
- Equality (`==` vs `===`)
- Truthy & Falsy Values
- Template Literals
- Destructuring
- Spread & Rest Operators