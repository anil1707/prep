# Module 05 - Closures

> ⭐ Difficulty: Advanced
>
> 🔥 Interview Importance: ⭐⭐⭐⭐⭐

---

# 📖 Introduction

Closures are one of the most powerful features in JavaScript.

Many advanced JavaScript concepts are built on top of closures, including:

- Data Hiding
- Private Variables
- Module Pattern
- IIFE
- Currying
- Memoization
- React Hooks
- Event Listeners
- Callbacks

If you understand Closures deeply, almost every JavaScript interview becomes much easier.

---

# 🤔 Why Do We Need Closures?

Before understanding Closures,

let's understand the problem they solve.

Imagine JavaScript destroys every local variable after a function finishes executing.

Example

```javascript
function outer() {

    let count = 0;

    return function () {

        count++;

        console.log(count);

    };

}

const counter = outer();

counter();

counter();

counter();
```

Output

```text
1

2

3
```

Question

`outer()` has already finished executing.

Its Execution Context has been removed from the Call Stack.

Then

**Where is `count` stored?**

If JavaScript destroyed `count`

the output should have been

```text
1

1

1
```

or even

```text
ReferenceError
```

But JavaScript remembers the variable.

Why?

Because of **Closures**.

Closures exist so that inner functions can continue accessing variables from their outer function even after the outer function has finished executing.

---

# ✅ Definition

> A **Closure** is a function together with its lexical environment.

Or, in simpler words:

> A Closure allows a function to remember variables from its outer scope even after the outer function has finished executing.

---

# ⚙️ Internal Working

Let's understand what happens internally.

Example

```javascript
function outer() {

    let count = 0;

    function inner() {

        count++;

        console.log(count);

    }

    return inner;

}

const counter = outer();
```

---

## Step 1

Global Execution Context is created.

```
Global

↓

outer()
```

---

## Step 2

`outer()` is called.

JavaScript creates a Function Execution Context.

Memory

```
Outer Execution Context

count → 0

inner → function
```

---

## Step 3

`outer()` returns

```javascript
inner
```

Normally,

the Function Execution Context should be destroyed.

But JavaScript notices something important.

```
inner

↓

Uses

↓

count
```

Since `inner` still needs `count`

JavaScript keeps that lexical environment alive.

---

## Step 4

Memory becomes

```
counter

↓

Function

↓

Closure

↓

count → 0
```

Notice

`outer()` has already finished.

But

```
count
```

still exists.

That is the Closure.

---

# 🧠 Engine Working

Conceptually,

JavaScript stores

```
Global

↓

counter

↓

Function Object

↓

[[Environment]]

↓

Outer Lexical Environment

↓

count
```

Every function has an internal reference to the lexical environment where it was created.

This hidden reference allows the function to access variables long after the outer function has returned.

---

# 💻 Example 1

```javascript
function greet(name) {

    return function () {

        console.log("Hello " + name);

    };

}

const sayHello = greet("Anil");

sayHello();
```

Output

```text
Hello Anil
```

---

## Memory

```
sayHello

↓

Closure

↓

name

↓

"Anil"
```

The variable `name` is preserved by the closure.

---

# 💻 Example 2

```javascript
function counter() {

    let count = 0;

    return function () {

        count++;

        console.log(count);

    };

}

const increment = counter();

increment();

increment();

increment();
```

Output

```text
1

2

3
```

Each call updates the same `count` variable stored in the closure.

---

# 🌍 Real World Usage

Closures are used in almost every JavaScript application.

Examples include:

- React Hooks
- Event Listeners
- Timers (`setTimeout`, `setInterval`)
- API Callbacks
- Data Hiding
- Private Variables
- Module Pattern
- Authentication
- Memoization
- Currying

Without Closures,

many modern JavaScript features would not work.

---

# 📊 Memory Diagram

```
Global Execution Context

↓

counter

↓

Function Object

↓

Closure

↓

count → 0
```

The Closure keeps `count` alive even after the Function Execution Context has been removed from the Call Stack.

---

---

# 📦 Data Hiding

## 🤔 Why Do We Need Data Hiding?

Imagine you're building a Banking Application.

