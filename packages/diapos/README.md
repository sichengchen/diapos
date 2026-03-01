# Diapos

[![npm](https://img.shields.io/npm/v/diapos)](https://www.npmjs.com/package/diapos)

A React-based presentation framework. Write slides in TSX, present in the browser.

[Demo](https://diapos-demo.scchan.workers.dev) | [Documentation](https://github.com/sichengchen/diapos#documentation)

## Quick Start

```bash
npx create-diapos my-slides
cd my-slides
npm install
npm run dev
```

## Usage

```tsx
import {
  Slide, Title, Heading, BulletPoints, Item, Code,
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

- **Presenter + Projector views** synced via BroadcastChannel
- **Progressive reveal** with `pause` prop
- **Token-based theming** with 12 CSS custom properties and per-slide overrides
- **Transitions**: `'fade'`, `'slide'`, or `'none'`
- **Keyboard & click navigation**

## License

[MIT](../../LICENSE)
