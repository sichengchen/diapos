# Vibrant Theme Pack

A bold, high-contrast theme with strong colors and large typography. Targets an eye-catching conference-talk aesthetic.

**Source:** `packages/diapos/src/themes/vibrant/`
**Import:** `import { Slide, Title, vibrantTheme } from 'diapos/themes/vibrant'`

## Token Preset

```ts
const vibrantTheme = createTheme({
  colors: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    accent: '#f97316',
    muted: '#a3a3a3',
    code: '#171717',
    danger: '#f43f5e',
    success: '#10b981',
  },
  fonts: {
    heading: "system-ui, -apple-system, sans-serif",
    body: "system-ui, -apple-system, sans-serif",
    code: "'SF Mono', 'Fira Code', monospace",
  },
  spacing: { slide: '56px' },
  borderRadius: '12px',
})
```

Also exported from the main barrel: `import { vibrantTheme } from 'diapos'`

## Components

All components implement the shared prop interfaces from `core/props.ts`.

### Slide

- Gap: `0.6em`, font size: `1.25em`, line-height `1.4`
- Tighter padding (`56px`) for more impactful content

### Title

- Centered, uppercase, `4.5em`, weight 800, letter-spacing `-0.03em`
- Subtitle in accent color, weight 400

### Heading

- Larger scale than default (h1 up to `4.5rem`)
- Weights: h1–h2 800, h3–h4 700, h5–h6 600
- Tight letter-spacing `-0.02em`

### Text

- `1.1em`, line-height `1.45`

### Code

- Subtle `1px solid rgba(255,255,255,0.1)` border
- Large border radius (`12px`)

### Image

- Caption in accent color, weight 500

### Quote

- Centered, heading font, `2.5em`, weight 700 (statement-style, no quotation marks)
- Author in accent color, weight 500

### Block

- Thick `6px` left border
- Background at 8% variant color opacity
- Title: uppercase, letter-spacing `0.05em`, weight 700

### BulletPoints / Enumerate / Item

- Item font size: `1.1em` (larger than default)

### Columns

- Default gap: `2em`

### ProgressBar

- Height: `4px` (thicker), track opacity `0.08`

### SlideCounter

- Weight 600 (bolder than default)
