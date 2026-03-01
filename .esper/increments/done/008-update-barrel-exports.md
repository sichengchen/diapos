---
id: 8
title: Update barrel exports
status: done
type: chore
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Update barrel exports

## Context

Final increment: ensure all three barrel exports (index.ts, core/index.ts, themes/default/index.ts) are complete and correct.

## Scope

- [x] Verify `core/index.ts` exports engine, hooks, tokens, prop interfaces
- [x] Verify `themes/default/index.ts` exports all styled components
- [x] Add missing exports to `index.ts` (Section, SectionProps, ThemeProvider)
- [x] Run full verification suite

## Files Affected

- `packages/diapos/src/index.ts`

## Verification

- `bun run typecheck` ✓
- `bun run lint` ✓ (0 errors)
- `bun run test` ✓ (71/71)

## Spec Impact

Completes the public API surface per `specs/theming.md`.

## Progress

- Added Section, SectionProps, ThemeProvider to main barrel
- All three barrels verified complete
- Full verification passing
