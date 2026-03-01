# Vienna Theme Pack

A refined, warm theme with serif typography and an editorial aesthetic. Targets a literary, sophisticated feel.

**Source:** `packages/diapos/src/themes/vienna/`
**Import:** `import { Slide, Title, viennaTheme } from 'diapos/themes/vienna'`

## Token Preset

```ts
const viennaTheme = createTheme({
  colors: {
    background: '#faf8f5',
    foreground: '#2c2825',
    accent: '#b45309',
    muted: '#a8a29e',
    code: '#f0ece7',
    danger: '#dc2626',
    success: '#15803d',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
    body: "'Source Serif 4', Georgia, serif",
    code: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: { slide: '72px' },
  borderRadius: '6px',
})
```

Also exported from the main barrel: `import { viennaTheme } from 'diapos'`

## Components

All components implement the shared prop interfaces from `core/props.ts`.

### Slide

- Serif body font, gap `0.6em`, line-height `1.55`
- Warm cream background via tokens

### Title

- Centered, serif italic title at `3.2em`, weight 700
- Subtitle: uppercase, letter-spacing `0.04em`, muted color

### Heading

- Serif headings, standard weight distribution (700 for h1–h2, 600 for rest)
- Line-height `1.2`

### Text

- Serif body, `1em`, line-height `1.6`

### Code

- Warm code background, subtle `1px solid rgba(0,0,0,0.08)` border
- Font size: `0.9em`

### Image

- Caption: italic, muted color

### Quote

- Centered, serif italic, `2em`, curly quotes
- Author: uppercase, letter-spacing `0.03em`, accent color, em-dash prefix

### Block

- `3px` left border, 6% opacity background
- Title: italic, serif heading font

### BulletPoints / Enumerate

- Serif body font, disc / decimal markers

### Item

- Line-height `1.55`, margin-top `0.4em`

### Columns

- Default gap: `2.5em`

### ProgressBar

- Height: `2px`, track opacity `0.08`

### SlideCounter

- Italic serif, opacity `0.35`
