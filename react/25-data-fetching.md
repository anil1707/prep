# Module 25 – Data Fetching

## Topics

1. Fetch
2. Axios
3. TanStack Query
4. SWR
5. Caching
6. Optimistic Updates
7. Pagination
8. Infinite Scroll

---

# 1. Fetch API ⭐⭐⭐⭐⭐

`fetch()` is the browser's built-in API for making HTTP requests.

## Basic GET

```js
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

Important flow:

```text
fetch()
  ↓
Promise<Response>
  ↓
Response
  ↓
response.json()
  ↓
Parsed JavaScript data
```

## HTTP Methods

```js
// GET
fetch("/api/users");

// POST
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Anil"
  })
});

// PUT
fetch("/api/users/1", {
  method: "PUT",
  body: JSON.stringify(data)
});

// PATCH
fetch("/api/users/1", {
  method: "PATCH",
  body: JSON.stringify(data)
});

// DELETE
fetch("/api/users/1", {
  method: "DELETE"
});
```

## Important: Fetch does NOT reject for HTTP errors

A `404` or `500` normally still resolves the Fetch promise.

Therefore:

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

`response.ok` is true for successful 2xx responses.

## Error Handling

```js
async function getUsers() {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

Difference:

```text
Network error
→ Fetch rejects

404 / 500
→ Fetch normally resolves
→ Check response.ok
```

## Headers

```js
fetch("/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  }
});
```

## Query Parameters

```js
const params = new URLSearchParams({
  page: "2",
  limit: "20"
});

fetch(`/api/users?${params}`);
```

## AbortController

Used to cancel a request.

```js
const controller = new AbortController();

fetch("/api/users", {
  signal: controller.signal
});

controller.abort();
```

Very useful for:

- Search
- Route changes
- `useEffect` cleanup
- Obsolete requests

## Fetch in `useEffect`

Do not make the effect callback itself async:

```js
useEffect(() => {
  async function loadUsers() {
    // fetch
  }

  loadUsers();

  return () => {
    // cleanup
  };
}, []);
```

The effect callback should return nothing or a cleanup function, not a Promise.

## Parallel Requests

```js
const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);
```

Use when requests are independent.

For independent requests that may fail separately:

```js
const results = await Promise.allSettled([
  fetchUsers(),
  fetchProducts()
]);
```

## FormData

```js
const formData = new FormData();

formData.append("file", file);

await fetch("/api/upload", {
  method: "POST",
  body: formData
});
```

Don't manually set `Content-Type: multipart/form-data`; the browser needs to generate the boundary.

## Common Fetch Mistakes

- Forgetting `response.ok`
- Forgetting `response.json()`
- Forgetting `JSON.stringify()` for JSON request bodies
- Not cancelling obsolete requests
- Parsing `204 No Content` as JSON
- Ignoring race conditions
- Making `useEffect` itself async

---

# 2. Axios ⭐⭐⭐⭐⭐

Axios is a Promise-based HTTP client.

```js
import axios from "axios";

const response = await axios.get("/api/users");

console.log(response.data);
```

Unlike Fetch, Axios commonly parses JSON responses automatically.

## HTTP Methods

```js
axios.get("/users");

axios.post("/users", user);

axios.put(`/users/${id}`, user);

axios.patch(`/users/${id}`, {
  name: "Anil"
});

axios.delete(`/users/${id}`);
```

## Query Parameters

```js
axios.get("/users", {
  params: {
    page: 2,
    limit: 20
  }
});
```

## Axios Response

```js
{
  data,
  status,
  statusText,
  headers,
  config,
  request
}
```

Usually:

```js
response.data
```

is what you need.

## Axios Error Handling

Axios rejects non-2xx responses by default.

```js
try {
  const response = await axios.get("/users");
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}
```

Important:

```text
error.response
→ Server responded with an error

error.request
→ Request was sent but no response arrived

error.message
→ General error information
```

## Axios Instance ⭐⭐⭐⭐⭐

Create one reusable instance:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});
```

Then:

```js
api.get("/users");
api.post("/users", user);
```

Benefits:

- Centralized base URL
- Timeout
- Common headers
- Interceptors
- Authentication handling
- Consistent configuration

## Request Interceptor ⭐⭐⭐⭐⭐

Used to modify requests before they are sent.

```js
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

