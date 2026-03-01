---
id: 4
title: Make Slide headless with per-slide theme
status: done
type: feature
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Make Slide headless with per-slide theme

## Context

Core Slide currently mixes structural and visual styles (font, color, padding, gap, text-align). Per the spec, it should be headless — structural CSS only. It also needs `data-slot="slide"` for CSS targeting and a `theme` prop for per-slide token overrides.

## Scope

- [x] Strip visual styles from Slide (font, color, padding, gap, text-align, justify-content, align-items)
- [x] Keep only structural CSS (width, height, display, flex-direction, overflow, box-sizing)
- [x] Add `data-slot="slide"` attribute
- [x] Add `theme` prop accepting `DeepPartial<Theme>` for per-slide overrides
- [x] Update `global.css` to use `[data-slot="slide"]` selector instead of `.diapos-slide`

## Files Affected

- `packages/diapos/src/core/Slide.tsx`
- `packages/diapos/src/styles/global.css`

## Verification

- `bun run typecheck` ✓
- `bun run test` ✓ (71/71)

## Spec Impact

Implements headless Slide from `specs/theming.md`. Visual styles will be reintroduced by the default theme pack's Slide wrapper (increment #007).

## Progress

- Stripped visual styles from core Slide (removed font, color, padding, gap, text-align, justify-content, align-items)
- Added `data-slot="slide"` attribute
- Added `theme` prop with nested ThemeProvider wrapping via `createTheme()`
- Updated `global.css` selectors from `.diapos-slide` to `[data-slot="slide"]`
- Removed `diapos-slide` class name (no longer needed)
- All verification passing
