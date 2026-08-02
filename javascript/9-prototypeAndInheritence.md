# Module 9 – Prototype & Inheritance

# Part 2 – What is a Prototype? ⭐⭐⭐⭐⭐

---

# 📖 Introduction

In the previous lesson, we learned **why** JavaScript introduced prototypes:

* To avoid duplicating methods.
* To share common behavior between objects.

Now let's answer the next question:

> **What exactly is a prototype?**

---

# Definition

A **prototype** is simply **another object**.

Every ordinary JavaScript object has a hidden internal link to another object called its **prototype**.

This hidden link is represented in the ECMAScript specification as:

```text
[[Prototype]]
```

It is an **internal slot**, not a normal property.

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

↓

{
    name: "Tommy"
}

↓

[[Prototype]]

↓

animal

↓

{
    eats: true
}
```

Notice:

`dog` doesn't copy `animal`.

Instead,

`dog` points to `animal`.

---

# Why is this Useful?

Suppose we do:

```javascript
console.log(dog.eats);
```

Question:

Does `dog` have an `eats` property?

No.

Then why is the output:

```text
true
```

Because JavaScript automatically follows the prototype.

---

# Property Lookup

When JavaScript evaluates:

```javascript
dog.eats
```

It performs this algorithm.

```text
Step 1

Look inside dog

↓

Property Found?

↓

No

↓

Step 2

Go to dog.[[Prototype]]

↓

animal

↓

Property Found?

↓

Yes

↓

Return true
```

This automatic searching is called **property lookup**.

---

# Another Example

```javascript
const animal = {
    eats: true
};

const dog = Object.create(animal);

dog.name = "Tommy";

console.log(dog.name);
```

Search:

```text
dog

↓

name ?

↓

Found

↓

Return "Tommy"
```

Prototype isn't checked because the property exists on the object itself.

---

# Prototype Lookup Stops When Found

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

Return false
```

JavaScript never checks the prototype.

This is called **property shadowing**.

---

# Prototype is Just Another Object

Many developers imagine something magical.

Actually:

```text
Prototype

↓

Normal JavaScript Object
```

There is nothing special about it except that JavaScript uses it during property lookup.

---

# Every Object Has a Prototype

```javascript
const obj = {};

console.log(
    Object.getPrototypeOf(obj)
);
```

Output

```text
Object.prototype
```

Objects created using `{}` automatically inherit from `Object.prototype`.

---

# Arrays Also Have a Prototype

```javascript
const arr = [];

console.log(
    Object.getPrototypeOf(arr)
);
```

Output

```text
Array.prototype
```

That's why arrays can use methods like:

```javascript
arr.map();

arr.filter();

arr.push();
```

These methods aren't stored inside every array.

They live on `Array.prototype`.

---

# Functions Also Have a Prototype

```javascript
function greet() {}

console.log(
    Object.getPrototypeOf(greet)
);
```

Output

```text
Function.prototype
```

That's why every function can use:

```javascript
greet.call();

greet.apply();

greet.bind();
```

These methods come from `Function.prototype`.

---

# Visual Representation

```text
dog

↓

Own Properties

↓

name

↓

[[Prototype]]

↓

animal

↓

eats

↓

[[Prototype]]

↓

Object.prototype

↓

toString()

hasOwnProperty()

valueOf()

↓

null
```

---

# Where Does `toString()` Come From?

```javascript
const user = {};

console.log(user.toString);
```

Question:

Did we define `toString()`?

No.

Then why does it exist?

Search:

```text
user

↓

toString ?

↓

Not Found

↓

Object.prototype

↓

Found
```

So the method comes from `Object.prototype`.

---

# Common Mistakes

### ❌ Mistake 1

Thinking the prototype is copied into the object.

It isn't.

The object stores a **reference** to its prototype.

---

### ❌ Mistake 2

Thinking the prototype is searched first.

JavaScript always searches:

1. The object itself.
2. Its prototype.
3. The prototype's prototype.
4. Until `null`.

---

### ❌ Mistake 3

Thinking the prototype is special data.

It's simply another object connected through the hidden `[[Prototype]]` link.

---

# Interview Questions

### Q1. What is a prototype?

A prototype is another object linked through the internal `[[Prototype]]` slot that JavaScript consults when a property isn't found on the current object.

---

### Q2. Why do arrays have `map()`?

Because `map()` is defined on `Array.prototype`.

---

### Q3. Why do functions have `call()`?

Because `call()` is defined on `Function.prototype`.

---

### Q4. Why do objects have `toString()`?

Because `toString()` is inherited from `Object.prototype`.

---

# 🔥 Interview Question

Predict the output.

```javascript
const animal = {
    eats: true
};

const dog = Object.create(animal);

console.log(dog.eats);
```

Output

```text
true
```

Explanation:

`dog` doesn't have `eats`.

JavaScript follows `dog.[[Prototype]]` and finds `eats` on `animal`.

---

# 🧠 Mental Model

Whenever you access:

```javascript
obj.property
```

Think:

```text
Object

↓

Property Found?

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

JavaScript never jumps directly to the prototype.

It always checks the object first.

---

# 📝 Summary

* A prototype is another object.
* Every ordinary object has a hidden `[[Prototype]]` link.
* JavaScript searches the object first, then its prototype.
* Properties aren't copied from the prototype.
* Arrays inherit from `Array.prototype`.
* Functions inherit from `Function.prototype`.
* Most ordinary objects inherit from `Object.prototype`.

---

## 🚀 What's Next?

Now that you understand **what a prototype is**, the next lesson is:

# **Prototype Chain**

We'll see how JavaScript continues searching through **multiple prototypes**, all the way to `null`.

This is the mechanism behind JavaScript inheritance and one of the most frequently asked interview topics.