Common uses:

- Authentication
- Common headers
- Logging
- Request IDs

## Response Interceptor ⭐⭐⭐⭐⭐

```js
api.interceptors.response.use(
  response => response,

  error => {
    if (error.response?.status === 401) {
      // Handle authentication
    }

    return Promise.reject(error);
  }
);
```

Common uses:

- Global 401 handling
- Token refresh
- Logging
- Common error handling

## Timeout

```js
const api = axios.create({
  timeout: 5000
});
```

## Request Cancellation

Modern Axios supports `AbortController`:

```js
const controller = new AbortController();

api.get("/users", {
  signal: controller.signal
});

controller.abort();
```

## API Service Layer

Instead of calling Axios everywhere:

```js
export const getUsers = () =>
  api.get("/users");

export const createUser = user =>
  api.post("/users", user);
```

This keeps components cleaner.

## Axios vs Fetch

| Fetch | Axios |
|---|---|
| Built into browser | Third-party package |
| Manual `response.json()` | JSON parsing handled conveniently |
| Check `response.ok` manually | Non-2xx rejects by default |
| No built-in interceptors | Interceptors |
| No Axios instance | `axios.create()` |
| Timeout via AbortSignal | Timeout option |
| Lightweight | More features/convenience |

---

# 3. TanStack Query ⭐⭐⭐⭐⭐

TanStack Query is a **server-state management library**, not just an HTTP client.

It manages:

- Fetching
- Caching
- Loading states
- Errors
- Refetching
- Retries
- Synchronization
- Mutations
- Pagination
- Infinite queries

## Server State vs Client State

### Client State

```text
Modal
Selected tab
Theme
Form state
Sidebar
```

Common tools:

```text
useState
useReducer
Context
Redux
```

### Server State

```text
Users
Orders
Products
Transactions
Portfolio
```

Common tools:

```text
TanStack Query
SWR
RTK Query
```

## Installation

```bash
npm install @tanstack/react-query
```

## QueryClient

```js
const queryClient = new QueryClient();
```

It manages query cache and query behavior.

## QueryClientProvider

```jsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

## `useQuery()` ⭐⭐⭐⭐⭐

```js
const {
  data,
  isPending,
  error
} = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});
```

Two core concepts:

```text
queryKey
queryFn
```

## Query Function

```js
const fetchUsers = async () => {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};
```

## Query Key ⭐⭐⭐⭐⭐

Identifies a query in the cache.

```js
["users"]

["user", userId]

["users", {
  page,
  search,
  sort
}]
```

If the response depends on a variable, include it in the key.

Correct:

```js
useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId)
});
```

Otherwise different users could incorrectly share the same cache entry.

## `isPending` vs `isFetching`

`isPending`:

```text
No successful data yet
```

`isFetching`:

```text
A fetch is currently happening
```

A background refetch can have:

```text
isPending = false
isFetching = true
```

This allows existing data to stay visible during a refresh.

## `staleTime` ⭐⭐⭐⭐⭐

Controls how long data is considered fresh.

```js
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 60_000
});
```

Mental model:

```text
Fetched
 ↓
Fresh
 ↓ staleTime expires
Stale
```

Stale does not mean deleted.

## `gcTime` ⭐⭐⭐⭐⭐

Controls how long inactive cached data remains before garbage collection.

```js
gcTime: 5 * 60 * 1000
```

Remember:

```text
staleTime
→ How long data is fresh

gcTime
→ How long inactive cache remains
```

## Refetching

Common refetch triggers include:

- Mount
- Window focus
- Network reconnect
- Query invalidation
- Manual `refetch()`

```js
const { refetch } = useQuery(...);

refetch();
```

## Retry

```js
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  retry: 3
});
```

Disable:

```js
retry: false
```

Don't blindly retry errors such as invalid requests.

## `enabled`

Used for conditional/dependent queries:

```js
useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId
});
```

## Dependent Query

```text
Get User
   ↓
