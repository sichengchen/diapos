# Slide

## Import

```ts
import { Slide } from 'diapos'
import type { SlideProps } from 'diapos'
```

## Props

```ts
interface SlideProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}
```

## Behavior

- The frame boundary. Every visible slide in the deck is a `<Slide>`.
- Renders a `<div>` filling its container (100% width/height).
- Default layout: presentation-oriented column (`flexDirection: column`, `justifyContent: center`, `alignItems: stretch`, `textAlign: left`).
- Adds a default `diapos-slide` class that applies heading/list typography tuned for slide decks.
- Applies theme typography via CSS custom properties: `--diapos-font-body`, `--diapos-fg`, `--diapos-spacing-slide`.
- `overflow: hidden` prevents content from bleeding out.
- `style` is spread last, so user styles override defaults.
- `notes` is not rendered — it is read by `<Deck>` during child flattening and stored in `DeckContext` for the presenter view and `useNotes()` hook.

## Valid Usage

```tsx
<Deck>
  <Slide notes="Speaker notes here">
    <Title title="Hello" />
  </Slide>
  <Slide style={{ textAlign: 'left' }}>
    <p>Custom layout</p>
  </Slide>
</Deck>
```

- Must be a direct child of `<Deck>` (or inside a `<Section>` which is a child of `<Deck>`).
- Content layouts (`<Title>`, `<Code>`, etc.) go *inside* `<Slide>`, never as wrappers around it.
- Building blocks (`<Block>`, `<Columns>`) go inside `<Slide>`.

## Constraints

- `<Slide>` is always explicit — do not create components that implicitly produce slides.
- The `notes` prop is consumed by `<Deck>`, not by `<Slide>` itself.
- `<Slide>` does not count itself — `<Deck>` counts its children.
