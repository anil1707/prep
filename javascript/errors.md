JavaScript Errors
-----------------
What is an Error?

An error is an unexpected condition that prevents a JavaScript program from executing correctly.

Errors can occur:

Before execution (during parsing)
During execution (runtime)
Types of JavaScript Errors
JavaScript Errors
│
├── Syntax Errors (Compile Time)
│
└── Runtime Errors
      │
      ├── ReferenceError
      ├── TypeError
      ├── RangeError
      ├── URIError
      ├── EvalError
      ├── AggregateError
      └── Custom Errors
1. SyntaxError
Definition

A SyntaxError occurs when the JavaScript parser encounters code that violates JavaScript grammar.

The parser detects it before execution begins.

Example 1
let = x 10;

Output

SyntaxError: Unexpected token '='
Example 2
if ( {
    console.log("Hello");
}

Output

SyntaxError: Unexpected token '{'
Key Points
Occurs during parsing.
Program execution never starts.
Cannot be caught with try...catch if the script itself contains invalid syntax.

2. ReferenceError
Definition

A ReferenceError occurs when JavaScript tries to access a variable that doesn't exist in the current scope or is not accessible.

Example 1
console.log(age);

Output

ReferenceError: age is not defined
Example 2
function test() {
    let x = 10;
}

console.log(x);

Output

ReferenceError
Example 3 (TDZ)
console.log(a);

let a = 10;

Output

ReferenceError:
Cannot access 'a' before initialization

We'll understand this in detail when studying Hoisting and the Temporal Dead Zone (TDZ).

Common Causes
Variable not declared.
Accessing a block-scoped variable before initialization (let/const).
Accessing a variable outside its scope.

3. TypeError
Definition

A TypeError occurs when an operation is performed on a value of an inappropriate type.

Example 1
let user = null;

console.log(user.name);

Output

TypeError:
Cannot read properties of null
Example 2
const x = 10;

x();

Output

TypeError:
x is not a function
Example 3
undefined.toString();

Output

TypeError
Common Causes
Calling a non-function.
Accessing properties on null or undefined.
Using unsupported methods.

4. RangeError
Definition

A RangeError occurs when a value is outside the allowable range.

Example 1
new Array(-1);

Output

RangeError:
Invalid array length
Example 2
function test() {
    test();
}

test();

Output

RangeError:
Maximum call stack size exceeded
Common Causes
Invalid array size.
Infinite recursion.
Invalid numeric values for certain built-in APIs.
5. URIError

Definition

A URIError occurs when URI handling functions receive malformed input.

Example
decodeURIComponent("%");

Output

URIError:
URI malformed
Built-in URI Functions
encodeURI()
decodeURI()
encodeURIComponent()
decodeURIComponent()

6. EvalError
Definition

Historically associated with incorrect use of eval().

Modern JavaScript engines rarely throw it directly.

Interview Point

Know that it exists, but don't expect to encounter it in modern applications.

7. AggregateError
Definition

An AggregateError represents multiple errors combined into a single error object.

Common Usage
Promise.any()
Example
Promise.any([
    Promise.reject("Error A"),
    Promise.reject("Error B")
]);

Output

AggregateError

8. Error (Base Class)

All standard JavaScript errors inherit from the Error object.

Error
│
├── SyntaxError
├── ReferenceError
├── TypeError
├── RangeError
├── URIError
├── EvalError
└── AggregateError
Creating Custom Errors
Using Error
throw new Error("Something went wrong");

Output

Error: Something went wrong
Custom Validation
function validateAge(age) {
    if (age < 18) {
        throw new Error("Age must be at least 18.");
    }

    return "Eligible";
}

console.log(validateAge(16));

Output

Error:
Age must be at least 18.
throw Statement

The throw statement is used to explicitly raise an exception.

Syntax
throw expression;
Example
throw new Error("Network Error");
try...catch

Used to handle runtime errors gracefully.

try {
    console.log(user.name);
} catch (error) {
    console.log(error.message);
}
finally

The finally block executes regardless of whether an exception occurs.

try {
    console.log("Try");
} finally {
    console.log("Finally");
}

Output

Try
Finally
finally with return
function test() {
    try {
        return 10;
    } finally {
        console.log("Finally");
    }
}

console.log(test());

Output

Finally
10
Error Object Properties
try {
    throw new Error("Invalid Input");
} catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
}

Output (conceptually)

Error
Invalid Input
Stack Trace
Important Properties
Property	Description
name	Error type (e.g. TypeError)
message	Error message
stack	Stack trace showing where the error occurred
SyntaxError vs ReferenceError vs TypeError
Feature	SyntaxError	ReferenceError	TypeError
Occurs	During parsing	During execution	During execution
Cause	Invalid syntax	Variable not found or not accessible	Invalid operation on a value
Execution Starts	❌ No	✅ Yes	✅ Yes
Example	let = x 10	console.log(a)	null.name
Interview Questions
Q1. Can try...catch catch every JavaScript error?

No.

It can catch runtime errors.
It cannot catch syntax errors that prevent the script from being parsed.
Q2. Difference between throw and return?
throw	return
Throws an exception	Returns a value
Stops normal execution	Continues normal function flow
Handled by catch	Handled by the caller
Q3. Can we create custom errors?

Yes.

throw new Error("Custom Error");

You can also extend the built-in Error class for richer, application-specific errors.