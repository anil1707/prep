# Destructuring in JavaScript

## 📖 Introduction

Destructuring is an ES6 feature that allows you to extract values from arrays or properties from objects and assign them to variables in a clean and concise way.

Before ES6, developers had to access each property or element individually.

Example:

```javascript
const user = {
    name: "Anil",
    age: 27,
    city: "Varanasi"
};

const name = user.name;
const age = user.age;
const city = user.city;

console.log(name);
console.log(age);
console.log(city);
```

Output

```javascript
Anil
27
Varanasi
```

Although this works, it becomes repetitive and harder to maintain when working with large objects.

ES6 introduced **Destructuring** to solve this problem.

---

# 🤔 Why Do We Need Destructuring?

Imagine an API returns the following response.

```javascript
const response = {
    success: true,
    message: "Data fetched successfully",
    data: {
        id: 1,
        name: "Anil",
        email: "anil@gmail.com"
    }
};
```

Without destructuring, you would write:

```javascript
const success = response.success;
const message = response.message;
const data = response.data;
```

Using destructuring:

```javascript
const { success, message, data } = response;
```

The code becomes shorter, cleaner, and easier to read.

---

# How Destructuring Works

JavaScript matches variable names with property names.

```javascript
const user = {
    name: "Anil",
    age: 27
};

const { name, age } = user;

console.log(name);
console.log(age);
```

Output

```javascript
Anil
27
```

---

# Object Destructuring

Object destructuring extracts values using property names.

```javascript
const employee = {
    id: 101,
    name: "Rahul",
    salary: 70000
};

const { id, name, salary } = employee;

console.log(id);
console.log(name);
console.log(salary);
```

Output

```javascript
101
Rahul
70000
```

---

# Array Destructuring

Array destructuring extracts values based on index.

```javascript
const colors = ["Red", "Green", "Blue"];

const [first, second, third] = colors;

console.log(first);
console.log(second);
console.log(third);
```

Output

```javascript
Red
Green
Blue
```

Unlike object destructuring, variable names can be anything because matching is based on position.

---

# Skipping Elements

Sometimes we don't need every element.

```javascript
const numbers = [10,20,30,40];

const [first,,third] = numbers;

console.log(first);
console.log(third);
```

Output

```javascript
10
30
```

Notice the empty space after the comma.

---

# Default Values

Suppose a property doesn't exist.

```javascript
const user = {
    name: "Anil"
};

const { age } = user;

console.log(age);
```

Output

```javascript
undefined
```

Instead, provide a default value.

```javascript
const { age = 25 } = user;

console.log(age);
```

Output

```javascript
25
```

---

# Renaming Variables

Sometimes the variable name should be different from the property name.

```javascript
const user = {
    name: "Anil"
};

const { name: userName } = user;

console.log(userName);
```

Output

```javascript
Anil
```

This is useful when multiple objects have a property with the same name.

---

# Nested Object Destructuring

Objects often contain nested objects.

```javascript
const user = {
    name: "Anil",
    address: {
        city: "Varanasi",
        state: "UP"
    }
};

const {
    address: {
        city,
        state
    }
} = user;

console.log(city);
console.log(state);
```

Output

```javascript
Varanasi
UP
```

---

# Nested Array Destructuring

```javascript
const numbers = [10, [20,30], 40];

const [first, [second, third], fourth] = numbers;

console.log(first);
console.log(second);
console.log(third);
console.log(fourth);
```

Output

```javascript
10
20
30
40
```

---

# Destructuring Function Parameters

Without destructuring

```javascript
function printUser(user){
    console.log(user.name);
    console.log(user.age);
}
```

With destructuring

```javascript
function printUser({name, age}){
    console.log(name);
    console.log(age);
}
```

Usage

```javascript
printUser({
    name:"Anil",
    age:27
});
```

Output

```javascript
Anil
27
```

This pattern is extremely common in React.

---

# Destructuring with Rest Operator

```javascript
const user = {
    name: "Anil",
    age: 27,
    city: "Varanasi",
    country: "India"
};

const { name, ...remaining } = user;

console.log(name);
console.log(remaining);
```

Output

```javascript
Anil

{
  age:27,
  city:"Varanasi",
  country:"India"
}
```

---

# Swapping Variables

Before ES6

```javascript
let a = 10;
let b = 20;

let temp = a;
a = b;
b = temp;
```

