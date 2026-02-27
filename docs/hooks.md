# Hooks

## `useDeck()`

Access the deck navigation state. Must be used inside a `<Deck>` component.

```tsx
import { useDeck } from 'diapos'

function MyComponent() {
  const { currentIndex, totalSlides, direction, notes, next, prev, goTo } = useDeck()
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

Access speaker notes for the current and next slides. Must be used inside a `<Deck>` component.

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

## `useTheme()`

Access the current theme object. Can be used inside a `<Deck>` or `ThemeProvider`.

```tsx
import { useTheme } from 'diapos'

function MyComponent() {
  const theme = useTheme()
  return <div style={{ color: theme.colors.accent }}>Accent</div>
}
```

Returns the full `Theme` object.

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
| `deckState` | `DeckState \| null` | Deck state (null to disable) |
| `role` | `'presenter' \| 'projector'` | This tab's role |

The presenter auto-broadcasts on navigation. The projector receives and follows, re-requests sync on focus/visibility, and retries sync requests until it receives presenter state. Most users should use the higher-level view components instead of this hook directly.
