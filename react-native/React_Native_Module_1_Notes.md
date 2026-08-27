# React Native --- Module 1 Notes

## Module Overview

This module covers the fundamental concepts required to understand React
Native development and its modern runtime architecture.

### Topics

1.  What is React Native?
2.  React Native vs React.js
3.  React Native Architecture
4.  How React Native Works Internally
5.  Native vs Cross-platform Development
6.  Expo vs React Native CLI
7.  React Native Project Structure
8.  Metro Bundler
9.  Babel
10. JavaScript Thread and Native Side
11. JSX in React Native
12. Components
13. Props
14. State
15. Hooks
16. Component Lifecycle
17. Functional Components

------------------------------------------------------------------------

# 1. What is React Native?

## Introduction

React Native is a framework for building native mobile applications
using JavaScript/TypeScript and React.

Instead of writing the entire application separately in:

-   Kotlin/Java for Android
-   Swift/Objective-C for iOS

React Native allows developers to build much of the application using
React and JavaScript/TypeScript while integrating with native platform
capabilities.

## Core Idea

``` text
React / JavaScript / TypeScript
            |
            v
       React Native
            |
      +-----+-----+
      |           |
   Android       iOS
```

React Native does **not** mean that a web page is displayed inside a
mobile WebView.

React Native uses native platform UI and APIs.

## Key Characteristics

-   React-based development model
-   Native UI components
-   JavaScript/TypeScript application logic
-   Cross-platform development
-   Access to native APIs
-   Hot/Fast Refresh during development
-   Modern architecture based on Fabric, TurboModules, JSI, and Codegen

------------------------------------------------------------------------

# 2. React Native vs React.js

## React.js

React.js is primarily used for building user interfaces for the web.

``` jsx
<div>
  <h1>Hello</h1>
</div>
```

The result is rendered into the browser DOM.

## React Native

React Native is used for native mobile applications.

``` tsx
<View>
  <Text>Hello</Text>
</View>
```

The UI is represented using React Native components rather than HTML DOM
elements.

## Comparison

  React.js                 React Native
  ------------------------ ----------------------------
  Web applications         Native mobile applications
  Browser environment      Android/iOS
  DOM                      Native platform UI
  HTML elements            RN components
  CSS                      RN style system
  Browser APIs             Native/platform APIs
  React hooks/components   React hooks/components

## What is Shared?

The React programming model is largely shared:

-   Components
-   Props
-   State
-   Hooks
-   JSX
-   Context
-   Reconciliation
-   Declarative UI

## What Changes?

The rendering target changes.

``` text
React
  |
  +---- React DOM ----> Browser
  |
  +---- React Native -> Android/iOS
```

------------------------------------------------------------------------

# 3. React Native Architecture

Modern React Native uses the **New Architecture**.

Important building blocks include:

-   Hermes
-   JSI
-   Fabric
-   TurboModules
-   Codegen
-   Bridgeless mode

## High-Level Architecture

``` text
JavaScript / React
        |
      Hermes
        |
       JSI
    +---+---+
    |       |
 Fabric  TurboModules
    |       |
    +---+---+
        |
 Android / iOS
```

## Hermes

Hermes is a JavaScript engine optimized for React Native.

Its responsibility is primarily:

``` text
Execute JavaScript
```

Hermes is not the same thing as JSI.

``` text
Hermes -> JavaScript execution
JSI    -> JavaScript/native interoperability
```

## JSI

JSI stands for **JavaScript Interface**.

It provides an interface that allows JavaScript to interact with
native/C++ functionality more directly.

It is a fundamental part of the New Architecture.

## Fabric

Fabric is React Native's modern rendering system.

Conceptually:

``` text
React
  |
Fabric
  |
Native UI
```

## TurboModules

TurboModules are the modern native module system.

They allow JavaScript to access native functionality such as:

-   device APIs
-   storage
-   Bluetooth
-   camera
-   native SDKs