Every account has a balance.

```javascript
let balance = 50000;
```

If everyone can access it,

someone could write

```javascript
balance = 1000000;
```

or

```javascript
balance = 0;
```

Your application becomes insecure.

We need a way to:

- Hide variables.
- Allow controlled access.
- Prevent direct modification.

Closures solve this problem.

---

## Example

```javascript
function createBankAccount(initialBalance) {

    let balance = initialBalance;

    return {

        deposit(amount) {
            balance += amount;
        },

        withdraw(amount) {

            if (amount <= balance) {
                balance -= amount;
            }

        },

        getBalance() {
            return balance;
        }

    };

}

const account = createBankAccount(5000);

account.deposit(1000);

console.log(account.getBalance());
```

Output

```text
6000
```

---

### Can We Access Balance?

```javascript
console.log(account.balance);
```

Output

```text
undefined
```

Why?

Because

```
balance

↓

Closure

↓

Private
```

Only the returned functions can access it.

---

# 📦 Private Variables

A variable stored inside a Closure becomes private.

Example

```javascript
function createCounter() {

    let count = 0;

    return {

        increment() {

            count++;

        },

        getCount() {

            return count;

        }

    };

}
```

Usage

```javascript
const counter = createCounter();

counter.increment();

counter.increment();

console.log(counter.getCount());
```

Output

```text
2
```

Trying

```javascript
console.log(counter.count);
```

Output

```text
undefined
```

---

## Memory Diagram

```
counter

↓

Returned Object

↓

increment()

getCount()

↓

Closure

↓

count → 2
```

---

# 📦 Encapsulation

Encapsulation means

> Bundling data and methods together while hiding internal implementation.

Closures help JavaScript achieve encapsulation.

---

## Real Example

```javascript
function createUser(name) {

    let password = "123456";

    return {

        getName() {
            return name;
        },

        changePassword(newPassword) {
            password = newPassword;
        }

    };

}
```

Outside

```javascript
console.log(user.password);
```

Output

```text
undefined
```

Only

```javascript
changePassword()
```

can modify it.

---

# 🌍 Real-world Example

Think about your ATM.

You cannot do

```text
balance = 100000
```

Instead,

you press

```
Deposit

↓

Withdraw

↓

Check Balance
```

The ATM never exposes the real database.

Closures work the same way.

---

# 📦 Module Pattern

Before ES6 Modules,

JavaScript had no

```javascript
import
```

or

```javascript
export
```

Everything became global.

Example

```javascript
var username = "Anil";

function login(){}

function logout(){}
```

Another file

```javascript
var username = "Rahul";
```

Oops.

Global Namespace Pollution.

---

Closures solved this.

```javascript
const UserModule = (function(){

    let username = "Anil";

    function login(){

        console.log(username);

    }

    return{

        login

    };

})();
```

Usage

```javascript
UserModule.login();
```

Output

```text
Anil
```

Trying

```javascript
console.log(UserModule.username);
```

Output

```text
undefined
```

---

## Memory Diagram

```
UserModule

↓

login()

↓

Closure

↓

username
```

Private.

---

# 📦 IIFE (Immediately Invoked Function Expression)

## Why Do We Need IIFE?

Normally

```javascript
function test(){

}
```

Someone can call it anytime.

Sometimes we want

- Run once.
- Create private variables.
- Hide implementation.

IIFE solves this.

---

## Syntax

```javascript
(function(){

})();
```

The function executes immediately.

---

## Example

```javascript
const Logger = (function(){

    const logs = [];

    return{

        info(message){

            logs.push(message);

        },

        getLogs(){

            return [...logs];

        }

    };

})();
```

Usage

```javascript
Logger.info("Application Started");

Logger.info("User Logged In");

console.log(Logger.getLogs());
```

Output

```text
[
 "Application Started",
 "User Logged In"
]
```

Trying

```javascript
Logger.logs
```

Output

```text
undefined
```

---

# 🌍 Real-world Usage

Closures are used in

### Authentication

```javascript
createAuth()
```

Private Token

---

### Logger

```javascript
Logger.info()
```

Private Logs

---

### Shopping Cart

```javascript
cart.addItem()
```

