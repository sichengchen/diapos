---
id: 9
title: Increase heading margin-top in default theme
status: done
type: fix
lane: atomic
priority: 1
created: 2026-03-01
spec: default-theme.md
spec_section: Heading
finished_at: 2026-03-01
---
# Increase heading margin-top in default theme

## Context
The default theme's Heading component has `margin: 0`. Spacing between slide children comes solely from the Slide wrapper's `gap: 0.5em`. This is adequate for body content but too tight when multiple headings are stacked (e.g. a heading followed by a subheading).

## Scope
- Add `marginTop: '0.3em'` to the Heading component's inline styles so consecutive headings get additional breathing room.

## Files Affected
- `packages/diapos/src/themes/default/Heading.tsx` (modify — change `margin: 0` to `margin: '0.3em 0 0 0'`)

## Verification
- Run: `bun run typecheck && bun run test`
- Expected: all pass, no regressions

## Spec Impact
- `specs/default-theme.md` — update Heading section to reflect `margin: 0.3em 0 0 0` instead of `margin 0`

## Progress
- [x] Updated `Heading.tsx`: `margin: 0` → `margin: '0.3em 0 0 0'`
- [x] Typecheck passes
- [x] All 71 tests pass
- [x] Spec updated: `default-theme.md` Heading section
