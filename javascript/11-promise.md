# Module 12 – Promises ⭐⭐⭐⭐⭐

## What is a Promise?

A **Promise** is an object that represents the **eventual completion (fulfilled)** or **failure (rejected)** of an asynchronous operation.

```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
});
```

---

# Why Promises?

Promises solve the problems of **Callback Hell**.

## Callback Hell

```javascript
loginUser(user => {
    getProfile(user, profile => {
        getOrders(profile, orders => {
            getPayment(orders, payment => {
                console.log(payment);
            });
        });
    });
});
```

Problems:

* Deep nesting
* Difficult error handling
* Hard to maintain
* Inversion of Control

---

# Promise States

A Promise has only **three states**.

```text
Pending
   │
   ├──► Fulfilled
   │
   └──► Rejected
```

A Promise can move:

* Pending → Fulfilled
* Pending → Rejected

It **cannot** change after it is settled.

---

# Creating a Promise

```javascript
const promise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {
        resolve("Success");
    } else {
        reject("Failed");
    }

});
```

---

# Producer vs Consumer

## Producer

Creates the Promise.

```javascript
new Promise((resolve, reject) => {

});
```

## Consumer

Consumes the Promise.

```javascript
promise
    .then(...)
    .catch(...)
    .finally(...);
```

---

# Promise Chaining

Every `.then()` returns a **new Promise**.

```javascript
Promise.resolve(10)

.then(num => num * 2)

.then(num => num + 5)

.then(console.log);
```

Output

```text
25
```

---

# Returning Values

```javascript
.then(value => {
    return value * 2;
})
```

Internally

```javascript
Promise.resolve(value * 2)
```

---

# Returning a Promise

```javascript
.then(() => {

    return fetchUser();

})
```

JavaScript automatically waits for the returned Promise.

This is called **Promise Flattening**.

---

# Throwing Error

```javascript
.then(() => {
    throw new Error("Failed");
})
```

Equivalent to

```javascript
return Promise.reject(error);
```

---

# Error Handling

```javascript
Promise.resolve()

.then(() => {
    throw new Error("Error");
})

.catch(err => {
    console.log(err.message);
});
```

`catch()` handles:

* Rejected Promises
* Errors thrown inside `then()`

---

# finally()

Runs regardless of success or failure.

```javascript
fetchData()

.finally(() => {
    hideLoader();
});
```

Used for:

* Hide loader
* Cleanup
* Close connections
* Stop spinner

---

# Promise.resolve()

Creates an already fulfilled Promise.

```javascript
Promise.resolve(100)
```

Equivalent to

```javascript
new Promise(resolve => {
    resolve(100);
});
```

---

# Promise.reject()

Creates an already rejected Promise.

```javascript
Promise.reject("Error");
```

Equivalent to

```javascript
new Promise((resolve, reject) => {
    reject("Error");
});
```

---

# Static Methods

## 1. Promise.all() ⭐⭐⭐⭐⭐

Waits for **all promises**.

```javascript
Promise.all([p1, p2, p3]);
```

Rules:

* All succeed → Resolve with array
* Any reject → Reject immediately (Fail Fast)
* Preserves input order
* Accepts non-Promise values

---

## 2. Promise.allSettled()

Waits for **every promise**.

```javascript
Promise.allSettled([p1, p2]);
```

Returns

```javascript
[
    {
        status: "fulfilled",
        value: ...
    },
    {
        status: "rejected",
        reason: ...
    }
]
```

Never rejects because an input promise failed.

---

## 3. Promise.race()

Returns the first settled Promise.

```javascript
Promise.race([p1, p2]);
```

First fulfillment → Resolve

First rejection → Reject

---

## 4. Promise.any()

Returns the first fulfilled Promise.

```javascript
Promise.any([p1, p2]);
```

Rules:

* Ignore rejected promises
* First fulfilled promise wins
* Reject with `AggregateError` only if **all** promises reject

---

# Polyfills

