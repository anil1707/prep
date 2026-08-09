# Module 19 – React Rendering Process ⭐⭐⭐⭐⭐

## Topics Covered

- Render Phase
- Commit Phase
- Layout Effects
- Passive Effects
- Render vs Commit
- `useLayoutEffect` vs `useEffect`
- Effect Cleanup
- Interview Questions
- Quick Revision
- Interview One-Liners
- 2-Minute Interview Answer

---

# 1. React Rendering Process

At a high level:

```text
Update Trigger
     ↓
Render Phase
     ↓
Commit Phase
     ↓
Browser Paint
     ↓
Passive Effects
```

An update can be triggered by:

- State change
- Props change
- Context change
- Parent render
- External store update

---

# 2. Render Phase ⭐⭐⭐⭐⭐

The **Render Phase** is where React determines **what the UI should look like**.

React:

1. Executes components.
2. Creates/updates the Work-in-Progress Fiber tree.
3. Performs reconciliation.
4. Calculates the changes required.

```text
State Update
     ↓
Schedule Work
     ↓
Render Phase
     ↓
Execute Components
     ↓
Build WIP Fiber Tree
     ↓
Reconciliation
     ↓
Determine Changes
```

## Important

The Render Phase should be **pure**.

Avoid side effects:

```jsx
function App() {
  // ❌ Don't do this during render
  localStorage.setItem("key", "value");

  return <div>Hello</div>;
}
```

Use effects or event handlers for side effects.

---

# 3. Render Phase Can Be Interrupted

With modern React and Fiber, rendering work can be interrupted.

```text
Render
  ↓
Work
  ↓
Pause
  ↓
Handle Higher Priority Work
  ↓
Resume / Restart
```

Therefore, don't depend on the render function running exactly once.

---

# 4. Commit Phase ⭐⭐⭐⭐⭐

After React finishes the Render Phase, it enters the **Commit Phase**.

The Commit Phase applies the calculated changes to the host environment, such as the browser DOM.

```text
Render Phase
     ↓
Calculate Changes
     ↓
Commit Phase
     ↓
DOM Updates
```

The Commit Phase is synchronous.

---

# 5. Complete Flow

```text
State / Props / Context Update
            ↓
       Render Phase
            ↓
   Reconciliation / Diff
            ↓
       Commit Phase
            ↓
       DOM Mutation
            ↓
      Layout Effects
            ↓
       Browser Paint
            ↓
      Passive Effects
```

The exact browser scheduling around paint and effects can vary by situation, but this is the useful interview mental model.

---

# 6. Layout Effects ⭐⭐⭐⭐⭐

`useLayoutEffect` runs **after React commits DOM changes but before the browser paints the updated screen**.

```jsx
useLayoutEffect(() => {
  // Read or synchronously adjust layout
}, []);
```

Flow:

```text
Render
  ↓
Commit DOM
  ↓
useLayoutEffect
  ↓
Browser Paint
```

---

# 7. Why useLayoutEffect Exists

Sometimes you need to:

1. Render an element.
2. Read its dimensions or position.
3. Make an adjustment.
4. Paint the final result.

Example:

```jsx
function Tooltip() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();

    console.log(rect.width);
  }, []);

  return <div ref={ref}>Tooltip</div>;
}
```

The DOM has already been updated, so the element can be measured.

---

# 8. useLayoutEffect vs useEffect ⭐⭐⭐⭐⭐

| `useLayoutEffect` | `useEffect` |
|---|---|
| Runs after DOM mutation | Runs after commit and generally after paint |
| Before browser paint | Usually after browser paint |
| Can block painting | Doesn't normally block paint |
| Used for layout measurement | Used for most side effects |
| Use sparingly | Preferred default |

---

# 9. Passive Effects ⭐⭐⭐⭐⭐

A **passive effect** is an effect created with `useEffect`.

```jsx
useEffect(() => {
  console.log("Effect");
}, []);
```

React generally runs passive effects after the browser has had an opportunity to paint.

That's why `useEffect` is preferred for most side effects.

---

# 10. Examples of Passive Effects

## API Calls

```jsx
useEffect(() => {
  fetchUsers();
}, []);
```

## Subscriptions

```jsx
useEffect(() => {
  const unsubscribe = subscribe();

  return unsubscribe;
}, []);
```

## Timers

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

## External System Synchronization

```jsx
useEffect(() => {
  analytics.track("page_view");
}, []);
```

---

# 11. Why useEffect is Called a Passive Effect

React does not normally execute `useEffect` while synchronously blocking the browser from painting.

Conceptually:

```text
Commit
  ↓
Browser can Paint
  ↓
Passive Effects
```

This keeps rendering responsive.

---

# 12. Layout Effect Example

Suppose a tooltip initially appears at the wrong position.

With `useEffect`:

```text
Render
 ↓
DOM Update
 ↓
Browser Paint
 ↓
useEffect
 ↓
Position Correction
 ↓
Another Paint
```

The user may briefly see the incorrect position.

With `useLayoutEffect`:

```text
Render
 ↓
DOM Update
 ↓
useLayoutEffect
 ↓
Position Correction
 ↓
Browser Paint
```

