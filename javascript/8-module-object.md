# 📘 Module 8 – Objects (Revision Notes)

## 📖 What is an Object?

An object is a collection of **properties**, where each property consists of:

* **Key (Property Name)**
* **Value (Property Value)**

```js
const user = {
  name: "Anil",
  age: 27,
};
```

> **Method = A property whose value is a function.**

---

# Why Do We Need Objects?

Without objects:

```js
const name = "Anil";
const age = 27;
const city = "Mumbai";
```

With objects:

```js
const user = {
  name: "Anil",
  age: 27,
  city: "Mumbai",
};
```

Objects group related data together.

---

# Objects are Dynamic

```js
user.city = "Mumbai";   // Add property

delete user.city;       // Delete property
```

Objects can grow and shrink dynamically.

---

# Objects are Reference Types ⭐⭐⭐⭐⭐

Object variables store **references**, not actual objects.

```js
const obj1 = { name: "Anil" };
const obj2 = obj1;

obj2.name = "Rahul";

console.log(obj1.name);
```

**Output**

```text
Rahul
```

Memory:

```text
obj1 ─┐
      │
obj2 ─┘

↓

Same Heap Object
```

---

# Stack vs Heap

## Stack

Stores:

* Primitive values
* Execution Contexts
* References to objects

## Heap

Stores:

* Objects
* Arrays
* Functions
* Maps
* Sets

```text
Stack

user

↓

Reference

↓

Heap

Object
```

---

# Primitive vs Object

## Primitive

```js
let a = 10;
let b = a;

b = 20;
```

Independent values.

---

## Object

```js
const obj1 = { value: 10 };

const obj2 = obj1;

obj2.value = 20;
```

Both variables point to the same object.

---

# Object Equality

```js
{} === {}
```

```text
false
```

Different references.

```js
const obj2 = obj1;

obj1 === obj2;
```

```text
true
```

Same reference.

---

# Ways to Create Objects

## 1. Object Literal (Recommended)

```js
const user = {
  name: "Anil",
};
```

✔ Most common
✔ Readable

---

## 2. new Object()

```js
const user = new Object();

user.name = "Anil";
```

Equivalent to `{}`.

Rarely used.

---

## 3. Constructor Function

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

const user = new User("Anil", 27);
```

Used for creating multiple similar objects.

---

## 4. Object.create()

```js
const animal = {
  eats: true,
};

const dog = Object.create(animal);

dog.name = "Tommy";
```

Creates a new object whose prototype is `animal`.

✔ Doesn't copy properties.

---

## Property Lookup

```text
dog

↓

Property Found?

↓

No

↓

Prototype

↓

animal

↓

Found
```

---

## Property Shadowing

```js
const animal = {
  eats: true,
};

const dog = Object.create(animal);

dog.eats = false;
```

Own property hides prototype property.

---

## Object.getPrototypeOf()

```js
Object.getPrototypeOf(dog);
```

Returns the prototype.

---

## Object.create(null)

```js
const obj = Object.create(null);
```

Creates an object with **no prototype**.

Useful for dictionary-like objects.

---

# Object.assign()

```js
const copy = Object.assign({}, user);
```

Creates a **new top-level object**.

---

## Merge Objects

```js
Object.assign({}, obj1, obj2);
```

Later source overrides earlier source.

---

## Shallow Copy ⭐⭐⭐⭐⭐

```js
const user = {
  address: {
    city: "Mumbai",
  },
};

const copy = Object.assign({}, user);

copy.address.city = "Delhi";
```

Output

```text
Delhi
```

Only the top-level object is copied.

Nested object references are shared.

---

# Deep Copy ⭐⭐⭐⭐⭐

## 1. structuredClone() (Recommended)

```js
const copy = structuredClone(user);
```

Supports:

* Objects
* Arrays
* Date
* Map
* Set

Doesn't support:

* Functions
* DOM Nodes
* WeakMap
* WeakSet

---

## 2. JSON.parse(JSON.stringify())

```js
const copy = JSON.parse(JSON.stringify(user));
```

Limitations:

* Removes functions
* Removes `undefined`
* Converts `Date` to string
* Doesn't preserve `Map` / `Set`
* Doesn't handle circular references

---

## 3. Recursive Function

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    copy[key] = deepClone(obj[key]);
  }

  return copy;
}
```

