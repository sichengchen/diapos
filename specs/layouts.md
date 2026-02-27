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

## Heading

### Import

```ts
import { Heading } from 'diapos'
import type { HeadingProps } from 'diapos'
```

### Props

```ts
interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  pause?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders a heading element at the specified level (default `h2`).
- Uses `--diapos-font-heading` for font family.
- Size: h1=`clamp(2.2rem,4.2vw,4rem)`, h2=`clamp(1.8rem,3.2vw,3rem)`, h3=`clamp(1.4rem,2.4vw,2rem)`, h4=`1.5rem`.
- Weight: 700 for h1/h2, 600 for h3+.
- Supports `pause` prop for progressive reveal.

### Valid Usage

```tsx
<Slide>
  <Heading>Main Point</Heading>
  <Heading as="h3">Subtitle</Heading>
  <Heading pause>Revealed on next click</Heading>
</Slide>
```

---

## Text

### Import

```ts
import { Text } from 'diapos'
import type { TextProps } from 'diapos'
```

### Props

```ts
interface TextProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders a `<p>` element with theme-aware body font.
- Uses `--diapos-font-body` for font family, `1.02em` size, `1.45` line height.
- Supports `pause` prop for progressive reveal.

### Valid Usage

```tsx
<Slide>
  <Text>A paragraph of content.</Text>
  <Text pause>Revealed on next click.</Text>
</Slide>
```

---

## BulletPoints

### Import

```ts
import { BulletPoints } from 'diapos'
import type { BulletPointsProps } from 'diapos'
```

### Props

```ts
interface BulletPointsProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders a `<ul>` element with theme-aware body font.
- Contains `<Item>` children which render as `<li>` — valid HTML with no wrapper elements.
- Supports `pause` prop for progressive reveal of the entire list.

### Valid Usage

```tsx
<Slide>
  <BulletPoints>
    <Item>First point</Item>
    <Item pause>Revealed second</Item>
    <Item pause>Revealed third</Item>
  </BulletPoints>
</Slide>
```

---

## Enumerate

### Import

```ts
import { Enumerate } from 'diapos'
import type { EnumerateProps } from 'diapos'
```

### Props

```ts
interface EnumerateProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders an `<ol>` element with theme-aware body font.
- Contains `<Item>` children which render as `<li>` — valid HTML with no wrapper elements.
- Supports `pause` prop for progressive reveal of the entire list.

### Valid Usage

```tsx
<Slide>
  <Enumerate>
    <Item>Step one</Item>
    <Item pause>Step two (revealed)</Item>
    <Item pause>Step three (revealed)</Item>
  </Enumerate>
</Slide>
```

---

## Item

### Import

```ts
import { Item } from 'diapos'
import type { ItemProps } from 'diapos'
```

### Props

```ts
interface ItemProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}
```

### Behavior

- Renders a `<li>` element directly — no wrapper elements, producing valid HTML inside `<ul>` or `<ol>`.
- When `pause` is truthy: hidden with `visibility: hidden` until revealed (reserves space).
- When `pause` is falsy: always visible.
- Outside a PauseProvider (no progressive reveal context): always visible.

### Valid Usage

```tsx
<BulletPoints>
  <Item>Always visible</Item>
  <Item pause>Revealed on next click</Item>
</BulletPoints>
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
