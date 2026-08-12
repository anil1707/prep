# Module 3 – Node.js Event Loop ⭐⭐⭐⭐⭐

## Topics

- Event Loop Phases
- Timers
- Pending Callbacks
- Poll
- Check
- Close Callbacks
- `setTimeout`
- `setImmediate`
- `process.nextTick`
- Promise Microtasks
- Output-Based Questions

---

# 1. Event Loop – Big Picture

The Node.js Event Loop allows Node.js to perform non-blocking I/O while JavaScript executes primarily on one main thread.

```text
                JavaScript
                    ↓
                Call Stack
                    ↓
              Node.js APIs
                    ↓
             Async Operation
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
         OS              Thread Pool
          ↓                   ↓
          └─────────┬─────────┘
                    ↓
               Event Loop
                    ↓
              Callback / Task
                    ↓
                Call Stack
```

---

# 2. Event Loop Phases ⭐⭐⭐⭐⭐

The commonly discussed phases are:

```text
Timers
   ↓
Pending Callbacks
   ↓
Idle / Prepare
   ↓
Poll
   ↓
Check
   ↓
Close Callbacks
   ↓
Repeat
```

## Timers

Handles callbacks associated with:

```js
setTimeout()
setInterval()
```

## Pending Callbacks

Handles certain callbacks deferred to a later event-loop iteration.

## Poll

Important for I/O:

- Retrieves new I/O events
- Executes relevant I/O callbacks
- Can wait for new I/O when appropriate

## Check

Handles:

```js
setImmediate()
```

## Close Callbacks

Handles certain close-related callbacks.

---

# 3. Timers Phase ⭐⭐⭐⭐⭐

The timers phase handles:

```js
setTimeout()
setInterval()
```

Example:

```js
setTimeout(() => {
  console.log("Timer");
}, 1000);
```

Important:

> `1000ms` is a minimum delay/threshold before the callback becomes eligible. It is not a guarantee that the callback executes exactly after 1000ms.

If the event loop is busy, it can run later.

---

# 4. setTimeout() ⭐⭐⭐⭐⭐

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

Flow:

```text
A
 ↓
setTimeout registered
 ↓
C
 ↓
Current synchronous code finishes
 ↓
Timer becomes eligible
 ↓
Event Loop
 ↓
Callback
 ↓
B
```

Important:

> `setTimeout(fn, 0)` does not mean "execute immediately". The callback becomes eligible after the timer threshold and when the event loop gets an opportunity to process it.

---

# 5. Pending Callbacks Phase

The pending callbacks phase handles certain callbacks deferred to a later event-loop iteration.

For interviews:

> The pending callbacks phase handles certain system-level or I/O callbacks that were deferred to a later loop iteration.

Do not confuse it with the poll phase.

---

# 6. Poll Phase ⭐⭐⭐⭐⭐

The poll phase is one of the most important phases.

It is responsible for:

- Retrieving new I/O events
- Executing relevant I/O callbacks
- Waiting for new I/O when appropriate

Examples:

```text
Network
File system
Sockets
Other asynchronous I/O
```

Conceptually:

```text
             Poll
              ↓
       Check I/O events
              ↓
       I/O available?
          ↙       ↘
        Yes        No
         ↓          ↓
    Execute       Wait /
    callbacks     continue
```

---

# 7. Check Phase ⭐⭐⭐⭐⭐

The check phase executes callbacks registered with:

```js
setImmediate(() => {
  console.log("Immediate");
});
```

Therefore:

```text
setImmediate()
→ Check phase
```

---

# 8. Close Callbacks Phase

The close callbacks phase handles certain close events.

Example:

```js
socket.on("close", () => {
  console.log("Socket closed");
});
```

---

# 9. setTimeout() vs setImmediate() ⭐⭐⭐⭐⭐

```text
setTimeout()
→ Timers phase

setImmediate()
→ Check phase
```

Example:

```js
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});
```

From the **main module**, the relative order can vary depending on timing and environment.

Possible:

```text
timeout
immediate
```

or:

```text
immediate
timeout
```

Do not memorize:

```text
setTimeout always runs first
```

That is incorrect.

---

# 10. setTimeout() vs setImmediate() Inside I/O ⭐⭐⭐⭐⭐

Very common interview question:

