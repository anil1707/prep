# React Native — Phase 2: Core Components

## 18. View
Fundamental container/layout component, similar to `div` on the web.

```tsx
<View style={styles.container}>
  <Text>Hello</Text>
</View>
```

## 19. Text
Displays text.

```tsx
<Text style={styles.title}>Welcome</Text>
```

Common props: `style`, `numberOfLines`, `ellipsizeMode`, `onPress`, `selectable`.

## 20. Image
Displays local or remote images.

```tsx
<Image source={require('./assets/logo.png')} />
<Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />
```

Common props: `source`, `style`, `resizeMode`, `onLoad`, `onError`.

## 21. ImageBackground
Displays an image behind child content.

```tsx
<ImageBackground source={bg} style={styles.container}>
  <Text>Welcome</Text>
</ImageBackground>
```

Useful for hero sections, cards, and image-based backgrounds.

## 22. ScrollView
Makes content scrollable.

```tsx
<ScrollView>
  <Text>Content</Text>
</ScrollView>
```

It generally renders all children, so it is not ideal for very large lists.

Common props: `horizontal`, `showsVerticalScrollIndicator`, `contentContainerStyle`, `refreshControl`, `keyboardShouldPersistTaps`.

## 23. FlatList
Efficiently renders large lists using virtualization.

```tsx
<FlatList
  data={users}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={(item) => item.id}
/>
```

Important props: `data`, `renderItem`, `keyExtractor`, `ItemSeparatorComponent`, `ListHeaderComponent`, `ListFooterComponent`, `onEndReached`, `refreshing`, `onRefresh`.

**ScrollView vs FlatList:** ScrollView generally renders everything; FlatList virtualizes list items and is better for large/dynamic lists.

## 24. SectionList
Renders grouped/sectioned data.

```tsx
<SectionList
  sections={[
    { title: 'Fruits', data: ['Apple', 'Banana'] },
    { title: 'Vegetables', data: ['Carrot', 'Potato'] },
  ]}
  renderItem={({ item }) => <Text>{item}</Text>}
  renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
/>
```

Use for contacts by letter, products by category, messages by date, etc.

## 25. TextInput
Accepts user text input.

```tsx
const [email, setEmail] = useState('');

<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
/>
```

Important props: `value`, `onChangeText`, `placeholder`, `secureTextEntry`, `keyboardType`, `autoCapitalize`, `editable`, `multiline`, `maxLength`.

A controlled input uses `value` + `onChangeText`.

## 26. Pressable
Flexible component for press interactions.

```tsx
<Pressable onPress={handlePress}>
  <Text>Submit</Text>
</Pressable>
```

Important props: `onPress`, `onLongPress`, `onPressIn`, `onPressOut`, `disabled`, `hitSlop`, `delayLongPress`, `android_ripple`.

Pressed-state styling:

```tsx
<Pressable
  style={({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
  })}
>
  <Text>Submit</Text>
</Pressable>
```

Generally preferred when flexible interaction feedback is needed.

## 27. TouchableOpacity
Touch component with built-in opacity feedback.

```tsx
<TouchableOpacity
  activeOpacity={0.5}
  onPress={handlePress}
>
  <Text>Submit</Text>
</TouchableOpacity>
```

Important props: `onPress`, `onLongPress`, `onPressIn`, `onPressOut`, `activeOpacity`, `disabled`, `hitSlop`, `delayLongPress`.

`activeOpacity` controls opacity during a press.

## 28. TouchableHighlight
Touch component with highlight/underlay feedback.

```tsx
<TouchableHighlight
  underlayColor="lightgray"
  onPress={handlePress}
>
  <Text>Press Me</Text>
</TouchableHighlight>
```

Important props: `underlayColor`, `activeOpacity`, `onPress`, `onLongPress`, `onPressIn`, `onPressOut`, `disabled`, `hitSlop`.

Difference:
- `TouchableOpacity` → opacity changes
- `TouchableHighlight` → underlay/highlight appears
- `Pressable` → flexible/custom feedback

## 29. Switch
Boolean ON/OFF control.

```tsx
const [enabled, setEnabled] = useState(false);

<Switch
  value={enabled}
  onValueChange={setEnabled}
/>
```

Important props: `value`, `onValueChange`, `disabled`, `trackColor`, `thumbColor`, `ios_backgroundColor`.

`Switch` is controlled:
- ON → `true`
- OFF → `false`

## 30. ActivityIndicator
Displays an animated loading spinner.

```tsx
<ActivityIndicator size="large" />
```

Important props: `animating`, `size`, `color`, `hidesWhenStopped`.

Typical usage:

```tsx
{loading && <ActivityIndicator size="large" />}
```

For async operations, ensure loading is stopped in `finally`:

```tsx
try {
  setLoading(true);
  await fetchData();
} finally {
  setLoading(false);
}
```

## 31. Modal
Presents temporary UI above the current screen.

```tsx
<Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={() => setVisible(false)}
>
  <View>
    <Text>Are you sure?</Text>
  </View>
</Modal>
```

