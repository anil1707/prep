# Module 2 – Node.js Runtime & Internals ⭐⭐⭐⭐⭐

## Topics

1. V8
2. libuv
3. Call Stack
4. Event Loop
5. Callback Queue
6. Microtask Queue
7. Thread Pool
8. OS Operations
9. Node.js Execution Flow
10. How Asynchronous Operations Work Internally

---

# 1. Big Picture ⭐⭐⭐⭐⭐

```text
                    Node.js Application
                           │
                           ↓
                    JavaScript Code
                           │
                           ↓
                       V8 Engine
                           │
                           ↓
                      Call Stack
                           │
                           ↓
                     Node.js APIs
                           │
                           ↓
                         libuv
                           │
              ┌────────────┴────────────┐
              ↓                         ↓
          OS Operations             Thread Pool
              ↓                         ↓
        Network / Timers          FS / Crypto / DNS
              │                         │
              └────────────┬────────────┘
                           ↓
                     Event Loop
                           ↓
                  Queues / Callbacks
                           ↓
                      Call Stack
                           ↓
                     JavaScript
```

> **V8 executes JavaScript, while Node.js and libuv provide the mechanisms that allow JavaScript to interact asynchronously with the operating system.**

---

# 2. V8 ⭐⭐⭐⭐⭐

V8 is Google's JavaScript engine used by Node.js.

```text
JavaScript
    ↓
V8
    ↓
Execute JavaScript
```

V8 handles:

- Parsing
- Compilation
- JavaScript execution
- Memory management
- Garbage collection
- JIT/runtime optimization

Example:

```js
const a = 10;
const b = 20;

console.log(a + b);
```

V8 executes this JavaScript.

V8 itself does not provide Node-specific APIs such as:

```js
fs.readFile()
http.createServer()
process
Buffer
```

Those capabilities are provided by Node.js.

---

# 3. libuv ⭐⭐⭐⭐⭐

**libuv is a cross-platform C library used by Node.js for asynchronous I/O and event-loop infrastructure.**

It provides or helps with:

```text
Event Loop
Thread Pool
Timers
Asynchronous I/O coordination
Networking support
```

Think:

```text
V8
 ↓
Executes JavaScript

libuv
 ↓
Helps Node.js handle asynchronous operations
```

---

# 4. V8 + Node.js + libuv ⭐⭐⭐⭐⭐

```text
                 Node.js
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
         V8                 libuv
          ↓                   ↓
   JavaScript execution   Async infrastructure
```

### V8

```text
JavaScript execution
Call Stack
Garbage Collection
Optimization
```

### Node.js

Provides runtime APIs:

```text
fs
http
crypto
process
Buffer
timers
streams
```

### libuv

Provides/coordinates:

```text
Event Loop
Thread Pool
Async I/O infrastructure
Timers
Networking
```

---

# 5. Call Stack ⭐⭐⭐⭐⭐

The **Call Stack** keeps track of currently executing JavaScript functions.

Example:

```js
function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("Hello");
}

one();
```

Conceptually:

```text
one()
 ↓
two()
 ↓
three()
 ↓
console.log()
```

Stack:

```text
┌───────────────┐
│ console.log() │
├───────────────┤
│ three()       │
├───────────────┤
│ two()         │
├───────────────┤
│ one()         │
└───────────────┘
```

Functions are removed after they finish.

---

# 6. Stack Overflow

```js
function test() {
  test();
}

test();
```

Eventually:

```text
Maximum call stack size exceeded
```

because the stack keeps growing.

---

# 7. Synchronous Execution

```js
console.log("A");
console.log("B");
console.log("C");
```

Execution:

```text
A
 ↓
B
 ↓
C
```

Everything runs through the call stack.

---

# 8. What Happens with setTimeout()? ⭐⭐⭐⭐⭐

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output:

```text
A
C
B
```

Simplified flow:

