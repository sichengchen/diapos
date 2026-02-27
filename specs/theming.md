# Theming

## Types

```ts
interface ThemeColors {
  background: string
  foreground: string
  accent: string
  code: string
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

## `createTheme(overrides: DeepPartial<Theme>): Theme`

Deep-merges overrides into `defaultTheme`. All keys are optional — unspecified values keep their defaults.

### Import

```ts
import { createTheme, defaultTheme } from 'diapos'
import type { Theme, ThemeColors, ThemeFonts, DeepPartial } from 'diapos'
```

## ThemeContext

- `ThemeProvider` wraps the tree and sets CSS custom properties on a `<div>`.
- `useTheme()` reads the current `Theme` object from context.
- The default theme is always available (no null guard needed).

## CSS Custom Properties

| Property | Source |
|----------|--------|
| `--diapos-bg` | `colors.background` |
| `--diapos-fg` | `colors.foreground` |
| `--diapos-accent` | `colors.accent` |
| `--diapos-code-bg` | `colors.code` |
| `--diapos-font-heading` | `fonts.heading` |
| `--diapos-font-body` | `fonts.body` |
| `--diapos-font-code` | `fonts.code` |
| `--diapos-spacing-slide` | `spacing.slide` |
| `--diapos-radius` | `borderRadius` |

Components reference these variables in their inline styles with hardcoded fallbacks (e.g., `var(--diapos-fg, #fff)`).

## Constraints

- `ThemeProvider` and `ThemeContext` are internal — not exported from the public API.
- `createTheme` does not mutate `defaultTheme`.
- Theme values are strings (colors as hex/named, fonts as CSS font-family stacks, spacing as CSS length values).