Using destructuring

```javascript
let a = 10;
let b = 20;

[a,b] = [b,a];

console.log(a,b);
```

Output

```javascript
20 10
```

---

# Destructuring in React

## Props

Instead of

```jsx
function Card(props){
    return <h1>{props.title}</h1>;
}
```

Use

```jsx
function Card({title}){
    return <h1>{title}</h1>;
}
```

---

## useState

```javascript
const [count, setCount] = useState(0);
```

Here,

```javascript
useState()
```

returns an array.

Array destructuring extracts:

- Current state
- State update function

---

## API Response

```javascript
const response = {
    user:{
        name:"Anil",
        email:"anil@gmail.com"
    }
};

const {
    user:{
        name,
        email
    }
} = response;

console.log(name);
```

Output

```javascript
Anil
```

---

# Object vs Array Destructuring

| Object | Array |
|---------|-------|
| Uses `{}` | Uses `[]` |
| Matches property names | Matches indexes |
| Variable names usually match property names | Variable names can be anything |
| Order doesn't matter | Order matters |

---

# 💻 Output-Based Questions

### Question 1

```javascript
const person = {
    name:"Anil",
    age:27
};

const {name} = person;

console.log(name);
```

Output

```javascript
Anil
```

---

### Question 2

```javascript
const arr = [1,2,3];

const [a,b] = arr;

console.log(a,b);
```

Output

```javascript
1 2
```

---

### Question 3

```javascript
const arr = [10,20,30];

const [,,value] = arr;

console.log(value);
```

Output

```javascript
30
```

---

### Question 4

```javascript
const user = {
    name:"Anil"
};

const {age = 25} = user;

console.log(age);
```

Output

```javascript
25
```

---

### Question 5

```javascript
const {
    name:userName
} = {
    name:"Anil"
};

console.log(userName);
```

Output

```javascript
Anil
```

---

# 🎯 Interview Questions

### What is destructuring?

Destructuring is an ES6 feature that extracts values from arrays or properties from objects into individual variables.

---

### What is the difference between object and array destructuring?

Object destructuring matches property names, while array destructuring matches indexes.

---

### Can destructuring assign default values?

Yes.

```javascript
const { age = 25 } = user;
```

---

### Can we rename variables while destructuring?

Yes.

```javascript
const { name:userName } = user;
```

---

### Can destructuring be used in function parameters?

Yes.

It is commonly used in React components.

---

### Can nested objects be destructured?

Yes.

JavaScript supports nested destructuring for both arrays and objects.

---

# ⚠️ Common Mistakes

### Forgetting matching property names

```javascript
const user = {
    name:"Anil"
};

const { username } = user;
```

Output

```javascript
undefined
```

Because the property is `name`, not `username`.

---

### Confusing object and array syntax

❌

```javascript
const { first } = [1,2,3];
```

Correct

```javascript
const [first] = [1,2,3];
```

---

### Accessing nested properties without checking

```javascript
const {
    address:{
        city
    }
} = user;
```

This throws an error if `address` is `undefined`.

Use default values or optional chaining where appropriate.

---

# 📝 Summary

- Destructuring was introduced in ES6.
- Object destructuring uses `{}`.
- Array destructuring uses `[]`.
- Supports default values, renaming, nested destructuring, and function parameters.
- Widely used in React for props, hooks, and API responses.
- Makes code shorter, cleaner, and more readable.

---

# Spread (`...`) & Rest (`...`) Operators

## 📖 Introduction

The **Spread** and **Rest** operators were introduced in **ES6 (ECMAScript 2015)**.

Both operators use the same syntax:

```javascript
...
```

Although they look identical, they perform completely different tasks depending on where they are used.

| Operator | Purpose |
|----------|---------|
| Spread (`...`) | Expands (unpacks) an iterable or object |
| Rest (`...`) | Collects multiple values into a single variable |

A simple way to remember them is:

> **Spread expands.**  
> **Rest collects.**

---

# 🤔 Why Do We Need Spread & Rest?

Imagine you have an array:

```javascript
const numbers = [10, 20, 30];
```

Suppose you want to create another array containing these values.

Without Spread Operator

```javascript
const newNumbers = [numbers];

console.log(newNumbers);
```

Output

```javascript
[[10, 20, 30]]
```

Instead of copying the elements, JavaScript inserts the entire array as a single element.

