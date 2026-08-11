# Module 1 – Introduction to Node.js

## Topics

1. What is Node.js?
2. Why Node.js?
3. Node.js vs Browser JavaScript
4. Node.js Architecture
5. V8 Engine
6. libuv
7. Single-threaded Nature
8. Non-blocking I/O
9. Event-driven Architecture
10. Where Node.js is Suitable / Not Suitable

---

# 1. What is Node.js? ⭐⭐⭐⭐⭐

**Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser.**

```text
JavaScript
    ↓
Node.js
    ↓
V8 Engine + Node APIs + libuv
    ↓
Operating System
```

Node.js is:

```text
JavaScript → Language
Node.js    → Runtime
Express    → Web Framework
```

Example:

```js
console.log("Hello Node.js");
```

Run it with:

```bash
node app.js
```

---

# 2. Why Node.js? ⭐⭐⭐⭐⭐

Node.js is particularly strong for applications involving a lot of **I/O operations**:

```text
Database
Network
HTTP
File system
External APIs
```

Its major strengths are:

```text
Event-driven
+
Non-blocking I/O
+
Asynchronous programming
```

This allows Node.js to handle many concurrent I/O operations efficiently.

---

# 3. Node.js vs Browser JavaScript ⭐⭐⭐⭐⭐

Both use JavaScript, but the runtime environment is different.

| Browser | Node.js |
|---|---|
| Runs JavaScript in browser | Runs JavaScript outside browser |
| Browser APIs | Node.js APIs |
| DOM available | DOM not available by default |
| `window` | `global` / `globalThis` |
| `document` | Not available by default |
| Browser storage APIs | No browser `localStorage` by default |
| `fs` unavailable | `fs` available |
| Can manipulate DOM | Cannot manipulate DOM |
| Browser security sandbox | Server/OS capabilities |

Important:

> JavaScript is the language. The runtime determines which APIs and environment capabilities are available.

---

# 4. Node.js Architecture ⭐⭐⭐⭐⭐

```text
             JavaScript Code
                    ↓
               Node.js APIs
                    ↓
              ┌───────────┐
              │ V8 Engine │
              └─────┬─────┘
                    ↓
             Event Loop
                    ↓
                libuv
             ↙          ↘
       OS APIs       Thread Pool
             ↘          ↙
                Operating
                  System
```

Practical view:

```text
Application
     ↓
Node.js APIs
     ↓
V8 + Node internals
     ↓
libuv
     ↓
OS / Network / Thread Pool
```

---

# 5. V8 Engine ⭐⭐⭐⭐⭐

**V8 is Google's JavaScript engine.**

Node.js uses V8 to execute JavaScript.

```text
JavaScript Code
      ↓
V8
      ↓
Machine Code
      ↓
CPU
```

V8 handles:

- Parsing JavaScript
- Compiling JavaScript
- Executing JavaScript
- Memory management
- Garbage collection
- Runtime optimization

V8 itself does not provide Node-specific APIs such as:

```text
File system
HTTP server
TCP sockets
Operating system access
```

Node.js provides these capabilities around the JavaScript engine.

---

# 6. V8 vs Node.js ⭐⭐⭐⭐⭐

### V8

```text
JavaScript Engine
```

### Node.js

```text
JavaScript Runtime Environment
```

Node.js uses V8.

```text
Node.js
 ├── V8
 ├── libuv
 ├── Node APIs
 └── Other native components
```

**Interview answer:**

> V8 executes JavaScript, while Node.js provides the runtime environment and APIs around the JavaScript engine.

---

# 7. libuv ⭐⭐⭐⭐⭐

**libuv is a cross-platform C library used by Node.js for asynchronous I/O and the event loop.**

It provides or helps with:

```text
Event loop
Asynchronous I/O
Thread pool
Timers
Networking
File system operations
```

Simplified:

```text
JavaScript
    ↓
Node.js
    ↓
libuv
    ↓
OS / Thread Pool
```

Important:

> Not every asynchronous operation is executed by the libuv thread pool. Depending on the operation and platform, Node.js may use operating-system asynchronous mechanisms or libuv's thread pool.

---

# 8. Node.js Thread Pool ⭐⭐⭐⭐

libuv maintains a thread pool for certain operations.

The default size is commonly:

```text
4 threads
```

It can be configured using:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

Don't confuse this with JavaScript execution.

Normal JavaScript executes on the main JavaScript thread.

---

# 9. Single-threaded Nature ⭐⭐⭐⭐⭐

Node.js is often described as **single-threaded**, but this needs clarification.

JavaScript normally executes on one main thread:

```text
JavaScript
     ↓
Main Thread
     ↓
Event Loop
```

However, Node.js can also use:

```text
libuv Thread Pool
Worker Threads
Operating System asynchronous mechanisms
Multiple processes
```

