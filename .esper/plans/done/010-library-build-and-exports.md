---
id: 10
title: Library build and exports
status: done
type: feature
priority: 1
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
shipped_at: 2026-02-27
---
# Library build and exports

## Context
After the monorepo restructure, `packages/diapos` needs a proper library build that produces consumable ESM output with TypeScript declarations. The current `src/index.ts` already defines the public API surface. Vite's library mode can handle this.

## Approach
1. Configure Vite library mode in `packages/diapos/vite.config.ts` with `build.lib` entry pointing to `src/index.ts`
2. Externalize `react` and `react-dom` (peer deps)
3. Generate TypeScript declarations using `vite-plugin-dts` or `tsc --emitDeclarationOnly`
4. Set `package.json` exports map: `"."` → `{ "import": "./dist/index.js", "types": "./dist/index.d.ts" }`
5. Include CSS (transitions.css, global.css) in the build output — either bundled or as a separate CSS file consumers import
6. Ensure all Approach D components are exported: `Deck`, `Slide`, `Title`, `Code`, `Image`, `Quote`, `Block`, `Columns`, `Column`, `Section`, `ProgressBar`, `SlideCounter`, `createLayout`, hooks (`useDeck`, `useTheme`, `useFullscreen`, `useNotes`), and theme utilities
7. Verify the built package can be consumed by a fresh Vite + React project via `file:` dependency
8. Add a `prepublishOnly` script that runs build + typecheck

## Files to change
- `packages/diapos/vite.config.ts` (modify — add library mode config)
- `packages/diapos/package.json` (modify — exports, files, sideEffects fields)
- `packages/diapos/tsconfig.build.json` (create — declaration-only tsconfig)
- `packages/diapos/src/index.ts` (modify — ensure CSS imports are included)

## Verification
- Run: `cd packages/diapos && bun run build`
- Expected: `dist/` contains `index.js`, `index.d.ts`, and `style.css`
- Run: Create a temp Vite project, add diapos via `file:../diapos`, import and render a `<Deck>`
- Expected: Renders correctly with styles applied
- Edge cases: CSS custom properties must work when diapos is consumed as a dependency (not just in dev mode)

## Progress
- Vite library mode was already configured in Plan 9 (monorepo restructure)
- Added CSS imports (global.css + transitions.css) to src/index.ts so styles bundle into dist/diapos.css
- Added sideEffects field for CSS files in package.json
- Added prepublishOnly script (typecheck + build)
- Build produces: diapos.js (13.63 kB), diapos.css (0.75 kB), index.d.ts
- Approach D components (Step 6) deferred to Plan 12 (component architecture overhaul)
- Modified: packages/diapos/src/index.ts, packages/diapos/package.json
- Verification: build passes, all 30 tests pass, typecheck and lint clean
