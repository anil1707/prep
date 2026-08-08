# React Hook – useLayoutEffect ⭐⭐⭐⭐⭐

## Topics Covered

* What is `useLayoutEffect`
* Why `useLayoutEffect` Exists
* Internal Working
* Render vs Commit vs Paint
* useEffect vs useLayoutEffect
* DOM Measurements
* Preventing Layout Flicker
* Common Use Cases
* Best Practices
* Interview Questions

---

# 1. What is useLayoutEffect? ⭐⭐⭐⭐⭐

## Definition

`useLayoutEffect` is a React Hook that runs **synchronously after React updates the DOM but before the browser paints the screen**.

It is used when you need to:

* Read the DOM
* Measure the DOM
* Update the DOM before the user sees it

---

## Syntax

```jsx
useLayoutEffect(() => {

    // Side Effect

}, []);
```

---

# Why useLayoutEffect?

Some operations must happen **before the browser paints**.

Examples

* Measure element width
* Measure height
* Calculate position
* Scroll adjustment
* Tooltip positioning
* Prevent UI flickering

---

# 2. Internal Working ⭐⭐⭐⭐⭐

## useEffect Timeline

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

🎨 Browser Paint

↓

useEffect Executes
```

The user sees the UI first.

Then the effect runs.

---

## useLayoutEffect Timeline

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

useLayoutEffect Executes

↓

🎨 Browser Paint
```

The browser waits until `useLayoutEffect` finishes.

The user never sees the intermediate UI.

---

# 3. Why useLayoutEffect Exists ⭐⭐⭐⭐⭐

Suppose you need to center a modal.

Without measuring the DOM,

you don't know its width.

You must first

* Render the DOM
* Measure it
* Position it
* Show it

`useLayoutEffect` allows this to happen **before paint**.

---

# 4. Preventing Layout Flicker ⭐⭐⭐⭐⭐

Without `useLayoutEffect`

```jsx
function Modal() {

    const ref = useRef();

    useEffect(() => {

        const width = ref.current.offsetWidth;

        console.log(width);

    }, []);

    return <div ref={ref}>Modal</div>;

}
```

Timeline

```text
Paint

↓

User sees wrong layout

↓

Measure Width

↓

Move Modal

↓

User sees movement
```

Result

❌ UI Flicker

---

Using `useLayoutEffect`

```jsx
function Modal() {

    const ref = useRef();

    useLayoutEffect(() => {

        const width = ref.current.offsetWidth;

        console.log(width);

    }, []);

    return <div ref={ref}>Modal</div>;

}
```

Timeline

```text
DOM Updated

↓

Measure Width

↓

Move Modal

↓

Paint

↓

User sees final layout
```

Result

✅ No Flicker

---

# 5. DOM Measurement ⭐⭐⭐⭐⭐

One of the biggest use cases.

```jsx
useLayoutEffect(() => {

    const width = ref.current.offsetWidth;

    const height = ref.current.offsetHeight;

}, []);
```

Common APIs

```javascript
offsetWidth

offsetHeight

clientWidth

clientHeight

scrollWidth

scrollHeight

getBoundingClientRect()
```

---

# 6. Scroll Position Example ⭐⭐⭐⭐

```jsx
useLayoutEffect(() => {

    chatRef.current.scrollTop =
        chatRef.current.scrollHeight;

}, [messages]);
```

Flow

```text
Messages Updated

↓

DOM Updated

↓

Scroll To Bottom

↓

Paint

↓

Correct UI
```

The user never sees the wrong scroll position.

---

# 7. Tooltip Position Example ⭐⭐⭐⭐

```jsx
useLayoutEffect(() => {

    const rect =
        tooltipRef.current.getBoundingClientRect();

    setPosition(rect);

}, []);
```

Without `useLayoutEffect`

```text
Paint

↓

Tooltip Appears

↓

Move Tooltip
```

Visible movement.

---

With `useLayoutEffect`

```text
Measure

↓

Move Tooltip

↓

Paint
```

Perfect positioning.

---

