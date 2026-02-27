# Diapos

Diapos is a React-based presentation framework.

Write slides in TSX, present in the browser!

## Quick Start

```bash
npx create-diapos my-slides
cd my-slides
bun install
bun dev
```

Open `http://localhost:5173` for the presenter view, click "Play" or open `http://localhost:5173/#/projector` for the projector view.

## Example

```tsx
import { Deck, Slide, Title, Heading, Text, BulletPoints, Item, Code } from 'diapos'

function MyPresentation() {
  return (
    <Deck>
      <Slide>
        <Title title="Hello, Diapos!" subtitle="Slides as React components" />
      </Slide>
      <Slide notes="Walk through the key points">
        <Heading>Why Diapos?</Heading>
        <BulletPoints>
          <Item pause>Write slides in TSX</Item>
          <Item pause>Theme with CSS custom properties</Item>
          <Item pause>Presenter mode with speaker notes</Item>
        </BulletPoints>
      </Slide>
      <Slide>
        <Heading as="h3">Quick Example</Heading>
        <Code code={`const x = 1`} language="ts" />
      </Slide>
      <Slide>
        <Title title="Thank You" />
      </Slide>
    </Deck>
  )
}
```

## Features

- **Code-first** -- slides are TSX, not config files
- **Component-based** -- `<Slide>`, `<Title>`, `<Heading>`, `<Text>`, `<BulletPoints>`, `<Code>`, `<Image>`, `<Quote>` and more
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
