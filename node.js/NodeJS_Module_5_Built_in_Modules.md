# Module 5 – Important Node.js Built-in Modules ⭐⭐⭐⭐⭐

## Topics

- `fs`
- `path`
- `os`
- `url`
- `events`
- `util`
- `crypto`
- `http`
- `stream`
- `buffer`
- `process`

---

# 1. What Are Built-in Modules?

Node.js provides many modules as part of the runtime itself. You do not need to install them using npm.

CommonJS:

```js
const fs = require("fs");
```

ES Modules:

```js
import fs from "node:fs";
```

The `node:` prefix explicitly identifies a Node.js built-in module.

---

# 2. `fs` – File System ⭐⭐⭐⭐⭐

The `fs` module is used to work with files and directories.

```js
const fs = require("fs");
```

Common operations:

- Read file
- Write file
- Append file
- Delete file
- Rename file
- Create directory
- Read directory

## Read File

```js
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});
```

## Write File

```js
fs.writeFile("data.txt", "Hello Node.js", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("File written");
});
```

`writeFile()` replaces the existing contents.

## Append File

```js
fs.appendFile("data.txt", "\nNew line", (err) => {
  if (err) {
    console.log(err);
  }
});
```

## Delete File

```js
fs.unlink("data.txt", (err) => {
  if (err) {
    console.log(err);
  }
});
```

## Create Directory

```js
fs.mkdir("uploads", (err) => {
  if (err) {
    console.log(err);
  }
});
```

## Read Directory

```js
fs.readdir(".", (err, files) => {
  console.log(files);
});
```

## Async vs Sync

Asynchronous:

```js
fs.readFile("data.txt", "utf8", callback);
```

Synchronous:

```js
const data = fs.readFileSync("data.txt", "utf8");
```

Synchronous operations block the current JavaScript execution. Avoid them in request-handling paths when they can unnecessarily block the event loop.

## `fs/promises`

```js
const fs = require("fs/promises");

async function readData() {
  const data = await fs.readFile("data.txt", "utf8");
  console.log(data);
}
```

---

# 3. `path` – Path Manipulation ⭐⭐⭐⭐⭐

```js
const path = require("path");
```

Useful methods:

```js
path.join()
path.resolve()
path.basename()
path.dirname()
path.extname()
path.parse()
```

## `path.join()`

```js
const result = path.join("users", "anil", "documents");
```

Safely joins path segments using the platform's separator.

## `path.resolve()`

```js
const result = path.resolve("users", "anil");
```

Produces an absolute path.

## `path.basename()`

```js
path.basename("/users/anil/file.txt");
```

Output:

```text
file.txt
```

## `path.dirname()`

```js
path.dirname("/users/anil/file.txt");
```

Output:

```text
/users/anil
```

## `path.extname()`

```js
path.extname("photo.png");
```

Output:

```text
.png
```

## `path.parse()`

```js
path.parse("/users/anil/photo.png");
```

Conceptually:

```js
{
  root: "/",
  dir: "/users/anil",
  base: "photo.png",
  ext: ".png",
  name: "photo"
}
```

---

# 4. `os` – Operating System Information

```js
const os = require("os");
```

Useful APIs:

```js
os.platform()
os.arch()
os.cpus()
os.totalmem()
os.freemem()
os.homedir()
os.hostname()
os.tmpdir()
os.uptime()
```

Example:

```js
console.log("Platform:", os.platform());
console.log("CPU:", os.arch());
console.log("CPUs:", os.cpus().length);
console.log("Free memory:", os.freemem());
console.log("Total memory:", os.totalmem());
```

---

# 5. `url` – URL Handling ⭐⭐⭐⭐

```js
const { URL } = require("url");
```

Example:

```js
const myUrl = new URL(
  "https://example.com/products?id=10"
);

console.log(myUrl.hostname);
console.log(myUrl.pathname);
console.log(myUrl.search);
```

Output:

```text
example.com
/products
?id=10
```

Useful properties:

```js
myUrl.protocol
myUrl.hostname
myUrl.port
myUrl.pathname
myUrl.search
myUrl.hash
myUrl.username
myUrl.password
```

