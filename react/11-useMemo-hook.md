# Module 11 – useMemo ⭐⭐⭐⭐⭐

## Part 1

### Topics Covered

* What is `useMemo`
* Why `useMemo` Exists
* Syntax
* Internal Working
* Dependency Array
* Memoization Concept

---

# 1. What is useMemo? ⭐⭐⭐⭐⭐

## Definition

`useMemo` is a React Hook that **memoizes (caches) the result of a calculation**.

Instead of recalculating a value on every render, React stores the previous result and reuses it until one of its dependencies changes.

---

## Syntax

```jsx
const memoizedValue = useMemo(() => {
    return expensiveCalculation();
}, [dependencies]);
```

---

Example

```jsx
const total = useMemo(() => {
    return price * quantity;
}, [price, quantity]);
```

Here

```text
total → Memoized Value

price, quantity → Dependencies
```

---

# 2. Why useMemo Exists ⭐⭐⭐⭐⭐

Every time a component re-renders,

the entire component function executes again.

Example

```jsx
function App() {

    const [count, setCount] = useState(0);

    const total = expensiveCalculation();

    return (
        <>
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>

            <h1>{total}</h1>
        </>
    );

}
```

Suppose

```javascript
expensiveCalculation();
```

takes **500ms**.

Whenever

```jsx
setCount(count + 1);
```

runs,

React executes

```javascript
expensiveCalculation()
```

again,

even if the calculation doesn't depend on `count`.

---

## Problem

```text
Render

↓

expensiveCalculation()

↓

Render

↓

expensiveCalculation()

↓

Render

↓

expensiveCalculation()
```

Unnecessary work.

---

# Solution

```jsx
const total = useMemo(() => {

    return expensiveCalculation();

}, []);
```

Now

```text
First Render

↓

expensiveCalculation()

↓

Store Result

↓

Next Render

↓

Return Cached Result
```

---

# 3. What is Memoization? ⭐⭐⭐⭐⭐

Memoization is an optimization technique.

It means

> **Store the result of an expensive calculation and reuse it instead of calculating it again.**

---

Without Memoization

```text
2 + 3

↓

5

↓

Again

↓

2 + 3

↓

5

↓

Again

↓

2 + 3
```

Calculation repeats every time.

---

With Memoization

```text
2 + 3

↓

5

↓

Cache

↓

Next Time

↓

Return Cached 5
```

No recalculation.

---

# Real-life Analogy

Suppose

You calculate

```text
Income Tax
```

It takes

30 minutes.

If your salary hasn't changed,

would you calculate it again?

No.

You'll reuse the previous result.

That's memoization.

---

# 4. Internal Working ⭐⭐⭐⭐⭐

Suppose

```jsx
const total = useMemo(() => {

    return calculateTotal();

}, [price]);
```

Conceptually,

React stores

```text
Hook

↓

Previous Dependencies

↓

Previous Result
```

---

First Render

```text
Dependencies

↓

price = 100

↓

Run Calculation

↓

Store Result

↓

Return Result
```

---

Second Render

```text
price = 100

↓

Dependencies Same

↓

Return Cached Result
```

---

Third Render

```text
price = 200

↓

Dependencies Changed

↓

Run Calculation Again

↓

Store New Result
```

---

# Internal Flow

```text
Render

↓

Check Dependencies

↓

Changed?

↓

Yes

↓

Run Calculation

↓

Store Result

↓

Return Result

------------------------

No

↓

Return Cached Result
```

---

# 5. Dependency Array ⭐⭐⭐⭐⭐

The dependency array controls **when React should recompute the memoized value**.

---

Example

```jsx
const total = useMemo(() => {

    return calculate();

}, [price]);
```

If

```text
price changes
```

↓

React recalculates.

---

If

```text
price doesn't change
```

↓

React returns the cached value.

---

## Multiple Dependencies

```jsx
const total = useMemo(() => {

    return calculate();

}, [price, quantity]);
```

Runs again when

* `price` changes
* `quantity` changes

---

# Empty Dependency Array

```jsx
const value = useMemo(() => {

    return calculate();

}, []);
```

Runs only once during the initial render.

---

# No Dependency Array

```jsx
const value = useMemo(() => {

    return calculate();

});
```

Avoid this.

