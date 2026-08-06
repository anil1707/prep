# Module 20 – Fetch API ⭐⭐⭐⭐⭐

## Topics Covered

* fetch()
* Response
* Request
* Headers
* AbortController
* FormData
* Streaming

---

# 1. fetch() ⭐⭐⭐⭐⭐

## Definition

`fetch()` is a browser API used to make HTTP requests.

It returns a **Promise** that resolves to a **Response** object.

## Syntax

```javascript
fetch(url, options)
```

Example

```javascript
fetch("https://api.example.com/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
```

---

## Common HTTP Methods

```text
GET
POST
PUT
PATCH
DELETE
```

Example

```javascript
fetch("/users", {
    method: "POST",
    body: JSON.stringify(user)
});
```

---

# 2. Response ⭐⭐⭐⭐

`fetch()` returns a **Response** object.

```javascript
const response = await fetch(url);
```

## Important Properties

```javascript
response.ok
```

Returns

```text
true / false
```

---

```javascript
response.status
```

Example

```text
200
404
500
```

---

```javascript
response.statusText
```

Example

```text
OK
Not Found
```

---

```javascript
response.headers
```

Returns response headers.

---

## Body Methods

```javascript
response.json()

response.text()

response.blob()

response.arrayBuffer()

response.formData()
```

Example

```javascript
const response = await fetch(url);

if (!response.ok) {
    throw new Error("Request Failed");
}

const data = await response.json();
```

---

# 3. Request ⭐⭐⭐

Represents an HTTP request.

Example

```javascript
const request = new Request("/users", {
    method: "GET"
});

fetch(request);
```

Useful for reusing or cloning requests.

---

# 4. Headers ⭐⭐⭐⭐

Headers contain metadata about requests and responses.

Example

```javascript
fetch("/users", {

    headers: {

        "Content-Type": "application/json",

        Authorization: "Bearer token"

    }

});
```

---

## Using Headers Object

```javascript
const headers = new Headers();

headers.append(
    "Content-Type",
    "application/json"
);
```

---

## Common Headers

| Header        | Purpose                |
| ------------- | ---------------------- |
| Authorization | Authentication Token   |
| Content-Type  | Request Body Type      |
| Accept        | Expected Response Type |
| Cache-Control | Cache Settings         |

---

# 5. AbortController ⭐⭐⭐⭐⭐

## Definition

Used to cancel ongoing fetch requests.

---

## Create Controller

```javascript
const controller = new AbortController();
```

---

## Pass Signal

```javascript
fetch(url, {

    signal: controller.signal

});
```

---

## Cancel Request

```javascript
controller.abort();
```

---

## React Example

```javascript
useEffect(() => {

    const controller = new AbortController();

    fetch(url, {

        signal: controller.signal

    });

    return () => {

        controller.abort();

    };

}, []);
```

### Use Cases

* Search Suggestions
* Cancel Previous API Calls
* Prevent Race Conditions
* Cleanup in useEffect

---

# 6. FormData ⭐⭐⭐⭐⭐

## Definition

Used to send files and multipart form data.

---

## Create FormData

```javascript
const formData = new FormData();

formData.append("name", "Anil");

formData.append("image", file);
```

---

## Send

```javascript
fetch("/upload", {

    method: "POST",

    body: formData

});
```

---

## Important

❌ Don't manually set

```javascript
"Content-Type": "multipart/form-data"
```

The browser automatically sets the correct header (including the required boundary).

---

### Use Cases

* Image Upload
* File Upload
* Video Upload
* Profile Picture Upload

---

# 7. Streaming ⭐⭐⭐⭐

## Definition

Processes response data while it is still downloading.

Instead of

```text
Download Complete

↓

Process
```

Use

```text
Receive Chunk

↓

Process

↓

Receive Next Chunk

↓

Process
```

---

## Example

```javascript
const response = await fetch(url);

const reader = response.body.getReader();

const { value, done } = await reader.read();
```

---

### Use Cases

* AI Chat Streaming
* Video Streaming
* Large File Download
* Live Logs

---

# Response Body Methods

| Method                 | Returns           |
| ---------------------- | ----------------- |
| response.json()        | JavaScript Object |
| response.text()        | String            |
| response.blob()        | Blob/File         |
| response.arrayBuffer() | Binary Data       |
| response.formData()    | FormData Object   |

---

# Fetch vs Axios

| Fetch                          | Axios                  |
| ------------------------------ | ---------------------- |
| Browser API                    | External Library       |
| Manual `response.json()`       | Automatic JSON Parsing |
| Doesn't reject on HTTP 404/500 | Rejects on HTTP Errors |
| No extra dependency            | Requires installation  |

---

# Common Interview Questions

### What does fetch() return?

A Promise that resolves to a **Response** object.

---

### Does fetch reject on HTTP 404 or 500?

No.

It rejects only on network failures.

Always check:

```javascript
if (!response.ok) {
    throw new Error("Request Failed");
}
```

---

### Why use AbortController?

To cancel unnecessary requests and avoid race conditions or memory leaks.

---

### Why use FormData?

To upload files using `multipart/form-data`.

---

### Why not manually set `Content-Type` for FormData?

Because the browser automatically sets the correct `multipart/form-data` header with the required boundary.

---

### Difference between Request and Response?

| Request        | Response           |
| -------------- | ------------------ |
| Sent to server | Returned by server |

---

### What is Streaming?

Processing response data chunk by chunk while it is downloading.

---

# Quick Revision

```text
fetch()

↓

Promise

↓

Response

↓

json()

----------------------

Headers

↓

Metadata

----------------------

AbortController

↓

Cancel Request

----------------------

FormData

↓

File Upload

----------------------

Streaming

↓

Read Chunks

----------------------

Request

↓

HTTP Request Object
```

---

# Memory Tricks

## Fetch Flow

```text
Client

↓

fetch()

↓

Server

↓

Response

↓

response.json()

↓

JavaScript Object
```

---

## Browser APIs Learned

```text
MutationObserver

↓

DOM Changed?

----------------------

IntersectionObserver

↓

Visible?

----------------------

ResizeObserver

↓

Size Changed?

----------------------

Fetch API

↓

HTTP Requests
```

---

# Interview Summary

* `fetch()` → Browser API for HTTP requests.
* Returns a Promise that resolves to a `Response`.
* `Response` contains status, headers, and body methods.
* `Request` represents an HTTP request.
* `Headers` store request/response metadata.
* `AbortController` cancels ongoing requests.
* `FormData` uploads files using multipart form data.
* `Streaming` processes large responses chunk by chunk.
* Always check `response.ok` because `fetch()` does not reject on HTTP status errors.