## Promise.all()

Algorithm:

* Create result array
* Track completed count
* Store values by index
* Resolve when all fulfill
* Reject immediately on first rejection

---

## Promise.race()

Algorithm:

* Attach `then` and `catch` to every promise
* First settled promise resolves/rejects the outer promise

---

# Promise.any()

Algorithm:

* Track rejection reasons
* Track rejected count
* Resolve immediately on first fulfillment
* Reject with `AggregateError` only when every promise rejects

---

# Promise.all() vs Promise.any()

| Promise.all()            | Promise.any()                    |
| ------------------------ | -------------------------------- |
| Everyone must succeed    | Anyone can succeed               |
| Tracks successful values | Tracks rejection reasons         |
| Rejects on first failure | Rejects only when everyone fails |

---

# Promise.all() vs Promise.allSettled()

| Promise.all()       | Promise.allSettled()   |
| ------------------- | ---------------------- |
| Fail Fast           | Waits for everyone     |
| Rejects immediately | Always resolves        |
| Returns values      | Returns status objects |

---

# Promise.race() vs Promise.any()

| Promise.race()             | Promise.any()                     |
| -------------------------- | --------------------------------- |
| First settled wins         | First fulfilled wins              |
| Success or failure         | Success only                      |
| Rejects on first rejection | Ignores rejections until all fail |

---

# Promise Polyfill Tips

### Why use `Promise.resolve(item)`?

```javascript
Promise.resolve(item)
```

Supports:

* Promise objects
* Plain values
* Thenables

Without it:

```javascript
1.then(...)
```

throws an error.

---

# Common Mistakes

❌ Forgetting `return` inside `then()`

```javascript
.then(() => {
    fetchUser();
})
```

✔ Correct

```javascript
.then(() => {
    return fetchUser();
})
```

---

❌ Using `push()` in `Promise.all()`

```javascript
results.push(value);
```

✔ Correct

```javascript
results[index] = value;
```

Preserves input order.

---

❌ Rejecting immediately in `Promise.any()`

Wrong

```javascript
.catch(reject)
```

Correct

* Store rejection
* Count failures
* Reject only when every promise rejects

---

# Frequently Asked Interview Questions

### Why does `.then()` return a Promise?

To enable Promise chaining.

---

### What happens if you return a normal value?

It is automatically wrapped with:

```javascript
Promise.resolve(value)
```

---

### What happens if you throw inside `then()`?

It becomes:

```javascript
Promise.reject(error)
```

---

### Can a Promise change state twice?

No.

A Promise settles only once.

---

### Does `Promise.all()` execute promises?

No.

It **does not start** promises.

It waits for already-created promises (or values) to settle.

---

### Why use `Promise.resolve()` in Promise polyfills?

It normalizes:

* Promise
* Non-Promise values
* Thenables

into a Promise so `.then()` can be safely used.

---

# Golden Rules

1. Promise has **three states**: Pending, Fulfilled, Rejected.
2. A Promise settles **only once**.
3. Every `.then()` returns a **new Promise**.
4. Returning a value → `Promise.resolve(value)`.
5. Throwing an error → `Promise.reject(error)`.
6. `catch()` handles rejected promises and thrown errors.
7. `finally()` always executes.
8. `Promise.all()` → All or Nothing.
9. `Promise.allSettled()` → Wait for Everyone.
10. `Promise.race()` → First Settled Wins.
11. `Promise.any()` → First Success Wins.
12. Use `Promise.resolve()` inside polyfills to support non-Promise values and thenables.

---

# Quick Revision

| Method                 | Success         | Failure                                 |
| ---------------------- | --------------- | --------------------------------------- |
| `Promise.all()`        | All fulfill     | First reject                            |
| `Promise.allSettled()` | Always resolves | Never rejects because of input promises |
| `Promise.race()`       | First settled   | First settled rejects                   |
| `Promise.any()`        | First fulfilled | All reject (`AggregateError`)           |
