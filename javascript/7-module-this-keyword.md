# 📘 JavaScript `this` Keyword - Quick Revision Notes

## 📖 What is `this`?

- `this` is a **special keyword** in JavaScript.
- It is **automatically created by the JavaScript engine**.
- `this` is assigned **when a function is invoked**, **not** when it is defined.
- The value of `this` depends on **how the function is called (call-site)**.

> ⭐ Golden Rule:
>
> **`this` is determined by the way a function is invoked, not where it is written.**

---

# 📌 Execution Context

Every function invocation creates a new **Execution Context**.

Each Execution Context gets its own:

- Memory
- Variables
- Functions
- `this`

---

# 📌 Types of `this`

```text
this
│
├── Global this
├── Object Method (Implicit Binding)
├── Regular Function (Default Binding)
├── Arrow Function (Lexical Binding)
├── Nested Function
├── Constructor Function (new Binding)
├── Event Listener
└── Explicit Binding
      ├── call()
      ├── apply()
      └── bind()
```

---

# 🌍 Global `this`

## Browser (Classic Script)

```javascript
console.log(this);
```

Output

```text
Window
```

---

## Node.js (CommonJS)

```javascript
console.log(this);
```

Output

```text
module.exports
```

---

## Global Object

| Environment | Global Object |
|-------------|---------------|
| Browser | `window` |
| Node.js | `global` |
| Universal | `globalThis` |

---

# 🏠 Object Method (Implicit Binding)

```javascript
const person = {
    name: "Anil",
    greet() {
        console.log(this.name);
    }
};

person.greet();
```

Output

```text
Anil
```

Rule:

```text
obj.method()

↓

this = obj
```

---

# 👤 Regular Function (Default Binding)

```javascript
function greet() {
    console.log(this);
}

greet();
```

| Environment | Non-Strict | Strict |
|-------------|------------|---------|
| Browser | `window` | `undefined` |
| Node.js (CommonJS) | `global` | `undefined` |

---

# 🏹 Arrow Function (Lexical Binding)

```javascript
const person = {
    name: "Anil",

    greet() {
        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};
```

Output

```text
Anil
```

### Important Rules

- ❌ No own `this`
- ✅ Uses surrounding lexical `this`
- ❌ Cannot be constructor
- ❌ Ignores `call()`, `apply()`, `bind()`

---

# 🪆 Nested Functions

### Regular → Regular

```javascript
greet() {
    function inner() {
        console.log(this);
    }

    inner();
}
```

`inner()` uses **Default Binding**.

---

### Regular → Arrow

```javascript
greet() {
    const inner = () => {
        console.log(this);
    };

    inner();
}
```

Arrow function uses **parent's `this`**.

---

# 🏗 Constructor Function

```javascript
function Person(name) {
    this.name = name;
}

const p = new Person("Anil");
```

### What `new` Does

1. Creates a new object.
2. Binds `this` to it.
3. Executes the constructor.
4. Returns the object (unless another object is explicitly returned).

---

# 🖱 Event Listener

### Regular Function

```javascript
button.addEventListener("click", function () {
    console.log(this);
});
```

Output

```text
Clicked Element
```

---

### Arrow Function

```javascript
button.addEventListener("click", () => {
    console.log(this);
});
```

Output

```text
Lexical this (usually Window in browser scripts)
```

---

# 🎯 Explicit Binding

## call()

```javascript
fn.call(obj, arg1, arg2);
```

- Changes `this`
- Executes immediately
- Arguments individually

---

## apply()

```javascript
fn.apply(obj, [arg1, arg2]);
```

- Changes `this`
- Executes immediately
- Arguments as an array

---

## bind()

```javascript
const newFn = fn.bind(obj, arg1);
```

- Changes `this`
- Returns a new function
- Executes later
- Supports partial application

---

# 📊 call() vs apply() vs bind()

| Feature | call() | apply() | bind() |
|----------|---------|----------|---------|
| Changes `this` | ✅ | ✅ | ✅ |
| Executes Immediately | ✅ | ✅ | ❌ |
| Returns New Function | ❌ | ❌ | ✅ |
| Arguments | Individual | Array | Individual (pre-bound) |

---

# 🧩 Polyfills

### call()

```javascript
Function.prototype.myCall = function (obj, ...args) {
    obj = obj ?? globalThis;
    obj = Object(obj);

    const key = Symbol();

    obj[key] = this;

    const result = obj[key](...args);

    delete obj[key];

    return result;
};
```

---

### apply()

```javascript
Function.prototype.myApply = function (obj, args = []) {
    obj = obj ?? globalThis;
    obj = Object(obj);

    const key = Symbol();

    obj[key] = this;

    const result = obj[key](...args);

    delete obj[key];

    return result;
};
```

---

### bind()

```javascript
Function.prototype.myBind = function (obj, ...presetArgs) {
    const fn = this;

    return function (...laterArgs) {
        return fn.apply(obj, [...presetArgs, ...laterArgs]);
    };
};
```

---

# ⚠️ Common Mistakes

### ❌ "`this` always refers to the current object."

Wrong.

It depends on the **call-site**.

---

### ❌ Arrow functions have their own `this`.

Wrong.

They inherit `this` from the surrounding lexical scope.

---

### ❌ `bind()` executes immediately.

Wrong.

It returns a new function.

---

### ❌ `call()` and `apply()` return new functions.

Wrong.

They execute immediately.

---

### ❌ Nested functions automatically inherit `this`.

Wrong.

Only arrow functions inherit lexical `this`.

---

# 🎯 Interview Questions

### What determines the value of `this`?

The **way the function is invoked (call-site)**.

---

### Difference between Regular and Arrow Function?

| Regular Function | Arrow Function |
|------------------|----------------|
| Own `this` | No own `this` |
| `this` decided at call time | `this` resolved from lexical scope |
| Can be constructor | Cannot be constructor |

---

### Difference between call(), apply(), bind()?

| call() | apply() | bind() |
|---------|----------|---------|
| Immediate | Immediate | Returns function |
| Individual args | Array args | Pre-bound args |

---

### What does `new` do?

1. Creates object
2. Binds `this`
3. Executes constructor
4. Returns object

---

# ⭐ Golden Rules

1. **`this` is decided when a function is invoked, not when it is defined.**
2. **Regular functions determine `this` from the call-site.**
3. **Arrow functions don't have their own `this`; they use lexical `this`.**
4. **`new` binds `this` to the newly created object.**
5. **`call()`, `apply()`, and `bind()` provide explicit binding.**
6. **`call()` and `apply()` execute immediately.**
7. **`bind()` returns a new function.**
8. **Use `globalThis` for a cross-platform global object reference.**

---

# 📝 One-Line Summary

> **The value of `this` depends on how a function is called. Regular functions get `this` from the call-site, while arrow functions inherit it from their surrounding lexical scope. Explicit binding (`call`, `apply`, `bind`) and constructor calls (`new`) override the default behavior.**