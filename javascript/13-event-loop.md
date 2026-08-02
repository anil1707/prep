# Module 14 – Event Loop ⭐⭐⭐⭐⭐ (Quick Revision)

## JavaScript Runtime

```text
JavaScript Runtime

├── JavaScript Engine
│   ├── Call Stack
│   └── Heap
│
├── Web APIs (Browser / Node.js)
│   ├── setTimeout
│   ├── fetch
│   ├── DOM APIs
│   └── Event Listeners
│
├── Microtask Queue
├── Macrotask Queue
├── Rendering
└── Event Loop
```

---

# Call Stack

* Executes synchronous JavaScript.
* Stores **Execution Contexts**.
* Follows **LIFO (Last In, First Out)**.
* One function executes at a time.
* Infinite recursion → **Maximum call stack size exceeded**.

```javascript
function A() {
    B();
}

function B() {
    console.log("Hello");
}

A();
```

Execution:

```text
Push A
↓

Push B
↓

Pop B
↓

Pop A
```

---

# Heap

Stores reference types:

* Objects
* Arrays
* Functions

The Call Stack stores **references**, not the objects themselves.

---

# Web APIs

Provided by the runtime (Browser/Node.js), **not JavaScript**.

Examples:

* `setTimeout()`
* `setInterval()`
* `fetch()`
* `addEventListener()`
* `localStorage`

---

# Microtask Queue (High Priority)

Contains:

* `Promise.then()`
* `Promise.catch()`
* `Promise.finally()`
* `queueMicrotask()`
* `MutationObserver`

---

# Macrotask Queue (Task Queue)

Contains:

* `setTimeout()`
* `setInterval()`
* DOM Events
* `postMessage()`
* `MessageChannel`

---

# Rendering

The browser gets a **rendering opportunity** only after:

* Current synchronous code finishes.
* All pending microtasks complete.

Rendering never interrupts JavaScript execution.

---

# Event Loop

The Event Loop coordinates asynchronous execution.

Algorithm:

```text
Execute Synchronous Code
        ↓
Call Stack Empty?
        ↓
Execute ALL Microtasks
        ↓
Render Opportunity
        ↓
Execute ONE Macrotask
        ↓
Repeat
```

---

# Execution Flow

```text
JavaScript

↓

Call Stack

↓

Web APIs

↓

Queues

↓

Event Loop

↓

Call Stack
```

---

# Queue Priority

```text
Synchronous Code

↓

ALL Microtasks

↓

Render Opportunity

↓

ONE Macrotask

↓

Repeat
```

---

# setTimeout()

```javascript
setTimeout(() => {
    console.log("Hello");
}, 0);
```

* Browser handles the timer.
* Callback enters the **Macrotask Queue**.
* Executes only after:

  * Call Stack is empty.
  * All Microtasks finish.

---

# Promise

```javascript
Promise.resolve().then(() => {
    console.log("Hello");
});
```

* Callback enters the **Microtask Queue**.
* Executes before any Macrotask.

---

# Most Common Output

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
Promise
Timeout
```

Reason:

```text
Synchronous

↓

Microtask

↓

Macrotask
```

---

# Nested Microtask

```javascript
Promise.resolve().then(() => {

    console.log("A");

    Promise.resolve().then(() => {
        console.log("B");
    });

});

setTimeout(() => {
    console.log("C");
}, 0);
```

Output:

```text
A
B
C
```

Reason:

New microtasks are executed **before** moving to the next macrotask.

---

# Golden Rules

1. JavaScript is **single-threaded**.
2. The **Call Stack** executes synchronous code.
3. Web APIs handle asynchronous work.
4. Promise callbacks go to the **Microtask Queue**.
5. Timer callbacks go to the **Macrotask Queue**.
6. The Event Loop waits until the Call Stack is empty.
7. **All Microtasks** execute before **one Macrotask**.
8. New microtasks created while draining the queue are executed immediately.
9. Rendering happens after microtasks complete.
10. `setTimeout(0)` does **not** execute immediately.

---

# Common Interview Questions

### Is `setTimeout()` part of JavaScript?

❌ No. It is provided by the runtime (Browser/Node.js).

---

### Why does `Promise.then()` execute before `setTimeout()`?

Because Promise callbacks are **Microtasks**, which have higher priority than Macrotasks.

---

### Does `setTimeout(0)` execute immediately?

No.

It waits for:

* Current synchronous code
* All pending microtasks
* The Event Loop

---

### What does the Event Loop do?

It monitors the Call Stack and moves callbacks from queues to the Call Stack when it becomes empty.

---

### Can Microtasks delay rendering?

Yes.

If microtasks continuously schedule more microtasks, rendering can be delayed (microtask starvation).

---

# Memory Tricks

```text
Call Stack
↓

ALL Microtasks
↓

Render Opportunity
↓

ONE Macrotask
↓

Repeat
```

```text
Promise  → Microtask

setTimeout → Macrotask
```

```text
Web APIs

↓

Queues

↓

Event Loop

↓

Call Stack
```
