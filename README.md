# Diapos

[![npm](https://img.shields.io/npm/v/diapos)](https://www.npmjs.com/package/diapos)

Diapos is a React-based presentation framework.

Write slides in TSX, present in the browser.

[Demo](https://diapos-demo.scchan.workers.dev)

## Quick Start

```bash
npx create-diapos my-slides
cd my-slides
npm install
npm run dev
```

Open `http://localhost:5173` for the presenter view, click the projector button or open `http://localhost:5173/#/projector` for the audience view. Both tabs stay in sync.

## Example

```tsx
import {
  Slide, Title, Heading, Text, BulletPoints, Item, Code,
  PresenterView, ProjectorView, DiaposRouter,
} from 'diapos'
import 'diapos/styles.css'

const slides = (
  <>
    <Slide notes="Welcome the audience.">
      <Title title="Hello, Diapos!" subtitle="Slides as React components" />
    </Slide>
    <Slide notes="Walk through the key points.">
      <Heading>Why Diapos?</Heading>
      <BulletPoints>
        <Item pause>Write slides in React</Item>
        <Item pause>Presenter mode with speaker notes</Item>
        <Item pause>Per-slide theming and progressive reveal</Item>
      </BulletPoints>
    </Slide>
    <Slide notes="Show a code example.">
      <Heading as="h3">Quick Example</Heading>
      <Code code={`const x = 1`} language="ts" />
    </Slide>
    <Slide notes="Thank the audience.">
      <Title title="Thank You" />
    </Slide>
  </>
)

function App() {
  return (
    <DiaposRouter
      title="Hello, Diapos!"
      projector={<ProjectorView>{slides}</ProjectorView>}
      presenter={<PresenterView>{slides}</PresenterView>}
    />
  )
}
```

## Features

- **Presenter + Projector views** — speaker notes, timer, next-slide preview, synced via BroadcastChannel
- **Progressive reveal** — add `pause` to any content component
- **Theming** — token-based system with 12 CSS custom properties, per-slide overrides, `createTheme()` for customization
- **Transitions** — `'fade'`, `'slide'`, or `'none'`
- **Keyboard & click navigation** — arrow keys, space, home/end, fullscreen toggle, click-to-navigate

## Navigation

| Key | Action |
|-----|--------|
| `->` `Down` `Space` | Next slide |
| `<-` `Up` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

Click the left or right half of the screen to navigate.

## Components

| Component | Description |
|-----------|-------------|
| `<Deck>` | Presentation engine (navigation, theming, transitions) |
| `<Slide>` | Frame boundary — all content goes inside |
| `<Section>` | Groups slides with a named divider |
| `<Title>` | Title card with optional subtitle |
| `<Heading>` | Theme-aware heading (h1–h6), supports `pause` |
| `<Text>` | Theme-aware paragraph, supports `pause` |
| `<BulletPoints>` | Unordered list |
| `<Enumerate>` | Ordered list |
| `<Item>` | List item, supports `pause` |
| `<Code>` | Code block with language hint |
| `<Image>` | Image with optional caption |
| `<Quote>` | Blockquote with optional author |
| `<Block>` | Styled content box (default / alert / example variants) |
| `<Columns>` / `<Column>` | Multi-column grid layout |
| `<PresenterView>` | Speaker view with notes and controls |
| `<ProjectorView>` | Audience fullscreen view |
| `<DiaposRouter>` | Hash-based view router |

## Agent Skill

An [agent skill](skills/SKILL.md) that teaches AI coding agents how to create presentations and theme packs.

## Documentation

- [Getting Started](docs/getting-started.md)
- [Components](docs/components.md)
- [Theming](docs/theming.md)
- [Presenting](docs/presenting.md)
- [Hooks](docs/hooks.md)

## License

[MIT](LICENSE)
