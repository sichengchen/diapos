# Theming

Diapos uses a token-based theming system. Themes are plain objects that map to CSS custom properties. Create a theme with `createTheme()`, pass it to `<Deck>` or a view component, and every component inside consumes the tokens via `var(--diapos-*)`.

## Creating a Theme

```tsx
import { createTheme } from 'diapos'

const myTheme = createTheme({
  colors: {
    background: '#1a1a2e',
    foreground: '#eaeaea',
    accent: '#e94560',
  },
  fonts: {
    heading: "'Georgia', serif",
  },
})
```

`createTheme()` deep-merges your overrides into the default theme. All properties are optional — unspecified values fall back to the defaults.

```tsx
<Deck theme={myTheme}>
  ...
</Deck>
```

## Theme Shape

```ts
interface Theme {
  colors: {
    background: string  // slide background
    foreground: string  // text color
    accent: string      // accent color (progress bar, blocks, links)
    muted: string       // muted/secondary text color
    code: string        // code block background
    danger: string      // danger/error color (alert blocks)
    success: string     // success color (example blocks)
  }
  fonts: {
    heading: string     // heading font family
    body: string        // body text font family
    code: string        // monospace font family
  }
  spacing: {
    slide: string       // slide padding (default: '80px')
  }
  borderRadius: string  // border radius for UI elements (default: '4px')
}
```

## Default Theme

The default is a clean, light theme with Inter and JetBrains Mono fonts.

```ts
import { defaultTheme } from 'diapos'
```

```ts
{
  colors: {
    background: '#ffffff',
    foreground: '#18181b',
    accent: '#6366f1',
    muted: '#a1a1aa',
    code: '#f4f4f5',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: { slide: '80px' },
  borderRadius: '4px',
}
```

`zurichTheme` is also exported as an alias for the default theme.

## Per-Slide Theme Overrides

Any `<Slide>` can override the deck theme for that slide only. Pass a partial theme object:

```tsx
<Slide theme={{ colors: { background: '#0f172a', foreground: '#f8fafc' } }}>
  <Title title="Dark Slide" />
</Slide>
```

The override is deep-merged with the current theme via `createTheme()`.

## CSS Custom Properties

`ThemeProvider` converts the theme into 12 CSS custom properties set as inline styles. All built-in components consume these — you can reference them in custom styles too.

| Property | Theme key |
|----------|-----------|
| `--diapos-bg` | `colors.background` |
| `--diapos-fg` | `colors.foreground` |
| `--diapos-accent` | `colors.accent` |
| `--diapos-muted` | `colors.muted` |
| `--diapos-code-bg` | `colors.code` |
| `--diapos-danger` | `colors.danger` |
| `--diapos-success` | `colors.success` |
| `--diapos-font-heading` | `fonts.heading` |
| `--diapos-font-body` | `fonts.body` |
| `--diapos-font-code` | `fonts.code` |
| `--diapos-spacing-slide` | `spacing.slide` |
| `--diapos-radius` | `borderRadius` |

## Using Tokens in Custom Components

Use CSS custom properties directly:

```tsx
<div style={{ color: 'var(--diapos-accent)' }}>Accent text</div>
```

Or access the theme object programmatically via `useTheme()`:

```tsx
import { useTheme } from 'diapos'

function MyComponent() {
  const theme = useTheme()
  return <div style={{ color: theme.colors.accent }}>Accent text</div>
}
```

Prefer CSS variables over `useTheme()` — they cascade naturally and work with per-slide overrides.

## ThemeProvider

For advanced use, wrap any subtree in a `ThemeProvider` to scope a theme:

```tsx
import { ThemeProvider, createTheme } from 'diapos'

<ThemeProvider theme={createTheme({ colors: { accent: '#00ff00' } })}>
  <MyComponent /> {/* sees green accent */}
</ThemeProvider>
```

## Creating a Theme Pack

A theme pack is a directory of React components that implement the Diapos prop interfaces and consume theme tokens via `var(--diapos-*)`. The built-in Zurich theme is itself a theme pack — you can create your own with a completely different visual style.

### Directory Structure

```
src/themes/my-theme/
├── index.ts           # barrel export
├── theme.ts           # createTheme() preset
├── Slide.tsx          # wraps core Slide with theme styling
├── Title.tsx
├── Heading.tsx
├── Text.tsx
├── Code.tsx
├── Image.tsx
├── Quote.tsx
├── Block.tsx
├── BulletPoints.tsx
├── Enumerate.tsx
├── Item.tsx
├── Columns.tsx
├── Column.tsx
├── ProgressBar.tsx    # optional
└── SlideCounter.tsx   # optional
```

### Prop Interfaces

Import the shared prop types from `'diapos'`. Every theme component must accept these interfaces:

```ts
import type {
  SlideProps, TitleProps, HeadingProps, TextProps, CodeProps,
  ImageProps, QuoteProps, BlockProps, BulletPointsProps,
  EnumerateProps, ItemProps, ColumnsProps, ColumnProps,
} from 'diapos'
```

