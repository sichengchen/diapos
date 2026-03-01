# Theming

Diapos uses a 2-layered architecture: a **core engine** and **theme packs**.

```
┌─────────────────────────────────────────────────────┐
│  Theme Pack                                         │
│  React components styled with any CSS approach      │
│  Tailwind, CSS modules, styled-components, etc.     │
│  All visual opinions live here                      │
├─────────────────────────────────────────────────────┤
│  Core                                               │
│  Engine: Deck, transitions, parseSlides, contexts   │
│  Hooks: useDeck, usePause, useTheme, ...            │
│  Tokens: ThemeProvider, createTheme, CSS vars        │
│  Prop interfaces: the contracts theme packs follow  │
└─────────────────────────────────────────────────────┘
```

Core is the presentation engine — state management, navigation, transitions, pause/reveal, sync, and design tokens. It exports **hooks and prop interfaces**, not visual components.

Theme packs are sets of React components that consume core hooks and tokens. Theme authors use **any CSS approach they want** — Tailwind, CSS modules, styled-components, vanilla CSS, or plain inline styles. Core doesn't impose a styling method.

---

## Core

### What core exports

#### Engine

| Export | What it does |
|--------|-------------|
| `Deck` | The presentation engine. Manages slide parsing, keyboard/click navigation, fullscreen, sync channel, transitions. Wraps children in `ThemeProvider` and `DeckProvider`. Accepts `decorator` prop for per-slide overlays and `progress`/`counter` component props for chrome. |
| `Slide` | Structural container. Full-size flex box with no visual styles. Passes `className` and `style` through. Accepts optional `theme` prop for per-slide token overrides (wraps children in nested `ThemeProvider`). |
| `Section` | Marker component for slide grouping. Deck reads its props during flattening. |
| `TransitionWrapper` | Internal. Manages enter/exit CSS class toggling for transitions. |
| `parseSlides` | Internal. Extracts slides from Deck children, counts `pause` props, expands into sub-slides with `PauseProvider`. |

`Deck` and `Slide` are the only components core exports. All other visual components come from theme packs.

`Slide` is in core because:
1. `parseSlides` needs to identify slide boundaries (it checks direct children)
2. It's the structural container all themes share — full-size, flex-column, overflow-hidden
3. It's the mount point for per-slide theme overrides

`Slide` is headless — it applies only structural CSS (display, dimensions, overflow, box-sizing). Visual properties (font, color, padding, gap, text-align) are applied by the theme pack when wrapping it.

#### Headless Slide

```tsx
export function Slide({ children, theme, style, className }: SlideProps) {
  const content = (
    <div
      data-slot="slide"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )

  return theme ? <ThemeProvider theme={theme}>{content}</ThemeProvider> : content
}
```

#### Hooks

Hooks are the primary headless API. Theme pack components call them for behavior.

| Hook | Purpose | Used by |
|------|---------|---------|
| `usePause(pause?: boolean)` | Returns `{ style: { visibility } }`. One-line integration for incremental reveal. | Heading, Text, BulletPoints, Enumerate, Item — any pauseable component |
| `useDeck()` | Returns `{ currentIndex, totalSlides, direction, next, prev, goTo }` | ProgressBar, SlideCounter, any deck-aware component |
| `useTheme()` | Returns current `Theme` object from context | Components needing programmatic token access |
| `useFullscreen(ref)` | Toggles fullscreen on a ref | Deck (internal) |
| `useNotes()` | Returns speaker notes for current slide | PresenterView |
| `useSyncChannel(state, role)` | Presenter/projector sync via BroadcastChannel | PresenterView, ProjectorView |
| `useKeyboardNavigation(deckState)` | Arrow key / space navigation | Deck (internal) |

The `usePause` pattern in theme pack components:

```tsx
// Any CSS approach — just call the hook
import { usePause } from 'diapos'

function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag
      data-slot="heading"
      className={className}
      style={{ ...pauseStyle, ...style }}
    >
      {children}
    </Tag>
  )
}
```

#### Tokens

| Type | Fields |
|------|--------|
| `ThemeColors` | `background`, `foreground`, `accent`, `muted`, `code`, `danger`, `success` |
| `ThemeFonts` | `heading`, `body`, `code` |
| `Theme` | `colors: ThemeColors`, `fonts: ThemeFonts`, `spacing: { slide: string }`, `borderRadius: string` |

12 CSS custom properties:

| CSS Property | Token |
|-------------|-------|
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

