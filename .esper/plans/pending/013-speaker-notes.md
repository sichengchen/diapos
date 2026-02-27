---
id: 013
title: Speaker notes support
status: pending
type: feature
priority: 2
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---

# Speaker notes support

## Context
Slides currently have no way to carry speaker notes. The presenter view (plan 014) needs access to notes for the current and next slides. Notes should be declarable directly in TSX alongside each slide. With Approach D (plan 012), `<Slide>` is always the explicit frame boundary, so adding `notes` as a prop on `<Slide>` is clean and consistent.

## Approach
1. Add a `notes` prop to `<Slide>` — accepts a string or React node
2. Store notes in DeckContext so they're accessible to any consumer (the presenter view will read them)
3. Extend `DeckState` with `notes: Record<number, ReactNode>` mapping slide index → notes content
4. Collect notes from children in `<Deck>` during the child flattening pass (which already walks `<Section>` → `<Slide>` trees per plan 012) — read `notes` prop from each `<Slide>` element
5. Export a `useNotes()` hook that returns `{ current: ReactNode | null, next: ReactNode | null }` based on `currentIndex`
6. Update the example presentation to include notes on several slides

Depends on: plan 012 (component architecture overhaul) should be complete first, since notes collection happens during the same child flattening pass.

## Files to change
- `packages/diapos/src/components/Slide.tsx` (modify — add notes prop to SlideProps)
- `packages/diapos/src/context/DeckContext.tsx` (modify — store and expose notes)
- `packages/diapos/src/hooks/useNotes.ts` (create — hook to access current/next notes)
- `packages/diapos/src/hooks/useDeck.ts` (modify — include notes in DeckState if needed)
- `packages/diapos/src/index.ts` (modify — export useNotes)
- `examples/demo/slides.tsx` (modify — add notes to example slides)

## Verification
- Run: `bun run test` — test that notes are collected and accessible via useNotes
- Expected: `useNotes()` returns correct notes for current and next slide
- Edge cases: Slides without notes (should return null), last slide (next notes should be null)
