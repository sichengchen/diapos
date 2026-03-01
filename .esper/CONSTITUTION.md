# Diapos Constitution

## Project Identity

**Name:** Diapos
**Purpose:** A general-purpose, themeable presentation framework that uses React as the authoring format. Developers write slides as JSX components with full access to React's ecosystem — themes, transitions, speaker notes, progressive reveal, and presenter/projector views included.

## What Diapos Is NOT

- **Not a WYSIWYG editor.** There is no drag-and-drop UI, no visual editor. Presentations are authored in code.
- **Not a CMS or hosting platform.** No cloud storage, no collaboration features, no SaaS layer. Diapos produces static bundles that can be deployed anywhere.
- **Not a Markdown-only tool.** Unlike Slidev or Marp, slides are React components — not Markdown files.

## Users

Any developer who prefers code over GUI tools for building presentations. No React expertise is assumed beyond basic JSX familiarity.

## Tech Stack

| Layer | Choice |
|---|---|
| Language | TypeScript (strict) |
| UI framework | React 19 |
| Styling | Tailwind CSS v4 |
| Build tool | Vite |
| Runtime / package manager | Bun |
| Test framework | Vitest + Testing Library |
| Linting | ESLint 9 (flat config) |
| Monorepo | npm workspaces via Bun |

### Packages

- `packages/diapos/` — the framework library (components, hooks, theme engine, transitions)
- `packages/create-diapos/` — `npx create-diapos` CLI scaffolder

## Coding Standards

1. **`<Slide>` is always the explicit frame boundary.** Layouts are content components *inside* `<Slide>`, never wrappers around it.
2. **Named exports only.** No default exports from library modules.
3. **Props interfaces colocated.** Each component's props type lives in the same file as the component.
4. **Functional components only.** No class components.
5. **Prefer composition over configuration.** Components should be composable primitives, not monolithic config objects.

## Testing Strategy

- **Unit tests** for hooks, engine logic, and utility functions (Vitest).
- **Component tests** for rendering and interaction (Testing Library + jsdom).
- Tests live next to source files as `*.test.ts` / `*.test.tsx`.
- All tests must pass before an increment is considered complete.

## Verification Commands

```
bun run test        # run test suite
bun run lint        # eslint
bun run typecheck   # tsc --noEmit
bun run dev         # dev server
```

## Scope Boundaries

The following will never be built in this repository:

- A visual/WYSIWYG slide editor
- Cloud hosting, storage, or user account management
- Real-time collaboration features
- A Markdown-to-slides pipeline (this is React-first)
- Server-side rendering of slides
