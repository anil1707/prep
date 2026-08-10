# Redux Toolkit – Complete Interview Notes ⭐⭐⭐⭐⭐

> **Scope:** Redux Toolkit only. Core/Classic Redux is covered separately. This note covers the main RTK concepts needed for a React developer interview, from `configureStore` and `createSlice` through async thunks and RTK Query.

---

# 1. What is Redux Toolkit?

Redux Toolkit (RTK) is the official recommended way to write modern Redux applications.

It reduces the boilerplate of classic Redux and provides utilities for common Redux patterns.

Important APIs:

```text
configureStore
createSlice
createAsyncThunk
createSelector
createEntityAdapter
createApi
fetchBaseQuery
```

The most important for interviews:

```text
configureStore
createSlice
createAsyncThunk
extraReducers
Immer
RTK Query
```

---

# 2. Why Redux Toolkit?

Classic Redux can require:

```text
Action Types
Action Creators
Reducers
combineReducers
Store Configuration
Immutable Update Logic
Middleware Configuration
```

Redux Toolkit simplifies this.

Instead of manually creating:

```js
const INCREMENT = "INCREMENT";

const increment = () => ({
  type: INCREMENT
});
```

you can use:

```js
const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0
  },

  reducers: {
    increment: state => {
      state.count += 1;
    }
  }
});
```

RTK generates the action creator and reducer automatically.

---

# 3. Redux Toolkit Mental Model

```text
Redux Toolkit
      ↓
┌─────────────┬──────────────────┐
↓             ↓                  ↓
Store       Slices             Async
↓             ↓                  ↓
configure   createSlice    createAsyncThunk
Store          ↓                  ↓
          Actions + Reducer   pending/fulfilled/rejected
```

For API-heavy applications:

```text
RTK
 ↓
RTK Query
 ↓
Queries / Mutations
 ↓
Caching / Invalidation
```

---

# 4. `configureStore()` ⭐⭐⭐⭐⭐

`configureStore()` creates the Redux store with sensible defaults.

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;
```

Compared with classic Redux:

```js
createStore(rootReducer);
```

`configureStore()` provides convenient configuration for:

- Reducers
- Middleware
- Redux DevTools
- Development checks

---

# 5. Multiple Reducers

```js
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    cart: cartReducer
  }
});
```

State becomes:

```js
{
  auth: {},
  users: {},
  cart: {}
}
```

RTK internally combines the reducer map into the store's root reducer.

---

# 6. Middleware Configuration

RTK adds useful default middleware.

You can customize it:

```js
const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(logger)
});
```

Important:

```js
getDefaultMiddleware()
```

returns RTK's default middleware collection.

You generally extend it rather than replacing it unnecessarily.

---

# 7. Redux DevTools

`configureStore()` automatically enables Redux DevTools integration in development-oriented configurations.

This allows inspection of:

```text
Actions
State
Previous State
Next State
Payload
State Changes
```

---

# 8. `createSlice()` ⭐⭐⭐⭐⭐

`createSlice()` is one of the most important RTK APIs.

A slice normally contains:

```text
name
initialState
reducers
```

Example:

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0
  },

  reducers: {
    increment: state => {
      state.count += 1;
    },

    decrement: state => {
      state.count -= 1;
    }
  }
});
```

---

# 9. What Does `createSlice()` Generate?

RTK generates:

```text
Reducer
Action Types
Action Creators
```

Example:

```js
export const {
  increment,
  decrement
} = counterSlice.actions;

export default counterSlice.reducer;
```

Mental model:

```text
createSlice()
      ↓
┌───────────────────────┐
│ name                  │
│ initialState          │
│ reducers              │
└───────────────────────┘
          ↓
Generated
          ↓
Actions + Action Creators + Reducer
```

---

# 10. Complete Slice Example

```js
import {
  createSlice
} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0
  },

  reducers: {
    increment: state => {
      state.count += 1;
    },

    decrement: state => {
      state.count -= 1;
    },

    incrementByAmount: (
      state,
      action
    ) => {
      state.count += action.payload;
    }
  }
});

export const {
  increment,
  decrement,
  incrementByAmount
} = counterSlice.actions;

export default counterSlice.reducer;
```

---

# 11. `action.payload` ⭐⭐⭐⭐⭐

If:

```js
dispatch(
  incrementByAmount(5)
);
```

