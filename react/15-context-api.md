# Module 15 -- Context API ⭐⭐⭐⭐⭐

## Topics Covered

-   What is Context API?
-   Why Context API Exists
-   createContext()
-   Provider
-   Consumer
-   useContext()
-   Context Performance
-   Context Splitting
-   Context vs Redux
-   When NOT to use Context
-   Best Practices
-   Common Mistakes
-   Interview Questions
-   Quick Revision
-   Interview One-Liners
-   2-Minute Interview Answer

------------------------------------------------------------------------

# 1. What is Context API?

Context API is React's built-in mechanism for **sharing data across
multiple components without passing props through every intermediate
component (prop drilling).**

------------------------------------------------------------------------

# 2. Why React Created Context API

Without Context

``` text
App
 ↓
Dashboard
 ↓
Sidebar
 ↓
Menu
 ↓
UserProfile
```

If `App` owns the logged-in user, every intermediate component must pass
it down.

This is **Prop Drilling**.

Context solves this by allowing any descendant to access shared values
directly.

------------------------------------------------------------------------

# 3. createContext()

``` jsx
import { createContext } from "react";

export const ThemeContext = createContext();
```

Default value

``` jsx
const ThemeContext = createContext("light");
```

The default value is used only when no matching Provider exists.

------------------------------------------------------------------------

# 4. Provider

The Provider supplies the context value.

``` jsx
const [theme, setTheme] = useState("light");

<ThemeContext.Provider value={theme}>
    <App />
</ThemeContext.Provider>
```

Everything inside the Provider can access `theme`.

------------------------------------------------------------------------

# 5. Consumer

Older React versions used:

``` jsx
<ThemeContext.Consumer>
  {theme => <h1>{theme}</h1>}
</ThemeContext.Consumer>
```

Today, `useContext` is preferred.

------------------------------------------------------------------------

# 6. useContext()

``` jsx
import { useContext } from "react";

const theme = useContext(ThemeContext);
```

Flow

``` text
Component
   ↓
useContext()
   ↓
Nearest Provider
   ↓
Current Value
```

------------------------------------------------------------------------

# 7. Complete Example

``` jsx
import {
  createContext,
  useContext,
  useState
} from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Button() {
  const { theme } = useContext(ThemeContext);

  return <button>{theme}</button>;
}
```

------------------------------------------------------------------------

# 8. Real-world Use Cases

Context is ideal for:

-   Authentication
-   Theme
-   Language
-   Feature Flags
-   User Preferences
-   App Configuration

------------------------------------------------------------------------

# 9. Context Performance ⭐⭐⭐⭐⭐

Consider:

``` jsx
<AuthContext.Provider
  value={{ user, theme }}
>
  <App />
</AuthContext.Provider>
```

If `user` changes, the Provider value changes.

All components consuming **that context** re-render, even those that
only use `theme`.

Reason:

The Provider receives a **new value reference**.

------------------------------------------------------------------------

## Memoizing Provider Value

``` jsx
const value = useMemo(() => ({
  user,
  theme
}), [user, theme]);

<AuthContext.Provider value={value}>
  <App />
</AuthContext.Provider>
```

This prevents creating a new object when neither dependency changes.

------------------------------------------------------------------------

# 10. Context Splitting ⭐⭐⭐⭐⭐

Avoid

``` text
AppContext
 ├─ User
 ├─ Theme
 ├─ Cart
 ├─ Language
 └─ Permissions
```

Prefer

``` text
UserContext
ThemeContext
CartContext
LanguageContext
```

Benefits

-   Better separation of concerns
-   Fewer unnecessary re-renders
-   Easier maintenance

------------------------------------------------------------------------

# 11. When NOT to Use Context

Avoid Context for:

-   Frequently changing global values
-   Large server-state caches
-   Complex application state

Better alternatives

-   Redux Toolkit
-   Zustand
-   TanStack Query (server state)

------------------------------------------------------------------------

# 12. Context vs Redux Toolkit

  Context API                     Redux Toolkit
  ------------------------------- ------------------------
  Built into React                External library
  Solves prop drilling            Full state management
  Simple setup                    Better for large apps
  No middleware                   Middleware support
  Best for shared global values   Best for complex state

------------------------------------------------------------------------

# 13. Best Practices

-   Create separate contexts for separate concerns.
-   Memoize Provider values when useful.
-   Keep Providers close to where they're needed.
-   Expose custom Hooks like `useAuth()` or `useTheme()` for cleaner
    usage.

------------------------------------------------------------------------

# 14. Common Mistakes

❌ Putting unrelated data into one Context.

❌ Creating a new object inline every render.

``` jsx
<Provider value={{ user, theme }}>
```

❌ Using Context for every type of state.

------------------------------------------------------------------------

# 15. Interview Questions

### What is Context API?

A built-in React feature for sharing values across a component tree
without prop drilling.

### What problem does it solve?

Prop drilling.

### Does Context replace Redux?

No. Context is for sharing values; Redux is a full state management
solution.

### Why do Context consumers re-render?

Because the Provider's value changes.

### How do you optimize Context?

-   Split contexts
-   Memoize Provider values
-   Keep contexts focused

------------------------------------------------------------------------

# 16. Quick Revision

``` text
createContext()
      ↓
Provider
      ↓
Shared Value
      ↓
useContext()
      ↓
Consumer

Use For
• Theme
• Auth
• Language
• Config

Avoid
• Huge App State
• High-frequency Updates
```

------------------------------------------------------------------------

# 17. Interview One-Liners

-   Context solves prop drilling.
-   `useContext` reads the nearest Provider's value.
-   Context consumers re-render when the Provider value changes.
-   Split contexts for better performance.
-   Context is not a replacement for Redux Toolkit.

------------------------------------------------------------------------

# 18. 2-Minute Interview Answer

> Context API is React's built-in solution for sharing data across the
> component tree without prop drilling. A Provider supplies a value, and
> descendant components access it using `useContext`. It's commonly used
> for authentication, themes, language, and configuration. One important
> consideration is that when the Provider's value changes, consumers of
> that context re-render. To optimize performance, I split unrelated
> concerns into separate contexts and memoize Provider values when
> appropriate. For simple shared state, Context works well, while for
> complex client state or server state I prefer Redux Toolkit or
> TanStack Query.
