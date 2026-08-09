# Module 20 – Performance Optimization ⭐⭐⭐⭐⭐

## Topics

- Common Causes of Re-rendering
- `React.memo`
- `useMemo`
- `useCallback`
- Lazy Loading
- Suspense
- Code Splitting
- Virtualization
- Windowing
- Bundle Optimization
- React Profiler
- Common Performance Problems
- Interview Questions
- Quick Revision

---

# 1. What is React Performance Optimization?

React performance optimization is about reducing unnecessary:

- Component rendering work
- Expensive calculations
- DOM operations
- JavaScript execution
- Network requests
- JavaScript bundle size
- Memory usage

A useful approach:

```text
Performance Problem
       ↓
Measure
       ↓
Identify Bottleneck
       ↓
Optimize
       ↓
Measure Again
```

> **Do not optimize blindly. Profile first.**

---

# 2. Common Causes of Re-rendering ⭐⭐⭐⭐⭐

This is one of the most important interview topics.

Common causes:

```text
State Change
     ↓
Parent Re-render
     ↓
Props Change
     ↓
Context Change
     ↓
External Store Update
```

A **re-render** means React performs rendering work again.

> **Re-render does NOT necessarily mean DOM update.**

---

## 2.1 State Changes

```jsx
const [count, setCount] = useState(0);

setCount(10);
```

Flow:

```text
setState()
   ↓
Schedule Update
   ↓
Component Re-renders
```

If the new state is `Object.is`-equal to the current state, React can bail out of unnecessary work.

---

## 2.2 Parent Re-renders ⭐⭐⭐⭐⭐

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        {count}
      </button>

      <Child />
    </>
  );
}
```

When `Parent` re-renders, `Child` normally renders as part of that update.

```text
Parent Re-render
      ↓
Child Render
```

Use `React.memo` when appropriate:

```jsx
const Child = React.memo(function Child() {
  return <div>Child</div>;
});
```

---

## 2.3 Props Changes ⭐⭐⭐⭐⭐

```jsx
<Child count={count} />
```

When `count` changes:

```text
Parent Render
      ↓
New Prop
      ↓
Child Render
```

For a memoized child, React compares props before deciding whether the child can be skipped.

---

## 2.4 Object / Array Reference Changes ⭐⭐⭐⭐⭐

Example:

```jsx
<Child user={{ name: "Anil" }} />
```

A new object is created on every render:

```text
Render 1 → Object A
Render 2 → Object B
Render 3 → Object C
```

Even when the contents are identical:

```js
Object.is(objectA, objectB); // false
```

Therefore, a memoized child can still render.

Possible solution when reference stability actually matters:

```jsx
const user = useMemo(() => ({
  name: "Anil"
}), []);
```

Do not add `useMemo` automatically. Measure first.

---

## 2.5 Function Reference Changes ⭐⭐⭐⭐⭐

Example:

```jsx
<Child onClick={() => save()} />
```

Every render creates a new function:

```text
Render 1 → Function A
Render 2 → Function B
Render 3 → Function C
```

Therefore:

```js
functionA === functionB; // false
```

This can cause a memoized child to render.

Possible solution:

```jsx
const handleClick = useCallback(() => {
  save();
}, []);
```

Use this when function identity actually matters, especially with memoized children.

---

## 2.6 Context Changes ⭐⭐⭐⭐⭐

```jsx
const theme = useContext(ThemeContext);
```

When the Provider's context value changes:

```text
Provider Value Changes
        ↓
Context Consumers Re-render
```

If a context contains:

```jsx
{
  user,
  theme,
  language
}
```

a change to the context value can update all consumers of that context, even if they only use one part of the value.

### Solution: Context Splitting

```text
UserContext
ThemeContext
LanguageContext
```

---

## 2.7 External Store Updates

Components subscribed to external stores can re-render when the selected store state changes.

Examples:

- Redux
- Zustand
- `useSyncExternalStore`
- Other external state libraries

Prefer focused selectors when the library supports them.

---

# 3. What Does NOT Automatically Cause a Re-render?

## `useRef.current`

```jsx
const countRef = useRef(0);

countRef.current++;
```

Changing `.current` does **not** trigger a re-render.

---

## Normal Variables

```jsx
let count = 0;

