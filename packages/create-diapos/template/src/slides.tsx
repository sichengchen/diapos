import { Deck, Slide, Title, Content, Code, Split } from 'diapos'
import { demoTheme } from './theme'

const exampleCode = `import { Deck, Slide, Title, Content } from 'diapos'

function MyPresentation() {
  return (
    <Deck>
      <Title title="Hello, Diapos!" subtitle="Slides in React" />
      <Content heading="Why Diapos?">
        <p>Because slides should be code.</p>
      </Content>
    </Deck>
  )
}`

export function DemoPresentation() {
  return (
    <Deck theme={demoTheme} transition="fade">
      <Slide notes="Welcome the audience. Introduce diapos as a code-first presentation framework.">
        <Title title="Diapos" subtitle="Presentations as React Components" />
      </Slide>

      <Slide notes="Emphasize the code-first philosophy. Mention Beamer as inspiration for LaTeX users.">
        <Content heading="What is Diapos?">
          <ul style={{ fontSize: '1em', lineHeight: 2 }}>
            <li>A code-first presentation framework</li>
            <li>Write slides in TSX — like Beamer, but for React</li>
            <li>Themeable, composable, hackable</li>
            <li>Built on Vite for instant HMR</li>
          </ul>
        </Content>
      </Slide>

      <Code
        title="Getting Started"
        code={exampleCode}
        language="tsx"
      />

      <Split
        left={
          <div>
            <h2 style={{ fontFamily: 'var(--diapos-font-heading)', fontSize: '2em', margin: '0 0 0.5em 0' }}>
              Split Layout
            </h2>
            <p style={{ fontSize: '1.2em', lineHeight: 1.6 }}>
              Two columns side by side. Great for comparing code with output,
              or text with images.
            </p>
          </div>
        }
        right={
          <div style={{
            backgroundColor: 'var(--diapos-code-bg)',
            borderRadius: 'var(--diapos-radius)',
            padding: '2em',
            fontSize: '1.1em',
          }}>
            <p style={{ opacity: 0.7, margin: '0 0 1em 0' }}>Right column</p>
            <p>This could be anything — code, images, diagrams.</p>
          </div>
        }
      />

      <Content heading="Built-in Layouts">
        <ul style={{ fontSize: '1em', lineHeight: 2 }}>
          <li><code>&lt;Title&gt;</code> — centered title with subtitle</li>
          <li><code>&lt;Content&gt;</code> — heading with body content</li>
          <li><code>&lt;Code&gt;</code> — syntax-highlighted code block</li>
          <li><code>&lt;Image&gt;</code> — full-bleed or contained image</li>
          <li><code>&lt;Split&gt;</code> — two-column layout</li>
          <li><code>&lt;Slide&gt;</code> — bare slide for full control</li>
        </ul>
      </Content>

      <Content heading="Navigation">
        <ul style={{ fontSize: '1em', lineHeight: 2 }}>
          <li><kbd>→</kbd> <kbd>↓</kbd> <kbd>Space</kbd> — next slide</li>
          <li><kbd>←</kbd> <kbd>↑</kbd> — previous slide</li>
          <li><kbd>Home</kbd> / <kbd>End</kbd> — first / last slide</li>
          <li><kbd>F</kbd> — toggle fullscreen</li>
          <li>Click left/right halves to navigate</li>
        </ul>
      </Content>

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
    </Deck>
  )
}