the generated action is conceptually:

```js
{
  type: "counter/incrementByAmount",
  payload: 5
}
```

Reducer:

```js
incrementByAmount: (
  state,
  action
) => {
  state.count += action.payload;
}
```

So:

```text
dispatch(5)
    ↓
payload = 5
    ↓
Reducer
    ↓
count += 5
```

---

# 12. Immer ⭐⭐⭐⭐⭐

RTK uses Immer internally for reducers created through `createSlice`.

Therefore you can write:

```js
state.count += 1;
```

even though Redux state must remain immutable.

Immer converts the mutation-like code into an immutable state update.

Conceptually:

```text
Mutation-like Code
       ↓
      Immer
       ↓
Immutable Next State
```

---

# 13. Does RTK Mutate Redux State?

Interview question:

> Does Redux Toolkit allow mutation?

Answer:

> Redux Toolkit allows mutation-like syntax inside its reducers because it uses Immer. Immer tracks the changes and produces the next immutable state. The actual Redux state is not directly mutated in the way ordinary JavaScript mutation would work.

---

# 14. Nested Updates with Immer

Without Immer:

```js
return {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Anil"
    }
  }
};
```

With RTK:

```js
state.user.profile.name = "Anil";
```

This is one of the biggest benefits of `createSlice`.

---

# 15. Arrays with Immer

You can write:

```js
state.items.push(item);
```

or:

```js
state.items.splice(index, 1);
```

inside an RTK reducer.

Immer converts these into immutable updates.

---

# 16. Returning State from an RTK Reducer

You can either mutate the draft:

```js
increment: state => {
  state.count += 1;
}
```

or return a completely new state:

```js
reset: () => {
  return {
    count: 0
  };
}
```

Do not both mutate the draft and return a different state in the same reducer.

---

# 17. Provider ⭐⭐⭐⭐⭐

React-Redux provides the store to the component tree.

```jsx
import {
  Provider
} from "react-redux";

<Provider store={store}>
  <App />
</Provider>
```

Flow:

```text
Provider
   ↓
Redux Store
   ↓
React Components
```

---

# 18. `useSelector()` ⭐⭐⭐⭐⭐

Reads selected data from Redux state.

```jsx
const count = useSelector(
  state => state.counter.count
);
```

A component can subscribe to a specific part of the state.

---

# 19. `useDispatch()` ⭐⭐⭐⭐⭐

Provides the Redux dispatch function.

```jsx
const dispatch = useDispatch();

dispatch(increment());

dispatch(
  incrementByAmount(5)
);
```

---

# 20. Complete React + RTK Example

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
          dispatch(increment())
        }
      >
        Increment
      </button>

      <button
        onClick={() =>
          dispatch(
            incrementByAmount(5)
          )
        }
      >
        +5
      </button>
    </>
  );
}
```

---

# 21. `createAsyncThunk()` ⭐⭐⭐⭐⭐

`createAsyncThunk()` is used for asynchronous workflows such as API calls.

```js
import {
  createAsyncThunk
} from "@reduxjs/toolkit";

export const fetchUsers =
  createAsyncThunk(
    "users/fetchUsers",
    async () => {
      const response =
        await fetch("/api/users");

      return response.json();
    }
  );
```

---

# 22. Async Lifecycle Actions

`createAsyncThunk()` automatically creates:

```text
users/fetchUsers/pending
users/fetchUsers/fulfilled
users/fetchUsers/rejected
```

Flow:

```text
dispatch(fetchUsers())
        ↓
     pending
        ↓
    API Request
        ↓
   ┌────┴────┐
   ↓         ↓
fulfilled  rejected
```

---

# 23. `extraReducers()` ⭐⭐⭐⭐⭐

`extraReducers` allows a slice to respond to actions created outside its own `reducers`.

It is commonly used for `createAsyncThunk()` lifecycle actions.

```js
extraReducers: builder => {
  builder
    .addCase(
      fetchUsers.pending,
      state => {
        state.status = "loading";
      }
    )

    .addCase(
      fetchUsers.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data =
          action.payload;
      }
    )

    .addCase(
      fetchUsers.rejected,
      (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message;
      }
    );
}
```

---

# 24. `reducers` vs `extraReducers` ⭐⭐⭐⭐⭐

### `reducers`

Handles actions created by the slice:

```js
reducers: {
  clearUsers: state => {
    state.data = [];
  }
}
```

### `extraReducers`

Handles actions created elsewhere:

```js
extraReducers: builder => {
  builder.addCase(
    fetchUsers.fulfilled,
    ...
  );
}
```

Remember:

```text
reducers
→ Slice-owned actions