The correction happens before the user sees the result.

---

# 13. When to Use useLayoutEffect

Use it when you need to:

- Measure DOM dimensions
- Read layout information
- Position elements
- Synchronize DOM measurements
- Prevent visual flickering caused by layout correction

Example:

```jsx
const rect = element.getBoundingClientRect();
```

---

# 14. When NOT to Use useLayoutEffect

Don't use it for ordinary:

- API calls
- Data fetching
- Logging
- Timers
- Subscriptions
- Analytics

Prefer:

```jsx
useEffect();
```

Using `useLayoutEffect` unnecessarily can delay painting.

---

# 15. Render Phase vs Commit Phase

| Render Phase | Commit Phase |
|---|---|
| Determines what should change | Applies changes |
| Executes components | Updates DOM |
| Builds WIP Fiber tree | Commits completed work |
| Reconciliation | DOM mutation |
| Can be interrupted | Synchronous |

---

# 16. Layout Effects vs Passive Effects

```text
                React Update
                     ↓
               Render Phase
                     ↓
               Commit Phase
                     ↓
                DOM Updated
                     ↓
             useLayoutEffect
                     ↓
               Browser Paint
                     ↓
                useEffect
```

### Most important mental model

```text
Render
→ Calculate

Commit
→ Apply

useLayoutEffect
→ Before Paint

useEffect
→ Passive / Usually After Paint
```

---

# 17. Cleanup Timing ⭐⭐⭐⭐⭐

Both types of effects can return cleanup functions.

## useEffect

```jsx
useEffect(() => {
  const id = setInterval(work, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

## useLayoutEffect

```jsx
useLayoutEffect(() => {
  subscribeToLayout();

  return () => {
    unsubscribeFromLayout();
  };
}, []);
```

Cleanup prevents:

- Memory leaks
- Duplicate subscriptions
- Timers continuing unnecessarily
- Stale external connections

---

# 18. Important Interview Points

### Does Render Phase modify the DOM?

**No.**

The Render Phase calculates what should change.

The Commit Phase applies the changes.

### Can Render Phase run more than once?

**Yes.**

Especially with modern concurrent rendering.

Therefore, keep render logic pure.

### Why shouldn't we fetch data directly during render?

Rendering can be restarted or repeated, potentially causing duplicate or unpredictable side effects.

Prefer:

```jsx
useEffect(...)
```

or a dedicated data-fetching solution.

---

# 19. Common Interview Questions

### What is the Render Phase?

The phase where React executes components and determines what changes are required.

### What is the Commit Phase?

The phase where React applies the calculated changes to the DOM/host environment.

### Which phase can be interrupted?

The Render Phase can be interrupted or restarted.

### Can the Commit Phase be interrupted?

No. It is treated as synchronous.

### What is `useLayoutEffect`?

An effect that runs after DOM mutations but before the browser paints the updated UI.

### What is a passive effect?

A `useEffect` callback that React schedules separately from synchronous commit work, generally after paint.

### Which should you prefer: `useEffect` or `useLayoutEffect`?

Prefer `useEffect` unless you specifically need to read or synchronously adjust layout before paint.

---

# 20. Common Mistakes

### ❌ Side effects during render

```jsx
function App() {
  fetch("/api/users"); // ❌
}
```

### ❌ Using useLayoutEffect everywhere

This can block painting and hurt performance.

### ❌ Assuming useEffect runs before paint

It is generally scheduled after the browser has had an opportunity to paint.

### ❌ Thinking render = DOM update

Rendering calculates the result; committing applies it.

---

# 21. Quick Revision ⭐⭐⭐⭐⭐

```text
Update
 ↓
Render Phase
 ↓
Reconciliation
 ↓
Commit Phase
 ↓
DOM Mutation
 ↓
Layout Effects
 ↓
Browser Paint
 ↓
Passive Effects
```

Remember:

```text
Render
→ Calculate

Commit
→ Apply

useLayoutEffect
→ Before Paint

useEffect
→ Passive / Usually After Paint
```

---

# 22. Interview One-Liners

- Render Phase calculates what React should change.
- Commit Phase applies the changes.
- Render Phase can be interrupted.
- Commit Phase is synchronous.
- `useLayoutEffect` runs after DOM mutation and before paint.
- `useEffect` is a passive effect and generally runs after paint.
- Prefer `useEffect` unless layout synchronization is required.
- Never put side effects directly inside render.

---

# 23. 2-Minute Interview Answer

> React rendering is broadly divided into the Render Phase and Commit Phase. During the Render Phase, React executes components, builds or updates the Work-in-Progress Fiber tree, performs reconciliation, and determines what needs to change. This phase can be interrupted or restarted in modern React, so rendering should remain pure. During the Commit Phase, React applies the calculated changes to the DOM. After DOM mutations, `useLayoutEffect` runs before the browser paints, which makes it useful for measuring or synchronously adjusting layout. `useEffect` is a passive effect and is generally run after the browser has had an opportunity to paint, so it's the preferred choice for most side effects such as API calls, subscriptions, timers, and synchronization with external systems.