```text
console.log("A")
      ↓
Call Stack
      ↓
Print A

setTimeout()
      ↓
Timer registered

console.log("C")
      ↓
Call Stack
      ↓
Print C

Timer becomes eligible
      ↓
Event Loop
      ↓
Callback
      ↓
Call Stack
      ↓
Print B
```

Important:

> `setTimeout(fn, 0)` does not mean "execute immediately". The callback becomes eligible after the timer threshold and is subject to event-loop scheduling.

---

# 9. Event Loop ⭐⭐⭐⭐⭐

The Event Loop coordinates asynchronous callbacks with the JavaScript execution thread.

```text
                 ┌──────────────┐
                 │  Call Stack  │
                 └──────┬───────┘
                        │
                        ↓
                 ┌──────────────┐
                 │ Node.js APIs │
                 └──────┬───────┘
                        │
                        ↓
               Async operation
                        │
              ┌─────────┴─────────┐
              ↓                   ↓
             OS              Thread Pool
              │                   │
              └─────────┬─────────┘
                        ↓
                    Completion
                        ↓
                    Event Loop
                        ↓
                  Callback / Task
                        ↓
                  Call Stack
```

The Event Loop is a mechanism, not simply a queue.

---

# 10. Node.js Event Loop Phases ⭐⭐⭐⭐⭐

Commonly discussed phases:

```text
timers
 ↓
pending callbacks
 ↓
idle / prepare
 ↓
poll
 ↓
check
 ↓
close callbacks
```

You should understand the major phases conceptually.

## Timers

Handles timer callbacks:

```js
setTimeout();
setInterval();
```

`1000ms` is a minimum delay before eligibility, not an exact execution guarantee.

## Pending Callbacks

Handles certain callbacks deferred to a later iteration.

## Poll

Important for I/O.

It can:

- Retrieve I/O events
- Execute I/O callbacks
- Wait for new I/O when appropriate

## Check

Executes callbacks registered with:

```js
setImmediate(() => {});
```

## Close Callbacks

Handles some close-related callbacks:

```js
socket.on("close", () => {});
```

---

# 11. Callback Queue ⭐⭐⭐⭐⭐

"Callback queue" is a simplified educational term.

Node.js is more accurately described as having multiple event-loop phases and queues.

Conceptually:

```text
Async operation completes
        ↓
Callback becomes eligible
        ↓
Event Loop
        ↓
Callback executes
```

Interview answer:

> The callback queue is a simplified concept representing callbacks waiting to execute. Internally, Node.js uses multiple queues and event-loop phases.

---

# 12. Microtask Queue ⭐⭐⭐⭐⭐

Microtasks have high priority relative to normal event-loop callbacks.

Examples:

```js
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()
```

Node.js also provides:

```js
process.nextTick()
```

which is handled through a special mechanism separate from the standard Promise microtask queue.

---

# 13. Promise vs Timer

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Output:

```text
A
D
C
B
```

Simplified flow:

```text
A
 ↓
Schedule timer
 ↓
Schedule Promise microtask
 ↓
D
 ↓
Current stack finishes
 ↓
Microtask
 ↓
C
 ↓
Timer callback
 ↓
B
```

Useful model:

```text
Synchronous code
      ↓
Microtasks
      ↓
Event-loop callbacks
```

---

# 14. process.nextTick() ⭐⭐⭐⭐⭐

```js
console.log("A");

process.nextTick(() => {
  console.log("B");
});

console.log("C");
```

Output:

```text
A
C
B
```

`process.nextTick()` callbacks are processed very early, before the event loop continues to later phases.

---

# 15. process.nextTick() vs Promise

```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("nextTick");
});

console.log("End");
```

Typical output:

```text
Start
End
nextTick
Promise
```

Useful interview model:

```text
Synchronous code
      ↓
process.nextTick queue
      ↓
Promise microtasks
      ↓
Event loop phases
```

Node.js has multiple scheduling points, so this should be treated as a useful mental model rather than a complete implementation specification.

---

# 16. Microtask Starvation ⭐⭐⭐⭐⭐