## Codegen

Codegen generates native/platform code from typed JavaScript/TypeScript
specifications.

It improves consistency between JavaScript and native interfaces and is
heavily used by the New Architecture.

## Legacy Architecture

The legacy architecture relied heavily on the asynchronous serialized
Bridge.

``` text
JavaScript
    |
  Bridge
    |
 Native
```

The Bridge required data serialization/deserialization and introduced
communication overhead.

## New Architecture

The New Architecture uses JSI-based interoperability and modern systems
such as:

``` text
JSI
 |
 +-- Fabric
 |
 +-- TurboModules
 |
 +-- Codegen
```

## Bridgeless Mode

Bridgeless mode removes the legacy Bridge infrastructure from the
runtime.

It is part of the evolution toward the modern React Native architecture.

Important:

``` text
New Architecture != no JavaScript
New Architecture != no native code
```

JavaScript and native code still coexist; the communication and
rendering architecture are modernized.

------------------------------------------------------------------------

# 4. How React Native Works Internally

The basic flow is:

``` text
Application Code
      |
      v
React
      |
      v
React Native Runtime
      |
      +---- Rendering ---> Native UI
      |
      +---- Native APIs -> Native Modules
```

## Example

``` tsx
function App() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
```

React processes the component tree.

React Native's rendering system then coordinates the corresponding
native UI.

The important distinction is:

``` text
JSX
  |
React elements
  |
React rendering
  |
Native UI
```

JSX does not directly create an Android/iOS view.

------------------------------------------------------------------------

# 5. Native vs Cross-platform Development

## Native Development

A native application is developed specifically for a platform.

For example:

``` text
Android -> Kotlin/Java
iOS     -> Swift/Objective-C
```

### Advantages

-   Maximum platform control
-   Direct access to platform APIs
-   Excellent platform-specific performance
-   Easy integration with platform-specific features

### Disadvantages

-   Separate codebases
-   Higher development cost
-   More maintenance
-   Developers may need multiple platform skill sets

## Cross-platform Development

A cross-platform framework allows developers to share a large portion of
application code across platforms.

React Native:

``` text
Shared React/TypeScript
       |
   React Native
    /       \
Android     iOS
```

### Advantages

-   Code sharing
-   Faster development
-   Lower maintenance cost
-   Shared business logic
-   One React-based development model

### Disadvantages

-   Some platform-specific code is still necessary
-   Native SDK integration may require native knowledge
-   Platform differences must still be handled
-   Framework/tooling abstractions can introduce complexity

## Important Point

Cross-platform does **not** mean:

> "Write once and never think about Android/iOS."

Experienced React Native developers still need to understand native
platform behavior.

------------------------------------------------------------------------

# 6. Expo vs React Native CLI

## Expo

Expo provides tooling and services around React Native development.

It simplifies:

-   Project creation
-   Development
-   Native configuration
-   Builds
-   Device testing
-   Common native functionality

Expo is generally a good choice when you want a faster development
experience and do not need extensive custom native configuration
immediately.

## React Native Community CLI

The React Native CLI approach gives more direct control over the native
Android/iOS projects.

You typically work directly with:

``` text
android/
ios/
```

and their native configuration.

## Comparison

  Expo                      React Native CLI
  ------------------------- ---------------------------------------
  Higher-level tooling      More direct native control
  Faster setup              More manual configuration
  Strong managed tooling    Full native project access
  Excellent for many apps   Useful for custom native requirements

Modern Expo can also support projects that need native code, so the old
idea that "Expo means no native code" is no longer accurate.

------------------------------------------------------------------------

# 7. React Native Project Structure

A typical project can contain:

``` text
my-app/
├── android/
├── ios/
├── src/
├── assets/
├── App.tsx
├── package.json
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── ...
```

## Important Files/Folders

### `android/`

Android native project.

Contains Android-specific configuration and native code.