All interfaces include `style?: CSSProperties` and `className?: string`. User-provided `style` must always win (spread it last).

### Theme Preset

Create a token preset with `createTheme()`:

```ts
// theme.ts
import { createTheme } from 'diapos'

export const myTheme = createTheme({
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#f59e0b',
    muted: '#94a3b8',
    code: '#1e293b',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    code: "'Fira Code', monospace",
  },
  spacing: { slide: '64px' },
  borderRadius: '8px',
})
```

### Slide Component

The Slide component wraps the core `Slide` base and adds theme-specific layout styling:

```tsx
// Slide.tsx
import { Slide as SlideBase } from 'diapos'  // core Slide handles theme prop, notes, etc.
import type { SlideProps } from 'diapos'

export type { SlideProps }

export function Slide({ children, style, className, ...props }: SlideProps) {
  return (
    <SlideBase
      className={className}
      style={{
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'left',
        gap: '0.75em',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg)',
        fontSize: '1.15em',
        lineHeight: 1.55,
        padding: 'var(--diapos-spacing-slide, 80px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </SlideBase>
  )
}
```

### Pauseable Components

Components that support `pause` must call `usePause(pause)` and spread the returned style. The `usePause` hook returns `{ style: { visibility: 'hidden' } }` for unrevealed items or `{ style: {} }` otherwise.

```tsx
// Heading.tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

export type { HeadingProps }

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <Tag
      data-slot="heading"
      data-level={Tag}
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-heading)',
        fontSize: '2.4rem',
        fontWeight: 600,
        lineHeight: 1.2,
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
```

The style spread order matters: **defaults → pauseStyle → user style**.

Components that need `usePause`: `Heading`, `Text`, `BulletPoints`, `Enumerate`, `Item`.

### Chrome Components

`ProgressBar` and `SlideCounter` use the `useDeck()` hook to read navigation state:

```tsx
// ProgressBar.tsx
import { useDeck } from 'diapos'

export function ProgressBar() {
  const { currentIndex, totalSlides } = useDeck()
  const progress = totalSlides > 1 ? ((currentIndex + 1) / totalSlides) * 100 : 100

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px' }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: 'var(--diapos-accent)',
        transition: 'width 0.3s ease',
      }} />
    </div>
  )
}
```

### Block Variants

`Block` maps its `variant` prop to different theme tokens:

```tsx
// Block.tsx
import type { BlockProps } from 'diapos'

const variantColors = {
  default: { border: 'var(--diapos-accent)', title: 'var(--diapos-accent)' },
  alert:   { border: 'var(--diapos-danger)', title: 'var(--diapos-danger)' },
  example: { border: 'var(--diapos-success)', title: 'var(--diapos-success)' },
}

export function Block({ title, variant = 'default', children, style, className }: BlockProps) {
  const colors = variantColors[variant] ?? variantColors.default

  return (
    <div className={className} style={{ borderLeft: `2px solid ${colors.border}`, padding: '1.25em 1.5em', ...style }}>
      {title && <div style={{ fontWeight: 500, color: colors.title, marginBottom: '0.5em' }}>{title}</div>}
      <div>{children}</div>
    </div>
  )
}
```

### Rules

1. **Use `var(--diapos-*)` for all colors and fonts** — never hardcode values that should come from the theme.
2. **Accept `style` and `className` on every component** — spread `style` last so user overrides win.
3. **Call `usePause(pause)` in pauseable components** and spread the returned style.
4. **Wrap the core `Slide`** — don't reimplement slide logic. The core Slide handles `theme`, `notes`, flex layout, and overflow.
5. **Set `data-slot` attributes** on root elements for external styling hooks (e.g., `data-slot="heading"`, `data-slot="code"`).
6. **Re-export prop types** from each component file for TypeScript consumers.

### Data-Slot Convention

| Component | `data-slot` |
|-----------|-------------|
| Slide | `"slide"` |
| Title | `"title"` |
| Heading | `"heading"` (+ `data-level`) |
| Text | `"text"` |
| Code | `"code"` (+ `data-language`) |
| Image | `"image"` |
| Quote | `"quote"` |
| Block | `"block"` (+ `data-variant`) |
| BulletPoints | `"bullets"` |
| Enumerate | `"enumerate"` |
| Item | `"item"` |

## Exports

| Export | Description |
|--------|-------------|
| `createTheme(overrides)` | Deep-merge partial overrides into the default theme |
| `defaultTheme` | The built-in default theme object |
| `zurichTheme` | Alias for `defaultTheme` |
| `useTheme()` | Hook to access the current theme object |
| `usePause(pause)` | Hook for progressive reveal in theme components |
| `useDeck()` | Hook for navigation state (used by chrome components) |
| `ThemeProvider` | React context provider for scoping themes |
| `Theme` | TypeScript type for a full theme |
| `ThemeColors` | TypeScript type for `theme.colors` |
| `ThemeFonts` | TypeScript type for `theme.fonts` |
| `DeepPartial<T>` | Utility type for partial theme overrides |
| `SlideProps`, `TitleProps`, ... | Prop interfaces for each component |
