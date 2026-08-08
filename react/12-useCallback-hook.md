# Module 12 -- useCallback ⭐⭐⭐⭐⭐

## Topics Covered

-   What is `useCallback`
-   Why React created it
-   Function Identity
-   Internal Working
-   Dependency Array
-   Function Memoization
-   Child Re-rendering
-   `useCallback` + `React.memo`
-   Real-world Examples
-   Performance Considerations
-   Best Practices
-   Common Mistakes
-   `useCallback` vs `useMemo`
-   Interview Questions
-   Quick Revision
-   Interview One-Liners
-   2-Minute Interview Answer

------------------------------------------------------------------------

# 1. What is useCallback?

`useCallback` is a React Hook that **memoizes a function reference**.

Instead of creating a new function on every render, React returns the
same function until one of its dependencies changes.

``` jsx
const memoizedFn = useCallback(() => {
  // logic
}, [dependencies]);
```

------------------------------------------------------------------------

# 2. Why React Created useCallback

Every time a functional component renders, **the component function
executes again**.

That means:

-   New variables
-   New arrays
-   New objects
-   **New functions**

are created.

``` jsx
function App() {
  const handleClick = () => {
    console.log("Clicked");
  };
}
```

Even though the code is identical, `handleClick` is a **new function
object** after every render.

This matters because React compares props by reference.

------------------------------------------------------------------------

# 3. Function Identity

``` js
const fn1 = () => {};
const fn2 = () => {};

console.log(fn1 === fn2); // false
```

Functions are compared by **reference**, not by implementation.

Every render creates a different function reference unless it is
memoized.

------------------------------------------------------------------------

# 4. Internal Working

Without `useCallback`

``` text
Render
 ↓
Create New Function
 ↓
Pass New Reference
```

With `useCallback`

``` text
Render
 ↓
Compare Dependencies
 ↓
Changed?
 ├─ Yes → Create New Function
 └─ No  → Return Previous Function
```

------------------------------------------------------------------------

# 5. Dependency Array

``` jsx
const handleSave = useCallback(() => {
  save(user);
}, [user]);
```

A new function is created only when one of the dependencies changes.

Rules:

-   `[]` → same function for the component lifetime
-   `[count]` → new function when `count` changes
-   `[a, b]` → new function when `a` or `b` changes

------------------------------------------------------------------------

# 6. Why Child Components Re-render

Parent

``` jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {};

  return <Child onClick={handleClick} />;
}
```

Every parent render creates a **new function**.

Child receives new props.

Even if nothing visible changed, a memoized child cannot skip rendering
because the function prop changed.

------------------------------------------------------------------------

# 7. useCallback + React.memo

``` jsx
const Child = React.memo(function Child({ onClick }) {
  console.log("Child Render");
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

Flow

``` text
Parent Render
 ↓
Same Function Reference
 ↓
React.memo compares props
 ↓
Props unchanged
 ↓
Skip Child Render
```

------------------------------------------------------------------------

# 8. Real-world Examples

### AG Grid

``` jsx
const onRowClicked = useCallback((row) => {
  console.log(row);
}, []);
```

### Search

``` jsx
const handleSearch = useCallback((value) => {
  setSearch(value);
}, []);
```

### Form Submit

``` jsx
const handleSubmit = useCallback(() => {
  saveForm(data);
}, [data]);
```

### Event Listener

``` jsx
const handleResize = useCallback(() => {
  console.log(window.innerWidth);
}, []);
```

Useful when the callback is also an effect dependency.

------------------------------------------------------------------------

# 9. Performance Considerations

`useCallback` is **not free**.

React stores:

-   Previous dependencies
-   Previous function reference

and compares dependencies on every render.

Only use it when it provides measurable value.

------------------------------------------------------------------------

# 10. When to Use

✅ Passing callbacks to `React.memo` components

✅ Function used in dependency arrays

✅ Expensive child components

✅ Stable callback references

------------------------------------------------------------------------

# 11. When NOT to Use

❌ Tiny components

❌ Inline functions that are never passed down

❌ Every function "just in case"

------------------------------------------------------------------------

# 12. Common Mistakes

### Memoizing everything

``` jsx
const add = useCallback(() => 1 + 2, []);
```

Not useful.

### Wrong dependencies

``` jsx
const save = useCallback(() => {
  api(user);
}, []);
```

`user` is missing.

### Thinking it prevents parent renders

It doesn't.

It only stabilizes the function reference.

------------------------------------------------------------------------

# 13. useCallback vs useMemo

  useCallback                 useMemo
  --------------------------- ---------------------------------
  Memoizes Function           Memoizes Value
  Returns Function            Returns Value
  Used for Stable Callbacks   Used for Expensive Calculations

------------------------------------------------------------------------

# 14. Interview Questions

### What is useCallback?

A Hook that memoizes a function reference.

### Why use it?

To keep function references stable and avoid unnecessary child renders
when function identity matters.

### Does it stop re-renders?

No. It only stabilizes the callback reference.

### Does every function need useCallback?

No. It should only be used where it provides a measurable benefit.

------------------------------------------------------------------------

# 15. Best Practices

-   Use it with `React.memo` when appropriate.
-   Include all required dependencies.
-   Profile before optimizing.
-   Prefer readability over premature optimization.

------------------------------------------------------------------------

# 16. Quick Revision

``` text
useCallback
 ↓
Memoizes Function
 ↓
Compare Dependencies
 ↓
Changed?
 ├─ Yes → New Function
 └─ No  → Old Function

Best For
• React.memo
• Stable callbacks
• Effect dependencies
```

------------------------------------------------------------------------

# 17. Interview One-Liners

-   `useCallback` memoizes **functions**, not values.
-   It returns the same function reference until dependencies change.
-   It does not prevent parent component re-renders.
-   It is commonly paired with `React.memo`.
-   Overusing `useCallback` can hurt readability without improving
    performance.

------------------------------------------------------------------------

# 18. 2-Minute Interview Answer

> `useCallback` is a React Hook that memoizes a function reference.
> Since functional components create new functions on every render,
> passing callbacks to child components can cause unnecessary re-renders
> because function references change. `useCallback` returns the same
> function until its dependencies change, making it useful with
> `React.memo` and in effect dependency arrays. However, it has its own
> overhead, so I only use it when it solves a real performance problem
> rather than wrapping every function.
