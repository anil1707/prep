# Module 15 – Memory Management ⭐⭐⭐⭐

## Introduction

JavaScript automatically manages memory using a **Garbage Collector (GC)**. Understanding memory management helps you write efficient applications and avoid memory leaks.

---

# Stack Memory

## What is Stack Memory?

Stack Memory stores:

* Primitive values (`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`)
* Function Execution Contexts
* References (addresses) to objects stored in the Heap

### Characteristics

* Fast
* Fixed size
* LIFO (Last In, First Out)
* Automatically managed

### Example

```javascript id="sxtjlwm"
let a = 10;
let b = "Hello";
```

Memory:

```text id="s5uugj"
Stack

a = 10
b = "Hello"
```

---

# Heap Memory

## What is Heap Memory?

Heap stores:

* Objects
* Arrays
* Functions
* Map
* Set
* Date
* RegExp

### Characteristics

* Large
* Dynamic
* Slower than Stack

### Example

```javascript id="zjlwmm"
const user = {
    name: "Anil"
};
```

Memory:

```text id="cvgb8j"
Stack

user
 │
 ▼

Heap

{
   name: "Anil"
}
```

Only the **reference** is stored in the Stack.

---

# Stack vs Heap

| Stack             | Heap                  |
| ----------------- | --------------------- |
| Stores primitives | Stores objects        |
| Stores references | Stores actual objects |
| Fast              | Slower                |
| Fixed size        | Dynamic size          |
| LIFO              | No ordering           |

---

# Garbage Collection (GC)

## What is Garbage Collection?

Garbage Collection is the automatic process of removing **unreachable objects** from memory.

Example:

```javascript id="1cg0tw"
let user = {
    name: "Anil"
};

user = null;
```

The object has no remaining references, so it becomes eligible for garbage collection.

---

# Reachability

An object is **reachable** if it can be accessed from a root.

Root objects include:

* Global variables
* Local variables
* Active function execution contexts

Reachable → Keep

Unreachable → Remove

---

# Mark and Sweep Algorithm

Modern JavaScript engines (like V8) primarily use the **Mark and Sweep** algorithm.

## Step 1 – Mark

Start from root objects and mark everything that is reachable.

```text id="7jlwm9"
Global Variable

↓

Object

↓

Nested Objects
```

---

## Step 2 – Sweep

Remove everything that was **not marked**.

```text id="rjlwm7"
Reachable

↓

Keep

----------------

Unreachable

↓

Delete
```

---

# Strong Reference

A **strong reference** keeps an object alive.

```javascript id="xjlwm5"
let user = {
    name: "Anil"
};
```

As long as a strong reference exists, the object cannot be garbage collected.

---

# Weak Reference

A **weak reference** does **not** keep an object alive.

If an object has **no strong references**, the Garbage Collector can remove it even if it is referenced by a `WeakMap` or `WeakSet`.

---

# WeakMap

A `WeakMap` stores:

* Object keys only
* Weak references

```javascript id="djlwm4"
const wm = new WeakMap();

let user = {};

wm.set(user, "Developer");

user = null;
```

The object and its WeakMap entry become eligible for garbage collection.

### Why Use WeakMap?

* Cache objects
* Store metadata
* Avoid memory leaks

---

# WeakSet

A `WeakSet` stores:

* Objects only
* Weak references

```javascript id="tjlwm3"
const ws = new WeakSet();

let obj = {};

ws.add(obj);

obj = null;
```

The object becomes eligible for garbage collection.

---

# Map vs WeakMap

| Map               | WeakMap          |
| ----------------- | ---------------- |
| Any key           | Object keys only |
| Strong references | Weak references  |
| Iterable          | Not iterable     |
| Has `size`        | No `size`        |

---

# Set vs WeakSet

| Set               | WeakSet             |
| ----------------- | ------------------- |
| Stores any value  | Stores objects only |
| Strong references | Weak references     |
| Iterable          | Not iterable        |
| Has `size`        | No `size`           |

---

# Memory Leak

## What is a Memory Leak?

A memory leak occurs when memory is **no longer needed** but is **still reachable**, so the Garbage Collector cannot free it.

---

## Common Causes

### 1. Global Variables

```javascript id="jlwm2d"
let cache = [];

function add() {
    cache.push(new Array(1000000));
}
```

---

### 2. Event Listeners

```javascript id="jlwm1e"
window.addEventListener("resize", handler);
```

Always remove listeners when no longer needed.

```javascript id="ljlwm1"
window.removeEventListener("resize", handler);
```

---

### 3. Timers

```javascript id="jlwm0a"
const id = setInterval(() => {
    console.log("Running");
}, 1000);

clearInterval(id);
```

---

### 4. Closures

```javascript id="jlwm9a"
function outer() {
    const bigData = new Array(1000000);

    return function () {
        console.log(bigData.length);
    };
}
```

The closure keeps `bigData` alive as long as the returned function exists.

---

# Common Interview Questions

### Where are primitive values stored?

Stack.

---

### Where are objects stored?

Heap.

---

### What does Garbage Collection remove?

Unreachable objects.

---

### Which algorithm does V8 use?

Mark and Sweep.

---

### What is a Weak Reference?

A reference that does **not** prevent garbage collection.

---

### Why use WeakMap?

To associate data with objects without preventing them from being garbage collected.

---

### What is a Memory Leak?

Memory that is no longer useful but remains reachable, so it cannot be reclaimed.

---

# Golden Rules

1. Stack stores primitives, execution contexts, and object references.
2. Heap stores objects, arrays, and functions.
3. JavaScript uses automatic Garbage Collection.
4. Garbage Collector removes unreachable objects.
5. Modern engines use the Mark and Sweep algorithm.
6. Strong references keep objects alive.
7. Weak references do not prevent garbage collection.
8. WeakMap stores object keys with weak references.
9. WeakSet stores objects with weak references.
10. Event listeners, timers, global variables, and closures are common sources of memory leaks.

---

# Quick Revision

```text id="wjlwm8"
Stack
↓

Primitives
Execution Context
References

----------------

Heap
↓

Objects
Arrays
Functions

----------------

Garbage Collection
↓

Mark

↓

Sweep

----------------

WeakMap
↓

Weak Object Keys

----------------

WeakSet
↓

Weak Object Values

----------------

Memory Leak
↓

Reachable but Unused Memory
```