extraReducers
→ External actions
```

---

# 25. Async State Pattern

A common state structure:

```js
const initialState = {
  data: [],
  status: "idle",
  error: null
};
```

Possible statuses:

```text
idle
loading
succeeded
failed
```

Example:

```js
.addCase(
  fetchUsers.pending,
  state => {
    state.status = "loading";
  }
)

.addCase(
  fetchUsers.fulfilled,
  (state, action) => {
    state.status = "succeeded";
    state.data = action.payload;
  }
)

.addCase(
  fetchUsers.rejected,
  (state, action) => {
    state.status = "failed";
    state.error =
      action.payload ||
      action.error.message;
  }
)
```

---

# 26. Passing Arguments to `createAsyncThunk()`

```js
dispatch(
  fetchUserById(101)
);
```

Thunk:

```js
const fetchUserById =
  createAsyncThunk(
    "users/fetchUserById",

    async userId => {
      const response =
        await fetch(
          `/api/users/${userId}`
        );

      return response.json();
    }
  );
```

For multiple values, pass an object:

```js
dispatch(
  fetchUsers({
    page: 1,
    status: "active"
  })
);
```

---

# 27. `getState()` Inside a Thunk

The thunk API can access the current Redux state.

```js
const fetchOrders =
  createAsyncThunk(
    "orders/fetchOrders",

    async (
      _,
      { getState }
    ) => {

      const token =
        getState().auth.token;

      const response =
        await fetch("/api/orders", {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        });

      return response.json();
    }
  );
```

---

# 28. `dispatch()` Inside a Thunk

A thunk can dispatch another action.

```js
const processOrder =
  createAsyncThunk(
    "orders/processOrder",

    async (
      order,
      { dispatch }
    ) => {

      dispatch(
        orderStarted()
      );

      // API call

      dispatch(
        notificationAdded(
          "Order processed"
        )
      );
    }
  );
```

Use this carefully to avoid unnecessarily complicated async chains.

---

# 29. `rejectWithValue()` ⭐⭐⭐⭐⭐

Use `rejectWithValue()` when you want to send a controlled error payload to the rejected reducer.

```js
const login =
  createAsyncThunk(
    "auth/login",

    async (
      credentials,
      { rejectWithValue }
    ) => {

      try {
        const response =
          await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(
              credentials
            )
          });

        const data =
          await response.json();

        if (!response.ok) {
          return rejectWithValue(
            data
          );
        }

        return data;

      } catch (error) {
        return rejectWithValue({
          message: error.message
        });
      }
    }
  );
```

Rejected reducer:

```js
.addCase(
  login.rejected,
  (state, action) => {
    state.error =
      action.payload;
  }
)
```

---

# 30. `action.error` vs `action.payload`

If you throw:

```js
throw new Error("Failed");
```

the error is available through:

```js
action.error
```

If you use:

```js
return rejectWithValue(data);
```

the custom error is available through:

```js
action.payload
```

Mental model:

```text
throw
 ↓
action.error

rejectWithValue(data)
 ↓
action.payload
```

---

# 31. `fetch()` Error Handling

Important interview point:

`fetch()` does not reject simply because the server returns HTTP:

```text
400
401
403
404
500
```

Check:

```js
if (!response.ok) {
  throw new Error(
    "Request failed"
  );
}
```

or:

```js
if (!response.ok) {
  return rejectWithValue(
    await response.json()
  );
}
```

---

# 32. Abort / Cancellation

`createAsyncThunk()` provides an `AbortSignal`.

```js
const fetchUsers =
  createAsyncThunk(
    "users/fetchUsers",

    async (
      _,
      { signal }
    ) => {

      const response =
        await fetch(
          "/api/users",
          { signal }
        );

      return response.json();
    }
  );
```

A dispatched thunk can also be aborted:

```js
const promise =
  dispatch(fetchUsers());

