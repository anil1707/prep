# Module 9 – useEffect ⭐⭐⭐⭐⭐

## Topics Covered

* What is `useEffect`
* Why `useEffect` Exists
* Internal Working
* Render vs Commit Phase
* Effect Execution Flow
* Dependency Array
* Cleanup Function
* Mount
* Update
* Unmount
* Multiple Effects
* Effect Execution Order
* Cleanup Timing
* Infinite Loop
* Fetching Data
* Race Conditions
* AbortController
* Dependency Pitfalls
* Common Mistakes
* Best Practices
* Interview Questions

---

# 1. What is useEffect? ⭐⭐⭐⭐⭐

## Definition

`useEffect` is a React Hook used to perform **side effects** in Functional Components.

A side effect is any operation outside rendering JSX.

Examples

* API Calls
* Timers
* Event Listeners
* WebSocket Connections
* LocalStorage
* Updating Document Title

---

## Syntax

```jsx
useEffect(() => {

    // Side Effect

}, []);
```

---

## Why useEffect?

Rendering should remain **pure**.

❌ Wrong

```jsx
function App() {

    fetch("/users");

    return <h1>Hello</h1>;

}
```

The component executes on every render.

API will execute on every render.

---

✅ Correct

```jsx
useEffect(() => {

    fetch("/users");

}, []);
```

Now React executes the API **after the component is committed to the DOM**.

---

# 2. Why useEffect Exists ⭐⭐⭐⭐⭐

Before Hooks

```jsx
componentDidMount()

componentDidUpdate()

componentWillUnmount()
```

Functional Components had no lifecycle methods.

`useEffect` replaced them.

---

# Lifecycle Mapping

| Class Component        | Functional Component                |
| ---------------------- | ----------------------------------- |
| componentDidMount()    | `useEffect(() => {}, [])`           |
| componentDidUpdate()   | `useEffect(() => {}, [dependency])` |
| componentWillUnmount() | Cleanup Function                    |

---

# 3. Internal Working ⭐⭐⭐⭐⭐

Example

```jsx
function App() {

    useEffect(() => {

        console.log("Effect");

    });

    return <h1>Hello</h1>;

}
```

Execution Flow

```text
Component Executes

↓

Render Phase

↓

Virtual DOM

↓

Diffing

↓

Commit Phase

↓

Real DOM Updated

↓

Browser Paint

↓

useEffect Executes
```

`useEffect` **never runs during rendering**.

It runs **after the Commit Phase**.

---

# 4. Render Phase vs Commit Phase ⭐⭐⭐⭐⭐

## Render Phase

React

* Executes Component
* Executes Hooks
* Creates Virtual DOM
* Calculates Changes

No DOM updates happen.

---

## Commit Phase

React

* Updates Real DOM
* Browser Paint
* Executes Effects

---

## Comparison

| Render Phase        | Commit Phase         |
| ------------------- | -------------------- |
| Executes Component  | Updates Real DOM     |
| Creates Virtual DOM | Browser Paint        |
| Calculates Changes  | Executes useEffect   |
| Pure                | Side Effects Allowed |

---

# 5. Effect Execution Flow ⭐⭐⭐⭐⭐

```jsx
function App() {

    console.log("Render");

    useEffect(() => {

        console.log("Effect");

    });

    return <h1>Hello</h1>;

}
```

Output

```text
Render

Effect
```

Flow

```text
Render Phase

↓

Commit Phase

↓

useEffect()
```

---

# 6. Dependency Array ⭐⭐⭐⭐⭐

## No Dependency Array

```jsx
useEffect(() => {

});
```

Runs

```text
Mount

↓

Every Render
```

---

## Empty Dependency Array

```jsx
useEffect(() => {

}, []);
```

Runs

```text
Only After Initial Mount
```

---

## Dependency

```jsx
useEffect(() => {

}, [count]);
```

Runs

```text
Initial Mount

↓

Whenever count changes
```

---

## Multiple Dependencies

```jsx
useEffect(() => {

}, [count, user]);
```

Runs whenever **count** or **user** changes.

---

# Dependency Summary

| Dependency Array | Runs                   |
| ---------------- | ---------------------- |
| No Array         | Every Render           |
| `[]`             | Initial Mount Only     |
| `[count]`        | Mount + Count Changes  |
| `[a, b]`         | Mount + a or b Changes |

---