---

## 4. lodash.cloneDeep()

```js
import cloneDeep from "lodash/cloneDeep";

const copy = cloneDeep(user);
```

---

# Shallow Copy vs Deep Copy

## Shallow Copy

* Copies only top-level properties
* Nested object references are shared

Examples

```js
Object.assign({}, obj);

{ ...obj }
```

---

## Deep Copy

* Copies every nested object
* No shared references

Examples

```js
structuredClone(obj);
```

---

# Property Descriptors ⭐⭐⭐⭐⭐

Every property has hidden metadata.

```text
Property

↓

value

writable

enumerable

configurable
```

---

## Get Descriptor

```js
Object.getOwnPropertyDescriptor(user, "name");
```

Returns

```js
{
  value: "Anil",
  writable: true,
  enumerable: true,
  configurable: true
}
```

---

## writable

```js
Object.defineProperty(user, "name", {
  value: "Anil",
  writable: false,
});
```

Cannot modify the value.

---

## enumerable

```js
Object.defineProperty(user, "name", {
  value: "Anil",
  enumerable: false,
});
```

Hidden from:

* `Object.keys()`
* `for...in`

---

## configurable

```js
Object.defineProperty(user, "name", {
  value: "Anil",
  configurable: false,
});
```

Cannot:

* Delete property
* Reconfigure descriptor

---

# Object.defineProperty()

```js
Object.defineProperty(user, "name", {
  value: "Anil",
  writable: false,
  enumerable: false,
  configurable: false,
});
```

Creates or modifies property descriptors.

> **Note:** Unspecified descriptor flags default to `false`.

---

# Object.freeze() ⭐⭐⭐⭐⭐

```js
Object.freeze(user);
```

Prevents:

* ❌ Adding properties
* ❌ Deleting properties
* ❌ Modifying properties

Internally:

* `writable = false`
* `configurable = false`
* Makes the object non-extensible

---

## Freeze is Shallow

```js
const user = {
  address: {
    city: "Mumbai",
  },
};

Object.freeze(user);

user.address.city = "Delhi";
```

Output

```text
Delhi
```

Nested objects remain mutable.

---

## Verify

```js
Object.isFrozen(user);
```

Returns

```text
true
```

---

# `Object.preventExtensions()`

Prevents adding **new properties** to an object.

```javascript
const user = {
    name: "Anil"
};

Object.preventExtensions(user);

user.age = 27;

console.log(user.age);
```

**Output**

```text
undefined
```

### Allowed

* ✅ Modify existing properties
* ✅ Delete existing properties

```javascript
const user = {
    name: "Anil"
};

Object.preventExtensions(user);

user.name = "Rahul";   // ✅

delete user.name;      // ✅
```

### Verify

```javascript
Object.isExtensible(user);
```

Returns

```text
false
```

---

# `Object.seal()`

`Object.seal()` prevents:

* ❌ Adding new properties
* ❌ Deleting existing properties

But allows:

* ✅ Modifying existing property values

```javascript
const user = {
    name: "Anil"
};

Object.seal(user);

user.name = "Rahul";   // ✅

delete user.name;      // ❌

user.age = 27;         // ❌
```

### Internally

* Calls `Object.preventExtensions()`
* Sets `configurable = false` for all existing properties

### Verify

```javascript
Object.isSealed(user);
```

Returns

```text
true
```

---

# Comparison

| Feature                | `preventExtensions()` | `seal()` | `freeze()` |
| ---------------------- | --------------------- | -------- | ---------- |
| Add New Property       | ❌                     | ❌        | ❌          |
| Delete Property        | ✅                     | ❌        | ❌          |
| Modify Existing Value  | ✅                     | ✅        | ❌          |
| `configurable = false` | ❌                     | ✅        | ✅          |
| `writable = false`     | ❌                     | ❌        | ✅          |

---

# Object Methods

