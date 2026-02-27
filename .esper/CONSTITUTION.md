# Diapos — Constitution

## What This Is
Diapos is a code-first presentation framework built on React and TypeScript. Users write slides in TSX files and present them in the browser. It provides a slide engine, navigation, theming, and reusable layout components — all authored as code, not through a visual editor.

## What This Is NOT
- **Not a visual editor** — no WYSIWYG, no drag-and-drop. Slides are authored entirely in code (TSX).
- **Not a cloud service** — no user accounts, storage, collaboration, or hosting. It's a local development tool.
- **Not a full office suite** — strictly presentations. No docs, spreadsheets, or other formats.
- **Not a web app** — there is no "app" to log into. Diapos is a framework/library that developers use in their own projects.

## Technical Decisions
- **Stack**: TypeScript, React 19, Vite, Bun
- **Architecture**: React-idiomatic tree structure. `<Slide>` is always the explicit frame boundary — the only component that counts as a frame. Layouts (`<Title>`, `<Code>`, `<Image>`, `<Quote>`) are content components used *inside* `<Slide>`, not wrappers around it. `<Section>` groups slides and auto-generates dividers. `<Block>`, `<Columns>`/`<Column>` are composable building blocks within slides. `<Deck>` flattens the `Section > Slide` tree at render time.
- **Key dependencies**: React (UI), Vite (dev server + build), Bun (runtime + package manager)
- **Monorepo**: `packages/diapos` (library) + `packages/create-diapos` (CLI scaffolder)

## Component Hierarchy
```
<Deck>                          — root: theme, navigation, child flattening
  <Section>                     — groups slides, auto-inserts divider
    <Slide>                     — frame boundary (always explicit)
      <Title> | <Code> | ...    — content layouts (inside Slide)
      <Block> | <Columns>       — building blocks (composable)
      <Step>                    — progressive reveal wrapper
```

## Testing Strategy
- **What gets tested**: Core engine logic (navigation, state), theme resolution, component rendering, child flattening
- **Tooling**: Vitest + React Testing Library
- **Commands**: `bun run test` (Vitest)

## Principles
1. **Code is the source of truth** — slides are TSX. No intermediate formats, no config files for content.
2. **Zero-config defaults, full control when needed** — sensible defaults for theming, layout, and transitions, but everything is overridable.
3. **Minimal API surface** — a small number of well-designed components beats a large number of options.
4. **Fast iteration** — Vite HMR means slide changes appear instantly during authoring.
5. **Presentation-grade output** — what you see in dev mode is what your audience sees. No visual discrepancies.
6. **`<Slide>` is always explicit** — every slide in the deck is a `<Slide>`. Layouts are content inside a frame, not secret frame wrappers. What you see in JSX is what you get.
7. **Docs stay in sync** — every code change that affects the public API, component behavior, or architecture must update the corresponding `README.md`, `docs/`, and `specs/` files in the same commit.
