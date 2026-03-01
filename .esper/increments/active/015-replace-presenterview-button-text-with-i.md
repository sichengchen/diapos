---
id: 15
title: Replace PresenterView button text with icons
status: active
type: feature
lane: atomic
priority: 1
created: 2026-03-01
spec: views-router.md
spec_section: Status Bar
---
# Replace PresenterView button text with icons

## Context

The PresenterView status bar has five buttons using plain text labels: "Prev", "Next", "Pause"/"Resume", "Light"/"Dark", and "Play". Replacing these with icons gives the bar a cleaner, more compact look typical of presentation tools, and communicates function visually without language dependency.

## Scope

1. Add `lucide-react` as a dependency of `packages/diapos` — lightweight, tree-shakeable, MIT-licensed icon library that fits the React/Tailwind stack.
2. Replace button text in `PresenterShell` with Lucide icon components:
   - **Prev** → `ChevronLeft`
   - **Next** → `ChevronRight`
   - **Pause / Resume** → `Pause` / `Play` (timer control icons)
   - **Light / Dark** → `Sun` / `Moon`
   - **Play** (open projector) → `Monitor` (or `Presentation`)
3. Add an `icon` size variant to the `Button` component (square, no horizontal padding) so icon-only buttons render correctly.
4. Ensure every icon-only button has an `aria-label` for accessibility.

## Files Affected
- `packages/diapos/package.json` (modify — add `lucide-react` dependency)
- `packages/diapos/src/components/ui/Button.tsx` (modify — add `icon` size variant)
- `packages/diapos/src/views/PresenterView.tsx` (modify — swap text for icon components)

## Verification
- Run: `bun run typecheck`
- Expected: no type errors
- Run: `bun run lint`
- Expected: no lint errors
- Run: `bun run test`
- Expected: all tests pass
- Manual: open presenter view in dev server, confirm all five buttons render icons, tooltips/aria-labels are present, and both light/dark schemes look correct

## Spec Impact
- `views-router.md` — update Status Bar section to note buttons use icons instead of text labels

## Progress
- [x] Added `lucide-react@0.575.0` dependency
- [x] Added `icon` size variant (`h-8 w-8`) to Button component
- [x] Replaced all 5 button texts with Lucide icons in PresenterShell
- [x] Added `aria-label` to every icon-only button
- [x] Updated tests to query by aria-label instead of text
- [x] Updated `views-router.md` spec — Status Bar section
- [x] Verification: typecheck ✓, lint ✓, 45/45 tests pass ✓