Private Items Array

---

### Banking

```javascript
deposit()

withdraw()
```

Private Balance

---

### Configuration

```javascript
config.get()
```

Private Configuration

---

# Module 05 - Closures (Part 3)

> ⭐ Difficulty: Advanced 🔥 Interview Importance: ⭐⭐⭐⭐⭐

------------------------------------------------------------------------

# 📦 Currying

## What is Currying?

Currying is a technique that transforms a function with multiple
arguments into a sequence of functions, each taking one argument.

``` javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(10)(20)); // 30
```

## Why Do We Need Currying?

-   Function reusability
-   Partial application
-   Cleaner APIs
-   Functional programming

## Real Example

``` javascript
function createTaxCalculator(tax) {
  return function(price) {
    return price + (price * tax);
  };
}

const calculateGST = createTaxCalculator(0.18);

console.log(calculateGST(100));
console.log(calculateGST(200));
```

The returned function remembers `tax` because of a closure.

------------------------------------------------------------------------

# 📦 Memoization

## What is Memoization?

Memoization is an optimization technique where function results are
cached so repeated calls with the same input avoid recalculation.

``` javascript
function memoize(fn) {
  const cache = {};

  return function(value) {
    if (cache[value] !== undefined) {
      return cache[value];
    }

    const result = fn(value);
    cache[value] = result;

    return result;
  };
}
```

Example:

``` javascript
function square(n) {
  return n * n;
}

const memoSquare = memoize(square);

console.log(memoSquare(5));
console.log(memoSquare(5));
```

The second call returns the cached value.

------------------------------------------------------------------------

# 📊 Currying vs Memoization

  Feature        Currying                  Memoization
  -------------- ------------------------- ------------------------
  Purpose        Reuse functions           Improve performance
  Uses Closure   ✅                        ✅
  Stores State   Previous arguments        Cached results
  Common Usage   Configuration functions   Expensive computations

------------------------------------------------------------------------

# 🌍 React Examples

## Event Handler

``` javascript
function App() {
  const username = "Anil";

  function handleClick() {
    console.log(username);
  }

  return <button onClick={handleClick}>Click</button>;
}
```

`handleClick` remembers `username`.

## useState

Every render creates new functions that capture values through closures.

------------------------------------------------------------------------

# 🌍 Browser Example

``` javascript
let count = 0;

button.addEventListener("click", () => {
  count++;
  console.log(count);
});
```

The callback remembers `count`.

------------------------------------------------------------------------

# 🌍 Node.js Example

``` javascript
function createLogger(prefix) {
  return function(message) {
    console.log(`[${prefix}] ${message}`);
  };
}

const apiLogger = createLogger("API");
apiLogger("Request received");
```

------------------------------------------------------------------------

# ⚠️ Common Mistakes

-   Thinking closures copy variables (they keep references to lexical
    environments).
-   Assuming every closure causes a memory leak.
-   Using closures unnecessarily inside large loops.

------------------------------------------------------------------------

# ✅ Best Practices

-   Keep closed-over state minimal.
-   Avoid capturing large unused objects.
-   Use closures for encapsulation, not everything.

------------------------------------------------------------------------

# 🎯 Interview Questions

## Basic

-   What is a Closure?
-   Why do Closures exist?
-   What is Currying?
-   What is Memoization?

## Intermediate

-   Explain Data Hiding using Closures.
-   Explain the Module Pattern.
-   Why does Currying require Closures?

## Advanced

-   How do React Hooks use Closures?
-   Why don't Closures always cause memory leaks?
-   Explain Memoization using Closures.

------------------------------------------------------------------------

# 🧩 Output Question

``` javascript
function outer() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const fn = outer();

console.log(fn());
console.log(fn());
console.log(fn());
```

Output

``` text
1
2
3
```

Reason: The returned function closes over `count`.

------------------------------------------------------------------------

# 📝 Summary

Closures allow functions to remember variables from their lexical scope.

Applications:

-   Data Hiding
-   Private Variables
-   Encapsulation
-   Module Pattern
-   IIFE
-   Currying
-   Memoization
-   React Hooks
-   Event Listeners