### `ios/`

iOS native project.

Contains iOS-specific configuration and native code.

### `src/`

Usually contains application source code.

A project may organize it into:

``` text
src/
├── components/
├── screens/
├── navigation/
├── hooks/
├── services/
├── utils/
└── types/
```

This is a convention, not a strict React Native requirement.

### `App.tsx`

Common entry component for the application UI.

### `package.json`

Contains:

-   dependencies
-   scripts
-   project metadata

### `babel.config.js`

Babel configuration.

### `metro.config.js`

Metro configuration.

### `tsconfig.json`

TypeScript configuration.

------------------------------------------------------------------------

# 8. Metro Bundler

Metro is the JavaScript bundler used by React Native.

Its responsibilities include:

-   Module resolution
-   Dependency graph construction
-   JavaScript transformation pipeline
-   Bundling
-   Caching
-   Development server functionality
-   Supporting Fast Refresh workflows

## Mental Model

``` text
Source files
    |
    v
  Metro
    |
    +--> Resolve dependencies
    |
    +--> Transform modules
    |
    +--> Build dependency graph
    |
    v
 JavaScript bundle
```

## Metro vs Babel

This distinction is important:

``` text
Babel -> transforms source code

Metro -> resolves modules and bundles the application
```

Metro uses the project's transformation pipeline, which includes Babel
for appropriate source transformation.

## Metro vs Hermes

``` text
Metro
  -> builds/processes the JavaScript bundle

Hermes
  -> executes JavaScript
```

------------------------------------------------------------------------

# 9. Babel

Babel is a JavaScript transformation tool.

In React Native, Babel is used as part of Metro's transformation
pipeline.

It can transform syntax such as:

-   JSX
-   TypeScript syntax
-   JavaScript syntax according to project configuration

## Babel Does Not Bundle

``` text
Babel -> transform
Metro -> bundle
Hermes -> execute
```

## Babel Does Not Type Check

Babel can remove TypeScript type syntax, but it does not perform
TypeScript type checking.

``` text
Babel
  -> syntax transformation

TypeScript tooling
  -> type checking
```

## Babel Preset

A preset is a predefined collection of Babel plugins/configuration.

React Native projects normally use the React Native Babel preset.

## Babel Plugin

A plugin provides a specific transformation or behavior.

## Configuration

Common file:

``` text
babel.config.js
```

------------------------------------------------------------------------

# 10. JavaScript Thread and Native Side

React Native applications involve JavaScript execution and native
platform systems.

## JavaScript Side

The JavaScript side runs:

-   React application logic
-   State management
-   Hooks
-   Event handlers
-   Business logic
-   JavaScript computations

Hermes commonly executes this JavaScript.

## Native Side

The native side includes:

-   Android/iOS APIs
-   Native UI
-   Platform services
-   Native modules
-   Native SDK integrations

## Legacy Communication Model

Historically:

``` text
JavaScript
    |
 Bridge
    |
 Native
```

The Bridge serialized messages between JavaScript and native.

## Modern Model

The New Architecture uses JSI-based interoperability with systems such
as Fabric and TurboModules.

``` text
JavaScript
    |
   JSI
   / \
Fabric TurboModules
```

## JS Thread Blocking

Expensive synchronous JavaScript can block JavaScript execution.

Examples:

``` js
hugeArray.sort();
hugeArray.map(expensiveFunction);
```

or:

``` js
for (let i = 0; i < veryLargeNumber; i++) {
  // expensive work
}
```

Potential effects:

-   Delayed event handling
-   Delayed JS-driven updates
-   Dropped frames
-   Unresponsive interactions

## Important Clarification

Blocking JavaScript does not necessarily mean that every native/UI
operation stops. Native and UI work can continue independently in many
cases, but work that depends on JavaScript can be delayed.

## Async vs Multithreading

This is an important distinction:

``` text
async/await != automatically another thread
```

