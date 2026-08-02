# Module 9 – Prototype & Inheritance

# Part 8 – ES6 Classes ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Before ES6 (2015), JavaScript used **Constructor Functions**.

Example:

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function () {
    console.log(`Hello ${this.name}`);
};

const p = new Person("Anil", 27);

p.greet();
```

This works perfectly.

But many developers coming from Java, C++, and C# found it difficult to understand.

So ES6 introduced a cleaner syntax:

```javascript
class Person {

}
```

Notice:

JavaScript did **not** introduce a new inheritance system.

It only introduced a **new syntax**.

---

# What is a Class?

A **class** is a blueprint for creating objects.

It defines:

* Properties
* Methods
* Initialization logic

Example:

```javascript
class Person {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }

}

const p = new Person("Anil", 27);

p.greet();
```

Output

```text
Hello Anil
```

---

# Is a Class a New Feature?

No.

This surprises many developers.

Internally:

```javascript
class Person {

}
```

is conceptually similar to:

```javascript
function Person() {

}
```

Both create constructor functions.

---

# Verify

```javascript
class Person {}

console.log(typeof Person);
```

Output

```text
function
```

A class is actually a **function**.

---

# Internal Conversion

This:

```javascript
class Person {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hello");
    }

}
```

is conceptually similar to:

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log("Hello");
};
```

Both produce almost the same prototype structure.

---

# Where Are Methods Stored?

Consider:

```javascript
class Person {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hello");
    }

}
```

Question:

Does every object get its own `greet()`?

No.

Verify:

```javascript
const p1 = new Person("Anil");

const p2 = new Person("Rahul");

console.log(p1.greet === p2.greet);
```

Output

```text
true
```

Because:

```text
Person.prototype

↓

greet()

↑

Shared

↑

p1

p2
```

Exactly like constructor functions.

---

# Constructor

Every class can have:

```javascript
constructor()
```

Example:

```javascript
class Person {

    constructor(name) {
        this.name = name;
    }

}
```

The constructor runs automatically when using:

```javascript
new Person("Anil");
```

Just like constructor functions.

---

# What Happens Internally?

```javascript
const p = new Person("Anil");
```

Conceptually:

```text
Create {}

↓

Set

[[Prototype]]

↓

Person.prototype

↓

Execute constructor

↓

Return object
```

Exactly the same process as constructor functions.

---

# Methods Are Non-Enumerable

One important difference.

Constructor function:

```javascript
function Person() {}

Person.prototype.greet = function () {};
```

The property is **enumerable by default**.

Class:

```javascript
class Person {

    greet() {}

}
```

Methods defined in classes are **non-enumerable**.

This is one of the few behavioral differences.

---

# Strict Mode

Classes always execute in **strict mode**.

Example:

```javascript
class Person {

    test() {
        x = 10;
    }

}
```

Output

```text
ReferenceError
```

because strict mode is automatically enabled inside class bodies.

---

# Cannot Call Without `new`

Constructor Function:

```javascript
function Person() {}

Person();
```

Runs (although usually incorrect).

Class:

```javascript
class Person {}

Person();
```

Output

```text
TypeError

Class constructor Person cannot be invoked without 'new'
```

Classes must be called using:

```javascript
new Person();
```

---

# Visual Representation

```text
Person (Function)

↓

prototype

↓

greet()

↑

[[Prototype]]

↓

Instance
```

Same prototype system.

Different syntax.

---

# Class vs Constructor Function

| Constructor Function        | ES6 Class                   |
| --------------------------- | --------------------------- |
| `function Person(){}`       | `class Person {}`           |
| Uses `prototype`            | Uses `prototype` internally |
| Can be called without `new` | Must use `new`              |
| Not strict by default       | Always strict               |
| Older syntax                | Cleaner syntax              |

---

# Common Mistakes

### ❌ Mistake 1

Thinking JavaScript classes work like Java classes.

They don't.

JavaScript still uses prototypes internally.

---

### ❌ Mistake 2

Thinking each object gets its own methods.

Methods live on `Class.prototype`.

---

### ❌ Mistake 3

Thinking classes are not functions.

```javascript
typeof Person
```

returns:

```text
function
```

---

# Interview Questions

### Q1. Are ES6 Classes real classes?

Not in the classical OOP sense.

They are syntactic sugar over constructor functions and prototypes.

---

### Q2. Where are class methods stored?

On `Class.prototype`.

---

### Q3. Can a class be called without `new`?

No.

It throws a `TypeError`.

---

### Q4. Are classes functions?

Yes.

```javascript
typeof Person
```

returns

```text
function
```

---

# 🔥 Interview Question

Predict the output.

```javascript
class Person {

    greet() {
        console.log("Hello");
    }

}

const p1 = new Person();

const p2 = new Person();

console.log(p1.greet === p2.greet);
```

Output

```text
true
```

Explanation:

Both instances share the same method from `Person.prototype`.

---

# 🧠 Mental Model

Whenever you see:

```javascript
class Person {

}
```

Think:

```text
Constructor Function

+

Prototype

+

Cleaner Syntax
```

Not:

```text
Completely New Language Feature
```

---

# 📝 Summary

* ES6 classes are syntactic sugar over constructor functions.
* A class is still a function.
* Class methods are stored on `Class.prototype`.
* Classes must be called with `new`.
* Classes always run in strict mode.
* JavaScript inheritance remains prototype-based.

---

## 🚀 What's Next?

Next we'll study:

# `extends` ⭐⭐⭐⭐⭐

We'll answer:

* How does inheritance work with classes?
* What does `extends` actually do?
* Does it copy methods?
* How does JavaScript connect the prototype chain?

This is another highly asked interview topic and the natural next step after understanding classes.
