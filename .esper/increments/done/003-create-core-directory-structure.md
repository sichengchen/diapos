---
id: 3
title: Create core directory structure
status: done
type: chore
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Create core directory structure

## Context

The theming spec defines a 2-layer architecture: core engine + theme packs. This increment creates the `core/` directory and moves all engine files there.

## Scope

- [x] Create `core/` directory with subdirectories: context, hooks, theme, utils, styles
- [x] Move engine components (Deck, Slide, Section, TransitionWrapper) to `core/`
- [x] Move context, hooks, theme, utils, styles, and types into `core/`
- [x] Update all import paths in moved files and files that reference them
- [x] Create `core/index.ts` barrel export

## Files Affected

- All files under `src/core/` (moved from various locations)
- `src/components/layouts/*.tsx` (import path updates)
- `src/components/ProgressBar.tsx`, `src/components/SlideCounter.tsx` (import path updates)
- `src/views/PresenterView.tsx`, `src/views/ProjectorView.tsx` (import path updates)
- `src/components/__tests__/*.tsx`, `src/core/*/__tests__/*.tsx` (import path updates)
- `src/index.ts` (import path updates)

## Verification

- `bun run typecheck` ✓
- `bun run lint` ✓ (0 errors)
- `bun run test` ✓ (71/71)

## Spec Impact

Implements the package structure from `specs/theming.md` — core/ directory with engine, hooks, tokens.

## Progress

- Created `core/` directory structure
- Moved all engine files (Deck, Slide, Section, TransitionWrapper, context, hooks, theme, utils, styles, types)
- Fixed all import paths across 19 files
- Created `core/index.ts` barrel export
- All verification passing