count++;
```

React does not track normal variables.

---

## Manual DOM Changes

```js
document.querySelector("#title").textContent = "Hello";
```

This does not tell React that state changed and can conflict with React's rendering model.

---

# 4. Re-render ≠ DOM Update ⭐⭐⭐⭐⭐

This is extremely important.

```text
Parent Re-render
       ↓
Child may render
       ↓
React compares output
       ↓
DOM actually changed?
    ↙       ↘
  Yes        No
   ↓          ↓
DOM Update   No DOM Update
```

A component can execute again while React determines that the resulting DOM does not need to change.

---

# 5. Common Production Re-render Problems

## Problem 1 – Large Parent Component

```text
Dashboard
 ├── Header
 ├── Chart
 ├── Table
 ├── Form
 └── Sidebar
```

A state change in `Dashboard` can cause significant rendering work.

### Solutions

- Move state closer to where it is needed.
- Split large components.
- Memoize expensive children when useful.

---

## Problem 2 – New Objects and Functions

```jsx
<Child
  options={{ theme: "dark" }}
  onSave={() => save()}
/>
```

New references are created on every render.

This can defeat shallow memoization.

---

## Problem 3 – Huge Context

```text
AppContext
 ├── User
 ├── Theme
 ├── Cart
 ├── Permissions
 └── Language
```

Split unrelated concerns into focused contexts.

---

## Problem 4 – Large Lists

```text
10,000 rows
     ↓
10,000 components
     ↓
Expensive rendering
```

Use virtualization/windowing.

---

# 6. React.memo ⭐⭐⭐⭐⭐

`React.memo` memoizes a functional component and can skip rendering when its props are considered unchanged.

```jsx
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

Conceptually:

```text
Parent Render
      ↓
React.memo
      ↓
Compare Props
      ↓
Same?
 ├── Yes → Skip Child Render
 └── No  → Render Child
```

By default, React compares props using shallow/reference equality.

### Important

`React.memo` is a performance optimization, not a guarantee that the component will never render.

---

# 7. useMemo ⭐⭐⭐⭐⭐

`useMemo` memoizes a calculated value.

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);
```

React can reuse the previous calculated result until dependencies change.

### Good Use Cases

- Expensive calculations
- Large filtering/sorting operations
- Derived data
- Stable object/array references when useful

Avoid unnecessary memoization:

```jsx
const value = useMemo(() => 10 + 20, []);
```

The calculation is too cheap to justify it in most cases.

---

# 8. useCallback ⭐⭐⭐⭐⭐

`useCallback` memoizes a function reference.

```jsx
const handleDelete = useCallback((id) => {
  deleteUser(id);
}, []);
```

Useful when:

- Passing callbacks to memoized children
- Function identity matters
- A callback is used as an effect dependency

---

# 9. React.memo + useMemo + useCallback

These can work together:

```jsx
const Child = React.memo(function Child({
  users,
  onSelect
}) {
  return (
    <UserList
      users={users}
      onSelect={onSelect}
    />
  );
});

function Parent({ users }) {
  const activeUsers = useMemo(() => {
    return users.filter(user => user.active);
  }, [users]);

  const handleSelect = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <Child
      users={activeUsers}
      onSelect={handleSelect}
    />
  );
}
```

Conceptually:

```text
useMemo
→ Stable value reference

useCallback
→ Stable function reference

React.memo
→ Can skip child render
```

---

# 10. Lazy Loading ⭐⭐⭐⭐⭐

Lazy loading loads code only when it is needed.

```jsx
const Dashboard = lazy(() =>
  import("./Dashboard")
);
```

This can reduce the initial JavaScript required for the application.

---

# 11. Suspense ⭐⭐⭐⭐⭐

`Suspense` provides fallback UI while React is waiting for a supported suspending operation.

For lazy-loaded components:

```jsx
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

Flow:

```text
Need Component
      ↓
Load Chunk
      ↓
Loading UI
      ↓
Component Ready
      ↓
Render Component
```

---

# 12. Code Splitting ⭐⭐⭐⭐⭐

Code splitting divides a large JavaScript application into smaller chunks.

Without splitting:

```text
app.js
 ├── Dashboard
 ├── Reports
 ├── Settings
 ├── Admin
 └── Charts
```

With splitting:

```text
main.js
dashboard.chunk.js
reports.chunk.js
settings.chunk.js
admin.chunk.js
```

Only required chunks need to be loaded.

---

# 13. Route-Based Code Splitting

