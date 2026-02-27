# Content Layouts

Content layouts are components used *inside* `<Slide>`. They are not frame boundaries — `<Slide>` is always the frame.

## Title

### Import

```ts
import { Title } from 'diapos'
import type { TitleProps } from 'diapos'
```

### Props

```ts
interface TitleProps {
  title: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
}
```

### Behavior

- Renders a centered title with optional subtitle.
- Uses `--diapos-font-heading` for the title, `--diapos-font-body` for the subtitle.
- Title is an `<h1>` at `3.5em`, subtitle is a `<p>` at `1.5em` with `opacity: 0.7`.

### Valid Usage

```tsx
<Slide>
  <Title title="My Talk" subtitle="A subtitle" />
</Slide>
```

---

## Code

### Import

```ts
import { Code } from 'diapos'
import type { CodeProps } from 'diapos'
```

### Props

```ts
interface CodeProps {
  code: string
  title?: ReactNode
  language?: string
  style?: CSSProperties
}
```

### Behavior

- Renders a code block in a `<pre>` element.
- Sets `data-language` attribute on the `<pre>` for potential syntax highlighting integration.
- Optional title renders above the code block.
- Uses `--diapos-code-bg` for background, `--diapos-font-code` for font.

### Valid Usage

```tsx
<Slide>
  <Code title="Example" code={`const x = 1`} language="tsx" />
</Slide>
```

---

## Image

### Import

```ts
import { Image } from 'diapos'
import type { ImageProps } from 'diapos'
```

### Props

```ts
interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders an `<img>` element with optional caption.
- `contain` uses `object-fit: contain` instead of the default cover mode.
- Caption renders below the image.

### Valid Usage

```tsx
<Slide>
  <Image src="/photo.jpg" alt="A photo" caption="Figure 1" contain />
</Slide>
```

---

## Quote

### Import

```ts
import { Quote } from 'diapos'
import type { QuoteProps } from 'diapos'
```

### Props

```ts
interface QuoteProps {
  quote: string
  author?: string
  style?: CSSProperties
}
```

### Behavior

- Renders a styled blockquote with optional author attribution.
- Uses theme colors for accent styling.

### Valid Usage

```tsx
<Slide>
  <Quote quote="The best way to predict the future is to invent it." author="Alan Kay" />
</Slide>
```

---

## Constraints (all layouts)

- Content layouts go *inside* `<Slide>`. They must never wrap `<Slide>`.
- Content layouts do not count as slides — `<Slide>` is the only frame boundary.
- Multiple layouts can be composed inside a single `<Slide>` with building blocks like `<Columns>`.