Continuously scheduling microtasks can delay normal event-loop work.

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
```

Conceptually:

```text
Microtask
   ↓
Microtask
   ↓
Microtask
   ↓
Microtask
   ↓
...
```

Similarly, excessive `process.nextTick()` usage can starve I/O.

---

# 17. Thread Pool ⭐⭐⭐⭐⭐

Node.js uses a libuv thread pool for certain operations.

Common examples:

```text
File system
Some DNS operations
Crypto
Compression
```

The default size is commonly:

```text
4
```

Configure it with:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

# 18. Not Every Async Operation Uses the Thread Pool ⭐⭐⭐⭐⭐

Incorrect:

> Every asynchronous operation goes to the thread pool.

Correct:

> Some operations use libuv's thread pool, while many network operations rely on operating-system asynchronous facilities.

Simplified:

```text
File system
→ Often thread pool

Some crypto
→ Thread pool

Some DNS
→ Thread pool

Network sockets
→ Generally OS async mechanisms
```

Exact behavior depends on the API and platform.

---

# 19. OS Operations ⭐⭐⭐⭐⭐

Node.js can delegate asynchronous work to the operating system.

For example:

```text
Node.js
   ↓
libuv
   ↓
OS networking APIs
   ↓
Network
```

This helps Node.js manage many network connections efficiently.

---

# 20. Network Request Flow

Conceptually:

```text
JavaScript
    ↓
fetch()
    ↓
Node.js networking layer
    ↓
OS networking facilities
    ↓
Internet
    ↓
Response
    ↓
Node.js / libuv
    ↓
Event Loop
    ↓
Promise continuation
    ↓
Microtask processing
    ↓
JavaScript
```

The exact internal implementation can vary by operation and platform.

---

# 21. File System Flow ⭐⭐⭐⭐⭐

```js
const fs = require("fs");

fs.readFile(
  "data.txt",
  "utf8",
  (err, data) => {
    console.log(data);
  }
);
```

Simplified:

```text
JavaScript
    ↓
fs.readFile()
    ↓
Node.js fs API
    ↓
libuv
    ↓
Thread Pool
    ↓
File System
    ↓
Operation complete
    ↓
Callback becomes eligible
    ↓
Event Loop
    ↓
Call Stack
    ↓
Callback executes
```

---

# 22. Node.js Execution Flow ⭐⭐⭐⭐⭐

Consider:

```js
const fs = require("fs");

console.log("1");

fs.readFile(
  "file.txt",
  "utf8",
  () => {
    console.log("2");
  }
);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

Expected order:

```text
1
4
3
2
```

### Flow

```text
1
 ↓
Start fs.readFile()
 ↓
Start Promise microtask
 ↓
4
 ↓
Current stack finishes
 ↓
Microtask → 3
 ↓
File operation completes later
 ↓
File callback → 2
```

---

# 23. Full Execution Model ⭐⭐⭐⭐⭐

```text
                    JavaScript
                        │
                        ↓
                  ┌───────────┐
                  │ Call Stack│
                  └─────┬─────┘
                        │
                        ↓
                   Node.js APIs
                        │
              ┌─────────┴─────────┐
              ↓                   ↓
             OS              Thread Pool
              │                   │
              └─────────┬─────────┘
                        ↓
                    Completion
                        │
                        ↓
                  Event Loop
                        │
          ┌─────────────┴─────────────┐
          ↓                           ↓
    Callback phases              Microtasks
          │                           │
          └─────────────┬─────────────┘
                        ↓
                   Call Stack
                        ↓
                   JavaScript
```

---

# 24. Synchronous vs Asynchronous

## Synchronous

```js
console.log("A");
console.log("B");
console.log("C");
```

```text
Call Stack
 ↓
A
 ↓
B
 ↓
C
```

## Asynchronous

```js
setTimeout(() => {
  console.log("B");
}, 0);

console.log("A");
```