An asynchronous API can avoid blocking while waiting for external work,
but CPU-heavy synchronous JavaScript still executes on the JavaScript
execution environment.

------------------------------------------------------------------------

# 11. JSX in React Native

JSX is syntax used to describe React elements.

It is **not HTML**.

Example:

``` tsx
<View>
  <Text>Hello</Text>
</View>
```

These are React Native components, not DOM elements.

## React Web vs React Native

Web:

``` jsx
<div>
  <h1>Hello</h1>
</div>
```

React Native:

``` tsx
<View>
  <Text>Hello</Text>
</View>
```

## Raw Text

Text should normally be rendered inside `Text`.

``` tsx
<View>
  <Text>Hello</Text>
</View>
```

rather than:

``` tsx
<View>
  Hello
</View>
```

## JSX Expressions

JavaScript expressions can be placed inside `{}`.

``` tsx
<Text>{name}</Text>
```

``` tsx
<Text>{count + 1}</Text>
```

``` tsx
<Text>{user?.name}</Text>
```

## Conditional Rendering

``` tsx
{isLoading ? (
  <ActivityIndicator />
) : (
  <Text>Loaded</Text>
)}
```

or:

``` tsx
{error && <Text>{error}</Text>}
```

## Lists

``` tsx
{users.map(user => (
  <Text key={user.id}>{user.name}</Text>
))}
```

For large lists, use virtualized components such as `FlatList`.

## Props in JSX

``` tsx
<Button
  title="Login"
  disabled={isLoading}
  onPress={handleLogin}
/>
```

JSX attributes become component props.

## Children

``` tsx
<Card>
  <Text>Hello</Text>
</Card>
```

The content becomes the `children` prop.

## Fragments

``` tsx
<>
  <Text>Hello</Text>
  <Text>World</Text>
</>
```

Fragments allow multiple elements without adding an additional native
container.

## Styles

React Native styles are JavaScript objects:

``` tsx
<View
  style={{
    padding: 20,
    backgroundColor: "white",
  }}
/>
```

or:

``` tsx
<View style={styles.container} />
```

CSS property names generally use camelCase:

``` text
backgroundColor
fontSize
marginTop
```

## Capitalization

Capitalized names represent components:

``` tsx
<UserCard />
```

Lowercase names represent intrinsic element names.

------------------------------------------------------------------------

# 12. Components

A component is a reusable unit of UI and behavior.

``` tsx
function UserCard() {
  return (
    <View>
      <Text>Anil</Text>
    </View>
  );
}
```

Use it:

``` tsx
<UserCard />
```

## Built-in React Native Components

Examples:

``` text
View
Text
Image
ScrollView
FlatList
Pressable
TextInput
Button
```

## Custom Components

Examples:

``` text
UserCard
ProductCard
LoginForm
Header
```

## Component Composition

Large applications are built by composing smaller components.

``` tsx
<App>
  <Header />
  <ProductList />
  <Footer />
</App>
```

## Good Component Design

A component should have a clear responsibility.

Avoid unnecessarily large components containing:

-   UI
-   API logic
-   state management
-   validation
-   formatting
-   navigation
-   unrelated business logic

These responsibilities can often be separated into components, hooks,
and services.

------------------------------------------------------------------------

# 13. Props

Props are inputs passed from parent to child.

``` tsx
<UserCard
  name="Anil"
  age={25}
/>
```

Child:

``` tsx
function UserCard({ name, age }) {
  return (
    <Text>
      {name} - {age}
    </Text>
  );
}
```

## Props Are Read-only

A child should not mutate its props.

``` tsx
function User({ name }) {
  // name = "Changed"; // incorrect
}
```

The parent controls the prop value.

## Props Can Contain

-   Strings
-   Numbers
-   Booleans
-   Objects
-   Arrays
-   Functions
-   React elements

Example:

