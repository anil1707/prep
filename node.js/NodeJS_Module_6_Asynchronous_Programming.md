# Module 6 – Asynchronous Programming ⭐⭐⭐⭐⭐

## Topics

- Callbacks
- Callback Hell
- Promises
- `async/await`
- Error Handling
- Sequential vs Parallel Execution
- `Promise.all()`
- `Promise.allSettled()`
- Retry Mechanisms

---

# 1. Why Asynchronous Programming?

Node.js is designed around **non-blocking I/O**.

Typical asynchronous operations:

```text
Database query
API request
File operation
Network request
Timer
DNS operation
```

Mental model:

```text
JavaScript
   ↓
Start async operation
   ↓
Do not block the entire process
   ↓
Continue other work
   ↓
Operation completes
   ↓
Callback / Promise continuation runs
```

---

# 2. Callbacks ⭐⭐⭐⭐⭐

A callback is a function passed to another function to be executed later.

```js
function greet(name, callback) {
  console.log(`Hello ${name}`);
  callback();
}

greet("Anil", () => {
  console.log("Callback executed");
});
```

Output:

```text
Hello Anil
Callback executed
```

---

# 3. Asynchronous Callback

```js
setTimeout(() => {
  console.log("Task completed");
}, 1000);

console.log("Program continues");
```

Output:

```text
Program continues
Task completed
```

The callback runs later.

---

# 4. Node.js Error-First Callback ⭐⭐⭐⭐⭐

Node.js traditionally uses the **error-first callback pattern**:

```js
callback(error, result);
```

Example:

```js
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }

  console.log(data);
});
```

Convention:

```text
callback(error, result)
```

If successful:

```js
err === null
```

and the result is available.

---

# 5. Creating Your Own Async Function

```js
function getUser(callback) {
  setTimeout(() => {
    const user = {
      id: 1,
      name: "Anil"
    };

    callback(null, user);
  }, 1000);
}
```

Usage:

```js
getUser((err, user) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(user);
});
```

---

# 6. Callback Hell ⭐⭐⭐⭐⭐

When asynchronous operations depend on each other, callbacks can become deeply nested.

```js
getUser((err, user) => {
  if (err) return;

  getOrders(user.id, (err, orders) => {
    if (err) return;

    getPayment(orders[0].id, (err, payment) => {
      if (err) return;

      sendEmail(payment, (err) => {
        if (err) return;

        console.log("Done");
      });
    });
  });
});
```

This is called:

> **Callback Hell**

Problems:

- Hard to read
- Hard to maintain
- Hard to debug
- Error handling becomes repetitive
- Business logic becomes deeply nested

Modern solution:

```text
Callbacks
   ↓
Promises
   ↓
async/await
```

---

# 7. Promises ⭐⭐⭐⭐⭐

A Promise represents the eventual result of an asynchronous operation.

A Promise has three states:

```text
Pending
   ↓
 ┌─────────┐
 ↓         ↓
Fulfilled  Rejected
```

### Pending

Operation is still running.

### Fulfilled

Operation completed successfully.

### Rejected

Operation failed.

---

# 8. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});
```

Mental model:

```text
resolve()
   ↓
fulfilled

reject()
   ↓
rejected
```

---

# 9. Consuming a Promise

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

You can also use:

```js
promise
  .then(...)
  .catch(...)
  .finally(...);
```

---

# 10. Promise Example

```js
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Anil"
      });
    }, 1000);
  });
}

getUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
```

---

# 11. Promise Chaining ⭐⭐⭐⭐⭐

A Promise returned from `.then()` can be consumed by the next `.then()`.

```js
getUser()
  .then((user) => {
    return getOrders(user.id);
  })
  .then((orders) => {
    return getPayment(orders[0].id);
  })
  .then((payment) => {
    console.log(payment);
  })
  .catch((error) => {
    console.log(error);
  });
```

Flow:

```text
getUser()
   ↓
user
   ↓
getOrders()
   ↓
orders
   ↓
getPayment()
   ↓
payment
```

Important rule:

```js
.then(() => {
  return anotherPromise();
})
```

The next `.then()` waits for `anotherPromise()` to settle.

---

# 12. `async/await` ⭐⭐⭐⭐⭐

`async/await` provides cleaner syntax for working with Promises.

Promise chaining:

```js
getUser()
  .then((user) => {
    return getOrders(user.id);
  })
  .then((orders) => {
    console.log(orders);
  });
```

Equivalent style:

```js
async function getData() {
  const user = await getUser();
  const orders = await getOrders(user.id);

  console.log(orders);
}
```

---

# 13. `async` Function

An `async` function always returns a Promise.

```js
async function test() {
  return "Hello";
}
```

Therefore:

```js
test().then((value) => {
  console.log(value);
});
```

Output:

```text
Hello
```

Mental model:

```text
async function
      ↓