```text
A
 ↓
Schedule timer
 ↓
Stack becomes empty
 ↓
Event Loop
 ↓
Callback
 ↓
B
```

---

# 25. Promise Internals – High-Level ⭐⭐⭐⭐⭐

```js
fetch("/users")
  .then(data => {
    console.log(data);
  });
```

Conceptually:

```text
fetch()
 ↓
Start async network operation
 ↓
JavaScript continues
 ↓
Network operation completes
 ↓
Promise settles
 ↓
.then() continuation becomes a microtask
 ↓
Microtask processing
 ↓
Callback executes
```

Important:

> Promise callbacks do not normally execute directly from the network completion event. They are scheduled for microtask processing after the relevant Promise settles.

---

# 26. Callback vs Promise

### Callback

```js
fs.readFile("file.txt", () => {
  console.log("Done");
});
```

### Promise

```js
fs.promises
  .readFile("file.txt")
  .then(() => {
    console.log("Done");
  });
```

Conceptually:

```text
Callback API
→ Callback becomes eligible for event-loop processing

Promise API
→ Promise continuation runs through microtask processing
```

---

# 27. async/await ⭐⭐⭐⭐⭐

```js
async function getData() {
  const data = await fetchData();

  console.log(data);
}
```

`await` does **not block the Node.js thread**.

Conceptually:

```text
async function starts
       ↓
fetchData()
       ↓
Promise pending
       ↓
async function pauses
       ↓
Event loop can process other work
       ↓
Promise resolves
       ↓
Continuation scheduled
       ↓
async function resumes
```

---

# 28. await Does Not Block the Event Loop

Incorrect:

> await blocks Node.js.

Correct:

> `await` pauses the current async function until the Promise settles; it does not block the JavaScript thread or event loop.

Other JavaScript work can execute while the Promise is pending.

---

# 29. CPU Work Is Different

```js
async function test() {
  await Promise.resolve();

  for (;;) {
    // CPU-heavy synchronous work
  }
}
```

The `await` is not the problem.

The synchronous CPU-heavy loop is:

```text
CPU-heavy JavaScript
        ↓
Call Stack
        ↓
Event Loop BLOCKED
```

---

# 30. Queue Priority ⭐⭐⭐⭐⭐

Useful simplified model:

```text
1. Current synchronous JavaScript
        ↓
2. process.nextTick queue
        ↓
3. Promise microtasks
        ↓
4. Event-loop phases/callbacks
```

Important:

> Node.js has multiple event-loop phases and internal queues, so "callback queue vs microtask queue" is an educational simplification rather than the complete implementation model.

---

# 31. Example: nextTick + Promise + Timer

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

process.nextTick(() => {
  console.log("D");
});

console.log("E");
```

Typical output:

```text
A
E
D
C
B
```

Reason:

```text
Synchronous
A
E
 ↓
nextTick
D
 ↓
Promise microtask
C
 ↓
Timer
B
```

---

# 32. Thread Pool vs Event Loop ⭐⭐⭐⭐⭐

They are different.

## Event Loop

Coordinates JavaScript callbacks and event-loop phases:

```text
Main JavaScript execution
        ↓
Event Loop
```

## Thread Pool

Performs certain native asynchronous operations:

```text
Thread Pool
 ├── Worker
 ├── Worker
 ├── Worker
 └── Worker
```

---

# 33. Does Thread Pool Execute JavaScript?

Normally, **no**.

Normal JavaScript executes on the main JavaScript thread.

The thread pool performs certain native operations.

After completion:

```text
Thread Pool
    ↓
Completion
    ↓
Event Loop
    ↓
Main JavaScript Thread
    ↓
Callback
```

---

# 34. Example: Crypto

```js
const crypto = require("crypto");

crypto.pbkdf2(
  "password",
  "salt",
  100000,
  64,
  "sha512",
  () => {
    console.log("Done");
  }
);
```

Conceptually:

```text
JavaScript
    ↓
crypto.pbkdf2()
    ↓
