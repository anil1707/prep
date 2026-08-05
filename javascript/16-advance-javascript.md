# Module 17 – Advanced JavaScript ⭐⭐⭐⭐⭐

## Introduction

Advanced JavaScript concepts are frequently asked in frontend interviews because they test your understanding of functions, closures, event handling, performance optimization, and functional programming.

This module covers:

- Debounce
- Throttle
- Currying
- Memoization
- Composition
- Pipe
- Lazy Evaluation
- Event Delegation

---

# 1. Debounce ⭐⭐⭐⭐⭐

## Definition

Debouncing delays the execution of a function until a specified period of inactivity has passed.

```text
User Typing

R
Re
Rea
React

↓

(wait 500ms)

↓

API Call
```

## Internal Working

- Store timer in closure.
- Clear previous timer.
- Create new timer.
- Execute only after no new calls occur.

## Polyfill

```javascript
function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);

    };

}
```

## Use Cases

- Search Suggestions
- Auto Save
- Form Validation
- Resize Event

---

# 2. Throttle ⭐⭐⭐⭐⭐

## Definition

Throttle limits a function so it executes at most once during a specified interval.

```text
Scroll Events

● ● ● ● ● ●

↓

Execute

↓

Wait

↓

Execute

↓

Wait

↓

Execute
```

## Internal Working

- Execute immediately.
- Block future executions.
- Allow execution again after delay.

## Polyfill

```javascript
function throttle(fn, delay) {

    let shouldWait = false;

    return function (...args) {

        if (shouldWait) return;

        fn.apply(this, args);

        shouldWait = true;

        setTimeout(() => {
            shouldWait = false;
        }, delay);

    };

}
```

## Use Cases

- Scroll
- Resize
- Mouse Move
- Drag Events
- Infinite Scroll

---

# Debounce vs Throttle

| Debounce | Throttle |
|----------|----------|
| Waits for inactivity | Executes every interval |
| Search | Scroll |
| Auto Save | Mouse Move |

---

# 3. Currying ⭐⭐⭐⭐⭐

## Definition

Transforms

```javascript
sum(a,b,c)
```

into

```javascript
sum(a)(b)(c)
```

## Example

```javascript
const multiply = a => b => a * b;

const double = multiply(2);

double(10);
```

## Why?

- Partial Application
- Reusable Functions
- Functional Programming

## Uses Closures

Each returned function remembers previous arguments.

---

# 4. Memoization ⭐⭐⭐⭐

## Definition

Stores function results for previously computed inputs.

```text
Input

↓

Cache Exists?

↓

Yes

↓

Return Cached Value

↓

No

↓

Calculate

↓

Store

↓

Return
```

## Polyfill

```javascript
function memoize(fn){

    const cache = {};

    return function(...args){

        const key = JSON.stringify(args);

        if(key in cache){
            return cache[key];
        }

        const result = fn.apply(this,args);

        cache[key] = result;

        return result;

    }

}
```

## Use Cases

- Expensive Calculations
- API Cache
- React useMemo
- React.memo

---

# 5. Function Composition ⭐⭐⭐

## Definition

Combines functions where one function's output becomes another function's input.

```text
f(g(h(x)))
```

Runs:

```text
Right → Left
```

## Polyfill

```javascript
function compose(...fns){

    return function(value){

        return fns.reduceRight((acc,fn)=>{
            return fn(acc);
        },value);

    }

}
```

---

# 6. Pipe ⭐⭐⭐

## Definition

Same as composition but executes from Left → Right.

```text
pipe(f,g,h)

↓

h(g(f(x)))
```

Execution order

```text
Left → Right
```

## Polyfill

```javascript
function pipe(...fns){

    return function(value){

        return fns.reduce((acc,fn)=>{
            return fn(acc);
        },value);

    }

}
```

---

# Composition vs Pipe

| Compose | Pipe |
|----------|------|
| Right → Left | Left → Right |
| reduceRight() | reduce() |

