---
id: 016
title: README, docs, and specs
status: pending
type: feature
priority: 2
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---

# README, docs, and specs

## Context
Diapos has no documentation yet — no README, no user-facing docs, no specs. As Phase 2 transforms diapos into a publishable framework, documentation becomes essential:
- **README.md** — first thing users see on npm/GitHub
- **docs/** — end-user guides (getting started, API reference, theming, presenting)
- **specs/** — machine-readable component specs for coding agents (AI assistants that help users build with diapos)

All documentation should target the Approach D component architecture (exploration 001), even if some components aren't implemented yet — this serves as both user guide and design spec.

Depends on: plan 012 (component architecture overhaul) should ideally be complete first so docs match reality, but specs/ can be written as a target spec beforehand.

## Approach

### 1. README.md
- Project tagline and description (code-first presentation framework in React)
- Quick start: `npx create-diapos my-slides` → `cd my-slides` → `bun dev`
- Minimal example showing a 3-slide deck with `<Deck>`, `<Slide>`, `<Title>`, `<Code>`
- Links to full docs
- Tech stack badges (React, TypeScript, Vite)

### 2. docs/ (end-user guides)
- `docs/getting-started.md` — installation, project setup, first presentation
- `docs/components.md` — all components with props tables and examples:
  - Structural: `<Deck>`, `<Slide>`, `<Section>`
  - Content layouts: `<Title>`, `<Code>`, `<Image>`, `<Quote>`
  - Building blocks: `<Block>`, `<Columns>`/`<Column>`
  - Progressive reveal: `<Step>`
  - Chrome: `<ProgressBar>`, `<SlideCounter>`
- `docs/theming.md` — `createTheme()`, CSS custom properties, theme object shape
- `docs/custom-layouts.md` — `createLayout()` factory, building your own content components
- `docs/presenting.md` — presenter view, projector view, BroadcastChannel sync, speaker notes
- `docs/hooks.md` — `useDeck()`, `useTheme()`, `useFullscreen()`, `useNotes()`

### 3. specs/ (for coding agents)
Machine-readable component specs that coding agents can reference when helping users. Each spec is a markdown file with:
- Component name, import path, and TypeScript props interface
- Behavioral contract (what the component does, how it interacts with Deck/Theme context)
- Valid usage patterns (where it can appear in the tree)
- Constraints (what it must NOT do)

Files:
- `specs/deck.md` — Deck root, child flattening, metadata, auto title slide
- `specs/slide.md` — frame boundary, theme typography, notes prop
- `specs/section.md` — wrapper, auto-divider, nesting rules
- `specs/step.md` — progressive reveal, StepContext, sub-slide expansion
- `specs/layouts.md` — Title, Code, Image, Quote — content components inside Slide
- `specs/blocks.md` — Block, Columns, Column — intra-slide building blocks
- `specs/theming.md` — Theme type, createTheme, CSS custom properties, ThemeContext
- `specs/navigation.md` — DeckContext, useDeck, keyboard/touch nav, BroadcastChannel sync
- `specs/create-layout.md` — createLayout factory contract

## Files to change
- `README.md` (create — project README)
- `docs/getting-started.md` (create)
- `docs/components.md` (create)
- `docs/theming.md` (create)
- `docs/custom-layouts.md` (create)
- `docs/presenting.md` (create)
- `docs/hooks.md` (create)
- `specs/deck.md` (create)
- `specs/slide.md` (create)
- `specs/section.md` (create)
- `specs/step.md` (create)
- `specs/layouts.md` (create)
- `specs/blocks.md` (create)
- `specs/theming.md` (create)
- `specs/navigation.md` (create)
- `specs/create-layout.md` (create)

## Verification
- Run: manual review — all docs render correctly as markdown
- Expected: README has working quick start, docs cover all public API, specs cover all component contracts
- Edge cases: Ensure docs/specs match the actual implementation (cross-reference with source after plan 012)