libuv Thread Pool
    ↓
Crypto operation
    ↓
Completion
    ↓
Event Loop
    ↓
Callback
```

---

# 35. Thread Pool Saturation ⭐⭐⭐⭐⭐

Suppose the pool has four workers:

```text
Task 1 → Worker 1
Task 2 → Worker 2
Task 3 → Worker 3
Task 4 → Worker 4
Task 5 → Waiting
Task 6 → Waiting
```

Extra tasks wait until a worker becomes available.

This can increase latency.

Increasing:

```bash
UV_THREADPOOL_SIZE
```

can help in some workloads, but blindly increasing it is not always beneficial.

---

# 36. Why Network Operations Usually Don't Need the Thread Pool

For network sockets, operating systems provide asynchronous networking mechanisms.

```text
Node.js
   ↓
libuv
   ↓
OS networking API
   ↓
Network
```

This allows many sockets to be managed without one thread per network request.

---

# 37. Complete Async Operation Flow ⭐⭐⭐⭐⭐

For a thread-pool-backed operation:

```text
1. JavaScript starts
       ↓
2. Function enters Call Stack
       ↓
3. Node.js API is called
       ↓
4. Node.js delegates operation
       ↓
5. libuv Thread Pool performs operation
       ↓
6. JavaScript Call Stack is free
       ↓
7. Other JavaScript work executes
       ↓
8. Thread-pool operation completes
       ↓
9. Callback becomes eligible
       ↓
10. Event Loop processes it
       ↓
11. Callback enters Call Stack
       ↓
12. JavaScript executes callback
```

For network I/O:

```text
JavaScript
 ↓
Node API
 ↓
libuv
 ↓
OS Networking
 ↓
Network
 ↓
Completion
 ↓
Event Loop
 ↓
Callback / Promise continuation
 ↓
JavaScript
```

---

# 38. Important Interview Questions

## What is the Call Stack?

> The call stack is a LIFO data structure used by the JavaScript engine to track currently executing function calls. Synchronous JavaScript executes on this stack, and a stack frame is removed when its function finishes.

## What is the Event Loop?

> The event loop is the mechanism that coordinates asynchronous operations and determines when callbacks and other tasks can execute on the JavaScript thread. Node.js uses libuv for its event-loop infrastructure.

## What is the Microtask Queue?

> The microtask queue contains high-priority asynchronous continuations such as Promise handlers and `queueMicrotask()` callbacks. Node.js also has the special `process.nextTick()` mechanism.

## What is the Callback Queue?

> "Callback queue" is a simplified term for callbacks waiting to execute. Internally, Node.js uses multiple event-loop phases and queues rather than one universal callback queue.

## Does every async operation use the Thread Pool?

> No. Some operations use libuv's thread pool, such as many filesystem operations and certain crypto/DNS operations. Network I/O generally uses operating-system asynchronous mechanisms instead of consuming a thread-pool worker for each connection.

## Does await block Node.js?

> No. `await` pauses the current async function until its Promise settles, but it does not block the JavaScript thread or event loop.

## What happens when a Promise resolves?

```text
Promise resolves
      ↓
.then / continuation scheduled
      ↓
Microtask processing
      ↓
