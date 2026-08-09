# Module 16 -- Event Handling ⭐⭐⭐⭐⭐

## Topics Covered

-   What is Event Handling?
-   Synthetic Events
-   Native Event vs Synthetic Event
-   Event Pooling
-   Event Bubbling
-   Event Capturing
-   preventDefault()
-   stopPropagation()
-   Best Practices
-   Common Mistakes
-   Interview Questions
-   Quick Revision
-   Interview One-Liners
-   2-Minute Interview Answer

------------------------------------------------------------------------

# 1. What is Event Handling?

Event handling is the process of responding to user interactions such
as:

-   Click
-   Change
-   Submit
-   Key Press
-   Mouse Events
-   Focus / Blur

React uses **Synthetic Events** instead of directly exposing browser
events.

------------------------------------------------------------------------

# 2. Basic Syntax

``` jsx
function App() {

  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```

React uses camelCase event names:

-   onClick
-   onChange
-   onSubmit
-   onFocus
-   onBlur

------------------------------------------------------------------------

# 3. Synthetic Events ⭐⭐⭐⭐⭐

A **SyntheticEvent** is React's wrapper around the native browser event.

It provides:

-   Cross-browser compatibility
-   Consistent API
-   Same behavior across browsers

Example

``` jsx
const handleClick = (event) => {
  console.log(event);            // SyntheticEvent
  console.log(event.nativeEvent); // Native browser event
};
```

Use `event.nativeEvent` only when browser-specific APIs are required.

------------------------------------------------------------------------

# 4. Native Event vs Synthetic Event

  Native Event                Synthetic Event
  --------------------------- --------------------
  Browser API                 React Wrapper
  Browser-specific behavior   Consistent API
  Created by browser          Created by React
  Direct DOM event            Wraps native event

------------------------------------------------------------------------

# 5. Event Pooling ⭐⭐⭐⭐⭐

### React 16 and Earlier

React reused SyntheticEvent objects for performance.

``` jsx
const handleClick = (event) => {
  setTimeout(() => {
    console.log(event.target);
  }, 1000);
};
```

The event object became invalid after the handler completed.

Solution:

``` jsx
event.persist();
```

### React 17+

Event pooling was removed.

`event.persist()` is no longer needed.

------------------------------------------------------------------------

# 6. Event Bubbling ⭐⭐⭐⭐⭐

Events propagate from the target element upward.

``` jsx
<div onClick={() => console.log("Parent")}>
  <button onClick={() => console.log("Child")}>
    Click
  </button>
</div>
```

Output

``` text
Child
Parent
```

Flow

``` text
Target
 ↓
Parent
 ↓
Root
```

------------------------------------------------------------------------

# 7. Event Capturing ⭐⭐⭐⭐⭐

Capturing happens before the target is reached.

Use:

``` jsx
onClickCapture
```

Example

``` jsx
<div onClickCapture={() => console.log("Parent Capture")}>
  <button onClick={() => console.log("Child")}>
    Click
  </button>
</div>
```

Output

``` text
Parent Capture
Child
```

------------------------------------------------------------------------

# 8. Event Flow

``` text
Capture Phase
      ↓
Target
      ↓
Bubble Phase
```

React supports both phases.

------------------------------------------------------------------------

# 9. preventDefault()

Stops the browser's default behavior.

``` jsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    console.log("Submitted");
  }}
>
```

Common uses

-   Form submission
-   Anchor links
-   Drag & Drop

------------------------------------------------------------------------

# 10. stopPropagation()

Stops event propagation to parent elements.

``` jsx
<div onClick={() => console.log("Parent")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("Child");
    }}
  >
    Click
  </button>
</div>
```

Output

``` text
Child
```

------------------------------------------------------------------------

# 11. preventDefault vs stopPropagation

  preventDefault()               stopPropagation()
  ------------------------------ ---------------------------------------
  Stops browser default action   Stops event bubbling
  Doesn't stop propagation       Doesn't stop default browser behavior

------------------------------------------------------------------------

# 12. Best Practices

-   Prefer React event handlers over manual `addEventListener` for
    React-managed elements.
-   Use `preventDefault()` only when required.
-   Use `stopPropagation()` sparingly.
-   Keep handlers small and reusable.
-   Memoize callbacks only when performance requires it.

------------------------------------------------------------------------

# 13. Common Mistakes

❌ Confusing `preventDefault()` with `stopPropagation()`.

❌ Assuming `onClick` receives a native event.

❌ Using `event.persist()` in React 17+.

❌ Stopping propagation unnecessarily.

------------------------------------------------------------------------

# 14. Interview Questions

### What is a Synthetic Event?

A React wrapper around the native browser event that provides a
consistent cross-browser API.

### Why does React use Synthetic Events?

To normalize browser differences and simplify event handling.

### What is Event Pooling?

A React optimization (removed in React 17) where SyntheticEvent objects
were reused.

### Difference between Bubbling and Capturing?

-   Capturing: Top → Bottom
-   Bubbling: Bottom → Top

### Difference between preventDefault() and stopPropagation()?

-   `preventDefault()` stops the browser's default action.
-   `stopPropagation()` stops the event from reaching ancestor elements.

------------------------------------------------------------------------

# 15. Quick Revision

``` text
Synthetic Event
      ↓
React Wrapper
      ↓
Cross-browser API

Capture
   ↓
Target
   ↓
Bubble

preventDefault()
→ Stop default action

stopPropagation()
→ Stop bubbling
```

------------------------------------------------------------------------

# 16. Interview One-Liners

-   React uses Synthetic Events for consistent event handling.
-   `event.nativeEvent` gives access to the original browser event.
-   Event pooling was removed in React 17.
-   `onClickCapture` listens during the capture phase.
-   `preventDefault()` and `stopPropagation()` solve different problems.

------------------------------------------------------------------------

# 17. 2-Minute Interview Answer

> React handles events using Synthetic Events, which are wrappers around
> native browser events that provide a consistent API across browsers.
> React supports both the capturing and bubbling phases of event
> propagation. We can stop default browser actions with
> `preventDefault()` and stop propagation to parent elements with
> `stopPropagation()`. Earlier versions of React reused SyntheticEvent
> objects through event pooling, but this optimization was removed in
> React 17, so `event.persist()` is no longer required. In production, I
> rely on React's event system for most interactions and only access
> `event.nativeEvent` when browser-specific functionality is needed.
