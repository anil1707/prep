# Module 2 – JSX ⭐⭐⭐⭐⭐

## Topics Covered

* What is JSX?
* How JSX Works Internally
* Babel Transpilation
* React.createElement()
* JSX Rules
* Expressions in JSX
* Fragments
* Conditional Rendering
* Lists & Keys
* JSX Compilation Process

---

# 1. What is JSX? ⭐⭐⭐⭐⭐

## Definition

**JSX (JavaScript XML)** is a syntax extension for JavaScript that allows us to write **HTML-like syntax inside JavaScript**.

Example

```jsx
const element = <h1>Hello React</h1>;
```

JSX makes React components easier to read and write.

> **JSX is NOT HTML.** It is JavaScript syntax that gets converted into JavaScript before execution.

---

## Why JSX?

Without JSX

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

With JSX

```jsx
const element = <h1>Hello React</h1>;
```

JSX is much cleaner and easier to understand.

---

## Is JSX Mandatory?

❌ No.

React can be written completely without JSX.

Example

```javascript
function App() {
    return React.createElement(
        "h1",
        null,
        "Hello"
    );
}
```

JSX is only syntactic sugar over `React.createElement()`.

---

# 2. How JSX Works Internally ⭐⭐⭐⭐⭐

Browsers cannot understand JSX.

React also cannot execute JSX directly.

Before execution, JSX is converted into JavaScript.

## Flow

```text
JSX

↓

Babel

↓

React.createElement()

↓

React Element (JS Object)

↓

Virtual DOM

↓

Diffing

↓

Reconciliation

↓

Real DOM
```

---

## Example

JSX

```jsx
const element = (
    <h1 className="title">
        Hello
    </h1>
);
```

Babel converts it into

```javascript
const element = React.createElement(
    "h1",
    {
        className: "title"
    },
    "Hello"
);
```

React then converts this into a **React Element**.

---

# 3. Babel Transpilation ⭐⭐⭐⭐

## What is Babel?

Babel is a **JavaScript compiler (transpiler)**.

It converts:

* JSX → JavaScript
* Modern JavaScript → Older JavaScript

---

## Example

Input

```jsx
const element = <h1>Hello</h1>;
```

Output

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello"
);
```

---

## Why Do We Need Babel?

Browsers understand JavaScript.

Browsers do **not** understand JSX.

Therefore:

```text
JSX

↓

Babel

↓

JavaScript

↓

Browser
```

---

# 4. React.createElement() ⭐⭐⭐⭐⭐

## Definition

`React.createElement()` creates a **React Element**.

It does **not** create a DOM element.

---

## Syntax

```javascript
React.createElement(
    type,
    props,
    children
);
```

---

## Parameters

### type

HTML tag or React component.

```javascript
"h1"

"button"

App
```

---

### props

Attributes passed to the element.

```javascript
{
    className: "btn",
    id: "submit"
}
```

---

### children

Content inside the element.

```javascript
"Click Me"
```

or

```javascript
[
    child1,
    child2
]
```

---

## Example

```javascript
const element = React.createElement(
    "button",
    {
        className: "btn"
    },
    "Click Me"
);
```

---

## React Element

The above returns a JavaScript object similar to:

```javascript
{
    type: "button",

    props: {

        className: "btn",

        children: "Click Me"

    }
}
```

This object is called a **React Element**.

---

# React Element vs DOM Element

| React Element     | DOM Element         |
| ----------------- | ------------------- |
| JavaScript Object | Actual Browser Node |
| Lightweight       | Heavy               |
| Immutable         | Mutable             |
| Used by React     | Rendered by Browser |

---

# 5. JSX Rules ⭐⭐⭐⭐⭐

## Rule 1 – Return One Parent Element

✅ Correct

```jsx
<>
    <h1>Hello</h1>
    <p>React</p>
</>
```

❌ Wrong

```jsx
<h1>Hello</h1>
<p>React</p>
```

---

## Rule 2 – Close Every Tag

```jsx
<img />

<input />

<hr />

<br />
```

---

## Rule 3 – Use className

Correct

```jsx
<div className="container">
```

Wrong

```jsx
<div class="container">
```

---

## Rule 4 – htmlFor Instead of for

Correct

```jsx
<label htmlFor="email">
```

Wrong

```jsx
<label for="email">
```

---

## Rule 5 – Camel Case Attributes

Correct

```jsx
onClick

tabIndex

readOnly

autoFocus
```

Wrong

```jsx
onclick

tabindex

readonly
```

---

## Rule 6 – JavaScript Inside {}

```jsx
const name = "Anil";

<h1>{name}</h1>
```

---

# 6. Expressions in JSX ⭐⭐⭐⭐

Anything inside `{}` is treated as JavaScript.

---

## Valid Expressions

```jsx
{name}

{age}

{10 + 20}

{isLoggedIn}

{users.length}

{users.map(...)}

