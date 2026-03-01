---
id: 2
title: Expand theme token set
status: done
type: chore
lane: atomic
parent: 1
priority: 1
created: 2026-03-01
spec: theming.md
finished_at: 2026-03-01
---
# Expand theme token set

## Context

The current theme system has 4 colors (background, foreground, accent, code) and 9 CSS vars total. Block component hardcodes alert (#ef4444) and example (#22c55e) colors. The theming spec calls for 7 colors (adding muted, danger, success) and 12 CSS vars.

## Scope

- [x] Add `muted`, `danger`, `success` to `ThemeColors` interface in `types.ts`
- [x] Add default values for new colors in `defaultTheme.ts`
- [x] Add `--diapos-muted`, `--diapos-danger`, `--diapos-success` to `themeToCSS()` in `ThemeContext.tsx`
- [x] Update `Block` component to use `var(--diapos-danger)` and `var(--diapos-success)` instead of hardcoded hex

## Files Affected

- `packages/diapos/src/theme/types.ts`
- `packages/diapos/src/theme/defaultTheme.ts`
- `packages/diapos/src/theme/ThemeContext.tsx`
- `packages/diapos/src/components/blocks/Block.tsx`

## Verification

- `bun run typecheck`
- `bun run lint`
- `bun run test`

## Spec Impact

Aligns implementation with `specs/theming.md` token definitions.

## Progress

- Added `muted`, `danger`, `success` to `ThemeColors` in `types.ts`
- Added default values (`#94a3b8`, `#ef4444`, `#22c55e`) in `defaultTheme.ts`
- Added `--diapos-muted`, `--diapos-danger`, `--diapos-success` CSS vars to `themeToCSS()` in `ThemeContext.tsx`
- Updated `Block` alert/example variants to use `var(--diapos-danger)` and `var(--diapos-success)` with `color-mix()` for backgrounds
- Verification: typecheck ✓, lint ✓ (0 errors), tests ✓ (71/71)
