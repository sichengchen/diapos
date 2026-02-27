# Components

## Structural Components

### `<Deck>`

Root component for a presentation. Handles navigation, theming, transitions, and slide counting.

```tsx
import { Deck } from 'diapos'

<Deck
  theme={myTheme}           // optional Theme object
  transition="fade"          // 'none' | 'fade' | 'slide' (default: 'fade')
  transitionDuration={300}   // milliseconds (default: 300)
  clickNavigation={true}     // click left/right to navigate (default: true)
  showProgress={true}        // show progress bar (default: true)
  showCounter={true}         // show slide counter (default: true)
  sync="presenter"           // 'presenter' | 'projector' — enables BroadcastChannel sync
>
  {/* slides go here */}
</Deck>
```

### `<Slide>`

The frame boundary. Every slide in the deck must be a `<Slide>`. Content goes inside it.

```tsx
import { Slide } from 'diapos'

<Slide
  notes="Speaker notes for this slide"  // string or ReactNode
  style={{ textAlign: 'left' }}         // override default styles
  className="my-slide"                  // CSS class
>
  <h1>Hello</h1>
  <p>Any JSX works here.</p>
</Slide>
```

Default layout: full-height flex column, vertically centered with left-aligned content and slide-friendly heading/list typography.

### `<Section>`

Groups slides and auto-generates a divider slide. Not yet exported from the public API.

```tsx
<Section title="Part 1" subtitle="Introduction">
  <Slide>...</Slide>
  <Slide>...</Slide>
</Section>
```

## Content Layouts

Content layouts are components used *inside* `<Slide>`. They are not frame boundaries — `<Slide>` is always the frame.

### `<Title>`

Centered title with optional subtitle.

```tsx
import { Title } from 'diapos'

<Slide>
  <Title title="My Talk" subtitle="A subtitle" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | required | The main title |
| `subtitle` | `ReactNode` | -- | Optional subtitle |
| `style` | `CSSProperties` | -- | Style overrides |

### `<Heading>`

Theme-aware heading element. Supports progressive reveal with `pause`.

```tsx
import { Heading } from 'diapos'

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
| `style` | `CSSProperties` | -- | Style overrides |

### `<Text>`

Theme-aware paragraph. Supports progressive reveal with `pause`.

```tsx
import { Text } from 'diapos'

<Slide>
  <Text>A paragraph of content.</Text>
  <Text pause>Revealed on next click.</Text>
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Text content |
| `pause` | `boolean` | -- | Progressive reveal |
| `style` | `CSSProperties` | -- | Style overrides |

### `<BulletPoints>` / `<Enumerate>` / `<Item>`

Theme-aware lists. `<BulletPoints>` renders `<ul>`, `<Enumerate>` renders `<ol>`. Both contain `<Item>` children that render as `<li>` directly — valid HTML with no wrapper elements.

```tsx
import { BulletPoints, Enumerate, Item } from 'diapos'

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
| `style` | `CSSProperties` | -- | Style overrides |

**Item props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Item content |
| `pause` | `boolean` | -- | Progressive reveal (hidden until revealed, reserves space) |
| `style` | `CSSProperties` | -- | Style overrides |

### `<Code>`

Displays a code block. Use `<Heading>` above it for a title.

```tsx
import { Code, Heading } from 'diapos'

<Slide>
  <Heading as="h3">Example</Heading>
  <Code code={`const x = 1`} language="tsx" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | required | The code to display |
| `language` | `string` | -- | Language identifier (sets `data-language` attribute) |
| `style` | `CSSProperties` | -- | Style overrides |

### `<Image>`

Displays an image with optional caption.

```tsx
import { Image } from 'diapos'

<Slide>
  <Image src="/photo.jpg" alt="A photo" caption="Figure 1" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source URL |
| `alt` | `string` | -- | Alt text |
| `caption` | `ReactNode` | -- | Caption below the image |
| `contain` | `boolean` | -- | Use `object-fit: contain` instead of cover |
| `style` | `CSSProperties` | -- | Style overrides |

### `<Quote>`

Displays a blockquote with optional author attribution.

```tsx
import { Quote } from 'diapos'

<Slide>
  <Quote quote="The best way to predict the future is to invent it." author="Alan Kay" />
</Slide>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | required | The quote text |
| `author` | `string` | -- | Attribution |
| `style` | `CSSProperties` | -- | Style overrides |

## Building Blocks

Composable structural components for arranging content within slides. Not yet exported from the public API.

### `<Block>`

A styled content block with optional title and variant.

```tsx
<Block title="Key Insight" variant="alert">
  <p>Important content here.</p>
</Block>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | -- | Block heading |
| `variant` | `'default' \| 'alert' \| 'example'` | `'default'` | Color variant |
| `children` | `ReactNode` | required | Block content |
| `style` | `CSSProperties` | -- | Style overrides |

### `<Columns>` / `<Column>`

Multi-column layout within a slide.

```tsx
<Columns ratio="1fr 2fr" gap="2em">
  <Column>Left content</Column>
  <Column>Right content</Column>
</Columns>
```

**Columns props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `string` | -- | CSS `grid-template-columns` value |
| `gap` | `string` | `'2em'` | Column gap |
| `children` | `ReactNode` | required | `<Column>` children |
| `style` | `CSSProperties` | -- | Style overrides |

**Column props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Column content |
| `style` | `CSSProperties` | -- | Style overrides |

## Chrome Components

### `<ProgressBar>`

Thin progress bar at the bottom of the viewport. Rendered by `<Deck>` when `showProgress={true}`.

### `<SlideCounter>`

Displays `current / total` in the bottom-right corner. Rendered by `<Deck>` when `showCounter={true}`.
