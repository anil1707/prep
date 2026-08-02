# Module 9 – Prototype & Inheritance

# Part 10 – `super` ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Suppose we have:

```javascript id="p1q2w3"
class Animal {

    constructor(name) {
        this.name = name;
    }

}
```

Now we inherit:

```javascript id="p2q3w4"
class Dog extends Animal {

}
```

Question:

How does `Dog` initialize the `name` property?

The answer is:

```javascript id="p3q4w5"
super(name);
```

---

# What is `super()`?

`super()` calls the **parent class constructor**.

Example:

```javascript id="p4q5w6"
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name) {
        super(name);
    }

}

const dog = new Dog("Tommy");

console.log(dog.name);
```

Output

```text id="o1p2q3"
Tommy
```

---

# Why Do We Need `super()`?

Without `super()`:

```javascript id="p5q6w7"
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name) {
        this.name = name;
    }

}
```

Output

```text id="o2p3q4"
ReferenceError

Must call super constructor before using 'this'
```

---

# Why?

When you create:

```javascript id="p6q7w8"
const dog = new Dog("Tommy");
```

JavaScript hasn't finished creating the derived object yet.

Only the parent constructor knows how to initialize the inherited part of the object.

So JavaScript requires:

```text id="o3p4q5"
super()

↓

Initialize Parent

↓

Create this

↓

Continue Child Constructor
```

---

# Internal Working

Suppose:

```javascript id="p7q8w9"
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name) {
        super(name);

        this.type = "Dog";
    }

}
```

Conceptually:

```text id="o4p5q6"
new Dog()

↓

Create Object

↓

Link Prototype

↓

Call Animal Constructor

↓

this.name = name

↓

Return to Dog

↓

this.type = "Dog"

↓

Return Object
```

---

# `super.method()`

`super` is not only for constructors.

It can also call parent methods.

Example:

```javascript id="p8q9w0"
class Animal {

    speak() {
        console.log("Animal Sound");
    }

}

class Dog extends Animal {

    speak() {
        super.speak();

        console.log("Bark");
    }

}

const dog = new Dog();

dog.speak();
```

Output

```text id="o5p6q7"
Animal Sound

Bark
```

---

# Internal Working

Conceptually:

```text id="o6p7q8"
super.speak()

↓

Animal.prototype.speak.call(this)
```

Notice:

`super.speak()` still executes with the **current object (`this`)**.

---

# Visual Representation

```text id="o7p8q9"
Dog Instance

↓

Dog.prototype

↓

Animal.prototype

↓

Object.prototype
```

When:

```javascript id="p9q0w1"
super.speak();
```

JavaScript searches:

```text id="o8p9q0"
Dog.prototype

↓

Parent

↓

Animal.prototype

↓

Found
```

---

# Constructor Example

```javascript id="q1w2e3"
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name, breed) {
        super(name);

        this.breed = breed;
    }

}

const dog = new Dog("Tommy", "Labrador");
```

Result

```javascript id="q2w3e4"
{
    name: "Tommy",
    breed: "Labrador"
}
```

---

# Common Mistakes

### ❌ Mistake 1

Using `this` before `super()`.

```javascript id="q3w4e5"
constructor() {

    this.name = "Tommy";

    super();
}
```

Throws a `ReferenceError`.

---

### ❌ Mistake 2

Thinking `super()` creates a new object.

It doesn't.

It initializes the parent portion of the current object.

---

### ❌ Mistake 3

Thinking `super.method()` changes `this`.

It doesn't.

The parent method still runs with the current instance as `this`.

---

# Interview Questions

### Q1. What is `super()`?

It calls the parent class constructor.

---

### Q2. Why must `super()` be called before `this`?

Because the parent constructor must initialize the inherited part of the object before `this` can be used in the derived constructor.

---

### Q3. What does `super.method()` do?

It invokes the parent class's method while preserving the current `this` value.

---

### Q4. Is `super()` required in every class?

No.

Only in a **derived class constructor** (a class that uses `extends`) and only if you define a constructor.

---

# 🔥 Interview Question

Predict the output.

```javascript id="q4w5e6"
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name) {
        super(name);

        this.type = "Dog";
    }

}

const dog = new Dog("Tommy");

console.log(dog);
```

Output

```javascript id="q5w6e7"
Dog {
    name: "Tommy",
    type: "Dog"
}
```

---

# 🧠 Mental Model

Whenever you see:

```javascript id="q6w7e8"
super(name);
```

Think:

```text id="q7w8e9"
Call Parent Constructor

↓

Initialize Parent Properties

↓

Return to Child Constructor

↓

Initialize Child Properties
```

---

Whenever you see:

```javascript id="q8w9e0"
super.speak();
```

Think:

```text id="q9w0e1"
Call Parent Method

↓

Execute With Current this
```

---

# 📝 Summary

* `super()` calls the parent constructor.
* In derived constructors, `super()` must be called before using `this`.
* `super.method()` calls a parent method.
* Parent methods still execute with the current instance as `this`.
* `super()` doesn't create a new object; it initializes the inherited part of the current object.

---

# 🎯 Golden Rules

1. `super()` → Parent constructor.
2. `super.method()` → Parent method.
3. Use `super()` before `this` in derived constructors.
4. `super()` is required only in derived classes that define their own constructor.

---

## 🚀 What's Next?

Only **two topics remain** to complete Module 9:

1. **`Object.create()` (Revisited for Inheritance)** – understanding it from a prototype and inheritance perspective.
2. **How Inheritance Works Internally** ⭐⭐⭐⭐⭐ – the complete end-to-end picture, including what happens during property lookup, `new`, `extends`, and `super`.

After that, we'll finish with **high-frequency interview questions and output-based problems** that combine everything from this module into real interview scenarios.
