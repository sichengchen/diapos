# Prop Interfaces

Core exports prop type interfaces that define the contract between core and theme packs. Theme pack components implement these signatures. This enables mix-and-match: import `Title` from one theme and `Code` from another.

**Source:** `packages/diapos/src/core/props.ts`

All interfaces include `style?: CSSProperties` and `className?: string` for override capability.

## SlideProps

```ts
interface SlideProps {
  children: ReactNode
  theme?: DeepPartial<Theme>
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}
```

## HeadingProps

```ts
interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  pause?: boolean
  style?: CSSProperties
  className?: string
}
```

## TitleProps

```ts
interface TitleProps {
  title: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
  className?: string
}
```

## TextProps

```ts
interface TextProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}
```

## CodeProps

```ts
interface CodeProps {
  code: string
  language?: string
  style?: CSSProperties
  className?: string
}
```

## ImageProps

```ts
interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
  className?: string
}
```

## QuoteProps

```ts
interface QuoteProps {
  quote: ReactNode
  author?: ReactNode
  style?: CSSProperties
  className?: string
}
```

## BlockProps

```ts
interface BlockProps {
  title?: string
  variant?: 'default' | 'alert' | 'example'
  children: ReactNode
  style?: CSSProperties
  className?: string
}
```

## BulletPointsProps

```ts
interface BulletPointsProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}
```

## EnumerateProps

```ts
interface EnumerateProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}
```

## ItemProps

```ts
interface ItemProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}
```

## ColumnsProps

```ts
interface ColumnsProps {
  ratio?: string   // CSS grid-template-columns value
  gap?: string     // default: '2em'
  children: ReactNode
  style?: CSSProperties
  className?: string
}
```

## ColumnProps

```ts
interface ColumnProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}
```

## Theme Pack Authoring

Theme authors implement these interfaces. The pattern for pauseable components:

```tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag data-slot="heading" className={className} style={{ ...pauseStyle, ...style }}>
      {children}
    </Tag>
  )
}
```

## Data Attributes

Theme pack components set `data-slot` on their root element for CSS targeting:

| Component | Attributes |
|---|---|
| Slide | `data-slot="slide"` (set by core) |
| Title | `data-slot="title"` |
| Heading | `data-slot="heading"`, `data-level="h1".."h6"` |
| Text | `data-slot="text"` |
| Code | `data-slot="code"`, `data-language="{language}"` |
| Image | `data-slot="image"` |
| Quote | `data-slot="quote"` |
| Block | `data-slot="block"`, `data-variant="default|alert|example"` |
| BulletPoints | `data-slot="bullets"` |
| Enumerate | `data-slot="enumerate"` |
| Item | `data-slot="item"` |

These are conventions, not enforced by core.
