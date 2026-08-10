# Core Redux – Complete Interview Notes ⭐⭐⭐⭐⭐

> **Scope:** This note covers only Core/Classic Redux. Redux Toolkit is intentionally excluded and will be covered separately.

## 1. What is Redux?

Redux is a predictable state management library used to manage application state in a centralized store.

```text
Component
   ↓
dispatch(action)
   ↓
Reducer
   ↓
Store
   ↓
Updated State
   ↓
Component
```

Redux follows **unidirectional data flow**.

## 2. Why Redux?

When many unrelated components need the same state, passing it through props can become difficult.

```text
App
 ↓ props
Layout
 ↓ props
Dashboard
 ↓ props
Profile
```

Redux provides a centralized store:

```text
             Redux Store
                  ↓
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Header     Dashboard   Checkout
```

## 3. Three Principles of Redux ⭐⭐⭐⭐⭐

### Single Source of Truth
Application state is stored in one centralized Redux store.

### State is Read-Only
Components should not directly modify Redux state. They dispatch actions instead.

### Changes Through Pure Reducers
Reducers calculate the next state from current state and an action.

```text
Previous State + Action
          ↓
       Reducer
          ↓
       Next State
```

## 4. Redux Architecture ⭐⭐⭐⭐⭐

```text
Component
   ↓
dispatch(action)
   ↓
Action
   ↓
Middleware
   ↓
Reducer
   ↓
Store
   ↓
Updated State
   ↓
Selector
   ↓
Component
```

## 5. Store ⭐⭐⭐⭐⭐

The Redux store contains application state.

```js
{
  user: {
    name: "Anil"
  },
  cart: {
    items: []
  },
  products: []
}
```

Classic Redux creates a store with:

```js
import { createStore } from "redux";

const store = createStore(rootReducer);
```

> `createStore` belongs to the classic Redux API. Redux Toolkit will be covered separately.

## 6. State

Redux state is the data maintained by the store.

```js
const initialState = {
  count: 0
};
```

Treat Redux state as immutable.

## 7. Action ⭐⭐⭐⭐⭐

An action is a plain JavaScript object describing what happened.

```js
{
  type: "INCREMENT"
}
```

With data:

```js
{
  type: "ADD_TO_CART",
  payload: {
    id: 101,
    quantity: 2
  }
}
```

Every Redux action must have a `type`.

## 8. Action Creator

An action creator is a function that creates an action.

```js
const increment = () => ({
  type: "INCREMENT"
});

const addToCart = product => ({
  type: "ADD_TO_CART",
  payload: product
});
```

Usage:

```js
dispatch(addToCart(product));
```

## 9. Reducer ⭐⭐⭐⭐⭐

A reducer is a pure function that calculates the next state.

```js
function counterReducer(
  state = { count: 0 },
  action
) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}
```

Mental model:

```text
state + action
      ↓
   reducer
      ↓
 new state
```

## 10. Why Reducers Must Be Pure ⭐⭐⭐⭐⭐

Reducers should:
- Produce the same output for the same input.
- Not modify external state.
- Not perform side effects.

Avoid API calls, timers, random values, or other side effects inside reducers.

## 11. Immutable State Updates ⭐⭐⭐⭐⭐

Classic Redux requires immutable updates.

Wrong:

```js
state.user.name = "Anil";
return state;
```

Correct:

```js
return {
  ...state,
  user: {
    ...state.user,
    name: "Anil"
  }
};
```

For arrays:

```js
return {
  ...state,
  items: [
    ...state.items,
    item
  ]
};
```

Immutability helps Redux/React-Redux detect changes using references.

## 12. dispatch() ⭐⭐⭐⭐⭐

`dispatch()` sends an action to Redux.

```js
store.dispatch({
  type: "INCREMENT"
});
```

Or:

```js
store.dispatch(increment());
```

Flow:

```text
dispatch(action)
      ↓
Middleware
      ↓
Reducer
      ↓
Store
```

## 13. getState()

Returns the current Redux state.

```js
const state = store.getState();
```

## 14. subscribe()

Registers a listener for store updates.

```js
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
```

Stop listening:

```js
unsubscribe();
```

Classic store API:

```text
dispatch()
getState()
subscribe()
```

## 15. React + Redux

Redux itself does not depend on React.

React integration is provided by **React-Redux**.

```text
React
  ↓
React-Redux
  ↓
Redux
```

## 16. Provider ⭐⭐⭐⭐⭐

`Provider` makes the Redux store available to the React component tree.

