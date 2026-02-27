# Theming

Diapos uses CSS custom properties for theming. Create a theme with `createTheme()` and pass it to `<Deck>`.

## Creating a Theme

```tsx
import { createTheme } from 'diapos'

const myTheme = createTheme({
  colors: {
    background: '#1a1a2e',
    foreground: '#eaeaea',
    accent: '#e94560',
    code: '#16213e',
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
})
```

All properties are optional. Missing values fall back to the default theme.

## Theme Shape

```ts
interface Theme {
  colors: {
    background: string  // slide background
    foreground: string  // text color
    accent: string      // accent color (progress bar, links)
    code: string        // code block background
  }
  fonts: {
    heading: string     // heading font family
    body: string        // body text font family
    code: string        // monospace font family
  }
  spacing: {
    slide: string       // slide padding (default: '64px')
  }
  borderRadius: string  // border radius for UI elements (default: '8px')
}
```

## Default Theme

```ts
{
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#3b82f6',
    code: '#1e293b',
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

## CSS Custom Properties

The theme is applied as CSS custom properties on the Deck's root element. You can reference these in custom styles:

| Property | Theme key |
|----------|-----------|
| `--diapos-bg` | `colors.background` |
| `--diapos-fg` | `colors.foreground` |
| `--diapos-accent` | `colors.accent` |
| `--diapos-code-bg` | `colors.code` |
| `--diapos-font-heading` | `fonts.heading` |
| `--diapos-font-body` | `fonts.body` |
| `--diapos-font-code` | `fonts.code` |
| `--diapos-spacing-slide` | `spacing.slide` |
| `--diapos-radius` | `borderRadius` |

## Using the Theme in Custom Components

```tsx
import { useTheme } from 'diapos'

function MyComponent() {
  const theme = useTheme()
  return <div style={{ color: theme.colors.accent }}>Accent text</div>
}
```

Or use CSS custom properties directly:

```tsx
<div style={{ color: 'var(--diapos-accent)' }}>Accent text</div>
```
