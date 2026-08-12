# Module 4 – Node.js Modules ⭐⭐⭐⭐⭐

## Topics

- CommonJS
- ES Modules
- `require`
- `module.exports`
- `exports`
- `import/export`
- Module caching
- Built-in modules
- Custom modules

---

# 1. What is a Module?

A **module** is a reusable and independent piece of code kept in a separate file.

Instead of putting the entire application into one file:

```text
app.js
```

we can organize it:

```text
project/
│
├── app.js
├── user.js
├── auth.js
├── database.js
└── utils.js
```

Each module can contain related functionality.

### Why use modules?

- Code organization
- Reusability
- Encapsulation
- Maintainability
- Avoiding unnecessary global variables

---

# 2. Node.js Module Systems ⭐⭐⭐⭐⭐

Node.js mainly supports two module systems:

```text
CommonJS
ES Modules (ESM)
```

### CommonJS

```js
const fs = require("fs");
```

Export:

```js
module.exports = something;
```

### ES Modules

```js
import fs from "node:fs";
```

Export:

```js
export default something;
```

or:

```js
export { something };
```

---

# 3. CommonJS ⭐⭐⭐⭐⭐

CommonJS is the traditional Node.js module system.

It uses:

```js
require()
```

for importing and:

```js
module.exports
```

or:

```js
exports
```

for exporting.

### Example

#### `math.js`

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

#### `app.js`

```js
const add = require("./math");

console.log(add(10, 20));
```

Output:

```text
30
```

---

# 4. CommonJS – Multiple Exports

#### `math.js`

```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};
```

#### `app.js`

```js
const { add, subtract } = require("./math");

console.log(add(10, 20));
console.log(subtract(20, 10));
```

Output:

```text
30
10
```

---

# 5. `require()` ⭐⭐⭐⭐⭐

`require()` is the CommonJS mechanism used to load modules.

### Built-in module

```js
const fs = require("fs");
```

### Installed package

```js
const express = require("express");
```

### Local module

```js
const math = require("./math");
```

### Parent directory

```js
const utils = require("../utils");
```

---

# 6. `./` Is Important

Compare:

```js
require("math");
```

and:

```js
require("./math");
```

`./` means:

> Load the module from the current directory.

Without `./`, Node generally treats the name as a package/module identifier and performs package/module resolution.

---

# 7. `module.exports` ⭐⭐⭐⭐⭐

`module.exports` defines what a CommonJS module exposes to other files.

### Export a function

```js
function greet(name) {
  return `Hello ${name}`;
}

module.exports = greet;
```

Then:

```js
const greet = require("./greet");

console.log(greet("Anil"));
```

---

# 8. Export an Object

```js
module.exports = {
  name: "Anil",
  age: 25
};
```

Then:

```js
const user = require("./user");

console.log(user.name);
console.log(user.age);
```

---

# 9. Export Multiple Functions

```js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  multiply
};
```

Import:

```js
const { add, multiply } = require("./math");
```

---

# 10. `exports` ⭐⭐⭐⭐⭐

Initially, Node.js makes:

```text
exports
   ↓
module.exports
```

So:

```js
exports.add = add;
```

adds a property to the object that `module.exports` points to.

Example:

```js
exports.add = (a, b) => {
  return a + b;
};

exports.subtract = (a, b) => {
  return a - b;
};
```

Then:

```js
const math = require("./math");

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
```

---

# 11. `exports` vs `module.exports` ⭐⭐⭐⭐⭐

This is one of the most common Node.js interview questions.

Initially:

```js
exports === module.exports
```

is:

```text
true
```

Therefore:

```js
exports.add = add;
```

works.

But:

```js
exports = add;
```

does **not** replace `module.exports`.

Why?

Initially:

```text
exports ──────────┐
                  ↓
           module.exports
```

After:

```js
exports = add;
```

the local `exports` variable points somewhere else:

```text
exports ──→ add

module.exports ──→ original object
```

`require()` returns:

```js
module.exports
```

not the reassigned `exports`.

---

# 12. Golden Rule ⭐⭐⭐⭐⭐

This is correct:

```js
exports.add = add;
```

This does not replace the exported value:

```js
exports = add;
```

If you want to replace the entire exported value:

```js
module.exports = add;
```

Remember:

```text
exports.foo = ...
→ Add/change a property

module.exports = ...
→ Replace the exported value
```

---

# 13. CommonJS Wrapper ⭐⭐⭐⭐⭐

CommonJS modules are conceptually wrapped by Node.js in a function similar to:

```js
(function (exports, require, module, __filename, __dirname) {
  // module code
});
```

This explains why CommonJS modules can directly access:

```text
exports
require
module
__filename
__dirname
```

These are provided by the CommonJS module environment.

