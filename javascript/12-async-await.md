# Module 13 – Async / Await ⭐⭐⭐⭐⭐ (Quick Revision)

## What is `async`?

* `async` makes a function **always return a Promise**.
* Even if you return a normal value, JavaScript wraps it in `Promise.resolve()`.

```javascript
async function greet() {
    return "Hello";
}
```

Internally:

```javascript
function greet() {
    return Promise.resolve("Hello");
}
```

---

# Returning a Promise

```javascript
async function getData() {
    return Promise.resolve(100);
}
```

If you return a Promise, JavaScript returns it directly.

---

# Throwing an Error

```javascript
async function test() {
    throw new Error("Failed");
}
```

Internally:

```javascript
return Promise.reject(new Error("Failed"));
```

---

# What is `await`?

`await` pauses the execution of the **current async function** until the Promise settles.

```javascript
const data = await fetchData();
```

> **Important:** `await` does **not** block the JavaScript thread.

---

# Internal Working

```javascript
async function main() {
    const data = await fetchData();
    console.log(data);
}
```

Conceptually behaves like:

```javascript
function main() {
    return fetchData()
        .then(data => {
            console.log(data);
        });
}
```

`async/await` is **syntactic sugar over Promises**.

---

# Does `await` Block JavaScript?

No.

Example:

```javascript
async function test() {
    console.log("A");

    await Promise.resolve();

    console.log("B");
}

test();

console.log("C");
```

Output:

```text
A
C
B
```

Reason:

* `A` → synchronous
* `await` pauses `test()`
* `C` executes
* Continuation after `await` runs as a **microtask**
* `B` executes

---

# Sequential vs Parallel Execution

## Sequential ❌

```javascript
const user = await fetchUser();
const orders = await fetchOrders();
const payment = await fetchPayment();
```

* One request starts after the previous one finishes.
* Slower.

---

## Parallel ✅

```javascript
const [user, orders, payment] = await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchPayment()
]);
```

* All requests start together.
* Faster.
* Use when tasks are independent.

---

# Error Handling

## Using `try/catch`

```javascript
async function main() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
```

---

## Using `.catch()`

```javascript
main().catch(console.error);
```

---

# `async/await` vs Promise Chaining

| async/await       | Promise Chaining   |
| ----------------- | ------------------ |
| Cleaner syntax    | More callbacks     |
| Easier to read    | Chain of `.then()` |
| Uses `try/catch`  | Uses `.catch()`    |
| Built on Promises | Native Promise API |

---

# Common Mistakes

### ❌ Forgetting `await`

```javascript
const data = fetchData();

console.log(data);
```

Output:

```text
Promise { ... }
```

Correct:

```javascript
const data = await fetchData();
```

---

### ❌ Using `await` Outside an Async Function

```javascript
await fetchData();
```

SyntaxError (except top-level `await` in ES modules).

---

### ❌ Sequential Independent Requests

```javascript
await fetch1();
await fetch2();
await fetch3();
```

Better:

```javascript
await Promise.all([
    fetch1(),
    fetch2(),
    fetch3()
]);
```

---

# Frequently Asked Interview Questions

### Does `async` always return a Promise?

✅ Yes.

---

### Does `await` block JavaScript?

❌ No.

It pauses only the current async function.

---

### Can we use `await` without `async`?

Generally no.

Exception: Top-level `await` in ES modules.

---

### Is `async/await` faster than Promises?

❌ No.

It is built on top of Promises and provides cleaner syntax.

---

### Does `await` create a microtask?

✅ Yes.

The code after `await` resumes in a **microtask**.

---

# Output Questions

## Question 1

```javascript
async function test() {
    console.log(1);

    await Promise.resolve();

    console.log(2);
}

test();

console.log(3);
```

Output:

```text
1
3
2
```

---

## Question 2

```javascript
console.log(1);

async function test() {
    console.log(2);

    await Promise.resolve();

    console.log(3);
}

test();

Promise.resolve().then(() => console.log(4));

console.log(5);
```

Output:

```text
1
2
5
3
4
```

Reason:

* `1`, `2`, `5` are synchronous.
* `await` schedules the continuation (`3`) as a microtask.
* The later `Promise.then()` callback (`4`) is added after it.
* Microtasks execute in FIFO order.

---

# Golden Rules

1. `async` always returns a Promise.
2. `return value` → `Promise.resolve(value)`.
3. `throw error` → `Promise.reject(error)`.
4. `await` pauses only the current async function.
5. `await` does not block the JavaScript thread.
6. Code after `await` resumes as a **microtask**.
7. Use `Promise.all()` for independent async operations.
8. `async/await` is syntactic sugar over Promises.
9. Use `try/catch` to handle errors with `await`.

---

# Memory Tricks

```text
async
    ↓
Always returns Promise
```

```text
await
    ↓
Pause current async function
    ↓
Promise settles
    ↓
Resume as Microtask
```

```text
Independent Requests
        ↓
Use Promise.all()
```

---

# Quick Revision

| Keyword                    | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `async`                    | Makes a function return a Promise            |
| `await`                    | Waits for a Promise inside an async function |
| `try/catch`                | Handles async errors                         |
| `Promise.all()`            | Runs independent async tasks in parallel     |
| Continuation after `await` | Runs as a Microtask                          |