Using Spread Operator

```javascript
const newNumbers = [...numbers];

console.log(newNumbers);
```

Output

```javascript
[10, 20, 30]
```

The spread operator expands the array into individual elements.

---

# Internal Working

Consider this array.

```javascript
const arr = [1, 2, 3];
```

Using spread

```javascript
console.log(...arr);
```

Conceptually, JavaScript treats it like:

```javascript
console.log(1, 2, 3);
```

The array is expanded into separate values.

---

# What Can Be Spread?

The spread operator works with:

- Arrays
- Strings
- Objects (ES2018+)
- Function arguments
- Any iterable object

Examples

```javascript
const str = "JavaScript";

console.log([...str]);
```

Output

```javascript
["J","a","v","a","S","c","r","i","p","t"]
```

---

# Spread with Arrays

## Copy an Array

```javascript
const numbers = [1,2,3];

const copy = [...numbers];

console.log(copy);
```

Output

```javascript
[1,2,3]
```

---

## Add New Elements

```javascript
const numbers = [2,3];

const updated = [1,...numbers,4];

console.log(updated);
```

Output

```javascript
[1,2,3,4]
```

---

## Merge Arrays

```javascript
const arr1 = [1,2];
const arr2 = [3,4];

const merged = [...arr1,...arr2];

console.log(merged);
```

Output

```javascript
[1,2,3,4]
```

---

# Spread with Objects

Objects can also be copied.

```javascript
const user = {
    name:"Anil",
    age:27
};

const copy = {...user};

console.log(copy);
```

Output

```javascript
{
    name:"Anil",
    age:27
}
```

---

## Merge Objects

```javascript
const user = {
    name:"Anil"
};

const address = {
    city:"Varanasi"
};

const person = {
    ...user,
    ...address
};

console.log(person);
```

Output

```javascript
{
    name:"Anil",
    city:"Varanasi"
}
```

---

## Overriding Properties

```javascript
const user = {
    name:"Anil",
    age:25
};

const updated = {
    ...user,
    age:27
};

console.log(updated);
```

Output

```javascript
{
    name:"Anil",
    age:27
}
```

Properties written later overwrite earlier ones.

---

# Spread in Function Calls

Without spread

```javascript
const numbers = [10,20,30];

console.log(numbers);
```

Output

```javascript
[10,20,30]
```

Using spread

```javascript
console.log(...numbers);
```

Output

```javascript
10 20 30
```

Each array element becomes a separate argument.

---

## Math.max()

Without spread

```javascript
const numbers = [10,20,30];

Math.max(numbers);
```

Output

```javascript
NaN
```

Because `Math.max()` expects individual numbers.

Correct way

```javascript
Math.max(...numbers);
```

Output

```javascript
30
```

---

# Rest Operator

Unlike spread, the rest operator collects multiple values into one variable.

---

## Rest in Function Parameters

Suppose a function can receive any number of arguments.

Without Rest Operator

```javascript
function sum(a,b,c){

}
```

Only three parameters are supported.

Using Rest Operator

```javascript
function sum(...numbers){

    console.log(numbers);

}

sum(10,20,30,40,50);
```

Output

```javascript
[10,20,30,40,50]
```

---

## Sum Example

```javascript
function sum(...numbers){

    return numbers.reduce((total,value)=>total+value,0);

}

console.log(sum(10,20,30));
```

Output

```javascript
60
```

---

# Rest in Array Destructuring

```javascript
const numbers = [10,20,30,40,50];

const [first,...remaining] = numbers;

console.log(first);

console.log(remaining);
```

Output

```javascript
10

[20,30,40,50]
```

---

# Rest in Object Destructuring

```javascript
const user = {
    name:"Anil",
    age:27,
    city:"Varanasi"
};

const {name,...others} = user;

console.log(name);

console.log(others);
```

Output

```javascript
Anil

{
    age:27,
    city:"Varanasi"
}
```

---

# Spread vs Rest

| Spread | Rest |
|---------|------|
| Expands values | Collects values |
| Used while calling functions | Used while defining functions |
| Used in arrays & objects | Used in arrays, objects & parameters |
| Creates copies | Collects remaining values |

---

# Shallow Copy vs Deep Copy

One of the most frequently asked interview topics.

Consider this object.

```javascript
const user = {
    name:"Anil",
    address:{
        city:"Varanasi"
    }
};
```