Get User ID
   ↓
Get User Orders
```

```js
useQuery({
  queryKey: ["orders", user?.id],
  queryFn: () => fetchOrders(user.id),
  enabled: !!user?.id
});
```

## Parallel Queries

Independent queries can run independently:

```js
const users = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});

const products = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts
});
```

## `useQueries`

Useful for dynamic parallel queries:

```js
const results = useQueries({
  queries: ids.map(id => ({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id)
  }))
});
```

## `useMutation()` ⭐⭐⭐⭐⭐

Used for operations that change server data:

```text
Create
Update
Delete
```

```js
const mutation = useMutation({
  mutationFn: createUser
});

mutation.mutate(user);
```

## Mutation Lifecycle

```text
mutate()
  ↓
pending
  ↓
success / error
```

## Query Invalidation ⭐⭐⭐⭐⭐

After changing server data:

```js
const queryClient = useQueryClient();

queryClient.invalidateQueries({
  queryKey: ["users"]
});
```

Typical flow:

```text
Create User
   ↓
Success
   ↓
Invalidate users
   ↓
Users query becomes stale
   ↓
Refetch when appropriate
```

## Cache APIs

```js
queryClient.getQueryData(key);

queryClient.setQueryData(key, data);

queryClient.invalidateQueries({
  queryKey: ["users"]
});

queryClient.prefetchQuery({
  queryKey: ["user", id],
  queryFn: () => fetchUser(id)
});
```

---

# 4. SWR

SWR stands for **Stale-While-Revalidate**.

It is a lightweight React data-fetching/server-state library.

Core flow:

```text
Cached Data
   ↓
Show immediately
   ↓
Revalidate
   ↓
Update Cache
   ↓
Update UI
```

## Installation

```bash
npm install swr
```

## Basic Usage

```js
import useSWR from "swr";

const fetcher = url =>
  fetch(url).then(res => {
    if (!res.ok) {
      throw new Error("Request failed");
    }

    return res.json();
  });

const {
  data,
  error,
  isLoading,
  isValidating
} = useSWR("/api/users", fetcher);
```

## Conditional Fetching

```js
useSWR(
  userId
    ? `/api/users/${userId}`
    : null,
  fetcher
);
```

`null` means no request.

## Automatic Revalidation

SWR can revalidate on:

- Focus
- Reconnect
- Mount
- Manual mutation/revalidation

```js
revalidateOnFocus: true
revalidateOnReconnect: true
```

## Polling

```js
useSWR("/api/status", fetcher, {
  refreshInterval: 30000
});
```

## `isValidating`

Shows that SWR is currently fetching/revalidating.

This is useful when existing cached data should remain visible.

## `SWRConfig`

```jsx
<SWRConfig
  value={{
    fetcher,
    revalidateOnFocus: true
  }}
>
  <App />
</SWRConfig>
```

## `mutate()`

```js
const {
  data,
  mutate
} = useSWR("/api/users", fetcher);

mutate();
```

It can also be used to update cache and implement optimistic updates.

## `useSWRInfinite()`

Used for infinite/paginated data:

```js
const {
  data,
  size,
  setSize
} = useSWRInfinite(
  getKey,
  fetcher
);
```

---

# 5. Caching ⭐⭐⭐⭐⭐

Caching means storing previously fetched data so it can be reused instead of requesting it every time.

## Why Cache?

Without cache:

```text
Component
 ↓
API
 ↓
Wait
 ↓
Response
```

With cache:

```text
Component
 ↓
Cache
 ↓
Data available quickly
 ↓