Font sizes, font weights, line heights, element spacing, and all other visual decisions are **not tokens** — they belong in theme packs. Different themes use different typographic scales; the token system doesn't try to capture all of them.

#### `createTheme(overrides: DeepPartial<Theme>): Theme`

Deep-merges overrides into `defaultTheme`.

```ts
const theme = createTheme({
  colors: { accent: '#8B0000', muted: '#6b7280' },
  fonts: { heading: 'Georgia, serif' },
})
```

#### `defaultTheme`

```ts
const defaultTheme: Theme = {
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#3b82f6',
    muted: '#94a3b8',
    code: '#1e293b',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    code: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  spacing: { slide: '64px' },
  borderRadius: '8px',
}
```

#### Prop interfaces

Core exports prop type interfaces that define the contract between core and theme packs. Theme pack components implement these signatures. This enables mix-and-match: import `Title` from one theme and `Code` from another.

```ts
export interface SlideProps {
  children: ReactNode
  theme?: DeepPartial<Theme>
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}

export interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface TitleProps {
  title: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
  className?: string
}

export interface TextProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface CodeProps {
  code: string
  language?: string
  style?: CSSProperties
  className?: string
}

export interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
  className?: string
}

export interface QuoteProps {
  quote: ReactNode
  author?: ReactNode
  style?: CSSProperties
  className?: string
}

export interface BlockProps {
  title?: string
  variant?: 'default' | 'alert' | 'example'
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export interface BulletPointsProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface EnumerateProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface ItemProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface ColumnsProps {
  ratio?: string
  gap?: string
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export interface ColumnProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}
```

#### Deck chrome

Deck accepts chrome as component props so theme packs can provide their own visual implementations:

```ts
interface DeckProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition
  transitionDuration?: number
  clickNavigation?: boolean
  progress?: ComponentType | false
  counter?: ComponentType | false
  decorator?: ComponentType
  sync?: 'presenter' | 'projector'
  style?: CSSProperties
  className?: string
}
```