---

# 7. Lazy Evaluation ⭐⭐⭐⭐

## Definition

Compute values only when they are actually needed.

Instead of:

```text
Generate 1 Million Values
```

Generate:

```text
One

↓

One

↓

One
```

only when requested.

## Examples

- Generators
- Streams
- Large Files
- Infinite Sequences

---

# 8. Event Bubbling ⭐⭐⭐⭐⭐

## Definition

Event travels from the target element to its ancestors.

```text
Button

↑

Parent

↑

Body

↑

HTML

↑

Document
```

Example

```javascript
button.addEventListener("click",()=>{

});

parent.addEventListener("click",()=>{

});
```

Click button

Output

```text
Button

Parent
```

---

# Event Capturing

Event travels

```text
Document

↓

HTML

↓

Body

↓

Parent

↓

Button
```

Enable

```javascript
element.addEventListener(
    "click",
    handler,
    { capture: true }
);
```

---

# Event Delegation ⭐⭐⭐⭐⭐

## Definition

Attach one listener to a parent instead of multiple listeners to children.

Instead of

```text
100 Buttons

↓

100 Listeners
```

Use

```text
100 Buttons

↓

1 Parent

↓

1 Listener
```

Example

```javascript
parent.addEventListener("click",(event)=>{

    if(event.target.tagName==="BUTTON"){
        console.log(event.target.innerText);
    }

});
```

Works because of **Event Bubbling**.

---

# event.target vs event.currentTarget

| event.target | event.currentTarget |
|---------------|---------------------|
| Actual clicked element | Element where listener is attached |

---

# stopPropagation()

Stops event bubbling.

```javascript
event.stopPropagation();
```

---

# Event Capturing vs Bubbling vs Delegation

| Capturing | Bubbling | Delegation |
|------------|-----------|------------|
| Top → Bottom | Bottom → Top | Technique using Bubbling |
| Capture Phase | Bubble Phase | Parent Listener |
| Not Default | Default | Performance Optimization |

---

# Common Interview Questions

### What is Debounce?

Delays execution until user stops triggering events.

---

### What is Throttle?

Limits execution to once per interval.

---

### Difference between Debounce and Throttle?

Debounce waits.

Throttle limits frequency.

---

### What is Currying?

Converting

```javascript
fn(a,b,c)
```

into

```javascript
fn(a)(b)(c)
```

---

### What is Memoization?

Caching function results.

---

### Difference between Compose and Pipe?

Compose → Right to Left

Pipe → Left to Right

---

### What is Lazy Evaluation?

Computes values only when required.

---

### What is Event Bubbling?

Event moves from child to parent.

---

### What is Event Capturing?

Event moves from parent to child.

---

### What is Event Delegation?

One parent listener handling child events using bubbling.

---

### Difference between event.target and event.currentTarget?

- target → Clicked element
- currentTarget → Listener element

---

# Common Mistakes

❌ Forgetting `clearTimeout()` in debounce.

❌ Using `setInterval()` instead of `setTimeout()` in throttle.

❌ Thinking currying and closures are different concepts.

❌ Creating cache inside memoized function.

❌ Confusing compose and pipe order.

❌ Thinking Event Delegation is an event phase.

❌ Forgetting that Event Delegation depends on bubbling.

---

# Summary

- Debounce delays execution after inactivity.
- Throttle limits execution frequency.
- Currying converts multi-argument functions into chained single-argument functions.
- Memoization caches function results.
- Compose executes functions Right → Left.
- Pipe executes functions Left → Right.
- Lazy Evaluation computes values only when needed.
- Event Capturing flows Top → Bottom.
- Event Bubbling flows Bottom → Top.
- Event Delegation uses bubbling to reduce event listeners.

---

# Related Topics

- Closures
- Higher Order Functions
- Event Loop
- Prototype & Inheritance
- Generators & Iterators
- React Synthetic Events
- React.memo
- useMemo
- useCallback