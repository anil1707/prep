# Module 7 – Hooks (Foundation) ⭐⭐⭐⭐⭐

## Topics Covered

* Why Hooks Exist
* Rules of Hooks
* Hook Execution Order
* Hook Internals

---

# 1. Why Hooks Exist ⭐⭐⭐⭐⭐

## Before React 16.8

Only **Class Components** could:

* Manage State
* Use Lifecycle Methods
* Handle Side Effects

Example

```jsx
class Counter extends React.Component {

    state = {
        count: 0
    };

    componentDidMount() {
        console.log("Mounted");
    }

    render() {
        return <h1>{this.state.count}</h1>;
    }
}
```

Functional Components could only return JSX.

```jsx
function Counter() {
    return <h1>Hello React</h1>;
}
```

No

* State
* Lifecycle
* Side Effects
* Reusable Stateful Logic

---

## Problems with Class Components

### Boilerplate

```jsx
constructor()

super()

this

this.setState()

bind()
```

---

### `this` Confusion

```javascript
this.handleClick = this.handleClick.bind(this);
```

---

### Difficult Logic Reuse

Before Hooks we used:

* Higher Order Components (HOC)
* Render Props

Logic reuse became complicated.

---

## Hooks (React 16.8)

Hooks introduced

* State
* Lifecycle Features
* Side Effects
* Reusable Logic

inside Functional Components.

Example

```jsx
const [count, setCount] = useState(0);

useEffect(() => {

    console.log("Mounted");

}, []);
```

---

## Benefits

* No Class Components
* No `this`
* Less Boilerplate
* Better Code Reuse
* Better Readability
* Easier Testing

---

# 2. Rules of Hooks ⭐⭐⭐⭐⭐

React has **two official rules**.

---

## Rule 1

### Only Call Hooks at the Top Level

✅ Correct

```jsx
const [count] = useState(0);

useEffect(() => {}, []);
```

---

❌ Wrong

```jsx
if (isLoggedIn) {
    useState();
}
```

---

❌ Wrong

```jsx
for (...) {
    useEffect();
}
```

---

❌ Wrong

```jsx
while (...) {
    useState();
}
```

---

### Why?

React depends on the **order of Hook calls**.

Changing the order breaks Hook state mapping.

---

## Rule 2

### Only Call Hooks From

* React Function Components
* Custom Hooks

✅ Correct

```jsx
function App() {

    const [count] = useState(0);

}
```

---

✅ Correct

```jsx
function useCounter() {

    const [count] = useState(0);

}
```

---

❌ Wrong

```javascript
function calculate() {

    useState();

}
```

---

# 3. Hook Execution Order ⭐⭐⭐⭐⭐

React identifies Hooks by **execution order**, **not by variable names**.

Example

```jsx
function App() {

    const [name] = useState("");

    const [age] = useState(0);

    useEffect(() => {}, []);

    return <h1>Hello</h1>;
}
```

Execution Order

```text
useState(name)

↓

useState(age)

↓

useEffect()
```

Every render must follow the same order.

---

## First Render

```text
Hook #1

↓

Hook #2

↓

Hook #3
```

---

## Second Render

```text
Hook #1

↓

Hook #2

↓

Hook #3
```

Must remain exactly the same.

---

## Why Can't Hooks Be Inside Conditions?

Wrong

```jsx
if (show) {
    useState();
}

useEffect();
```

### First Render

```text
Hook #1

Hook #2
```

### Second Render

```text
Hook #1

Hook Missing

Hook #2 Shifted
```

React loses track of which Hook owns which state.

---

# 4. Hook Internals ⭐⭐⭐⭐⭐

## How Does React Remember Hook State?

React **doesn't identify Hooks by variable names**.

Instead, it tracks them based on the **order in which they are called**.

Example

```jsx
function App() {

    const [name] = useState("Anil");

    const [age] = useState(27);

}
```

Conceptually, React stores them like:

```text
Hook #1 → name

Hook #2 → age
```

Next Render

```text
useState()

↓

Read Hook #1

↓

useState()

↓

Read Hook #2
```

This is why Hook order must never change.

> **Note:** Internally, React doesn't literally use a simple array. It maintains Hook state in an ordered structure attached to the component (Fiber). Thinking of it as an ordered list is the correct mental model for interviews.

---

# Hook Execution Flow

```text
Component Executes

↓

Hook #1

↓

Hook #2

↓

Hook #3

↓

Return JSX
```

Every render follows the same sequence.

---

# Why Hook Order Matters

```text
Render 1

Hook #1 → useState(name)

Hook #2 → useState(age)

Hook #3 → useEffect()

----------------------------

Render 2

Hook #1 → useState(name)

Hook #2 → useState(age)

Hook #3 → useEffect()
```

Changing this order causes incorrect Hook state mapping.

---

# Common Interview Questions

### Why were Hooks introduced?

To allow Functional Components to use state, lifecycle features, and reusable logic without Class Components.

---

### Can Hooks be used inside Class Components?

No.

Hooks only work inside Function Components and Custom Hooks.

---

### Why can't Hooks be called inside conditions?

Because React depends on a consistent Hook execution order to associate state with the correct Hook.

---

### Why must Hooks be called at the top level?

To ensure the Hook order remains the same across every render.

---

### How does React identify Hooks?

By the **order of Hook calls**, not by variable names.

---

### Can Hooks be called inside loops?

No.

Calling Hooks inside loops changes the Hook execution order.

---

### Can Hooks be called inside nested functions?

No.

Hooks should only be called directly inside Function Components or Custom Hooks.

---

# Quick Revision

```text
Hooks

↓

Why Hooks?

• Replace Class Components
• State
• Lifecycle
• Side Effects
• Reusable Logic

↓

Rules

1. Top Level Only
2. Function Components / Custom Hooks Only

↓

Execution

Hook #1

↓

Hook #2

↓

Hook #3

↓

Return JSX

↓

Same Order Every Render

↓

Internals

React maps Hooks by execution order,
not by variable names.
```

---

# Interview One-Liners

* Hooks were introduced in **React 16.8**.
* Hooks allow Functional Components to use **state** and **lifecycle features**.
* Hooks eliminate the need for **Class Components** in most cases.
* React identifies Hooks by their **execution order**, not variable names.
* Hooks must always be called at the **top level**.
* Hooks cannot be called inside **conditions**, **loops**, or **nested functions**.
* Hooks can only be used inside **Function Components** or **Custom Hooks**.
* `useState`, `useEffect`, `useRef`, `useMemo`, and `useCallback` are built-in Hooks.
* Custom Hooks are regular functions whose names start with **`use`** and can call other Hooks.
* Stable Hook execution order is essential for React to preserve state correctly across renders.