``` tsx
<User
  name="Anil"
  user={user}
  onPress={handlePress}
/>
```

## Callback Props

A parent can pass a function:

``` tsx
<Child onDelete={handleDelete} />
```

The child can call it:

``` tsx
onDelete();
```

This is a common pattern for communicating user intent from child to
parent.

## Props vs State

  Props                                State
  ------------------------------------ --------------------------
  Passed into component                Managed by component
  Parent controls value                Component controls value
  Read-only from child's perspective   Can change
  External input                       Internal/reactive data

------------------------------------------------------------------------

# 14. State

State is data managed by a component that can change over time and
affect rendering.

``` tsx
const [count, setCount] = useState(0);
```

Update:

``` tsx
setCount(1);
```

Flow:

``` text
State update
    |
    v
React schedules update
    |
    v
Component participates in rendering
    |
    v
UI reflects new state
```

## Don't Mutate State Directly

Incorrect:

``` js
user.name = "John";
```

Correct:

``` js
setUser({
  ...user,
  name: "John",
});
```

Array example:

``` js
setUsers([
  ...users,
  newUser,
]);
```

## Functional State Updates

When the new state depends on the previous state:

``` tsx
setCount(prev => prev + 1);
```

Multiple updates can then correctly build on the latest state:

``` tsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

## State Is Per Component Instance

If the same component is rendered twice:

``` tsx
<UserCard />
<UserCard />
```

each instance has its own local state.

------------------------------------------------------------------------

# 15. Hooks

Hooks allow function components to use React features.

Important hooks:

``` text
useState
useEffect
useContext
useRef
useMemo
useCallback
useReducer
useLayoutEffect
```

## useState

``` tsx
const [name, setName] = useState("");
```

Used for local state.

## useEffect

Used to synchronize with external systems.

``` tsx
useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

Typical use cases:

-   API synchronization
-   subscriptions
-   event listeners
-   timers
-   external systems

The cleanup function releases resources or reverses the setup.

## Dependencies

``` tsx
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

The effect is synchronized again when `userId` changes.

## useRef

Stores a mutable value without causing a render when the value changes.

React Native example:

``` tsx
const inputRef = useRef(null);

<TextInput ref={inputRef} />

inputRef.current?.focus();
```

Other uses:

-   timers
-   previous values
-   mutable values
-   native component references

## useMemo

Memoizes a calculated value.

``` tsx
const filteredUsers = useMemo(
  () => users.filter(user => user.active),
  [users]
);
```

Use when the calculation is sufficiently expensive or referential
stability matters.

Do not use it automatically everywhere.

## useCallback

Memoizes a function reference.

``` tsx
const handlePress = useCallback(() => {
  submitForm();
}, []);
```

It can be useful when function identity affects child rendering or
dependency behavior.

Do not assume it is always a performance optimization.

## useReducer

Useful for complex state transitions.

``` tsx
const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

Example:

``` tsx
dispatch({
  type: "SUCCESS",
  payload: data,
});
```

## Rules of Hooks

Hooks must:

1.  Be called at the top level.
2.  Not be called inside loops.
3.  Not be called inside conditions.
4.  Be called from React function components or custom hooks.

Incorrect:

``` tsx
if (isLoggedIn) {
  useEffect(() => {});
}
```

## Custom Hooks

Custom hooks extract reusable stateful logic.

``` tsx
function useUser(userId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user
  }, [userId]);

  return user;
}
```

Then:

``` tsx
const user = useUser(userId);
```

Custom hooks share **logic**, not UI.

------------------------------------------------------------------------

# 16. Component Lifecycle

For functional components, the basic lifecycle can be understood as:

``` text
Mount
  |
Update
  |
Unmount
```

Modern React should be understood through rendering, committing, and
effect synchronization rather than simply mapping everything to old
class lifecycle methods.

## Mount

The component appears for the first time.

``` text
Render
  |
Commit
  |
Effects
```

## Update