A common production strategy:

```jsx
const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const Reports = lazy(() =>
  import("./pages/Reports")
);
```

Then:

```jsx
<Suspense fallback={<PageLoader />}>
  <Routes>
    {/* routes */}
  </Routes>
</Suspense>
```

---

# 14. Component-Based Code Splitting

Large or rarely used components can also be split:

```jsx
const HeavyChart = lazy(() =>
  import("./HeavyChart")
);
```

Useful for:

- Heavy charts
- Large editors
- Rarely opened modals
- Admin-only features
- Below-the-fold features

---

# 15. Virtualization ⭐⭐⭐⭐⭐

Virtualization is useful for very large lists.

Suppose:

```text
100,000 rows
```

Rendering all rows creates unnecessary DOM work.

Instead:

```text
100,000 Items
       ↓
Visible Area
       ↓
~20 Items Rendered
```

As the user scrolls, the visible items change.

---

# 16. Windowing ⭐⭐⭐⭐⭐

Windowing is the technique of maintaining a small "window" of rendered items around the visible viewport.

Example:

```text
Total Items: 10,000

Current Window:
101
102
103
...
120
```

After scrolling:

```text
New Window:
121
122
123
...
140
```

The DOM remains relatively small.

---

# 17. Virtualization vs Windowing

These terms are often used interchangeably.

| Virtualization | Windowing |
|---|---|
| General optimization concept | Visible-window implementation technique |
| Avoids rendering all items | Maintains a small rendered range |
| Useful for large datasets | Common for lists and grids |

Examples of React virtualization libraries:

- `react-window`
- TanStack Virtual

---

# 18. When to Use Virtualization

Useful for:

- Large tables
- Chat messages
- Activity feeds
- Search results
- Large dropdowns
- Data-heavy dashboards

---

# 19. Bundle Optimization ⭐⭐⭐⭐⭐

A large JavaScript bundle increases:

- Download time
- Parse time
- Compile time
- Execution time

### Techniques

- Code splitting
- Tree shaking
- Dynamic imports
- Removing unused dependencies
- Replacing heavy dependencies
- Bundle analysis

---

# 20. Tree Shaking

Tree shaking removes unused code from production bundles when the module and bundler setup supports it.

Prefer imports that allow the bundler to eliminate unused exports.

For example, with libraries that support ESM:

```js
import { debounce } from "lodash-es";
```

Avoid unnecessarily importing an entire large library when only a small part is required.

---

# 21. Dynamic Imports

```js
const module = await import("./heavyModule");
```

The module can be loaded when required.

Useful for:

- Rare features
- Admin functionality
- Heavy libraries
- Editors
- Charts

---

# 22. React Profiler ⭐⭐⭐⭐⭐

React DevTools Profiler helps identify:

- Which components render
- How often they render
- Render duration
- Expensive updates

Instead of assuming:

> "This component is slow."

Measure it.

---

# 23. Performance Optimization Strategy

When an application is slow:

```text
1. Measure
      ↓
2. Identify Bottleneck
      ↓
3. Is it Rendering?
      ↓
4. Is it JavaScript?
      ↓
5. Is it Network?
      ↓
6. Is Bundle Too Large?
      ↓
7. Optimize
      ↓
8. Measure Again
```

---

# 24. Common Performance Problems

| Problem | Possible Solution |
|---|---|
| Unnecessary child renders | `React.memo` |
| Expensive calculation | `useMemo` |
| Unstable callback | `useCallback` |
| Large initial bundle | Code splitting |
| Rarely used component | Lazy loading |
| Loading UI for suspended content | `Suspense` |
| Huge list | Virtualization |
| Large DOM | Windowing |
| Unused JavaScript | Tree shaking |
| Heavy dependencies | Bundle analysis/replacement |

---

# 25. Common Mistakes ⭐⭐⭐⭐⭐

### ❌ Memoizing everything

```jsx
useMemo(() => 10 + 20, []);
```

Usually unnecessary.

### ❌ Using useCallback everywhere

Memoization has its own overhead and does not automatically improve performance.

### ❌ Rendering thousands of DOM nodes

Use virtualization for genuinely large lists.

### ❌ Lazy-loading everything

Excessive splitting can create too many chunks and loading boundaries.

### ❌ Optimizing without measuring

Always identify the bottleneck first.

---

# 26. Interview Questions ⭐⭐⭐⭐⭐