Without a dependency array, React recomputes the value on every render, which defeats the purpose of memoization.

---

# 6. useMemo Execution Flow ⭐⭐⭐⭐⭐

```text
Component Executes

↓

useMemo()

↓

Compare Dependencies

↓

Changed?

↓

Yes

↓

Run Function

↓

Store Result

↓

Return Result

-----------------------

No

↓

Return Cached Value
```

---

# Example

```jsx
const square = useMemo(() => {

    console.log("Calculating");

    return number * number;

}, [number]);
```

Initial

```text
Calculating

↓

Return Square
```

---

Render Again

(number unchanged)

```text
Return Cached Square
```

No log.

---

Render Again

(number changed)

```text
Calculating

↓

Return New Square
```

---

# Common Interview Questions

### What is useMemo?

A Hook that memoizes the result of an expensive calculation.

---

### Why was useMemo introduced?

To avoid unnecessary recalculation during re-renders and improve performance.

---

### What does useMemo return?

The memoized value returned by the callback function.

---

### When does useMemo recalculate?

Whenever one of its dependencies changes.

---

### Does useMemo stop component re-rendering?

No.

It only prevents recalculating the memoized value.

The component itself still re-renders.

---

# Quick Revision

```text
useMemo

↓

Caches Value

↓

Compare Dependencies

↓

Changed?

↓

Yes

↓

Recalculate

↓

Store Result

----------------

No

↓

Return Cached Value
```

---

# Interview One-Liners

* `useMemo` memoizes **values**, not functions.
* It is used to optimize **expensive calculations**.
* React compares the dependency array using reference equality (`Object.is`) to decide whether to reuse the cached value.
* If dependencies don't change, React returns the cached value.
* `useMemo` improves performance by avoiding unnecessary recomputation.
* `useMemo` does **not** prevent component re-rendering.


# Module 11 – useMemo ⭐⭐⭐⭐⭐

## Part 2

### Topics Covered

* Expensive Calculations
* Real-world Examples
* Performance Considerations
* When to Use
* When NOT to Use
* Common Mistakes
* Internal Cost of useMemo

---

# 7. Expensive Calculations ⭐⭐⭐⭐⭐

The biggest use case of `useMemo` is **avoiding expensive calculations**.

Suppose you have

```jsx
const users = [...100000 users];
```

Every render

```jsx
const filteredUsers = users.filter(...);
```

runs again.

Even if

* search text didn't change
* users didn't change

React still executes

```text
filter()

↓

100000 Iterations
```

---

## Solution

```jsx
const filteredUsers = useMemo(() => {

    return users.filter(user =>
        user.name.includes(search)
    );

}, [users, search]);
```

Now filtering only happens when

* users changes
* search changes

---

# Another Example

Sorting

```jsx
const sortedUsers = useMemo(() => {

    return [...users].sort(
        (a, b) => a.age - b.age
    );

}, [users]);
```

Sorting large arrays repeatedly is expensive.

---

# Large Calculations

```jsx
const total = useMemo(() => {

    return orders.reduce(
        (sum, order) => sum + order.price,
        0
    );

}, [orders]);
```

Without `useMemo`

Every render performs

```text
reduce()

↓

Thousands of iterations
```

---

# 8. Real-world Examples ⭐⭐⭐⭐⭐

## Example 1 – Search

```jsx
const filteredUsers = useMemo(() => {

    return users.filter(user =>
        user.name.includes(search)
    );

}, [users, search]);
```

---

## Example 2 – Shopping Cart

```jsx
const totalPrice = useMemo(() => {

    return cart.reduce(

        (sum, item) =>

            sum + item.price,

        0

    );

}, [cart]);
```

---

## Example 3 – Dashboard

```jsx
const chartData = useMemo(() => {

    return transformSalesData(data);

}, [data]);
```

Transforming chart data can be expensive.

---

## Example 4 – Pagination

```jsx
const paginatedUsers = useMemo(() => {

    const start = page * pageSize;

    return users.slice(
        start,
        start + pageSize
    );

}, [users, page, pageSize]);
```

---

## Example 5 – Derived Values

```jsx
const completedTasks = useMemo(() => {

    return tasks.filter(
        task => task.completed
    );

}, [tasks]);
```

---

# 9. Performance Considerations ⭐⭐⭐⭐⭐

