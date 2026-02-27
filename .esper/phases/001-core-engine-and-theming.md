---
phase: 001-core-engine-and-theming
title: Core Engine and Theming
status: completed
---

# Phase 1: Core Engine and Theming

## Goal
Deliver a working slide engine where users can define slides in TSX, navigate between them, and apply themes. This phase establishes the foundational architecture that everything else builds on.

## In Scope
- Project scaffolding (Vite + React + TypeScript + Bun)
- `<Deck>` component that orchestrates slide navigation and state
- Slide definition in TSX — each slide is a React component
- Keyboard and click navigation (arrow keys, spacebar, click)
- Fullscreen presentation mode
- Theme system — define and apply themes (fonts, colors, spacing)
- Built-in slide layout components: `<Title>`, `<Content>`, `<Code>`, `<Image>`, `<Split>`
- Basic slide transitions (fade, slide)
- Progress indicator (slide number / total)
- Example presentation demonstrating all features

## Out of Scope (deferred)
- PDF / static HTML export
- Speaker notes and presenter view
- Plugin / extension system
- Animations within slides (beyond transitions between slides)
- CLI tooling for scaffolding new presentations
- Remote control / mobile companion
- Collaborative editing

## Acceptance Criteria
- [x] A user can create a new presentation by writing TSX files
- [x] Slides render correctly in the browser with Vite HMR
- [x] Arrow keys, spacebar, and click navigate between slides
- [x] Fullscreen mode works in modern browsers
- [x] At least one theme can be applied and customized
- [x] Built-in layout components (Title, Content, Code, Image, Split) work correctly
- [x] Slide transitions animate smoothly
- [x] Progress indicator shows current position
- [x] All tests pass (`bun run test`)
- [x] Lint and typecheck pass (`bun run lint`, `bun run typecheck`)

## Shipped Plans
- Plan 001 — Project scaffolding: Initialize a Vite project with the react-ts template using Bun. Files: package.json, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json, eslint.config.js, index.html, main.tsx, vite-env.d.ts
- Plan 002 — Deck and slide engine: Create a DeckContext with React context for slide state. Files: Deck.tsx, Slide.tsx, DeckContext.tsx, useDeck.ts, index.ts, Deck.test.tsx
- Plan 003 — Keyboard and click navigation: Add useKeyboardNavigation hook for arrow/space/home/end keys plus click navigation. Files: useKeyboardNavigation.ts, Deck.tsx, useKeyboardNavigation.test.tsx
- Plan 004 — Fullscreen mode and progress indicator: Add useFullscreen hook wrapping the Fullscreen API. Files: useFullscreen.ts, ProgressBar.tsx, SlideCounter.tsx, Deck.tsx
- Plan 005 — Theme system: Define a Theme type with tokens and create ThemeProvider with CSS custom properties. Files: types.ts, ThemeContext.tsx, defaultTheme.ts, createTheme.ts, useTheme.ts, Deck.tsx
- Plan 006 — Built-in layout components: Title, Content, Code, Image, Split slide layouts consuming theme tokens. Files: Title.tsx, Content.tsx, Code.tsx, Image.tsx, Split.tsx, index.ts, layouts.test.tsx
- Plan 007 — Slide transitions: Define a Transition type and create TransitionWrapper with CSS transitions. Files: TransitionWrapper.tsx, types.ts, Deck.tsx, transitions.css
- Plan 008 — Example presentation: Create a demo showcasing all features and layouts. Files: slides.tsx, theme.ts, main.tsx, global.css
