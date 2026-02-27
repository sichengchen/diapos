# Navigation

## DeckContext / DeckState

```ts
interface DeckState {
  currentIndex: number
  totalSlides: number
  direction: 'forward' | 'backward'
  notes: Record<number, ReactNode>
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}
```

### Behavior

- `currentIndex` is React state (`useState`).
- `direction` is a ref — updates synchronously before `setCurrentIndex`, piggybacks on the next render.
- `next()`, `prev()`, `goTo()` are `useCallback`-stabilized.
- `goTo()` clamps the index to `[0, totalSlides - 1]`.
- The full `DeckState` value is `useMemo`-memoized.

### Access

```ts
import { useDeck } from 'diapos'
const deckState = useDeck() // throws if outside <Deck>
```

## Keyboard Navigation

Installed by `useKeyboardNavigation(deckState)` inside `DeckInner`.

| Key(s) | Action |
|--------|--------|
| `ArrowRight`, `ArrowDown`, `Space` | `next()` |
| `ArrowLeft`, `ArrowUp` | `prev()` |
| `Home` | `goTo(0)` |
| `End` | `goTo(totalSlides - 1)` |

Ignores events when `target` is `INPUT`, `TEXTAREA`, or `contentEditable`.

## Fullscreen

Installed by `useFullscreen(deckRef)` inside `DeckInner`.

- Press `F` to toggle fullscreen (ignores input/textarea/contentEditable).
- `useFullscreen` returns `{ isFullscreen, toggle }`.

## Click Navigation

Inside `DeckInner`, clicking the right half of the deck calls `next()`, left half calls `prev()`. Interactive elements (`button`, `a`, `input`, `textarea`, `select`, `[role="button"]`) are excluded via `closest()`.

Disabled when `clickNavigation={false}`.

## BroadcastChannel Sync

### `useSyncChannel(deckState, role)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `deckState` | `DeckState \| null` | Null disables the channel |
| `role` | `'presenter' \| 'projector'` | This tab's role |

### Messages

```ts
type SyncMessage =
  | { type: 'navigate'; index: number }
  | { type: 'sync-request' }
```

### Protocol

1. **Presenter** auto-broadcasts `{ type: 'navigate', index }` on every `currentIndex` change.
2. **Projector** sends `{ type: 'sync-request' }` on mount and again when the tab regains focus/visibility.
3. **Presenter** responds to `sync-request` with `{ type: 'navigate', index: currentIndex }`.
4. Both sides deduplicate with `lastBroadcastRef` to avoid echo loops.

### Channel Name

`diapos-sync` (hardcoded).

## Router

```ts
import { DiaposRouter, useRoute } from 'diapos'
type DiaposRoute = 'projector' | 'presenter'
```

- Hash-based: `/#/projector` → `'projector'`, everything else (including no hash and `/#/presenter`) → `'presenter'`.
- `DiaposRouter` accepts `{ projector: ReactNode, presenter: ReactNode }` and renders the matching view.
- `useRoute()` returns the current `DiaposRoute` and re-renders on hash change.
