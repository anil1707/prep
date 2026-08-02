# Module 9 – Prototype & Inheritance

# Part 6 – `__proto__` vs `prototype` ⭐⭐⭐⭐⭐

---

# 📖 Introduction

So far, we've learned two terms:

```text
__proto__
```

and

```text
prototype
```

Their names look similar, but they serve **completely different purposes**.

The biggest mistake developers make is treating them as the same thing.

They are **not**.

---

# Quick Definition

## `__proto__`

* Exists on **objects** (through inheritance from `Object.prototype`).
* Exposes the object's internal `[[Prototype]]`.
* Used during **property lookup**.
* Legacy accessor.

---

## `prototype`

* Exists on **constructor functions**.
* Used by the **`new` operator**.
* Becomes the prototype of future instances.

---

# Example

```javascript
function Person(name) {
    this.name = name;
}

const p = new Person("Anil");
```

Now we have two things:

```text
Function

↓

Person

Object

↓

p
```

Each has different prototype-related concepts.

---

# Visual Representation

```text
                 Function Object
              +-------------------+
              |      Person       |
              +-------------------+
                     │
     __proto__       │ prototype (property)
         │           ▼
         ▼      +-----------------------+
 Function.prototype  Person.prototype
                      {
                          constructor: Person
                      }
                            ▲
                            │
                     [[Prototype]]
                            │
                      +-------------+
                      |      p      |
                      +-------------+
                            │
                      __proto__
                            │
                            ▼
                    Person.prototype
```

This is one of the most important diagrams in JavaScript.

---

# Let's Verify

## Function has `prototype`

```javascript
function Person() {}

console.log(Person.prototype);
```

Output

```javascript
{
    constructor: Person
}
```

---

## Object doesn't

```javascript
const obj = {};

console.log(obj.prototype);
```

Output

```text
undefined
```

---

## Object has `__proto__`

```javascript
const obj = {};

console.log(obj.__proto__);
```

Output

```text
Object.prototype
```

---

## Instance

```javascript
function Person() {}

const p = new Person();

console.log(p.__proto__ === Person.prototype);
```

Output

```text
true
```

Because:

```text
new

↓

instance.[[Prototype]]

↓

Constructor.prototype
```

---

# Internal Working of `new`

```javascript
const p = new Person();
```

Conceptually:

```text
Create Empty Object

↓

p

↓

Set

p.[[Prototype]]

↓

Person.prototype

↓

Execute Constructor

↓

Return p
```

Notice:

`prototype` is only used **during object creation**.

After that,

property lookup uses

```text
[[Prototype]]

↓

__proto__
```

---

# Memory Diagram

```text
             Function Object
        +----------------------+
        |       Person         |
        +----------------------+
               │
               │ prototype
               ▼
      +-----------------------+
      |   Person.prototype    |
      |  greet()              |
      +-----------------------+
               ▲
               │ [[Prototype]]
               │
        +---------------+
        |      p        |
        | name: "Anil"  |
        +---------------+
```

---

# Where Does `greet()` Come From?

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log("Hello");
};

const p = new Person("Anil");

p.greet();
```

Search:

```text
p

↓

greet ?

↓

Not Found

↓

Person.prototype

↓

Found
```

---

# Common Misconception

Many developers think:

```text
prototype

↓

Prototype of object
```

Wrong.

Actually:

```text
prototype

↓

Template used by new

↓

Future Objects
```

---

# Comparison

| Feature            | `__proto__`                      | `prototype`           |
| ------------------ | -------------------------------- | --------------------- |
| Exists On          | Objects (via `Object.prototype`) | Constructor Functions |
| Purpose            | Property lookup                  | Used by `new`         |
| Related To         | `[[Prototype]]`                  | Future instances      |
| Used At            | Runtime                          | Object creation       |
| Modern Alternative | `Object.getPrototypeOf()`        | No direct replacement |

---

# Common Mistakes

### ❌ Mistake 1

Thinking:

```text
prototype === __proto__
```

Wrong.

They serve different purposes.

---

### ❌ Mistake 2

Thinking objects have `prototype`.

```javascript
const obj = {};

console.log(obj.prototype);
```

Output

```text
undefined
```

---

### ❌ Mistake 3

Thinking functions don't have `__proto__`.

Functions are objects too.

```javascript
function greet() {}

console.log(greet.__proto__ === Function.prototype);
```

Output

```text
true
```

---

# Important Relationships

```javascript
function Person() {}

const p = new Person();
```

These are all true:

```javascript
Object.getPrototypeOf(p) === Person.prototype
// true

p.__proto__ === Person.prototype
// true

Object.getPrototypeOf(Person) === Function.prototype
// true

Person.__proto__ === Function.prototype
// true
```

Notice:

* `p.__proto__` points to `Person.prototype`.
* `Person.__proto__` points to `Function.prototype`.

Different objects, different prototype chains.

---

# Interview Questions

### Q1. What is the difference between `__proto__` and `prototype`?

* `__proto__` is an object's link to its prototype (legacy accessor).
* `prototype` is a property on constructor functions used by `new`.

---

### Q2. Does every object have `prototype`?

No.

Ordinary objects do not.

---

### Q3. Do functions have `__proto__`?

Yes.

Functions are objects.

Their prototype is `Function.prototype`.

---

### Q4. What does `new` use?

It uses:

```text
Constructor.prototype
```

to initialize the new object's `[[Prototype]]`.

---

# 🔥 Interview Question

Predict the output.

```javascript
function Person() {}

const p = new Person();

console.log(p.__proto__ === Person.prototype);

console.log(Person.__proto__ === Function.prototype);

console.log(Person.prototype.__proto__ === Object.prototype);
```

Output

```text
true
true
true
```

Explanation:

* Instance → `Person.prototype`
* Function → `Function.prototype`
* Prototype object → `Object.prototype`

---

# 🧠 Mental Model

Whenever you see:

```javascript
function Person() {}
```

Imagine:

```text
Person (Function Object)
│
├── __proto__ ─────────────► Function.prototype
│
└── prototype ─────────────► Person.prototype
                                 ▲
                                 │
                          Used by new
                                 │
                                 ▼
                          Person Instance
```

This single diagram explains almost every prototype interview question.

---

# 📝 Summary

* `prototype` belongs to constructor functions.
* `__proto__` (legacy) exposes an object's internal `[[Prototype]]`.
* `new` connects an instance's `[[Prototype]]` to `Constructor.prototype`.
* Property lookup follows the `[[Prototype]]` chain.
* Functions are objects, so they also have their own prototype chain.

---

# 🎯 Golden Rules

1. **Objects use `[[Prototype]]` for inheritance.**
2. **`__proto__` is a legacy way to access `[[Prototype]]`.**
3. **Functions have a `prototype` property.**
4. **`new` sets `instance.[[Prototype]] = Constructor.prototype`.**
5. **`prototype` and `__proto__` are different concepts.**
6. **Functions themselves inherit from `Function.prototype`.**

---

## 🚀 What's Next?

Next we'll study **Constructor Functions** in depth.

We'll answer:

* How does `new` actually work internally?
* What happens step by step when you call `new Person()`?
* Why does every constructor automatically get a `prototype` object?
* Why is there a `constructor` property?

This is another favorite interview topic and will connect everything you've learned so far.
