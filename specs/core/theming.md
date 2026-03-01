# Theming

The theme system provides design tokens as CSS custom properties. Theme packs consume tokens via `var(--diapos-*)` in their components.

**Sources:** `packages/diapos/src/core/theme/`

## Types

```ts
interface ThemeColors {
  background: string
  foreground: string
  accent: string
  muted: string
  code: string
  danger: string
  success: string
}

interface ThemeFonts {
  heading: string
  body: string
  code: string
}

interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: { slide: string }
  borderRadius: string
}

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] }
```

All values are strings — colors as hex/rgb/oklch/named, fonts as CSS font-family stacks, spacing as CSS length values.

## CSS Custom Properties

ThemeProvider converts a Theme into 12 CSS custom properties set on a wrapper `<div>`:

| CSS Property | Token |
|---|---|
| `--diapos-bg` | `colors.background` |
| `--diapos-fg` | `colors.foreground` |
| `--diapos-accent` | `colors.accent` |
| `--diapos-muted` | `colors.muted` |
| `--diapos-code-bg` | `colors.code` |
| `--diapos-danger` | `colors.danger` |
| `--diapos-success` | `colors.success` |
| `--diapos-font-heading` | `fonts.heading` |
| `--diapos-font-body` | `fonts.body` |
| `--diapos-font-code` | `fonts.code` |
| `--diapos-spacing-slide` | `spacing.slide` |
| `--diapos-radius` | `borderRadius` |

Font sizes, font weights, line heights, element spacing, and all other visual decisions are **not tokens** — they belong in theme packs.

## ThemeProvider

```ts
import { ThemeProvider } from 'diapos'
```

Accepts `theme?: Theme` (defaults to `defaultTheme`) and `children: ReactNode`. Renders a `<div>` with CSS custom properties set as inline styles. Provides the Theme object via React context.

## defaultTheme

```ts
const defaultTheme: Theme = {
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
}
```

## createTheme

```ts
function createTheme(overrides: DeepPartial<Theme>): Theme
```

Deep-merges overrides into `defaultTheme`. Does not mutate `defaultTheme`.

```ts
const theme = createTheme({
  colors: { accent: '#8B0000', muted: '#6b7280' },
  fonts: { heading: 'Georgia, serif' },
})
```

## Constraints

- Token set is exactly 12 CSS variables. Expanding tokens requires updating ThemeProvider, types, and all theme packs.
- Theme packs consume tokens via CSS variables (`var(--diapos-*)`), not `useTheme()`. `useTheme()` exists for programmatic access but is not the primary styling mechanism.
- `createTheme` does not mutate `defaultTheme`.
