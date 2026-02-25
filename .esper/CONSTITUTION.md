# Diapo — Constitution

## What This Is
Diapo is a code-first presentation framework built on React and TypeScript. Users write slides in TSX files and present them in the browser. It provides a slide engine, navigation, theming, and reusable layout components — all authored as code, not through a visual editor.

## What This Is NOT
- **Not a visual editor** — no WYSIWYG, no drag-and-drop. Slides are authored entirely in code (TSX).
- **Not a cloud service** — no user accounts, storage, collaboration, or hosting. It's a local development tool.
- **Not a full office suite** — strictly presentations. No docs, spreadsheets, or other formats.
- **Not a web app** — there is no "app" to log into. Diapo is a framework/library that developers use in their own projects.

## Technical Decisions
- **Stack**: TypeScript, React 19, Vite, Bun
- **Architecture**: Component-based slides — each slide is a React component. A `<Deck>` component orchestrates navigation, transitions, and theming. Slides are composed from layout primitives (`<Title>`, `<Content>`, `<Code>`, `<Image>`).
- **Key dependencies**: React (UI), Vite (dev server + build), Bun (runtime + package manager)

## Testing Strategy
- **What gets tested**: Core engine logic (navigation, state), theme resolution, component rendering
- **Tooling**: Vitest + React Testing Library
- **Commands**: `bun run test` (Vitest)

## Principles
1. **Code is the source of truth** — slides are TSX. No intermediate formats, no config files for content.
2. **Zero-config defaults, full control when needed** — sensible defaults for theming, layout, and transitions, but everything is overridable.
3. **Minimal API surface** — a small number of well-designed components beats a large number of options.
4. **Fast iteration** — Vite HMR means slide changes appear instantly during authoring.
5. **Presentation-grade output** — what you see in dev mode is what your audience sees. No visual discrepancies.