Many developers think

```text
useMemo

↓

Always Faster
```

Wrong.

`useMemo` itself has a cost.

React must

```text
Store Previous Value

↓

Store Dependencies

↓

Compare Dependencies

↓

Return Cached Value
```

This takes memory and CPU.

---

## Don't Memoize Everything

Wrong

```jsx
const sum = useMemo(() => {

    return a + b;

}, [a, b]);
```

Adding two numbers is cheaper than memoization.

---

Correct

```jsx
const users = useMemo(() => {

    return expensiveFiltering();

}, [users]);
```

---

# Rule of Thumb

Ask

```text
Is the calculation expensive?
```

If

NO

↓

Don't use `useMemo`.

---

# 10. When Should We Use useMemo? ⭐⭐⭐⭐⭐

Use it for

✅ Large Arrays

```jsx
filter()

sort()

map()

reduce()
```

---

✅ Expensive Mathematical Calculations

---

✅ Heavy Data Transformation

---

✅ Derived Data

---

✅ Stable Object References

Example

```jsx
const options = useMemo(() => ({

    pageSize: 10,

    theme: "dark"

}), []);
```

This prevents creating a new object every render.

---

# 11. When NOT to Use useMemo ⭐⭐⭐⭐⭐

Don't use it for

Simple Calculations

```jsx
const fullName =
    first + " " + last;
```

---

Simple Boolean

```jsx
const isAdmin =
    role === "admin";
```

---

Simple Math

```jsx
const total = a + b;
```

---

Tiny Arrays

```jsx
numbers.map(...)
```

with very few items.

---

# 12. Internal Cost of useMemo ⭐⭐⭐⭐⭐

React internally performs

```text
Previous Dependencies

↓

Current Dependencies

↓

Object.is()

↓

Compare One by One

↓

Changed?

↓

Return Cached Value

OR

↓

Run Function
```

So

```text
useMemo

≠

Free Optimization
```

---

# 13. Common Mistakes ⭐⭐⭐⭐⭐

---

## Mistake 1

Memoizing Everything

Wrong

```jsx
const sum = useMemo(() => {

    return a + b;

}, [a, b]);
```

---

## Mistake 2

Wrong Dependency Array

```jsx
const total = useMemo(() => {

    return calculate(price);

}, []);
```

If `price` changes,

React still returns the old cached value.

This creates stale values.

---

Correct

```jsx
const total = useMemo(() => {

    return calculate(price);

}, [price]);
```

---

## Mistake 3

Missing Dependencies

```jsx
useMemo(() => {

    return a + b;

}, [a]);
```

Forgot

```text
b
```

Bug.

---

## Mistake 4

Using useMemo for Side Effects

Wrong

```jsx
useMemo(() => {

    fetch("/users");

}, []);
```

`useMemo` is **only** for returning a memoized value.

API calls belong in

```jsx
useEffect()
```

---

## Mistake 5

Returning Nothing

Wrong

```jsx
const value = useMemo(() => {

    console.log("Hello");

}, []);
```

Always return a value.

---

# Common Interview Questions

### Does useMemo improve every application?

No.

Only when calculations are expensive enough that caching is beneficial.

---

### Can useMemo replace useEffect?

No.

`useMemo`

↓

Memoizes Values.

`useEffect`

↓

Runs Side Effects.

---

### Can useMemo cache API responses?

No.

It caches calculated values during rendering.

For API data, use state, data-fetching libraries (such as TanStack Query), or other caching mechanisms.

---

### Does useMemo guarantee performance improvements?

No.

Improper use can actually reduce performance due to its own overhead.

---

# Quick Revision

```text
useMemo

↓

Expensive Calculation

↓

Dependency Array

↓

Compare Dependencies

↓

Changed?

↓

Yes

↓

Run Function

↓

Store Result

--------------------

No

↓

Return Cached Result

--------------------

Use For

• Filtering

• Sorting

• Reduce

• Charts

• Large Lists

• Heavy Computation

--------------------

Don't Use For

• Simple Math

• Small Arrays

• String Concatenation

• Boolean Checks
```

---

# Interview One-Liners

* `useMemo` should be used only when memoization provides a measurable performance benefit.
* It caches **calculated values**, not components or functions.
* React compares dependencies using **`Object.is`**.
* Missing dependencies can lead to stale values.
* `useMemo` is **not** a replacement for `useEffect`.
* Overusing `useMemo` can reduce performance because memoization has its own cost.


