import { PresenterView, ProjectorView, Slide, Title, Code, Heading, BulletPoints, Item } from 'diapos'
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

const demoSlides = (
  <>
    <Slide notes="Welcome the audience. Introduce diapos as a code-first presentation framework.">
      <Title title="Diapos" subtitle="Producing presentations and slides with React" />
    </Slide>

    <Slide notes="Emphasize the code-first philosophy. Mention Beamer as inspiration for LaTeX users.">
      <Heading>What is Diapos?</Heading>
      <BulletPoints>
        <Item>A code-first presentation framework</Item>
        <Item>Write slides in TSX — like Beamer, but for React</Item>
        <Item>Themeable, composable, hackable</Item>
        <Item>Built on Vite for instant HMR</Item>
      </BulletPoints>
    </Slide>

    <Slide notes="Reveal each feature one by one. Pause between each for emphasis.">
      <Heading>Key Features</Heading>
      <BulletPoints>
        <Item pause>Write slides in TSX</Item>
        <Item pause>Theme with CSS custom properties</Item>
        <Item pause>Presenter mode with speaker notes</Item>
      </BulletPoints>
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
      <BulletPoints>
        <Item><code>&lt;Title&gt;</code> — centered title with subtitle</Item>
        <Item><code>&lt;Code&gt;</code> — syntax-highlighted code block</Item>
        <Item><code>&lt;Image&gt;</code> — full-bleed or contained image</Item>
        <Item><code>&lt;Heading&gt;</code>, <code>&lt;Text&gt;</code> — theme-aware content</Item>
        <Item><code>&lt;BulletPoints&gt;</code>, <code>&lt;Enumerate&gt;</code> — lists with pause support</Item>
      </BulletPoints>
    </Slide>

    <Slide>
      <Heading>Navigation</Heading>
      <BulletPoints>
        <Item><kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> — next slide</Item>
        <Item><kbd>←</kbd> <kbd>↑</kbd> — previous slide</Item>
        <Item><kbd>Home</kbd> / <kbd>End</kbd> — first / last slide</Item>
        <Item><kbd>F</kbd> — toggle fullscreen</Item>
        <Item>Click left/right halves to navigate</Item>
      </BulletPoints>
    </Slide>

    <Slide notes="Thank the audience. Open for questions.">
      <Title title="Thank You" subtitle="Diapos — Producing presentations and slides with React" />
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
