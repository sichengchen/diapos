---
id: 16
title: Add responsive phone layout to PresenterView
status: done
type: feature
lane: atomic
priority: 1
created: 2026-03-01
spec: views-router.md
spec_section: PresenterView
finished_at: 2026-03-01
---
# Add responsive phone layout to PresenterView

## Context

PresenterView uses a fixed 2-column grid (`grid-cols-[2fr_1fr]`) with no responsive breakpoints. On phones the columns are too narrow to be useful — the current slide becomes tiny and the next-slide preview is barely visible.

A phone-friendly presenter view matters because speakers often use their phone as a presenter remote: glancing at notes, seeing the current slide, and tapping to advance. The projector display is on the big screen; the phone just needs to be a usable control surface.

## Scope

1. **Responsive breakpoint at `md` (768px).**
   - Below `md`: single-column phone layout.
   - At `md` and above: existing 2-column desktop layout (unchanged).

2. **Phone layout (below `md`).**
   - Stack vertically: current slide preview (compact) → notes panel (scrollable, takes remaining space).
   - Hide the "Next Slide" preview entirely — not useful on a small screen.
   - Current slide keeps its 16:9 aspect ratio, scaled to fit the viewport width minus padding.

3. **Status bar adapts.**
   - Keep the 3-section grid (nav / counter / controls).
   - Hide the timer and timer-toggle button below `md` — saves horizontal space, and the timer is less critical on a phone.
   - All remaining buttons stay icon-only; already touch-friendly at `h-8 w-8`.

4. **Labels hidden on phone.**
   - The "Current Slide" / "Notes" uppercase labels add visual noise on small screens. Hide them below `md`.

## Files Affected
- `packages/diapos/src/views/PresenterView.tsx` (modify — add Tailwind responsive classes)
- `packages/diapos/src/views/__tests__/views.test.tsx` (modify — add phone-layout test if needed)

## Verification
- Run: `bun run typecheck && bun run lint && bun run test`
- Expected: all pass, no regressions
- Manual: open dev server on a phone-sized viewport (375px wide) — single column, notes scroll, nav works

## Spec Impact
- `views-router.md` — add a "Responsive Behavior" subsection under PresenterView documenting the phone layout

## Progress
- [x] Main content: flex column on mobile, grid on desktop (`md:grid md:grid-cols-[2fr_1fr]`)
- [x] Next slide preview: hidden below md (`hidden md:flex`)
- [x] Labels: hidden below md (`hidden md:block`)
- [x] Timer + toggle: wrapped and hidden below md (`hidden md:flex`)
- [x] Current slide: `shrink-0` to prevent squishing on mobile
- [x] Right column: `flex-1` so notes fill remaining space on mobile
- [x] Verification: typecheck, lint, tests all pass
- [x] Spec updated: responsive layout documented in views-router.md