## `URLSearchParams`

```js
const params = new URLSearchParams(
  "?name=Anil&age=25"
);

console.log(params.get("name"));
console.log(params.get("age"));

params.set("city", "Mumbai");
params.delete("age");
```

---

# 6. `events` – EventEmitter ⭐⭐⭐⭐⭐

The `events` module provides `EventEmitter`.

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User logged in");
});

emitter.emit("login");
```

Mental model:

```text
on()
 ↓
Listen

emit()
 ↓
Trigger
```

## Event Arguments

```js
emitter.on("login", (username) => {
  console.log(`${username} logged in`);
});

emitter.emit("login", "Anil");
```

## `once()`

```js
emitter.once("connect", () => {
  console.log("Connected");
});

emitter.emit("connect");
emitter.emit("connect");
```

Runs only once.

## Remove Listener

```js
function handler() {
  console.log("Login");
}

emitter.on("login", handler);
emitter.off("login", handler);
```

Older/common equivalent:

```js
emitter.removeListener("login", handler);
```

## EventEmitter Example

```js
class UserService extends EventEmitter {
  createUser(name) {
    this.emit("userCreated", { name });
  }
}

const userService = new UserService();

userService.on("userCreated", (user) => {
  console.log("Send welcome email to:", user.name);
});

userService.createUser("Anil");
```

## Special `error` Event ⭐⭐⭐⭐⭐

If an EventEmitter emits `"error"` without an appropriate error listener, Node.js can treat it as an uncaught exception and terminate the process.

```js
emitter.on("error", (err) => {
  console.log("Error:", err);
});
```

---

# 7. `util` Module ⭐⭐⭐⭐

```js
const util = require("util");
```

Important APIs:

```text
util.promisify()
util.callbackify()
util.inspect()
util.types
```

## `util.promisify()`

Converts a Node-style callback API into a Promise-returning function.

```js
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

async function readData() {
  const data = await readFile("data.txt", "utf8");
  console.log(data);
}
```

## `util.callbackify()`

Converts a Promise-returning function into a callback-style function.

```js
async function getData() {
  return "Hello";
}

const callbackVersion = util.callbackify(getData);

callbackVersion((err, value) => {
  console.log(value);
});
```

## `util.inspect()`

Useful for inspecting complex objects:

```js
console.log(
  util.inspect(object, {
    depth: null
  })
);
```

---

# 8. `crypto` – Cryptography ⭐⭐⭐⭐⭐

```js
const crypto = require("crypto");
```

Common uses:

- Hashing
- Secure random values
- Encryption/decryption
- HMAC
- Digital signatures
- Key generation
- Password-related cryptographic primitives

## Hashing

```js
const hash = crypto
  .createHash("sha256")
  .update("hello")
  .digest("hex");

console.log(hash);
```

Mental model:

```text
Input
 ↓
Hash function
 ↓
Fixed-length hash
```

Hashing is generally intended to be one-way.

## Hashing vs Encryption

Hashing:

```text
Data
 ↓
Hash
```

Encryption:

```text
Plaintext
 ↓
Encryption
 ↓
Ciphertext
 ↓
Decryption
 ↓
Plaintext
```

## Secure Random Values

```js
const value = crypto.randomBytes(16);

console.log(value.toString("hex"));
```

## `randomUUID()`

```js
const id = crypto.randomUUID();

console.log(id);
```

## Password Hashing

Never store passwords as plain text.

Common password-hashing algorithms include:

```text
Argon2
bcrypt
scrypt
PBKDF2
```

Node.js provides primitives such as `scrypt()`:

```js
crypto.scrypt(
  "password",
  "salt",
  64,
  (err, derivedKey) => {
    if (err) throw err;

    console.log(derivedKey.toString("hex"));
  }
);
```

Use a well-reviewed password-hashing strategy and appropriate parameters in production.

---

# 9. `http` – HTTP Server ⭐⭐⭐⭐⭐

```js
const http = require("http");
```

Example:

```js
const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server running");
});
```

## Request and Response

`req` contains incoming request information:

```js
req.method
req.url
req.headers
```

`res` is used to send the response:

```js
res.statusCode = 200;
res.setHeader("Content-Type", "text/plain");
res.end("Hello");
```

## Basic Routing

```js
const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.end("Users");
    return;
  }

  if (req.url === "/products" && req.method === "GET") {
    res.end("Products");
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});
```

## HTTP Flow

```text
Client
   ↓