promise.abort();
```

This is useful for obsolete requests.

---

# 33. `condition()` ⭐⭐⭐⭐⭐

`condition()` can prevent a thunk from starting.

```js
const fetchUsers =
  createAsyncThunk(
    "users/fetchUsers",

    async () => {
      const response =
        await fetch("/api/users");

      return response.json();
    },

    {
      condition: (
        _,
        { getState }
      ) => {
        const status =
          getState().users.status;

        return status !== "loading";
      }
    }
  );
```

Flow:

```text
dispatch(fetchUsers())
        ↓
condition()
        ↓
Already Loading?
   ↙          ↘
 Yes           No
 ↓             ↓
Stop         Continue
```

Useful for preventing duplicate requests.

---

# 34. `requestId`

Every thunk execution gets a unique request ID.

```js
async (
  arg,
  { requestId }
) => {
  console.log(requestId);
}
```

Lifecycle actions also contain metadata:

```js
action.meta.requestId
```

This can help manage concurrent requests.

---

# 35. `action.meta`

Thunk lifecycle actions can contain metadata such as:

```js
action.meta.requestId
action.meta.arg
```

Mental model:

```text
action
 ├── type
 ├── payload
 ├── error
 └── meta
      ├── requestId
      └── arg
```

---

# 36. Dependent API Calls

If API B depends on API A:

```text
Get User
   ↓
Get User's Orders
```

You may perform them sequentially:

```js
const user =
  await getUser();

const orders =
  await getOrders(user.id);
```

If requests are independent, use parallel execution:

```js
const [
  users,
  products
] = await Promise.all([
  getUsers(),
  getProducts()
]);
```

---

# 37. RTK Query ⭐⭐⭐⭐⭐

RTK Query is a data-fetching and caching solution included with Redux Toolkit.

It is designed primarily for **server state**.

It can handle:

```text
Fetching
Caching
Loading
Errors
Refetching
Cache Invalidation
Polling
Mutations
Generated Hooks
```

Instead of manually writing:

```text
Thunk
Loading State
Success State
Error State
Cache Logic
Refetch Logic
```

RTK Query provides these capabilities.

---

# 38. `createApi()`

RTK Query starts with `createApi()`.

```js
import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),

  endpoints: builder => ({
    getUsers: builder.query({
      query: () => "/users"
    })
  })
});
```

---

# 39. `fetchBaseQuery()`

`fetchBaseQuery()` is a lightweight wrapper around `fetch`.

```js
baseQuery: fetchBaseQuery({
  baseUrl: "/api"
})
```

Then endpoint queries can use:

```js
query: () => "/users"
```

---

# 40. Query vs Mutation ⭐⭐⭐⭐⭐

### Query

Used to retrieve data.

```js
getUsers: builder.query({
  query: () => "/users"
})
```

### Mutation

Used to change server data.

```js
addUser: builder.mutation({
  query: user => ({
    url: "/users",
    method: "POST",
    body: user
  })
})
```

Mental model:

```text
Query
→ Read server state

Mutation
→ Create / Update / Delete server state
```

---

# 41. Generated Hooks

For:

```js
getUsers: builder.query(...)
```

RTK Query generates a hook such as:

```js
useGetUsersQuery
```

Usage:

```jsx
const {
  data,
  error,
  isLoading
} = useGetUsersQuery();
```

This removes a lot of manual Redux async boilerplate.

---

# 42. Mutation Hook

For:

```js
addUser: builder.mutation(...)
```

you get:

```js
useAddUserMutation
```

Usage:

```jsx
const [
  addUser,
  {
    isLoading,
    error
  }
] = useAddUserMutation();

await addUser(user);
```

---

# 43. RTK Query Caching ⭐⭐⭐⭐⭐

Suppose:

```text
Component A
 ↓
getUsers
```

Then another component requests:

```text
Component B
 ↓
getUsers
```

RTK Query can reuse cached server data according to its cache configuration.

This avoids unnecessary repeated requests.

---

# 44. Cache Invalidation ⭐⭐⭐⭐⭐

RTK Query uses tags to help determine when cached data should be invalidated.

Example:

```js
tagTypes: ["User"]
```

Query:

```js
getUsers: builder.query({
  query: () => "/users",
  providesTags: ["User"]
})
```

Mutation:

```js
addUser: builder.mutation({
  query: user => ({
    url: "/users",
    method: "POST",
    body: user
  }),

  invalidatesTags: ["User"]
})
```

Flow:

```text
getUsers
 ↓
