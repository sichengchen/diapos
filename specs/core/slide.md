# Slide (Core)

The structural container for a single slide. Headless — applies only structural CSS.

**Source:** `packages/diapos/src/core/Slide.tsx`

## Import

Core's Slide is not directly re-exported from `diapos`. The top-level `Slide` export is the default theme's wrapper. Theme pack authors import from core:

```ts
import { Slide as SlideBase } from '../core'
```

## Props

```ts
interface SlideProps {
  children: ReactNode
  theme?: DeepPartial<Theme>  // per-slide token overrides
  style?: CSSProperties
  className?: string
  notes?: ReactNode           // consumed by Deck, not rendered by Slide
}
```

## Behavior

Renders a `<div>` with:

```ts
{
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxSizing: 'border-box',
  ...style,
}
```

Sets `data-slot="slide"` on the root element.

If `theme` is provided, wraps children in a nested `ThemeProvider` (calling `createTheme(theme)` to merge overrides onto defaults). Otherwise renders content directly.

The `notes` prop is not rendered by Slide. It is read by `parseSlides()` during Deck initialization and stored in `DeckContext` for the presenter view and `useNotes()` hook.

## Why Slide is in Core

1. `parseSlides` needs to identify slide boundaries (it checks direct children for Slide type)
2. It's the structural container all themes share — full-size, flex-column, overflow-hidden
3. It's the mount point for per-slide theme overrides

## Per-Slide Theme Overrides

```tsx
<Deck theme={myTheme}>
  <Slide>Uses myTheme tokens</Slide>
  <Slide theme={{ colors: { background: '#fff', foreground: '#000' } }}>
    Light slide in a dark deck
  </Slide>
</Deck>
```

## Constraints

- `<Slide>` is always explicit — do not create components that implicitly produce slides.
- Slide applies **only structural CSS** (display, dimensions, overflow, box-sizing). No colors, fonts, sizes, padding, or other visual properties. Those belong in theme pack wrappers.
- The `notes` prop is consumed by `<Deck>`, not by `<Slide>`.
