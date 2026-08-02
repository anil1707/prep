# Module 9 – Prototype & Inheritance (Quick Revision)

## 1. Prototype

* Every JavaScript object has a hidden internal property called **`[[Prototype]]`**.
* It points to another object.
* If a property is not found on the current object, JavaScript looks in its prototype.

```javascript
const animal = {
  eat() {
    console.log("Eating");
  }
};

const dog = Object.create(animal);

dog.eat(); // Eating
```

---

## 2. Prototype Chain

JavaScript searches properties in this order:

```text
Object
   ↓
Prototype
   ↓
Prototype
   ↓
Object.prototype
   ↓
null
```

Search stops when:

* ✅ Property is found
* ✅ Prototype becomes `null`

---

## 3. `[[Prototype]]` vs `__proto__`

### `[[Prototype]]`

* Internal hidden slot
* Used by JavaScript engine
* Cannot be accessed directly

### `__proto__`

* Legacy accessor
* Gives access to `[[Prototype]]`

```javascript
Object.getPrototypeOf(obj);   // Recommended

obj.__proto__;                // Legacy
```

---

## 4. `prototype`

Only **functions** have a `prototype` property.

```javascript
function Person(){}

console.log(Person.prototype);
```

Purpose:

* Used by `new`
* Shared methods are stored here

```javascript
Person.prototype.greet = function(){
    console.log("Hello");
}
```

---

## 5. `prototype` vs `__proto__`

| prototype                       | **proto**                                  |
| ------------------------------- | ------------------------------------------ |
| Exists on constructor functions | Exists on objects (via `Object.prototype`) |
| Used by `new`                   | Used for property lookup                   |
| Creates future instances        | Links current object to its prototype      |

---

## 6. Constructor Function

```javascript
function Person(name){
    this.name = name;
}

const p = new Person("Anil");
```

### `new` internally

1. Create empty object
2. Set `[[Prototype]] = Person.prototype`
3. Execute constructor
4. Return object

---

## 7. ES6 Class

```javascript
class Person{

    constructor(name){
        this.name = name;
    }

    greet(){
        console.log("Hello");
    }

}
```

* Classes are **syntactic sugar** over constructor functions.
* `typeof Person` → `"function"`
* Methods are stored on `Person.prototype`.

---

## 8. `extends`

```javascript
class Animal{}

class Dog extends Animal{}
```

Internally:

```text
Dog.prototype
        │
        ▼
Animal.prototype
```

* Doesn't copy methods.
* Creates prototype links.

---

## 9. `super`

### Parent Constructor

```javascript
super(name);
```

Must be called before `this` inside a derived class constructor.

### Parent Method

```javascript
super.speak();
```

Calls the parent class method.

---

## 10. `Object.create()`

```javascript
const dog = Object.create(animal);
```

Internally:

```text
dog.[[Prototype]]

↓

animal
```

* Doesn't copy properties.
* Creates a prototype link.

---

# Property Lookup

```javascript
obj.property
```

JavaScript searches:

```text
Current Object
      ↓
Prototype
      ↓
Next Prototype
      ↓
Object.prototype
      ↓
null
```

---

# Complete Inheritance Flow

```text
Instance

↓

Constructor.prototype

↓

Parent.prototype

↓

Object.prototype

↓

null
```

---

# Important Relationships

```javascript
function Person(){}

const p = new Person();
```

```javascript
Object.getPrototypeOf(p) === Person.prototype        // true

p.__proto__ === Person.prototype                     // true

Person.__proto__ === Function.prototype              // true

Person.prototype.__proto__ === Object.prototype      // true
```

---

# Golden Rules

* Every object has `[[Prototype]]`.
* `__proto__` is a legacy way to access `[[Prototype]]`.
* Only functions have a `prototype` property.
* `new` sets `instance.[[Prototype]] = Constructor.prototype`.
* `extends` creates prototype links; it doesn't copy methods.
* `super()` calls the parent constructor.
* `super.method()` calls the parent method.
* `Object.create()` creates a new object with the specified prototype.

---

# Interview Questions

### What is a Prototype?

An object that JavaScript uses for inheritance when a property isn't found on the current object.

### What is the Prototype Chain?

The chain JavaScript traverses during property lookup until it reaches `null`.

### Difference between `prototype` and `__proto__`?

* `prototype` → Property on constructor functions used by `new`.
* `__proto__` → Legacy accessor to an object's internal `[[Prototype]]`.

### Are ES6 classes real classes?

No. They are syntactic sugar over constructor functions and the prototype system.

### Does `extends` copy methods?

No. It links `Child.prototype` to `Parent.prototype`.

### How does `new` work?

1. Create object
2. Link prototype
3. Execute constructor
4. Return object

### Does `Object.create()` copy properties?

No. It only creates a prototype link.

---

# One-Line Memory Tricks

* **Prototype → Shared methods**
* **`[[Prototype]]` → Inheritance**
* **`__proto__` → Access prototype (legacy)**
* **`prototype` → Used by `new`**
* **`extends` → Prototype linking**
* **`super()` → Parent constructor**
* **`Object.create()` → Create object with custom prototype**