Important props: `visible`, `transparent`, `animationType`, `onRequestClose`, `onShow`, `presentationStyle`, `statusBarTranslucent`.

Common animation types: `none`, `fade`, `slide`.

`onRequestClose` is important for Android back-button handling.

## 32. KeyboardAvoidingView
Adjusts layout when the software keyboard appears.

```tsx
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <TextInput placeholder="Email" />
</KeyboardAvoidingView>
```

Important props: `behavior`, `keyboardVerticalOffset`.

Common behavior values: `padding`, `height`, `position`.

Important: it does **not** automatically scroll every focused input into view. For larger forms it is commonly combined with `ScrollView`.

## 33. SafeAreaView
Helps keep app content away from system UI such as notches and home indicators.

```tsx
<SafeAreaView style={{ flex: 1 }}>
  <Text>Home</Text>
</SafeAreaView>
```

Important distinction:
- `SafeAreaView` → protects app content from unsafe system areas
- `StatusBar` → controls status-bar appearance/behavior

For more flexible production safe-area handling, `react-native-safe-area-context` is commonly used, including `useSafeAreaInsets()`.

## 34. StatusBar
Controls the device status bar.

```tsx
<StatusBar barStyle="dark-content" />
```

Important props: `barStyle`, `backgroundColor`, `hidden`, `translucent`, `animated`.

`barStyle`:
- `dark-content` → dark icons/text
- `light-content` → light icons/text

Important distinction:
- `StatusBar` → system status-bar configuration
- `SafeAreaView` → safe placement of app content

Modern Android uses increasingly edge-to-edge layouts, so `backgroundColor` alone should not be treated as a universal solution for content positioning.

## 35. RefreshControl
Provides pull-to-refresh for scrollable content.

### ScrollView

```tsx
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  }
>
  {/* content */}
</ScrollView>
```

### FlatList

```tsx
<FlatList
  data={products}
  renderItem={renderItem}
  refreshing={refreshing}
  onRefresh={handleRefresh}
/>
```

Typical handler:

```tsx
const handleRefresh = async () => {
  try {
    setRefreshing(true);
    await fetchProducts();
  } finally {
    setRefreshing(false);
  }
};
```

Important distinction:
- Pull-to-refresh → reload current data
- Pagination → load additional data

`FlatList` commonly uses `onRefresh` for refresh and `onEndReached` for pagination.

---

# Important Comparisons

| Topic | Key Difference |
|---|---|
| ScrollView vs FlatList | ScrollView generally renders all children; FlatList virtualizes list items |
| FlatList vs SectionList | FlatList = single list; SectionList = grouped list |
| Pressable vs TouchableOpacity | Pressable = flexible; TouchableOpacity = opacity feedback |
| TouchableOpacity vs TouchableHighlight | Opacity vs underlay/highlight |
| KeyboardAvoidingView vs ScrollView | KeyboardAvoidingView adjusts layout; ScrollView provides scrolling |
| SafeAreaView vs StatusBar | SafeAreaView protects content; StatusBar controls system bar |

# Component Selection Cheat Sheet

```text
Container              → View
Text                    → Text
Image                   → Image
Image behind content   → ImageBackground
Scrollable content     → ScrollView
Large list              → FlatList
Grouped list            → SectionList
Text entry              → TextInput
Press interaction       → Pressable
Opacity touch feedback  → TouchableOpacity
Highlight feedback      → TouchableHighlight
Boolean ON/OFF          → Switch
Loading spinner         → ActivityIndicator
Overlay/dialog          → Modal
Keyboard-aware layout   → KeyboardAvoidingView
Safe screen edges       → SafeAreaView / safe-area-context
Status bar              → StatusBar
Pull-to-refresh         → RefreshControl
```

# Interview-Level Key Points

1. `FlatList` uses virtualization; `ScrollView` generally renders all children.
2. `SectionList` is for grouped data.
3. `Pressable` is the flexible modern press primitive.
4. `TouchableOpacity` provides opacity feedback.
5. `TouchableHighlight` provides underlay feedback.
6. `Switch` represents a boolean state.
7. `ActivityIndicator` represents loading state.
8. `Modal` presents temporary UI above the current screen.
9. `KeyboardAvoidingView` adjusts layout for the keyboard; it is not a scrolling solution.
10. Safe-area handling and status-bar configuration are different concerns.
11. `FlatList` supports pull-to-refresh through `refreshing` and `onRefresh`.
12. Pull-to-refresh and pagination are different mechanisms.

# Phase 2 Checklist

- [x] 18. View
- [x] 19. Text
- [x] 20. Image
- [x] 21. ImageBackground
- [x] 22. ScrollView
- [x] 23. FlatList
- [x] 24. SectionList
- [x] 25. TextInput
- [x] 26. Pressable
- [x] 27. TouchableOpacity
- [x] 28. TouchableHighlight
- [x] 29. Switch
- [x] 30. ActivityIndicator
- [x] 31. Modal
- [x] 32. KeyboardAvoidingView
- [x] 33. SafeAreaView
- [x] 34. StatusBar
- [x] 35. RefreshControl

**Phase 2 — Core Components complete.**