### What are common causes of re-rendering?

- State changes
- Parent re-renders
- Props changes
- Object/array reference changes
- Function reference changes
- Context changes
- External store updates

---

### Does re-render mean DOM update?

No.

React can execute a component again and then determine that no DOM change is required.

---

### What does `React.memo` do?

It can skip rendering a functional component when its props are considered unchanged.

---

### Difference between `useMemo` and `useCallback`?

`useMemo` memoizes a **value**.

`useCallback` memoizes a **function reference**.

---

### Why use `useCallback` with `React.memo`?

A new function is a new reference on each render. `useCallback` can preserve the function reference so a memoized child can potentially skip rendering.

---

### What is code splitting?

Breaking application code into smaller chunks that can be loaded independently.

---

### What is lazy loading?

Loading a component or module only when it is needed.

---

### What is Suspense?

A React mechanism for showing fallback UI while a child is waiting on a supported suspending operation.

---

### What is virtualization?

Rendering only a limited portion of a large dataset instead of creating DOM nodes for every item.

---

### What is windowing?

Maintaining a small rendered window of items while navigating through a much larger collection.

---

# 27. Senior Scenario Question ⭐⭐⭐⭐⭐

### Scenario

A dashboard has:

- 10,000 table rows
- Multiple charts
- Large JavaScript bundle
- Slow initial load
- Laggy search input

### Approach

```text
Slow Initial Load
       ↓
Code Splitting
       ↓
Lazy Load Charts / Routes

Large Table
       ↓
Virtualization / Windowing

Unnecessary Renders
       ↓
React.memo
useMemo
useCallback

Large Bundle
       ↓
Bundle Analyzer
       ↓
Remove / Replace Heavy Dependencies

Slow Search
       ↓
Debounce Input
       ↓
Optimize Filtering
       ↓
Virtualized Results
```

Most importantly:

> **Profile first instead of blindly adding memoization.**

---

# 28. Interview Answer – Performance Optimization

> React performance optimization starts with identifying the actual bottleneck. Common causes of unnecessary rendering include state updates, parent renders, changed props, unstable object or function references, context changes, and external store updates. For unnecessary child renders, I may use `React.memo`; for expensive calculations, `useMemo`; and for stable callback references, `useCallback`. For large applications, code splitting and lazy loading can reduce the initial JavaScript payload, with Suspense providing fallback UI for supported suspending content. For very large lists, I use virtualization or windowing. I also analyze the production bundle to identify heavy dependencies and unused code. Finally, I profile again to verify that the optimization actually improved performance.

---

# 29. Quick Revision ⭐⭐⭐⭐⭐

```text
COMMON RE-RENDER CAUSES

State Change
Parent Render
Props Change
Object/Array Reference Change
Function Reference Change
Context Change
External Store Update

NOT AUTOMATICALLY

useRef.current Change
Normal Variable Change
```

```text
React.memo
→ Memoize Component

useMemo
→ Memoize Value

useCallback
→ Memoize Function

Lazy Loading
→ Load When Needed

Suspense
→ Fallback for Supported Suspensions

Code Splitting
→ Split JS Into Chunks

Virtualization
→ Render Only Needed Items

Windowing
→ Maintain Small Visible Window

Bundle Optimization
→ Reduce JS Cost
```

---

# 30. Interview One-Liners

- **Re-render ≠ DOM update.**
- State changes can trigger re-renders.
- Parent renders normally cause child rendering work unless optimized.
- New object/array/function references can defeat shallow memoization.
- Context value changes update its consumers.
- `React.memo` memoizes component rendering based on props.
- `useMemo` memoizes a calculated value.
- `useCallback` memoizes a function reference.
- Lazy loading loads code when needed.
- Code splitting divides the application into smaller chunks.
- Suspense provides fallback UI for supported suspending operations.
- Virtualization keeps large lists from creating huge DOM trees.
- Bundle optimization reduces JavaScript download, parse, and execution costs.
- **Always measure before optimizing.**

---

# 31. Most Important Senior Interview Principle ⭐⭐⭐⭐⭐

> **Performance optimization is not about using every optimization technique. It is about identifying the bottleneck and applying the smallest effective optimization.**

```text
Measure
  ↓
Find Bottleneck
  ↓
Choose Correct Optimization
  ↓
Implement
  ↓
Measure Again
```
