---
id: 004
title: Fullscreen mode and progress indicator
status: done
shipped_at: 2026-02-25
type: feature
priority: 4
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
pr: https://github.com/sichengchen/diapo/pull/1
created: 2026-02-25
---

# Fullscreen mode and progress indicator

## Context
Presentations need fullscreen support and a way to show progress. This builds on the existing Deck engine.

## Approach
1. Add `useFullscreen` hook wrapping the Fullscreen API
   - `f` key toggles fullscreen
   - `Escape` exits (browser default)
2. Add a `<ProgressBar>` component showing current slide / total as a thin bar at the bottom
3. Add a slide counter overlay (e.g., "3 / 12") that can be toggled
4. Both components read from `DeckContext`

## Files to change
- `src/hooks/useFullscreen.ts` (create — fullscreen API wrapper)
- `src/components/ProgressBar.tsx` (create — progress indicator)
- `src/components/SlideCounter.tsx` (create — slide number display)
- `src/components/Deck.tsx` (modify — integrate fullscreen and progress)

## Verification
- Run: `bun run test`
- Expected: Progress bar renders correct width, counter shows correct numbers
- Edge cases: Fullscreen API not available (graceful fallback), single-slide deck
