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
      <h2 style={{ fontFamily: 'var(--diapos-font-heading)', fontSize: '2.5em', marginBottom: '0.5em' }}>
        What is Diapos?
      </h2>
      <ul style={{ fontSize: '1em', lineHeight: 2 }}>
        <li>A code-first presentation framework</li>
        <li>Write slides in TSX — like Beamer, but for React</li>
        <li>Themeable, composable, hackable</li>
        <li>Built on Vite for instant HMR</li>
      </ul>
    </Slide>

    <Slide notes="Reveal each feature one by one. Pause between each for emphasis.">
      <h2 style={{ fontFamily: 'var(--diapos-font-heading)', fontSize: '2em', marginBottom: '1em' }}>
        Key Features
      </h2>
      <ul style={{ fontSize: '1em', lineHeight: 2.5, listStyle: 'none', padding: 0 }}>
        <Step><li>Write slides in TSX</li></Step>
        <Step><li>Theme with CSS custom properties</li></Step>
        <Step><li>Presenter mode with speaker notes</li></Step>
      </ul>
    </Slide>

    <Slide>
      <Code
        title="Getting Started"
        code={exampleCode}
        language="tsx"
      />
    </Slide>

    <Slide>
      <h2 style={{ fontFamily: 'var(--diapos-font-heading)', fontSize: '2.5em', marginBottom: '0.5em' }}>
        Built-in Layouts
      </h2>
      <ul style={{ fontSize: '1em', lineHeight: 2 }}>
        <li><code>&lt;Title&gt;</code> — centered title with subtitle</li>
        <li><code>&lt;Code&gt;</code> — syntax-highlighted code block</li>
        <li><code>&lt;Image&gt;</code> — full-bleed or contained image</li>
        <li><code>&lt;Step&gt;</code> — progressive reveal</li>
        <li><code>&lt;Slide&gt;</code> — bare slide for full control</li>
      </ul>
    </Slide>

    <Slide>
      <h2 style={{ fontFamily: 'var(--diapos-font-heading)', fontSize: '2.5em', marginBottom: '0.5em' }}>
        Navigation
      </h2>
      <ul style={{ fontSize: '1em', lineHeight: 2 }}>
        <li><kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> — next slide</li>
        <li><kbd>←</kbd> <kbd>↑</kbd> — previous slide</li>
        <li><kbd>Home</kbd> / <kbd>End</kbd> — first / last slide</li>
        <li><kbd>F</kbd> — toggle fullscreen</li>
        <li>Click left/right halves to navigate</li>
      </ul>
    </Slide>

    <Slide
      notes="Thank the audience. Open for questions."
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--diapos-spacing-slide)',
      }}
    >
      <h1 style={{
        fontFamily: 'var(--diapos-font-heading)',
        fontSize: '3em',
        marginBottom: '0.5em',
      }}>
        Thank You
      </h1>
      <p style={{ fontSize: '1.5em', opacity: 0.6 }}>
        diapos — slides as code
      </p>
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
