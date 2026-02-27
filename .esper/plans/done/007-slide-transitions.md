---
id: 007
title: Slide transitions
status: done
shipped_at: 2026-02-26
type: feature
priority: 7
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
created: 2026-02-25
---

# Slide transitions

## Context
Slides need smooth transitions when navigating. This adds configurable transition effects between slides.

## Approach
1. Define a `Transition` type: `'none' | 'fade' | 'slide'`
2. Create a `<TransitionWrapper>` component that wraps the active slide and applies CSS transitions
3. Use CSS transitions (opacity for fade, transform for slide) — no heavy animation libraries
4. Allow setting transition at Deck level (default for all slides) or per-slide override
5. Respect `prefers-reduced-motion` media query — disable transitions when set
6. Keep transition duration configurable (default 300ms)

## Files to change
- `src/components/TransitionWrapper.tsx` (create — transition animation layer)
- `src/types.ts` (create or modify — Transition type)
- `src/components/Deck.tsx` (modify — integrate transition wrapper)
- `src/components/Slide.tsx` (modify — accept transition prop override)
- `src/styles/transitions.css` (create — transition CSS)

## Verification
- Run: `bun run test`
- Expected: TransitionWrapper renders children, applies correct CSS classes
- Edge cases: Rapid navigation (debounce or queue), reduced-motion preference, transition='none'
