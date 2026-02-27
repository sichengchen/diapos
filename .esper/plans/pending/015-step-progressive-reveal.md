---
id: 015
title: Step progressive reveal
status: pending
type: feature
priority: 3
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
---

# Step progressive reveal

## Context
Beamer's `\pause` is one of its most-used features — progressive reveal of slide content. Exploration 001 (Approach D) designed a React-idiomatic replacement: `<Step>` as a wrapper component instead of a void marker. Each `<Step>` wraps content that should be revealed incrementally. This requires a sub-slide expansion engine in `<Deck>`.

Depends on: plan 012 (component architecture overhaul) must be complete first, since `<Step>` relies on the new child flattening logic in `<Deck>`.

## Approach

### 1. Create `<Step>` component
- Wrapper component that wraps children to be progressively revealed
- Reads `StepContext` to determine visibility
- Renders a `<div>` with `visibility: hidden` when not yet revealed (preserves layout)
- Self-registers via context during render — no tree-walking needed

### 2. Create `StepContext`
- `StepContext` provides `{ visibleUpTo: number }` to `<Step>` children
- `useStepContext()` hook for reading current step visibility
- `useStepIndex()` hook — auto-assigns index based on render order

### 3. Extend Deck's child flattening for `<Step>`
- After flattening `<Section>` → slides, walk each `<Slide>`'s children for `<Step>` components
- If a slide has N `<Step>` children → expand into N+1 sub-slides (base + one per step)
- Each sub-slide wraps the same `<Slide>` content in a `<StepContext.Provider value={{ visibleUpTo: i }}>`
- Sub-slides share the same slide index for notes purposes but get distinct navigation indices

### 4. Update navigation
- Sub-slides are navigable like normal slides (next/prev steps through them)
- `DeckState` exposes `totalSlides` (including sub-slides) for progress bar/counter
- Speaker notes show the same note across all sub-slides of a given slide

### 5. Update example presentation
- Add `<Step>` usage to demonstrate progressive reveal

## Files to change
- `packages/diapos/src/components/Step.tsx` (create — Step wrapper component)
- `packages/diapos/src/context/StepContext.tsx` (create — step visibility context)
- `packages/diapos/src/hooks/useStep.ts` (create — useStepContext, useStepIndex hooks)
- `packages/diapos/src/components/Deck.tsx` (modify — extend flattening to expand Step sub-slides)
- `packages/diapos/src/context/DeckContext.tsx` (modify — sub-slide awareness in navigation)
- `packages/diapos/src/index.ts` (modify — export Step)
- `examples/demo/slides.tsx` (modify — add Step examples)

## Verification
- Run: `bun run test` — test Step visibility logic, sub-slide expansion, navigation through steps
- Expected: N Steps in a Slide produce N+1 navigable sub-slides, hidden content preserves layout
- Manual: Navigate through a slide with Steps — content reveals progressively
- Edge cases: Slide with no Steps (normal behavior), nested Steps (should flatten), Step wrapping a Block or Columns
