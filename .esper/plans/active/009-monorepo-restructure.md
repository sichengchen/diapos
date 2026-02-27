---
id: 9
title: Monorepo restructure
status: active
type: feature
priority: 1
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---
# Monorepo restructure

## Context
Diapos is currently a single Vite app project with `private: true` in package.json. The library source lives in `src/` and the example in `examples/demo/`. To make diapos installable as a dependency, we need to split into a monorepo with separate packages.

## Approach
1. Initialize a Bun/npm workspace at the root with `packages/*` glob
2. Move the library source (`src/`, `tsconfig.app.json`, etc.) into `packages/diapos/`
3. Configure `packages/diapos/package.json` with proper `exports`, `main`, `module`, `types` fields and `react`/`react-dom` as peer dependencies
4. Set up Vite library mode build in `packages/diapos/vite.config.ts` to output ESM + type declarations
5. Move the example presentation into `packages/create-diapos/template/` (will be used by the scaffolder in a later plan)
6. Create a root `package.json` with workspace config, shared scripts, and dev dependencies
7. Update the root `index.html` and `vite.config.ts` to point to the example/dev playground
8. Ensure `bun run test`, `bun run lint`, `bun run typecheck` all work from the root

## Files to change
- `package.json` (modify — convert to workspace root)
- `packages/diapos/package.json` (create — library package config)
- `packages/diapos/vite.config.ts` (create — library build config)
- `packages/diapos/tsconfig.json` (create — library tsconfig)
- `packages/diapos/src/` (move — all library source from `src/`)
- `packages/create-diapos/` (create — placeholder for CLI package)
- Root `vite.config.ts` (modify — dev playground config)
- Root `tsconfig.json` (modify — workspace references)

## Verification
- Run: `bun run test` from root
- Run: `bun run lint` and `bun run typecheck` from root
- Run: `cd packages/diapos && bun run build` produces dist/ with ESM + .d.ts files
- Expected: All pass, library builds cleanly with proper exports
- Edge cases: Path aliases (`@/`) must resolve correctly in both dev and build modes
