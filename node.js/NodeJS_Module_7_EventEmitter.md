# Module 7 – EventEmitter ⭐⭐⭐⭐⭐

## Topics

- `EventEmitter`
- `on()`
- `once()`
- `emit()`
- `removeListener()`
- Custom Events
- Real-world Use Cases

---

# 1. What is EventEmitter?

`EventEmitter` is a class provided by Node.js that allows objects to:

1. Register listeners for an event.
2. Emit/trigger events.
3. Execute registered listeners when the event occurs.

Import it:

```js
const EventEmitter = require("events");
```

Basic flow:

```text
Event occurs
     ↓
emit()
     ↓
EventEmitter
     ↓
Registered listeners
     ↓
Callbacks execute
```

---

# 2. Basic EventEmitter Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User logged in");
});

emitter.emit("login");
```

Output:

```text
User logged in
```

Mental model:

```text
on()
 ↓
Register listener

emit()
 ↓
Trigger event
```

---

# 3. `on()` ⭐⭐⭐⭐⭐

`on()` registers a listener for an event.

```js
emitter.on(eventName, listener);
```

Example:

```js
emitter.on("message", () => {
  console.log("Message received");
});
```

Whenever:

```js
emitter.emit("message");
```

is called, the listener executes.

---

# 4. Multiple Listeners

You can register multiple listeners for the same event.

```js
emitter.on("login", () => {
  console.log("Create session");
});

emitter.on("login", () => {
  console.log("Send analytics");
});

emitter.on("login", () => {
  console.log("Update last login");
});

emitter.emit("login");
```

Output:

```text
Create session
Send analytics
Update last login
```

Listeners are normally called in registration order.

---

# 5. Passing Data with `emit()` ⭐⭐⭐⭐⭐

You can pass arguments when emitting an event.

```js
emitter.on("login", (username) => {
  console.log(`${username} logged in`);
});

emitter.emit("login", "Anil");
```

Output:

```text
Anil logged in
```

Multiple arguments:

```js
emitter.on("userCreated", (id, name, email) => {
  console.log(id);
  console.log(name);
  console.log(email);
});

emitter.emit(
  "userCreated",
  101,
  "Anil",
  "anil@example.com"
);
```

Prefer passing an object when the event has several pieces of data:

```js
emitter.emit("userCreated", {
  id: 101,
  name: "Anil",
  email: "anil@example.com"
});
```

Listener:

```js
emitter.on("userCreated", (user) => {
  console.log(user.id);
  console.log(user.name);
  console.log(user.email);
});
```

---

# 6. `once()` ⭐⭐⭐⭐⭐

`once()` registers a listener that executes only one time.

```js
emitter.once("connection", () => {
  console.log("Connected");
});
```

Now:

```js
emitter.emit("connection");
emitter.emit("connection");
emitter.emit("connection");
```

Output:

```text
Connected
```

The listener is automatically removed after its first execution.

---

# 7. `on()` vs `once()`

| `on()` | `once()` |
|---|---|
| Executes every time event occurs | Executes only once |
| Listener remains registered | Listener is automatically removed |
| Used for recurring events | Used for one-time events |

Example:

```js
emitter.on("message", handler);
```

```text
message → handler
message → handler
message → handler
```

With:

```js
emitter.once("message", handler);
```

```text
message → handler
message → nothing
message → nothing
```

---

# 8. `emit()` ⭐⭐⭐⭐⭐

`emit()` triggers an event.

```js
emitter.emit(eventName, ...args);
```

Example:

```js
emitter.on("orderCreated", () => {
  console.log("Order created");
});

emitter.emit("orderCreated");
```

Think:

```text
on()
 ↓
Subscribe

emit()
 ↓
Publish / Trigger
```

---

# 9. Return Value of `emit()`

`emit()` returns a Boolean.

```js
const result = emitter.emit("login");

console.log(result);
```

It returns:

```text
true
```

if at least one listener is registered for the event.

Otherwise:

```text
false
```

Example:

```js
const emitter = new EventEmitter();