Therefore:

> Node.js is not limited to one thread.

**Strong interview answer:**

> Node.js executes JavaScript primarily on a single main thread using an event loop, while asynchronous operations can be handled by the operating system, libuv, or worker threads depending on the operation.

---

# 10. Why Single-threaded?

A single JavaScript execution thread provides a relatively simple execution model.

However:

> CPU-heavy synchronous JavaScript can block the event loop.

Example:

```js
while (true) {
}
```

The event loop cannot process other JavaScript work while this runs.

---

# 11. Event Loop ⭐⭐⭐⭐⭐

The event loop coordinates when asynchronous callbacks/tasks can be processed by the JavaScript thread.

Simplified:

```text
          JavaScript
              ↓
          Event Loop
              ↓
       ┌──────┴──────┐
       ↓             ↓
   Immediate      Async I/O
                     ↓
                 OS/libuv
                     ↓
                 Completion
                     ↓
                 Event Loop
                     ↓
                JavaScript
```

---

# 12. Simple Event Loop Example

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timer
```

Synchronous JavaScript executes first.

A `0ms` timer does not mean "execute immediately"; it becomes eligible after its delay and is processed according to event-loop scheduling.

---

# 13. Non-blocking I/O ⭐⭐⭐⭐⭐

I/O means **Input/Output**.

Examples:

```text
Database
File system
Network
HTTP
DNS
```

Example:

```js
const fs = require("fs");

fs.readFile(
  "data.txt",
  "utf8",
  (err, data) => {
    console.log(data);
  }
);

console.log("Reading started");
```

Possible output:

```text
Reading started
file contents
```

The JavaScript thread does not synchronously wait for the file operation.

---

# 14. Blocking vs Non-blocking

## Blocking

```text
Request
 ↓
Database
 ↓
WAIT
 ↓
Response
```

## Non-blocking

```text
Request
 ↓
Start database operation
 ↓
Continue other work
 ↓
Database finishes
 ↓
Completion handled
```

The JavaScript thread can continue processing other work while I/O is pending.

---

# 15. Event-driven Architecture ⭐⭐⭐⭐⭐

Node.js uses an event-driven programming model.

Instead of continuously asking:

```text
"Is the operation finished?"
```

you register what should happen when an event occurs.

Example:

```js
server.on("request", () => {
  console.log("Request received");
});
```

Basic model:

```text
Event
 ↓
Listener
 ↓
Handler
```

---

# 16. Node.js HTTP Server Example

```js
const http = require("http");

const server = http.createServer(
  (req, res) => {
    res.end("Hello");
  }
);

server.listen(3000);
```

Conceptually:

```text
Incoming Request
      ↓
Request Event
      ↓
Callback
      ↓
Response
```

---

# 17. How Node.js Handles Many Requests ⭐⭐⭐⭐⭐

Imagine:

```text
Request A → Database
Request B → Database
Request C → External API
Request D → File
```

Node.js doesn't need:

```text
Thread A → Request A
Thread B → Request B
Thread C → Request C
Thread D → Request D
```

Instead:

```text
          Event Loop
              ↓
     ┌────────┼────────┐
     ↓        ↓        ↓
     DB       API     File
     ↓        ↓        ↓
     └────────┼────────┘
              ↓
         Completion
              ↓
          Event Loop
```

This enables high I/O concurrency.

---

# 18. Concurrency vs Parallelism ⭐⭐⭐⭐⭐

## Concurrency

Multiple tasks can make progress during overlapping periods.

Node.js achieves high I/O concurrency using asynchronous operations and the event loop.

## Parallelism

Multiple tasks literally execute at the same time on different CPU cores/threads.

Node.js can use:

```text
Worker Threads
Multiple Processes
Cluster
External Services
```

Important:

```text
Asynchronous ≠ Parallel
```

---

# 19. Why Node.js Can Be Fast

Node.js can be fast for I/O-heavy workloads because of:

```text
V8
+
Event Loop
+
Non-blocking I/O
+
Efficient asynchronous APIs
```

But:

> Node.js is not automatically fast for every workload.

CPU-heavy JavaScript can block the main thread.

---

# 20. CPU-bound vs I/O-bound ⭐⭐⭐⭐⭐

## I/O-bound

Application spends significant time waiting for:

```text
Database
Network
File system
External APIs
```

Node.js is generally a strong choice.

## CPU-bound

Application spends significant time calculating:

```text
Large mathematical operations
Video encoding
Image processing
Large data transformations
Machine learning
Complex algorithms
```

CPU-heavy synchronous JavaScript can block the event loop.

---

# 21. Where Node.js Is Suitable ⭐⭐⭐⭐⭐

### REST APIs

```text
React
 ↓
Node.js API
 ↓