---

# 14. `__filename`

In CommonJS:

```js
console.log(__filename);
```

It gives the absolute path of the current file.

Conceptually:

```text
/project/src/app.js
```

---

# 15. `__dirname`

In CommonJS:

```js
console.log(__dirname);
```

It gives the absolute directory path of the current file.

Conceptually:

```text
/project/src
```

These CommonJS-specific variables are not available in the same form inside standard ES Modules.

---

# 16. ES Modules ⭐⭐⭐⭐⭐

ES Modules (ESM) are the standard JavaScript module system.

They use:

```js
import
export
```

Example:

### `math.js`

```js
export function add(a, b) {
  return a + b;
}
```

### `app.js`

```js
import { add } from "./math.js";

console.log(add(10, 20));
```

---

# 17. Named Export

You can export a function directly:

```js
export function add(a, b) {
  return a + b;
}
```

Or:

```js
function add(a, b) {
  return a + b;
}

export { add };
```

Import:

```js
import { add } from "./math.js";
```

---

# 18. Multiple Named Exports

```js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

Import:

```js
import { add, subtract } from "./math.js";
```

---

# 19. Default Export ⭐⭐⭐⭐⭐

A module can have one default export:

```js
export default function add(a, b) {
  return a + b;
}
```

Import:

```js
import add from "./math.js";
```

Notice the difference:

```text
Named:
import { add }

Default:
import add
```

---

# 20. Default Export – Import Name

For a default export:

```js
export default function add(a, b) {
  return a + b;
}
```

the importer can choose another local name:

```js
import sum from "./math.js";
```

Both are valid:

```js
import add from "./math.js";
```

```js
import sum from "./math.js";
```

because it is a default export.

---

# 21. Named vs Default Export

| Named Export | Default Export |
|---|---|
| `export { add }` | `export default add` |
| Import with `{}` | No `{}` |
| Multiple named exports allowed | One default export per module |
| Import name normally corresponds to exported binding | Importer can choose local name |

Example:

```js
export const a = 10;
export const b = 20;

export default function test() {}
```

Import:

```js
import test, { a, b } from "./module.js";
```

---

# 22. Import Everything

You can import all named exports as a namespace:

```js
import * as math from "./math.js";

console.log(math.add(10, 20));
console.log(math.subtract(20, 10));
```

Conceptually:

```text
math
 ├── add
 └── subtract
```

---

# 23. Rename Named Imports

```js
import { add as sum } from "./math.js";

console.log(sum(10, 20));
```

---

# 24. Rename Named Exports

```js
const add = (a, b) => a + b;

export {
  add as sum
};
```

Import:

```js
import { sum } from "./math.js";
```

---

# 25. Enabling ES Modules in Node.js ⭐⭐⭐⭐⭐

Node.js needs to know when `.js` files should be treated as ESM.

One common approach:

### `package.json`

```json
{
  "type": "module"
}
```

Then:

```js
import fs from "node:fs";
```

can be used in `.js` files.

Another option:

```text
app.mjs
```

`.mjs` explicitly indicates an ES Module.

For CommonJS:

```text
app.cjs
```

explicitly indicates CommonJS.

---

# 26. CommonJS vs ES Modules ⭐⭐⭐⭐⭐

| CommonJS | ES Modules |
|---|---|
| `require()` | `import` |
| `module.exports` | `export` |
| `exports.foo` | `export { foo }` |
| Traditional Node.js module system | Standard JavaScript module system |
| `.cjs` explicitly indicates CJS | `.mjs` explicitly indicates ESM |
| Dynamic loading with `require()` | Dynamic loading with `import()` |

---

# 27. CommonJS Example

### `math.js`

```js
function add(a, b) {
  return a + b;
}

module.exports = {
  add
};
```

### `app.js`

```js
const { add } = require("./math");

console.log(add(2, 3));
```

---

# 28. ESM Equivalent

### `math.js`

```js
export function add(a, b) {
  return a + b;
}
```

### `app.js`

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

---

# 29. Static Nature of `import`

ESM `import` is part of the module syntax:

```js
import { add } from "./math.js";
```

It has static module semantics, which allows tooling and the runtime to understand module dependencies before normal module execution.

CommonJS:

```js
const math = require("./math");
```

uses the `require()` function available in the CommonJS environment.

---

# 30. Dynamic Import ⭐⭐⭐⭐⭐

ESM supports dynamic import:

```js
const math = await import("./math.js");

