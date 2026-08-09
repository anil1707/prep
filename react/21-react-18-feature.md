# Module 21 – React 18 Features ⭐⭐⭐⭐⭐

## Topics
- Concurrent Rendering
- Automatic Batching
- Transitions
- `useTransition`
- `useDeferredValue`
- Suspense
- Streaming SSR
- `createRoot`
- Interview Questions
- Quick Revision

---

# 1. React 18 Overview

React 18 introduced major improvements around **concurrency, responsiveness, scheduling, and server rendering**.

The key idea:

> React can prioritize urgent work and defer less important work without blocking the user interface unnecessarily.

---

# 2. Concurrent Rendering ⭐⭐⭐⭐⭐

Concurrent Rendering allows React to work on rendering in an **interruptible** way.

React can:
- Start rendering
- Pause rendering
- Resume rendering
- Restart rendering
- Abandon outdated work

```text
Render Large List
       ↓
User Types
       ↓
Pause Lower-Priority Work
       ↓
Handle Input
       ↓
Continue Latest Work
```

**Important:** Concurrent Rendering does not mean multiple JavaScript threads. It means React can schedule and interrupt rendering work.

---

# 3. Automatic Batching ⭐⭐⭐⭐⭐

React 18 expanded automatic batching to more asynchronous situations when using the modern root API.

```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);
```

These updates can be batched into one render:

```text
setCount()
   +
setFlag()
   ↓
One Render
```

React 18 uses `createRoot` for the new root behavior.

---

# 4. `flushSync`

Sometimes an update needs to be flushed synchronously:

```jsx
import { flushSync } from "react-dom";

flushSync(() => {
  setCount(c => c + 1);
});
```

Use this very rarely because it can reduce the benefits of batching and hurt performance.

---

# 5. Transitions ⭐⭐⭐⭐⭐

A transition marks an update as **non-urgent**.

Example:

```text
Typing in Search Box
        ↓
Urgent Update

Filtering 10,000 Results
        ↓
Non-Urgent Update
```

The input should remain responsive while expensive result rendering can be handled as a transition.

---

# 6. `useTransition()` ⭐⭐⭐⭐⭐

```jsx
const [isPending, startTransition] = useTransition();
```

Example:

```jsx
function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    setQuery(value);

    startTransition(() => {
      setResults(filterLargeList(value));
    });
  };

  return (
    <>
      <input
        value={query}
        onChange={handleChange}
      />

      {isPending && <p>Updating results...</p>}

      <Results results={results} />
    </>
  );
}
```

`isPending` indicates that a transition is pending.

### Important Rule

Keep urgent updates outside the transition:

```jsx
setQuery(value);

startTransition(() => {
  setResults(filterLargeList(value));
});
```

---

# 7. `useDeferredValue()` ⭐⭐⭐⭐⭐

`useDeferredValue` gives you a deferred version of an existing value.

```jsx
const deferredQuery = useDeferredValue(query);
```

Think:

```text
query
 ↓
Immediate Value

deferredQuery
 ↓
Lower-Priority Version
```

Example:

```jsx
function Search({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <SearchResults query={deferredQuery} />;
}
```

The input can update immediately while expensive results update later.

---

# 8. `useTransition` vs `useDeferredValue` ⭐⭐⭐⭐⭐

| `useTransition` | `useDeferredValue` |
|---|---|
| Used with state updates | Used with an existing value |
| You control the update | React defers the value |
| `startTransition()` | `useDeferredValue()` |
| Returns `isPending` | Returns deferred value |

### Interview Rule

```text
useTransition
→ "I control the state update."

useDeferredValue
→ "I already have the value; give me
   a deferred version."
```

---

# 9. Suspense ⭐⭐⭐⭐⭐

Suspense lets React display fallback UI while a child is suspended.

Example with lazy loading:

```jsx
const Dashboard = lazy(() =>
  import("./Dashboard")
);

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

Flow:

```text
Render Dashboard
       ↓
Code Not Loaded
       ↓
Suspense
       ↓
Show Loading
       ↓
Chunk Loaded
       ↓
Render Dashboard
```

Suspense is a mechanism for coordinating fallback UI around **supported suspending operations**.

---

# 10. Streaming SSR ⭐⭐⭐⭐⭐

Streaming SSR allows the server to send HTML progressively instead of waiting for the entire page.

### Traditional SSR

```text
Server
  ↓
Render Entire Page
  ↓
Send Complete HTML
  ↓
Browser
```

### Streaming SSR

```text
Server
  ↓
Send Initial HTML
  ↓
Browser Starts Rendering
  ↓
Send More HTML
  ↓
Send Suspended Content Later
```

This can improve perceived loading performance.

---

# 11. Streaming SSR + Suspense

Suspense boundaries can allow parts of a server-rendered page to arrive progressively.

```jsx
<Suspense fallback={<ProductsSkeleton />}>
  <Products />
</Suspense>
```

Conceptually:

```text
HTML Shell
    ↓
Send Fast Content
    ↓
Send Slow Content Later
```

---

# 12. React 18 `createRoot`

React 18 introduced:

```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(
  document.getElementById("root")
);

