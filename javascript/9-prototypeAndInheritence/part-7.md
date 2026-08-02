# Module 9 – Prototype & Inheritance

# Part 9 – `extends` ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Suppose we have an `Animal` class.

```javascript
class Animal {

    eat() {
        console.log("Eating...");
    }

}
```

Now we want a `Dog` class that can also use `eat()`.

Instead of rewriting the method, we write:

```javascript
class Dog extends Animal {

}
```

Now:

```javascript
const dog = new Dog();

dog.eat();
```

Output

```text
Eating...
```

Question:

Where did `eat()` come from?

---

# What does `extends` do?

Many developers think:

```text
Animal

↓

Copy methods

↓

Dog
```

❌ Wrong.

Nothing is copied.

Instead:

```text
Dog.prototype

↓

[[Prototype]]

↓

Animal.prototype
```

A **prototype link** is created.

---

# Example

```javascript
class Animal {

    eat() {
        console.log("Eating...");
    }

}

class Dog extends Animal {

}

const dog = new Dog();

dog.eat();
```

Output

```text
Eating...
```

---

# Internal Working

Conceptually:

```text
Dog Instance

↓

Dog.prototype

↓

Animal.prototype

↓

Object.prototype

↓

null
```

When JavaScript executes:

```javascript
dog.eat();
```

It searches:

```text
dog

↓

eat ?

↓

No

↓

Dog.prototype

↓

eat ?

↓

No

↓

Animal.prototype

↓

Found

↓

Execute
```

This is simply the **prototype chain**.

---

# Adding Child Methods

```javascript
class Animal {

    eat() {
        console.log("Eating...");
    }

}

class Dog extends Animal {

    bark() {
        console.log("Woof!");
    }

}
```

Now:

```javascript
const dog = new Dog();

dog.eat();

dog.bark();
```

Output

```text
Eating...

Woof!
```

Search for `bark()`:

```text
dog

↓

Dog.prototype

↓

Found
```

Search for `eat()`:

```text
dog

↓

Dog.prototype

↓

Not Found

↓

Animal.prototype

↓

Found
```

---

# Method Overriding

Suppose both classes define the same method.

```javascript
class Animal {

    speak() {
        console.log("Animal Sound");
    }

}

class Dog extends Animal {

    speak() {
        console.log("Bark");
    }

}
```

```javascript
const dog = new Dog();

dog.speak();
```

Output

```text
Bark
```

Why?

Search:

```text
dog

↓

Dog.prototype

↓

Found

↓

Stop
```

JavaScript never continues to the parent once it finds a matching property.

---

# Prototype Chain

```text
Dog Instance

↓

Dog.prototype

↓

Animal.prototype

↓

Object.prototype

↓

null
```

Notice:

Methods are **shared**, not copied.

---

# Verify

```javascript
class Animal {}

class Dog extends Animal {}

console.log(
    Object.getPrototypeOf(Dog.prototype) === Animal.prototype
);
```

Output

```text
true
```

This confirms that `Dog.prototype` inherits from `Animal.prototype`.

---

# Another Relationship

Classes are functions.

So the constructor functions are also linked:

```javascript
class Animal {}

class Dog extends Animal {}

console.log(
    Object.getPrototypeOf(Dog) === Animal
);
```

Output

```text
true
```

There are actually **two prototype chains**:

1. **Instance chain**

```text
dog

↓

Dog.prototype

↓

Animal.prototype
```

2. **Constructor (class) chain**

```text
Dog

↓

Animal

↓

Function.prototype
```

---

# Visual Representation

```text
             Dog (Function)
                  │
                  ▼
              Animal (Function)
                  │
                  ▼
          Function.prototype


dog Instance
      │
      ▼
Dog.prototype
      │
      ▼
Animal.prototype
      │
      ▼
Object.prototype
      │
      ▼
null
```

---

# Common Mistakes

### ❌ Mistake 1

Thinking `extends` copies methods.

It doesn't.

It creates prototype links.

---

### ❌ Mistake 2

Thinking inheritance duplicates memory.

Methods remain shared on prototype objects.

---

### ❌ Mistake 3

Thinking only objects participate in inheritance.

Classes (constructor functions) also have their own prototype chain.

---

# Interview Questions

### Q1. What does `extends` do?

It links the child class to the parent class using the prototype system.

---

### Q2. Does `extends` copy methods?

No.

Methods are shared through the prototype chain.

---

### Q3. Why can `Dog` use `eat()`?

Because `Dog.prototype` inherits from `Animal.prototype`.

---

### Q4. What happens when a child overrides a method?

JavaScript finds the method on `Dog.prototype` first and stops searching.

---

# 🔥 Interview Question

Predict the output.

```javascript
class Animal {

    eat() {
        console.log("Eating");
    }

}

class Dog extends Animal {}

const dog = new Dog();

console.log(
    dog.eat === Animal.prototype.eat
);
```

Output

```text
true
```

Explanation:

`dog.eat` is resolved through the prototype chain and refers to the same function stored on `Animal.prototype`.

---

# 🧠 Mental Model

Whenever you see:

```javascript
class Dog extends Animal {}
```

Think:

```text
Dog.prototype

↓

[[Prototype]]

↓

Animal.prototype
```

Not:

```text
Copy Animal methods

↓

Dog
```

Nothing is copied.

Everything is shared through prototype links.

---

# 📝 Summary

* `extends` creates inheritance using the prototype chain.
* Methods are not copied.
* `Dog.prototype` inherits from `Animal.prototype`.
* Overridden methods are found first and stop the lookup.
* Classes are functions, so constructor functions also have their own prototype chain.

---

## 🚀 What's Next?

Next we'll learn **`super`** ⭐⭐⭐⭐⭐.

We'll answer:

* Why is `super()` required?
* What does `super()` actually do?
* Why must `super()` be called before using `this` in a derived class?
* How does `super.method()` work internally?

This is another favorite interview topic and completes the ES6 inheritance story.