```js
const fs = require("fs");

fs.readFile("file.txt", () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);

  setImmediate(() => {
    console.log("immediate");
  });
});
```

Typical output:

```text
immediate
timeout
```

Flow:

```text
I/O callback
    ↓
Poll
    ↓
Check
    ↓
setImmediate
    ↓
immediate
    ↓
Next iteration
    ↓
Timers
    ↓
timeout
```

Therefore:

> Inside an I/O callback, `setImmediate()` generally executes before `setTimeout(fn, 0)`.

---

# 11. process.nextTick() ⭐⭐⭐⭐⭐

Node.js provides:

```js
process.nextTick()
```

Important:

> `process.nextTick()` is not an event-loop phase. It uses a special Node.js queue that is processed with very high priority.

Example:

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

---

# 12. Promise Microtasks ⭐⭐⭐⭐⭐

Promise callbacks are microtasks.

```js
Promise.resolve().then(() => {
  console.log("Promise");
});
```

Other microtasks include:

```js
queueMicrotask(() => {});
Promise.resolve().then(() => {});
```

Microtasks are processed with high priority relative to normal event-loop callbacks.

---

# 13. process.nextTick() vs Promise ⭐⭐⭐⭐⭐

```js
console.log("A");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("B");
```

Output:

```text
A
B
nextTick
Promise
```

Useful mental model:

```text
Synchronous code
      ↓
process.nextTick()
      ↓
Promise microtasks
      ↓
Event loop
```

Important:

> `process.nextTick()` is not technically the same queue as Promise microtasks. Node.js processes its next-tick queue with special priority.

---

# 14. Microtasks vs Event Loop ⭐⭐⭐⭐⭐

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

Simplified flow:

```text
Synchronous code finishes
        ↓
Promise microtasks
        ↓
Promise
        ↓
Event loop
        ↓
Timer
```

---

# 15. Output Question #1 ⭐⭐⭐⭐⭐

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

Answer:

```text
A
E
D
C
B
```

Reason:

```text
Synchronous → A E
nextTick    → D
Microtask   → C
Timer       → B
```

---

# 16. Output Question #2 ⭐⭐⭐⭐⭐

```js
setTimeout(() => {
  console.log("A");
}, 0);

setImmediate(() => {
  console.log("B");
});
```

From the main module, the order is not guaranteed.

Possible:

```text
A
B
```

or:

```text
B
A
```

---

# 17. Output Question #3 ⭐⭐⭐⭐⭐

```js
const fs = require("fs");

fs.readFile("file.txt", () => {
  setTimeout(() => {
    console.log("A");
  }, 0);

  setImmediate(() => {
    console.log("B");
  });
});
```

Typical order:

```text
B
A
```

---

# 18. Output Question #4

```js
console.log("1");

Promise.resolve().then(() => {
  console.log("2");
});

console.log("3");
```

Output:

```text
1
3
2
```

---

# 19. Output Question #5

```js
console.log("1");

process.nextTick(() => {
  console.log("2");
});

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

Output:

```text
1
4
2
3
```

---

# 20. Output Question #6 ⭐⭐⭐⭐⭐

```js
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("promise");
});
```

Guaranteed initial order:

```text
nextTick
promise
```

Then:

```text
timeout / immediate
```

The relative order of timer and immediate from the main module can vary.

Possible:

```text
nextTick
promise
timeout
immediate
```

or:

```text
nextTick
promise
immediate
timeout
```

---

# 21. Output Question #7 – Nested Microtasks ⭐⭐⭐⭐⭐

```js
Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});
```

Output:

```text
A
C
B
```

Initial microtask queue:

```text
[A callback]
[C callback]
```

After A runs:

```text
[C callback]
[B callback]
```

Final:

```text
A
C
B
```

---

# 22. Output Question #8 – nextTick Inside Promise

```js
Promise.resolve().then(() => {
  console.log("A");

  process.nextTick(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});
```

Output:

```text
A
C
B
```

Important lesson:

> Do not blindly apply a simplistic "nextTick always immediately beats every Promise" rule to nested scheduling situations. The current microtask processing continues before the newly scheduled next-tick callback gets its next opportunity.

---

# 23. Output Question #9 – setImmediate Inside Timer

```js
setTimeout(() => {
  console.log("A");

  setImmediate(() => {
    console.log("B");
  });
}, 0);
```

Output:

```text
A
B
```

Flow:

```text
Timers
 ↓
A
 ↓
setImmediate scheduled
 ↓
Check phase
 ↓
B
```

---

# 24. Output Question #10 – Timer Inside Immediate

```js
setImmediate(() => {
  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 0);
});
```

Typically:

```text
A
B
```

Flow:

```text
Check phase
 ↓