```jsx
import { Provider } from "react-redux";

<Provider store={store}>
  <App />
</Provider>
```

## 17. useSelector() ⭐⭐⭐⭐⭐

Reads data from the Redux store.

```jsx
const count = useSelector(
  state => state.counter.count
);
```

## 18. useDispatch() ⭐⭐⭐⭐⭐

Gives a component access to dispatch.

```jsx
const dispatch = useDispatch();

dispatch({
  type: "INCREMENT"
});
```

## 19. Complete React + Redux Example

```jsx
function Counter() {
  const count = useSelector(
    state => state.counter.count
  );

  const dispatch = useDispatch();

  return (
    <>
      <h1>{count}</h1>

      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT"
          })
        }
      >
        Increment
      </button>
    </>
  );
}
```

## 20. connect() ⭐⭐⭐⭐

Before Hooks, React-Redux commonly used `connect()`.

```jsx
const mapStateToProps = state => ({
  count: state.counter.count
});

export default connect(
  mapStateToProps
)(Counter);
```

Today, hooks are generally preferred in functional components, but `connect()` is important for interviews and older codebases.

## 21. mapStateToProps

Maps Redux state to component props.

```js
const mapStateToProps = state => ({
  user: state.user
});
```

## 22. mapDispatchToProps

Maps dispatch functionality to component props.

```js
const mapDispatchToProps = dispatch => ({
  increment: () =>
    dispatch({
      type: "INCREMENT"
    })
});
```

## 23. Selectors ⭐⭐⭐⭐⭐

A selector is a function that reads data from Redux state.

```js
const selectUser =
  state => state.auth.user;
```

Usage:

```jsx
const user = useSelector(selectUser);
```

Selectors improve reusability, readability, encapsulation, and testing.

## 24. Derived Data

Selectors can calculate derived state.

```js
const selectTotalPrice = state =>
  state.products.reduce(
    (total, product) =>
      total + product.price,
    0
  );
```

## 25. Middleware ⭐⭐⭐⭐⭐

Middleware sits between dispatch and reducers.

```text
dispatch()
   ↓
Middleware
   ↓
Reducer
```

Typical uses:
- Logging
- Async operations
- Analytics
- Error handling
- Side effects

## 26. Middleware Structure ⭐⭐⭐⭐⭐

```js
const logger =
  store => next => action => {
    console.log("Action:", action);

    const result = next(action);

    console.log(
      "State:",
      store.getState()
    );

    return result;
  };
```

Structure:

```text
store
 ↓
next
 ↓
action
```

## 27. next(action) ⭐⭐⭐⭐⭐

`next(action)` passes the action to the next middleware.

```js
const logger =
  store => next => action => {
    console.log(action);
    return next(action);
  };
```

If `next(action)` is not called, the action stops at that middleware.

## 28. Middleware Chain

```text
dispatch(action)
      ↓
Logger
      ↓
Auth
      ↓
Analytics
      ↓
Reducer
```

Middleware can run logic before and after `next()`.

## 29. Redux Thunk ⭐⭐⭐⭐⭐

Thunk is middleware that allows functions/thunks to be dispatched instead of only plain action objects.

```js
dispatch(fetchUsers());
```

Example:

```js
const fetchUsers = () =>
  async dispatch => {
    dispatch({
      type: "FETCH_START"
    });

    try {
      const response =
        await fetch("/api/users");

      const users =
        await response.json();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: users
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.message
      });
    }
  };
```

Flow:

```text
dispatch(function)
       ↓
Thunk Middleware
       ↓
Execute Function
       ↓
dispatch(actions)
       ↓
Reducer
```

## 30. Why Thunk?

Reducers cannot perform API calls.

Correct flow:

```text
Component
    ↓
dispatch(thunk)
    ↓
Thunk
    ↓
API Request
    ↓
dispatch(success/failure)
    ↓
Reducer
    ↓
State
```

## 31. Async Redux State Pattern

Common state:

```js
const initialState = {
  data: [],
  loading: false,
  error: null
};
```

Request:

```text
loading = true
```

Success:

```text
loading = false
data = response
```

Failure:

```text
loading = false
error = error
```

## 32. combineReducers() ⭐⭐⭐⭐⭐

Combines multiple reducers into one root reducer.

```js
const rootReducer =
  combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
  });
```

Resulting state:

```js
{
  auth: {},
  cart: {},
  products: {}
}
```

Flow:

```text
authReducer
cartReducer
productReducer
      ↓
combineReducers()
      ↓
rootReducer
      ↓
Redux Store
```

