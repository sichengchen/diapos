---
id: 008
title: Example presentation
status: pending
type: feature
priority: 8
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
created: 2026-02-25
---

# Example presentation

## Context
With all core features built, we need an example presentation that demonstrates every feature and serves as documentation for users.

## Approach
1. Create an example presentation in `examples/demo/` that showcases:
   - Title slide
   - Content slide with text
   - Code slide with syntax highlighting
   - Image slide
   - Split layout slide
   - Custom-themed slide
2. Wire up `src/main.tsx` to render the example presentation as the dev default
3. Ensure it runs cleanly with `bun run dev`
4. Add a brief README section about how to create your own presentation

## Files to change
- `examples/demo/slides.tsx` (create — example slide deck)
- `examples/demo/theme.ts` (create — custom theme example)
- `src/main.tsx` (modify — render example deck)
- `src/App.tsx` (create — app wrapper rendering the example)

## Verification
- Run: `bun run dev`
- Expected: Example presentation loads, all slides render, navigation works, transitions smooth
- Edge cases: HMR works when editing slides
