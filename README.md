# diapos

A code-first presentation framework built on React and TypeScript.

Write slides in TSX, present in the browser. Themeable, composable, hackable.

## Quick Start

```bash
npx create-diapos my-slides
cd my-slides
bun install
bun dev
```

Open `http://localhost:5173` for the presenter view, `http://localhost:5173/#/projector` for the projector view.
New scaffolded projects wire both routes by default via `DiaposRouter`.

## Example

```tsx
import { Deck, Slide, Title, Code } from 'diapos'

function MyPresentation() {
  return (
    <Deck>
      <Slide>
        <Title title="Hello, Diapos!" subtitle="Slides as React components" />
      </Slide>
      <Slide notes="Walk through the code example">
        <Code
          title="Getting Started"
          code={`npx create-diapos my-slides`}
          language="bash"
        />
      </Slide>
      <Slide>
        <h1>Thank You</h1>
      </Slide>
    </Deck>
  )
}
```

## Features

- **Code-first** -- slides are TSX, not config files
- **Component-based** -- `<Slide>`, `<Title>`, `<Code>`, `<Image>`, `<Quote>` and more
- **Themeable** -- `createTheme()` with CSS custom properties
- **Presenter mode** -- speaker notes, next slide preview, elapsed timer
- **Projector sync** -- BroadcastChannel keeps presenter and projector tabs in sync
- **Keyboard navigation** -- arrow keys, space, Home/End, F for fullscreen
- **Fast iteration** -- Vite HMR for instant feedback

## Navigation

| Key | Action |
|-----|--------|
| `->` `Down` `Space` | Next slide |
| `<-` `Up` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

Click the left or right half of the screen to navigate.

## Documentation

- [Getting Started](docs/getting-started.md)
- [Components](docs/components.md)
- [Theming](docs/theming.md)
- [Presenting](docs/presenting.md)
- [Hooks](docs/hooks.md)

## Tech Stack

React 19 | TypeScript | Vite | Bun

## License

MIT