Optional background refresh
```

Benefits:

- Faster UI
- Reduced network requests
- Better user experience
- Lower backend load

---

## Types of Caching

### 1. Browser Cache

The browser can cache resources such as:

```text
JS
CSS
Images
HTTP responses
```

### 2. HTTP Cache

Controlled by HTTP headers such as:

```text
Cache-Control
ETag
Last-Modified
Expires
```

Example:

```http
Cache-Control: max-age=3600
```

### 3. Client-Side Application Cache

Libraries such as:

```text
TanStack Query
SWR
```

maintain application-level caches.

### 4. Server/CDN Cache

A CDN or backend can cache API responses or static assets.

---

# 6. Cache-Control

Common directives:

```text
max-age
no-cache
no-store
public
private
```

Important distinction:

### `no-cache`

Does not necessarily mean "don't store".

It generally means the cached response must be revalidated before reuse.

### `no-store`

Tells the cache not to store the response.

---

# 7. ETag

The server can return:

```http
ETag: "abc123"
```

The browser can later send:

```http
If-None-Match: "abc123"
```

If unchanged, the server can respond:

```text
304 Not Modified
```

This avoids sending the full response again.

---

# 8. Client Query Cache

TanStack Query example:

```js
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 60_000
});
```

The query result is stored in its cache.

Another component using:

```js
["users"]
```

can reuse the cached result according to the configured freshness/refetch behavior.

---

# 9. Cache Key ⭐⭐⭐⭐⭐

A cache key identifies the data.

Bad:

```js
["data"]
```

for every API.

Better:

```js
["users"]

["user", userId]

["transactions", {
  page,
  search
}]
```

The key must include all variables that affect the response.

---

# 10. Cache Invalidation ⭐⭐⭐⭐⭐

One of the hardest caching problems is knowing when cached data is no longer valid.

Example:

```text
Users cache
   ↓
Create user
   ↓
Old cache is outdated
   ↓
Invalidate users
   ↓
Fetch updated data
```

TanStack Query:

```js
queryClient.invalidateQueries({
  queryKey: ["users"]
});
```

---

# 11. Stale Data

Data can exist in cache but no longer represent the latest server state.

```text
Fresh
 ↓
Stale
 ↓
Refetch
 ↓
Fresh
```

Remember:

```text
Stale ≠ deleted
```

---

# 12. `staleTime` vs `gcTime`

Very common interview question.

```text
staleTime
→ freshness duration

gcTime
→ inactive cache lifetime
```

Example:

```js
{
  staleTime: 60_000,
  gcTime: 300_000
}
```

Data can become stale after 1 minute while still remaining in cache.

---

# 13. Optimistic Updates ⭐⭐⭐⭐⭐

Optimistic update means:

> Assume the server operation will succeed and update the UI immediately.

Example:

```text
Like button
   ↓
UI immediately changes to liked
   ↓
API request
   ↓
Success → keep
Failure → rollback
```

---

# 14. Optimistic Update Flow

```text
User Action
    ↓
Cancel conflicting request
    ↓
Save previous cache
    ↓
Update cache immediately
    ↓
Send API request
    ↓
 ┌─────────────┐
 ↓             ↓
Success      Failure
 ↓             ↓
Keep         Rollback
               ↓
            Refetch
```

---

# 15. TanStack Query Optimistic Update

Conceptual implementation:

```js
const mutation = useMutation({
  mutationFn: updateUser,

  onMutate: async updatedUser => {
    await queryClient.cancelQueries({
      queryKey: ["user", updatedUser.id]
    });

    const previousUser =
      queryClient.getQueryData([
        "user",
        updatedUser.id
      ]);

    queryClient.setQueryData(
      ["user", updatedUser.id],
      updatedUser
    );

    return { previousUser };
  },

  onError: (
    error,
    updatedUser,
    context
  ) => {
    queryClient.setQueryData(
      ["user", updatedUser.id],
      context.previousUser
    );
  },

  onSettled: (
    data,
    error,
    updatedUser
  ) => {
    queryClient.invalidateQueries({
      queryKey: ["user", updatedUser.id]
    });
  }
});
```

Key ideas:

```text
cancelQueries
getQueryData
setQueryData
rollback
invalidateQueries
```

---

# 16. When NOT to Use Optimistic Updates

Be careful when:

- Operation is financially important
- Server response is complex/unpredictable
- Operation has side effects
- Failure is common
- UI cannot reliably predict the result

For transactional/financial operations, server confirmation should generally remain authoritative.

---

# 17. Pagination ⭐⭐⭐⭐⭐

Pagination divides a large dataset into smaller pages.

Example:

```text
Page 1 → 20 items
Page 2 → 20 items
Page 3 → 20 items
```

Useful for:

- Admin tables
- Reports
- Search results
- Large datasets

---

# 18. Page-Based Pagination

API:

```text
GET /users?page=1&limit=20
GET /users?page=2&limit=20
```

TanStack Query:

```js
const [page, setPage] = useState(1);