# 8. useEffect vs useLayoutEffect ⭐⭐⭐⭐⭐

| useEffect                | useLayoutEffect               |
| ------------------------ | ----------------------------- |
| Runs after browser paint | Runs before browser paint     |
| Doesn't block painting   | Blocks painting               |
| Best for API calls       | Best for DOM measurements     |
| Best for timers          | Best for layout calculations  |
| Best for subscriptions   | Best for positioning elements |
| Preferred in most cases  | Use only when necessary       |

---

# Timeline Comparison

## useEffect

```text
Render

↓

Commit

↓

🎨 Paint

↓

useEffect
```

---

## useLayoutEffect

```text
Render

↓

Commit

↓

useLayoutEffect

↓

🎨 Paint
```

---

# 9. Common Use Cases ⭐⭐⭐⭐⭐

✅ Measure Element Size

```javascript
offsetWidth
```

---

✅ Measure Position

```javascript
getBoundingClientRect()
```

---

✅ Scroll Restoration

```javascript
scrollTop
```

---

✅ Tooltip Positioning

---

✅ Modal Centering

---

✅ Animation Setup

---

✅ Prevent Layout Flickering

---

# 10. When NOT to Use useLayoutEffect ⭐⭐⭐⭐⭐

Avoid it for

❌ API Calls

```javascript
fetch()
```

---

❌ Timers

```javascript
setTimeout()
```

---

❌ Event Listeners

---

❌ Logging

---

These should use

```javascript
useEffect()
```

---

# Why Not?

`useLayoutEffect` blocks browser painting.

Using it unnecessarily can reduce performance.

Always prefer

```javascript
useEffect()
```

unless synchronous DOM access is required.

---

# Best Practices ⭐⭐⭐⭐⭐

✅ Use `useEffect` by default.

---

✅ Use `useLayoutEffect` only for

* DOM Measurements
* Layout Calculations
* Preventing Flicker
* Scroll Position
* Animation Preparation

---

❌ Don't fetch data inside `useLayoutEffect`.

---

❌ Don't perform expensive computations inside `useLayoutEffect`.

---

# Common Interview Questions

### What is useLayoutEffect?

A Hook that runs synchronously after React updates the DOM but before the browser paints.

---

### Difference between useEffect and useLayoutEffect?

`useEffect`

Runs after paint.

`useLayoutEffect`

Runs before paint.

---

### Why shouldn't we always use useLayoutEffect?

Because it blocks browser painting and can negatively impact performance.

---

### When should we use useLayoutEffect?

* Measure DOM
* Position Tooltip
* Center Modal
* Restore Scroll
* Prevent Flickering

---

### Which one should we use by default?

Always prefer

```javascript
useEffect()
```

Use `useLayoutEffect()` only when you need synchronous DOM reads or writes before the browser paints.

---

# Quick Revision

```text
useLayoutEffect

↓

Runs After DOM Update

↓

Before Browser Paint

↓

Measure DOM

↓

Modify Layout

↓

Browser Paint

--------------------------------

Best For

• DOM Measurement
• Position Calculation
• Scroll Restoration
• Tooltip
• Modal
• Animation Setup
• Prevent Flicker

--------------------------------

Avoid

• API Calls
• Timers
• Logging
• Event Listeners

--------------------------------

Rule

useEffect
↓

Default Choice

useLayoutEffect
↓

Only When Layout Must Be Updated Before Paint
```

---

# Interview One-Liners

* `useLayoutEffect` runs **after the DOM update but before the browser paints**.
* It is synchronous and blocks painting until it finishes.
* Use it for **DOM measurements**, **layout calculations**, and **preventing UI flicker**.
* `useEffect` runs after the browser paints and is preferred for most side effects.
* Reading values like `offsetWidth`, `offsetHeight`, or `getBoundingClientRect()` is a common use case for `useLayoutEffect`.
* Overusing `useLayoutEffect` can hurt performance because it delays browser painting.
* Use `useEffect` by default and switch to `useLayoutEffect` only when you must read or update layout before the user sees the UI.