console.log(math.add(10, 20));
```

`import()` returns a Promise.

It is useful for:

- Lazy loading
- Conditional loading
- Dynamic module loading

It can also be used from CommonJS for interoperability:

```js
async function loadModule() {
  const module = await import("./math.mjs");
  console.log(module);
}
```

---

# 31. Can We Use `require()` in ESM?

Normally, `require` is not directly available in an ES Module.

If interoperability is needed, Node.js provides `createRequire()`:

```js
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const someModule = require("./some-module.cjs");
```

Prefer consistent module syntax when possible.

---

# 32. Module Caching ⭐⭐⭐⭐⭐

Node.js caches loaded CommonJS modules.

Example:

### `counter.js`

```js
console.log("Module loaded");

module.exports = {
  value: 10
};
```

### `app.js`

```js
const a = require("./counter");
const b = require("./counter");
```

Output:

```text
Module loaded
```

The module code is normally executed only once.

---

# 33. Why Module Caching?

Caching provides:

### Performance

The same module does not need to be repeatedly loaded and executed.

### Shared State

Multiple references can point to the same cached module instance.

Example:

```js
const a = require("./counter");
const b = require("./counter");

console.log(a === b);
```

Typically:

```text
true
```

---

# 34. Module Cache Flow

Conceptually:

```text
First require("./math")
        ↓
Load module
        ↓
Execute module
        ↓
Store exports in cache
        ↓
Return exports

Second require("./math")
        ↓
Find cached module
        ↓
Return cached exports
```

---

# 35. Module State and Caching ⭐⭐⭐⭐⭐

### `counter.js`

```js
let count = 0;

module.exports = {
  increment() {
    count++;
    return count;
  }
};
```

### `app.js`

```js
const counter1 = require("./counter");
const counter2 = require("./counter");

console.log(counter1.increment());
console.log(counter2.increment());
```

Output:

```text
1
2
```

Both references use the same cached module instance.

---

# 36. CommonJS Cache

Node exposes the CommonJS cache through:

```js
require.cache
```

You can inspect it:

```js
console.log(require.cache);
```

A specific module can be removed:

```js
delete require.cache[require.resolve("./counter")];
```

A future `require()` can then load that module again.

This is mainly useful for testing/development scenarios.

---

# 37. Built-in Modules ⭐⭐⭐⭐⭐

Node.js provides many built-in modules.

Examples:

```text
fs
path
http
https
os
events
stream
crypto
url
util
buffer
child_process
zlib
```

---

# 38. `fs` Module

Used for file-system operations.

```js
const fs = require("fs");
```

Example:

```js
fs.readFile("data.txt", "utf8", (err, data) => {
  console.log(data);
});
```

---

# 39. `path` Module

Used for working with file and directory paths.

```js
const path = require("path");

console.log(
  path.join(__dirname, "files", "data.txt")
);
```

---

# 40. `os` Module

Provides operating-system information.

```js
const os = require("os");

console.log(os.platform());
console.log(os.cpus());
console.log(os.totalmem());
```

---

# 41. `http` Module

Used to create HTTP servers.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(3000);
```

---

# 42. `crypto` Module

Provides cryptographic functionality.

```js
const crypto = require("crypto");
```

It supports functionality such as:

- Hashing
- Encryption/decryption APIs
- Random values
- Cryptographic operations

---

# 43. Built-in Modules with ESM

CommonJS:

```js
const fs = require("fs");
```

ESM:

```js
import fs from "node:fs";
```

Modern Node.js supports the explicit `node:` prefix:

```js
import path from "node:path";
import crypto from "node:crypto";
```

The `node:` prefix clearly identifies a built-in Node.js module.

---

# 44. Custom Modules ⭐⭐⭐⭐⭐

A custom module is a module created by the developer.

Example:

```text
project/
│
├── app.js
└── math.js
```

### `math.js`

```js
function add(a, b) {
  return a + b;
}

module.exports = {
  add
};
```

### `app.js`

```js
const { add } = require("./math");

console.log(add(10, 20));
```

---

# 45. Custom Module with ESM

### `math.js`

```js
export function add(a, b) {
  return a + b;
}
```

### `app.js`

```js
import { add } from "./math.js";

console.log(add(10, 20));
```

With ESM, pay attention to extensions in relative imports:

```js
import { add } from "./math.js";
```

---

# 46. Module Resolution ⭐⭐⭐⭐⭐

When you write:

```js
require("./math");
```

Node resolves the module according to CommonJS resolution rules.

For a package:

```js
require("express");
```

Node searches for the package through the appropriate `node_modules` locations.

For local modules:

```js
require("./math");
```

`./` tells Node it is a relative path.

---

# 47. CommonJS `require()` vs ESM `import`

### CommonJS

```js
const math = require("./math");
```

`require()` is a runtime function in the CommonJS environment.

### ESM

```js
import { add } from "./math.js";
```

`import` is part of the JavaScript module syntax and has static module semantics.

---

# 48. CommonJS `module.exports` vs ESM `export`