useQuery({
  queryKey: ["users", page],
  queryFn: () => fetchUsers(page)
});
```

Important:

```text
["users", 1]
["users", 2]
["users", 3]
```

are separate query keys.

---

# 19. Offset Pagination

Example:

```text
/users?offset=20&limit=20
```

Advantages:

- Simple
- Easy to implement
- Easy page navigation

Problem:

If records are inserted/deleted while the user is paging, records can shift between pages.

---

# 20. Cursor Pagination ⭐⭐⭐⭐⭐

Instead of page numbers:

```text
/users?cursor=abc123
```

Server returns:

```json
{
  "data": [],
  "nextCursor": "xyz456"
}
```

Next request:

```text
/users?cursor=xyz456
```

Advantages:

- Better for large datasets
- More stable for changing data
- Good for feeds

---

# 21. Page vs Cursor Pagination

| Page/Offset | Cursor |
|---|---|
| Simple | More complex |
| Easy page navigation | Good for sequential data |
| Can shift with changing data | More stable |
| Easy "go to page 10" | Not ideal for arbitrary page jumps |

---

# 22. Infinite Scroll ⭐⭐⭐⭐⭐

Infinite scroll loads more records as the user approaches the bottom.

```text
Initial
 ↓
20 items
 ↓
Scroll
 ↓
20 more
 ↓
Scroll
 ↓
20 more
```

Common use cases:

- Social feeds
- News feeds
- Product feeds
- Media feeds

---

# 23. `useInfiniteQuery()`

TanStack Query:

```js
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ["users"],

  queryFn: ({ pageParam }) =>
    fetchUsers(pageParam),

  initialPageParam: 1,

  getNextPageParam: lastPage =>
    lastPage.nextPage
});
```

---

# 24. `getNextPageParam`

Tells TanStack Query how to find the next page.

Page-based:

```js
getNextPageParam:
  lastPage => lastPage.nextPage
```

Cursor-based:

```js
getNextPageParam:
  lastPage => lastPage.nextCursor
```

If there is no next page, return the appropriate value so the query knows the list has ended.

---

# 25. Infinite Scroll with IntersectionObserver

Typical architecture:

```text
List
 ↓
Sentinel element
 ↓
IntersectionObserver
 ↓
fetchNextPage()
```

Before fetching:

```js
if (
  hasNextPage &&
  !isFetchingNextPage
) {
  fetchNextPage();
}
```

This helps prevent duplicate requests.

---

# 26. Infinite Scroll vs Pagination

### Pagination

```text
Page 1 | Page 2 | Page 3
```

Best for:

- Tables
- Reports
- Search
- Admin interfaces

### Infinite Scroll

```text
Scroll → More data
```

Best for:

- Social feeds
- Product discovery
- News
- Media

---

# 27. Race Conditions in Data Fetching ⭐⭐⭐⭐⭐

Example:

```text
Search "react"
   ↓
Request A

Search "redux"
   ↓
Request B
```

Suppose:

```text
B finishes first
A finishes later
```

Old result A may overwrite newer result B.

This is a race condition.

Solutions:

- AbortController
- Request IDs
- Debouncing
- TanStack Query/SWR
- Proper query keys

---

# 28. Debouncing vs Cancellation

### Debouncing

Reduces the number of requests.

```text
User types
 ↓
Wait 300ms
 ↓
No new input?
 ↓
Request
```

### Cancellation

Stops a request that is no longer useful.

```text
Request A
 ↓
New input
 ↓
Cancel A
 ↓