always returns Promise
```

---

# 14. `await` ⭐⭐⭐⭐⭐

Example:

```js
async function getData() {
  const result = await getUser();

  console.log(result);
}
```

Important:

> `await` does not block the entire Node.js process or event loop.

It suspends the current async function's continuation while other work can continue.

Mental model:

```text
Start Promise
     ↓
Promise pending
     ↓
Current async function pauses
     ↓
Node.js can process other work
     ↓
Promise settles
     ↓
Function continuation resumes
```

---

# 15. Error Handling with `async/await` ⭐⭐⭐⭐⭐

Use `try/catch`:

```js
async function getData() {
  try {
    const user = await getUser();

    console.log(user);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

---

# 16. `finally`

`finally` executes regardless of success or failure.

```js
async function getData() {
  try {
    const data = await fetchData();

    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Cleanup");
  }
}
```

Useful for:

- Closing resources
- Releasing locks
- Cleanup
- Hiding loaders

---

# 17. Promise Error Handling

```js
getUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finished");
  });
```

---

# 18. Sequential Execution ⭐⭐⭐⭐⭐

Sequential execution means one operation is completed before the next starts.

If operations depend on each other:

```js
const user = await getUser();
const orders = await getOrders(user.id);
const payment = await getPayment(orders[0].id);
```

Flow:

```text
getUser
   ↓
getOrders
   ↓
getPayment
```

This is correct when:

```text
orders needs user
payment needs orders
```

---

# 19. Parallel Execution ⭐⭐⭐⭐⭐

If operations are independent, start them together.

Instead of:

```js
const user = await getUser();
const products = await getProducts();
const orders = await getOrders();
```

use:

```js
const [user, products, orders] = await Promise.all([
  getUser(),
  getProducts(),
  getOrders()
]);
```

Flow:

```text
getUser ───────┐
getProducts ───┼──→ Results
getOrders ─────┘
```

General rule:

> **Independent operations → consider parallel execution.**

> **Dependent operations → sequential execution.**

---

# 20. Sequential vs Parallel ⭐⭐⭐⭐⭐

### Sequential

```js
const user = await getUser();
const products = await getProducts();
const orders = await getOrders();
```

Conceptually:

```text
getUser
  ↓
wait
  ↓
getProducts
  ↓
wait
  ↓
getOrders
```

### Parallel

```js
const [user, products, orders] = await Promise.all([
  getUser(),
  getProducts(),
  getOrders()
]);
```

Conceptually:

```text
getUser ───────┐
getProducts ───┼──→ Continue
getOrders ─────┘
```

Parallel execution can significantly reduce total waiting time for independent I/O operations.

---

# 21. `Promise.all()` ⭐⭐⭐⭐⭐

`Promise.all()` waits for multiple Promises.

```js
const results = await Promise.all([
  promise1,
  promise2,
  promise3
]);
```

Result:

```js
[result1, result2, result3]
```

The result order matches the input order.

---

# 22. `Promise.all()` Failure Behavior ⭐⭐⭐⭐⭐

`Promise.all()` rejects when one of its input Promises rejects.

```js
await Promise.all([
  taskA(),
  taskB(),
  taskC()
]);
```

If:

```text
taskA → success
taskB → failure
taskC → success
```

the combined Promise rejects.

Handle it:

```js
try {
  const results = await Promise.all([
    taskA(),
    taskB(),
    taskC()
  ]);
} catch (error) {
  console.log(error);
}
```

Important:

> `Promise.all()` does not automatically cancel operations that have already started.

---

# 23. `Promise.allSettled()` ⭐⭐⭐⭐⭐

`Promise.allSettled()` waits for every input Promise to settle.

```js
const results = await Promise.allSettled([
  taskA(),
  taskB(),
  taskC()
]);
```

Example result:

```js
[
  {
    status: "fulfilled",
    value: "A"
  },
  {
    status: "rejected",
    reason: "B failed"
  },
  {
    status: "fulfilled",
    value: "C"
  }
]
```

---

# 24. `Promise.all()` vs `Promise.allSettled()` ⭐⭐⭐⭐⭐

| `Promise.all()` | `Promise.allSettled()` |
|---|---|
| Rejects if any input rejects | Never rejects because of an input rejection |
| Good when all results are required | Good when every result should be inspected |
| Returns values | Returns `{status, value/reason}` |
| Does not wait for later results after rejection to determine the combined result | Waits for all inputs to settle |

Example:

### All required

```js
const [user, orders, portfolio] =
  await Promise.all([
    getUser(),
    getOrders(),
    getPortfolio()
  ]);
```

### Individual failures acceptable

```js
const results = await Promise.allSettled([
  getRecommendations(),
  getNotifications(),
  getAds()
]);
```

---

# 25. Retry Mechanisms ⭐⭐⭐⭐⭐

Sometimes an asynchronous operation fails temporarily.

Examples:

```text
Network timeout
Temporary API failure
Database connection issue
503 Service Unavailable
Some rate-limit responses
Transient infrastructure failures
```

Basic retry flow:

```text
Attempt 1
   ↓
Failed
   ↓
Wait
   ↓
Attempt 2
   ↓
Failed
   ↓
Wait
   ↓
Attempt 3
```

---

# 26. Basic Retry Function

```js
async function retry(fn, retries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
```

Usage:

```js
const data = await retry(
  () => fetchData(),
  3
);
```

---

# 27. Retry with Delay

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function retry(
  fn,
  retries = 3,
  delayMs = 1000
) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}
```

---

# 28. Exponential Backoff ⭐⭐⭐⭐⭐

Instead of using the same delay:

```text
1 second
1 second
1 second
```

use increasing delays:

```text
1 second
2 seconds
4 seconds
8 seconds
```

Example:

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function retry(
  fn,
  retries = 3,
  baseDelay = 500
) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        const waitTime =
          baseDelay * 2 ** (attempt - 1);

        await delay(waitTime);
      }
    }
  }

  throw lastError;
}
```

Delays:

```text
Attempt 1 fails → 500ms
Attempt 2 fails → 1000ms
Attempt 3 fails → 2000ms
```

In production systems, **jitter** is often added to backoff delays so many clients do not retry at exactly the same time.

---

# 29. Retry Best Practices ⭐⭐⭐⭐⭐

Do not retry everything.

Good candidates:

```text
Temporary network failure
Timeout
503 Service Unavailable
Some rate-limit responses
Transient infrastructure failures
```

Be careful with:

```text
Invalid credentials
Validation errors
404 Not Found
Business logic errors
Non-idempotent operations
```

For example, blindly retrying:

```text
POST /payment
```

can potentially create duplicate effects if the first request succeeded but the response was lost.

Use idempotency mechanisms where appropriate.

---

# 30. Callback → Promise → async/await

Evolution of asynchronous JavaScript:

```text
Callbacks
    ↓
Callback Hell
    ↓
Promises
    ↓
async/await
```

### Callback

```js
getUser((err, user) => {
  // ...
});
```

### Promise

```js
getUser()
  .then((user) => {
    // ...
  })
  .catch((error) => {
    // ...
  });
```

### async/await

```js
try {
  const user = await getUser();
} catch (error) {
  // ...
}
```

---

# 31. Common Mistake – Sequentializing Independent Work

Bad:

```js
const user = await getUser();
const orders = await getOrders();
const products = await getProducts();
```

if these operations are independent.

Better:

```js
const [user, orders, products] =
  await Promise.all([
    getUser(),
    getOrders(),
    getProducts()
  ]);
```

---

# 32. Common Mistake – `forEach` with `await` ⭐⭐⭐⭐⭐

This does not wait the way many developers expect:

```js
items.forEach(async (item) => {
  await processItem(item);
});

console.log("Done");
```

`forEach()` does not await the async callback.

### Sequential

```js
for (const item of items) {
  await processItem(item);
}
```

### Parallel

```js
await Promise.all(
  items.map((item) => processItem(item))
);
```

Choose based on whether the operations can safely run concurrently.

---

# 33. Sequential vs Parallel Loop

### Sequential

```js
for (const item of items) {
  await processItem(item);
}
```

Flow:

```text
item 1
 ↓
item 2
 ↓
item 3
```

### Parallel

```js
await Promise.all(
  items.map((item) => processItem(item))
);
```

Flow:

```text
item 1 ──┐
item 2 ──┼──→ all complete
item 3 ──┘
```

---

# 34. Common Mistake – Unlimited `Promise.all()`

Do not blindly do this for thousands of operations:

```js
await Promise.all(
  thousandsOfItems.map(processItem)
);
```

Potential problems:

```text
Too many API requests
Database connection exhaustion
Memory usage
Rate limits
CPU pressure
```

For large workloads, consider:

```text
Concurrency limits
Queues
Batching
Worker pools
```

---

# 35. Important Mental Model ⭐⭐⭐⭐⭐

When you write:

```js
const data = await fetchData();
```

think:

```text
Start fetchData()
       ↓
Promise pending
       ↓
Current async function pauses
       ↓
Node.js can process other work
       ↓
Promise settles
       ↓
async function continuation resumes
```

`await` does **not** mean:

```text
Block entire Node.js
```

---

# 36. Common Interview Questions ⭐⭐⭐⭐⭐

## Q1. What is asynchronous programming?

> Asynchronous programming allows an operation to start without making the entire program wait for its completion. In Node.js this is especially important for I/O operations.

## Q2. What is callback hell?

> Callback hell is deeply nested callback-based asynchronous code that becomes difficult to read, maintain, and handle errors in.

## Q3. What is a Promise?

> A Promise represents the eventual completion or failure of an asynchronous operation.

## Q4. What are Promise states?

```text
Pending
Fulfilled
Rejected
```

## Q5. Does `async` always return a Promise?

> Yes. An `async` function always returns a Promise.

## Q6. What does `await` do?

> It waits for a Promise to settle within the current async function's execution flow without blocking the entire Node.js event loop.

## Q7. How do you handle errors with async/await?

```js
try {
  await operation();
} catch (error) {
  // handle error
}
```

## Q8. Difference between sequential and parallel execution?

> Sequential execution waits for one operation before starting the next. Parallel execution starts independent operations without unnecessarily waiting for one another.

## Q9. What does `Promise.all()` do?

> It fulfills when all input Promises fulfill and rejects when an input Promise rejects. Results preserve input order.

## Q10. What does `Promise.allSettled()` do?

> It waits for all input Promises to settle and returns the status and result/reason of each Promise.

## Q11. Difference between `Promise.all()` and `Promise.allSettled()`?

```text
Promise.all()
→ Combined Promise rejects when an input rejects

Promise.allSettled()
→ Reports every input's outcome
```

## Q12. What is retry with exponential backoff?

> It retries a failed operation after progressively increasing delays, reducing pressure on a temporarily unavailable service.

---

# 37. ⭐ Most Important Interview Points

Make sure you can explain these without looking at notes:

```text
⭐⭐⭐⭐⭐ Callback
⭐⭐⭐⭐⭐ Callback Hell
⭐⭐⭐⭐⭐ Promise
⭐⭐⭐⭐⭐ Promise states
⭐⭐⭐⭐⭐ async/await
⭐⭐⭐⭐⭐ try/catch
⭐⭐⭐⭐⭐ Sequential vs Parallel
⭐⭐⭐⭐⭐ Promise.all
⭐⭐⭐⭐⭐ Promise.allSettled
⭐⭐⭐⭐⭐ Retry
⭐⭐⭐⭐⭐ Exponential Backoff
```

Also know these practical mistakes:

```text
❌ Unnecessary sequential awaits
❌ forEach(async ...)
❌ Unlimited Promise.all()
❌ Retrying non-retryable errors
❌ Retrying non-idempotent operations blindly
```

---

# 38. Final Mental Model

```text
              Asynchronous Node.js
                      │
        ┌─────────────┴─────────────┐
        ↓                           ↓
    Callbacks                    Promises
        │                           │
 Callback Hell                 .then()
        │                       .catch()
        │                           │
        └───────────┬───────────────┘
                    ↓
                async/await
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
      Sequential           Parallel
          │                   │
       await             Promise.all()
                              │
                       Promise.allSettled()
                              │
                              ↓
                           Retry
                              │
                              ↓
                     Exponential Backoff
```

---

# Module 6 Checklist

```text
✅ Callbacks
  ✅ Callback function
  ✅ Async callbacks
  ✅ Error-first callback

✅ Callback Hell
  ✅ Nested callbacks
  ✅ Problems
  ✅ Promises as solution

✅ Promises
  ✅ Pending
  ✅ Fulfilled
  ✅ Rejected
  ✅ resolve()
  ✅ reject()
  ✅ then()
  ✅ catch()
  ✅ finally()
  ✅ Chaining

✅ async/await
  ✅ async function
  ✅ await
  ✅ try/catch
  ✅ finally

✅ Execution
  ✅ Sequential
  ✅ Parallel
  ✅ Promise.all()
  ✅ Promise.allSettled()

✅ Retry
  ✅ Basic retry
  ✅ Retry delay
  ✅ Exponential backoff
  ✅ Jitter concept
  ✅ Retryable vs non-retryable errors
  ✅ Idempotency considerations

✅ Practical mistakes
  ✅ forEach + async
  ✅ Unnecessary sequential awaits
  ✅ Unlimited Promise.all()
```

# Quick Revision

```text
Callback       → Function executed later

Callback Hell  → Deeply nested callbacks

Promise        → Future async result

async          → Function returns Promise

await          → Wait for Promise inside async function

Sequential     → One after another

Parallel       → Independent tasks together

Promise.all    → Combined result requires all to fulfill

allSettled     → Get outcome of every Promise

Retry          → Try failed operation again

Backoff        → Increase delay between retries
```