Now copy it.

```javascript
const copy = {
    ...user
};
```

Most developers think this creates a completely new object.

It doesn't.

---

## Primitive Properties

```javascript
copy.name = "Rahul";

console.log(user.name);
```

Output

```javascript
Anil
```

Primitive values are copied by value.

---

## Nested Objects

```javascript
copy.address.city = "Delhi";

console.log(user.address.city);
```

Output

```javascript
Delhi
```

Why?

Because spread performs a **shallow copy**.

Only the first level is copied.

Nested objects still reference the same memory.

---

# Deep Copy

If you want an independent copy, use:

```javascript
const copy = structuredClone(user);
```

Now changes inside nested objects won't affect the original object.

Example

```javascript
copy.address.city = "Mumbai";

console.log(user.address.city);
```

Output

```javascript
Varanasi
```

---

# Spread in React

## Updating State

Never mutate state directly.

❌

```javascript
user.name = "Rahul";
```

Correct

```javascript
setUser({
    ...user,
    name:"Rahul"
});
```

---

## Updating Arrays

```javascript
setTodos([
    ...todos,
    newTodo
]);
```

---

## Removing Items

```javascript
const updated = todos.filter(
    todo => todo.id !== id
);

setTodos(updated);
```

---

## Updating Nested State

```javascript
setUser({
    ...user,
    address:{
        ...user.address,
        city:"Delhi"
    }
});
```

Notice that each nested level must also be copied.

---

# 💻 Output-Based Questions

### Question 1

```javascript
const arr = [1,2,3];

console.log(...arr);
```

Output

```javascript
1 2 3
```

---

### Question 2

```javascript
const arr = [1,2];

const newArr = [...arr,3];

console.log(newArr);
```

Output

```javascript
[1,2,3]
```

---

### Question 3

```javascript
const obj = {
    a:1,
    b:2
};

const copy = {
    ...obj,
    b:5
};

console.log(copy);
```

Output

```javascript
{
    a:1,
    b:5
}
```

---

### Question 4

```javascript
function test(...args){

    console.log(args.length);

}

test(1,2,3,4);
```

Output

```javascript
4
```

---

### Question 5

```javascript
const numbers = [10,20,30];

const [first,...rest] = numbers;

console.log(rest);
```

Output

```javascript
[20,30]
```

---

### Question 6

```javascript
const user = {
    name:"Anil",
    age:27
};

const {
    name,
    ...other
} = user;

console.log(other);
```

Output

```javascript
{
    age:27
}
```

---

### Question 7

```javascript
const arr = [1,2,3];

console.log(Math.max(...arr));
```

Output

```javascript
3
```

---

# 🎯 Interview Questions

### What is the difference between Spread and Rest Operator?

Spread expands values, whereas Rest collects multiple values into a single variable.

---

### Does the Spread Operator create a deep copy?

No.

It creates only a **shallow copy**.

---

### Can Spread be used with objects?

Yes.

Since ES2018, object spread is supported.

---

### Why is Spread heavily used in React?

React state should be treated as immutable.

Spread creates a new object or array instead of modifying the existing one.

---

### What is the difference between

```javascript
const copy = {...user};
```

and

```javascript
const copy = structuredClone(user);
```

`{...user}` performs a shallow copy.

`structuredClone()` performs a deep copy for supported data types.

---

# ⚠️ Common Mistakes

### Forgetting that spread creates a shallow copy

```javascript
const copy = {
    ...user
};
```

Nested objects are still shared.

---

### Using Rest anywhere except the last parameter

❌

```javascript
function test(...args,last){

}
```

Correct

```javascript
function test(first,...args){

}
```

The rest parameter must always be the **last parameter**.

---

### Confusing Spread and Rest

Remember:

- Spread → Expands
- Rest → Collects

---

# 📝 Summary

- Spread (`...`) expands arrays, objects, strings, or iterables.
- Rest (`...`) collects remaining values into one variable.
- Spread is commonly used to copy and merge arrays and objects.
- Spread creates a **shallow copy**, not a deep copy.
- Rest is commonly used in function parameters and destructuring.
- Spread and Rest are essential for writing modern React applications.

---

## 🔗 Related Topics

- Arrays
- Objects
- Destructuring
- Functions
- Closures
- React State
- Immutability
- `structuredClone()`