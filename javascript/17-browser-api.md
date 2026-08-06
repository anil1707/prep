# Module 19 – Browser APIs ⭐⭐⭐⭐

## Topics Covered

* DOM ✅
* Event Bubbling
* Event Capturing
* Event Delegation
* Mutation Observer
* Intersection Observer
* Resize Observer
* LocalStorage
* SessionStorage
* Cookies

---

# 1. DOM ⭐⭐⭐⭐⭐

## DOM (Document Object Model)

The browser converts HTML into a tree-like structure of JavaScript objects.

```text
HTML

↓

DOM Tree

↓

JavaScript can Read & Modify
```

Common Methods

```javascript
document.getElementById()

document.querySelector()

document.querySelectorAll()

document.createElement()

appendChild()

removeChild()

innerHTML

textContent
```

---

# 2. Event Capturing ⭐⭐⭐⭐

## Definition

Event travels from **Document → Target**.

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

Enable Capturing

```javascript
element.addEventListener(
    "click",
    handler,
    { capture: true }
);
```

### Key Points

* Top → Bottom
* Not default
* Also called Capture Phase

---

# 3. Event Bubbling ⭐⭐⭐⭐⭐

## Definition

Event travels from **Target → Document**.

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
button.addEventListener("click", () => {
    console.log("Button");
});

parent.addEventListener("click", () => {
    console.log("Parent");
});
```

Output

```text
Button

Parent
```

### Stop Bubbling

```javascript
event.stopPropagation();
```

---

# 4. Event Delegation ⭐⭐⭐⭐⭐

## Definition

Attach one listener to a parent instead of multiple listeners to child elements.

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
parent.addEventListener("click", (event) => {

    if (event.target.tagName === "BUTTON") {
        console.log(event.target.innerText);
    }

});
```

Works because of **Event Bubbling**.

---

# event.target vs event.currentTarget

| event.target    | event.currentTarget |
| --------------- | ------------------- |
| Clicked element | Listener element    |

---

# 5. Mutation Observer ⭐⭐⭐⭐

## Definition

Observes DOM changes.

Detects

* Child nodes added/removed
* Attribute changes
* Text changes
* Subtree changes

Example

```javascript
const observer = new MutationObserver((mutations) => {
    console.log(mutations);
});

observer.observe(element, {
    childList: true,
    attributes: true,
    subtree: true
});
```

Stop observing

```javascript
observer.disconnect();
```

### Use Cases

* Dynamic DOM
* Chat Messages
* Browser Extensions
* Third-party Widgets

---

# 6. Intersection Observer ⭐⭐⭐⭐⭐

## Definition

Observes when an element enters or leaves the viewport.

Example

```javascript
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            console.log("Visible");
        }

    });

});

observer.observe(image);
```

### Important Properties

```javascript
entry.target

entry.isIntersecting
```

### Options

```javascript
{
    root: null,
    threshold: 0.5,
    rootMargin: "100px"
}
```

### Stop Observing

```javascript
observer.unobserve(element);

observer.disconnect();
```

### Use Cases

* Lazy Loading
* Infinite Scroll
* Analytics
* Animations
* Video Auto Play

---

# 7. Resize Observer ⭐⭐⭐

## Definition

Observes changes to an element's size.

Example

```javascript
const observer = new ResizeObserver((entries) => {

    entries.forEach(entry => {
        console.log(entry.contentRect.width);
    });

});

observer.observe(box);
```

### Important Property

```javascript
entry.contentRect.width

entry.contentRect.height
```

### Stop

```javascript
observer.disconnect();
```

### Use Cases

* Responsive Charts
* Responsive Components
* Dashboard Layouts
* Canvas Resize

---

# Observer APIs Comparison

| API                  | Watches            |
| -------------------- | ------------------ |
| MutationObserver     | DOM Changes        |
| IntersectionObserver | Element Visibility |
| ResizeObserver       | Element Size       |

---

# 8. LocalStorage ⭐⭐⭐⭐⭐

## Definition

Stores data permanently until removed.

### Methods

```javascript
localStorage.setItem(key, value);

localStorage.getItem(key);

localStorage.removeItem(key);

localStorage.clear();
```