console.log(emitter.emit("login"));
```

Output:

```text
false
```

---

# 10. `removeListener()` ⭐⭐⭐⭐⭐

Used to remove a specific event listener.

```js
function loginHandler() {
  console.log("User logged in");
}

emitter.on("login", loginHandler);

emitter.removeListener(
  "login",
  loginHandler
);
```

After removal:

```js
emitter.emit("login");
```

The handler will not execute.

---

# 11. `off()` Alternative

Modern Node.js also provides:

```js
emitter.off("login", loginHandler);
```

`off()` is an alias for removing a listener.

So these are equivalent:

```js
emitter.removeListener(
  "login",
  loginHandler
);
```

and:

```js
emitter.off(
  "login",
  loginHandler
);
```

---

# 12. Important Rule When Removing Listeners ⭐⭐⭐⭐⭐

You need the same function reference.

Correct:

```js
function handler() {
  console.log("Hello");
}

emitter.on("message", handler);

emitter.removeListener(
  "message",
  handler
);
```

This does not remove the original listener:

```js
emitter.on("message", () => {
  console.log("Hello");
});

emitter.removeListener("message", () => {
  console.log("Hello");
});
```

Why?

Because these are two different function objects.

---

# 13. Custom Events ⭐⭐⭐⭐⭐

You can create your own application-specific events.

```js
const EventEmitter = require("events");

const appEvents = new EventEmitter();

appEvents.on("userRegistered", (user) => {
  console.log("User registered:", user.name);
});

appEvents.emit("userRegistered", {
  id: 1,
  name: "Anil"
});
```

Here:

```text
"userRegistered"
```

is a custom event.

Good event names:

```text
userCreated
userUpdated
userDeleted

orderCreated
orderPaid
orderCancelled

paymentSucceeded
paymentFailed
```

Prefer names that describe what happened.

---

# 14. Custom Event – Order System

```js
const EventEmitter = require("events");

const orderEvents = new EventEmitter();

orderEvents.on("orderCreated", () => {
  console.log("Send confirmation email");
});

orderEvents.on("orderCreated", () => {
  console.log("Update analytics");
});

orderEvents.on("orderCreated", () => {
  console.log("Update inventory");
});

orderEvents.emit("orderCreated", {
  id: 101,
  amount: 500
});
```

Flow:

```text
create order
     ↓
emit("orderCreated")
     ↓
 ┌──────────────┬──────────────┐
 ↓              ↓              ↓
Email        Analytics      Inventory
```

---

# 15. Extending EventEmitter ⭐⭐⭐⭐⭐

A common pattern is creating a class that extends `EventEmitter`.

```js
const EventEmitter = require("events");

class OrderService extends EventEmitter {

  createOrder(order) {
    console.log("Creating order...");

    this.emit("orderCreated", order);
  }
}
```

Use it:

```js
const orderService = new OrderService();

orderService.on("orderCreated", (order) => {
  console.log("Order created:", order.id);
});

orderService.createOrder({
  id: 101
});
```

Why extend it?

It allows your class to expose events such as:

```text
orderCreated
orderUpdated
orderCancelled
```

---

# 16. Real-World Use Case – User Registration ⭐⭐⭐⭐⭐

Suppose:

```js
registerUser();
```

After registration, several things need to happen:

```text
User registered
     ↓
 ┌──────────────┬─────────────┬──────────────┐
 ↓              ↓             ↓
Email         Analytics    Notification
```

Instead of putting everything inside `registerUser()`:

```js
async function registerUser() {
  // Create user

  // Send email

  // Analytics

  // Notification
}
```

emit an event:

```js
userEvents.emit("userRegistered", user);
```

Listeners:

```js
userEvents.on("userRegistered", sendWelcomeEmail);
userEvents.on("userRegistered", trackAnalytics);
userEvents.on("userRegistered", sendNotification);
```

This creates a more decoupled design.

---

# 17. Real-World Use Case – Order Processing

```text
Order created
      ↓
orderCreated event
      ↓
 ┌────┴──────────┬───────────┐
 ↓               ↓           ↓
