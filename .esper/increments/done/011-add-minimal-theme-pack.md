---
id: 11
title: Add minimal theme pack
status: done
type: feature
lane: atomic
parent: 10
priority: 1
created: 2026-03-01
spec: themes/minimal.md
finished_at: 2026-03-01
---
# Add minimal theme pack

## Context

The framework ships a single default theme (dark, system-ui). Users need alternative theme packs they can import for different visual identities. The minimal theme targets a light, clean, whitespace-heavy aesthetic.

## Scope

1. Create `minimalTheme` token preset via `createTheme()`
2. Implement all 15 components with minimal styling (lighter weights, more whitespace, subtle accents)
3. Barrel export at `themes/minimal/index.ts`
4. Add sub-path export `diapos/themes/minimal` (multi-entry vite build)
5. Export `minimalTheme` from main `diapos` barrel
6. Write spec at `specs/themes/minimal.md`
7. Verify typecheck + lint + test

## Files Affected

- `packages/diapos/src/themes/minimal/` (new — 17 files)
- `packages/diapos/src/index.ts` (add minimalTheme export)
- `packages/diapos/vite.config.ts` (multi-entry)
- `packages/diapos/package.json` (exports map)
- `specs/themes/minimal.md` (new spec)

## Verification

```
bun run typecheck
bun run lint
bun run test
```

## Spec Impact

New spec: `specs/themes/minimal.md`

## Progress
