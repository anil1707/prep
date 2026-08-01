# Module 1: JavaScript Fundamentals - Quick Revision

## Variables

- `var` → Function scoped, can be redeclared and reassigned, hoisted with `undefined`.
- `let` → Block scoped, can be reassigned, cannot be redeclared in the same scope, Temporal Dead Zone (TDZ).
- `const` → Block scoped, cannot be reassigned, must be initialized during declaration.
- Prefer `const` by default, `let` when reassignment is needed, avoid `var`.

---

## Data Types

### Primitive (Stored by Value)

- String
- Number
- Boolean
- Undefined
- Null
- Symbol
- BigInt

### Non-Primitive (Stored by Reference)

- Object
- Array
- Function
- Date
- Map
- Set

---

## Type Coercion

- **Implicit Coercion** → Automatic conversion by JavaScript.
- **Explicit Coercion** → Manual conversion using `Number()`, `String()`, `Boolean()`.

Examples

```javascript
"5" + 2   // "52"
"5" - 2   // 3
true + 1  // 2
```

---

## Equality

### `==`

- Loose equality
- Performs type coercion

```javascript
5 == "5" // true
```

### `===`

- Strict equality
- No type coercion

```javascript
5 === "5" // false
```

✅ Always prefer `===`.

---

## Truthy & Falsy

### 8 Falsy Values

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

Everything else is truthy.

Examples

```javascript
Boolean([])      // true
Boolean({})      // true
Boolean("false") // true
```

---

## Operators

### Arithmetic

`+ - * / % **`

### Assignment

`= += -= *= /= %=`

### Comparison

`> < >= <= == === != !==`

### Logical

`&& || !`

### Other

- `??` → Nullish Coalescing
- `?.` → Optional Chaining
- `?:` → Ternary
- `typeof`
- `instanceof`

---

## Template Literals

- Uses backticks (`` ` ``)
- Supports interpolation using `${}`
- Supports multiline strings
- Supports tagged templates

Example

```javascript
`Hello ${name}`
```

---

## Destructuring

### Object

```javascript
const { name, age } = user;
```

### Array

```javascript
const [first, second] = arr;
```

Supports:

- Default values
- Renaming
- Nested destructuring
- Function parameter destructuring

---

## Spread Operator (`...`)

Used to expand values.

Examples

```javascript
const copy = [...arr];

const userCopy = { ...user };

Math.max(...numbers);
```

---

## Rest Operator (`...`)

Used to collect values.

Examples

```javascript
function sum(...numbers) {}

const [first, ...rest] = arr;

const { name, ...others } = user;
```

---

## Spread vs Rest

| Spread | Rest |
|---------|------|
| Expands values | Collects values |
| Function call | Function parameters |
| Copy/Merge arrays & objects | Remaining values |

---

## React Usage

- Props Destructuring
- `useState()` Array Destructuring
- Immutable State Updates using Spread
- Optional Chaining for API Responses
- Template Literals for Dynamic UI
- `??` for Default Values

---

## Interview Tips

- Prefer `===` over `==`
- Know all **8 falsy values**
- Understand `||` vs `??`
- Remember Spread creates a **shallow copy**
- Know Object vs Array Destructuring
- Understand Optional Chaining (`?.`)