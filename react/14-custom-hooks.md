# Module 14 -- Custom Hooks ⭐⭐⭐⭐⭐

## Topics Covered

-   What are Custom Hooks?
-   Why React introduced them
-   Rules of Custom Hooks
-   Internal Working
-   Creating Custom Hooks
-   Sharing Logic vs Sharing State
-   Real-world Examples
-   Folder Structure
-   Best Practices
-   Common Mistakes
-   Interview Questions
-   Quick Revision
-   Interview One-Liners
-   2-Minute Interview Answer

------------------------------------------------------------------------

# 1. What are Custom Hooks?

A **Custom Hook** is a normal JavaScript function whose name starts with
**`use`** and that uses one or more React Hooks internally.

``` jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);

  return { count, increment };
}
```

Usage:

``` jsx
function App() {
  const { count, increment } = useCounter();

  return <button onClick={increment}>{count}</button>;
}
```

------------------------------------------------------------------------

# 2. Why React Introduced Custom Hooks

Before Custom Hooks, developers reused logic using:

-   Higher Order Components (HOCs)
-   Render Props

Both often led to deeply nested component trees.

Custom Hooks solve this by extracting **stateful logic** into reusable
functions.

------------------------------------------------------------------------

# 3. Important Concept

**Custom Hooks share logic, not state.**

``` jsx
const user1 = useCounter();
const user2 = useCounter();
```

Each call creates a **separate state**.

``` text
useCounter()
   ↓
State A

useCounter()
   ↓
State B
```

The logic is reused, but each component has its own independent state.

------------------------------------------------------------------------

# 4. Rules of Custom Hooks

A Custom Hook must follow the same Rules of Hooks.

✅ Name starts with `use`

``` jsx
useAuth()
useFetch()
useTheme()
```

✅ Call Hooks only at the top level.

❌ Don't call Hooks inside loops or conditions.

------------------------------------------------------------------------

# 5. Internal Working

``` text
Component
    ↓
Calls Custom Hook
    ↓
Custom Hook Calls React Hooks
    ↓
React Stores Hook State
    ↓
Return Values
```

React doesn't treat Custom Hooks differently.

It simply executes the function, and the Hooks inside become part of the
component's Hook list.

------------------------------------------------------------------------

# 6. Real-world Examples

## useFetch

``` jsx
function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData);
  }, [url]);

  return data;
}
```

------------------------------------------------------------------------

## usePrevious

``` jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

------------------------------------------------------------------------

## useDebounce

``` jsx
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
```

------------------------------------------------------------------------

## Other Common Hooks

-   useLocalStorage
-   useWindowSize
-   useOnlineStatus
-   useTheme
-   useMediaQuery
-   useIntersectionObserver

------------------------------------------------------------------------

# 7. Folder Structure

``` text
src/
 ├── hooks/
 │    ├── useFetch.js
 │    ├── useDebounce.js
 │    ├── usePrevious.js
 │    └── useLocalStorage.js
```

Keep reusable Hooks in a dedicated `hooks` folder.

------------------------------------------------------------------------

# 8. Best Practices

-   Keep each Hook focused on one responsibility.
-   Return only what consumers need.
-   Use meaningful names.
-   Hide implementation details.
-   Handle cleanup inside the Hook.

------------------------------------------------------------------------

# 9. Common Mistakes

❌ Forgetting the `use` prefix.

❌ Calling Hooks conditionally inside a Custom Hook.

❌ Putting unrelated logic into one large Hook.

❌ Sharing mutable module-level variables expecting shared Hook state.

------------------------------------------------------------------------

# 10. Performance Considerations

Custom Hooks **do not automatically improve performance**.

They improve:

-   Reusability
-   Maintainability
-   Separation of concerns

Performance depends on the Hooks used inside.

------------------------------------------------------------------------

# 11. Interview Questions

### What is a Custom Hook?

A reusable JavaScript function that starts with `use` and contains React
Hooks.

### Why do we use Custom Hooks?

To reuse stateful logic across components.

### Do Custom Hooks share state?

No.

Each invocation has its own independent state.

### Can one Custom Hook call another?

Yes.

Custom Hooks can compose other Custom Hooks.

------------------------------------------------------------------------

# 12. Quick Revision

``` text
Custom Hook
     ↓
Starts with "use"
     ↓
Uses React Hooks
     ↓
Reuses Logic
     ↓
Independent State Per Call

Examples
• useFetch
• usePrevious
• useDebounce
• useLocalStorage
```

------------------------------------------------------------------------

# 13. Interview One-Liners

-   Custom Hooks reuse **logic**, not state.
-   Every call gets its own Hook state.
-   They must follow the Rules of Hooks.
-   They improve code reuse and maintainability.
-   They can call other Custom Hooks.

------------------------------------------------------------------------

# 14. 2-Minute Interview Answer

> A Custom Hook is a reusable JavaScript function whose name starts with
> `use` and which internally uses React Hooks. It allows us to extract
> and reuse stateful logic without changing the component hierarchy.
> Unlike HOCs or Render Props, Custom Hooks provide a cleaner
> composition model. Each call to a Custom Hook creates its own
> independent state, so they share logic rather than state. In
> production, I use Custom Hooks for concerns like API fetching,
> debouncing, local storage, previous values, window size, and
> authentication logic, keeping components small and easy to maintain.
