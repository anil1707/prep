# Module 5 – Component Lifecycle ⭐⭐⭐⭐⭐

## Topics Covered

* Component Lifecycle
* Class Component Lifecycle
* Mounting
* Updating
* Unmounting
* Functional Component Lifecycle
* Render Phase
* Commit Phase
* Cleanup Function

---

# 1. Component Lifecycle ⭐⭐⭐⭐⭐

## Definition

The **Component Lifecycle** represents the different stages a React component goes through from creation until it is removed from the UI.

```text
Mount

↓

Update

↓

Unmount
```

Every React component follows this lifecycle.

---

# 2. Class Component Lifecycle ⭐⭐⭐⭐⭐

## Lifecycle Flow

```text
Constructor

↓

render()

↓

componentDidMount()

-------------------------

State / Props Change

↓

render()

↓

componentDidUpdate()

-------------------------

Component Removed

↓

componentWillUnmount()
```

---

# Mounting Phase

A component is created and inserted into the DOM.

Execution Order

```text
constructor()

↓

render()

↓

componentDidMount()
```

---

## constructor()

Runs once before rendering.

### Uses

* Initialize state
* Bind methods

```jsx
constructor(props) {
    super(props);

    this.state = {
        count: 0
    };
}
```

---

## render()

Responsible for returning JSX.

```jsx
render() {
    return <h1>Hello React</h1>;
}
```

### Rules

* Pure function
* No API calls
* No side effects

---

## componentDidMount()

Runs once after the component is added to the DOM.

### Common Use Cases

* API Calls
* Fetch Initial Data
* Event Listeners
* Timers
* WebSocket Connection

```jsx
componentDidMount() {
    fetchUsers();
}
```

---

# Updating Phase

Occurs whenever

* State changes
* Props change

Execution Order

```text
render()

↓

componentDidUpdate()
```

---

## componentDidUpdate()

Runs after every successful update.

### Common Use Cases

* Compare previous props/state
* API call after prop change
* Update third-party libraries
* Logging

---

# Unmounting Phase

Runs before the component is removed from the DOM.

Execution

```text
componentWillUnmount()
```

### Common Use Cases

* Remove Event Listeners
* Clear Timers
* Close WebSocket
* Cancel Subscriptions
* Cleanup

```jsx
componentWillUnmount() {
    clearInterval(timer);
}
```

---

# Class Lifecycle Summary

| Phase   | Lifecycle Method       |
| ------- | ---------------------- |
| Mount   | constructor()          |
| Mount   | render()               |
| Mount   | componentDidMount()    |
| Update  | render()               |
| Update  | componentDidUpdate()   |
| Unmount | componentWillUnmount() |

---

# 3. Functional Component Lifecycle ⭐⭐⭐⭐⭐

Functional Components use **Hooks** instead of lifecycle methods.

Lifecycle behavior is achieved using **useEffect()**.

---

## Mount

```jsx
useEffect(() => {

    console.log("Mounted");

}, []);
```

Equivalent to

```jsx
componentDidMount()
```

Runs only once.

---

## Update

```jsx
useEffect(() => {

    console.log("Updated");

}, [count]);
```

Runs whenever `count` changes.

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

# Class vs Functional Lifecycle

| Class Component        | Functional Component              |
| ---------------------- | --------------------------------- |
| componentDidMount()    | useEffect(() => {}, [])           |
| componentDidUpdate()   | useEffect(() => {}, [dependency]) |
| componentWillUnmount() | Cleanup Function                  |

---

# 4. Render Phase ⭐⭐⭐⭐⭐

Render Phase is where React calculates what the UI should look like.

### Steps

```text
Component Executes

↓

JSX Returned

↓

React Elements

↓

Virtual DOM Created
```

### Characteristics

* Component executes
* Virtual DOM created
* Diffing starts
* No DOM updates
* No browser paint

---

# 5. Commit Phase ⭐⭐⭐⭐⭐

Commit Phase applies the calculated changes.

### Steps

```text
Virtual DOM

↓

Real DOM Updated

↓

Browser Paint

↓

useEffect Runs
```

### Characteristics

