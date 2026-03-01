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
- `.esper/` — project management (constitution, increments, workflow)

## EsperKit

This project uses esper for agent-driven development.

**Key files:**
- `.esper/CONSTITUTION.md` — project vision, tech stack, and scope boundaries
- `.esper/WORKFLOW.md` — how increments, specs, and reviews work
- `.esper/esper.json` — project config and verification commands
- `specs/` — spec tree (source of truth for component contracts)

**Workflow commands** (via Claude Code skills):
- `esper:spec` — create or edit specs
- `esper:atom` — create a single increment
- `esper:batch` — plan multiple increments
- `esper:go` — advance from spec → plan → implementation
- `esper:review` — review implementation against specs
- `esper:sync` — update specs to match shipped code

**Rules:**
1. Read `.esper/CONSTITUTION.md` before any implementation work.
2. Read relevant `specs/` before modifying components.
3. Validation (`bun run test`, `bun run lint`, `bun run typecheck`) must pass before an increment is complete.
4. Specs are updated proactively as implementation proceeds.