{user.firstName + " " + user.lastName}
```

---

## Invalid Statements

```jsx
if(){}

for(){}

while(){}

switch(){}
```

Because these are statements, not expressions.

---

## Solution

Use

### Ternary

```jsx
{
    isLoggedIn
        ? <Home />
        : <Login />
}
```

---

### &&

```jsx
{
    isAdmin && <Admin />
}
```

---

# 7. Fragments ⭐⭐⭐⭐

## What is Fragment?

A Fragment groups multiple elements without adding an extra DOM node.

---

Without Fragment

```jsx
<div>
    <Navbar />
    <Footer />
</div>
```

Creates an unnecessary `<div>`.

---

With Fragment

```jsx
<>
    <Navbar />
    <Footer />
</>
```

No extra DOM element.

---

Equivalent

```jsx
<React.Fragment>
```

---

# 8. Conditional Rendering ⭐⭐⭐⭐⭐

React allows rendering UI based on conditions.

---

## if-else

```jsx
if(isLoggedIn){
    return <Home />;
}

return <Login />;
```

---

## Ternary

```jsx
{
    isLoggedIn
        ? <Home />
        : <Login />
}
```

---

## &&

```jsx
{
    isAdmin && <AdminPanel />
}
```

---

## Null Rendering

```jsx
{
    show ? <Modal /> : null
}
```

Nothing is rendered when `show` is false.

---

# 9. Lists & Keys ⭐⭐⭐⭐⭐

## Rendering Lists

```jsx
users.map(user => (

    <li key={user.id}>

        {user.name}

    </li>

));
```

---

## Why Keys?

Keys uniquely identify list items.

During reconciliation React uses keys to determine:

* Added items
* Deleted items
* Updated items
* Reordered items

---

## Good Key

```jsx
key={user.id}
```

Stable and unique.

---

## Bad Key

```jsx
key={index}
```

Avoid for dynamic lists because inserting, deleting, or reordering items can cause incorrect DOM reuse and component state issues.

---

# 10. JSX Compilation Process ⭐⭐⭐⭐⭐

Complete Flow

```text
JSX

↓

Babel

↓

React.createElement()

↓

React Element

↓

Virtual DOM

↓

Diffing

↓

Reconciliation

↓

Real DOM

↓

Browser Paint
```

---

# React.createElement() Flow

```jsx
<h1>Hello</h1>
```

↓

```javascript
React.createElement(
    "h1",
    null,
    "Hello"
)
```

↓

```javascript
React Element
```

↓

```text
Virtual DOM
```

↓

```text
Real DOM
```

---

# Common Interview Questions

### What is JSX?

A syntax extension for JavaScript that lets developers write HTML-like syntax inside JavaScript.

---

### Is JSX HTML?

No.

It only looks like HTML.

Internally it is converted into JavaScript.

---

### Is JSX mandatory?

No.

React can be written using `React.createElement()`.

---

### What does Babel do?

* Converts JSX into JavaScript.
* Transpiles modern JavaScript for browser compatibility.

---

### What does `React.createElement()` return?

A **React Element (JavaScript Object)**.

Not a DOM node.

---

### Why do we use Fragments?

To return multiple elements without adding unnecessary DOM nodes.

---

### Why do we need keys?

Keys help React identify list items efficiently during reconciliation.

---

### Why should we avoid array index as a key?

Because when list items are inserted, deleted, or reordered, index-based keys can cause incorrect DOM reuse and component state issues.

---

### What can be written inside JSX `{}`?

Only JavaScript expressions.

Not statements like `if`, `for`, or `while`.

---

# Common Mistakes

❌ Thinking JSX is HTML.

✔ JSX is JavaScript syntax.

---

❌ Thinking `React.createElement()` creates DOM nodes.

✔ It creates React Elements.

---

❌ Forgetting a parent element.

---

❌ Using

```jsx
class
```

instead of

```jsx
className
```

---

❌ Using

```jsx
for
```

instead of

```jsx
htmlFor
```

---

❌ Using array index as key for dynamic lists.

---

# Quick Revision

```text
JSX

↓

Babel

↓

React.createElement()

↓

React Element

↓

Virtual DOM

↓

Diffing

↓

Reconciliation

↓

Real DOM

↓

Browser Paint
```

---

# Interview One-Liners

* JSX = JavaScript XML.
* JSX is a syntax extension, not HTML.
* JSX is transpiled by Babel.
* Babel converts JSX into `React.createElement()`.
* `React.createElement()` returns a React Element.
* React Element is a JavaScript object.
* React Element is used to build the Virtual DOM.
* JSX requires one parent element.
* Fragments avoid unnecessary DOM nodes.
* Use `{}` for JavaScript expressions.
* Use `className` instead of `class`.
* Use `htmlFor` instead of `for`.
* Keys help React identify list items during reconciliation.
* Prefer stable, unique IDs over array indexes as keys.
