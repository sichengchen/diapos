---
id: 003
title: Keyboard and click navigation
status: done
shipped_at: 2026-02-25
type: feature
priority: 3
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
created: 2026-02-25
---

# Keyboard and click navigation

## Context
The Deck engine manages slide state, but users need to actually navigate. This adds keyboard shortcuts and click-based navigation.

## Approach
1. Add a `useKeyboardNavigation` hook that listens for:
   - `ArrowRight` / `ArrowDown` / `Space` → next slide
   - `ArrowLeft` / `ArrowUp` → previous slide
   - `Home` → first slide
   - `End` → last slide
   - Number keys → go to slide N
2. Integrate the hook into `<Deck>`
3. Add click navigation — clicking the right half goes forward, left half goes back (optional, can be disabled via prop)
4. Write tests for keyboard event handling

## Files to change
- `src/hooks/useKeyboardNavigation.ts` (create — keyboard event listener)
- `src/components/Deck.tsx` (modify — integrate keyboard hook)
- `src/hooks/__tests__/useKeyboardNavigation.test.ts` (create — keyboard tests)

## Verification
- Run: `bun run test`
- Expected: Keyboard events trigger correct navigation
- Edge cases: Keys work when Deck is focused, don't interfere with input elements