HTTP Request
   ↓
Node.js HTTP Server
   ↓
IncomingMessage (req)
   ↓
Application Logic
   ↓
ServerResponse (res)
   ↓
HTTP Response
   ↓
Client
```

---

# 10. `stream` ⭐⭐⭐⭐⭐

Streams allow data to be processed incrementally instead of loading everything into memory.

Without streams:

```text
Entire File
 ↓
Memory
 ↓
Process
```

With streams:

```text
Chunk
 ↓
Process
 ↓
Chunk
 ↓
Process
```

## Four Main Stream Types

```text
Readable
Writable
Duplex
Transform
```

## Readable Stream

```js
const fs = require("fs");

const stream = fs.createReadStream("large.txt");

stream.on("data", (chunk) => {
  console.log(chunk);
});
```

## Writable Stream

```js
const stream = fs.createWriteStream("output.txt");

stream.write("Hello
");
stream.write("Node.js
");

stream.end();
```

## Duplex Stream

Both readable and writable.

Example:

```text
TCP socket
```

## Transform Stream

Reads data, transforms it, and produces output.

Examples:

```text
Compression
Encryption
Data transformation
```

## `pipe()` ⭐⭐⭐⭐⭐

```js
readable.pipe(writable);
```

Example:

```js
const readStream =
  fs.createReadStream("input.txt");

const writeStream =
  fs.createWriteStream("output.txt");

readStream.pipe(writeStream);
```

Flow:

```text
input.txt
   ↓
Readable Stream
   ↓
pipe()
   ↓
Writable Stream
   ↓
output.txt
```

## Backpressure ⭐⭐⭐⭐⭐

Backpressure occurs when the destination cannot consume data as quickly as the source produces it.

```text
Fast Producer
     ↓
  Readable
     ↓
  Writable
     ↓
Slow Consumer
```

Streams and `pipe()` help control this flow and prevent uncontrolled memory growth.

---

# 11. `buffer` – Buffer ⭐⭐⭐⭐⭐

`Buffer` is used to work with raw binary data.

Common examples:

```text
Images
Videos
Files
TCP data
Binary network data
```

## Create Buffer

```js
const buffer = Buffer.from("Hello");

console.log(buffer);
```

Mental model:

```text
Hello
 ↓
Bytes
 ↓
Buffer
```

## Buffer to String

```js
const buffer = Buffer.from("Hello");

console.log(buffer.toString());
```

## Buffer from Hex

```js
const buffer = Buffer.from(
  "48656c6c6f",
  "hex"
);

console.log(buffer.toString());
```

Output:

```text
Hello
```

## Buffer and Binary Data

```js
const buffer = Buffer.from([65, 66, 67]);

console.log(buffer.toString());
```

Output:

```text
ABC
```

Because:

```text
65 → A
66 → B
67 → C
```

## Buffer vs String

| String | Buffer |
|---|---|
| Text-oriented | Binary data |
| Characters | Bytes |
| Used for text | Files/network/binary data |
| Encoding matters | Stores raw byte data |

---

# 12. `process` ⭐⭐⭐⭐⭐

`process` is a global object that provides information and control over the current Node.js process.

You can directly use:

```js
process
```

## `process.argv`

Contains command-line arguments.

Run:

```bash
node app.js hello 123
```

Then:

```js
console.log(process.argv);
```

Conceptually:

```text
[
  node path,
  app.js path,
  "hello",
  "123"
]
```

## `process.env`

Used to access environment variables.

```js
console.log(process.env.NODE_ENV);
```

Example:

```bash
PORT=3000 node app.js
```

Then:

```js
const port = process.env.PORT;
```

Never hard-code secrets such as database passwords, API secrets, JWT secrets, or private keys.

## `process.cwd()`

Returns the current working directory:

```js
console.log(process.cwd());
```

Important:

```text
process.cwd()
→ Current working directory

__dirname
→ Directory of the current CommonJS file
```

They are not necessarily the same.

## `process.exit()`

Can terminate the Node.js process:

```js
process.exit(1);
```

Common convention:

```text
0     → success
non-0 → failure/error
```

Avoid using it casually in servers because it can prevent graceful cleanup.

## `process.exitCode`

```js
process.exitCode = 1;
```

This indicates the desired exit status while allowing Node.js to finish pending work.

## `process.nextTick()`

```js
process.nextTick(() => {
  console.log("Executed soon");
});
```

It uses Node's special next-tick mechanism.

## `process.on()`

Process-level events can be handled:

```js
process.on("exit", (code) => {
  console.log("Process exiting:", code);
});
```

Signals:

```js
process.on("SIGTERM", () => {
  console.log("Shutdown requested");
});
```

---

# 13. Graceful Shutdown ⭐⭐⭐⭐⭐

A server should close resources before exiting.

```js
process.on("SIGTERM", async () => {
  console.log("Shutting down...");

  await database.close();

  server.close(() => {
    process.exit(0);
  });
});
```

Flow:

```text
SIGTERM
  ↓
Stop accepting new work
  ↓
Finish/close resources
  ↓
Close server
  ↓
Exit
```

---

# 14. Important Module Comparison ⭐⭐⭐⭐⭐

| Module | Main Purpose |
|---|---|
| `fs` | Files/directories |
| `path` | File-system paths |
| `os` | OS information |
| `url` | URL parsing/manipulation |
| `events` | EventEmitter |
| `util` | Utility functions |
| `crypto` | Cryptography |
| `http` | HTTP servers/requests |
| `stream` | Incremental data processing |
| `buffer` | Raw binary data |
| `process` | Current Node.js process |

---

# 15. Practical Example – File Server

Several built-in modules can work together:

```js
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    "index.html"
  );

  const stream = fs.createReadStream(filePath);

  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  stream.pipe(res);
});

