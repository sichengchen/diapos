---
phase: 001-core-engine-and-theming
title: Core Engine and Theming
status: active
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
- [ ] A user can create a new presentation by writing TSX files
- [ ] Slides render correctly in the browser with Vite HMR
- [ ] Arrow keys, spacebar, and click navigate between slides
- [ ] Fullscreen mode works in modern browsers
- [ ] At least one theme can be applied and customized
- [ ] Built-in layout components (Title, Content, Code, Image, Split) work correctly
- [ ] Slide transitions animate smoothly
- [ ] Progress indicator shows current position
- [ ] All tests pass (`bun run test`)
- [ ] Lint and typecheck pass (`bun run lint`, `bun run typecheck`)
