import type { ReactNode } from 'react'
import { PresenterView, ProjectorView, Slide, Step, Title, Code } from 'diapos'
import { demoTheme } from './theme'

const exampleCode = `import { Deck, Slide, Title, Code } from 'diapos'

function MyPresentation() {
  return (
    <Deck>
      <Slide>
        <Title title="Hello, Diapos!" subtitle="Slides in React" />
      </Slide>
      <Slide>
        <Code title="Example" code={\`const x = 1\`} language="ts" />
      </Slide>
    </Deck>
  )
}`

function Heading({ children }: { children: ReactNode }) {
  return <h2>{children}</h2>
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>
}

const demoSlides = (
  <>
    <Slide notes="Welcome the audience. Introduce diapos as a code-first presentation framework.">
      <Title title="Diapos" subtitle="Presentations as React Components" />
    </Slide>

    <Slide notes="Emphasize the code-first philosophy. Mention Beamer as inspiration for LaTeX users.">
      <Heading>What is Diapos?</Heading>
      <BulletList>
        <li>A code-first presentation framework</li>
        <li>Write slides in TSX — like Beamer, but for React</li>
        <li>Themeable, composable, hackable</li>
        <li>Built on Vite for instant HMR</li>
      </BulletList>
    </Slide>

    <Slide notes="Reveal each feature one by one. Pause between each for emphasis.">
      <Heading>Key Features</Heading>
      <BulletList>
        <Step><li>Write slides in TSX</li></Step>
        <Step><li>Theme with CSS custom properties</li></Step>
        <Step><li>Presenter mode with speaker notes</li></Step>
      </BulletList>
    </Slide>

    <Slide>
      <Code
        title="Getting Started"
        code={exampleCode}
        language="tsx"
      />
    </Slide>

    <Slide>
      <Heading>Built-in Layouts</Heading>
      <BulletList>
        <li><code>&lt;Title&gt;</code> — centered title with subtitle</li>
        <li><code>&lt;Code&gt;</code> — syntax-highlighted code block</li>
        <li><code>&lt;Image&gt;</code> — full-bleed or contained image</li>
        <li><code>&lt;Step&gt;</code> — progressive reveal</li>
        <li><code>&lt;Slide&gt;</code> — bare slide for full control</li>
      </BulletList>
    </Slide>

    <Slide>
      <Heading>Navigation</Heading>
      <BulletList>
        <li><kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> — next slide</li>
        <li><kbd>←</kbd> <kbd>↑</kbd> — previous slide</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> — first / last slide</li>
        <li><kbd>F</kbd> — toggle fullscreen</li>
        <li>Click left/right halves to navigate</li>
      </BulletList>
    </Slide>

    <Slide notes="Thank the audience. Open for questions.">
      <Title title="Thank You" subtitle="diapos — slides as code" />
    </Slide>
  </>
)

export function DemoPresentation() {
  return (
    <ProjectorView theme={demoTheme} transition="fade">
      {demoSlides}
    </ProjectorView>
  )
}

export function DemoPresenter() {
  return (
    <PresenterView theme={demoTheme}>
      {demoSlides}
    </PresenterView>
  )
}