State or props change.

``` text
State/props change
      |
      v
    Render
      |
      v
    Commit
      |
      v
Relevant effects
```

## Unmount

The component is removed.

Effect cleanup is used to release resources:

``` tsx
useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Render vs Commit

### Render

React calculates what the UI should look like.

``` text
Props/state
    |
  Render
    |
React element tree
```

### Commit

React applies the required changes.

``` text
Render result
     |
   Commit
     |
UI changes
```

A render does not necessarily mean that visible native UI changes are
required.

------------------------------------------------------------------------

# 17. Functional Components

Functional components are the standard approach for modern React Native
development.

``` tsx
function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
```

or:

``` tsx
const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
```

They can use hooks:

``` tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button
      title={`${count}`}
      onPress={() => setCount(c => c + 1)}
    />
  );
}
```

## Functional vs Class Components

  Functional                 Class
  -------------------------- ------------------------------------------
  Modern approach            Older/legacy approach
  Hooks                      Lifecycle methods
  Functions                  Classes
  Easier logic composition   More verbose
  Preferred for new code     Mostly encountered in existing codebases

## Important

A functional component should not normally be called manually:

``` js
Counter(); // incorrect
```

React invokes components as part of its rendering process.

------------------------------------------------------------------------

# Interview Quick Revision

## What is React Native?

A React-based framework for building native Android and iOS applications
using JavaScript/TypeScript.

## React Native vs React.js?

React.js targets the browser/DOM, while React Native targets native
mobile platforms.

## What is Hermes?

A JavaScript engine optimized for React Native.

## What is JSI?

An interface enabling JavaScript/native interoperability, especially
important in the New Architecture.

## What is Fabric?

React Native's modern rendering system.

## What are TurboModules?

The modern native module system.

## What is Codegen?

A system that generates native code/interfaces from typed
specifications.

## What is Bridgeless mode?

A runtime mode that removes the legacy Bridge infrastructure.

## What is Metro?

React Native's JavaScript bundler and development server/tooling
pipeline.

## What is Babel?

A source-code transformation tool used as part of Metro's transformation
pipeline.

## Does Babel bundle?

No. Metro handles bundling.

## Does Babel type-check TypeScript?

No. TypeScript tooling handles type checking.

## What is the JS thread?

The execution environment where React/JavaScript application logic runs.

## What happens if JS is blocked?

JavaScript-dependent work can be delayed, causing responsiveness
problems and potentially dropped frames.

## What are props?

Read-only inputs passed into a component.

## What is state?

Reactive data managed by a component.

## What are hooks?

Functions that let function components use React features such as state,
effects, refs, and context.

## What is a custom hook?

Reusable stateful logic extracted into a function following the Hooks
rules.

## What are the basic component lifecycle stages?

Mount, update, and unmount.

------------------------------------------------------------------------

# Module 1 --- Final Checklist

-   [x] What is React Native?
-   [x] React Native vs React.js
-   [x] React Native Architecture
-   [x] How React Native works internally
-   [x] Native vs cross-platform development
-   [x] Expo vs React Native CLI
-   [x] Project structure
-   [x] Metro bundler
-   [x] Babel
-   [x] JavaScript thread and native side
-   [x] JSX
-   [x] Components
-   [x] Props
-   [x] State
-   [x] Hooks
-   [x] Component lifecycle
-   [x] Functional components

# Module 1 Summary

The most important mental model from this module is:

``` text
React Components
      |
     JSX
      |
 React rendering model
      |
 React Native
      |
 +----+----------------+
 |                     |
JS / Hermes        Native platform
 |                     |
JSI               Android / iOS
 |                     |
 +---------+-----------+
           |
      Fabric / Native
      platform systems
```

For experienced React Native interviews, you should be able to explain
not only how to write components, props, state, and hooks, but also how
JavaScript, the runtime, Metro, the rendering system, and native
platform code fit together.