- `progress` — component rendered at bottom of deck (default: theme's ProgressBar, `false` to hide)
- `counter` — component rendered at bottom-right (default: theme's SlideCounter, `false` to hide)
- `decorator` — component rendered inside each slide (for logos, footers, watermarks)

Chrome components use `useDeck()` to read state. Deck renders them without knowing their visual implementation.

#### Per-slide token overrides

`Slide` accepts an optional `theme` prop. When provided, wraps children in a nested `ThemeProvider`:

```tsx
<Deck theme={myTheme}>
  <Slide>Uses myTheme tokens</Slide>
  <Slide theme={createTheme({ colors: { background: '#fff', foreground: '#000' } })}>
    Light slide in a dark deck
  </Slide>
</Deck>
```

### Why these components are NOT in core

| Component | Why theme pack, not core |
|-----------|------------------------|
| `Title` | No behavior. Multi-element (div + h1 + p). Themes want full layout control — centered vs. left-aligned, with/without crest, etc. |
| `Code` | No behavior. Multi-element (pre + code). Themes may add syntax highlighting, line numbers, copy buttons. |
| `Image` | No behavior. Multi-element (div + img + figcaption). Themes control border treatment, caption styling. |
| `Quote` | No behavior. Multi-element (div + blockquote + p). Themes control typography, quotation marks, attribution layout. |
| `Block` | No behavior. Variant colors are visual opinions. Themes decide border treatment, backgrounds, title styling. |
| `Columns` / `Column` | No behavior. Pure CSS grid/flex layout. Themes may use different layout systems entirely. |
| `Heading` | `usePause` is 1-line hook call. Theme authors call `usePause` directly — wrapping a headless component saves nothing over using the hook. |
| `Text`, `BulletPoints`, `Enumerate`, `Item` | Same as Heading — `usePause` is the API, not a component. |
| `ProgressBar` | `useDeck` is the API. Themes render progress however they want — bar, dots, fraction, none. |
| `SlideCounter` | `useDeck` is the API. Themes render count however they want. |

**The principle:** if the behavior is a hook call, export the hook — not a component wrapping the hook. Components belong in theme packs where visual decisions are made.

---

## Theme Packs

A theme pack is a set of React components that implement core's prop interfaces. Theme authors use **any CSS approach** — the components are standard React.

### What a theme pack provides

All components are optional. A minimal theme can export just a few; users import the rest from the default theme or write their own.

**Content components:** Title, Heading, Text, Code, Image, Quote, Block, BulletPoints, Enumerate, Item, Columns, Column

**Chrome components:** ProgressBar, SlideCounter

**Slide wrapper** (optional): wraps core's `Slide` to add visual defaults (font, color, padding) and decorations (logo, footer).

**Deck wrapper** (optional): wraps core's `Deck` to preset theme tokens, chrome components, and decorators.

### How theme authors build components

**Using Tailwind:**
```tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

const sizes = {
  h1: 'text-6xl font-bold',
  h2: 'text-4xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
}

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag
      data-slot="heading"
      data-level={Tag}
      className={cn('font-heading leading-tight', sizes[Tag], className)}
      style={{ ...pauseStyle, ...style }}
    >
      {children}
    </Tag>
  )
}
```

**Using CSS modules:**
```tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'
import styles from './Heading.module.css'

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag
      data-slot="heading"
      className={cn(styles.heading, styles[Tag], className)}
      style={{ ...pauseStyle, ...style }}
    >
      {children}
    </Tag>
  )
}
```

**Using styled-components:**
```tsx
import styled from 'styled-components'
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

const StyledH2 = styled.h2`
  font-family: var(--diapos-font-heading);
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
`

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return <StyledH2 as={Tag} data-slot="heading" className={className} style={{ ...pauseStyle, ...style }}>{children}</StyledH2>
}
```

**Using inline styles (simplest):**
```tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag
      data-slot="heading"
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-heading)',
        fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
        fontWeight: 700,
        lineHeight: 1.15,
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

### Multi-element components

For components with multiple inner elements (Title, Code, Image, Quote, Block), theme authors write the full component from scratch. These are simple — typically 10-20 lines of JSX. The core provides prop interfaces and hooks; the theme owns all DOM structure and styling.

```tsx
// Tailwind Title — theme writes from scratch
import type { TitleProps } from 'diapos'

export function Title({ title, subtitle, style, className }: TitleProps) {
  return (
    <div data-slot="title" className={cn('flex flex-col justify-center items-center text-center w-full flex-1', className)} style={style}>
      <h1 className="font-heading text-7xl font-bold leading-tight">{title}</h1>
      {subtitle && <p className="font-body text-2xl text-muted mt-4">{subtitle}</p>}
    </div>
  )
}
```

### Wrapping core's Slide

Theme packs typically wrap the core `Slide` to add visual defaults:

```tsx
// University theme — Slide with logo
import { Slide as SlideBase } from 'diapos'
import type { SlideProps } from 'diapos'
import logo from './logo.svg'

export function Slide({ className, children, ...props }: SlideProps) {
  return (
    <SlideBase
      className={cn('font-body text-lg leading-relaxed p-12 text-white relative', className)}
      {...props}
    >
      {children}
      <img src={logo} className="absolute bottom-6 right-6 h-10 opacity-80" alt="" />
    </SlideBase>
  )
}
```

### Wrapping core's Deck

Theme packs wrap Deck to preset tokens, chrome, and decorators:

```tsx
// University theme — Deck with defaults
import { Deck as DeckBase, createTheme } from 'diapos'
import type { DeckProps } from 'diapos'
import { ProgressBar } from './ProgressBar'
import { SlideCounter } from './SlideCounter'

const universityTheme = createTheme({
  colors: { accent: '#8B0000', background: '#1a1a2e' },
  fonts: { heading: 'Georgia, serif', body: 'Charter, serif' },
})

export function Deck({ theme, ...props }: DeckProps) {
  return (
    <DeckBase
      theme={theme ?? universityTheme}
      progress={ProgressBar}
      counter={SlideCounter}
      {...props}
    />
  )
}
```

### User experience

```tsx
// Just works — default theme
import { Deck, Slide, Title, Heading, Code } from 'diapos'

// Tweak colors — createTheme
import { Deck, Slide, Title, Heading, createTheme } from 'diapos'
const theme = createTheme({ colors: { accent: '#e11d48' } })
<Deck theme={theme}>...

// University theme — swap import
import { Deck, Slide, Title, Heading } from 'diapos-theme-university'

// Mix and match
import { Deck, Slide } from 'diapos-theme-university'
import { Code } from 'diapos'  // default theme's Code

// Full DIY — use hooks directly
import { Deck, Slide, usePause, useDeck } from 'diapos'
// Write your own components
```

### Data attributes

Theme pack components are expected to set `data-slot` on their root element. This enables CSS-based targeting as an escape hatch:

| Component | Attributes |
|-----------|-----------|
| Slide | `data-slot="slide"` (set by core) |
| Title | `data-slot="title"` |
| Heading | `data-slot="heading"`, `data-level="h1".."h6"` |
| Text | `data-slot="text"` |
| Code | `data-slot="code"`, `data-language="ts"` |
| Image | `data-slot="image"` |
| Quote | `data-slot="quote"` |
| Block | `data-slot="block"`, `data-variant="default\|alert\|example"` |
| BulletPoints | `data-slot="bullets"` |
| Enumerate | `data-slot="enumerate"` |
| Item | `data-slot="item"` |

---

## Default theme pack

The `diapos` package ships a default theme pack. The top-level `diapos` import re-exports core + default theme pack, so `import { Deck, Slide, Title } from 'diapos'` gives the default styled experience.

The default theme pack uses inline styles with CSS variable references — the simplest approach, with no CSS build tool dependency.

---

## Package structure

```
packages/diapos/src/
├── core/
│   ├── index.ts              ← barrel: Deck, Slide, Section, hooks, tokens, prop types
│   ├── Deck.tsx
│   ├── Slide.tsx
│   ├── Section.tsx
│   ├── TransitionWrapper.tsx
│   ├── props.ts              ← all prop interfaces
│   ├── theme/
│   │   ├── ThemeContext.tsx
│   │   ├── types.ts
│   │   ├── defaultTheme.ts
│   │   └── createTheme.ts
│   ├── hooks/
│   │   ├── useDeck.ts
│   │   ├── usePause.ts
│   │   ├── useTheme.ts
│   │   ├── useFullscreen.ts
│   │   ├── useNotes.ts
│   │   ├── useSyncChannel.ts
│   │   └── useKeyboardNavigation.ts
│   ├── context/
│   │   ├── DeckContext.tsx
│   │   └── PauseContext.tsx
│   ├── utils/
│   │   └── parseSlides.tsx
│   └── styles/
│       └── transitions.css
│
├── themes/
│   └── default/
│       ├── index.ts
│       ├── Slide.tsx          ← wraps core Slide (adds font, color, padding)
│       ├── Title.tsx          ← from scratch
│       ├── Heading.tsx        ← uses usePause
│       ├── Text.tsx           ← uses usePause
│       ├── Code.tsx           ← from scratch
│       ├── Image.tsx          ← from scratch
│       ├── Quote.tsx          ← from scratch
│       ├── Block.tsx          ← from scratch
│       ├── BulletPoints.tsx   ← uses usePause
│       ├── Enumerate.tsx      ← uses usePause
│       ├── Item.tsx           ← uses usePause
│       ├── Columns.tsx        ← from scratch
│       ├── Column.tsx         ← from scratch
│       ├── ProgressBar.tsx    ← uses useDeck
│       └── SlideCounter.tsx   ← uses useDeck
│
├── views/
│   ├── PresenterView.tsx
│   └── ProjectorView.tsx
│
└── index.ts                   ← re-exports core + default theme pack
```

### Phased sub-path exports

**Phase 1 (now):** Restructure internals into `core/` and `themes/default/`. Single public import: `diapos`. Top-level barrel re-exports everything.

**Phase 2 (when external themes exist):** Add `diapos/core` for theme pack authors.

```json
{
  "exports": {
    ".":      "./src/index.ts",
    "./core": "./src/core/index.ts"
  }
}
```

---

## Constraints

- Core exports exactly 2 components (`Deck`, `Slide`) and all hooks/tokens/types. Everything else is a theme pack concern.
- Core's `Slide` applies only structural CSS (display, dimensions, overflow, box-sizing). No colors, fonts, sizes, padding, or other visual properties.
- Token set is 12 CSS variables. Font sizes, weights, line heights, and element spacing are theme pack concerns.
- Theme packs consume tokens via CSS variables (`var(--diapos-*)`), not `useTheme()`. `useTheme()` exists for programmatic access but is not the primary styling mechanism.
- `createTheme` does not mutate `defaultTheme`.
- Theme values are strings (colors as hex/rgb/oklch/named, fonts as CSS font-family stacks, spacing as CSS length values).
- Theme pack components set `data-slot` on their root element. These attribute names are conventions, not enforced by core.
- Core imposes no CSS methodology. Theme packs use whatever CSS approach the author prefers.