# Module 11 – useMemo ⭐⭐⭐⭐⭐

## Part 3

### Topics Covered

* `useMemo` vs `useCallback`
* `useMemo` vs `React.memo`
* Internal Comparison
* Complete Performance Flow
* Best Practices
* Common Interview Questions
* Quick Revision
* Interview One-Liners
* 2-Minute Interview Answer

---

# 14. useMemo vs useCallback ⭐⭐⭐⭐⭐

This is one of the most frequently asked React interview questions.

Although both Hooks are used for optimization, they optimize **different things**.

---

## useMemo

Memoizes **a value**.

```jsx
const total = useMemo(() => {
    return calculateTotal(cart);
}, [cart]);
```

React stores the calculated value.

---

## useCallback

Memoizes **a function**.

```jsx
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);
```

React stores the function reference.

---

## Visual Difference

### useMemo

```text
Calculation

↓

42

↓

Store Value

↓

Return Value
```

---

### useCallback

```text
Function

↓

Store Function Reference

↓

Return Same Function
```

---

## Easy Trick

```text
useMemo

↓

Memoizes VALUE

-----------------------

useCallback

↓

Memoizes FUNCTION
```

---

# 15. useMemo vs React.memo ⭐⭐⭐⭐⭐

Another favorite interview question.

Many developers confuse these two.

---

## useMemo

Optimizes

```text
Calculation
```

---

## React.memo

Optimizes

```text
Component Rendering
```

---

Example

```jsx
const total = useMemo(() => {
    return calculateTotal();
}, []);
```

Only calculation is cached.

Component still renders.

---

Example

```jsx
const Child = React.memo(function Child() {

});
```

Entire component rendering may be skipped if props are unchanged.

---

## Visual Difference

### useMemo

```text
Component Render

↓

Calculation

↓

Cached Value
```

---

### React.memo

```text
Parent Render

↓

Compare Props

↓

Same?

↓

Skip Child Render
```

---

# 16. useMemo + React.memo ⭐⭐⭐⭐⭐

Real-world optimization.

Without useMemo

```jsx
const users = usersData.filter(...);

return <Child users={users} />;
```

Every render

```text
New Array

↓

New Reference

↓

Child Re-renders
```

Even if the contents are the same.

---

Using useMemo

```jsx
const users = useMemo(() => {

    return usersData.filter(...);

}, [usersData]);
```

Now

```text
Same Array Reference

↓

React.memo

↓

Child Doesn't Re-render
```

---

## Why?

React.memo performs a **shallow comparison** of props.

Arrays and objects are compared by **reference**.

Without `useMemo`, a new array/object is created every render.

With `useMemo`, the same reference is reused until dependencies change.

---

# 17. Complete Performance Flow ⭐⭐⭐⭐⭐

```text
Parent Render

↓

useMemo

↓

Memoized Value

↓

Pass Props

↓

React.memo

↓

Compare Props

↓

Same?

↓

Skip Child Render

↓

Better Performance
```

---

# 18. Internal Working ⭐⭐⭐⭐⭐

Conceptually,

React stores

```text
Previous Dependencies

↓

Previous Result
```

Every render

```text
Current Dependencies

↓

Compare Using Object.is()

↓

Changed?

↓

Yes

↓

Run Function

↓

Store Result

↓

Return Result

----------------------

No

↓

Return Cached Result
```

---

# 19. Best Practices ⭐⭐⭐⭐⭐

### ✅ Use useMemo for

* Expensive calculations
* Large array filtering
* Sorting
* Heavy data transformation
* Stable object/array references

---

### ❌ Don't use useMemo for

* Simple addition
* Boolean checks
* String concatenation
* Tiny calculations

---

### ✅ Always include correct dependencies

Wrong

```jsx
useMemo(() => {

    return calculate(price);

}, []);
```

Correct

```jsx
useMemo(() => {

    return calculate(price);

}, [price]);
```

---

### ✅ Measure Before Optimizing

Use tools like the React DevTools Profiler to identify expensive renders before adding memoization.

---

# 20. Common Interview Questions ⭐⭐⭐⭐⭐

---

### What is useMemo?