Request B
```

They are different and can be used together.

---

# 29. Prefetching ⭐⭐⭐⭐⭐

Fetch data before the user actually needs it.

TanStack Query:

```js
queryClient.prefetchQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId)
});
```

Flow:

```text
Predict user action
 ↓
Prefetch
 ↓
Cache data
 ↓
User clicks
 ↓
Data already available/fresh
```

Useful for:

- Hovering a link
- Next page
- Detail pages
- Wizard steps

---

# 30. Background Refetching

A good server-state UI can:

```text
Show cached data
      ↓
Background request
      ↓
Fresh server data
      ↓
Update cache/UI
```

This avoids showing a full-screen loader every time data is refreshed.

---

# 31. Fetch + Axios + TanStack Query + SWR

Understand the responsibility of each:

```text
Fetch
 ↓
Built-in HTTP API

Axios
 ↓
HTTP client with extra conveniences

TanStack Query
 ↓
Advanced server-state management

SWR
 ↓
Lightweight stale-while-revalidate data management
```

Possible architecture:

```text
React
  ↓
TanStack Query / SWR
  ↓
Axios / Fetch
  ↓
Backend API
```

---

# 32. TanStack Query vs Redux

Do not mix their responsibilities unnecessarily.

```text
Redux
 ↓
Client/Application State
```

```text
TanStack Query
 ↓
Server State
```

They can coexist:

```text
React
 ├── Redux
 │    └── Client State
 │
 └── TanStack Query
      └── Server State
```

---

# 33. TanStack Query vs SWR

### TanStack Query

Better suited when you need:

- Complex server-state workflows
- Rich mutations
- Advanced pagination
- Infinite queries
- Detailed query control
- Extensive cache manipulation

### SWR

Good when you want:

- Simple API
- Lightweight solution
- Stale-while-revalidate
- Straightforward caching/revalidation

Neither is universally better.

---

# 34. Common Data-Fetching Architecture

A production React application can look like:

```text
Component
    ↓
TanStack Query
    ↓
API Service
    ↓
Axios Instance
    ↓
Interceptors
    ↓
Backend
```

Example:

```js
// userApi.js

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
```

Then:

```js
const query = useQuery({
  queryKey: ["users"],
  queryFn: getUsers
});
```

This keeps HTTP concerns out of the component.

---

# 35. Important Interview Questions ⭐⭐⭐⭐⭐

### Fetch

**Does Fetch reject on 404?**

No. It normally resolves with a Response. Check `response.ok`.

**How do you cancel Fetch?**

Use `AbortController`.

---

### Axios

**Why use an Axios instance?**

To centralize base URL, timeout, headers and interceptors.

**What is an interceptor?**

A mechanism to intercept/modify requests or responses.

**How do you handle 401 globally?**

Use a response interceptor.

---

### TanStack Query

**What is TanStack Query?**

A server-state management library.

**What is `queryKey`?**

A unique structured identifier for cached query data.

**What is `staleTime`?**

How long data is considered fresh.

**What is `gcTime`?**

How long inactive cached data remains before garbage collection.

**What is invalidation?**

Marking relevant cached data stale so it can be refreshed.

**What is `useMutation`?**

Used for operations that modify server data.

---

### Caching

**What is cache invalidation?**

The process of determining that cached data is no longer valid and should be refreshed or removed.

**Is stale data deleted?**

No. Stale data can remain cached.

---

### Optimistic Updates

**What is an optimistic update?**

Updating the UI/cache before server confirmation and rolling back if the request fails.

---

### Pagination

**Offset vs cursor pagination?**

Offset/page pagination is simpler but can shift when data changes. Cursor pagination is more stable for changing/large datasets.

---

### Infinite Scroll

**How do you implement infinite scroll?**

Use pagination/cursors with `useInfiniteQuery()` and commonly trigger `fetchNextPage()` through `IntersectionObserver`.

---

# 36. Senior-Level Interview Answer

> I separate HTTP communication from server-state management. For simple requests I can use Fetch or Axios, while for a production React application with significant server data I prefer a server-state library such as TanStack Query. I define stable query keys containing all parameters that affect the response, configure freshness with `staleTime`, and understand that `gcTime` controls inactive cache garbage collection. For mutations I use `useMutation` and invalidate or update only the affected queries. For user-facing interactions where the result can be predicted safely, I can use optimistic updates with rollback. For large datasets I choose page/offset or cursor pagination based on the API, and use `useInfiniteQuery` with `IntersectionObserver` for infinite scrolling. I also handle cancellation and race conditions so obsolete requests don't overwrite newer data.

---

# 37. Final Mental Model ⭐⭐⭐⭐⭐

```text
                 DATA FETCHING
                       │
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
     Fetch           Axios          Server-State
       │               │                │
       │               │         ┌──────┴──────┐
       │               │         ↓             ↓
       │               │    TanStack Query    SWR
       │               │         │             │
       └───────────────┴─────────┴─────────────┘
                       │
                     Cache
                       │
              ┌────────┼────────┐
              ↓        ↓        ↓
          Refetch   Mutation  Invalidation
                       │
                Optimistic Update
                       │
              ┌────────┴────────┐
              ↓                 ↓
         Pagination        Infinite Scroll
              │                 │
        Page/Cursor       useInfiniteQuery
                              /
                     IntersectionObserver
