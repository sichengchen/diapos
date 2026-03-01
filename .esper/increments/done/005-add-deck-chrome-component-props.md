---
id: 5
title: Add Deck chrome component props
status: done
type: feature
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Add Deck chrome component props

## Context

Deck hardcodes ProgressBar and SlideCounter imports. Theme packs need to provide their own chrome components. Per the spec, Deck should accept `progress`, `counter`, and `decorator` as ComponentType props.

## Scope

- [x] Replace `showProgress`/`showCounter` boolean props with `progress`/`counter` ComponentType props
- [x] Add `decorator` prop (ComponentType rendered inside each slide)
- [x] Add `style` and `className` passthrough to Deck
- [x] Default `progress` to ProgressBar, `counter` to SlideCounter (backwards-compatible)
- [x] Update ProjectorView and tests to use new prop names

## Files Affected

- `packages/diapos/src/core/Deck.tsx`
- `packages/diapos/src/views/ProjectorView.tsx`
- `packages/diapos/src/core/hooks/__tests__/useSyncChannel.test.tsx`

## Verification

- `bun run typecheck` ✓
- `bun run test` ✓ (71/71)

## Spec Impact

Implements Deck chrome props from `specs/theming.md`. Theme packs can now provide custom progress/counter/decorator components.

## Progress

- Replaced `showProgress`/`showCounter` with `progress`/`counter` as `ComponentType | false`
- Added `decorator` prop rendered inside TransitionWrapper alongside slide content
- Added `style`/`className` passthrough
- Default chrome imports ProgressBar/SlideCounter from components (will move to default theme in #007)
- Updated ProjectorView and sync test to use new API
- All verification passing
