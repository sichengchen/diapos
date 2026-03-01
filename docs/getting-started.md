# Getting Started

## Create a New Project

```bash
npx create-diapos my-slides
cd my-slides
npm install
npm run dev
```

This scaffolds a ready-to-run presentation with a demo deck, theme, and dev server.

## Project Structure

```
my-slides/
  src/
    slides.tsx    # your slides
    theme.ts      # your theme (optional)
    main.tsx      # router entry point
  index.html
  package.json
  vite.config.ts
```

## Writing Slides

Open `src/slides.tsx` and write your presentation:

```tsx
import {
  Slide, Title, Heading, Text, BulletPoints, Item, Code,
  PresenterView, ProjectorView,
} from 'diapos'
import { myTheme } from './theme'

const slides = (
  <>
    <Slide notes="Welcome everyone.">
      <Title title="My Talk" subtitle="A subtitle" />
    </Slide>
    <Slide notes="Walk through the key points.">
      <Heading>Key Points</Heading>
      <BulletPoints>
        <Item pause>First point</Item>
        <Item pause>Second point</Item>
      </BulletPoints>
    </Slide>
    <Slide notes="Show a code example.">
      <Heading as="h3">Example</Heading>
      <Code code={`const x = 1`} language="ts" />
    </Slide>
    <Slide notes="Thank the audience.">
      <Title title="Thank You" />
    </Slide>
  </>
)

export function Presentation() {
  return <ProjectorView theme={myTheme}>{slides}</ProjectorView>
}

export function Presenter() {
  return <PresenterView theme={myTheme}>{slides}</PresenterView>
}
```

Wire it up in `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DiaposRouter } from 'diapos'
import { Presentation, Presenter } from './slides'
import 'diapos/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiaposRouter
      title="My Talk"
      projector={<Presentation />}
      presenter={<Presenter />}
    />
  </StrictMode>,
)
```

## Key Concepts

- **`<Slide>`** is the frame boundary. Every slide in the deck is a `<Slide>`. All content goes inside it.
- **Content components** (`<Title>`, `<Heading>`, `<Text>`, `<Code>`, `<Image>`, `<Quote>`) go *inside* `<Slide>`.
- **Building blocks** (`<Block>`, `<Columns>`, `<Column>`) let you arrange content within a slide.
- **`<PresenterView>`** is the speaker-facing view with notes, timer, and controls.
- **`<ProjectorView>`** is the audience-facing fullscreen view.
- **`<DiaposRouter>`** switches between views based on URL hash.
- **Progressive reveal** — add `pause` to content components to reveal them one at a time on click.
- **Per-slide theming** — pass a `theme` prop to any `<Slide>` to override the deck theme for that slide.

## Dev Server

```bash
npm run dev
```

Opens a Vite dev server with HMR. Edit your slides and see changes instantly.

## Presenting

- **Presenter view**: `http://localhost:5173` — notes, next slide preview, timer, and controls
- **Projector view**: `http://localhost:5173/#/projector` — fullscreen slides for the audience

Click the projector button in the presenter view to open the projector in a new tab. Both views stay in sync via BroadcastChannel.
