# Module 9 – Prototype & Inheritance

# Part 5 – `prototype` ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Until now, we've learned:

Every ordinary object has:

```text id="a2j6y8"
[[Prototype]]
```

which can be accessed (legacy) using:

```javascript id="yv8lhv"
obj.__proto__
```

Now let's introduce another word:

```javascript id="h4zqtm"
prototype
```

This is **NOT** the same thing.

---

# First Observation

Consider:

```javascript id="dwg41v"
const obj = {};

console.log(obj.prototype);
```

Output

```text id="t86jlwm"
undefined
```

Why?

Because ordinary objects **do not have a `prototype` property**.

Now:

```javascript id="vs22q9"
function greet() {}

console.log(greet.prototype);
```

Output

```javascript id="u9l0po"
{}
```

Interesting.

Functions have `prototype`.

Objects don't.

Why?

---

# Why Does `prototype` Exist?

Suppose we write:

```javascript id="w5c1w6"
function Person(name) {
    this.name = name;
}
```

Now we create:

```javascript id="wzw0me"
const p1 = new Person("Anil");

const p2 = new Person("Rahul");
```

Question:

Where should shared methods live?

Bad approach:

```javascript id="b7wjlwm"
function Person(name) {
    this.name = name;

    this.greet = function () {
        console.log("Hello");
    };
}
```

Memory:

```text id="g7xmhl"
p1

↓

greet()

p2

↓

greet()

Two separate function objects ❌
```

Waste of memory.

---

# Better Approach

Store the method once.

```javascript id="rjlwmr"
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log("Hello");
};
```

Now:

```text id="uj98ij"
Person.prototype

↓

greet()

↑

Shared

↑

p1

p2
```

One function.

Many objects.

---

# What is `prototype`?

`prototype` is a **property that exists on constructor functions**.

Its purpose is:

> To provide the object that newly created instances will use as their prototype.

Think of it as a **template for future objects**.

---

# Internal Structure

```javascript id="jlwm2r"
function Person() {}
```

Conceptually:

```text id="q9jlwm"
Person (Function)

│
├── prototype
│      │
│      ▼
│   {
│      constructor: Person
│   }
│
▼
Function.prototype
```

Notice:

`Person` itself is a function object, so **its own prototype** is `Function.prototype`.

Separately, it also has a **`prototype` property** used by `new`.

These are different things.

---

# What Happens When We Use `new`?

```javascript id="jlwm3r"
const p = new Person("Anil");
```

Conceptually:

Step 1

```text id="jlwm4r"
Create Empty Object
```

↓

Step 2

```text id="jlwm5r"
Set

p.[[Prototype]]

↓

Person.prototype
```

↓

Step 3

Execute constructor

↓

Step 4

Return object

---

# Visual Representation

```text id="jlwm6r"
Person

↓

prototype

↓

{
    greet()
}

↑

[[Prototype]]

↓

p1

p2
```

Both objects share the same prototype.

---

# Verify

```javascript id="jlwm7r"
function Person() {}

const p = new Person();

console.log(
    Object.getPrototypeOf(p) === Person.prototype
);
```

Output

```text id="jlwm8r"
true
```

This proves that:

```text id="jlwm9r"
new

↓

instance.[[Prototype]]

↓

Constructor.prototype
```

---

# Shared Methods

```javascript id="jlwm10r"
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const p1 = new Person("Anil");
const p2 = new Person("Rahul");

p1.greet();
p2.greet();
```

Output

```text id="jlwm11r"
Hello Anil

Hello Rahul
```

Only **one** `greet()` function exists.

---

# Why Don't Objects Have `prototype`?

```javascript id="jlwm12r"
const user = {};

console.log(user.prototype);
```

Output

```text id="jlwm13r"
undefined
```

Because:

Objects aren't constructors.

Only functions that can be used with `new` have a meaningful `prototype` property.

---

# Visual Difference

```text id="jlwm14r"
Function

↓

prototype

↓

Used by new

-----------------------

Object

↓

[[Prototype]]

↓

Used for inheritance
```

---

# Common Mistakes

### ❌ Mistake 1

Thinking:

```text id="jlwm15r"
prototype

=

__proto__
```

Wrong.

They are completely different.

---

### ❌ Mistake 2

Thinking every object has a `prototype`.

Only constructor functions expose a `prototype` property.

---

### ❌ Mistake 3

Thinking `prototype` affects existing objects.

It only affects objects created with `new` (after the prototype is set or modified).

---

# Interview Questions

### Q1. What is `prototype`?

A property of constructor functions that is used as the prototype for objects created with `new`.

---

### Q2. Why does `prototype` exist?

To allow all instances created by the constructor to share methods and properties.

---

### Q3. Do ordinary objects have `prototype`?

No.

```javascript id="jlwm16r"
({}).prototype
```

returns

```text id="jlwm17r"
undefined
```

---

### Q4. What does `new` do with `prototype`?

It sets:

```text id="jlwm18r"
instance.[[Prototype]]

↓

Constructor.prototype
```

---

# 🔥 Interview Question

Predict the output.

```javascript id="jlwm19r"
function Person() {}

const p = new Person();

console.log(
    Object.getPrototypeOf(p) === Person.prototype
);
```

Output

```text id="jlwm20r"
true
```

Because `new` links the instance's `[[Prototype]]` to the constructor's `prototype` object.

---

# 🧠 Mental Model

Whenever you see:

```javascript id="jlwm21r"
Person.prototype
```

Think:

```text id="jlwm22r"
Prototype Object

↓

Future instances created with new

↓

Will inherit from this object
```

Not:

```text id="jlwm23r"
Prototype of Person
```

`Person.prototype` is **not the prototype of the function object `Person`**.

The function object's prototype is `Function.prototype`.

---

# 📝 Summary

* `prototype` is a property found on constructor functions.
* Ordinary objects do not have a `prototype` property.
* `new` creates an object whose `[[Prototype]]` points to `Constructor.prototype`.
* Methods placed on `Constructor.prototype` are shared by all instances.
* This avoids duplicating methods in every object.

---

## 🚀 What's Next?

Now comes the **most famous interview question**:

# `__proto__` vs `prototype` ⭐⭐⭐⭐⭐

We'll compare them side by side with diagrams, examples, and memory representations until the difference becomes crystal clear.

By the end of that lesson, you'll be able to answer this question confidently in any JavaScript interview.
