# Module 17-- Lists & Keys ⭐⭐⭐⭐⭐

## Topics Covered

-   Rendering Lists
-   What are Keys?
-   Why Keys Matter
-   Reconciliation
-   Key Generation
-   Common Mistakes
-   Interview Questions

------------------------------------------------------------------------

# 1. Rendering Lists

React uses JavaScript methods like `map()` to render collections.

``` jsx
const users = [
  { id: 1, name: "Anil" },
  { id: 2, name: "Rahul" }
];

function App() {
  return (
    <>
      {users.map(user => (
        <h2 key={user.id}>{user.name}</h2>
      ))}
    </>
  );
}
```

------------------------------------------------------------------------

# 2. What are Keys?

A **key** is a special prop that uniquely identifies an element in a
list.

``` jsx
<UserCard key={user.id} />
```

Keys help React track elements between renders.

> Keys are used internally by React and are **not available as props**.

------------------------------------------------------------------------

# 3. Why Keys Matter ⭐⭐⭐⭐⭐

React uses keys during reconciliation to determine:

-   Which items stayed the same
-   Which items were added
-   Which items were removed
-   Which items moved

Without stable keys, React may recreate components unnecessarily.

------------------------------------------------------------------------

# 4. Reconciliation

Old List

``` text
A
B
C
```

New List

``` text
A
D
C
```

React compares keys and updates only the changed element instead of
rebuilding the whole list.

Flow

``` text
Old Virtual DOM
      ↓
Compare Keys
      ↓
Reuse Matching Elements
      ↓
Update Changed Nodes
```

------------------------------------------------------------------------

# 5. Key Generation

✅ Best

``` jsx
key={user.id}
```

✅ Good

``` jsx
key={user.email}
```

⚠ Static lists only

``` jsx
key={index}
```

❌ Avoid

``` jsx
key={Math.random()}
```

Random keys force React to recreate every item on every render.

------------------------------------------------------------------------

# 6. Common Mistakes

❌ Missing keys

❌ Using array index for dynamic lists

❌ Using random values as keys

❌ Assuming `key` is available inside child props

------------------------------------------------------------------------

# 7. Interview Questions

### Why are keys important?

They help React identify elements efficiently during reconciliation.

### Can we use array index?

Only for static lists whose order never changes.

### Are keys passed as props?

No.

------------------------------------------------------------------------

# Quick Revision

``` text
List
 ↓
map()
 ↓
key
 ↓
Reconciliation
 ↓
Efficient DOM Updates
```

------------------------------------------------------------------------

# Module 19 -- Conditional Rendering ⭐⭐⭐⭐⭐

## Topics Covered

-   if
-   &&
-   Ternary
-   switch
-   Component Mapping
-   Best Practices
-   Common Mistakes

------------------------------------------------------------------------

# 1. What is Conditional Rendering?

Conditional rendering means displaying different UI based on application
state.

------------------------------------------------------------------------

# 2. if Statement

``` jsx
if (isLoggedIn) {
  return <Dashboard />;
}

return <Login />;
```

Best for large UI branches.

------------------------------------------------------------------------

# 3. && Operator

``` jsx
{isAdmin && <AdminPanel />}
```

Renders the component only when the condition is truthy.

------------------------------------------------------------------------

# 4. Ternary Operator

``` jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

Best for two possible outcomes.

------------------------------------------------------------------------

# 5. switch Statement

``` jsx
switch (status) {
  case "loading":
    return <Loading />;
  case "success":
    return <Dashboard />;
  case "error":
    return <Error />;
  default:
    return null;
}
```

Useful for multiple states.

------------------------------------------------------------------------

# 6. Component Mapping

``` jsx
const screens = {
  loading: <Loading />,
  success: <Dashboard />,
  error: <Error />
};

return screens[status] ?? null;
```

Cleaner than long switch statements.

------------------------------------------------------------------------

# 7. Comparison

  Technique           Best For
  ------------------- -----------------------
  if                  Large UI branches
  &&                  Optional UI
  Ternary             Two outcomes
  switch              Multiple conditions
  Component Mapping   Many predefined views

------------------------------------------------------------------------

# 8. Common Mistakes

❌ Nested ternary operators

❌ Using:

``` jsx
{count && <Badge />}
```

When `count` is `0`, React renders `0`.

Prefer

``` jsx
{count > 0 && <Badge />}
```

------------------------------------------------------------------------

# 9. Best Practices

-   Prefer readability.
-   Keep conditions simple.
-   Use component mapping for many UI states.
-   Avoid deeply nested conditions.

------------------------------------------------------------------------

# 10. Interview Questions

### Which conditional rendering technique is best?

It depends:

-   `if` → Large UI
-   `&&` → Optional UI
-   Ternary → Two branches
-   Component Mapping → Many states

### Why avoid nested ternaries?

They reduce readability and maintainability.

------------------------------------------------------------------------

# Quick Revision

``` text
Conditional Rendering
      ↓
if
&&
Ternary
switch
Component Mapping
```

------------------------------------------------------------------------

# Interview One-Liners

-   Keys help React during reconciliation.
-   Use stable and unique keys.
-   Avoid array indexes for dynamic lists.
-   Conditional rendering should prioritize readability.
-   Component mapping is a clean alternative to large switch statements.

------------------------------------------------------------------------

# 2-Minute Interview Answer

> React renders lists using `map()`, and every list item should have a
> stable, unique key. Keys allow React's reconciliation algorithm to
> efficiently identify which elements changed, improving performance and
> preserving component state. For conditional rendering, React supports
> `if`, `&&`, ternary operators, `switch`, and component mapping. I
> choose the approach based on readability and complexity, avoiding
> nested ternaries and unstable keys.
