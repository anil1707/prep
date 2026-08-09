# Module 18 – Fiber Architecture ⭐⭐⭐⭐⭐

## Topics Covered

- Why Fiber was introduced
- Fiber Node
- Fiber Tree
- Scheduler
- Priority
- Interruptible Rendering
- Concurrent Rendering
- Render Phase vs Commit Phase
- Current and Work-in-Progress Trees
- Fiber vs Virtual DOM
- Fiber vs Reconciliation
- Best Practices
- Common Mistakes
- Interview Questions
- Quick Revision
- Interview One-Liners
- 2-Minute Interview Answer

---

# 1. Why React Introduced Fiber ⭐⭐⭐⭐⭐

Before React 16, React used the **Stack Reconciler**.

Rendering was synchronous:

```text
Start Rendering
      ↓
Component 1
      ↓
Component 2
      ↓
Component 3
      ↓
Finish
```

Once rendering started, React could not easily pause the work.

For large applications this could block the browser's main thread and cause:

- UI freezing
- Input lag
- Animation stuttering
- Poor responsiveness

Fiber was introduced in React 16 to make rendering work more flexible.

---

# 2. What is Fiber?

**Fiber is React's internal rendering architecture.**

It breaks rendering work into smaller units so React can:

- Pause work
- Resume work
- Prioritize work
- Restart work
- Abandon outdated work

### Interview Definition

> Fiber is React's internal architecture that represents rendering work as small units of work, enabling scheduling, prioritization, and interruptible rendering.

---

# 3. Fiber Node ⭐⭐⭐⭐⭐

A **Fiber Node** is an internal JavaScript object representing a React element/component and its rendering information.

Example:

```jsx
<App>
  <Header />
  <Dashboard />
  <Footer />
</App>
```

Conceptually:

```text
App Fiber
   ├── Header Fiber
   ├── Dashboard Fiber
   └── Footer Fiber
```

A Fiber Node can contain information such as:

- Component type
- Props
- State
- Parent relationship
- Child relationship
- Sibling relationship
- Effects/flags
- Alternate Fiber
- Rendering information

Conceptually:

```js
{
  type,
  props,
  child,
  sibling,
  return,
  alternate
}
```

The real Fiber structure is much more complex and is an internal React implementation detail.

---

# 4. Fiber Tree ⭐⭐⭐⭐⭐

All Fiber Nodes together form a **Fiber Tree** representing the React UI.

Example:

```text
App
│
├── Navbar
│
├── Home
│   ├── Card
│   └── Card
│
└── Footer
```

React maintains relationships between nodes using fields conceptually equivalent to:

- `child` → first child
- `sibling` → next sibling
- `return` → parent

---

# 5. Current Tree and Work-in-Progress Tree

React uses a concept similar to **double buffering**.

```text
Current Fiber Tree
        ↓
Currently committed UI

Work-in-Progress Fiber Tree
        ↓
New UI being prepared
```

React builds the new work-in-progress tree and, after the render work is complete, commits the required changes.

This allows React to prepare a new UI without immediately changing the currently displayed UI.

---

# 6. Scheduler ⭐⭐⭐⭐⭐

React needs to decide **which rendering work should happen and when**.

The scheduling system helps React coordinate work according to its urgency.

Conceptually:

```text
Updates
   ↓
Schedule Work
   ↓
Prioritize Work
   ↓
Perform Work
   ↓
Commit Result
```

Urgent user interactions should be kept responsive, while less urgent rendering work can be deferred.

---

# 7. Priority ⭐⭐⭐⭐⭐

Not every update has the same urgency.

Examples:

### Urgent

- Typing into an input
- Clicking a button
- Selecting a checkbox

### Less Urgent

- Rendering a large filtered result
- Preparing non-visible UI
- Updating secondary information

Modern React exposes APIs such as **transitions** to distinguish urgent updates from non-urgent updates.

The exact internal priority model is an implementation detail and should not be treated as a fixed public API.

---

# 8. Interruptible Rendering ⭐⭐⭐⭐⭐

The key benefit of Fiber is that rendering work can be broken into units.

Conceptually:

```text
Start Render
    ↓
Work Unit 1
    ↓
Work Unit 2
    ↓
Pause
    ↓
Handle More Urgent Work
    ↓
Resume / Restart
```

This helps prevent long rendering work from making the UI feel unresponsive.

---

# 9. Concurrent Rendering ⭐⭐⭐⭐⭐

Concurrent Rendering is a capability of modern React that allows React to work on rendering without blocking more urgent work unnecessarily.

It can:

- Start rendering
- Pause rendering
- Resume rendering
- Restart rendering
- Abandon outdated rendering work

### Important

**Concurrent Rendering does NOT mean JavaScript is running on multiple threads.**

React still runs JavaScript on the browser's main thread in typical client-side React applications.

The key idea is **interruptible and prioritized work**, not parallel execution.

---

# 10. Example of Interruptible Work

Suppose React is preparing a large result list.

```text
Render Search Results
        ↓
Large Amount of Work
```

The user types another character:

```text
New Input
```

React can prioritize the latest interaction and avoid spending unnecessary effort finishing outdated rendering work.

Conceptually:

```text
Render A
   ↓
New Update B
   ↓
Old Work May Be Abandoned
   ↓
Render Latest State
```

---

# 11. Render Phase vs Commit Phase ⭐⭐⭐⭐⭐

