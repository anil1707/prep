# Module 4 – Props ⭐⭐⭐⭐⭐

## Topics Covered

* Props
* Default Props
* Props Destructuring
* Passing Functions
* Children
* Render Props
* Prop Drilling

---

# 1. Props ⭐⭐⭐⭐⭐

## Definition

**Props (Properties)** are read-only values passed from a **Parent Component** to a **Child Component**.

```jsx
function App() {
    return <User name="Anil" />;
}

function User(props) {
    return <h1>{props.name}</h1>;
}
```

---

## Data Flow

```text
Parent
   │
 Props
   │
   ▼
Child
```

React follows **One-Way Data Flow**.

---

## Characteristics

* Read-only (Immutable)
* Parent → Child communication
* Makes components reusable
* Can pass any JavaScript value

```jsx
<String />
<Number />
<Boolean />
<Object />
<Array />
<Function />
<JSX />
<Component />
```

---

## Why Props?

Without Props

```jsx
function Button() {
    return <button>Save</button>;
}
```

With Props

```jsx
<Button text="Save" />
<Button text="Delete" />
<Button text="Cancel" />
```

Reusable component.

---

# 2. Default Props ⭐⭐⭐

Used when a prop is not provided.

### Modern Approach

```jsx
function User({ name = "Guest" }) {
    return <h1>{name}</h1>;
}
```

---

# 3. Props Destructuring ⭐⭐⭐⭐⭐

Without Destructuring

```jsx
function User(props) {
    return <h1>{props.name}</h1>;
}
```

With Destructuring

```jsx
function User({ name }) {
    return <h1>{name}</h1>;
}
```

Cleaner and more readable.

---

# 4. Passing Functions ⭐⭐⭐⭐⭐

Functions can be passed as props.

### Parent

```jsx
function Parent() {

    const handleClick = () => {
        console.log("Clicked");
    };

    return (
        <Button onClick={handleClick} />
    );
}
```

### Child

```jsx
function Button({ onClick }) {
    return (
        <button onClick={onClick}>
            Click
        </button>
    );
}
```

### Why?

Allows **Child → Parent communication** using callback functions.

---

# 5. Children ⭐⭐⭐⭐⭐

`children` is a special prop used to render nested content.

### Parent

```jsx
<Card>
    <h2>Hello React</h2>
</Card>
```

### Child

```jsx
function Card({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
```

### Use Cases

* Card
* Modal
* Layout
* Accordion
* Wrapper Components

---

# 6. Render Props ⭐⭐⭐⭐

A pattern where a prop is a **function** that returns JSX.

```jsx
<DataProvider
    render={(data) => (
        <UserList data={data} />
    )}
/>
```

Inside Component

```jsx
render(data);
```

### Why?

* Reuse business logic
* Flexible UI rendering

> Modern React often replaces Render Props with **Custom Hooks**.

---

# 7. Prop Drilling ⭐⭐⭐⭐⭐

Passing props through multiple intermediate components.

```text
App
 │
 ▼
A
 │
 ▼
B
 │
 ▼
C
 │
 ▼
D
```

```jsx
<App user={user} />

↓

<A user={user} />

↓

<B user={user} />

↓

<C user={user} />

↓

<D user={user} />
```

Intermediate components don't use the prop.

---

## Problems

* Hard to maintain
* Deep prop chains
* Poor readability

---

## Solutions

* Context API
* Redux Toolkit
* Zustand

---

# Common Interview Questions

### What are Props?

Read-only values passed from parent to child.

---

### Can Props be modified?

No.

Props are immutable.

---

### How can a child send data to a parent?

Using callback functions passed as props.

---

### What is Prop Drilling?

Passing props through intermediate components that don't need them.

---

### How do you avoid Prop Drilling?

* Context API
* Redux Toolkit
* Zustand

---

# Module 5 – State ⭐⭐⭐⭐⭐

## Topics Covered

* State
* Why State Exists
* State Updates
* Functional Updates
* Lazy Initialization
* State Batching
* State Queue
* Immutable Updates

---

# 1. State ⭐⭐⭐⭐⭐

## Definition

State is **data managed by a component** that can change over time.

```jsx
const [count, setCount] = useState(0);
```

