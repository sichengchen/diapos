# Deck

The presentation engine. Manages slide parsing, navigation, transitions, sync, and chrome.

**Source:** `packages/diapos/src/core/Deck.tsx`

## Import

```ts
import { Deck } from 'diapos'
import type { DeckProps } from 'diapos'
```

## Props

```ts
interface DeckProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition           // default: 'fade'
  transitionDuration?: number       // default: 300
  clickNavigation?: boolean         // default: true
  progress?: ComponentType | false  // default: ProgressBar from default theme
  counter?: ComponentType | false   // default: SlideCounter from default theme
  decorator?: ComponentType         // default: undefined
  sync?: 'presenter' | 'projector' // default: undefined
  style?: CSSProperties
  className?: string
}
```

## Behavior

### Initialization

1. Calls `parseSlides(children)` to flatten children into a slide array and extract notes. See [pause-system.md](pause-system.md) for how parseSlides handles pause expansion.
2. Wraps everything in `ThemeProvider` (with `theme` prop or `defaultTheme`).
3. Wraps in `DeckProvider` (passing `totalSlides` and `notes`).
4. Renders `DeckInner` which handles the actual slide display.

### Rendering

`DeckInner` renders a full-viewport container (`100vw` x `100vh`) with:

- Background color from `--diapos-bg`
- Text color from `--diapos-fg`
- The current slide wrapped in `TransitionWrapper`
- The `decorator` component (if provided), rendered inside each slide's container
- The `progress` component (if not `false`), positioned at the bottom
- The `counter` component (if not `false`), positioned at bottom-right

### Chrome

Chrome components receive no props — they use `useDeck()` to read state.

- `progress` — defaults to the default theme's `ProgressBar`. Pass `false` to hide.
- `counter` — defaults to the default theme's `SlideCounter`. Pass `false` to hide.
- `decorator` — rendered inside each slide's container. Used for logos, footers, watermarks.

### Click Navigation

When `clickNavigation` is `true` (default):

- Clicking the right half of the deck calls `next()`
- Clicking the left half calls `prev()`
- Clicks on interactive elements are ignored: `button`, `a`, `input`, `textarea`, `select`, `[role="button"]` (checked via `closest()`)

### Keyboard & Fullscreen

`DeckInner` installs `useKeyboardNavigation` and `useFullscreen` hooks. See [hooks.md](hooks.md).

### Sync

When `sync` is set, `DeckInner` connects via `useSyncChannel`. See [hooks.md](hooks.md).

### Transitions

`TransitionWrapper` manages CSS class-based enter/exit animations.

| `transition` value | Enter class | Active class |
|---|---|---|
| `'fade'` | `diapos-transition-fade-enter` | `diapos-transition-fade-active` |
| `'slide'` | `diapos-transition-slide-enter-forward` / `-backward` | `diapos-transition-slide-active` |
| `'none'` | (none) | (none) |

Duration is controlled via the `--diapos-transition-duration` CSS custom property.

## Context

Deck provides two context layers:

- `ThemeContext` — theme tokens as CSS custom properties (via `ThemeProvider`)
- `DeckContext` — navigation state, methods, and notes (via `DeckProvider`)

## Valid Usage

```tsx
<Deck theme={myTheme}>
  <Slide>...</Slide>
  <Slide>...</Slide>
</Deck>

<Deck transition="slide" transitionDuration={500} progress={false}>
  <Slide>...</Slide>
</Deck>

<Deck decorator={WatermarkComponent}>
  <Slide>...</Slide>
</Deck>
```

## Constraints

- Must have at least one child.
- Only fragment wrappers and `<Section>` markers are unwrapped during parsing. Arbitrary wrapper components are not treated as implicit slides.
- Only one `<Deck>` per page.