server.listen(3000);
```

Here:

```text
http
 ↓
Create server

path
 ↓
Build file path

fs
 ↓
Read file

stream
 ↓
Send file incrementally

res
 ↓
HTTP response
```

---

# 16. Practical Example – Environment + HTTP

```js
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("Hello Node.js");
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

---

# 17. Practical Example – EventEmitter

```js
const EventEmitter = require("events");

class OrderService extends EventEmitter {
  createOrder(order) {
    console.log("Creating order...");

    this.emit("orderCreated", order);
  }
}

const orderService = new OrderService();

orderService.on("orderCreated", (order) => {
  console.log("Send confirmation:", order.id);
});

orderService.createOrder({
  id: 101
});
```

---

# 18. Interview Questions ⭐⭐⭐⭐⭐

### Q1. What is the `fs` module?

> `fs` is Node.js's file-system module used to read, write, update, delete files and work with directories.

### Q2. Difference between `readFile()` and `readFileSync()`?

> `readFile()` is asynchronous, while `readFileSync()` blocks the current JavaScript execution until the operation completes.

### Q3. Why use `path`?

> `path` provides platform-aware utilities for constructing, resolving, parsing, and manipulating file-system paths.

### Q4. What is EventEmitter?

> EventEmitter is a Node.js class used for event-driven communication through methods such as `on()`, `once()`, `emit()`, and `off()`.

### Q5. What is `util.promisify()`?

> It converts a Node-style callback-based function into a Promise-returning function.

### Q6. What is the `crypto` module used for?

> It provides cryptographic functionality such as hashing, secure random values, HMAC, encryption/decryption APIs, signatures, and key-related operations.

### Q7. What is a stream?

> A stream allows data to be processed incrementally instead of loading the entire data set into memory.

### Q8. What are the four types of streams?

```text
Readable
Writable
Duplex
Transform
```

### Q9. What is backpressure?

> Backpressure occurs when a producer produces data faster than the consumer can process it. Streams help control this flow.

### Q10. What is Buffer?

> Buffer is a Node.js representation of raw bytes used for binary data such as files, network packets, images, and streams.

### Q11. What is `process.env`?

> `process.env` provides access to environment variables available to the Node.js process.

