# React Native — Stack, Tab, and Drawer Navigation Together

## Overview

In real React Native applications, it is common to use **Drawer, Tab, and Stack navigators together**.

A common architecture is:

```text
Root Navigator
│
├── Auth Stack
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
└── App Drawer
    │
    ├── Main Tabs
    │   ├── Home Stack
    │   │   ├── Home
    │   │   ├── Product Details
    │   │   └── Checkout
    │   │
    │   ├── Orders Stack
    │   │   ├── Orders
    │   │   └── Order Details
    │   │
    │   └── Profile Stack
    │       ├── Profile
    │       └── Edit Profile
    │
    ├── Settings
    └── Help
```

## Responsibility of Each Navigator

| Navigator | Responsibility |
|---|---|
| Drawer | Major application sections / app-wide navigation |
| Tabs | Frequently accessed primary sections |
| Stack | Screens and detail flows within a section |

Think of it as:

```text
Drawer
  ↓
"What major area of the app?"

Tab
  ↓
"What primary section?"

Stack
  ↓
"What screen/detail within that section?"
```

## E-commerce Example

```text
Drawer
│
├── Main
│   │
│   ├── Home Tab
│   │   ├── Home
│   │   ├── Product Details
│   │   └── Reviews
│   │
│   ├── Orders Tab
│   │   ├── Orders
│   │   └── Order Details
│   │
│   └── Profile Tab
│       ├── Profile
│       └── Edit Profile
│
├── Settings
└── Help
```

### Drawer

Handles broad application areas:

```text
Main
Settings
Help
```

### Tabs

Inside Main, handles primary sections:

```text
Home | Orders | Profile
```

### Stack

Each tab can have its own Stack for drill-down navigation:

```text
Home
 ↓
Product Details
 ↓
Reviews
```

## Why This Architecture Works

Each navigator has a clear responsibility.

- `Home Tab → Product Details` is handled by the Home Stack.
- `Home Tab → Orders Tab` is handled by the Tab Navigator.
- `Main → Settings` is handled by the Drawer.

This keeps navigation logic organized.

## Important Rule: Don't Nest Unnecessarily

Do not add navigators simply because React Navigation supports nesting.

Avoid unnecessarily complex structures such as:

```text
Drawer
 ↓
Tab
 ↓
Stack
 ↓
Another Tab
 ↓
Another Stack
```

Design the hierarchy around the application's actual UX.

Ask:

> "What navigation relationship does this represent?"

Then choose the appropriate navigator.

## Back Navigation

Each navigator has a clear role in Back behavior.

For example:

```text
Home
 ↓
Product Details
 ↓
Reviews
```

Back:

```text
Reviews
 ↓
Product Details
 ↓
Home
```

The Home Stack manages this history.

Switching:

```text
Home Tab → Orders Tab
```

is handled by the Tab Navigator.

Opening:

```text
Drawer → Settings
```

is handled by the Drawer Navigator.

## Authentication

Authentication can sit above the application navigation:

```text
             Root
              │
        Authentication?
          /                 Auth          App
       Stack        Drawer
                       │
                     Tabs
                  /    |                   Stack Stack  Stack
```

When logged out:

```text
Auth Stack
├── Login
├── Register
└── Forgot Password
```

When logged in:

```text
App Drawer
└── Main Tabs
    ├── Home Stack
    ├── Orders Stack
    └── Profile Stack
```

This prevents authenticated screens from remaining in the active navigation tree after logout.

## Interview Answer

> "I would use the Drawer as the top-level navigation for major application sections, Tabs for the primary sections users switch between frequently, and a Stack inside each tab for screen-level navigation and detail flows. For example, the drawer could contain the main Tab navigator, and each tab could have its own Stack."

## Final Mental Model

```text
             Root
              │
        Authentication?
          /                 Auth          App
       Stack        Drawer
                       │
                     Tabs
                  /    |                   Stack Stack  Stack
```

### Simple Rule

```text
Drawer → Major areas
Tab    → Primary sections
Stack  → Screen/detail flow
```
