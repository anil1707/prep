# Module 3 – React Components ⭐⭐⭐⭐⭐

## Topics Covered

* Functional Components
* Class Components
* Component Composition
* Reusable Components
* Controlled vs Uncontrolled Components
* Presentational vs Container Components
* Smart vs Dumb Components

---

# 1. Functional Components ⭐⭐⭐⭐⭐

## Definition

A **Functional Component** is a JavaScript function that returns JSX.

```jsx
function Welcome() {
    return <h1>Hello React</h1>;
}
```

or

```jsx
const Welcome = () => {
    return <h1>Hello React</h1>;
};
```

---

## Characteristics

* JavaScript function
* Returns JSX
* Accepts props
* Uses Hooks (`useState`, `useEffect`, etc.)
* Preferred approach in modern React

---

## Props Example

```jsx
function Welcome({ name }) {
    return <h1>Hello {name}</h1>;
}
```

---

## State Example

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

---

## Advantages

* Less boilerplate
* Easier to read
* Reusable
* Hooks support
* Better maintainability

---

# 2. Class Components ⭐⭐⭐⭐

## Definition

Class Components are ES6 classes that extend `React.Component`.

```jsx
class Counter extends React.Component {

    state = {
        count: 0
    };

    render() {
        return <h1>{this.state.count}</h1>;
    }
}
```

---

## Updating State

```javascript
this.setState({
    count: this.state.count + 1
});
```

---

## Lifecycle Methods

* `componentDidMount()`
* `componentDidUpdate()`
* `componentWillUnmount()`

---

## Characteristics

* Uses `render()`
* Uses `this`
* Uses `this.state`
* Uses `this.setState()`
* Mostly found in legacy projects

---

# Functional vs Class Components

| Functional Component | Class Component   |
| -------------------- | ----------------- |
| JavaScript Function  | ES6 Class         |
| Hooks                | Lifecycle Methods |
| `useState()`         | `this.state`      |
| `setState()` Hook    | `this.setState()` |
| Less Boilerplate     | More Boilerplate  |
| Preferred            | Legacy            |

---

# 3. Component Composition ⭐⭐⭐⭐⭐

## Definition

Component Composition means **building complex UIs by combining smaller reusable components**.

Example

```text
App

├── Navbar
├── Sidebar
├── ProductList
│     ├── ProductCard
│     ├── ProductCard
│     └── ProductCard
└── Footer
```

---

## Example

```jsx
function App() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Content />
            <Footer />
        </>
    );
}
```

---

## Benefits

* Reusable components
* Better maintainability
* Separation of concerns
* Easy testing
* Scalable architecture

---

# 4. Reusable Components ⭐⭐⭐⭐⭐

## Definition

A reusable component is written once and used multiple times with different props.

Example

```jsx
function Button({ text, onClick }) {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
}
```

Usage

```jsx
<Button text="Save" />

<Button text="Delete" />

<Button text="Cancel" />
```

---

## Benefits

* Less code duplication
* Consistent UI
* Easy maintenance
* Better scalability

---

# 5. Controlled vs Uncontrolled Components ⭐⭐⭐⭐⭐

## Controlled Component

React controls the input value.

```jsx
const [name, setName] = useState("");

<input
    value={name}
    onChange={(e) => setName(e.target.value)}
/>
```

### Characteristics

* React state is the source of truth
* Easy validation
* Easy form submission
* Preferred approach

---

## Uncontrolled Component

DOM controls the input value.

```jsx
const inputRef = useRef();

<input ref={inputRef} />
```

Read value

```javascript
inputRef.current.value;
```

---

## Controlled vs Uncontrolled

| Controlled          | Uncontrolled       |
| ------------------- | ------------------ |
| React manages value | DOM manages value  |
| `useState`          | `useRef`           |
| Easy validation     | Limited validation |
| Preferred           | Specific use cases |

---

## When to Use

### Controlled

* Login Forms
* Signup Forms
* Search Forms
* Validation
* Dynamic Forms

### Uncontrolled

* File Upload (`<input type="file" />`)
* Third-party libraries
* Simple forms

---

# 6. Presentational vs Container Components ⭐⭐⭐⭐

## Presentational Component

Responsible only for UI.

```jsx
function UserCard({ user }) {
    return <h2>{user.name}</h2>;
}
```

Characteristics

* UI only
* Receives props
* No API calls
* Highly reusable

---

## Container Component

Responsible for business logic.

```jsx
function Users() {

    const users = useUsers();

    return (
        <UserCard user={users[0]} />
    );
}
```

Characteristics

* API calls
* State management
* Business logic
* Passes data to Presentational components

---

## Comparison

| Presentational | Container    |
| -------------- | ------------ |
| UI Only        | Logic        |
| Displays Data  | Fetches Data |
| Reusable       | Stateful     |
| Receives Props | Handles APIs |

> Today, Hooks often replace the classic Container Component pattern, but the concept is still useful.

---

# 7. Smart vs Dumb Components ⭐⭐⭐⭐

## Smart Component

Responsible for:

* State
* API Calls
* Business Logic
* Event Handling

Example

```jsx
<UserContainer />
```

---

## Dumb Component

Responsible only for UI.

Example

```jsx
<UserCard />
```

---

## Smart vs Dumb

| Smart          | Dumb              |
| -------------- | ----------------- |
| Stateful       | Usually Stateless |
| Business Logic | UI Only           |
| API Calls      | Receives Props    |
| Container      | Presentational    |

---

# Common Interview Questions

### What is a Functional Component?

A JavaScript function that returns JSX.

---

### Why are Functional Components preferred?

* Simpler syntax
* Hooks support
* Better readability
* Less boilerplate

---

### Difference between Functional and Class Components?

Functional Components use Hooks, while Class Components use lifecycle methods and `this.state`.

---

### What is Component Composition?

Building complex UIs by combining smaller reusable components.

---

### What is a Reusable Component?

A component designed to be used multiple times with different props.

---

### What is a Controlled Component?

A component where React state controls the form input.

---

### What is an Uncontrolled Component?

A component where the DOM controls the form input using refs.

---

### Difference between Controlled and Uncontrolled Components?

Controlled → React State

Uncontrolled → DOM State

---

### Difference between Presentational and Container Components?

Presentational handles UI.

Container handles business logic and data fetching.

---

### Difference between Smart and Dumb Components?

Smart components manage logic and state.

Dumb components focus only on displaying UI.

---

# Quick Revision

```text
Component

↓

Functional Component
    • Function
    • Hooks
    • Preferred

↓

Class Component
    • ES6 Class
    • Lifecycle
    • Legacy

↓

Composition
    • Build UI using small components

↓

Reusable Components
    • Write Once
    • Use Anywhere

↓

Forms

Controlled
    • React State

Uncontrolled
    • DOM + useRef

↓

Architecture

Container / Smart
    • Logic
    • API
    • State

Presentational / Dumb
    • UI
    • Props
```

---

# Interview One-Liners

* Functional Components are the preferred way to build React applications.
* Class Components are mainly found in legacy codebases.
* Component Composition improves scalability and maintainability.
* Reusable components reduce duplication and improve consistency.
* Controlled Components use React state as the source of truth.
* Uncontrolled Components rely on the DOM and refs.
* Presentational Components focus on UI.
* Container Components focus on business logic.
* Smart Components manage state and API calls.
* Dumb Components receive props and render UI.
* Modern React favors **Functional Components + Hooks** over Class Components.