Inventory       Email      Analytics
```

Example:

```js
orderEvents.on("orderCreated", updateInventory);
orderEvents.on("orderCreated", sendEmail);
orderEvents.on("orderCreated", trackOrder);
```

---

# 18. Real-World Use Case – Notifications

```js
notificationEvents.on(
  "notificationCreated",
  (notification) => {
    console.log(
      "Send notification:",
      notification.message
    );
  }
);
```

Trigger:

```js
notificationEvents.emit(
  "notificationCreated",
  {
    userId: 101,
    message: "Your order has shipped"
  }
);
```

---

# 19. Real-World Use Case – File Processing

A file-processing service could emit:

```text
uploadStarted
uploadProgress
uploadCompleted
uploadFailed
```

Example:

```js
fileEvents.on(
  "uploadCompleted",
  (file) => {
    console.log(
      "Upload completed:",
      file.name
    );
  }
);
```

---

# 20. Real-World Use Case – Logging

```js
appEvents.emit("requestCompleted", {
  method: "GET",
  path: "/users",
  duration: 120
});
```

Listener:

```js
appEvents.on(
  "requestCompleted",
  (request) => {
    console.log(
      `${request.method} ${request.path}`
    );
  }
);
```

---

# 21. Real-World Use Case – Server Lifecycle

A server can expose lifecycle events:

```text
serverStarting
serverStarted
serverError
serverStopping
serverStopped
```

These can be used for:

```text
Logging
Metrics
Cleanup
Monitoring
```

---

# 22. EventEmitter is Synchronous ⭐⭐⭐⭐⭐

Important interview point.

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("message", () => {
  console.log("Listener");
});

console.log("Before");

emitter.emit("message");

console.log("After");
```

Output:

```text
Before
Listener
After
```

By default, listeners execute **synchronously** when `emit()` is called.

Mental model:

```text
emit()
  ↓
listener runs now
  ↓
emit() returns
```

---

# 23. EventEmitter Does Not Automatically Make Code Asynchronous

This is a common misconception.

```js
emitter.on("event", () => {
  console.log("Listener");
});

emitter.emit("event");

console.log("Done");
```

Output:

```text
Listener
Done
```

It does not mean:

```text
emit()
 ↓
background thread
 ↓
listener later
```

If the listener performs expensive synchronous work:

```js
emitter.on("event", () => {
  expensiveSynchronousWork();
});
```

it can block the event loop.

---

# 24. Making Listener Work Asynchronous

You can explicitly schedule asynchronous work:

```js
emitter.on("event", () => {
  setImmediate(() => {
    console.log("Async work");
  });
});
```

Important:

> EventEmitter itself is not a background job queue.

For heavy or durable background processing, use an appropriate queue/worker architecture.

---

# 25. EventEmitter vs Promise ⭐⭐⭐⭐⭐

They solve different problems.

### Promise

Represents:

```text
One eventual result
```

Example:

```js
const user = await getUser();
```

### EventEmitter

Represents:

```text
Multiple occurrences of an event
```

Example:

```js
emitter.on("message", handler);
```

| Promise | EventEmitter |
|---|---|
| Usually one eventual result | Can emit repeatedly |
| Represents completion/failure | Represents events |
| `.then()` / `catch()` | `on()` / `emit()` |
| Good for async operation result | Good for event notifications |

---

# 26. EventEmitter vs Callback ⭐⭐⭐⭐⭐

Callback:

```js
getUser((err, user) => {
  // result
});
```

Usually communicates the result of one operation.

EventEmitter:

```js
emitter.on("userCreated", handler);
```

Can notify multiple listeners and can emit the event multiple times.

---

# 27. EventEmitter vs WebSocket

Do not confuse them.

### EventEmitter

Usually an **in-process Node.js mechanism**:

```text
Node.js Process
    ↓
EventEmitter
```

### WebSocket

A network communication mechanism:

```text
Client
   ↕
Network
   ↕
Server
```

An application may use EventEmitter internally while also using WebSockets externally.

---

# 28. Important EventEmitter Methods