Cache User Data
 ↓
addUser
 ↓
Invalidate "User"
 ↓
Relevant query can refetch
```

---

# 45. `providesTags`

Indicates which cache data a query provides.

```js
providesTags: ["User"]
```

---

# 46. `invalidatesTags`

Indicates which cache data a mutation invalidates.

```js
invalidatesTags: ["User"]
```

Mental model:

```text
Query
 ↓
providesTags

Mutation
 ↓
invalidatesTags
```

---

# 47. Example RTK Query API

```js
export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),

  tagTypes: ["User"],

  endpoints: builder => ({

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"]
    }),

    addUser: builder.mutation({
      query: user => ({
        url: "/users",
        method: "POST",
        body: user
      }),

      invalidatesTags: ["User"]
    })
  })
});
```

---

# 48. Adding RTK Query to Store

The API reducer must be added to the Redux store:

```js
const store = configureStore({
  reducer: {
    [api.reducerPath]:
      api.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
});
```

This is essential.

RTK Query requires its reducer and middleware to be integrated into the store.

---

# 49. RTK Query with React

```jsx
function Users() {
  const {
    data,
    error,
    isLoading
  } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

---

# 50. `createAsyncThunk` vs RTK Query ⭐⭐⭐⭐⭐

| `createAsyncThunk` | RTK Query |
|---|---|
| Custom async workflows | Server-state fetching |
| Manual state handling | Built-in request state |
| Manual caching | Built-in caching |
| Manual refetch logic | Built-in refetching |
| Flexible business workflows | API/data fetching focused |
| Multiple custom dispatches | Query/mutation model |
| Useful for complex workflows | Excellent for CRUD/API state |

Important:

> RTK Query does not replace every possible use of `createAsyncThunk`. Use thunks for custom workflows and RTK Query for server-state fetching/caching when it fits the problem.

---

# 51. `createAsyncThunk` vs RTK Query Interview Answer

> "`createAsyncThunk` is useful when I need custom asynchronous business logic, multiple dispatches, access to Redux state, dependent operations, or custom workflows. RTK Query is designed specifically for server-state management and provides caching, loading states, refetching and cache invalidation. For standard API CRUD operations, I would generally consider RTK Query first."

---

# 52. `createSelector()` ⭐⭐⭐⭐

`createSelector()` is used to create memoized selectors.

Example:

```js
import {
  createSelector
} from "@reduxjs/toolkit";

const selectUsers =
  state => state.users.data;

const selectActiveUsers =
  createSelector(
    [selectUsers],

    users =>
      users.filter(
        user => user.active
      )
  );
```

The derived calculation can be reused and memoized based on its inputs.

---

# 53. Why Memoized Selectors?

Without memoization:

```js
users.filter(...)
```

may execute whenever the selector runs.

With `createSelector()`:

```text
Input unchanged
     ↓
Reuse previous result
```

This is useful for expensive derived calculations.

---

# 54. `createEntityAdapter()` ⭐⭐⭐⭐

`createEntityAdapter()` helps manage normalized collections.

Instead of:

```js
users: [
  { id: 1, name: "Anil" },
  { id: 2, name: "Rahul" }
]
```

it can manage normalized data such as:

```js
{
  ids: [1, 2],

  entities: {
    1: {
      id: 1,
      name: "Anil"
    },

    2: {
      id: 2,
      name: "Rahul"
    }
  }
}
```

Benefits:

- Normalized state
- Efficient lookups
- Standardized CRUD reducers
- Generated selectors

Example:

```js
const usersAdapter =
  createEntityAdapter();

const initialState =
  usersAdapter.getInitialState();
```

---

# 55. When to Use `createEntityAdapter()`

Useful when you manage large collections of entities:

```text
Users
Products
Orders
Employees
Transactions
```

especially when frequent individual updates/lookups are required.

---

# 56. RTK Serializability Check ⭐⭐⭐⭐

RTK's default middleware includes checks intended to catch non-serializable values.

Redux state and actions should generally contain serializable data:

```text
String
Number
Boolean
Array
Plain Object
null
```

Avoid putting things like:

```text
Functions
Promises
DOM Nodes
Class Instances
```

into Redux state unless there is a very deliberate reason.

---

# 57. RTK Project Structure ⭐⭐⭐⭐⭐

A modern feature-oriented structure is usually preferred:

```text
src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── authApi.js
│   │
│   ├── users/
│   │   ├── usersSlice.js
│   │   └── usersApi.js
│   │
│   └── cart/
│       └── cartSlice.js
│
├── components/
│
└── pages/
```

Organize code around **features/domain**, rather than putting every action in one directory and every reducer in another.

---

# 58. Local State vs Redux Toolkit

Not every state belongs in Redux.

### Local state

```jsx
const [
  isModalOpen,
  setIsModalOpen
] = useState(false);
```

Use for:

```text
Modal visibility
Input values
Temporary UI state
Component-specific state
```

### Redux

Use for:

```text
Shared application state
Complex state transitions
Cross-feature state
Globally relevant client state
```

### RTK Query

Use for:

```text
Server/API state
Caching
Refetching
Invalidation
```

---

# 59. Client State vs Server State ⭐⭐⭐⭐⭐

This distinction is very important.

### Client State

Created and controlled primarily by your UI/application:

```text
Theme
Modal state
Selected tab
UI preferences
Some authentication/UI state
```

### Server State

Comes from an external backend:

```text
Users
Products
Orders
Transactions
Portfolio data
```

RTK Query is particularly useful for server state.

---

# 60. Common Redux Toolkit Mistakes ⭐⭐⭐⭐⭐

### 1. Thinking Immer means Redux state can be mutated anywhere

Mutation-like syntax is safe inside Immer-powered RTK reducers, not arbitrary component code.

### 2. Putting every API request into `createAsyncThunk`

For standard API caching and synchronization, RTK Query may be a better choice.

### 3. Forgetting `extraReducers`

`createAsyncThunk` lifecycle actions need to be handled somewhere if you want to update slice state.

### 4. Forgetting to add RTK Query reducer

```js
[api.reducerPath]: api.reducer
```

must be included.

### 5. Forgetting RTK Query middleware

```js
.concat(api.middleware)
```

is required for RTK Query behavior.

### 6. Returning a new selector object unnecessarily

Can cause unnecessary component updates.

### 7. Putting non-serializable data into Redux

Avoid functions, DOM nodes, promises, and class instances.

### 8. Putting all component state into Redux

Keep component-specific UI state local.

---

# 61. Complete RTK Architecture ⭐⭐⭐⭐⭐

```text
                         React App
                             │
              ┌──────────────┴──────────────┐
              ↓                             ↓
       Client State                    Server State
              ↓                             ↓
        createSlice                    RTK Query
              ↓                             ↓
        Redux Store ←──────────────→ API Cache
              │
       ┌──────┴──────┐
       ↓             ↓
 useSelector     useDispatch
       │             │
       ↓             ↓
 Components       Actions
                     │
              ┌──────┴──────┐
              ↓             ↓
          Reducers      Async Thunks
                            ↓
                          API
```

---

# 62. Complete RTK Request Flow

For a standard RTK Query request:

```text
Component
   ↓
useGetUsersQuery()
   ↓
RTK Query
   ↓
Cache Check
   ↓
API Request if needed
   ↓
Response
   ↓
Cache
   ↓
Component
```

For a custom thunk:

```text
Component
   ↓
dispatch(fetchUsers())
   ↓
pending
   ↓
createAsyncThunk
   ↓
API
   ↓
fulfilled/rejected
   ↓
extraReducers
   ↓
Redux State
   ↓
useSelector
   ↓
Component
```

---

# 63. Redux Toolkit Interview Questions ⭐⭐⭐⭐⭐

### What is Redux Toolkit?

The official recommended way to write modern Redux applications with less boilerplate and sensible defaults.

### What is `configureStore()`?

A store-creation utility that simplifies reducer, middleware, DevTools, and development configuration.

### What is `createSlice()`?

A utility that generates a reducer and action creators/action types from a slice definition.

### Does RTK mutate state?

No. Immer allows mutation-like syntax and produces immutable next state.

### What is `createAsyncThunk()`?

A utility for handling asynchronous workflows and generating pending, fulfilled, and rejected lifecycle actions.

### What is `extraReducers`?

A mechanism for handling actions created outside the slice, especially thunk lifecycle actions.

### What is `rejectWithValue()`?

A helper for returning a custom error payload to the rejected action.

### What is RTK Query?

A data-fetching and caching solution for server state included with Redux Toolkit.

### Query vs mutation?

Query reads/fetches server data. Mutation changes server data.

### What are `providesTags` and `invalidatesTags`?

They help RTK Query manage cache relationships and determine when cached data should be refreshed.

### What is `createSelector()`?

A utility for creating memoized selectors and derived state calculations.

### What is `createEntityAdapter()`?

A utility for managing normalized entity collections and generating standard CRUD reducers/selectors.

---

# 64. Senior Interview Questions ⭐⭐⭐⭐⭐

## Why would you choose RTK Query instead of createAsyncThunk?

> For standard server-state operations where I need caching, loading/error handling, refetching, and cache invalidation, RTK Query removes a lot of manual code. I would use `createAsyncThunk` when I need custom business workflows or asynchronous logic that doesn't fit the query/mutation model.

## Why is Immer useful?

> It allows developers to write mutation-like reducer logic while Immer tracks those changes and produces an immutable next state.

## How do you prevent duplicate requests?

Possible approaches:

```text
condition()
Abort/cancellation
requestId
RTK Query caching
```

The right solution depends on the use case.

## How do you handle authentication in a thunk?

> If authentication information is stored in Redux state, I can read it using `getState()`. In production I also consider the security model and whether secure cookie/session-based authentication is more appropriate.

## How do you optimize expensive derived Redux data?

> I use selectors and `createSelector()` to memoize expensive derived calculations and avoid recomputing them when their inputs haven't changed.

---

# 65. Redux vs Redux Toolkit

| Redux | Redux Toolkit |
|---|---|
| Core state-management library | Official recommended Redux development approach |
| More manual code possible | Less boilerplate |
| Manual action types commonly used | Generated by `createSlice` |
| Manual immutable updates | Immer |
| `createStore` | `configureStore` |
| Manual async patterns | `createAsyncThunk` / RTK Query |
| Manual API caching often needed | RTK Query provides caching |
| More configuration | Sensible defaults |

Important:

> Redux Toolkit is not a completely different state-management system from Redux. It is the official set of tools and conventions for writing Redux applications more efficiently.

---

# 66. RTK vs Context API

### Context

Good for:

```text
Theme
Locale
Configuration
Simple shared values
```

### RTK

Good for:

```text
Complex shared client state
Complex transitions
Large applications
Debugging
Middleware
Structured state management
```

### RTK Query

Good for:

```text
Server state
API caching
Refetching
Cache invalidation
CRUD data
```

---

# 67. RTK vs React Query

Both can manage server state.

RTK Query:

```text
Integrated with Redux Toolkit
Redux store ecosystem
Reducers/middleware
Queries/mutations
Cache management
```

React Query/TanStack Query:

```text
Focused primarily on server state
Independent of Redux
Strong caching/query model
```

Choose based on application architecture rather than simply assuming one is always better.

---

# 68. Common Performance Considerations

### 1. Select only required state

Prefer:

```js
useSelector(
  state => state.user.name
);
```

when the component only needs the name.

### 2. Memoize expensive derived data

Use:

```js
createSelector()
```

### 3. Avoid unnecessary new references

Be careful with selectors returning new objects/arrays.

### 4. Normalize large collections

Consider:

```js
createEntityAdapter()
```

### 5. Use RTK Query for server-state caching

Avoid manually recreating caching behavior when a query/cache solution already fits the problem.

---

# 69. Real-World Example

Imagine a financial application with:

```text
Authentication
Investor
Folios
Transactions
```

Possible structure:

```text
features/
│
├── auth/
│   └── authSlice.js
│
├── investor/
│   └── investorSlice.js
│
├── folio/
│   └── folioApi.js
│
└── transaction/
    └── transactionApi.js
```

Use:

```text
createSlice
→ Client/UI/application state

RTK Query
→ Investor/Folio/Transaction API data

createAsyncThunk
→ Custom workflows where needed
```

---

# 70. Final RTK Mental Model ⭐⭐⭐⭐⭐

```text
                    Redux Toolkit
                          │
          ┌───────────────┼────────────────┐
          ↓               ↓                ↓
   configureStore    createSlice     createAsyncThunk
          │               │                │
          ↓               ↓                ↓
        Store        Actions +         Async
                     Reducers          Lifecycle
                          │                │
                          └──────┬─────────┘
                                 ↓
                            Redux State
                                 │
                         ┌───────┴───────┐
                         ↓               ↓
                   useSelector     useDispatch
                         │               │
                         └───────┬───────┘
                                 ↓
                              React
```

For server state:

```text
                    RTK Query
                        │
             ┌──────────┴──────────┐
             ↓                     ↓
           Query                Mutation
             ↓                     ↓
        Fetch/Cache          Create/Update/Delete
             │                     │
             └──────────┬──────────┘
                        ↓
                 Cache Management
                        ↓
              Tags / Invalidation
```

---

# 71. Final Checklist

```text
✅ Redux Toolkit
✅ configureStore
✅ createSlice
✅ initialState
✅ reducers
✅ Generated actions
✅ action.payload
✅ Immer
✅ Immutable updates
✅ Provider
✅ useSelector
✅ useDispatch

✅ createAsyncThunk
✅ pending
✅ fulfilled
✅ rejected
✅ extraReducers
✅ getState
✅ dispatch inside thunk
✅ rejectWithValue
✅ action.error
✅ action.payload
✅ condition
✅ requestId
✅ action.meta
✅ AbortSignal
✅ Sequential APIs
✅ Parallel APIs
✅ Error handling

✅ RTK Query
✅ createApi
✅ fetchBaseQuery
✅ Query
✅ Mutation
✅ Generated hooks
✅ Caching
✅ providesTags
✅ invalidatesTags
✅ Cache invalidation
✅ API middleware
✅ API reducer

✅ createSelector
✅ createEntityAdapter
✅ Normalized state
✅ Serializability
✅ Performance
✅ Feature-based architecture
✅ Client vs server state
✅ RTK vs Redux
✅ RTK vs Context
✅ RTK vs React Query
```

---

# 72. Interview One-Liners

- `configureStore()` creates and configures the Redux store.
- `createSlice()` generates reducers and action creators/action types.
- Immer enables mutation-like syntax while maintaining immutable state updates.
- `createAsyncThunk()` handles asynchronous workflows.
- `pending`, `fulfilled`, and `rejected` are thunk lifecycle actions.
- `extraReducers` handles actions created outside a slice.
- `rejectWithValue()` provides a custom rejected payload.
- `getState()` reads the current Redux state inside a thunk.
- `condition()` can prevent a thunk from executing.
- `requestId` identifies a particular thunk execution.
- RTK Query manages server-state fetching and caching.
- Queries generally read server data.
- Mutations generally change server data.
- `providesTags` describes cache relationships for queries.
- `invalidatesTags` marks related cached data as stale.
- `createSelector()` creates memoized selectors.
- `createEntityAdapter()` manages normalized entity collections.
- Redux Toolkit reduces Redux boilerplate; it does not replace Redux as a separate state-management model.

---

# 73. 2-Minute Interview Answer

> Redux Toolkit is the official recommended way to write modern Redux applications. I use `configureStore` to create the store with sensible defaults and `createSlice` to define state and reducers while automatically generating action creators. RTK uses Immer, so reducers can use mutation-like syntax while the resulting state updates remain immutable. For custom asynchronous workflows I use `createAsyncThunk`, which generates pending, fulfilled and rejected lifecycle actions that I handle through `extraReducers`. I can use `getState` to access existing Redux state, `rejectWithValue` for structured backend errors, and cancellation or `condition` when request control is required. For standard server-state operations such as CRUD APIs, caching, refetching and invalidation, I would generally consider RTK Query. I use selectors and `createSelector` for state access and expensive derived data, and `createEntityAdapter` when normalized entity collections are useful.

---

# 74. Final Architecture to Remember

```text
                    React Application
                           │
             ┌─────────────┴─────────────┐
             ↓                           ↓
       Client State                 Server State
             ↓                           ↓
       createSlice                    RTK Query
             ↓                           ↓
       Redux Store ←──────────────→ API Cache
             │
      ┌──────┴──────┐
      ↓             ↓
useSelector    useDispatch
      │             │
      ↓             ↓
Component       Action
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
      Reducer          createAsyncThunk
                              ↓
                             API
```

**Redux Toolkit module complete.**

Next major topic in the React interview roadmap can be **React + TypeScript**, **advanced React patterns**, or another module from your preparation plan.
