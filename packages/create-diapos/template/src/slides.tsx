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

const demoSlides = (
  <>
    <Slide notes="Welcome the audience. Introduce diapos as a code-first presentation framework.">
      <Title title="Diapos" subtitle="Presentations as React Components" />
    </Slide>

    <Slide notes="Emphasize the code-first philosophy. Mention Beamer as inspiration for LaTeX users.">
      <h2>What is Diapos?</h2>
      <ul>
        <li>A code-first presentation framework</li>
        <li>Write slides in TSX — like Beamer, but for React</li>
        <li>Themeable, composable, hackable</li>
        <li>Built on Vite for instant HMR</li>
      </ul>
    </Slide>

    <Slide notes="Reveal each feature one by one. Pause between each for emphasis.">
      <h2>Key Features</h2>
      <Step><p>Write slides in TSX</p></Step>
      <Step><p>Theme with CSS custom properties</p></Step>
      <Step><p>Presenter mode with speaker notes</p></Step>
    </Slide>

    <Slide>
      <Code
        title="Getting Started"
        code={exampleCode}
        language="tsx"
      />
    </Slide>

    <Slide>
      <h2>Built-in Layouts</h2>
      <ul>
        <li><code>&lt;Title&gt;</code> — centered title with subtitle</li>
        <li><code>&lt;Code&gt;</code> — syntax-highlighted code block</li>
        <li><code>&lt;Image&gt;</code> — full-bleed or contained image</li>
        <li><code>&lt;Step&gt;</code> — progressive reveal</li>
        <li><code>&lt;Slide&gt;</code> — bare slide for full control</li>
      </ul>
    </Slide>

    <Slide>
      <h2>Navigation</h2>
      <ul>
        <li><kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> — next slide</li>
        <li><kbd>←</kbd> <kbd>↑</kbd> — previous slide</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> — first / last slide</li>
        <li><kbd>F</kbd> — toggle fullscreen</li>
        <li>Click left/right halves to navigate</li>
      </ul>
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
