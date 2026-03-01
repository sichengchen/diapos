# Architecture

Diapos uses a 2-layer architecture: a **core engine** and **theme packs**.

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
│  Tokens: ThemeProvider, createTheme, CSS vars       │
│  Prop interfaces: the contracts theme packs follow  │
└─────────────────────────────────────────────────────┘
```

**Core** is the presentation engine — state management, navigation, transitions, pause/reveal, sync, and design tokens. It exports hooks, prop interfaces, and two structural components (`Deck`, `Slide`). It imposes no CSS methodology.

**Theme packs** are sets of React components that consume core hooks and tokens. Theme authors use any CSS approach they want. Core provides the behavior; themes provide the visuals.

## Package Structure

```
packages/diapos/src/
├── core/
│   ├── index.ts              ← barrel: Deck, Slide, Section, hooks, tokens, prop types
│   ├── Deck.tsx
│   ├── Slide.tsx
│   ├── Section.tsx
│   ├── TransitionWrapper.tsx
│   ├── props.ts              ← all prop interfaces
│   ├── types.ts              ← Transition type
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
│   └── utils/
│       └── parseSlides.tsx
│
├── themes/
│   └── default/
│       ├── index.ts
│       ├── Slide.tsx          ← wraps core Slide (adds font, color, padding)
│       ├── Title.tsx
│       ├── Heading.tsx
│       ├── Text.tsx
│       ├── Code.tsx
│       ├── Image.tsx
│       ├── Quote.tsx
│       ├── Block.tsx
│       ├── BulletPoints.tsx
│       ├── Enumerate.tsx
│       ├── Item.tsx
│       ├── Columns.tsx
│       ├── Column.tsx
│       ├── ProgressBar.tsx
│       └── SlideCounter.tsx
│
├── views/
│   ├── PresenterView.tsx
│   └── ProjectorView.tsx
│
├── router.tsx
└── index.ts                   ← re-exports core + default theme pack
```

## Export Strategy

The top-level `diapos` import re-exports core + default theme pack. Users write:

```tsx
import { Deck, Slide, Title, Heading, Code } from 'diapos'
```

The `diapos` barrel (`src/index.ts`) exports:

| Category | Exports |
|----------|---------|
| Core engine | `Deck`, `Section`, `ThemeProvider` |
| Default theme | `Slide`, `Title`, `Heading`, `Text`, `Code`, `Image`, `Quote`, `Block`, `BulletPoints`, `Enumerate`, `Item`, `Columns`, `Column`, `ProgressBar`, `SlideCounter` |
| Hooks | `useDeck`, `usePause`, `useTheme`, `useFullscreen`, `useNotes`, `useSyncChannel` |
| Theme utilities | `createTheme`, `defaultTheme` |
| Views | `PresenterView`, `ProjectorView` |
| Router | `DiaposRouter`, `useRoute` |
| Types | `DeckProps`, `SlideProps`, `SectionProps`, `HeadingProps`, `TitleProps`, `TextProps`, `CodeProps`, `ImageProps`, `QuoteProps`, `BlockProps`, `BulletPointsProps`, `EnumerateProps`, `ItemProps`, `ColumnsProps`, `ColumnProps`, `PresenterViewProps`, `ProjectorViewProps`, `DeckState`, `Theme`, `ThemeColors`, `ThemeFonts`, `DeepPartial`, `Transition`, `DiaposRoute` |

Note: `Slide` is re-exported from the default theme (which wraps core's headless Slide), not from core directly.

### Sub-path exports (future)

Phase 1 (current): single `diapos` import.

Phase 2 (when external themes exist): add `diapos/core` for theme pack authors.

```json
{
  "exports": {
    ".":      "./src/index.ts",
    "./core": "./src/core/index.ts"
  }
}
```

## Constraints

- Core exports exactly 2 components (`Deck`, `Slide`) and all hooks/tokens/types. Everything visual is a theme pack concern.
- Core's `Slide` applies only structural CSS (display, dimensions, overflow, box-sizing). No colors, fonts, sizes, padding, or other visual properties.
- Token set is 12 CSS variables. Font sizes, weights, line heights, and element spacing are theme pack concerns.
- Core imposes no CSS methodology. Theme packs use whatever approach the author prefers.
- `<Slide>` is always the explicit frame boundary. Layouts are content components inside `<Slide>`, never wrappers around it.
- Named exports only. No default exports from library modules.
- Functional components only. No class components.
