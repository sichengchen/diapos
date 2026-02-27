---
id: 002
title: Deck and slide engine
status: done
shipped_at: 2026-02-25
type: feature
priority: 2
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
pr: https://github.com/sichengchen/diapo/pull/1
created: 2026-02-25
---

# Deck and slide engine

## Context
With scaffolding in place, we need the core `<Deck>` component that manages slide state and renders the active slide. This is the heart of the framework.

## Approach
1. Create a `DeckContext` with React context for slide state (current index, total, navigation functions)
2. Create `<Deck>` component that:
   - Accepts children as slides (each child = one slide)
   - Manages current slide index in state
   - Provides `next()`, `prev()`, `goTo(index)` navigation functions via context
   - Renders only the active slide
3. Create `<Slide>` wrapper component for individual slides (handles layout container, background)
4. Write unit tests for navigation logic (next, prev, bounds checking, goTo)

## Files to change
- `src/components/Deck.tsx` (create — main deck orchestrator)
- `src/components/Slide.tsx` (create — slide wrapper)
- `src/context/DeckContext.tsx` (create — slide state context)
- `src/hooks/useDeck.ts` (create — hook to consume deck context)
- `src/index.ts` (create — public API exports)
- `src/components/__tests__/Deck.test.tsx` (create — deck tests)

## Verification
- Run: `bun run test`
- Expected: Navigation logic tests pass — next/prev cycle correctly, bounds are respected
- Edge cases: First slide prev() stays at 0, last slide next() stays at last index