## 33. Redux Performance ⭐⭐⭐⭐⭐

A component using:

```jsx
const user = useSelector(
  state => state.user
);
```

subscribes to the Redux store.

When an action is dispatched:

```text
dispatch()
   ↓
Store Update
   ↓
Selector Runs
   ↓
Selected Value Changed?
   ↓
Yes
   ↓
Component Re-renders
```

Not every store update means every component re-renders.

## 34. Selector Equality

React-Redux compares the selected result using reference equality by default.

```js
oldValue === newValue
```

Example:

```js
{} === {};
// false
```

Therefore selector result references matter.

## 35. Bad Selector

Avoid unnecessarily returning a new object:

```jsx
const data = useSelector(
  state => ({
    user: state.user,
    cart: state.cart
  })
);
```

A new object is created each time the selector runs.

Better:

```jsx
const user = useSelector(
  state => state.user
);

const cart = useSelector(
  state => state.cart
);
```

Or use an appropriate memoized selector/equality strategy.

## 36. Redux DevTools ⭐⭐⭐⭐⭐

Redux DevTools helps inspect:

```text
Actions
State
Previous State
Next State
Payload
State Changes
```

It is useful for debugging Redux state transitions.

## 37. Redux State Normalization

Large relational data can be normalized.

Instead of:

```js
{
  users: [
    {
      id: 1,
      name: "Anil"
    }
  ]
}
```

a normalized shape can be:

```js
{
  users: {
    byId: {
      1: {
        id: 1,
        name: "Anil"
      }
    },
    allIds: [1]
  }
}
```

Benefits:
- Avoid duplicate data
- Easier updates
- Easier lookups
- Better handling of relationships

## 38. Redux vs Context API ⭐⭐⭐⭐⭐

### Context
Primarily useful for sharing values through a component tree.

Examples:
- Theme
- Authentication Context
- Language
- Configuration

### Redux
Provides a centralized application state-management architecture.

Useful for:
- Complex shared state
- Many state transitions
- Middleware requirements
- Advanced debugging
- Large applications

Context and Redux can coexist.

## 39. Redux vs Local State

Don't put everything in Redux.

If only one component needs:

```jsx
const [isOpen, setIsOpen] =
  useState(false);
```

keep it local.

Use Redux when state needs broad sharing or centralized management provides meaningful value.

## 40. Common Redux Mistakes ⭐⭐⭐⭐⭐

### Mutating state

```js
state.user.name = "Anil";
return state;
```

Don't do this in classic Redux.

### API calls inside reducers

```js
function reducer() {
  fetch("/api");
}
```

Reducers must be pure.

### Putting every state in Redux

Keep local UI state local.

### Returning new selector objects unnecessarily

This can cause unnecessary re-renders.

### Putting non-serializable values into state

Avoid values such as:

```text
DOM elements
Functions
Promises
Class instances
```

unless there is a specific reason.

## 41. Traditional Redux Folder Structure

```text
src/
│
├── actions/
│   ├── authActions.js
│   └── cartActions.js
│
├── reducers/
│   ├── authReducer.js
│   ├── cartReducer.js
│   └── rootReducer.js
│
├── constants/
│   └── actionTypes.js
│
├── store/
│   └── store.js
│
└── components/
```

Redux Toolkit will use a separate, feature-oriented structure.

## 42. Complete Redux Flow Example

Suppose the user clicks **Add to Cart**:

```text
User Click
   ↓
Component
   ↓
dispatch(addToCart(product))
   ↓
Action
{
  type: "ADD_TO_CART",
  payload: product
}
   ↓
Middleware
   ↓
cartReducer
   ↓
New Cart State
   ↓
Redux Store
   ↓
useSelector()
   ↓
Component Re-render
```

## 43. Core Redux Interview Questions ⭐⭐⭐⭐⭐

### What is Redux?
A predictable state management library based on a centralized store and unidirectional data flow.

### What are the three principles of Redux?
1. Single source of truth
2. State is read-only
3. Changes happen through pure reducers

### What is an action?
A plain object describing an event.

### What is an action creator?
A function that returns an action.

### What is a reducer?
A pure function that calculates the next state from current state and an action.

### What is dispatch?
The mechanism used to send an action to Redux.

### What does getState() do?
Returns the current store state.

### What does subscribe() do?
Registers a listener that runs when the store updates.

### What is middleware?
A layer between dispatch and reducers used for cross-cutting logic and side effects.