| Method | Purpose |
|---|---|
| `on()` | Register listener |
| `once()` | Register one-time listener |
| `emit()` | Trigger event |
| `off()` | Remove listener |
| `removeListener()` | Remove listener |
| `removeAllListeners()` | Remove listeners |
| `listenerCount()` | Count listeners |
| `listeners()` | Get listeners |

---

# 29. `removeAllListeners()`

For a specific event:

```js
emitter.removeAllListeners("login");
```

All events:

```js
emitter.removeAllListeners();
```

Be careful with this in shared objects because it can remove listeners registered by other parts of the application.

---

# 30. `listenerCount()`

```js
console.log(
  emitter.listenerCount("login")
);
```

Example:

```js
emitter.on("login", handler1);
emitter.on("login", handler2);

console.log(
  emitter.listenerCount("login")
);
```

Output:

```text
2
```

---

# 31. Special `error` Event ⭐⭐⭐⭐⭐

`error` has special behavior in EventEmitter.

```js
emitter.on("error", (error) => {
  console.log("Error:", error);
});
```

Then:

```js
emitter.emit(
  "error",
  new Error("Something went wrong")
);
```

If an `"error"` event is emitted without an appropriate listener, Node.js can treat it as an uncaught exception and terminate the process.

Important interview point:

> Always understand the special handling of the `"error"` event.

---

# 32. Keep Events Loosely Coupled

Good:

```js
userEvents.emit("userRegistered", user);
```

Listeners decide what to do:

```js
userEvents.on("userRegistered", sendEmail);
userEvents.on("userRegistered", updateAnalytics);
```

The registration logic does not need to know every side effect.

This is **decoupling**.

---

# 33. Potential Problems with EventEmitter ⭐⭐⭐⭐

EventEmitter is useful, but can be misused.

### 1. Hidden control flow

```js
emit("orderCreated");
```

You may not immediately know how many things react to it.

### 2. Too many listeners

Large numbers of listeners can indicate design problems or listener leaks.

### 3. Synchronous listeners

Long-running synchronous listeners can block the event loop.

### 4. Error handling

Unhandled `"error"` events can terminate the process.

### 5. Memory leaks

Listeners that are never removed can remain referenced longer than intended.

---

# 34. Memory Leak Warning

Node.js has a default listener limit per EventEmitter to help identify possible listener leaks.

If too many listeners are registered for the same event, Node.js can produce a:

```text
MaxListenersExceededWarning
```

This does not automatically prove there is a memory leak.

Treat it as a signal to inspect listener lifecycle and application design.

---

# 35. Complete Example ⭐⭐⭐⭐⭐

```js
const EventEmitter = require("events");

class OrderService extends EventEmitter {

  createOrder(order) {
    console.log("Creating order...");

    this.emit("orderCreated", order);
  }

  cancelOrder(order) {
    console.log("Cancelling order...");

    this.emit("orderCancelled", order);
  }
}

const orderService = new OrderService();

function sendConfirmationEmail(order) {
  console.log(
    `Email sent for order ${order.id}`
  );
}

function updateInventory(order) {
  console.log(
    `Inventory updated for order ${order.id}`
  );
}

function trackAnalytics(order) {
  console.log(
    `Analytics updated for order ${order.id}`
  );
}

orderService.on(
  "orderCreated",
  sendConfirmationEmail
);

orderService.on(
  "orderCreated",
  updateInventory
);

orderService.on(
  "orderCreated",
  trackAnalytics
);

orderService.createOrder({
  id: 101,
  amount: 500
});
```

Flow:

```text
createOrder()
      ↓
emit("orderCreated")
      ↓
 ┌────────────┬─────────────┬──────────────┐
 ↓            ↓             ↓
Email      Inventory     Analytics
```

---

# 36. Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is EventEmitter?

> EventEmitter is a Node.js class that allows objects to register listeners and emit events. It is commonly used for event-driven communication within a Node.js process.

### Q2. What does `on()` do?

> It registers a listener that executes every time the specified event is emitted.

### Q3. What does `once()` do?

> It registers a listener that executes only once and is then automatically removed.

### Q4. What does `emit()` do?

> It triggers an event and synchronously invokes the registered listeners by default.

### Q5. Difference between `on()` and `once()`?

