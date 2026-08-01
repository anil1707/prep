# Template Literals in JavaScript

## 📖 Introduction

Before ES6 (ECMAScript 2015), creating dynamic strings was difficult because developers had to concatenate multiple strings using the `+` operator.

Example:

```javascript
const firstName = "Anil";
const lastName = "Yadav";

const message = "Hello " + firstName + " " + lastName;

console.log(message);
```

Output

```javascript
Hello Anil Yadav
```

As applications became larger, string concatenation became difficult to read and maintain.

To solve this problem, ES6 introduced **Template Literals**.

---

## 🤔 What are Template Literals?

Template literals are a modern way to create strings.

Unlike normal strings, template literals:

- Allow variable interpolation
- Allow JavaScript expressions
- Support multi-line strings
- Support tagged templates

They are enclosed using **backticks (` `)** instead of single (`'`) or double (`"`) quotes.

Syntax

```javascript
`Hello World`
```

---

# Why Do We Need Template Literals?

Suppose we want to display user information.

Without template literals

```javascript
const name = "Anil";
const age = 27;

const message = "My name is " + name + " and I am " + age + " years old.";

console.log(message);
```

Output

```javascript
My name is Anil and I am 27 years old.
```

Although correct, the code becomes difficult to read as the number of variables increases.

Using template literals

```javascript
const name = "Anil";
const age = 27;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output

```javascript
My name is Anil and I am 27 years old.
```

The second approach is cleaner and easier to maintain.

---

# Syntax

```javascript
`Text ${expression}`
```

Everything inside `${}` is evaluated as JavaScript.

---

# String Interpolation

Interpolation means inserting variables or expressions inside a string.

Example

```javascript
const language = "JavaScript";

console.log(`I love ${language}`);
```

Output

```javascript
I love JavaScript
```

---

# Expressions inside Template Literals

You can write any JavaScript expression inside `${}`.

Example

```javascript
const a = 10;
const b = 20;

console.log(`${a + b}`);
```

Output

```javascript
30
```

---

Example

```javascript
console.log(`${10 * 5}`);
```

Output

```javascript
50
```

---

Example

```javascript
console.log(`${Math.max(5,20,30)}`);
```

Output

```javascript
30
```

---

Even function calls are allowed.

```javascript
function greet(name){
    return `Hello ${name}`;
}

console.log(`${greet("Anil")}`);
```

Output

```javascript
Hello Anil
```

---

# Multi-line Strings

Before ES6

```javascript
const text =
"Hello\n" +
"Welcome\n" +
"JavaScript";
```

Using template literals

```javascript
const text = `
Hello
Welcome
JavaScript
`;

console.log(text);
```

Output

```text
Hello
Welcome
JavaScript
```

No need to use `\n`.

---

# Nested Template Literals

```javascript
const user = "Anil";

const message = `Welcome ${user}, today is ${new Date().getFullYear()}`;

console.log(message);
```

Output

```javascript
Welcome Anil, today is 2026
```

---

# Conditional Expressions

```javascript
const age = 20;

console.log(`${age >= 18 ? "Adult" : "Minor"}`);
```

Output

```javascript
Adult
```

---

# Loop Example

```javascript
const fruits = ["Apple","Mango","Orange"];

for(const fruit of fruits){
    console.log(`Fruit : ${fruit}`);
}
```

Output

```javascript
Fruit : Apple
Fruit : Mango
Fruit : Orange
```

---

# HTML Generation (Very Common in React)

Instead of

```javascript
const html =
"<h1>" + title + "</h1>";
```

Use

```javascript
const html = `
<div>
    <h1>${title}</h1>
    <p>${description}</p>
</div>
`;
```

This is much easier to read.

---

# Tagged Template Literals (Overview)

A template literal can also be passed to a function.

Example

```javascript
function tag(strings,...values){
    console.log(strings);
    console.log(values);
}

const name = "Anil";

tag`Hello ${name}`;
```

Output

```javascript
["Hello ",""]

["Anil"]
```

Tagged templates are mainly used by libraries such as:

- styled-components
- GraphQL
- SQL builders

For interview purposes, knowing the concept is usually sufficient.

---

# Comparison

| String Concatenation | Template Literals |
|----------------------|------------------|
| Uses `+` | Uses backticks |
| Hard to read | Easy to read |
| No multiline support | Supports multiline |
| Difficult with many variables | Easy interpolation |
| Older syntax | ES6 syntax |

---

# 💻 Output-Based Questions

### Question 1

```javascript
const name = "Anil";

console.log(`Hello ${name}`);
```

Output

```javascript
Hello Anil
```

---

### Question 2

```javascript
console.log(`${5 + 10}`);
```

Output

```javascript
15
```

---

### Question 3

```javascript
console.log(`${true}`);
```

Output

```javascript
true
```

---

### Question 4

```javascript
console.log(`${null}`);
```

Output

```javascript
null
```

---

### Question 5

```javascript
console.log(`${undefined}`);
```

Output

```javascript
undefined
```

---

# 🎯 Interview Questions

### What are template literals?

Template literals are strings enclosed in backticks that support interpolation, multiline strings, and tagged templates.

---

### Why are template literals better than string concatenation?

They improve readability, reduce errors, and allow embedding expressions directly inside strings.

---

### What symbol is used for template literals?

Backticks

```
`
```

---

### Can we execute JavaScript inside `${}`?

Yes.

Any valid JavaScript expression can be written inside `${}`.

---

### Do template literals support multiline strings?

Yes.

---

### What are tagged template literals?

Tagged template literals allow a function to process a template literal before producing the final string.

---

# ⚠️ Common Mistakes

### Using quotes instead of backticks

❌

```javascript
"Hello ${name}"
```

Output

```javascript
Hello ${name}
```

`${}` is treated as plain text.

---

✅ Correct

```javascript
`Hello ${name}`
```

---

### Forgetting `${}`

❌

```javascript
`Hello name`
```

---

### Using unnecessary concatenation

❌

```javascript
`Hello ` + name
```

Instead

```javascript
`Hello ${name}`
```

---

# 📝 Summary

- Template literals were introduced in ES6.
- They use backticks (`` ` ``).
- `${}` allows embedding JavaScript expressions.
- They support multiline strings.
- They make code more readable than string concatenation.
- Tagged template literals allow functions to process template strings.

---

## 🔗 Related Topics

- Variables
- Data Types
- String Methods
- Operators
- Destructuring
- Spread & Rest Operators