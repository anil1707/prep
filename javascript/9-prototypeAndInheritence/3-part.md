# Module 9 – Prototype & Inheritance

# Part 3 – Prototype Chain ⭐⭐⭐⭐⭐

---

# 📖 Introduction

In the previous lesson, we learned that every object has a hidden internal link called:

```text
[[Prototype]]
```

Now imagine that the prototype itself also has a prototype.

Then that prototype also has another prototype.

This creates a chain.

That chain is called the **Prototype Chain**.

---

# What is a Prototype Chain?

A **Prototype Chain** is the sequence of objects JavaScript follows when searching for a property or method.

When JavaScript cannot find a property on an object, it automatically searches:

1. The object itself.
2. Its prototype.
3. The prototype's prototype.
4. Continues until it reaches `null`.

---

# Example

```javascript
const animal = {
    eats: true
};

const dog = Object.create(animal);

dog.name = "Tommy";
```

Conceptually:

```text
dog
│
▼
{
    name: "Tommy"
}
│
▼
[[Prototype]]
│
▼
animal
│
▼
{
    eats: true
}
│
▼
[[Prototype]]
│
▼
Object.prototype
│
▼
[[Prototype]]
│
▼
null
```

---

# Property Lookup Algorithm

Suppose we execute:

```javascript
console.log(dog.eats);
```

JavaScript internally performs:

```text
Step 1

Look inside dog

↓

eats ?

↓

Not Found

↓

Step 2

Go to animal

↓

eats ?

↓

Found

↓

Return true
```

---

# Searching Multiple Levels

Suppose:

```javascript
const livingThing = {
    alive: true
};

const animal = Object.create(livingThing);

animal.eats = true;

const dog = Object.create(animal);

dog.name = "Tommy";
```

Chain:

```text
dog

↓

animal

↓

livingThing

↓

Object.prototype

↓

null
```

---

Now:

```javascript
console.log(dog.alive);
```

Search:

```text
dog

↓

alive ?

↓

No

↓

animal

↓

alive ?

↓

No

↓

livingThing

↓

alive ?

↓

Yes

↓

true
```

---

# End of Prototype Chain

Eventually JavaScript reaches:

```text
Object.prototype

↓

null
```

Why `null`?

Because `null` means:

```text
No More Prototype
```

Search stops here.

If the property still isn't found:

```javascript
console.log(dog.color);
```

Output

```text
undefined
```

---

# Property Shadowing

Suppose:

```javascript
const animal = {
    eats: true
};

const dog = Object.create(animal);

dog.eats = false;

console.log(dog.eats);
```

Output

```text
false
```

Search:

```text
dog

↓

eats ?

↓

Found

↓

Stop
```

The prototype isn't checked.

This is called **Property Shadowing**.

---

# Why `toString()` Works

```javascript
const dog = {};

console.log(dog.toString);
```

Search:

```text
dog

↓

toString ?

↓

Not Found

↓

Object.prototype

↓

Found
```

That's why almost every object has:

* `toString()`
* `valueOf()`
* `hasOwnProperty()`

---

# Why Arrays Have `map()`

```javascript
const arr = [1, 2, 3];

arr.map(x => x * 2);
```

Search:

```text
arr

↓

map ?

↓

Not Found

↓

Array.prototype

↓

Found
```

The method belongs to `Array.prototype`, not the array instance.

---

# Why Functions Have `call()`

```javascript
function greet() {}

greet.call(null);
```

Search:

```text
greet

↓

call ?

↓

Not Found

↓

Function.prototype

↓

Found
```

---

# Visual Representation

```text
Array Instance

↓

Array.prototype

↓

Object.prototype

↓

null
```

---

```text
Function

↓

Function.prototype

↓

Object.prototype

↓

null
```

---

```text
Object

↓

Object.prototype

↓

null
```

---

# Performance

Does JavaScript search the entire chain every time?

Not necessarily.

Modern JavaScript engines (like V8) use multiple optimizations such as **inline caches** and hidden classes to make repeated property access much faster.

From a conceptual point of view, though, property lookup follows the prototype chain.

---

# Common Mistakes

### ❌ Mistake 1

Thinking JavaScript searches the prototype first.

Wrong.

It always searches:

1. Object
2. Prototype
3. Prototype's prototype
4. `null`

---

### ❌ Mistake 2

Thinking properties are copied from the prototype.

Wrong.

Only a prototype link exists.

---

### ❌ Mistake 3

Thinking the prototype chain is only one level.

Wrong.

It can contain multiple levels.

---

# Interview Questions

### Q1. What is a Prototype Chain?

The sequence of prototypes JavaScript traverses while looking for a property.

---

### Q2. When does JavaScript use the Prototype Chain?

When a property isn't found on the current object.

---

### Q3. When does the search stop?

* Property found
* OR prototype becomes `null`

---

### Q4. Why does every object have `toString()`?

Because it is inherited from `Object.prototype`.

---

### Q5. Why do arrays have `map()`?

Because `map()` is defined on `Array.prototype`.

---

# 🔥 Interview Question

Predict the output.

```javascript
const livingThing = {
    alive: true
};

const animal = Object.create(livingThing);

const dog = Object.create(animal);

console.log(dog.alive);
```

Output

```text
true
```

Explanation:

JavaScript searches:

```text
dog

↓

animal

↓

livingThing

↓

Found
```

---

# 🧠 Mental Model

Whenever you write:

```javascript
obj.property
```

Imagine JavaScript doing this:

```text
Current Object

↓

Found?

↓

Yes → Return

↓

No

↓

Prototype

↓

Found?

↓

Yes → Return

↓

No

↓

Next Prototype

↓

...

↓

null

↓

undefined
```

This entire process is called the **Prototype Chain**.

---

# 📝 Summary

* Every ordinary object has a hidden `[[Prototype]]`.
* The prototype itself can have another prototype.
* This forms the Prototype Chain.
* JavaScript searches:

  1. Current object
  2. Prototype
  3. Next prototype
  4. Until `null`
* The search stops as soon as the property is found.
* The chain explains why objects inherit methods like `toString()`, arrays inherit `map()`, and functions inherit `call()`.

---

## 🚀 What's Next?

The next lesson is one of the **most confusing topics in JavaScript**:

# `__proto__` ⭐⭐⭐⭐⭐

We'll answer:

* What exactly is `__proto__`?
* Is it the same as `[[Prototype]]`?
* Why is it considered legacy?
* Should we use it?
* How is it different from `prototype`?

This will prepare you for the most common interview question:

> **What is the difference between `__proto__` and `prototype`?**
