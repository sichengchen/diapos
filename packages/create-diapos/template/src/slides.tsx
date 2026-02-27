import {
  PresenterView,
  ProjectorView,
  Slide,
  Title,
  Heading,
  Text,
  BulletPoints,
  Enumerate,
  Item,
  Code,
  Image,
  Quote,
} from 'diapos'
import { demoTheme } from './theme'

const exampleCode = `import { Deck, Slide, Title, Heading, Code } from 'diapos'

function App() {
  return (
    <Deck>
      <Slide>
        <Title title="Hello, Diapos!" subtitle="Slides in React" />
      </Slide>
      <Slide>
        <Heading>Code Blocks</Heading>
        <Code code={\`const x = 1\`} language="ts" />
      </Slide>
    </Deck>
  )
}`

const demoSlides = (
  <>
    {/* Title layout — centered title + subtitle */}
    <Slide notes="Welcome the audience. Introduce diapos as a code-first presentation framework.">
      <Title title="Diapos" subtitle="Producing presentations and slides with React" />
    </Slide>

    {/* Heading + BulletPoints */}
    <Slide notes="Emphasize the code-first philosophy. Mention Beamer as inspiration for LaTeX users.">
      <Heading>What is Diapos?</Heading>
      <BulletPoints>
        <Item>A code-first presentation framework</Item>
        <Item>Write slides in TSX — like Beamer, but for React</Item>
        <Item>Themeable, composable, hackable</Item>
        <Item>Built on Vite for instant HMR</Item>
      </BulletPoints>
    </Slide>

    {/* pause — progressive reveal with BulletPoints */}
    <Slide notes="Reveal each feature one by one. Pause between each for emphasis.">
      <Heading>Key Features</Heading>
      <BulletPoints>
        <Item pause>Write slides in TSX</Item>
        <Item pause>Theme with CSS custom properties</Item>
        <Item pause>Presenter mode with speaker notes</Item>
      </BulletPoints>
    </Slide>

    {/* pause — progressive reveal with Heading and Text */}
    <Slide notes="Demonstrate pause on headings and text paragraphs.">
      <Heading>The pause Prop</Heading>
      <Text>Any content component can use the pause prop for progressive reveal.</Text>
      <Heading as="h3" pause>This heading was paused</Heading>
      <Text pause>And so was this paragraph.</Text>
    </Slide>

    {/* Enumerate — ordered list */}
    <Slide notes="Demonstrate numbered lists with Enumerate.">
      <Heading>Getting Started</Heading>
      <Enumerate>
        <Item pause>Run <code>npx create-diapos my-slides</code></Item>
        <Item pause>Edit <code>src/slides.tsx</code></Item>
        <Item pause>Present with <code>bun run dev</code></Item>
      </Enumerate>
    </Slide>

    {/* Code — syntax-highlighted code block */}
    <Slide>
      <Heading as="h3">Example Code</Heading>
      <Code code={exampleCode} language="tsx" />
    </Slide>

    {/* Quote layout */}
    <Slide notes="Quote component renders a styled blockquote.">
      <Quote
        quote="The best way to predict the future is to invent it."
        author="Alan Kay"
      />
    </Slide>

    {/* Image layout */}
    <Slide notes="Image component supports full-bleed or contained mode with optional caption.">
      <Image
        src="https://picsum.photos/seed/diapos/800/400"
        alt="Placeholder image"
        caption="Images can have captions"
        contain
      />
    </Slide>

    {/* Component overview */}
    <Slide>
      <Heading>Built-in Components</Heading>
      <BulletPoints>
        <Item><code>&lt;Title&gt;</code> — centered title with subtitle</Item>
        <Item><code>&lt;Heading&gt;</code> — theme-aware heading (h1–h6)</Item>
        <Item><code>&lt;Text&gt;</code> — theme-aware paragraph</Item>
        <Item><code>&lt;BulletPoints&gt;</code> / <code>&lt;Enumerate&gt;</code> — unordered and ordered lists</Item>
        <Item><code>&lt;Code&gt;</code> — code block with language hint</Item>
        <Item><code>&lt;Image&gt;</code> — full-bleed or contained image</Item>
        <Item><code>&lt;Quote&gt;</code> — styled blockquote</Item>
      </BulletPoints>
    </Slide>

    {/* Navigation */}
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

    {/* Closing slide */}
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