Database
```

### Real-time Applications

```text
Chat
Notifications
Live dashboards
Collaborative applications
```

Technologies:

```text
WebSocket
Socket.IO
```

### Streaming

```text
Video
Audio
Large files
```

### API Gateway / BFF

```text
Frontend
 ↓
Node.js
 ↓
Multiple backend services
```

### Microservices

Node.js works well for lightweight network services.

### I/O-heavy Applications

```text
Database
Network
External APIs
File operations
```

---

# 22. Where Node.js Is Not Ideal ⭐⭐⭐⭐⭐

Node.js is not ideal when the application is dominated by CPU-heavy synchronous work on the main JavaScript thread.

Examples:

```text
Heavy scientific calculations
Large CPU-intensive transformations
Some video processing workloads
Large image processing workloads
Complex ML computation
```

However, Node.js can handle CPU-heavy work using:

```text
Worker Threads
Child Processes
Multiple Processes / Cluster
External Services
Native modules
```

---

# 23. Worker Threads

For CPU-heavy JavaScript:

```text
Main Thread
    ↓
Worker Thread
    ↓
CPU-heavy computation
```

Example:

```js
const {
  Worker
} = require("worker_threads");
```

Purpose:

> Prevent CPU-intensive JavaScript from blocking the main event loop.

Worker Threads are generally unnecessary for normal database or HTTP operations.

---

# 24. Request Lifecycle ⭐⭐⭐⭐⭐

Suppose React calls:

```text
GET /users
```

Simplified:

```text
Browser
   ↓
HTTP Request
   ↓
Node.js Server
   ↓
Express Route Handler
   ↓
Database Query
   ↓
Async Operation
   ↓
Node.js continues handling other work
   ↓
Database completes
   ↓
Event Loop
   ↓
Callback / Continuation
   ↓
Response
   ↓
Browser
```

---

# 25. Node.js Doesn't Make Database Queries Faster

A database query may still take:

```text
100ms
500ms
2 seconds
```

Node.js's advantage is that the JavaScript thread does not synchronously block waiting for an asynchronous result.

---

# 26. Common Misconceptions

## "Node.js is single-threaded so it can't handle multiple requests."

Incorrect.

Node.js can handle many concurrent requests because I/O operations are asynchronous.

## "Async means parallel."

Incorrect.

```text
Asynchronous ≠ Parallel
```

## "libuv handles everything."

Incorrect.

```text
V8
→ JavaScript execution

Node APIs
→ Runtime functionality

libuv
→ Event loop + async I/O infrastructure + thread pool

OS
→ Underlying system/network capabilities
```

The exact mechanism depends on the operation and platform.

---

# 27. Node.js vs Traditional Thread-per-Request Servers

Traditional model:

```text
Request 1 → Thread 1
Request 2 → Thread 2
Request 3 → Thread 3
Request 4 → Thread 4
```

Node.js model:

```text
Requests
   ↓
Event Loop
   ↓
Asynchronous Operations
   ↓
Completion
   ↓
Event Loop
```

This can reduce the overhead associated with maintaining a dedicated application thread for every request.

---

# 28. Event Loop Blocking ⭐⭐⭐⭐⭐

Bad example:

```js
app.get("/heavy", (req, res) => {
  let total = 0;

  for (
    let i = 0;
    i < 10_000_000_000;
    i++
  ) {
    total += i;
  }

  res.send(String(total));
});
```

While this synchronous JavaScript runs:

```text
Event Loop
    ↓
BLOCKED
```

Other requests can be delayed.

---

# 29. How to Avoid Blocking

Possible approaches:

```text
Worker Threads
Child Processes
Multiple Processes / Cluster
Move computation to another service
Use asynchronous APIs where appropriate
Optimize the algorithm
```

The correct choice depends on the workload.

---

# 30. Interview: Why Is Node.js Single-threaded?

> JavaScript execution in Node.js primarily occurs on a single main thread, which provides a relatively simple execution model. Node.js achieves concurrency through the event loop and asynchronous I/O rather than creating a separate JavaScript thread for every request. Under the hood, libuv and the operating system can handle asynchronous operations, and Node.js also provides worker threads and multiple processes for workloads that require additional parallelism.

---

# 31. Interview: Explain Node.js Architecture

> Node.js uses the V8 JavaScript engine to execute JavaScript. Node.js provides runtime APIs such as HTTP, filesystem and streams. libuv provides the event loop and asynchronous I/O infrastructure, including a thread pool for certain operations. JavaScript callbacks and continuations execute on the main thread through the event loop, while appropriate I/O work is handled by the operating system or libuv. This event-driven, non-blocking architecture allows Node.js to handle many concurrent I/O operations efficiently.

---

# 32. Interview: Why Is Node.js Good for APIs?

> APIs are typically I/O-heavy. A request may spend most of its time waiting for a database, external service, or network operation. Node.js uses non-blocking I/O, so the main JavaScript thread can continue processing other requests instead of synchronously waiting for each I/O operation to finish.

---

# 33. Interview: Is Node.js Really Single-threaded?

> The JavaScript execution model is primarily single-threaded, but Node.js itself isn't limited to one thread. It uses the event loop on the main JavaScript thread, libuv's thread pool for certain operations, and can also use worker threads and multiple processes when needed.

---

# 34. Interview: V8 vs libuv

## V8

```text
JavaScript execution
Memory management
Garbage collection
Optimization
```

## libuv

```text
Event loop
Asynchronous I/O infrastructure
Thread pool
Timers/networking support
```

Simple:

```text
V8    → JavaScript execution
libuv → Async/event infrastructure
```

---

# 35. Interview: What Happens When Node.js Receives a Request?

```text
Request
 ↓
