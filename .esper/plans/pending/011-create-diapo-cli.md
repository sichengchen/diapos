---
id: 011
title: create-diapos CLI scaffolder
status: pending
type: feature
priority: 2
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---

# create-diapos CLI scaffolder

## Context
Users need a quick way to start a new diapos presentation. `npx create-diapos my-slides` should scaffold a ready-to-run project that imports diapos as a dependency. The template lives in `packages/create-diapos/template/`.

## Approach
1. Create `packages/create-diapos/` with its own `package.json` (bin: `create-diapos`)
2. Write a minimal CLI script (`src/index.ts`) that:
   - Takes a project name argument (required)
   - Copies the template directory to `<project-name>/`
   - Replaces placeholder names in `package.json` with the project name
   - Runs `bun install` or prints "Run `bun install` to get started"
3. Create the template directory with:
   - `package.json` (depends on `diapos`, `react`, `react-dom`, `vite`, `@vitejs/plugin-react`)
   - `vite.config.ts` (minimal Vite + React config)
   - `tsconfig.json`
   - `src/slides.tsx` (starter presentation with 3 example slides)
   - `src/main.tsx` (mounts the presentation)
   - `src/theme.ts` (optional custom theme using `createTheme`)
   - `index.html`
4. Ensure the template works end-to-end: scaffold → install → `bun run dev` → slides render

## Files to change
- `packages/create-diapos/package.json` (create — CLI package config with bin field)
- `packages/create-diapos/src/index.ts` (create — CLI entry point)
- `packages/create-diapos/template/` (create — all template files)
- `packages/create-diapos/tsconfig.json` (create)

## Verification
- Run: `node packages/create-diapos/src/index.ts test-project` (or after build)
- Expected: `test-project/` directory created with all template files, correct package name
- Run: `cd test-project && bun install && bun run dev`
- Expected: Vite dev server starts, slides render in browser
- Edge cases: Project name with special characters, directory already exists