```

---

# Module 29 – Final Checklist

```text
FETCH
✅ GET
✅ POST
✅ PUT
✅ PATCH
✅ DELETE
✅ Headers
✅ JSON.stringify
✅ response.json
✅ response.ok
✅ HTTP vs network errors
✅ AbortController
✅ FormData
✅ Promise.all
✅ Promise.allSettled
✅ Race conditions
✅ Debouncing

AXIOS
✅ HTTP methods
✅ Axios instance
✅ baseURL
✅ params
✅ Headers
✅ Error handling
✅ Request interceptor
✅ Response interceptor
✅ Authentication
✅ 401 handling
✅ Token refresh concept
✅ Timeout
✅ Cancellation
✅ API service layer
✅ Fetch vs Axios

TANSTACK QUERY
✅ Server state
✅ Client state vs server state
✅ QueryClient
✅ QueryClientProvider
✅ useQuery
✅ queryKey
✅ queryFn
✅ isPending
✅ isFetching
✅ staleTime
✅ gcTime
✅ Refetching
✅ Retry
✅ enabled
✅ Dependent queries
✅ Parallel queries
✅ useQueries
✅ useMutation
✅ Query invalidation
✅ getQueryData
✅ setQueryData
✅ prefetchQuery
✅ Optimistic updates
✅ Rollback
✅ Pagination
✅ useInfiniteQuery

SWR
✅ Stale-While-Revalidate
✅ useSWR
✅ Fetcher
✅ Keys
✅ Conditional fetching
✅ isValidating
✅ Caching
✅ Revalidation
✅ Focus/reconnect
✅ Polling
✅ SWRConfig
✅ mutate
✅ Optimistic updates
✅ useSWRInfinite
✅ Deduplication
✅ SWR vs TanStack Query

CACHING
✅ Browser cache
✅ HTTP cache
✅ Cache-Control
✅ ETag
✅ Client-side cache
✅ Query cache
✅ Cache keys
✅ Stale data
✅ Cache invalidation
✅ staleTime
✅ gcTime

OPTIMISTIC UPDATES
✅ Optimistic UI
✅ Cache snapshot
✅ Cache update
✅ Rollback
✅ Final refetch
✅ When not to use

PAGINATION
✅ Page pagination
✅ Offset pagination
✅ Cursor pagination
✅ Query keys
✅ Page cache
✅ Pagination vs cursor

INFINITE SCROLL
✅ useInfiniteQuery
✅ useSWRInfinite
✅ fetchNextPage
✅ getNextPageParam
✅ IntersectionObserver
✅ End-of-list detection
✅ Duplicate request prevention
```

# One-line Revision

```text
Fetch / Axios
→ Make HTTP requests

TanStack Query / SWR
→ Manage server state

Caching
→ Reuse data and reduce requests

Optimistic Updates
→ Update UI before server confirmation

Pagination
→ Split large datasets into pages

Infinite Scroll
→ Load additional pages as the user scrolls
```
