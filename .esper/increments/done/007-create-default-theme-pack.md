---
id: 7
title: Create default theme pack
status: done
type: feature
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Create default theme pack

## Context

The 2-layer architecture separates core engine from visual components. All visual components need to move from `components/` to `themes/default/` to form the default theme pack.

## Scope

- [x] Move layout components (Title, Heading, Text, BulletPoints, Enumerate, Item, Code, Image, Quote) to `themes/default/`
- [x] Move block components (Block, Columns, Column) to `themes/default/`
- [x] Move chrome components (ProgressBar, SlideCounter) to `themes/default/`
- [x] Create default theme's Slide wrapper with visual defaults (font, color, padding, gap)
- [x] Create `themes/default/index.ts` barrel
- [x] Update all imports (Deck, index.ts, tests)
- [x] Main barrel exports styled Slide from default theme (not core's headless Slide)

## Files Affected

- `packages/diapos/src/themes/default/` (all components moved here)
- `packages/diapos/src/themes/default/Slide.tsx` (new — wraps core Slide)
- `packages/diapos/src/themes/default/index.ts` (new)
- `packages/diapos/src/core/Deck.tsx` (updated default chrome imports)
- `packages/diapos/src/index.ts` (updated all component imports)
- `packages/diapos/src/core/__tests__/Deck.test.tsx` (moved, imports updated)
- `packages/diapos/src/themes/default/__tests__/` (moved, imports updated)
- `packages/diapos/src/core/utils/__tests__/parseSlides.test.tsx` (imports updated)

## Verification

- `bun run typecheck` ✓
- `bun run test` ✓ (71/71)

## Spec Impact

Implements default theme pack from `specs/theming.md`. Visual components are now cleanly separated from core engine.

## Progress

- Moved 14 visual components to `themes/default/`
- Created Slide wrapper that adds visual defaults back (font, color, padding, gap, text-align)
- Created barrel export for default theme
- Updated Deck to import chrome from `themes/default/`
- Main barrel re-exports default theme's styled Slide
- Removed stale layouts barrel
- All verification passing
