# Module 10 – useRef ⭐⭐⭐⭐⭐

## Topics Covered

* What is `useRef`
* Internal Working
* Mutable Reference
* DOM Access
* Avoid Re-render
* Previous State
* Timer IDs
* WebSocket References
* Imperative APIs
* `forwardRef`
* `useImperativeHandle`
* Common Mistakes
* Interview Questions

---

# 1. What is useRef? ⭐⭐⭐⭐⭐

## Definition

`useRef` is a React Hook that returns a **mutable object** whose value persists across renders.

Unlike `useState`, updating a ref **does not trigger a re-render**.

---

## Syntax

```jsx
const ref = useRef(initialValue);
```

Example

```jsx
const countRef = useRef(0);
```

Internally

```javascript
countRef = {
    current: 0
};
```

The actual value is stored inside

```javascript
ref.current
```

---

# 2. Why useRef Exists ⭐⭐⭐⭐⭐

Sometimes we need to store values that

* Persist across renders
* Do NOT trigger UI updates

Examples

* DOM Elements
* Timer IDs
* Previous Values
* WebSocket Instances
* Third-party Library Instances

---

# 3. Internal Working ⭐⭐⭐⭐⭐

```jsx
const countRef = useRef(0);
```

Conceptually React creates

```javascript
{
    current: 0
}
```

React keeps the **same object** across every render.

Updating

```javascript
countRef.current++;
```

changes only

```javascript
current
```

The object reference remains the same.

---

## Flow

```text
Render

↓

useRef()

↓

{
    current: value
}

↓

Update current

↓

No Re-render
```

---

# 4. Mutable Reference ⭐⭐⭐⭐⭐

Unlike state,

```javascript
ref.current = 100;
```

is completely valid.

Example

```jsx
const countRef = useRef(0);

countRef.current++;

console.log(countRef.current);
```

Output

```text
1

2

3

4
```

No UI update occurs because React doesn't track `ref.current`.

---

# 5. DOM Access ⭐⭐⭐⭐⭐

Most common use case.

```jsx
function App() {

    const inputRef = useRef();

    return <input ref={inputRef} />;

}
```

React stores the DOM node inside

```javascript
inputRef.current
```

---

## Focus Input

```jsx
inputRef.current.focus();
```

---

## Read Input Value

```jsx
console.log(inputRef.current.value);
```

---

## Scroll

```jsx
containerRef.current.scrollTop = 0;
```

---

## Video

```jsx
videoRef.current.play();
```

---

# DOM Flow

```text
Render

↓

DOM Created

↓

React Assigns DOM Node

↓

ref.current

↓

Access DOM
```

---

# 6. Avoid Re-render ⭐⭐⭐⭐⭐

Using State

```jsx
const [count, setCount] = useState(0);
```

Updating

```jsx
setCount(count + 1);
```

Result

```text
Render Again
```

---

Using Ref

```jsx
const countRef = useRef(0);

countRef.current++;
```

Result

```text
No Re-render
```

---

# 7. Previous State ⭐⭐⭐⭐⭐

One of the most common interview questions.

```jsx
import { useEffect, useRef, useState } from "react";

function App() {

    const [count, setCount] = useState(0);

    const previousCount = useRef();

    useEffect(() => {

        previousCount.current = count;

    }, [count]);

    return (
        <>
            <h2>Current : {count}</h2>
            <h2>Previous : {previousCount.current}</h2>

            <button
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
        </>
    );

}
```

Flow

```text
Current Count

↓

Render

↓

Commit

↓

useEffect

↓

previousCount.current = count

↓

Next Render

↓

Previous Value Available
```

---

# 8. Timer IDs ⭐⭐⭐⭐⭐

Wrong

```jsx
const [timerId, setTimerId] = useState();
```

Timer ID doesn't affect UI.

---

Correct

```jsx
const timerRef = useRef();
```

Example

```jsx
const timerRef = useRef();

useEffect(() => {

    timerRef.current = setInterval(() => {

        console.log("Running");

    }, 1000);

    return () => {

        clearInterval(timerRef.current);

    };

}, []);
```

---

# 9. WebSocket References ⭐⭐⭐⭐⭐

Correct

```jsx
const socketRef = useRef();

useEffect(() => {

    socketRef.current =
        new WebSocket(url);

    return () => {

        socketRef.current.close();

    };

}, []);
```

Why?

* Doesn't affect UI
* Persists across renders
* No unnecessary re-renders

---

# 10. Imperative APIs ⭐⭐⭐⭐⭐

React is primarily **Declarative**.

Sometimes we need **Imperative** actions.

Examples

* focus()
* blur()
* scrollIntoView()
* play()
* pause()

Example

```jsx
const inputRef = useRef();

<input ref={inputRef} />

<button
    onClick={() =>
        inputRef.current.focus()
    }
>
    Focus
</button>
```

---

# Declarative vs Imperative

### Declarative