A
 ↓
Timer scheduled
 ↓
Later timer processing
 ↓
B
```

---

# 25. Microtask Starvation ⭐⭐⭐⭐⭐

Continuously scheduling microtasks can delay normal event-loop work.

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
```

Similarly:

```js
function loop() {
  process.nextTick(loop);
}

loop();
```

can starve I/O.

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

Therefore:

> Microtasks and `process.nextTick()` should not be abused for long-running recursive scheduling.

---

# 26. setImmediate() vs process.nextTick()

| `process.nextTick()` | `setImmediate()` |
|---|---|
| Special Node.js queue | Check phase |
| Very high priority | Event-loop phase |
| Runs before normal event-loop callbacks | Runs during check |
| Can starve I/O if abused | Allows event loop to progress |
| Not a timer | Not a timer |

---

# 27. setTimeout() vs setImmediate() vs nextTick() ⭐⭐⭐⭐⭐

Remember:

```text
process.nextTick()
        ↓
Special high-priority Node.js queue

Promise microtask
        ↓
Microtask queue

setTimeout()
        ↓
Timers phase

setImmediate()
        ↓
Check phase
```

But:

> `setTimeout(0)` vs `setImmediate()` ordering depends on context. In an I/O callback, `setImmediate()` generally runs before `setTimeout(0)`.

---

# 28. Main Module vs I/O Callback ⭐⭐⭐⭐⭐

## Main module

```js
setTimeout(..., 0);
setImmediate(...);
```

Order:

```text
Not guaranteed
```

## Inside I/O callback

```js
fs.readFile(..., () => {
  setTimeout(..., 0);
  setImmediate(...);
});
```

Order:

```text
setImmediate
setTimeout
```

This distinction is frequently tested.

---

# 29. Event Loop + Microtasks Mental Model

```text
              Current JavaScript
                     ↓
                Call Stack
                     ↓
              Stack becomes empty
                     ↓
        ┌────────────┴────────────┐
        ↓                         ↓
   nextTick queue          Promise microtasks
        ↓                         ↓
        └────────────┬────────────┘
                     ↓
                Event Loop
                     ↓
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
    Timers          Poll          Check
       ↓             ↓             ↓
  setTimeout       I/O        setImmediate
```

This is a mental model, not a literal single-queue implementation.

---

# 30. Interview: Explain Event Loop Phases

Strong answer:

> Node.js's event loop is implemented through libuv and is divided into several phases. The commonly discussed phases are timers, pending callbacks, idle/prepare, poll, check, and close callbacks. Timers handle timer callbacks, poll handles I/O-related work, check handles `setImmediate()` callbacks, and close callbacks handle certain resource-closing events. Node.js also has a special `process.nextTick()` mechanism and Promise microtasks that are processed with high priority relative to normal event-loop callbacks.

---

# 31. Interview: setTimeout vs setImmediate

> `setTimeout()` schedules a callback for the timers phase after its delay threshold, while `setImmediate()` schedules a callback for the check phase. When both are scheduled from the main module, their order can vary. When scheduled inside an I/O callback, `setImmediate()` generally executes before `setTimeout(..., 0)`.

---

# 32. Interview: process.nextTick vs Promise

> Both are processed before normal event-loop callbacks, but `process.nextTick()` uses a special Node.js queue with higher priority than the standard Promise microtask queue. Excessive use of either can delay I/O.

---

# 33. Interview: Why Does setTimeout(0) Not Run Immediately?

> `setTimeout(..., 0)` schedules the callback for the timers phase after the timer threshold has been reached. It does not execute immediately because the current synchronous execution must finish and the event loop must reach the appropriate phase.

---

# 34. Interview: Why Does Promise Execute Before Timer?

```js
setTimeout(() => console.log("timer"), 0);

Promise.resolve().then(() => console.log("promise"));
```

Output:

```text
promise
timer
```

