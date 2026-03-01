# Zurich Theme Pack (Default)

A light, clean theme with ample whitespace and understated typography. Targets an Apple-keynote / academic-paper aesthetic. This is the default theme — components are re-exported from the main `diapos` barrel.

**Source:** `packages/diapos/src/themes/zurich/`
**Import:** `import { Slide, Title } from 'diapos'` (default) or `import { ... } from 'diapos/themes/zurich'`

## Token Preset

```ts
// These values ARE the defaultTheme
const zurichTheme = createTheme({
  colors: {
    background: '#ffffff',
    foreground: '#18181b',
    accent: '#6366f1',
    muted: '#a1a1aa',
    code: '#f4f4f5',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: { slide: '80px' },
  borderRadius: '4px',
})
```

Also exported from the main barrel: `import { zurichTheme } from 'diapos'`

## Components

All components implement the shared prop interfaces from `core/props.ts`.

### Slide

- Gap: `0.75em` (wider than default's `0.5em`)
- Font size: `1.15em`, line-height: `1.55`
- Padding: `80px` via spacing token

### Title

- Left-aligned (not centered)
- Title: `3em`, weight 600, letter-spacing `-0.02em`
- Subtitle: `1.4em`, weight 300, muted color

### Heading

- Lighter weights: h1–h2 use 600, h3–h6 use 500
- Slightly smaller scale than default
- Letter-spacing `-0.01em`

### Text

- Font size: `1em`, line-height: `1.6` (more generous than default's `1.45`)

### Code

- Light background (`--diapos-code-bg`), dark text
- Subtle `1px solid rgba(0,0,0,0.06)` border
- Font size: `0.9em`

### Image

- Border radius always applied (not conditional on `contain`)
- Caption: `0.9em`, muted color

### Quote

- Left-aligned with `3px` left border accent (not centered with curly quotes)
- Font weight: 300
- Author in muted color, no em-dash prefix

### Block

- Thinner border: `2px` (vs default's `4px`)
- No colored background — border-only accent
- Title weight: 500

### BulletPoints

- `list-style: none` (clean, no disc markers)

### Enumerate

- Standard decimal list style
- Slightly more padding (`1.5em`)

### Item

- Line-height `1.55`, margin-top `0.4em`

### Columns

- Default gap: `3em` (vs default's `2em`)

### Column

- Same as default

### ProgressBar

- Height: `2px` (thinner than default's `3px`)
- Track opacity: `0.06` (subtler)

### SlideCounter

- Font size: `0.8em` (slightly smaller)
- Opacity: `0.3` (more subtle)