When state changes,

React re-renders the component.

---

## Flow

```text
State Change

↓

Re-render

↓

UI Updates
```

---

# Props vs State

| Props            | State                |
| ---------------- | -------------------- |
| Passed by Parent | Managed by Component |
| Immutable        | Mutable via Setter   |
| External Data    | Internal Data        |
| Parent Controls  | Component Controls   |

---

# 2. Why State Exists ⭐⭐⭐⭐⭐

Without State

```jsx
let count = 0;

count++;
```

UI doesn't update.

With State

```jsx
setCount(count + 1);
```

React knows the state changed and re-renders the component.

---

# 3. State Updates ⭐⭐⭐⭐⭐

❌ Wrong

```jsx
count = count + 1;
```

✅ Correct

```jsx
setCount(count + 1);
```

Always use the setter function.

---

# 4. Functional Updates ⭐⭐⭐⭐⭐

### Wrong

```jsx
setCount(count + 1);
setCount(count + 1);
```

Output

```text
1
```

---

### Correct

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Output

```text
2
```

### When to Use?

Whenever the next state depends on the previous state.

---

# 5. Lazy Initialization ⭐⭐⭐⭐

### Normal

```jsx
const [data] = useState(expensiveCalculation());
```

The initializer expression is evaluated on every render.

---

### Lazy Initialization

```jsx
const [data] = useState(() => expensiveCalculation());
```

The function runs only during the initial render.

---

## Use Cases

* LocalStorage
* API Cache
* Large Calculations
* Expensive Initial State

---

# 6. State Batching ⭐⭐⭐⭐⭐

React groups multiple state updates into fewer renders.

```jsx
setName("Anil");
setAge(27);
setCity("Mumbai");
```

Result

```text
One Re-render
```

Benefits

* Better Performance
* Less Re-rendering

---

# 7. State Queue ⭐⭐⭐⭐⭐

Every state update is queued.

```text
setState()

↓

Queue

↓

React Processes Queue

↓

Re-render
```

State updates are scheduled, not applied immediately.

---

# 8. Immutable Updates ⭐⭐⭐⭐⭐

Never mutate state directly.

---

## Object

❌ Wrong

```jsx
user.name = "Anil";
```

✅ Correct

```jsx
setUser({
    ...user,
    name: "Anil"
});
```

---

## Array

❌ Wrong

```jsx
users.push(newUser);
```

✅ Correct

```jsx
setUsers([
    ...users,
    newUser
]);
```

---

## Why Immutability?

React detects changes using object references.

Creating a new object or array makes it easy for React to determine what changed.

---

# Common Interview Questions

### What is State?

Data owned by a component that can change over time and triggers a re-render.

---

### Difference between Props and State?

Props are passed from parent.

State belongs to the component.

---

### What is Functional Update?

Updating state using the previous state.

```jsx
setCount(prev => prev + 1);
```

---

### What is Lazy Initialization?

Passing a function to `useState()` so the initial value is computed only once.

---

### What is State Batching?

React groups multiple state updates into fewer renders for better performance.

---

### Why Immutable Updates?

To create a new reference so React can detect changes efficiently.

---

# Quick Revision

```text
Props
│
├── Parent → Child
├── Read Only
├── Destructuring
├── Default Props
├── Children
├── Callback Functions
├── Render Props
└── Prop Drilling

--------------------------------

State
│
├── Component Data
├── useState()
├── Triggers Re-render
├── Functional Update
├── Lazy Initialization
├── State Queue
├── State Batching
└── Immutable Updates
```

---

# Interview One-Liners

* Props are **read-only** and passed from parent to child.
* React follows **one-way data flow**.
* Children communicate with parents using **callback functions**.
* `children` is a special prop for rendering nested content.
* Render Props use a function prop to share logic.
* Prop Drilling occurs when props pass through unnecessary intermediate components.
* State is mutable through its setter function.
* State updates trigger component re-renders.
* Use functional updates when the next state depends on the previous state.
* Lazy initialization avoids expensive initial calculations on every render.
* React batches multiple state updates to improve performance.
* Never mutate state directly; always create new objects or arrays.
* React detects state changes using object references.
