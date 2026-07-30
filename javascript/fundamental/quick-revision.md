# Truthy & Falsy Values in JavaScript

## 📖 Introduction

In JavaScript, conditions such as `if`, `while`, and logical operators (`&&`, `||`, `!`) do not require a boolean value. JavaScript automatically converts values to `true` or `false` using **Boolean Coercion**.

```javascript
if ("Hello") {
    console.log("Executed");
}
```

Output

```javascript
Executed
```

Internally, JavaScript behaves like:

```javascript
Boolean("Hello"); // true
```

---

# Truthy Values

A **truthy value** is any value that becomes `true` when converted using `Boolean()`.

Examples:

```javascript
true
1
-1
"Hello"
"0"
"false"
[]
{}
function(){}
Infinity
-Infinity
```

Example

```javascript
Boolean([]);
```

Output

```javascript
true
```

---

# Falsy Values

A **falsy value** is any value that becomes `false` when converted using `Boolean()`.

There are **exactly 8 falsy values** in JavaScript.

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

Example

```javascript
Boolean(0);
```

Output

```javascript
false
```

---

# Boolean Conversion Table

| Value | Boolean(value) |
|--------|----------------|
| `false` | `false` |
| `0` | `false` |
| `-0` | `false` |
| `0n` | `false` |
| `""` | `false` |
| `" "` | `true` |
| `"0"` | `true` |
| `[]` | `true` |
| `{}` | `true` |
| `null` | `false` |
| `undefined` | `false` |
| `NaN` | `false` |
| `1` | `true` |
| `"Hello"` | `true` |

---

# Truthy & Falsy with Logical Operators

## AND (`&&`)

Returns the **first falsy value**, or the **last value if all operands are truthy**.

```javascript
5 && 10
```

Output

```javascript
10
```

```javascript
0 && 10
```

Output

```javascript
0
```

---

## OR (`||`)

Returns the **first truthy value**.

```javascript
0 || 10
```

Output

```javascript
10
```

```javascript
"Hello" || "World"
```

Output

```javascript
Hello
```

---

## Nullish Coalescing (`??`)

Returns the right-hand value only when the left-hand value is `null` or `undefined`.

```javascript
0 ?? 100
```

Output

```javascript
0
```

```javascript
null ?? 100
```

Output

```javascript
100
```

---

# React Examples

### Conditional Rendering

```jsx
{isLoggedIn && <Dashboard />}
```

### Default Value

```javascript
const username = props.name ?? "Guest";
```

Prefer `??` over `||` when `0`, `false`, or `""` are valid values.

---

# Common Mistakes

❌ Empty array is falsy

```javascript
Boolean([]);
```

Output

```javascript
true
```

---

❌ Empty object is falsy

```javascript
Boolean({});
```

Output

```javascript
true
```

---

❌ `"false"` is falsy

```javascript
Boolean("false");
```

Output

```javascript
true
```

Because it is a **non-empty string**.

---

# Interview Questions

1. How many falsy values are there in JavaScript?
2. Is an empty array truthy or falsy?
3. Is an empty object truthy or falsy?
4. What is Boolean coercion?
5. What is the difference between `||` and `??`?
6. Why is `"false"` truthy?
7. What does `&&` return?
8. What does `||` return?

---

# 📝 Summary

- JavaScript automatically converts values to `true` or `false` in conditional statements.
- There are **exactly 8 falsy values**.
- Every other value is **truthy**.
- `&&` returns the first falsy value or the last truthy value.
- `||` returns the first truthy value.
- `??` only checks for `null` and `undefined`.
- Understanding truthy and falsy values helps avoid bugs in JavaScript and React applications.