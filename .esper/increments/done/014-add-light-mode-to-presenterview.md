---
id: 14
title: Add light mode to PresenterView
status: done
type: feature
lane: atomic
priority: 1
created: 2026-03-01
spec: views-router.md
finished_at: 2026-03-01
---
# Add light mode to PresenterView

## Context

The PresenterView UI chrome (shell, slide previews, notes panel, status bar, buttons) is entirely hard-coded to dark colors via Tailwind classes (`bg-slate-950`, `text-slate-100`, `border-slate-800`, etc.). The slide content itself respects the user's theme via CSS variables, but the surrounding presenter UI does not adapt. Users with light-colored slide themes get a jarring contrast between their slides and the dark presenter chrome.

## Scope

1. Add a `colorScheme?: 'light' | 'dark'` prop to `PresenterViewProps` (default: `'dark'` for backward compatibility)
2. Create a `PresenterColorScheme` context to propagate the value to sub-components
3. Define a color-class map (`presenterColors`) for light vs dark — background, foreground, muted text, borders, panels, etc.
4. Update all PresenterView sub-components (`PresenterShell`, `SlidePreview`, `NotesPanel`, `Timer`, `EndOfPresentation`) to read from the context and apply the correct classes
5. Add light-compatible `ghost` and `play` button variants (e.g. `ghostLight`, `playLight`) to the Button component, or make Button consume the presenter color scheme
6. Update the Separator component to accept a className override (it already does) and pass the correct border color from the presenter shell

## Files Affected
- `packages/diapos/src/views/PresenterView.tsx` (modify — add colorScheme prop, context, and color-mapped classes throughout)
- `packages/diapos/src/components/ui/Button.tsx` (modify — add light-mode button variants)
- `packages/diapos/src/index.ts` (modify — export PresenterViewProps if not already exported with the new type)

## Verification
- Run: `bun run typecheck`
- Expected: no type errors
- Run: `bun run lint`
- Expected: no lint errors
- Run: `bun run test`
- Expected: all tests pass
- Manual: open dev server, mount `<PresenterView colorScheme="light">` — presenter chrome should have white/light-gray background, dark text, and correctly styled buttons; slide previews still render with the slide theme's own colors
- Manual: mount `<PresenterView>` (no prop) — presenter chrome should look identical to current dark UI (backward compatible)

## Spec Impact
- `specs/views-router.md` — add `colorScheme` prop to PresenterView section

## Progress
- [x] Add `colorScheme` prop to `PresenterViewProps`
- [x] Define `presenterColors` map (light/dark) with class tokens for shell, panel, label, muted, notes, separator, buttons
- [x] Thread `colors` object through all sub-components via props
- [x] Add `ghostLight` and `playLight` button variants to `Button.tsx`
- [x] Update `Separator` usage with className override for light border color
- [x] Update `specs/views-router.md` with new prop
- [x] Verification: typecheck, lint, tests all pass
