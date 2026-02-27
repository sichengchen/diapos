# Getting Started

## Create a New Project

```bash
npx create-diapos my-slides
cd my-slides
bun install
bun dev
```

This scaffolds a ready-to-run presentation with a demo deck, theme, and dev server.

## Project Structure

```
my-slides/
  src/
    slides.tsx    # your slides
    theme.ts      # your theme
    main.tsx      # router entry point (projector/presenter)
  index.html
  package.json
  vite.config.ts
```

## Writing Slides

Open `src/slides.tsx` and write your presentation:

```tsx
import { Deck, Slide, Title, Code } from 'diapos'
import { myTheme } from './theme'

export function MyPresentation() {
  return (
    <Deck theme={myTheme}>
      <Slide>
        <Title title="My Talk" subtitle="A subtitle" />
      </Slide>
      <Slide>
        <p>Any JSX works inside a Slide.</p>
      </Slide>
    </Deck>
  )
}
```

## Key Concepts

- **`<Deck>`** is the root component. It handles navigation, theming, and transitions.
- **`<Slide>`** is the frame boundary. Every slide in the deck is a `<Slide>`. All content goes inside it.
- **Layout components** (`<Title>`, `<Code>`, `<Image>`, `<Quote>`) are content components used *inside* `<Slide>`, not wrappers around it.
- **Building blocks** (`<Block>`, `<Columns>`, `<Column>`) are composable structural components for arranging content within a slide.

## Dev Server

```bash
bun dev
```

Opens a Vite dev server with HMR. Edit your slides and see changes instantly.

## Presenting

- **Presenter view**: `http://localhost:5173` -- notes, next slide preview, and controls
- **Projector view**: `http://localhost:5173/#/projector` -- fullscreen slides for the audience

Scaffolded `main.tsx` uses `DiaposRouter` with `ProjectorView` and `PresenterView`, so both routes work out of the box. Use the PresenterView Play button to open the projector route in a new tab. Both views stay in sync via BroadcastChannel.
