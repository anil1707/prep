# Module 13 -- React.memo ⭐⭐⭐⭐⭐

## Topics Covered

-   What is `React.memo`
-   Why React introduced it
-   Internal Working
-   Shallow Comparison
-   Custom Comparison Function
-   Real-world Examples
-   Best Practices
-   Common Mistakes
-   Performance Considerations
-   `React.memo` vs `useMemo`
-   `React.memo` vs `useCallback`
-   Interview Questions
-   Quick Revision
-   Interview One-Liners
-   2-Minute Interview Answer

------------------------------------------------------------------------

# 1. What is React.memo?

`React.memo` is a **Higher Order Component (HOC)** that memoizes a
functional component.

If the component receives the **same props**, React skips re-rendering
that component.

``` jsx
const Child = React.memo(function Child(props) {
  return <div>{props.name}</div>;
});
```

------------------------------------------------------------------------

# 2. Why React Introduced React.memo

Normally, when a parent renders, **all of its children render too**.

``` text
Parent Render
   ↓
Child Render
```

Even if the child's props haven't changed.

`React.memo` avoids these unnecessary renders by comparing previous and
current props.

------------------------------------------------------------------------

# 3. Internal Working

``` text
Parent Render
   ↓
React.memo
   ↓
Compare Previous Props
        │
        ├── Same → Skip Child Render
        └── Different → Render Child
```

React performs a **shallow comparison** of props using `Object.is`.

------------------------------------------------------------------------

# 4. Shallow Comparison

Primitive values

``` jsx
prev.count === next.count
```

Objects

``` jsx
{} === {} // false
```

Arrays

``` jsx
[] === [] // false
```

Functions

``` jsx
() => {} === () => {} // false
```

Because objects, arrays, and functions are compared by reference, new
references will cause a re-render.

------------------------------------------------------------------------

# 5. Basic Example

Without `React.memo`

``` jsx
function Child() {
  console.log("Child Render");
  return <h2>Child</h2>;
}
```

Parent state changes

↓

Child renders every time.

------------------------------------------------------------------------

With `React.memo`

``` jsx
const Child = React.memo(function Child() {
  console.log("Child Render");
  return <h2>Child</h2>;
});
```

If props don't change, React skips the child render.

------------------------------------------------------------------------

# 6. React.memo + useCallback

``` jsx
const Child = React.memo(({ onClick }) => {
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

`useCallback` keeps the function reference stable, allowing `React.memo`
to skip rendering.

------------------------------------------------------------------------

# 7. React.memo + useMemo

``` jsx
const filteredUsers = useMemo(() => {
  return users.filter(u => u.active);
}, [users]);

return <UserList users={filteredUsers} />;
```

`useMemo` keeps the array reference stable.

`React.memo` sees unchanged props and skips rendering.

------------------------------------------------------------------------

# 8. Custom Comparison Function

``` jsx
const UserCard = React.memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  }
);
```

Return value:

-   `true` → Skip render
-   `false` → Re-render

Use custom comparison only when necessary.

------------------------------------------------------------------------

# 9. Real-world Use Cases

-   AG Grid row components
-   Dashboard widgets
-   Large lists
-   Product cards
-   Chat message items
-   Complex forms
-   Heavy charts

------------------------------------------------------------------------

# 10. Best Practices

✅ Use for expensive child components.

✅ Combine with `useCallback` and `useMemo` when passing functions,
arrays, or objects.

✅ Measure performance before optimizing.

------------------------------------------------------------------------

# 11. Common Mistakes

❌ Wrapping every component with `React.memo`.

❌ Passing new object literals every render.

``` jsx
<Child options={{ theme: "dark" }} />
```

❌ Passing inline functions.

``` jsx
<Child onClick={() => save()} />
```

------------------------------------------------------------------------

# 12. Performance Considerations

`React.memo` also has a cost:

-   Stores previous props
-   Compares props every render

If rendering is very cheap, comparison may cost more than rendering
itself.

------------------------------------------------------------------------

# 13. Comparison

  Feature    React.memo     useMemo              useCallback
  ---------- -------------- -------------------- ------------------
  Memoizes   Component      Value                Function
  Purpose    Skip renders   Cache calculations   Stable callbacks

------------------------------------------------------------------------

# 14. Interview Questions

### What is React.memo?

A Higher Order Component that skips rendering when props haven't
changed.

### Does it prevent parent renders?

No.

It only skips rendering of the memoized child.

### How are props compared?

Using shallow comparison (`Object.is`).

### When is it useful?

For expensive child components that frequently receive the same props.

------------------------------------------------------------------------

# 15. Quick Revision

``` text
Parent Render
      ↓
React.memo
      ↓
Compare Props
      ↓
Same?
 ├─ Yes → Skip Render
 └─ No  → Render Child

Use with:
• useCallback
• useMemo
```

------------------------------------------------------------------------

# 16. Interview One-Liners

-   `React.memo` memoizes components, not values.
-   It uses shallow prop comparison.
-   It is most effective with stable prop references.
-   It does not stop parent component rendering.
-   Overusing it can reduce performance.

------------------------------------------------------------------------

# 17. 2-Minute Interview Answer

> `React.memo` is a Higher Order Component that optimizes functional
> components by skipping unnecessary re-renders when props remain
> unchanged. React performs a shallow comparison of previous and current
> props. It is especially useful for expensive child components. To get
> the best results, I combine it with `useCallback` for stable function
> references and `useMemo` for stable object or array references. I
> avoid wrapping every component because prop comparison also has a
> runtime cost, so I optimize only where profiling shows a measurable
> benefit.