### Store Objects

```javascript
localStorage.setItem(
    "user",
    JSON.stringify(user)
);

const user = JSON.parse(
    localStorage.getItem("user")
);
```

### Characteristics

* 5–10 MB
* String only
* Persists after browser restart
* Not sent with HTTP requests

### Use Cases

* Theme
* Language
* User Preferences
* Non-sensitive Cache

---

# 9. SessionStorage ⭐⭐⭐⭐

## Definition

Stores data until the browser tab is closed.

### Methods

```javascript
sessionStorage.setItem();

sessionStorage.getItem();

sessionStorage.removeItem();

sessionStorage.clear();
```

### Characteristics

* 5–10 MB
* Cleared when tab closes
* Survives page refresh
* Not sent with HTTP requests

### Use Cases

* Multi-step Forms
* OTP Flow
* Temporary State

---

# 10. Cookies ⭐⭐⭐⭐⭐

## Definition

Small pieces of data stored by the browser and automatically sent with matching HTTP requests.

### Create Cookie

```javascript
document.cookie = "name=Anil";
```

### Cookie with Expiry

```javascript
document.cookie =
"name=Anil; expires=Fri, 31 Dec 2027 12:00:00 UTC";
```

### Read

```javascript
document.cookie;
```

### Characteristics

* ~4 KB
* Expiry supported
* Automatically sent with requests
* Can be HttpOnly

---

# HttpOnly Cookies ⭐⭐⭐⭐⭐

JavaScript cannot access HttpOnly cookies.

More secure for authentication.

```text
JavaScript

↓

Cannot Read

↓

Browser Sends Automatically
```

---

# LocalStorage vs SessionStorage vs Cookies

| Feature                 | LocalStorage          | SessionStorage | Cookies              |
| ----------------------- | --------------------- | -------------- | -------------------- |
| Capacity                | 5–10 MB               | 5–10 MB        | ~4 KB                |
| Expiry                  | Never (until removed) | Tab closes     | Configurable         |
| Sent with HTTP Requests | ❌                     | ❌              | ✅                    |
| Accessible via JS       | ✅                     | ✅              | Depends (HttpOnly ❌) |
| Best Use                | Preferences           | Temporary Data | Authentication       |

---

# Common Interview Questions

### What is Event Delegation?

One parent listener handles child events using event bubbling.

---

### Difference between Capturing and Bubbling?

Capturing → Top → Bottom

Bubbling → Bottom → Top

---

### Difference between MutationObserver and IntersectionObserver?

MutationObserver → DOM changes

IntersectionObserver → Element visibility

---

### Difference between IntersectionObserver and ResizeObserver?

IntersectionObserver → Visibility

ResizeObserver → Element size

---

### Difference between LocalStorage and SessionStorage?

LocalStorage survives browser restart.

SessionStorage is cleared when the tab closes.

---

### Difference between LocalStorage and Cookies?

Cookies are automatically sent with HTTP requests.

LocalStorage is not.

---

### Which is better for authentication?

**Secure HttpOnly Cookies**, because JavaScript cannot access them.

---

### Can LocalStorage store objects?

No.

Use:

```javascript
JSON.stringify()

JSON.parse()
```

---

# Memory Tricks

## Event Flow

```text
Capturing

Document

↓

Target

---------------------

Bubbling

Target

↑

Document

---------------------

Delegation

One Parent Listener

↓

Uses Bubbling
```

---

## Observer APIs

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
```

---

## Browser Storage

```text
LocalStorage

↓

Permanent

----------------------

SessionStorage

↓

Until Tab Closes

----------------------

Cookies

↓

Sent With HTTP Requests
```

---

# Quick Revision

* DOM → HTML represented as JavaScript objects.
* Capturing → Top → Bottom.
* Bubbling → Bottom → Top.
* Delegation → One parent listener using bubbling.
* MutationObserver → DOM changes.
* IntersectionObserver → Viewport visibility.
* ResizeObserver → Element size changes.
* LocalStorage → Permanent browser storage.
* SessionStorage → Temporary per-tab storage.
* Cookies → Small data automatically sent with HTTP requests.
* HttpOnly Cookies → Best choice for sensitive authentication tokens.
