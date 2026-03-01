---
status: draft
created: 2026-03-01
---
# Agent Skill: Diapos Authoring Guide

## Overview

A knowledge document that teaches AI agents how to create Diapos presentations and theme packs. Agents consume it as context when working in a Diapos project.

## Delivery

**Location:** `skills/SKILL.md` (project-local, checked into the repo)

**Frontmatter:**
```yaml
name: diapos
description: Create Diapos presentations and theme packs.
```

## Content Structure

### 1. What is Diapos

Diapos is a React presentation framework. Slides are TSX components. Presentations are static Vite apps.

### 2. Project Structure

```
src/
├── main.tsx          # DiaposRouter wiring
├── slides.tsx        # Slide content + projector/presenter exports
└── theme.ts          # (optional) custom createTheme() call
```

Router wiring in `main.tsx`:

```tsx
import { DiaposRouter } from 'diapos'
import { Presentation, Presenter } from './slides'
import 'diapos/styles.css'

<DiaposRouter
  title="..."
  projector={<Presentation />}
  presenter={<Presenter />}
/>
```

### 3. Slide Authoring

```tsx
import {
  PresenterView, ProjectorView, Slide,
  Title, Heading, Text, BulletPoints, Enumerate, Item,
  Code, Image, Quote, Block, Columns, Column,
} from 'diapos'

const slides = (
  <>
    <Slide notes="Speaker notes here.">
      <Title title="..." subtitle="..." />
    </Slide>
    ...
  </>
)

export function Presentation() {
  return <ProjectorView transition="fade">{slides}</ProjectorView>
}

export function Presenter() {
  return <PresenterView>{slides}</PresenterView>
}
```

Rules:
- `<Slide>` is the frame boundary. Content components go inside.
- Import from `'diapos'`.
- Every slide gets `notes`.
- Use `pause` for progressive reveal.
- Share one JSX fragment between `ProjectorView` and `PresenterView`.

### 4. Component Reference

| Component | Key Props | Usage |
|---|---|---|
| `<Slide>` | `notes`, `theme` | Frame boundary |
| `<Title>` | `title` (required), `subtitle` | Title card |
| `<Heading>` | `children`, `as` (h1-h6), `pause` | Heading |
| `<Text>` | `children`, `pause` | Paragraph |
| `<BulletPoints>` | `children`, `pause` | Unordered list |
| `<Enumerate>` | `children`, `pause` | Ordered list |
| `<Item>` | `children`, `pause` | List item |
| `<Code>` | `code` (string), `language` | Code block |
| `<Image>` | `src`, `alt`, `caption`, `contain` | Image |
| `<Quote>` | `quote`, `author` | Blockquote |
| `<Block>` | `title`, `variant` (default/alert/example), `children` | Content box |
| `<Columns>` | `ratio` (grid-template-columns), `gap` | Multi-column grid |
| `<Column>` | `children` | Column |

All components accept `style` and `className`.

### 5. Pause / Progressive Reveal

Add `pause` to content components. Each `pause` adds one sub-step within the slide.

```tsx
<Slide notes="Reveal features one by one.">
  <Heading>Features</Heading>
  <BulletPoints>
    <Item pause>First feature</Item>
    <Item pause>Second feature</Item>
    <Item pause>Third feature</Item>
  </BulletPoints>
</Slide>
```

### 6. Theme Customization

```ts
import { createTheme } from 'diapos'

export const myTheme = createTheme({
  colors: {
    background: '#1a1a2e',
    foreground: '#eaeaea',
    accent: '#e94560',
    muted: '#a1a1aa',
    code: '#16213e',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    code: "'JetBrains Mono', monospace",
  },
  spacing: { slide: '80px' },
  borderRadius: '4px',
})
```

Apply to `<ProjectorView theme={myTheme}>` or individual `<Slide theme={myTheme}>`. Unspecified values inherit from the default theme.

CSS custom properties: `--diapos-bg`, `--diapos-fg`, `--diapos-accent`, `--diapos-muted`, `--diapos-code-bg`, `--diapos-danger`, `--diapos-success`, `--diapos-font-heading`, `--diapos-font-body`, `--diapos-font-code`, `--diapos-spacing-slide`, `--diapos-radius`.

### 7. Theme Pack Authoring

A theme pack is a directory of components implementing the Diapos prop interfaces:

```
src/themes/<name>/
├── index.ts           # barrel
├── theme.ts           # createTheme(...) preset
├── Slide.tsx
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
├── ProgressBar.tsx     # optional
└── SlideCounter.tsx    # optional
```

Rules:
- Import prop types from `'diapos'`: `SlideProps`, `HeadingProps`, `TitleProps`, etc.
- Import `usePause` from `'diapos'` for pauseable components.
- Every component with `pause` calls `usePause(pause)` and spreads the returned style.
- Set `data-slot` on root elements.
- Use `var(--diapos-*)` custom properties for colors and fonts.
- All components accept `style` and `className`.

Pauseable component pattern:

```tsx
import { usePause } from 'diapos'
import type { HeadingProps } from 'diapos'

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)
  return (
    <Tag
      data-slot="heading"
      data-level={Tag}
      className={className}
      style={{ /* theme styles */, ...pauseStyle, ...style }}
    >
      {children}
    </Tag>
  )
}
```

Data-slot convention:

| Component | data-slot |
|---|---|
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

### 8. Quality Standards

**Slides:**
- Every slide has speaker notes.
- Progressive reveal used selectively.
- 8-15 slides for a standard talk.
- Concise content — bullet points over paragraphs.
- Code examples in `<Code>` blocks with language hints.
- Clear arc: intro, body, conclusion.

**Theme packs:**
- All 13 required components implemented.
- Pauseable components call `usePause` correctly.
- `data-slot` on all root elements.
- Token preset covers all fields.
- Cohesive visual identity.
- Components use `var(--diapos-*)` custom properties.