### CommonJS

```js
module.exports = {
  add
};
```

Import:

```js
const { add } = require("./math");
```

### ESM

```js
export { add };
```

Import:

```js
import { add } from "./math.js";
```

They solve the same general problem but belong to different module systems.

---

# 49. Common Interview Trap ⭐⭐⭐⭐⭐

Consider:

```js
module.exports = {
  name: "Anil"
};

exports.age = 25;
```

What gets exported?

```js
{
  name: "Anil"
}
```

Why?

Initially:

```text
exports ──────────┐
                  ↓
           module.exports
```

After:

```js
module.exports = {
  name: "Anil"
};
```

`module.exports` points to a new object, but `exports` still points to the original object.

Then:

```js
exports.age = 25;
```

modifies the original object, not the new exported object.

---

# 50. Circular Dependencies ⭐⭐⭐⭐

Modules can depend on each other:

```text
A
↓
B
↓
A
```

This is called a circular dependency.

Node.js can handle circular dependencies, but modules may receive partially initialized exports.

Therefore:

> Avoid circular dependencies when possible because they can cause confusing initialization behavior.

---

# 51. Common Interview Questions

## Q1. What is a Node.js module?

> A module is an independent, reusable unit of code. Node.js supports CommonJS and ES Modules for organizing and sharing code between files.

## Q2. What is CommonJS?

> CommonJS is the traditional Node.js module system that uses `require()` for importing and `module.exports` or `exports` for exporting.

## Q3. What are ES Modules?

> ES Modules are the standard JavaScript module system using `import` and `export`. Node.js supports ESM through `"type": "module"`, `.mjs`, and related configuration.

## Q4. Difference between `module.exports` and `exports`?

> `exports` initially references `module.exports`. `exports.foo = foo` works, but assigning a new value to `exports` does not replace `module.exports`. To replace the entire exported value, use `module.exports`.

## Q5. Is `exports === module.exports`?

Initially:

```js
exports === module.exports
```

is:

```text
true
```

After:

```js
exports = {};
```

they are no longer the same reference.

## Q6. What is module caching?

> Node.js caches loaded CommonJS modules. Subsequent `require()` calls generally return the cached module instead of executing it again.

## Q7. What are built-in modules?

> Built-in modules are modules provided by Node.js itself, such as `fs`, `path`, `http`, `os`, `crypto`, and `events`.

## Q8. What is a custom module?

> A custom module is a module created by the developer to encapsulate reusable application functionality.

## Q9. Difference between named and default export?

Named:

```js
export { add };
```

```js
import { add } from "./math.js";
```

Default:

```js
export default add;
```

```js
import add from "./math.js";
```

---

# 52. Most Important Things to Remember ⭐⭐⭐⭐⭐

```text
CommonJS
→ require()
→ module.exports
→ exports

ES Modules
→ import
→ export
→ export default

exports.foo = ...
→ Works

exports = ...
→ Does NOT replace module.exports

module.exports = ...
→ Replaces exported value

First require()
→ Module executes and gets cached

Second require()
→ Usually gets cached exports

Built-in modules
→ fs, path, http, os, crypto, events...

Custom modules
→ Modules created by you

"type": "module"
→ .js files are treated as ESM

.mjs
→ Explicit ESM

.cjs
→ Explicit CommonJS
```

---

# 53. Final Mental Model

```text
                    Node.js Modules
                          │
             ┌────────────┴────────────┐
             ↓                         ↓
        CommonJS                     ESM
             │                         │
       require()                 import
       module.exports             export
       exports                    export default
             │                         │
             └────────────┬────────────┘
                          ↓
                   Module Resolution
                          ↓
                    Module Loading
                          ↓
                    Module Cache
```

### One-line revision

> **Node.js supports CommonJS and ES Modules; CommonJS uses `require()` and `module.exports`, while ES Modules use `import` and `export`. Node.js caches loaded CommonJS modules, and both built-in and custom modules can be used to organize reusable application code.**

---

# Module 4 Checklist

```text
✅ What is a Module
✅ CommonJS
✅ ES Modules
✅ require()
✅ module.exports
✅ exports
✅ exports vs module.exports
✅ import/export
✅ Named Export
✅ Default Export
✅ Dynamic import()
✅ Module Caching
✅ Module State
✅ Built-in Modules
✅ Custom Modules
✅ Module Resolution
✅ __filename
✅ __dirname
✅ CommonJS Wrapper
✅ Circular Dependencies
✅ CJS vs ESM
✅ Interview Questions
```

# One-Line Revision

```text
Node.js Modules
=
CommonJS
+
ES Modules
+
Module Resolution
+
Module Caching
+
Built-in Modules
+
Custom Modules
```