Because Promise reactions are microtasks and are processed before normal event-loop callbacks such as the timer.

---

# 35. Senior-Level Event Loop Answer ⭐⭐⭐⭐⭐

If asked:

**"Explain the Node.js event loop in detail."**

> Node.js uses libuv to implement its event-loop infrastructure. The loop processes phases such as timers, pending callbacks, poll, check, and close callbacks. `setTimeout()` callbacks are associated with the timers phase, while `setImmediate()` callbacks run in the check phase. Node.js also has a special `process.nextTick()` mechanism and standard Promise microtasks that are processed with high priority relative to normal event-loop callbacks. Asynchronous I/O may be handled by the operating system or by libuv's thread pool depending on the operation. Once asynchronous work completes, its callback or Promise continuation is scheduled, and the event loop eventually allows it to execute on the main JavaScript thread.

---

# 36. Output Question Strategy ⭐⭐⭐⭐⭐

When you see an output question:

### Step 1 — Execute synchronous code

```text
console.log()
normal function calls
```

### Step 2 — Identify `process.nextTick()`

```text
nextTick queue
```

### Step 3 — Identify Promise microtasks

```text
.then()
.catch()
.finally()
queueMicrotask()
```

### Step 4 — Identify event-loop callbacks

```text
setTimeout()
setInterval()
setImmediate()
I/O callbacks
```

### Step 5 — Check the context

Ask:

```text
Main module?
I/O callback?
Timer callback?
Immediate callback?
```

This is especially important for:

```text
setTimeout vs setImmediate
```

---

# 37. Quick Revision Table

| API / Concept | Where / When |
|---|---|
| `process.nextTick()` | Special high-priority Node.js queue |
| `Promise.then()` | Promise microtask |
| `queueMicrotask()` | Microtask |
| `setTimeout()` | Timers phase |
| `setInterval()` | Timers phase |
| I/O callbacks | Relevant event-loop processing, especially poll |
| `setImmediate()` | Check phase |
| Close callbacks | Close callbacks phase |

---

# 38. Most Important Output Rules ⭐⭐⭐⭐⭐

```text
1. Synchronous code runs first.

2. process.nextTick() has very high priority.

3. Promise callbacks are microtasks.

4. Microtasks run before normal event-loop callbacks.

5. setTimeout() → timers phase.

6. setImmediate() → check phase.

7. setTimeout(0) does NOT mean immediate.

8. setTimeout(0) vs setImmediate() from the main
   module is not guaranteed.

9. Inside an I/O callback, setImmediate() generally
   runs before setTimeout(0).

10. Excessive nextTick/microtasks can starve the event loop.
```

---

# 39. Final Mental Model ⭐⭐⭐⭐⭐

```text
                ┌────────────────────┐
                │ Synchronous JS     │
                └─────────┬──────────┘
                          ↓
                    Call Stack
                          ↓
                    Stack Empty
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
        process.nextTick         Promise Microtasks
              ↓                       ↓
              └───────────┬───────────┘
                          ↓
                     Event Loop
                          ↓
        ┌─────────┬───────┼───────┬─────────┐
        ↓         ↓       ↓       ↓         ↓
     Timers    Pending   Poll    Check    Close
        ↓       Calls            ↓
  setTimeout                 setImmediate
```

### One-line revision

> **Synchronous JavaScript runs first; Node's `process.nextTick()` and Promise microtasks are processed with high priority; then the event loop moves through phases such as timers, poll, check, and close callbacks, where APIs like `setTimeout()` and `setImmediate()` are handled according to their respective phases.**

---

# Module 3 Checklist

```text
✅ Event Loop
✅ Event Loop Phases
✅ Timers
✅ Pending Callbacks
✅ Poll
✅ Check
✅ Close Callbacks
✅ setTimeout()
✅ setImmediate()
✅ process.nextTick()
✅ Promise Microtasks
✅ setTimeout vs setImmediate
✅ nextTick vs Promise
✅ I/O callback behavior
✅ Nested microtasks
✅ Microtask starvation
✅ Event-loop starvation
✅ Output-based questions
✅ Interview questions
```

# One-Line Revision

```text
Node.js Event Loop
=
Timers
+
Pending Callbacks
+
Poll
+
Check
+
Close
+
nextTick
+
Promise Microtasks
```
