# Deck

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
  transition?: 'none' | 'fade' | 'slide'  // default: 'fade'
  transitionDuration?: number              // default: 300
  clickNavigation?: boolean                // default: true
  showProgress?: boolean                   // default: true
  showCounter?: boolean                    // default: true
  sync?: 'presenter' | 'projector'         // default: undefined (no sync)
}
```

## Behavior

- Root component for a presentation. Must wrap all slides.
- Calls `Children.toArray(children)` to flatten the child tree into a slide array.
- Collects `notes` prop from each child element and builds a `Record<number, ReactNode>` mapping slide index to notes.
- Mounts `ThemeProvider` > `DeckProvider` > `DeckInner`.
- `DeckInner` renders only `slides[currentIndex]` wrapped in `TransitionWrapper`.
- Installs keyboard navigation (`useKeyboardNavigation`) and fullscreen (`useFullscreen`) hooks.
- When `sync` is set, connects to BroadcastChannel via `useSyncChannel`.
- Click navigation: left half calls `prev()`, right half calls `next()`. Clicks on interactive elements (`button`, `a`, `input`, `textarea`, `select`, `[role="button"]`) are ignored.

## Context

- Provides `DeckContext` (via `DeckProvider`) with navigation state, methods, and notes.
- Provides `ThemeContext` (via `ThemeProvider`) with theme values as CSS custom properties.

## Valid Usage

```tsx
<Deck theme={myTheme}>
  <Slide>...</Slide>
  <Slide>...</Slide>
</Deck>
```

Direct children of `<Deck>` are counted as slides. Each child is one frame.

## Constraints

- Must have at least one child.
- Does not deep-flatten — `Children.toArray` normalizes one level only.
- Only one `<Deck>` should be rendered at a time per page.
