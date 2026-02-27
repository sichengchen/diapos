---
id: 12
title: Component architecture overhaul (Approach D)
status: active
type: feature
priority: 2
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---
# Component architecture overhaul (Approach D)

## Context
Exploration 001 concluded that diapos should adopt Approach D: a React-idiomatic tree structure where `<Slide>` is always the explicit frame boundary. This is a breaking change from Phase 1 where layouts like `<Content>` and `<Title>` secretly wrapped `<Slide>` internally. The new architecture makes slides composable — layouts are just content components used *inside* `<Slide>`, not magic wrappers around it.

Key decisions from the exploration:
- `<Content>` is removed — redundant, just write JSX directly in `<Slide>`
- `<Split>` is removed — replaced by the more flexible `<Columns>`/`<Column>`
- `<Slide>` provides default theme typography (font-family, color from CSS vars)
- `<Section>` is a wrapper that groups slides and auto-inserts a divider slide
- `<Deck>` accepts metadata props and can auto-generate a title slide

## Approach

### 1. Refactor `<Slide>` to provide theme typography
- `<Slide>` applies `font-family`, `color`, `font-size` from CSS custom variables (`--diapos-font-body`, `--diapos-color-text`)
- This means plain `<h2>`, `<p>`, `<ul>` inside a slide look styled without a wrapper

### 2. Refactor existing layouts to stop wrapping `<Slide>`
- `<Title>` — renders title/subtitle content in a `<div>`, no longer wraps `<Slide>`
- `<Code>` — renders code block content in a `<div>`, no longer wraps `<Slide>`
- `<Image>` — renders image content in a `<div>`, no longer wraps `<Slide>`

### 3. Remove `<Content>` and `<Split>`
- Delete `Content.tsx` and `Split.tsx`
- Remove their exports from `index.ts`
- Users write plain JSX inside `<Slide>` instead of `<Content>`
- `<Columns>`/`<Column>` replaces `<Split>` with N-column support

### 4. Add new building blocks
- `<Block title="..." variant="default|alert|example">` — titled content box (Beamer's block/alertblock/exampleblock)
- `<Columns ratio="1fr 2fr">` — N-column CSS grid container
- `<Column>` — single column within `<Columns>`

### 5. Add `<Quote>` layout
- `<Quote quote="..." author="...">` — renders quotation content with attribution

### 6. Add `<Section>` wrapper
- `<Section title="..." subtitle="...">` wraps child `<Slide>` elements
- `<Deck>` flattens the tree: `<Section>` auto-inserts a divider `<Slide>` before its children
- Divider slide uses the `<Title>` component internally with section title/subtitle

### 7. `<Deck>` child flattening
- Walk `<Deck>` children: direct `<Slide>` → pass through; `<Section>` → insert divider + children
- This replaces the current flat `Children.toArray` pass

### 8. `<Deck>` metadata + auto title slide
- Add props: `title`, `subtitle`, `author`, `date`, `autoTitleSlide` (default `true`)
- When `autoTitleSlide` is true, prepend a `<Slide><Title ... /></Slide>` from metadata

### 9. `createLayout()` factory
- `createLayout<P>(render, defaultStyles?)` — returns a content component with theme access + style forwarding
- Users use this to define custom content components that work inside `<Slide>`

### 10. Update example presentation
- Wrap all slides in explicit `<Slide>` tags
- Replace `<Content>` with plain JSX
- Replace `<Split>` with `<Columns>`/`<Column>`
- Add `<Section>` grouping
- Demonstrate `<Block>` and `<Quote>`

## Files to change
- `packages/diapos/src/components/Slide.tsx` (modify — add theme typography defaults)
- `packages/diapos/src/components/layouts/Title.tsx` (modify — stop wrapping `<Slide>`, render content only)
- `packages/diapos/src/components/layouts/Code.tsx` (modify — stop wrapping `<Slide>`, render content only)
- `packages/diapos/src/components/layouts/Image.tsx` (modify — stop wrapping `<Slide>`, render content only)
- `packages/diapos/src/components/layouts/Content.tsx` (delete — redundant)
- `packages/diapos/src/components/layouts/Split.tsx` (delete — replaced by Columns)
- `packages/diapos/src/components/layouts/Quote.tsx` (create — quotation layout)
- `packages/diapos/src/components/blocks/Block.tsx` (create — titled content box)
- `packages/diapos/src/components/blocks/Columns.tsx` (create — N-column grid)
- `packages/diapos/src/components/blocks/Column.tsx` (create — single column)
- `packages/diapos/src/components/Section.tsx` (create — section wrapper)
- `packages/diapos/src/components/Deck.tsx` (modify — child flattening for Section, metadata props, auto title slide)
- `packages/diapos/src/templates/createLayout.ts` (create — layout factory utility)
- `packages/diapos/src/index.ts` (modify — update exports: remove Content/Split, add new components)
- `examples/demo/slides.tsx` (modify — update to Approach D usage)

## Verification
- Run: `bun run test` — all existing tests updated, new tests for Block, Columns, Section, createLayout, Deck flattening
- Run: `bun run typecheck` — no type errors
- Expected: `<Slide>` always explicit, layouts composable inside slides, Section auto-generates dividers
- Manual: Example presentation renders with Sections, Blocks, Columns, Quote
- Edge cases: Section with no children, Deck with no metadata (no auto title slide), nested Columns
