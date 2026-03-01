# Hooks

All hooks are exported from `diapos`. They are the primary headless API for theme pack components.

**Sources:** `packages/diapos/src/core/hooks/`

## useDeck

```ts
function useDeck(): DeckState

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

Returns navigation state from `DeckContext`. Throws if used outside `<Deck>`.

- `currentIndex` is React state (`useState`).
- `direction` is a ref — updates synchronously before `setCurrentIndex`, piggybacks on the next render.
- `next()`, `prev()`, `goTo()` are `useCallback`-stabilized.
- `goTo()` clamps to `[0, totalSlides - 1]`.
- The full `DeckState` value is `useMemo`-memoized.

**Used by:** ProgressBar, SlideCounter, any deck-aware component.

## usePause

```ts
function usePause(pause?: boolean): { style: CSSProperties }
```

One-line integration for incremental reveal.

- If `pause` is falsy: returns empty style object `{}`. Does not consume a pause index.
- If `pause` is true AND inside `PauseProvider`: consumes an index from PauseContext. Returns `{ visibility: 'visible' }` or `{ visibility: 'hidden' }` based on whether the index is within `visibleUpTo`.
- If `pause` is true but outside PauseProvider: fallback to always visible.

Uses `useId()` for StrictMode-safe identity.

See [pause-system.md](pause-system.md) for the full pause/reveal architecture.

**Used by:** Heading, Text, BulletPoints, Enumerate, Item — any pauseable component.

## useTheme

```ts
function useTheme(): Theme
```

Returns the current Theme object from ThemeContext.

**Used by:** components needing programmatic token access.

## useFullscreen

```ts
function useFullscreen(elementRef: RefObject<HTMLElement | null>): {
  isFullscreen: boolean
  toggle: () => void
}
```

Toggles fullscreen on a ref element.

- `F` / `f` key triggers toggle (ignores events in input/textarea/contentEditable).
- Listens to `fullscreenchange` event to track state.

**Used by:** Deck (internal).

## useNotes

```ts
function useNotes(): { current: ReactNode | null; next: ReactNode | null }
```

Returns speaker notes for the current and next slide using `useDeck()`. Falls back to `null` if no notes exist.

**Used by:** PresenterView.

## useSyncChannel

```ts
function useSyncChannel(
  deckState: DeckState | null,
  role: 'presenter' | 'projector'
): { broadcast: (index: number) => void }
```

Presenter/projector sync via BroadcastChannel (channel name: `diapos-sync`).

**Message types:**

```ts
type SyncMessage =
  | { type: 'navigate'; index: number }
  | { type: 'sync-request' }
```

**Protocol:**

1. **Presenter** auto-broadcasts `{ type: 'navigate', index }` on every `currentIndex` change.
2. **Projector** sends `{ type: 'sync-request' }` on mount, retries every 1s until it receives state, and requests again on tab focus/visibility change.
3. **Presenter** responds to `sync-request` with `{ type: 'navigate', index: currentIndex }`.
4. Both sides deduplicate with `lastBroadcastRef` to avoid echo loops.

Null `deckState` disables the channel.

**Used by:** Deck (when `sync` prop is set), PresenterView.

## useKeyboardNavigation

```ts
function useKeyboardNavigation(deckState: DeckState): void
```

Installs document-level keyboard event handler.

| Key(s) | Action |
|---|---|
| `ArrowRight`, `ArrowDown`, `Space` | `next()` |
| `ArrowLeft`, `ArrowUp` | `prev()` |
| `Home` | `goTo(0)` |
| `End` | `goTo(totalSlides - 1)` |

Ignores events when target is `INPUT`, `TEXTAREA`, or `contentEditable`.

**Used by:** Deck (internal).
