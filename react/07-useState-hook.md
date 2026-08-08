# Module 8 – useState ⭐⭐⭐⭐⭐

## Topics Covered

* What is `useState`
* Why `useState` Exists
* Internal Working
* State Queue
* Functional Updates
* Lazy Initializer
* Multiple State Variables
* Object State
* Array State
* Immutable Updates
* State Batching
* Common Mistakes
* Interview Questions

---

# 1. What is useState? ⭐⭐⭐⭐⭐

## Definition

`useState` is a React Hook that allows **Functional Components** to store and update state.

Before React Hooks, only Class Components could manage state.

---

## Syntax

```jsx
const [state, setState] = useState(initialValue);
```

Example

```jsx
const [count, setCount] = useState(0);
```

Here

```text
count      → Current State

setCount   → State Updater Function

0          → Initial State
```

---

# Why useState?

Without `useState`

```jsx
function Counter() {

    let count = 0;

    const increment = () => {

        count++;

    };

    return (
        <button onClick={increment}>
            {count}
        </button>
    );
}
```

The variable changes,

but React never re-renders.

---

With `useState`

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

React knows that state changed and schedules a re-render.

---

# State Update Flow

```text
setState()

↓

Create Update

↓

Update Queue

↓

Schedule Re-render

↓

Component Executes Again

↓

New Virtual DOM

↓

Diffing

↓

Commit Phase

↓

UI Updated
```

---

# 2. Internal Working ⭐⭐⭐⭐⭐

Example

```jsx
const [count, setCount] = useState(0);
```

Conceptually React stores

```text
Hook #1

↓

Current State = 0
```

When

```jsx
setCount(1);
```

React doesn't immediately update the UI.

Instead

```text
setCount()

↓

Create Update Object

↓

Store in Update Queue

↓

Schedule Re-render

↓

Execute Component Again

↓

Read Updated State

↓

Return New JSX
```

---

## Mental Model

Think of it like

```javascript
const hookStore = [0];

function useState() {

    return [

        hookStore[0],

        function setState(value) {

            hookStore[0] = value;

            render();

        }

    ];

}
```

> This is only a conceptual model. React internally uses a Fiber data structure and an ordered list of Hooks.

---

# 3. State Queue ⭐⭐⭐⭐⭐

Every state update is placed into an **Update Queue**.

```text
setCount()

↓

Update Queue

↓

React Processes Queue

↓

New State

↓

Re-render
```

State updates are scheduled, not applied immediately.

---

# 4. Functional Updates ⭐⭐⭐⭐⭐

### Wrong

```jsx
setCount(count + 1);

setCount(count + 1);
```

Expected

```text
2
```

Actual

```text
1
```

Reason

Both updates use the same `count` value from the current render.

---

### Correct

```jsx
setCount(prev => prev + 1);

setCount(prev => prev + 1);
```

Flow

```text
Previous State = 0

↓

First Update

↓

1

↓

Second Update

↓

2
```

Final Result

```text
2
```

---

## When Should We Use Functional Updates?

Whenever the next state depends on the previous state.

Examples

* Counter
* Toggle
* Like Button
* Shopping Cart
* Increment/Decrement

---

# 5. Lazy Initializer ⭐⭐⭐⭐⭐

Normal

```jsx
const [data] = useState(expensiveCalculation());
```

The initializer expression is evaluated on every render, although React only uses the result during the initial mount.

---

Lazy Initialization

```jsx
const [data] = useState(() => expensiveCalculation());
```

The initializer function runs only once during the initial render.

---

## Example

```jsx
const [theme] = useState(() => {

    return localStorage.getItem("theme");

});
```

---

## Use Cases

* LocalStorage
* SessionStorage
* Large Calculations
* Parsing Large JSON
* Expensive Initialization

---

# 6. Multiple State Variables ⭐⭐⭐⭐

Instead of

```jsx
const [user, setUser] = useState({

    name: "",

    age: 0,

    city: ""

});
```

Use

```jsx
const [name, setName] = useState("");

const [age, setAge] = useState(0);

const [city, setCity] = useState("");
```

---

## Which One Should We Use?

### Separate State

Best for

* Loading
* Modal Open
* Counter
* Search Text

---

### Object State

Best for

* User Object
* Address
* Filters
* Form Data

---

# 7. Object State ⭐⭐⭐⭐⭐

Initial State

```jsx
const [user, setUser] = useState({

    name: "Anil",

    age: 27

});
```

---

### Wrong

```jsx
user.name = "Rahul";
```

Mutates the existing object.

---

### Correct