```jsx
<button disabled={loading}>
    Save
</button>
```

React decides what to update.

---

### Imperative

```jsx
inputRef.current.focus();
```

You directly tell the DOM what to do.

---

# 11. forwardRef ⭐⭐⭐⭐⭐

Normally

```jsx
<input ref={inputRef} />
```

Works.

---

This does NOT work automatically

```jsx
<MyInput ref={inputRef} />
```

---

Solution

```jsx
import { forwardRef } from "react";

const MyInput = forwardRef((props, ref) => {

    return <input ref={ref} {...props} />;

});
```

Now

```jsx
<MyInput ref={inputRef} />
```

works.

---

# Flow

```text
Parent

↓

ref

↓

forwardRef

↓

Child

↓

DOM Element
```

---

# 12. useImperativeHandle ⭐⭐⭐⭐⭐

Instead of exposing the complete DOM,

Expose only required methods.

Example

```jsx
import {
    forwardRef,
    useImperativeHandle,
    useRef
} from "react";

const Input = forwardRef((props, ref) => {

    const inputRef = useRef();

    useImperativeHandle(ref, () => ({

        focus() {
            inputRef.current.focus();
        },

        clear() {
            inputRef.current.value = "";
        }

    }));

    return <input ref={inputRef} />;

});
```

Parent

```jsx
const ref = useRef();

<Input ref={ref} />

ref.current.focus();

ref.current.clear();
```

The parent can only access

* `focus()`
* `clear()`

Not the entire DOM element.

---

# Why use useImperativeHandle?

* Encapsulation
* Controlled Public API
* Hide Internal Implementation

---

# 13. Common Mistakes ⭐⭐⭐⭐⭐

### Mistake 1

Using ref instead of state for UI

❌

```jsx
countRef.current++;
```

UI won't update.

---

Correct

```jsx
setCount(count + 1);
```

---

### Mistake 2

Using state for Timer IDs

❌

```jsx
const [timer, setTimer] = useState();
```

---

Correct

```jsx
const timerRef = useRef();
```

---

### Mistake 3

Using refs for everything

Use refs only for values that **don't affect rendering**.

---

### Mistake 4

Writing to `ref.current` during render

❌

```jsx
function App() {

    myRef.current = 10;

    return <div>Hello</div>;

}
```

Prefer updating refs inside

* Event Handlers
* Effects

---

# 14. Real-world Use Cases ⭐⭐⭐⭐⭐

* Input Focus
* Previous State
* Timer IDs
* WebSocket Connection
* Scroll Position
* Video Player
* Canvas
* Chart.js
* Google Maps
* Leaflet
* Monaco Editor

---

# useRef vs useState ⭐⭐⭐⭐⭐

| useState             | useRef                        |
| -------------------- | ----------------------------- |
| Triggers Re-render   | No Re-render                  |
| Stores UI State      | Stores Mutable Value          |
| React Tracks Changes | React Doesn't Track `current` |
| Used for Rendering   | Used for References           |

---

# Common Interview Questions

### What is useRef?

A Hook that returns a mutable object with a `current` property that persists across renders.

---

### Does updating ref trigger re-render?

No.

Changing `ref.current` never triggers a re-render.

---

### Why?

Because React compares the ref object's reference.

Only

```javascript
current
```

changes.

The object itself remains the same.

---

### When should we use useRef?

* DOM Access
* Previous Values
* Timer IDs
* WebSocket
* Mutable Data
* Third-party Libraries

---

### Can useRef replace useState?

No.

If the value affects the UI,

use `useState`.

If it doesn't,

use `useRef`.

---

### What is forwardRef?

It allows a parent component to pass a ref through a child component to an underlying DOM element.

---

### Why use useImperativeHandle?

To expose only selected methods instead of exposing the complete DOM element.

---

# Quick Revision

```text
useRef

↓

Returns

{
    current: value
}

↓

Mutable

↓

Persists Across Renders

↓

Updating current

↓

No Re-render

--------------------------------

Common Uses

• DOM Access
• Previous State
• Timer ID
• WebSocket
• Scroll Position
• Third-party Libraries

--------------------------------

forwardRef

Parent

↓

Child

↓

DOM

--------------------------------

useImperativeHandle

Expose Only

focus()

clear()

scroll()

--------------------------------

Rule

UI Changes

↓

useState

Internal Mutable Values

↓

useRef
```

---

# Interview One-Liners

* `useRef` returns a mutable object with a `current` property.
* Updating `ref.current` **does not trigger a re-render**.
* React preserves the same ref object across renders.
* `useRef` is commonly used for **DOM access**, **previous values**, **timer IDs**, and **WebSocket instances**.
* Use `useState` for values that affect rendering; use `useRef` for values that don't.
* `forwardRef` lets a parent pass a ref to a child component's DOM element.
* `useImperativeHandle` exposes a controlled public API instead of the entire DOM element.
* Prefer updating refs in **effects** or **event handlers**, not during rendering.
ß