# 7. Cleanup Function ⭐⭐⭐⭐⭐

Cleanup is the function returned from `useEffect`.

```jsx
useEffect(() => {

    console.log("Effect");

    return () => {

        console.log("Cleanup");

    };

}, []);
```

---

## Why Cleanup?

Without Cleanup

```jsx
useEffect(() => {

    setInterval(() => {

        console.log("Running");

    }, 1000);

}, []);
```

Timer continues forever.

---

Correct

```jsx
useEffect(() => {

    const id = setInterval(() => {

        console.log("Running");

    }, 1000);

    return () => {

        clearInterval(id);

    };

}, []);
```

---

## Common Cleanup

* clearInterval()
* clearTimeout()
* removeEventListener()
* AbortController.abort()
* socket.close()
* unsubscribe()

---

# 8. Mount, Update, Unmount ⭐⭐⭐⭐⭐

## Mount

```jsx
useEffect(() => {

    console.log("Mounted");

}, []);
```

Runs once.

Equivalent to

```jsx
componentDidMount()
```

---

## Update

```jsx
useEffect(() => {

    console.log("Updated");

}, [count]);
```

Runs

* Initial Mount
* Whenever `count` changes

Equivalent to

```jsx
componentDidUpdate()
```

---

## Unmount

```jsx
useEffect(() => {

    return () => {

        console.log("Cleanup");

    };

}, []);
```

Equivalent to

```jsx
componentWillUnmount()
```

---

# 9. Cleanup Timing ⭐⭐⭐⭐⭐

Cleanup runs

* Before the effect re-runs because dependencies changed
* Before the component unmounts

Example

```jsx
useEffect(() => {

    console.log("Effect", count);

    return () => {

        console.log("Cleanup", count);

    };

}, [count]);
```

Output

Initial

```text
Effect 0
```

State Update

```text
Cleanup 0

Effect 1
```

Unmount

```text
Cleanup 1
```

---

# Cleanup Flow

```text
Mount

↓

Effect()

↓

State Changes

↓

Cleanup()

↓

New Effect()

↓

Unmount

↓

Cleanup()
```

---

# 10. Multiple useEffects ⭐⭐⭐⭐

```jsx
useEffect(() => {

    console.log("Effect 1");

}, []);

useEffect(() => {

    console.log("Effect 2");

}, []);
```

Output

```text
Effect 1

Effect 2
```

Effects execute in declaration order.

---

# 11. Infinite Loop ⭐⭐⭐⭐⭐

Wrong

```jsx
useEffect(() => {

    setCount(count + 1);

});
```

Flow

```text
Render

↓

Effect

↓

setState()

↓

Render

↓

Effect

↓

∞
```

---

Correct

```jsx
useEffect(() => {

    setCount(1);

}, []);
```

---

# Another Infinite Loop

Wrong

```jsx
useEffect(() => {

    fetchUsers();

}, [users]);
```

If `fetchUsers()` updates `users`, the effect keeps re-running.

---

Correct

```jsx
useEffect(() => {

    fetchUsers();

}, []);
```

---

# 12. Fetching Data ⭐⭐⭐⭐⭐

Correct Pattern

```jsx
useEffect(() => {

    async function fetchUsers() {

        const response = await fetch("/users");

        const data = await response.json();

        setUsers(data);

    }

    fetchUsers();

}, []);
```

---

Wrong

```jsx
useEffect(async () => {

});
```

Reason

`useEffect` expects

* Nothing (`undefined`)
* Cleanup Function

An async function returns a Promise.

---

# 13. Race Conditions ⭐⭐⭐⭐⭐

Example

```text
User Types

↓

A

↓

AB

↓

ABC
```

Requests

```text
Request A

Request AB

Request ABC
```

Responses

```text
ABC

↓

AB

↓

A
```

Old response overwrites the latest UI.

This is a **Race Condition**.

---

# Solution

* AbortController
* Ignore stale responses (e.g. request IDs/flags)
* TanStack Query / React Query

---

# 14. AbortController ⭐⭐⭐⭐⭐

```jsx
useEffect(() => {

    const controller = new AbortController();

    async function fetchUsers() {

        const response = await fetch("/users", {

            signal: controller.signal

        });

        const data = await response.json();

        setUsers(data);

    }

    fetchUsers();

    return () => {

        controller.abort();

    };

}, []);
```

Benefits

* Cancels unnecessary requests
* Prevents outdated responses from continuing
* Helps avoid updates after unmount