* Updates Real DOM
* Browser paints UI
* Effects execute

---

# Render vs Commit Phase

| Render Phase        | Commit Phase     |
| ------------------- | ---------------- |
| Executes Component  | Updates Real DOM |
| Creates Virtual DOM | Browser Paint    |
| Calculates Changes  | Runs Effects     |
| No DOM Updates      | DOM Updated      |

---

# 6. Cleanup Function ⭐⭐⭐⭐⭐

Cleanup function runs

* Before component unmounts
* Before the effect re-runs because its dependencies changed

### Example

```jsx
useEffect(() => {

    const timer = setInterval(() => {

        console.log("Running");

    }, 1000);

    return () => {

        clearInterval(timer);

    };

}, []);
```

---

## Why Cleanup?

Prevents

* Memory Leaks
* Duplicate Event Listeners
* Running Timers
* Open WebSockets
* Unnecessary API Requests

---

## Common Cleanup Tasks

* `clearInterval()`
* `clearTimeout()`
* `removeEventListener()`
* `AbortController.abort()`
* `socket.close()`
* `unsubscribe()`

---

# Functional Lifecycle Flow

```text
Component Mount

↓

Render Phase

↓

Commit Phase

↓

useEffect()

--------------------------------

State / Props Change

↓

Render Phase

↓

Commit Phase

↓

Cleanup (Previous Effect)

↓

useEffect()

--------------------------------

Component Unmount

↓

Cleanup
```

---

# Complete React Lifecycle

```text
Mount

↓

Render Phase

↓

Commit Phase

↓

useEffect()

↓

State Changes

↓

Render Phase

↓

Commit Phase

↓

Cleanup

↓

useEffect()

↓

Unmount

↓

Cleanup
```

---

# Common Interview Questions

### What are the lifecycle phases?

* Mounting
* Updating
* Unmounting

---

### Which lifecycle method is used for API calls?

Class Component

```jsx
componentDidMount()
```

Functional Component

```jsx
useEffect(() => {}, []);
```

---

### Which lifecycle method is used for cleanup?

Class Component

```jsx
componentWillUnmount()
```

Functional Component

```jsx
return () => {}
```

inside `useEffect`.

---

### What is the difference between Render Phase and Commit Phase?

Render Phase

* Executes component
* Creates Virtual DOM
* Calculates changes

Commit Phase

* Updates Real DOM
* Browser paints UI
* Executes Effects

---

### Why shouldn't API calls be made inside render()?

Because `render()` can execute multiple times and should remain a pure function without side effects.

---

### Why is Cleanup important?

To prevent

* Memory leaks
* Duplicate listeners
* Active timers
* Open WebSocket connections
* Unreleased subscriptions

---

# Quick Revision

```text
Component Lifecycle

↓

Mount
│
├── constructor()
├── render()
└── componentDidMount()

↓

Update
│
├── render()
└── componentDidUpdate()

↓

Unmount
│
└── componentWillUnmount()

--------------------------------

Functional Component

Mount
→ useEffect(() => {}, [])

Update
→ useEffect(() => {}, [dependency])

Unmount
→ return () => {}

--------------------------------

Render Phase
│
├── Execute Component
├── Create Virtual DOM
└── Calculate Changes

↓

Commit Phase
│
├── Update Real DOM
├── Browser Paint
└── Run useEffect()

↓

Cleanup
│
├── Clear Timers
├── Remove Listeners
├── Abort Requests
├── Close WebSocket
└── Unsubscribe
```

---

# Interview One-Liners

* Every React component follows **Mount → Update → Unmount**.
* `render()` should be a pure function.
* `componentDidMount()` is commonly used for API calls.
* `componentDidUpdate()` runs after state or props change.
* `componentWillUnmount()` is used for cleanup.
* Functional Components use `useEffect()` instead of lifecycle methods.
* Render Phase calculates the UI; Commit Phase updates the DOM.
* `useEffect()` runs after the commit phase.
* Cleanup runs before unmounting and before an effect re-runs due to dependency changes.
* Always clean up timers, listeners, WebSockets, and subscriptions to prevent memory leaks.
