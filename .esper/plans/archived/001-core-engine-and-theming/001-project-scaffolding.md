---
id: 001
title: Project scaffolding
status: done
shipped_at: 2026-02-25
type: feature
priority: 1
phase: 001-core-engine-and-theming
branch: feature/001-core-engine-and-theming
pr: https://github.com/sichengchen/diapo/pull/1
created: 2026-02-25
---

# Project scaffolding

## Context
The repo is empty — just a `.git` and `.claude` directory. We need a full Vite + React + TypeScript project with Bun, ESLint, and Vitest configured.

## Approach
1. Initialize a Vite project with the `react-ts` template using Bun
2. Configure `tsconfig.json` with strict mode and path aliases
3. Set up ESLint with React and TypeScript rules
4. Set up Vitest with React Testing Library
5. Add scripts to `package.json`: `dev`, `build`, `lint`, `typecheck`, `test`
6. Verify everything runs cleanly

## Files to change
- `package.json` (create — project manifest and scripts)
- `vite.config.ts` (create — Vite configuration)
- `tsconfig.json` (create — TypeScript config)
- `tsconfig.app.json` (create — app-specific TS config)
- `tsconfig.node.json` (create — node-specific TS config)
- `eslint.config.js` (create — ESLint configuration)
- `index.html` (create — entry HTML)
- `src/main.tsx` (create — app entry point)
- `src/vite-env.d.ts` (create — Vite type declarations)

## Verification
- Run: `bun run dev` — dev server starts without errors
- Run: `bun run build` — production build succeeds
- Run: `bun run lint` — no lint errors
- Run: `bun run typecheck` — no type errors
- Run: `bun run test` — test runner works (even with no tests yet)