Node HTTP layer
 ↓
Route handler
 ↓
Start async operation
 ↓
Event loop remains available
 ↓
Operation completes
 ↓
Callback/continuation becomes runnable
 ↓
Event loop executes it
 ↓
Response
```

---

# 36. Complete Node.js Architecture ⭐⭐⭐⭐⭐

```text
                 Node.js Application
                         │
                         ↓
                  Node.js APIs
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
          V8 Engine                libuv
             ↓                       │
      Execute JavaScript             │
                                     ↓
                              ┌─────────────┐
                              │ Event Loop  │
                              └──────┬──────┘
                                     │
                        ┌────────────┼────────────┐
                        ↓            ↓            ↓
                       OS        Thread Pool   Networking
                        │            │            │
                        └────────────┴────────────┘
                                     ↓
                                  Completion
                                     ↓
                                Event Loop
                                     ↓
                               JavaScript
```

---

# 37. Node.js Mental Model ⭐⭐⭐⭐⭐

```text
             NODE.JS
                │
       ┌────────┴────────┐
       ↓                 ↓
      V8               libuv
       │                 │
 JavaScript          Event Loop
 execution          Async I/O
                         │
                    Thread Pool
                         │
                         OS
```

And:

```text
Single JS Thread
        +
Event Loop
        +
Non-blocking I/O
        =
High I/O Concurrency
```

---

# 38. Node.js in a React + Express Stack

Typical application:

```text
React
  ↓
HTTP
  ↓
Express
  ↓
Node.js
  ↓
Service Layer
  ↓
Database
```

More accurately:

```text
React
  ↓
HTTP Request
  ↓
Express
  ↓
Node.js Runtime
  ↓
Service Layer
  ↓
Database / External APIs
```

---

# 39. Quick Revision

```text
Node.js
→ JavaScript runtime outside the browser

V8
→ JavaScript engine

libuv
→ Event loop + asynchronous I/O infrastructure

Event Loop
→ Coordinates asynchronous work/callback execution

Single-threaded
→ JavaScript executes primarily on one main thread

Non-blocking I/O
→ Don't synchronously wait for I/O on the JS thread

Event-driven
→ Operations trigger callbacks/events when completed

Concurrency
→ Many operations can be in progress

Parallelism
→ Work executes simultaneously

Worker Threads
→ CPU-intensive JavaScript work

Best for
→ I/O-heavy applications

Less suitable
→ CPU-heavy synchronous workloads
```

---

# 40. ⭐ Most Important Interview Points

```text
1. Node.js is a JavaScript runtime, not a language or framework.

2. V8 executes JavaScript.

3. libuv provides the event loop and asynchronous I/O
   infrastructure.

4. JavaScript runs primarily on one main thread, but Node.js
   can use OS async mechanisms, a libuv thread pool,
   worker threads, and multiple processes.

5. Node.js is excellent for I/O-heavy applications because
   of its event-driven, non-blocking architecture.
```

---

# Module 1 Checklist

```text
✅ What is Node.js?
✅ Why Node.js?
✅ Node.js vs Browser JavaScript
✅ Node.js Architecture
✅ V8 Engine
✅ V8 vs Node.js
✅ libuv
✅ libuv Thread Pool
✅ Event Loop
✅ Single-threaded Nature
✅ Non-blocking I/O
✅ Event-driven Architecture
✅ Concurrency vs Parallelism
✅ CPU-bound vs I/O-bound
✅ Worker Threads
✅ Event Loop Blocking
✅ Request Lifecycle
✅ Suitable Use Cases
✅ Unsuitable Use Cases
✅ Common Misconceptions
✅ Interview Questions
```

# One-line Revision

```text
Node.js
=
V8
+
Node APIs
+
libuv
+
Event Loop
+
Non-blocking I/O
```

**Key idea:**

```text
Node.js executes JavaScript primarily on one main thread,
but uses asynchronous I/O mechanisms to handle many
concurrent operations efficiently.
```
