# Default Theme Pack (Zurich)

The `diapos` package ships the Zurich theme as the default. The top-level `diapos` import re-exports core + Zurich theme, so `import { Slide, Title } from 'diapos'` gives the default styled experience.

All theme packs use **inline styles with CSS variable references** — no CSS build tool dependency.

**Source:** `packages/diapos/src/themes/zurich/` (default), also `geneva/`, `milan/`, `vienna/`

The component specs below describe the Geneva (original) theme pack's visual details. Zurich, Milan, and Vienna each have their own spec files under `themes/`.

## Slide (wrapper)

Wraps core's headless Slide, adding visual defaults:

- `justifyContent: 'center'`, `alignItems: 'stretch'`, `textAlign: 'left'`
- `gap: '0.5em'`
- Font: `var(--diapos-font-body)` with `system-ui` fallback
- Color: `var(--diapos-fg)`
- Font size: `1.2em`, line height: `1.45`
- Padding: `var(--diapos-spacing-slide)`

Passes through all SlideProps (including `theme`, `className`, `style`).

## Title

Centered full-height layout with `h1` title and optional `p` subtitle.

- Title: `--diapos-font-heading`, `3.5em`, weight 700, line-height 1.2
- Subtitle: `--diapos-font-body`, `1.5em`, opacity 0.7, margin-top 0.5em

## Heading

Renders `<h1>`–`<h6>` with responsive sizing via `clamp()`:

| Level | Size | Weight |
|---|---|---|
| h1 | `clamp(2.2rem, 4.2vw, 4rem)` | 700 |
| h2 | `clamp(1.8rem, 3.2vw, 3rem)` | 700 |
| h3 | `clamp(1.4rem, 2.4vw, 2rem)` | 600 |
| h4 | `1.5rem` | 600 |
| h5 | `1.25rem` | 600 |
| h6 | `1.1rem` | 600 |

Font: `--diapos-font-heading`, line-height 1.15, margin `0.3em 0 0 0`. Uses `usePause()`.

## Text

`<p>` element. Font: `--diapos-font-body`, size `1.02em`, line-height `1.45`, margin 0. Uses `usePause()`.

## Code

`<pre><code>` structure.

- Font: `--diapos-font-code`, size `1em`, line-height `1.5`
- Background: `--diapos-code-bg`
- Border radius: `--diapos-radius`
- Padding: `1.5em`
- Max height: `70vh`, overflow: auto
- Sets `data-language` attribute for syntax highlighting integration

## Image

Centered flex container with `<img>` and optional `<p>` caption.

- Image: `maxWidth: 100%`, `maxHeight: 80%` (with caption) or `100%` (without)
- `objectFit`: `contain` or `cover` based on `contain` prop
- Border radius applied only when `contain={true}`
- Caption: `--diapos-font-body`, `1em`, opacity 0.7, centered

## Quote

Centered flex container with `<blockquote>` and optional `<p>` attribution.

- Quote: `--diapos-font-body`, `2em`, italic, line-height 1.4, max-width 80%
- Rendered with curly quotes (`\u201C...\u201D`)
- Author: `1.2em`, opacity 0.7, prefixed with em-dash

## Block

Content block with left border accent and optional title.

- Left border: `4px solid` (variant color)
- Border radius: `--diapos-radius`
- Padding: `1.5em`, width: `100%`, box-sizing: border-box

| Variant | Border color | Background |
|---|---|---|
| `default` | `--diapos-accent` | accent at 10% opacity |
| `alert` | `--diapos-danger` | danger at 10% opacity |
| `example` | `--diapos-success` | success at 10% opacity |

Title (if provided): `--diapos-font-heading`, weight 600, `1.1em`, variant color, margin-bottom 0.5em.

## BulletPoints

`<ul>` element. Font: `--diapos-font-body`, list-style: disc, padding-left: `1.2em`, margin: 0. Uses `usePause()`.

## Enumerate

`<ol>` element. Font: `--diapos-font-body`, list-style: decimal, padding-left: `1.2em`, margin: 0. Uses `usePause()`.

## Item

`<li>` element. Font size: `1.02em`, margin-top: `0.35em`. Uses `usePause()`.

## Columns

CSS Grid container.

- With `ratio` prop: sets `gridTemplateColumns`
- Without `ratio`: `gridAutoColumns: '1fr'` with `gridAutoFlow: 'column'` (equal-width auto columns)
- Gap: configurable, default `2em`
- Width: `100%`, flex: 1, align-items: start

## Column

Flex column container. `display: flex`, `flexDirection: column`, `justifyContent: center`.

## ProgressBar

Absolute-positioned bar at the bottom of the deck.

- Track: full width, `--diapos-fg` at 0.1 opacity, height 3px
- Fill: width `((currentIndex + 1) / totalSlides) * 100%`, `--diapos-accent`, smooth transition (0.3s ease)
- Uses `useDeck()` for state

## SlideCounter

Absolute-positioned text at the bottom-right corner.

- Position: `bottom` and `right` at `calc(var(--diapos-spacing-slide) * 0.25)`
- Font: `--diapos-font-body`, `0.875em`, `--diapos-fg` at 0.4 opacity
- Format: `{currentIndex + 1} / {totalSlides}`
- `userSelect: none`, `pointerEvents: none`
- Uses `useDeck()` for state
