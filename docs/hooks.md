# Hooks

## `useDeck()`

Access the deck navigation state. Must be used inside a `<Deck>`, `<PresenterView>`, or `<ProjectorView>`.

```tsx
import { useDeck } from 'diapos'

function MyComponent() {
  const { currentIndex, totalSlides, direction, next, prev, goTo } = useDeck()
  return <span>Slide {currentIndex + 1} of {totalSlides}</span>
}
```

### Return Type: `DeckState`

| Property | Type | Description |
|----------|------|-------------|
| `currentIndex` | `number` | 0-based index of the active slide |
| `totalSlides` | `number` | Total number of slides |
| `direction` | `'forward' \| 'backward'` | Direction of the last navigation |
| `notes` | `Record<number, ReactNode>` | Notes keyed by slide index |
| `next()` | `() => void` | Go to next slide (clamped) |
| `prev()` | `() => void` | Go to previous slide (clamped) |
| `goTo(index)` | `(index: number) => void` | Jump to a specific slide (clamped) |

## `useNotes()`

Access speaker notes for the current and next slides.

```tsx
import { useNotes } from 'diapos'

function NotesPanel() {
  const { current, next } = useNotes()
  return (
    <div>
      <h3>Current Notes</h3>
      <p>{current ?? 'No notes'}</p>
      <h3>Up Next</h3>
      <p>{next ?? 'No notes'}</p>
    </div>
  )
}
```

### Return Type

| Property | Type | Description |
|----------|------|-------------|
| `current` | `ReactNode \| null` | Notes for the current slide |
| `next` | `ReactNode \| null` | Notes for the next slide |

## `usePause()`

Hook for progressive reveal. Returns a visibility style object. Used internally by theme components — call it when building custom pauseable components.

```tsx
import { usePause } from 'diapos'

function MyComponent({ pause, children }: { pause?: boolean; children: React.ReactNode }) {
  const { style } = usePause(pause)
  return <div style={style}>{children}</div>
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `pause` | `boolean \| undefined` | Whether this component participates in progressive reveal |

### Return Type

| Property | Type | Description |
|----------|------|-------------|
| `style` | `CSSProperties` | `{ visibility: 'hidden' }` until revealed, `{}` otherwise |

Behavior:
- If `pause` is falsy: always visible, no pause index consumed
- If `pause` is truthy inside a `<Slide>`: consumes a pause index, hidden until revealed by navigation
- If `pause` is truthy outside a pause provider: always visible (fallback)

Each `pause` element adds one sub-step to the slide. A slide with N paused elements becomes N+1 navigation steps (the base slide plus one reveal per pause).

## `useTheme()`

Access the current theme object.

```tsx
import { useTheme } from 'diapos'

function MyComponent() {
  const theme = useTheme()
  return <div style={{ color: theme.colors.accent }}>Accent</div>
}
```

Returns the full `Theme` object. Prefer using CSS custom properties (`var(--diapos-accent)`) over this hook when possible — they cascade naturally with per-slide overrides.

## `useFullscreen()`

Toggle fullscreen mode for a DOM element.

```tsx
import { useFullscreen } from 'diapos'
import { useRef } from 'react'

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)
  const { isFullscreen, toggle } = useFullscreen(ref)

  return (
    <div ref={ref}>
      <button onClick={toggle}>
        {isFullscreen ? 'Exit' : 'Enter'} Fullscreen
      </button>
    </div>
  )
}
```

### Return Type

| Property | Type | Description |
|----------|------|-------------|
| `isFullscreen` | `boolean` | Whether the element is fullscreen |
| `toggle()` | `() => void` | Toggle fullscreen state |

Inside `<Deck>`, press `F` to toggle fullscreen (handled automatically).

## `useSyncChannel()`

Low-level hook for BroadcastChannel sync between tabs. Used internally by `<Deck>`, `<PresenterView>`, and `<ProjectorView>`.

```tsx
import { useSyncChannel } from 'diapos'

const { broadcast } = useSyncChannel(deckState, 'presenter')
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `deckState` | `DeckState \| null` | Deck state (`null` to disable) |
| `role` | `'presenter' \| 'projector'` | This tab's role |

The presenter broadcasts on navigation. The projector receives and follows, re-syncs on focus/visibility, and retries until it hears from the presenter. Most users should use `<PresenterView>` and `<ProjectorView>` instead of this hook directly.

## `useRoute()`

Returns the current route based on the URL hash.

```tsx
import { useRoute } from 'diapos'

const route = useRoute() // 'projector' | 'presenter'
```

Updates when the hash changes. Returns `'projector'` if the hash is `#/projector`, otherwise `'presenter'`.
