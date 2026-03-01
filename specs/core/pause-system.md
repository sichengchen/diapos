# Pause/Reveal System

The pause system enables step-by-step reveal within slides. Components with `pause={true}` are hidden initially and revealed one at a time as the user advances.

**Sources:** `packages/diapos/src/core/context/PauseContext.tsx`, `packages/diapos/src/core/utils/parseSlides.tsx`

## How It Works

### 1. parseSlides Counts Pauses

When Deck initializes, `parseSlides(children)` processes each slide:

1. Flattens Fragment children recursively
2. For Section elements: generates a divider Slide, then includes the section's children
3. For each Slide: recursively counts elements with a truthy `pause` prop
4. Extracts the `notes` prop from each Slide

### 2. Slides With Pauses Are Expanded

If a slide has N pause elements, parseSlides expands it into N+1 sub-slides:

- Sub-slide 0: `visibleUpTo=0` — all paused elements hidden
- Sub-slide 1: `visibleUpTo=1` — first paused element visible
- Sub-slide k: `visibleUpTo=k` — first k paused elements visible
- Sub-slide N: `visibleUpTo=N` — all elements visible

Each sub-slide wraps the original slide content in a `PauseProvider` with the appropriate `visibleUpTo` value. Notes are duplicated across all sub-slides.

### 3. PauseContext Assigns Indices

```ts
interface PauseContextValue {
  visibleUpTo: number
  getOrAssignIndex: (id: string) => number
}
```

`PauseProvider` maintains a Map of ID-to-index assignments. Each pauseable component calls `getOrAssignIndex(id)` (using React's `useId()`) to get its position in the reveal sequence. The map resets each render for idempotency.

### 4. usePause Reads Visibility

```ts
const { style } = usePause(pause)
// style = { visibility: 'visible' } or { visibility: 'hidden' }
```

If `pause` is true, the hook:
1. Gets its index from PauseContext
2. Returns `visibility: 'hidden'` if index >= visibleUpTo, `visibility: 'visible'` otherwise

Hidden elements use `visibility: hidden` (not `display: none`) so they reserve layout space.

## Example

```tsx
<Slide>
  <Heading>Always visible</Heading>
  <Text pause>Revealed on first advance</Text>
  <Text pause>Revealed on second advance</Text>
</Slide>
```

This slide becomes 3 sub-slides in the deck:
- Sub-slide 0: Heading visible, both Text hidden
- Sub-slide 1: Heading visible, first Text visible, second Text hidden
- Sub-slide 2: All visible

The user advances through them with the same navigation controls (arrow keys, click, etc.).

## Constraints

- Pause indices are assigned in render order (tree traversal order).
- `usePause(false)` and `usePause(undefined)` do not consume an index.
- Outside a PauseProvider, `usePause(true)` falls back to always visible.
- The expansion happens at Deck initialization time — it is not dynamic.