root.render(<App />);
```

The modern root API enables React 18's new root behavior, including automatic batching.

---

# 13. React 18 Features Relationship

```text
                 React 18
                    ↓
          Concurrent Capabilities
                    ↓
      ┌─────────────┼─────────────┐
      ↓             ↓             ↓
Transitions     Suspense      Deferred Values
      ↓             ↓
useTransition   Streaming SSR
      ↓
Automatic Scheduling
```

---

# 14. Common Interview Questions ⭐⭐⭐⭐⭐

### What is Concurrent Rendering?

A React capability that allows rendering work to be scheduled, interrupted, resumed, restarted, or abandoned.

### What is Automatic Batching?

React groups multiple state updates into fewer renders in more situations, including asynchronous callbacks with the modern root API.

### What is a Transition?

A way to mark an update as non-urgent so React can keep urgent interactions responsive.

### What is `useTransition()`?

A Hook that lets you mark state updates as transitions and provides an `isPending` indicator.

### What is `useDeferredValue()`?

A Hook that provides a deferred version of an existing value so expensive consumers can update later.

### Difference between `useTransition` and `useDeferredValue`?

`useTransition` is used when you control the state update; `useDeferredValue` is used when you already have a value and want a deferred version of it.

### What is Suspense?

A mechanism for displaying fallback UI while React waits for supported suspending work.

### What is Streaming SSR?

Sending server-rendered HTML progressively to the browser instead of waiting for the complete page.

### Does Concurrent Rendering mean multiple threads?

No. It means React can schedule and interrupt rendering work.

---

# 15. Common Mistakes

### ❌ Transitions make calculations faster

They do not make expensive JavaScript calculations inherently faster. They change the priority of the resulting rendering work.

### ❌ Put urgent updates inside `startTransition`

A controlled input update should normally remain urgent.

### ❌ `useTransition` is a data-fetching API

It marks React state updates as non-urgent. It is not itself a data-fetching API.

### ❌ `useDeferredValue` is debouncing

It does not debounce input or reduce the number of updates by itself. It allows React to prioritize the deferred rendering work.

### ❌ Suspense is only a loading spinner

Suspense coordinates fallback UI around supported suspending operations.

---

# 16. Quick Revision ⭐⭐⭐⭐⭐

```text
React 18
   ↓
Concurrent Rendering
   ↓
Priority + Interruptibility

Automatic Batching
   ↓
Multiple Updates
   ↓
Fewer Renders

useTransition
   ↓
Mark Update as Non-Urgent

useDeferredValue
   ↓
Defer Existing Value

Suspense
   ↓
Fallback for Suspended Content

Streaming SSR
   ↓
Send HTML Progressively
```

---

# 17. Interview One-Liners

- React 18 introduced major improvements around concurrent rendering and scheduling.
- Automatic batching reduces unnecessary renders by grouping multiple state updates.
- `useTransition` marks updates as non-urgent.
- `isPending` indicates that a transition is pending.
- `useDeferredValue` provides a lower-priority version of an existing value.
- `useTransition` controls the update; `useDeferredValue` defers a value.
- Transitions improve responsiveness; they do not make expensive calculations faster.
- Suspense provides fallback UI for supported suspending operations.
- Streaming SSR sends server-rendered HTML progressively.
- Concurrent Rendering does not mean multi-threading.

---

# 18. 2-Minute Interview Answer

> React 18 introduced several features focused on responsiveness and concurrent rendering. Automatic batching allows React to group multiple state updates into fewer renders, including updates from asynchronous callbacks when using the modern root API. Transitions allow us to mark non-urgent updates so urgent interactions such as typing remain responsive. `useTransition` is useful when we control the state update, while `useDeferredValue` gives us a lower-priority version of an existing value. Suspense provides fallback UI for supported suspending operations such as lazy-loaded components. React 18 also introduced streaming SSR, where the server can progressively send HTML instead of waiting for the entire page to finish rendering. These features are built around React's ability to schedule and prioritize rendering work rather than making JavaScript execute on multiple threads.

---

# 19. Senior Interview Mental Model ⭐⭐⭐⭐⭐

```text
                    React 18
                       ↓
              Concurrent Rendering
                       ↓
          ┌────────────┼────────────┐
          ↓            ↓            ↓
     Automatic     Transitions    Suspense
      Batching         ↓            ↓
                       ↓       Streaming SSR
                 useTransition
                       +
                 useDeferredValue
```

### Most Important Distinction

```text
useTransition
→ "This STATE UPDATE is non-urgent."

useDeferredValue
→ "This VALUE can be consumed later."

Automatic Batching
→ "Group multiple STATE UPDATES."

Suspense
→ "Show fallback while supported work is suspended."

Streaming SSR
→ "Send SERVER HTML progressively."
```

---

# 20. Interview Priority

If revision time is limited:

```text
⭐⭐⭐⭐⭐ Concurrent Rendering
⭐⭐⭐⭐⭐ Automatic Batching
⭐⭐⭐⭐⭐ useTransition
⭐⭐⭐⭐⭐ useDeferredValue
⭐⭐⭐⭐ Suspense
⭐⭐⭐⭐ Streaming SSR
```
