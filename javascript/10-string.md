# JavaScript Primitive Strings vs String Objects (Autoboxing)

## Is a String an Object in JavaScript?

**Short Answer:**

> A string literal is a **primitive**, **not an object**. However, JavaScript temporarily wraps it inside a `String` object when you access its properties or methods. This process is called **Autoboxing**.

---

# 1. Primitive String

```javascript
const str = "Hello";

console.log(typeof str);
```

**Output**

```text
string
```

A string literal is stored as a **primitive value**, not as an object.

---

# 2. Then How Does This Work?

```javascript
const str = "Hello";

console.log(str.toUpperCase());
console.log(str.length);
```

Question:

> If `str` is a primitive, how can it call methods like `toUpperCase()` or access `length`?

---

# 3. Autoboxing

Whenever JavaScript encounters:

```javascript
str.toUpperCase();
```

it conceptually performs the following steps:

```javascript
const temp = new String(str);

temp.toUpperCase();

// temp is immediately discarded
```

JavaScript creates a **temporary `String` object**, uses it to execute the method, and then destroys it.

---

## Internal Flow

```text
Primitive String
       │
       ▼
Temporary String Object
       │
       ▼
Execute Method / Access Property
       │
       ▼
Destroy Temporary Object
       │
       ▼
Return Result
```

This automatic conversion is called **Autoboxing** (or **Boxing**).

---

# 4. Example

```javascript
const str = "hello";

console.log(str.length);
```

Internally (conceptually):

```javascript
const temp = new String("hello");

console.log(temp.length);
```

**Output**

```text
5
```

---

# 5. Primitive String vs String Object

### Primitive String

```javascript
const str = "Hello";

console.log(typeof str);
```

**Output**

```text
string
```

---

### String Object

```javascript
const str = new String("Hello");

console.log(typeof str);
```

**Output**

```text
object
```

---

# 6. Memory Representation

### Primitive String

```text
Stack

str
 │
 ▼
"Hello"
```

---

### String Object

```text
Stack

obj
 │
 ▼
Reference
 │
 ▼
Heap

String Object
 │
 ▼
"Hello"
```

---

# 7. Equality

```javascript
const a = "Hello";
const b = new String("Hello");

console.log(a == b);
console.log(a === b);
```

**Output**

```text
true
false
```

### Why?

`==`

* Converts the object to its primitive value before comparison.

`===`

* Doesn't perform type conversion.
* One value is a **primitive**, the other is an **object**.

---

# 8. Why Shouldn't We Use `new String()`?

❌ Avoid

```javascript
const str = new String("Hello");
```

Problems:

* Creates an unnecessary object.
* Uses more memory.
* Can cause equality issues (`===`).
* Slower than using primitive strings.

✅ Preferred

```javascript
const str = "Hello";
```

---

# 9. Other Primitive Wrapper Objects

JavaScript also performs autoboxing for other primitive types.

| Primitive | Wrapper Object |
| --------- | -------------- |
| String    | `String`       |
| Number    | `Number`       |
| Boolean   | `Boolean`      |
| Symbol    | `Symbol`       |
| BigInt    | `BigInt`       |

Examples:

```javascript
(10).toFixed(2);

true.toString();

10n.toString();
```

Internally, JavaScript temporarily creates wrapper objects to execute these methods.

---

# 10. Exceptions

`null` and `undefined` do **not** have wrapper objects.

```javascript
null.toString();
```

```text
TypeError
```

```javascript
undefined.toString();
```

```text
TypeError
```

---

# Interview Questions

## Q1. Is a string an object?

No.

A string literal is a **primitive**.

---

## Q2. Then how can it call methods like `toUpperCase()`?

JavaScript performs **Autoboxing** by temporarily creating a `String` object, calling the method, and then discarding the temporary object.

---

## Q3. What is Autoboxing?

Autoboxing is the automatic conversion of a primitive value into its corresponding wrapper object so that properties and methods can be accessed.

---

## Q4. Should we use `new String()`?

No.

Always prefer string literals because they are simpler, more memory-efficient, and avoid confusing behavior.

---

## Q5. Why does `"Hello".length` work?

Because JavaScript temporarily wraps the primitive string in a `String` object, reads the `length` property, and then discards the wrapper.

---

# ⭐ Golden Rules

1. A string literal is a **primitive**.
2. `typeof "Hello"` returns `"string"`.
3. `new String("Hello")` creates an **object**.
4. JavaScript uses **Autoboxing** to provide methods and properties on primitive strings.
5. Avoid using `new String()`.
6. `null` and `undefined` do not support autoboxing.

---

# 📝 Quick Revision

| Question                                      | Answer                  |
| --------------------------------------------- | ----------------------- |
| Is `"Hello"` an object?                       | ❌ No, it's a primitive  |
| Is `new String("Hello")` an object?           | ✅ Yes                   |
| Why does `"Hello".toUpperCase()` work?        | Autoboxing              |
| Should we use `new String()`?                 | ❌ No                    |
| Do `null` and `undefined` support autoboxing? | ❌ No                    |
| Name of the process                           | **Autoboxing (Boxing)** |

---

# 💡 Interview Answer

> **A string literal is a primitive (`typeof` returns `"string"`). When we access properties or methods like `length` or `toUpperCase()`, JavaScript temporarily wraps the primitive inside a `String` object through a process called Autoboxing, performs the operation, and then discards the temporary wrapper.**
