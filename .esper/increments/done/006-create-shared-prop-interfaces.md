---
id: 6
title: Create shared prop interfaces
status: done
type: chore
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Create shared prop interfaces

## Context

Core should export prop interfaces as contracts between core and theme packs. Currently each component defines its own props inline. Per the spec, `core/props.ts` centralizes all prop interfaces and adds `className` to all components.

## Scope

- [x] Create `core/props.ts` with all shared prop interfaces (SlideProps, HeadingProps, TitleProps, TextProps, CodeProps, ImageProps, QuoteProps, BlockProps, BulletPointsProps, EnumerateProps, ItemProps, ColumnsProps, ColumnProps)
- [x] Add `className` to all prop interfaces
- [x] Update all components to import from `core/props.ts` and pass `className` through
- [x] Export all prop types from `core/index.ts`
- [x] Add missing exports to main `index.ts` (Block, Columns, Column, usePause)

## Files Affected

- `packages/diapos/src/core/props.ts` (new)
- `packages/diapos/src/core/index.ts`
- `packages/diapos/src/core/Slide.tsx`
- `packages/diapos/src/components/layouts/*.tsx` (all 9 components)
- `packages/diapos/src/components/blocks/*.tsx` (Block, Columns, Column)
- `packages/diapos/src/index.ts`

## Verification

- `bun run typecheck` ✓
- `bun run test` ✓ (71/71)

## Spec Impact

Implements prop interfaces from `specs/theming.md`. Theme pack authors can now import prop types from core.

## Progress

- Created `core/props.ts` with 13 prop interfaces, all with `className`
- Updated all 12 components to import from core/props and pass className
- Updated core/index.ts to export all prop types
- Added Block, Columns, Column, usePause to main barrel
- All verification passing
