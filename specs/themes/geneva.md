# Geneva Theme Pack

The original dark theme. Navy blue background, system-ui fonts, blue accent. Previously the default theme before Zurich replaced it.

**Source:** `packages/diapos/src/themes/geneva/`
**Import:** `import { Slide, Title, genevaTheme } from 'diapos/themes/geneva'`

## Token Preset

```ts
const genevaTheme = createTheme({
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#3b82f6',
    muted: '#94a3b8',
    code: '#1e293b',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    code: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  spacing: { slide: '64px' },
  borderRadius: '8px',
})
```

Also exported from the main barrel: `import { genevaTheme } from 'diapos'`

## Components

Component specs are documented in [default-theme.md](../default-theme.md) — Geneva retains those exact implementations. All components implement the shared prop interfaces from `core/props.ts`.
