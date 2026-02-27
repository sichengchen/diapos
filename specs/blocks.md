# Building Blocks

Building blocks are composable structural components for arranging content within slides. Not yet exported from the public API.

## Block

### Import

```ts
import { Block } from './components/blocks/Block'
```

### Props

```ts
interface BlockProps {
  title?: string
  variant?: 'default' | 'alert' | 'example'
  children: ReactNode
  style?: CSSProperties
}
```

### Behavior

- A styled content block with optional title and color variant.
- Variants: `default` (blue accent), `alert` (red), `example` (green).
- Uses inline styles with theme-aware colors.

### Valid Usage

```tsx
<Slide>
  <Block title="Key Point" variant="alert">
    <p>Important information here.</p>
  </Block>
</Slide>
```

---

## Columns / Column

### Import

```ts
import { Columns, Column } from './components/blocks/Columns'
```

### Props

```ts
interface ColumnsProps {
  ratio?: string     // CSS grid-template-columns value
  gap?: string       // default: '2em'
  children: ReactNode
  style?: CSSProperties
}

interface ColumnProps {
  children: ReactNode
  style?: CSSProperties
}
```

### Behavior

- `<Columns>` creates a CSS grid container.
- `ratio` maps to `grid-template-columns` (e.g., `"1fr 2fr"`, `"1fr 1fr 1fr"`).
- `<Column>` is a simple wrapper for each column's content.

### Valid Usage

```tsx
<Slide>
  <Columns ratio="1fr 2fr" gap="2em">
    <Column>
      <h2>Left</h2>
      <p>Content</p>
    </Column>
    <Column>
      <Code code={`const x = 1`} />
    </Column>
  </Columns>
</Slide>
```

---

## Constraints

- Building blocks go *inside* `<Slide>`. They are not frame boundaries.
- Blocks and columns can contain content layouts (`<Title>`, `<Code>`, etc.) or raw JSX.
- `<Column>` should only be used as a direct child of `<Columns>`.
