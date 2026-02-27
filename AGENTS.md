# Agents

This file is for AI coding agents working on this codebase.

## Before you start

Read the project constitution: `.esper/CONSTITUTION.md` — it defines the architecture, principles, and what this project is (and is not).

## Key rules

1. **`<Slide>` is always the explicit frame boundary.** Layouts are content components *inside* `<Slide>`, never wrappers around it. See the Component Hierarchy in the constitution.
2. **Keep docs in sync.** Every change to public API, component behavior, or architecture must update `README.md`, `docs/`, and `specs/` in the same commit.
3. **Read specs/ before implementing.** Component contracts live in `specs/` — they define props, behavior, valid usage patterns, and constraints.
4. **Run verification.** `bun run test`, `bun run lint`, `bun run typecheck` must all pass.

## Project structure

- `packages/diapos/` — the framework library (components, hooks, theme, engine)
- `packages/create-diapos/` — `npx create-diapos` CLI scaffolder
- `docs/` — end-user documentation
- `specs/` — component specs for coding agents
- `.esper/` — project management (phases, plans, explorations)
