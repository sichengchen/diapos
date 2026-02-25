---
id: 005
title: Theme system
status: done
shipped_at: 2026-02-25
type: feature
priority: 5
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
created: 2026-02-25
---

# Theme system

## Context
Users need to style their presentations with consistent themes. This adds a theming layer that layout components consume.

## Approach
1. Define a `Theme` type with tokens: colors (background, foreground, accent, code), fonts (heading, body, code), spacing, and border radius
2. Create a `ThemeContext` and `<ThemeProvider>` component
3. Create a `useTheme()` hook for consuming the theme
4. Build a default theme with clean, modern defaults
5. Allow `<Deck theme={myTheme}>` to apply a custom theme
6. Apply theme tokens via CSS custom properties on the root element so all children inherit them
7. Create a `createTheme()` helper for partial theme overrides

## Files to change
- `src/theme/types.ts` (create — Theme type definition)
- `src/theme/ThemeContext.tsx` (create — theme context and provider)
- `src/theme/defaultTheme.ts` (create — built-in default theme)
- `src/theme/createTheme.ts` (create — helper for partial overrides)
- `src/hooks/useTheme.ts` (create — theme consumption hook)
- `src/components/Deck.tsx` (modify — integrate ThemeProvider)
- `src/theme/__tests__/createTheme.test.ts` (create — theme merge tests)

## Verification
- Run: `bun run test`
- Expected: Default theme applies correctly, createTheme merges partial overrides, CSS custom properties are set
- Edge cases: Empty override object, deeply nested theme tokens