### Why do we need middleware?
To handle async operations, logging, analytics and other side effects without putting them inside reducers.

### What is Redux Thunk?
Middleware that allows functions/thunks to be dispatched so asynchronous workflows can be handled outside reducers.

### What is combineReducers()?
A utility for combining multiple reducers into a single root reducer.

### Why should Redux state be immutable?
Immutable updates make state transitions predictable and allow efficient change detection through references.

### What causes a Redux-connected component to re-render?
When its selected Redux value changes according to the selector's equality comparison.

## 44. Five Most Important Interview Questions

### Explain Redux architecture

```text
Component
 ↓
dispatch
 ↓
Action
 ↓
Middleware
 ↓
Reducer
 ↓
Store
 ↓
Selector
 ↓
Component
```

### Why should reducers be pure?

Because Redux needs predictable and deterministic state transitions. Reducers should calculate state, not perform side effects.

### Why immutable updates?

Redux relies on reference changes for predictable updates and efficient change detection.

### What is middleware?

Middleware intercepts dispatched actions before they reach reducers and is useful for side effects and cross-cutting logic.

### Redux vs Context?

Context primarily shares values through the component tree, while Redux provides a centralized state-management architecture for complex shared state.

## 45. Core Redux Mental Model

```text
                     REDUX
                       │
                       ▼
                  Redux Store
                       │
             ┌─────────┴─────────┐
             │                   │
          State               subscribe
             │
             ▼
        React-Redux
             │
       ┌─────┴─────┐
       ▼           ▼
 useSelector   useDispatch
       │           │
       ▼           ▼
 Component     dispatch()
                   │
                   ▼
                 Action
                   │
                   ▼
               Middleware
                   │
                   ▼
                Reducer
                   │
                   ▼
              New State
```

## 46. Core Redux Checklist

```text
✅ Redux Architecture
✅ Store
✅ State
✅ Action
✅ Action Creator
✅ Reducer
✅ Pure Reducer
✅ Immutable Updates
✅ dispatch()
✅ getState()
✅ subscribe()
✅ Middleware
✅ Redux Thunk
✅ combineReducers()
✅ Root Reducer
✅ React-Redux
✅ Provider
✅ connect()
✅ mapStateToProps
✅ mapDispatchToProps
✅ useSelector()
✅ useDispatch()
✅ Selectors
✅ Redux Performance
✅ Redux DevTools
✅ Redux vs Context
✅ Redux vs Local State
✅ Common Mistakes
```

## 47. Interview One-Liners

- Redux provides centralized application state management.
- Redux follows unidirectional data flow.
- An action describes what happened.
- A reducer calculates the next state.
- `dispatch()` sends an action.
- `getState()` reads the current state.
- `subscribe()` listens for store updates.
- Middleware sits between dispatch and reducers.
- Reducers should be pure.
- Classic Redux requires immutable state updates.
- `combineReducers()` combines individual reducers.
- `Provider` makes the Redux store available to React components.
- `useSelector()` reads/subscribes to selected state.
- `useDispatch()` gives access to dispatch.
- `connect()` is the older React-Redux connection API.
- Thunk middleware enables async workflows.
- Selectors help encapsulate state access and derived data.
- Redux DevTools helps inspect actions and state transitions.

## 48. 2-Minute Interview Answer

> Redux is a predictable state management library used when an application has complex shared state. It follows a unidirectional data flow where components dispatch actions, reducers calculate the next state, and the store holds the centralized state. Reducers must be pure and state updates must be immutable in classic Redux. Middleware sits between dispatch and reducers and can handle side effects such as asynchronous operations, logging and analytics. Redux Thunk is a middleware pattern that allows asynchronous functions to dispatch multiple actions. In React applications, React-Redux provides `Provider`, `useSelector`, `useDispatch`, and the older `connect` API. I use selectors to read specific pieces of state and avoid unnecessary subscriptions or calculations. Redux is useful for complex shared application state, while simple component-specific state should generally remain in React state.

## Final Rule

```text
CORE REDUX
    ↓
Store
    ↓
State
    ↓
Actions
    ↓
Action Creators
    ↓
Reducers
    ↓
dispatch()
    ↓
Middleware
    ↓
Thunk
    ↓
combineReducers()
    ↓
React-Redux
    ↓
Provider
    ↓
useSelector()
    ↓
useDispatch()
    ↓
connect()
    ↓
Selectors
    ↓
Performance
```

**Redux Toolkit is intentionally NOT included in this note.**