Callback executes
```

---

# 39. Why Does Promise Run Before setTimeout(0)?

```js
setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});
```

Output:

```text
Promise
Timer
```

Because after the current synchronous execution completes, Promise reactions are processed as microtasks before the event loop proceeds to the timer callback.

---

# 40. Senior-Level Interview Answer ⭐⭐⭐⭐⭐

> Node.js executes JavaScript using the V8 engine on the main JavaScript thread. When JavaScript calls an asynchronous Node API, the operation is delegated according to its type. Network operations generally rely on operating-system asynchronous I/O through libuv, while certain operations such as filesystem, crypto, and some DNS work can use libuv's thread pool. The JavaScript thread is therefore free to continue executing other code. Once the operation completes, its callback becomes eligible for execution through the appropriate event-loop phase, or a Promise continuation is scheduled as a microtask. The event loop eventually allows that work to run on the main JavaScript thread. This is how Node.js provides concurrency without creating one JavaScript thread per request.

---

# 41. Complete Mental Model ⭐⭐⭐⭐⭐

```text
                       JavaScript
                           │
                           ↓
                     ┌───────────┐
                     │    V8     │
                     └─────┬─────┘
                           ↓
                     ┌───────────┐
                     │Call Stack │
                     └─────┬─────┘
                           ↓
                     Node.js APIs
                           │
              ┌────────────┴────────────┐
              ↓                         ↓
          OS Async I/O              libuv
              │                         │
       Network / OS APIs          Thread Pool
              │                         │
              └────────────┬────────────┘
                           ↓
                       Completion
                           ↓
                     Event Loop
                           │
               ┌───────────┴───────────┐
               ↓                       ↓
        Event-loop callbacks       Microtasks
               │                       │
               └───────────┬───────────┘
                           ↓
                      Call Stack
                           ↓
                      JavaScript
```

---

# 42. Quick Revision

```text
V8
→ Executes JavaScript

Call Stack
→ Executes synchronous JavaScript

Node.js APIs
→ Provide runtime capabilities

libuv
→ Event loop + async infrastructure + thread pool

Event Loop
→ Coordinates asynchronous callbacks

Callback Queue
→ Simplified concept for callbacks waiting for execution

Microtask Queue
→ Promise / queueMicrotask callbacks

process.nextTick
→ Special Node.js queue with very high priority

Thread Pool
→ Handles certain native operations

OS
→ Handles many networking operations asynchronously

Non-blocking
→ JS thread doesn't synchronously wait for I/O

Concurrency
→ Many operations can be in progress

Parallelism
→ Work executes simultaneously
```

---

# 43. Most Important Flows

## Normal synchronous code

```text
JavaScript
   ↓
V8
   ↓
Call Stack
   ↓
Execute
```

## Async file operation

```text
JavaScript
   ↓
Call Stack
   ↓
fs.readFile()
   ↓
Node.js
   ↓
libuv Thread Pool
   ↓
File System
   ↓
Completion
   ↓
Event Loop
   ↓
Callback
   ↓
Call Stack
   ↓
JavaScript
```

## Async network operation

```text
JavaScript
   ↓
Node.js API
   ↓
libuv
   ↓
OS Networking
   ↓
Network
   ↓
Completion
   ↓
Event Loop
   ↓
Callback / Promise continuation
   ↓
JavaScript
```

## Promise

```text
Async Operation
      ↓
Promise resolves
      ↓
Microtask
      ↓
.then() / await continuation
      ↓
JavaScript
```

---

# Module 2 Checklist

```text
✅ V8
✅ Node.js Runtime
✅ libuv
✅ Call Stack
✅ Stack Overflow
✅ Event Loop
✅ Event Loop Phases
✅ Timers
✅ Pending Callbacks
✅ Poll
✅ Check
✅ Close Callbacks
✅ Callback Queue
✅ Microtask Queue
✅ process.nextTick()
✅ Promise Scheduling
✅ Thread Pool
✅ Thread Pool Saturation
✅ OS Operations
✅ Network I/O
✅ File System I/O
✅ Crypto
✅ Node.js Execution Flow
✅ async/await Internals
✅ Non-blocking I/O
✅ Concurrency vs Parallelism
✅ Event Loop Blocking
✅ Interview Questions
```

# One-line Revision

```text
Node.js async model
=
V8
+
Call Stack
+
Node APIs
+
libuv
+
OS / Thread Pool
+
Event Loop
+
Microtasks
```

> **Node.js runs JavaScript primarily on one main thread, while V8 executes the JavaScript, Node.js provides runtime APIs, libuv coordinates asynchronous operations and the event loop, the OS or libuv thread pool performs the underlying work, and completed operations are scheduled back for execution on the JavaScript thread.**
