---
id: 006
title: Built-in layout components
status: done
shipped_at: 2026-02-26
type: feature
priority: 6
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
created: 2026-02-25
---

# Built-in layout components

## Context
Users need pre-built layout components to author slides quickly without writing CSS. These consume theme tokens.

## Approach
1. `<Title>` — centered title slide with title + optional subtitle
2. `<Content>` — standard slide with heading and body content area
3. `<Code>` — slide with a syntax-highlighted code block (use a lightweight highlighter like Prism or Shiki)
4. `<Image>` — full-bleed or contained image slide with optional caption
5. `<Split>` — two-column layout (left/right content)
6. All components consume theme tokens via CSS custom properties
7. Each component accepts standard HTML props for customization

## Files to change
- `src/components/layouts/Title.tsx` (create)
- `src/components/layouts/Content.tsx` (create)
- `src/components/layouts/Code.tsx` (create)
- `src/components/layouts/Image.tsx` (create)
- `src/components/layouts/Split.tsx` (create)
- `src/components/layouts/index.ts` (create — barrel export)
- `src/components/layouts/__tests__/layouts.test.tsx` (create — render tests)

## Verification
- Run: `bun run test`
- Expected: Each layout renders without errors, applies theme tokens, accepts children/props
- Edge cases: Empty children, very long text, missing image src