A Hook that caches the result of an expensive calculation.

---

### Why do we use useMemo?

To avoid unnecessary recalculation during component re-renders.

---

### Does useMemo stop re-rendering?

No.

It only caches the calculated value.

The component still re-renders.

---

### Difference between useMemo and useCallback?

| useMemo                | useCallback                   |
| ---------------------- | ----------------------------- |
| Memoizes Value         | Memoizes Function             |
| Returns Value          | Returns Function              |
| Optimizes Calculations | Optimizes Function References |

---

### Difference between useMemo and React.memo?

| useMemo               | React.memo          |
| --------------------- | ------------------- |
| Memoizes Value        | Memoizes Component  |
| Runs Inside Component | Wraps Component     |
| Optimizes Calculation | Optimizes Rendering |

---

### Does useMemo always improve performance?

No.

It has its own memory and comparison cost.

Only use it when calculations are expensive.

---

### Can useMemo replace useEffect?

No.

`useMemo`

↓

Memoizes values during rendering.

`useEffect`

↓

Runs side effects after the commit phase.

---

### Can useMemo cache API responses?

No.

It caches calculated values during rendering, not asynchronous data.

---

# 21. Complete Comparison

| Feature                  | useMemo                | useCallback                | React.memo                 |
| ------------------------ | ---------------------- | -------------------------- | -------------------------- |
| Memoizes                 | Value                  | Function                   | Component                  |
| Prevents Recalculation   | ✅                      | ❌                          | ❌                          |
| Prevents Child Re-render | Indirectly             | Indirectly                 | ✅                          |
| Returns                  | Value                  | Function                   | Memoized Component         |
| Main Purpose             | Expensive Calculations | Stable Function References | Skip Unnecessary Rendering |

---

# 22. Real-world Example ⭐⭐⭐⭐⭐

```jsx
function Parent({ users }) {

    const filteredUsers = useMemo(() => {

        return users.filter(user =>
            user.active
        );

    }, [users]);

    return (
        <UserList users={filteredUsers} />
    );

}

const UserList = React.memo(function UserList({ users }) {

    console.log("Child Render");

    return (
        <>
            {users.map(user =>
                <div key={user.id}>
                    {user.name}
                </div>
            )}
        </>
    );

});
```

### Flow

```text
Parent Render

↓

users Changed?

↓

No

↓

useMemo Returns Cached Array

↓

React.memo Compares Props

↓

Same Reference

↓

Child Doesn't Render
```

---

# 23. Quick Revision

```text
useMemo

↓

Memoizes Value

↓

Dependency Array

↓

Dependencies Changed?

↓

Yes

↓

Recalculate

↓

Store Result

--------------------

No

↓

Return Cached Value

--------------------

Best For

• Filtering

• Sorting

• Reduce

• Large Lists

• Heavy Calculations

• Stable Object References

--------------------

Don't Use For

• Simple Math

• String Concatenation

• Boolean Checks

• Tiny Calculations
```

---

# 24. Interview One-Liners

* `useMemo` memoizes **values**, not functions.
* It recalculates only when its dependencies change.
* `useMemo` does **not** prevent component re-renders.
* React compares dependencies using **`Object.is`**.
* `useMemo` is most useful for **expensive computations**.
* Overusing `useMemo` can reduce performance.
* `useMemo` and `React.memo` solve different problems.
* `useMemo` is often used with `React.memo` to maintain stable object or array references.

---

# 25. Interview Answer (2 Minutes)

> **`useMemo` is a React Hook used to memoize the result of expensive calculations. It stores the computed value and recomputes it only when one of its dependencies changes. This helps avoid unnecessary work during component re-renders. It's commonly used for operations like filtering, sorting, reducing large datasets, or creating stable object and array references that are passed to memoized child components. However, `useMemo` itself has a cost, so it should only be used when it provides a measurable performance benefit. It doesn't prevent component re-rendering—it only caches a value.**

---

# 🎯 Final Summary

Think of React's optimization Hooks like this:

```text
useMemo

↓

Caches VALUE

------------------------

useCallback

↓

Caches FUNCTION

------------------------

React.memo

↓

Caches COMPONENT

------------------------

Custom Hook

↓

Reuses LOGIC
```

This single diagram is enough to answer many React optimization questions in interviews.