### Q12. What is `process.argv`?

> `process.argv` contains command-line arguments passed to the Node.js process.

### Q13. Difference between `process.cwd()` and `__dirname`?

> `process.cwd()` returns the current working directory, while `__dirname` in CommonJS refers to the directory containing the current module.

### Q14. Why avoid synchronous `fs` APIs in server request handlers?

> Synchronous filesystem operations block the JavaScript thread while the operation completes, preventing the event loop from processing other JavaScript work during that time.

---

# 19. ⭐ Most Important Interview Areas

Prioritize:

```text
⭐⭐⭐⭐⭐ fs
⭐⭐⭐⭐⭐ path
⭐⭐⭐⭐⭐ EventEmitter
⭐⭐⭐⭐⭐ crypto
⭐⭐⭐⭐⭐ http
⭐⭐⭐⭐⭐ streams
⭐⭐⭐⭐⭐ Buffer
⭐⭐⭐⭐⭐ process

⭐⭐⭐⭐ url
⭐⭐⭐⭐ util
⭐⭐⭐ os
```

Especially understand:

```text
fs
 ↓
Async vs Sync

events
 ↓
EventEmitter

crypto
 ↓
Hashing vs Encryption

http
 ↓
Request / Response

stream
 ↓
Readable / Writable / Duplex / Transform
 ↓
pipe()
 ↓
Backpressure

buffer
 ↓
Bytes / Binary data

process
 ↓
env / argv / cwd / signals
```

---

# 20. Final Mental Model

```text
                  Node.js Built-in Modules
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
       File              Network            Runtime
        │                  │                  │
     fs / path         http / url        process / os
        │                  │
        ↓                  ↓
     Streams            Events
        │                  │
        ↓                  ↓
      Buffer            EventEmitter
        │
        ↓
     Binary Data

                crypto / util
                     │
                     ↓
              Security / Helpers
```

### One-line revision

> **Node.js built-in modules provide core runtime capabilities without external npm packages: `fs` handles files, `path` handles paths, `os` provides OS information, `url` handles URLs, `events` provides EventEmitter, `util` provides helpers, `crypto` provides cryptography, `http` handles HTTP, `stream` handles incremental data, `buffer` handles raw bytes, and `process` provides information and control over the Node.js process.**

---

# Module 5 Checklist

```text
✅ fs
  ✅ readFile
  ✅ writeFile
  ✅ appendFile
  ✅ unlink
  ✅ mkdir
  ✅ readdir
  ✅ Sync vs Async
  ✅ fs/promises

✅ path
  ✅ join
  ✅ resolve
  ✅ basename
  ✅ dirname
  ✅ extname
  ✅ parse

✅ os
  ✅ platform
  ✅ arch
  ✅ cpus
  ✅ memory
  ✅ hostname

✅ url
  ✅ URL
  ✅ URLSearchParams
  ✅ Query parameters

✅ events
  ✅ EventEmitter
  ✅ on
  ✅ emit
  ✅ once
  ✅ off
  ✅ error events

✅ util
  ✅ promisify
  ✅ callbackify
  ✅ inspect

✅ crypto
  ✅ Hashing
  ✅ Encryption vs Hashing
  ✅ Random values
  ✅ randomUUID
  ✅ Password hashing concepts

✅ http
  ✅ createServer
  ✅ req
  ✅ res
  ✅ HTTP routing
  ✅ Request/Response flow

✅ stream
  ✅ Readable
  ✅ Writable
  ✅ Duplex
  ✅ Transform
  ✅ pipe
  ✅ Backpressure

✅ buffer
  ✅ Buffer.from
  ✅ Binary data
  ✅ Bytes
  ✅ Encoding

✅ process
  ✅ argv
  ✅ env
  ✅ cwd
  ✅ exit
  ✅ exitCode
  ✅ signals
  ✅ graceful shutdown
```

# Quick Revision

```text
fs       → Files
path     → Paths
os       → Operating System
url      → URLs
events   → Events
util     → Utilities
crypto   → Security/Cryptography
http     → HTTP
stream   → Data streams
buffer   → Binary bytes
process  → Node.js process
```
