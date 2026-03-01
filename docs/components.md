# Components

All components are imported from `'diapos'`. Every component accepts `style` and `className` props for custom styling.

## Structural Components

### `<Deck>`

Presentation engine. Manages navigation, theming, transitions, and chrome.

```tsx
<Deck
  theme={myTheme}             // Theme object (default: defaultTheme)
  transition="fade"            // 'none' | 'fade' | 'slide' (default: 'fade')
  transitionDuration={300}     // milliseconds (default: 300)
  clickNavigation={true}       // click left/right to navigate (default: true)
  progress={ProgressBar}       // ComponentType | false (default: built-in ProgressBar)
  counter={SlideCounter}       // ComponentType | false (default: built-in SlideCounter)
  decorator={MyDecorator}      // ComponentType rendered on every slide (optional)
  sync="presenter"             // 'presenter' | 'projector' — enables BroadcastChannel sync
>
  <Slide>...</Slide>
</Deck>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | `<Slide>` and `<Section>` children |
| `theme` | `Theme` | `defaultTheme` | Theme object |
| `transition` | `'none' \| 'fade' \| 'slide'` | `'fade'` | Slide transition |
| `transitionDuration` | `number` | `300` | Transition duration in ms |
| `clickNavigation` | `boolean` | `true` | Click left/right half to navigate |
| `progress` | `ComponentType \| false` | `ProgressBar` | Progress bar component, or `false` to hide |
| `counter` | `ComponentType \| false` | `SlideCounter` | Slide counter component, or `false` to hide |
| `decorator` | `ComponentType` | -- | Component rendered on every slide |
| `sync` | `'presenter' \| 'projector'` | -- | Enables cross-tab sync |

### `<Slide>`

The frame boundary. Every slide in the deck must be a `<Slide>`. Content goes inside it.

```tsx
<Slide
  notes="Speaker notes for this slide"   // string or ReactNode
  theme={{ colors: { accent: '#e94560' } }}  // per-slide theme overrides
  style={{ textAlign: 'left' }}
  className="my-slide"
>
  <h1>Hello</h1>
  <p>Any JSX works here.</p>
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Slide content |
| `notes` | `ReactNode` | -- | Speaker notes (shown in presenter view) |
| `theme` | `DeepPartial<Theme>` | -- | Per-slide theme overrides (deep-merged with deck theme) |

The Zurich theme adds default styling: flex column layout, `80px` padding, `1.15em` font size, and `0.75em` gap between children.

### `<Section>`

Groups slides into a named section. Deck auto-generates a divider slide.

```tsx
import { Section, Slide } from 'diapos'

<Section title="Part 1" subtitle="Introduction">
  <Slide>...</Slide>
  <Slide>...</Slide>
</Section>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Section title |
| `subtitle` | `string` | -- | Optional subtitle |
| `children` | `ReactNode` | required | `<Slide>` children |

## Content Components

Content components go *inside* `<Slide>`. They are not frame boundaries — `<Slide>` is always the frame.

### `<Title>`

Title card with optional subtitle.

```tsx
<Slide>
  <Title title="My Talk" subtitle="A subtitle" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | required | The main title |
| `subtitle` | `ReactNode` | -- | Optional subtitle |

### `<Heading>`

Theme-aware heading. Supports progressive reveal with `pause`.

```tsx
<Slide>
  <Heading>Main Point</Heading>
  <Heading as="h3">Subtitle</Heading>
  <Heading pause>Revealed on next click</Heading>
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Heading content |
| `as` | `'h1' \| 'h2' \| ... \| 'h6'` | `'h2'` | Heading level |
| `pause` | `boolean` | -- | Progressive reveal |

### `<Text>`

Theme-aware paragraph. Supports progressive reveal.

```tsx
<Slide>
  <Text>A paragraph of content.</Text>
  <Text pause>Revealed on next click.</Text>
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Text content |
| `pause` | `boolean` | -- | Progressive reveal |

### `<BulletPoints>` / `<Enumerate>` / `<Item>`

Lists. `<BulletPoints>` renders `<ul>`, `<Enumerate>` renders `<ol>`. Both contain `<Item>` children.

```tsx
<Slide>
  <BulletPoints>
    <Item>Always visible</Item>
    <Item pause>Revealed first</Item>
    <Item pause>Revealed second</Item>
  </BulletPoints>
</Slide>

<Slide>
  <Enumerate>
    <Item>Step one</Item>
    <Item pause>Step two</Item>
  </Enumerate>
</Slide>
```

**BulletPoints / Enumerate props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | `<Item>` children |
| `pause` | `boolean` | -- | Progressive reveal of the entire list |

**Item props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Item content |
| `pause` | `boolean` | -- | Progressive reveal (hidden until revealed) |

### `<Code>`

Code block with optional language hint.

```tsx
<Slide>
  <Heading as="h3">Example</Heading>
  <Code code={`const x = 1`} language="tsx" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | required | The code to display |
| `language` | `string` | -- | Language identifier (sets `data-language` attribute) |

### `<Image>`

Image with optional caption.

```tsx
<Slide>
  <Image src="/photo.jpg" alt="A photo" caption="Figure 1" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source URL |
| `alt` | `string` | `''` | Alt text |
| `caption` | `ReactNode` | -- | Caption below the image |
| `contain` | `boolean` | -- | Use `object-fit: contain` instead of cover |

### `<Quote>`

Blockquote with optional author attribution.

```tsx
<Slide>
  <Quote quote="The best way to predict the future is to invent it." author="Alan Kay" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `ReactNode` | required | The quote text |
| `author` | `ReactNode` | -- | Attribution |

## Building Blocks

Composable structural components for arranging content within slides.

### `<Block>`

Styled content block with optional title and color variant.

```tsx
<Slide>
  <Block title="Key Insight" variant="alert">
    <p>Important content here.</p>
  </Block>
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | -- | Block heading |
| `variant` | `'default' \| 'alert' \| 'example'` | `'default'` | Color variant (`accent`, `danger`, or `success`) |
| `children` | `ReactNode` | required | Block content |

### `<Columns>` / `<Column>`

Multi-column grid layout within a slide.

```tsx
<Slide>
  <Columns ratio="1fr 2fr" gap="2em">
    <Column>Left content</Column>
    <Column>Right content</Column>
  </Columns>
</Slide>
```

**Columns props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `string` | -- | CSS `grid-template-columns` value. Without it, columns auto-flow as equal `1fr`. |
| `gap` | `string` | `'3em'` | Column gap |
| `children` | `ReactNode` | required | `<Column>` children |

**Column props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Column content |

## Chrome Components

### `<ProgressBar>`

Progress bar at the bottom of the viewport. Rendered by `<Deck>` by default.

### `<SlideCounter>`

Displays `current / total` in the bottom-right corner. Rendered by `<Deck>` by default.

Pass custom components or `false` to `<Deck>`'s `progress` and `counter` props to customize or hide them.