```text
on()
→ Every occurrence

once()
→ First occurrence only
```

### Q6. How do you remove an event listener?

```js
emitter.removeListener("event", handler);
```

or:

```js
emitter.off("event", handler);
```

### Q7. Why do you need the same function reference?

Because EventEmitter removes the registered listener by its function reference.

### Q8. Is EventEmitter asynchronous?

> No. EventEmitter listeners execute synchronously by default when `emit()` is called. The listener can schedule asynchronous work if required.

### Q9. What happens if an `error` event has no listener?

> An unhandled EventEmitter `"error"` event can be treated as an uncaught exception and terminate the Node.js process.

### Q10. What are real-world uses?

```text
User registration
Order processing
Notifications
Logging
File processing
Server lifecycle
Application metrics
Internal application events
```

### Q11. EventEmitter vs Promise?

> A Promise generally represents one eventual result, while EventEmitter is designed for potentially repeated events and multiple listeners.

### Q12. What is a custom event?

> An application-defined event name such as `userCreated` or `orderPaid`, emitted using `emit()` and handled using listeners.

---

# 37. ⭐ Most Important Interview Points

Be able to explain these without looking at notes:

```text
⭐⭐⭐⭐⭐ EventEmitter
⭐⭐⭐⭐⭐ on()
⭐⭐⭐⭐⭐ once()
⭐⭐⭐⭐⭐ emit()
⭐⭐⭐⭐⭐ removeListener()
⭐⭐⭐⭐⭐ Custom events
⭐⭐⭐⭐⭐ EventEmitter is synchronous
⭐⭐⭐⭐⭐ error event
⭐⭐⭐⭐⭐ EventEmitter vs Promise
⭐⭐⭐⭐⭐ Real-world use cases
```

Also remember:

```text
❌ EventEmitter does not automatically create a background thread
❌ EventEmitter does not automatically make listeners asynchronous
❌ Don't ignore listener lifecycle
❌ Don't blindly remove all listeners
❌ Don't use EventEmitter as a replacement for a durable message queue
```

---

# 38. Final Mental Model

```text
                    EventEmitter
                         │
             ┌───────────┼───────────┐
             ↓           ↓           ↓
            on()       once()      emit()
             │           │           │
             ↓           ↓           ↓
         Listener     One-time    Trigger event
         remains      listener
                         │
                         ↓
                   Auto removed

                     removeListener()
                           │
                           ↓
                    Remove listener
```

Application architecture:

```text
                Business Operation
                       │
                       ↓
              emit("orderCreated")
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Email         Inventory      Analytics
     Listener        Listener        Listener
```

---

# Module 7 Checklist

```text
✅ EventEmitter
  ✅ What is EventEmitter
  ✅ Create EventEmitter
  ✅ Extend EventEmitter

✅ on()
  ✅ Register listener
  ✅ Multiple listeners
  ✅ Event arguments

✅ once()
  ✅ One-time listener
  ✅ Automatic removal

✅ emit()
  ✅ Trigger event
  ✅ Pass arguments
  ✅ Return value

✅ removeListener()
  ✅ Remove listener
  ✅ Same function reference
  ✅ off() alternative

✅ Custom Events
  ✅ userCreated
  ✅ orderCreated
  ✅ paymentSucceeded
  ✅ Custom event design

✅ Real-world Use Cases
  ✅ User registration
  ✅ Order processing
  ✅ Notifications
  ✅ Logging
  ✅ File processing
  ✅ Server lifecycle

✅ Important Concepts
  ✅ Synchronous listeners
  ✅ error event
  ✅ Listener lifecycle
  ✅ Memory leak warning
  ✅ EventEmitter vs Promise
  ✅ EventEmitter vs WebSocket
```

# Quick Revision

```text
EventEmitter       → Event-based communication

on()               → Listen repeatedly

once()             → Listen once

emit()             → Trigger event

removeListener()   → Remove listener

off()              → Alias for removing listener

Custom Event       → Application-defined event

EventEmitter       → Synchronous by default

Promise            → One eventual result

EventEmitter       → Repeated events / multiple listeners
```