---

# 15. Dependency Pitfalls ⭐⭐⭐⭐⭐

## Object

```jsx
const user = {};

useEffect(() => {

}, [user]);
```

Runs every render.

Reason

New object reference.

---

## Array

```jsx
const users = [];
```

New reference every render.

---

## Function

```jsx
const fetchData = () => {};
```

New function every render.

---

## Solution

Objects / Arrays

```jsx
useMemo()
```

Functions

```jsx
useCallback()
```

---

# 16. Common Mistakes ⭐⭐⭐⭐⭐

### Async Effect

❌

```jsx
useEffect(async () => {

});
```

---

### Missing Dependency Array

❌

```jsx
useEffect(() => {

    fetchUsers();

});
```

Runs after every render.

---

### Forgetting Cleanup

❌

```jsx
setInterval();
```

Memory Leak.

---

### Missing Dependencies

❌

```jsx
useEffect(() => {

    console.log(count);

}, []);
```

If `count` changes, the effect still sees the old value from the render when it was created.

---

### Updating State Every Effect

❌

```jsx
useEffect(() => {

    setCount(count + 1);

});
```

Infinite loop.

---

# 17. Best Practices ⭐⭐⭐⭐⭐

✅ Keep each effect focused on one responsibility.

Instead of

```jsx
useEffect(() => {

    fetchUsers();

    document.title = "...";

    window.addEventListener(...);

}, []);
```

Use

```jsx
useEffect(() => {

    fetchUsers();

}, []);

useEffect(() => {

    document.title = "...";

}, []);

useEffect(() => {

    window.addEventListener(...);

}, []);
```

---

Always

* Cleanup timers
* Cleanup listeners
* Abort API requests
* Close WebSocket
* Include required dependencies

---

# Common Interview Questions

### What is useEffect?

A Hook used to perform side effects after React commits updates to the DOM.

---

### When does useEffect execute?

After the **Commit Phase**.

---

### Difference between

```jsx
useEffect(() => {})
```

and

```jsx
useEffect(() => {}, [])
```

Without dependency array

→ Runs after every render.

With empty dependency array

→ Runs only after the initial mount.

---

### Why can't useEffect be async?

Because the effect callback must return either nothing or a cleanup function. An async function returns a Promise.

---

### When does cleanup execute?

* Before the effect re-runs because dependencies changed
* Before the component unmounts

---

### What causes an infinite loop?

Updating state inside an effect that runs after every render (or repeatedly because of its dependencies).

---

### What is a Race Condition?

When multiple asynchronous requests complete in a different order than they were started, allowing stale data to overwrite newer data.

---

### Why use AbortController?

To cancel unnecessary fetch requests during cleanup.

---

# Complete Flow

```text
Component Executes

↓

Render Phase

↓

Virtual DOM

↓

Diffing

↓

Commit Phase

↓

Real DOM Updated

↓

Browser Paint

↓

useEffect()

↓

Cleanup()

↓

Next Effect()

↓

Unmount

↓

Final Cleanup()
```

---

# Quick Revision

```text
useEffect

↓

Side Effects

↓

Runs After Commit Phase

↓

Dependency Array

No Array
→ Every Render

[]

→ Initial Mount Only

[count]

→ Mount + Count Changes

↓

Cleanup

Before Next Effect

+

Before Unmount

↓

Common Uses

API Calls

Timers

Event Listeners

WebSocket

Subscriptions

↓

Avoid

Async Effect Callback

Missing Dependencies

Infinite Loops

Memory Leaks

↓

Best Practices

Small Focused Effects

Cleanup Resources

Abort API Requests

Use Correct Dependencies
```

---

# Interview One-Liners

* `useEffect` is used for **side effects**, not rendering UI.
* Effects execute **after the Commit Phase**, not during rendering.
* Rendering should remain **pure**.
* Without a dependency array, an effect runs after every render.
* `[]` runs the effect only after the initial mount.
* `[dependency]` runs on mount and whenever the dependency changes.
* Cleanup runs **before the next effect** (when dependencies change) and **before unmount**.
* Never pass an `async` function directly to `useEffect`.
* Use `AbortController` to cancel fetch requests during cleanup.
* Keep effects small and focused, with one responsibility per effect.
* Avoid mutating dependency objects or creating new object/function references unnecessarily, as they can trigger unwanted effect re-runs.