This is extremely important.

## Render Phase

React:

- Creates/updates the work-in-progress Fiber tree
- Calculates what should change
- Performs reconciliation
- Can pause or restart work

```text
Render Phase
     ↓
Calculate Changes
```

---

## Commit Phase

React applies the completed result.

```text
Commit Phase
     ↓
Apply DOM Changes
     ↓
Run Relevant Effects
```

The commit phase is treated as a synchronous phase and is not arbitrarily interrupted in the same way as render work.

---

# 12. Complete Rendering Flow

```text
State / Props / Context Update
            ↓
       Schedule Work
            ↓
      Render Phase
            ↓
 Build Work-in-Progress Fiber Tree
            ↓
       Reconciliation
            ↓
      Calculate Changes
            ↓
       Commit Phase
            ↓
     Update Host Environment
            ↓
        Browser UI
```

---

# 13. Fiber vs Virtual DOM

These concepts are related but **not the same**.

### Virtual DOM

A conceptual representation of the UI as React elements/objects.

### Fiber

The internal data structure and architecture React uses to represent work, component relationships, state, and rendering information.

Think:

```text
Virtual DOM
    ↓
What the UI should look like

Fiber
    ↓
How React organizes and processes rendering work
```

---

# 14. Fiber vs Reconciliation

### Reconciliation

The process of determining what changed between renders.

### Fiber

The architecture that allows React to represent and schedule that rendering work efficiently.

```text
Fiber Architecture
       ↓
Rendering Work
       ↓
Reconciliation
       ↓
Commit
```

---

# 15. Why Fiber Matters

Fiber provides the foundation for modern React capabilities such as:

- Interruptible rendering
- Concurrent rendering
- Transitions
- Suspense
- Improved scheduling
- More responsive UI

---

# 16. Common Interview Questions ⭐⭐⭐⭐⭐

### What is Fiber?

Fiber is React's internal rendering architecture introduced in React 16 that represents rendering work as units that can be scheduled and processed incrementally.

### Why was Fiber introduced?

The old stack reconciler performed rendering synchronously. Fiber was introduced to make rendering work interruptible and schedulable.

### What is a Fiber Node?

An internal object representing a React element/component and its associated rendering information.

### What is a Fiber Tree?

A tree of Fiber Nodes representing the React component hierarchy and rendering work.

### Can React pause rendering?

Modern React can interrupt rendering work during the **render phase** when scheduling requires it.

### Can the commit phase be interrupted?

The commit phase is synchronous. React does not arbitrarily pause it in the same way it can pause render work.

### Does Concurrent Rendering mean multi-threading?

No. Concurrent rendering is primarily about **interruptible, schedulable work**, not running React rendering simultaneously on multiple JavaScript threads.

### Is Fiber the Virtual DOM?

No. Fiber is React's internal architecture/data structure for organizing and processing rendering work.

---

# 17. Best Practices

Fiber is an internal implementation detail, so application code should generally not interact with Fiber directly.

Instead:

- Keep components reasonably focused.
- Avoid unnecessarily expensive synchronous JavaScript work.
- Use `React.memo`, `useMemo`, and `useCallback` only when profiling indicates they help.
- Use transitions for non-urgent updates when appropriate.
- Avoid blocking the main thread with expensive computations.

---

# 18. Common Mistakes

### ❌ "Fiber is the Virtual DOM."

Incorrect.

Fiber and Virtual DOM are related concepts but are not the same thing.

### ❌ "Concurrent rendering means multiple threads."

Incorrect.

Concurrent rendering is about scheduling and interruptible work.

### ❌ "Fiber automatically makes every application fast."

Incorrect.

Expensive application code can still block the main thread.

### ❌ "Commit phase can be paused like render phase."

Incorrect.

The commit phase is synchronous.

---

# 19. Quick Revision

```text
React 15
   ↓
Stack Reconciler
   ↓
Mostly Synchronous Rendering

React 16+
   ↓
Fiber Architecture
   ↓
Fiber Nodes
   ↓
Fiber Tree
   ↓
Scheduled / Incremental Work
   ↓
Interruptible Render Phase
   ↓
Commit Phase
```

---

# 20. Interview One-Liners

- Fiber is React's internal rendering architecture.
- Fiber was introduced with React 16.
- A Fiber Node represents a unit of React rendering information.
- Fiber enables React to schedule and interrupt render work.
- The render phase can be interrupted or restarted.
- The commit phase is synchronous.
- Concurrent rendering is not the same as multi-threading.
- Fiber and the Virtual DOM are related but not identical.
- Fiber is an internal implementation detail and should not be accessed directly.

---

# 21. 2-Minute Interview Answer

> Fiber is React's internal rendering architecture introduced in React 16 to replace the older stack reconciler. The main limitation of the stack reconciler was that rendering was synchronous and difficult to interrupt. Fiber represents rendering work as individual units and organizes them into a Fiber tree. This allows React to schedule work, prioritize more urgent updates, and interrupt or restart rendering during the render phase. After React finishes calculating the required changes, it enters the commit phase and applies those changes to the DOM. Fiber is the foundation that enables modern React capabilities such as concurrent rendering, transitions, and improved responsiveness. Concurrent rendering doesn't mean React uses multiple JavaScript threads; it means React can schedule and interrupt rendering work more intelligently.