```jsx
setUser({

    ...user,

    name: "Rahul"

});
```

Creates a new object.

---

# 8. Array State ⭐⭐⭐⭐⭐

Initial

```jsx
const [users, setUsers] = useState([]);
```

---

## Add Item

```jsx
setUsers([
    ...users,
    newUser
]);
```

---

## Remove Item

```jsx
setUsers(
    users.filter(user => user.id !== id)
);
```

---

## Update Item

```jsx
setUsers(
    users.map(user =>
        user.id === id
            ? {
                ...user,
                name: "Rahul"
              }
            : user
    )
);
```

---

### Wrong

```jsx
users.push(newUser);
```

Mutates the array.

---

# 9. Immutable Updates ⭐⭐⭐⭐⭐

Never modify existing state.

Always create a new object or array.

---

## Object

Wrong

```jsx
user.name = "Rahul";
```

Correct

```jsx
setUser({

    ...user,

    name: "Rahul"

});
```

---

## Array

Wrong

```jsx
users.push(newUser);
```

Correct

```jsx
setUsers([
    ...users,
    newUser
]);
```

---

## Why?

React compares references.

```text
Old Object

↓

Reference A

↓

New Object

↓

Reference B

↓

React Detects Change
```

---

# 10. State Batching ⭐⭐⭐⭐⭐

React groups multiple state updates into fewer renders.

Example

```jsx
setName("Anil");

setAge(27);

setCity("Mumbai");
```

Result

```text
One Re-render
```

Benefits

* Better Performance
* Fewer Re-renders
* Less DOM Work

---

## React 18 Automatic Batching

React 18 batches updates in many asynchronous callbacks as well.

Example

```jsx
fetchData().then(() => {

    setLoading(false);

    setUsers(data);

});
```

Usually results in one render instead of two.

---

# 11. Common Mistakes ⭐⭐⭐⭐⭐

### Updating State Directly

❌

```jsx
count++;
```

---

### Mutating Object

❌

```jsx
user.name = "Rahul";
```

---

### Mutating Array

❌

```jsx
users.push(user);
```

---

### Using Current State Multiple Times

❌

```jsx
setCount(count + 1);

setCount(count + 1);
```

---

### Correct

```jsx
setCount(prev => prev + 1);

setCount(prev => prev + 1);
```

---

### Expensive Initialization

❌

```jsx
useState(expensiveCalculation());
```

---

### Correct

```jsx
useState(() => expensiveCalculation());
```

---

# Common Interview Questions

### What is `useState`?

A Hook that allows Functional Components to store and update state.

---

### What does `useState` return?

An array containing

* Current State
* State Updater Function

```jsx
const [state, setState] = useState(initialValue);
```

---

### Does `setState` update immediately?

No.

It schedules a state update.

---

### Why doesn't this increment twice?

```jsx
setCount(count + 1);

setCount(count + 1);
```

Because both updates read the same state value from the current render.

---

### What is Functional Update?

```jsx
setCount(prev => prev + 1);
```

Use it whenever the next state depends on the previous state.

---

### What is Lazy Initialization?

Passing a function to `useState()` so expensive initialization runs only once.

---

### Why should we avoid mutating state?

React detects updates efficiently by comparing object references. Creating a new object or array allows React to recognize changes correctly.

---

### What is State Batching?

React combines multiple state updates into fewer renders to improve performance.

---

# Quick Revision

```text
useState

↓

Current State

↓

setState()

↓

Update Queue

↓

React Processes Queue

↓

Component Re-render

↓

Virtual DOM

↓

Diffing

↓

Commit

↓

UI Updated

--------------------------------

Functional Update

setCount(prev => prev + 1)

--------------------------------

Lazy Initialization

useState(() => expensiveCalculation())

--------------------------------

Object Update

setUser({
    ...user,
    name: "Rahul"
})

--------------------------------

Array Update

setUsers([...users, newUser])

--------------------------------

Never Mutate State
Always Create New Reference
```

---

# Interview One-Liners

* `useState` was introduced in **React 16.8**.
* `useState` allows Functional Components to manage state.
* `useState` returns the current state and a setter function.
* Calling `setState` schedules a re-render; it does not immediately update the UI.
* React stores state internally in the order Hooks are called.
* Every state update is placed into an update queue.
* Use functional updates when the next state depends on the previous state.
* Lazy initialization avoids expensive initialization on every render.
* Prefer multiple state variables for unrelated values.
* Use object state for related data.
* Never mutate objects or arrays stored in state.
* React detects changes using object references.
* React batches multiple state updates to improve performance.