## `Object.keys()`

Returns an array of **own enumerable property names**.

```javascript
const user = {
    name: "Anil",
    age: 27
};

Object.keys(user);
```

Output

```javascript
["name", "age"]
```

---

## `Object.values()`

Returns an array of **own enumerable property values**.

```javascript
Object.values(user);
```

Output

```javascript
["Anil", 27]
```

---

## `Object.entries()`

Returns an array of **key-value pairs**.

```javascript
Object.entries(user);
```

Output

```javascript
[
    ["name", "Anil"],
    ["age", 27]
]
```

Useful with destructuring:

```javascript
for (const [key, value] of Object.entries(user)) {
    console.log(key, value);
}
```

---

## `hasOwnProperty()`

Checks whether a property belongs **directly** to the object.

```javascript
const animal = {
    eats: true
};

const dog = Object.create(animal);

dog.name = "Tommy";

dog.hasOwnProperty("name");
```

Output

```text
true
```

```javascript
dog.hasOwnProperty("eats");
```

Output

```text
false
```

Because `eats` comes from the prototype.

---

# Quick Revision Table

| Method                       | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `Object.keys()`              | Returns own enumerable keys                              |
| `Object.values()`            | Returns own enumerable values                            |
| `Object.entries()`           | Returns own enumerable key-value pairs                   |
| `hasOwnProperty()`           | Checks whether a property belongs directly to the object |
| `Object.preventExtensions()` | Prevents adding new properties                           |
| `Object.seal()`              | Prevents adding and deleting properties                  |
| `Object.freeze()`            | Prevents adding, deleting, and modifying properties      |

---

# ⭐ Golden Rules

1. `Object.preventExtensions()` → **Cannot Add**
2. `Object.seal()` → **Cannot Add + Cannot Delete**
3. `Object.freeze()` → **Cannot Add + Cannot Delete + Cannot Modify**
4. `Object.keys()` returns **keys**.
5. `Object.values()` returns **values**.
6. `Object.entries()` returns **`[key, value]` pairs**.
7. `hasOwnProperty()` checks only **own properties**, not inherited ones.

# Common Interview Questions

### Why are objects called reference types?

Variables store references to heap objects.

---

### Why is `{} === {}` false?

Each object literal creates a different object with a different reference.

---

### Does Object.create() copy properties?

No.

It creates a prototype link.

---

### Does Object.assign() create a deep copy?

No.

It performs a shallow copy.

---

### What is a Property Descriptor?

Metadata that controls how a property behaves.

---

### What does Object.freeze() do?

* Prevents extensions
* Makes properties non-writable
* Makes properties non-configurable
* Performs a shallow freeze

---

# ⭐ Quick Revision Table

| Topic                     | Key Point                               |
| ------------------------- | --------------------------------------- |
| Object                    | Collection of key-value pairs           |
| Object Variable           | Stores a reference                      |
| Stack                     | Stores primitives & references          |
| Heap                      | Stores objects                          |
| Object Literal `{}`       | Preferred object creation               |
| `new Object()`            | Same as `{}`                            |
| Constructor Function      | Creates multiple similar objects        |
| `Object.create()`         | Creates object with specified prototype |
| `Object.assign()`         | Shallow copy / merge                    |
| Spread (`...`)            | Shallow copy                            |
| `structuredClone()`       | Deep copy                               |
| `value`                   | Actual property value                   |
| `writable`                | Controls modification                   |
| `enumerable`              | Controls enumeration                    |
| `configurable`            | Controls deletion & reconfiguration     |
| `Object.defineProperty()` | Defines property descriptors            |
| `Object.freeze()`         | Makes top-level object immutable        |

---

# 🎯 Golden Rules

1. Objects are **reference types**.
2. Variables store **references**, not actual objects.
3. `Object.create()` creates a **prototype link**, not a copy.
4. `Object.assign()` and spread (`...`) perform **shallow copies**.
5. `structuredClone()` performs a **deep copy**.
6. Every object property has a **descriptor**.
7. `Object.freeze()` performs a **shallow freeze**, not a deep freeze.
