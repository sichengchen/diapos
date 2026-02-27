---
phase: 002-packaging-templates-and-presenter
title: Packaging, Templates, and Presenter
status: active
---

# Phase 2: Packaging, Templates, and Presenter

## Goal
Transform diapos from a standalone app into a publishable framework with a monorepo structure, an npx starter script, an improved template system, and a full presenter mode with speaker notes and dual-view sync.

## In Scope
- Monorepo restructure: `packages/diapos` (library) + `packages/create-diapos` (CLI scaffolder)
- Library build configuration (Vite library mode, proper exports, peer dependencies)
- `npx create-diapos` CLI that scaffolds a new presentation project
- **Component architecture overhaul (Approach D from exploration 001)**:
  - `<Slide>` becomes the always-explicit frame boundary (breaking change from Phase 1)
  - Remove `<Content>` (redundant) and `<Split>` (replaced by `<Columns>`)
  - Refactor `<Title>`, `<Code>`, `<Image>` to be content components inside `<Slide>` (no longer wrap `<Slide>`)
  - New structural: `<Section>` as wrapper that groups slides + auto-inserts divider
  - New building blocks: `<Block>`, `<Columns>`/`<Column>`
  - New layout: `<Quote>`
  - `createLayout()` factory for user-defined content components
  - `<Slide>` provides default theme typography via CSS vars
  - `<Deck>` metadata props (`title`, `author`, `date`) + auto title slide
  - `<Deck>` child flattening for `<Section>` tree
- Speaker notes support on slides (`notes` prop on `<Slide>`)
- Presenter view route (notes + current slide + next slide preview)
- Projector view route (fullscreen current slide only)
- BroadcastChannel-based sync between presenter and projector tabs
- URL-based routing for views (simple hash routing)

## Out of Scope (deferred)
- `<Step>` / progressive reveal (separate plan 015, needs sub-slide expansion engine)
- PDF / static HTML export
- Animations within slides (beyond slide transitions)
- Plugin / extension system
- Remote control / cross-device sync (WebSocket)
- Collaborative editing
- Visual editor / WYSIWYG
- Publishing to npm (build and packaging are in scope, but the actual `npm publish` step is deferred)

## Acceptance Criteria
- [ ] Monorepo structure with `packages/diapos` and `packages/create-diapos`
- [ ] `diapos` builds as a library with proper ESM exports and TypeScript declarations
- [ ] `npx create-diapos my-slides` scaffolds a working presentation project
- [ ] `<Slide>` is always explicit — layouts are content components inside `<Slide>`
- [ ] `<Content>` and `<Split>` removed; `<Columns>`/`<Column>` replaces Split
- [ ] `<Section>` groups slides and auto-generates divider slides
- [ ] `<Block>`, `<Quote>`, `createLayout()` available
- [ ] `<Deck>` metadata props generate auto title slide
- [ ] Slides accept `notes` prop for speaker notes
- [ ] `/presenter` route shows notes + current slide + next slide preview
- [ ] `/` (or `/projector`) route shows fullscreen slide only
- [ ] BroadcastChannel syncs slide navigation between presenter and projector tabs
- [ ] All tests pass (`bun run test`)
- [ ] Lint and typecheck pass (`bun run lint`, `bun run typecheck`)

## Phase Notes
Phase 1 architecture is solid — DeckContext/ThemeContext split, CSS custom properties for theming, and the DeckInner pattern all carry forward cleanly. The component architecture shifts to Approach D (exploration 001): `<Slide>` is always explicit, layouts become content components, `<Content>` and `<Split>` are removed. This is a breaking change but acceptable since Phase 1 has no external consumers.

## Shipped Plans
- Plan 9 — Monorepo restructure: Initialize a Bun/npm workspace at the root with `packages/*` glob. Files: package.json, vite.config.ts, tsconfig.app.json, tsconfig.node.json, eslint.config.js, packages/diapos/package.json, packages/diapos/vite.config.ts, packages/diapos/tsconfig.json, packages/create-diapos/package.json
- Plan 10 — Library build and exports: Configure Vite library mode with CSS bundling and vite-plugin-dts declarations. Files: packages/diapos/src/index.ts, packages/diapos/package.json
- Plan 11 — create-diapos CLI scaffolder: CLI that scaffolds a ready-to-run diapos project from template. Files: packages/create-diapos/src/index.ts, packages/create-diapos/template/*
- Plan 13 — Speaker notes support: Add a `notes` prop to `<Slide>` — accepts a string or React node. Files: Slide.tsx, DeckContext.tsx, Deck.tsx, useNotes.ts, index.ts, slides.tsx
- Plan 14 — Presenter and projector views with sync: Add hash router, BroadcastChannel sync, presenter view with notes/preview/timer, and projector view. Files: useSyncChannel.ts, router.tsx, ProjectorView.tsx, PresenterView.tsx, parseSlides.ts, Deck.tsx, index.ts, main.tsx
- Plan 15 — Step progressive reveal: Create Step wrapper component with sub-slide expansion in Deck. Files: Step.tsx, StepContext.tsx, parseSlides.tsx, index.ts, slides.tsx, main.tsx
- Plan 16 — README, docs, and specs: README, user docs (getting-started, components, theming, presenting, hooks), and agent specs (deck, slide, section, layouts, blocks, theming, navigation). Files: README.md, docs/*, specs/*
