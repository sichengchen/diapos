---
id: 14
title: Presenter and projector views with sync
status: done
type: feature
priority: 2
phase: 002-packaging-templates-and-presenter
branch: feature/002-packaging-templates-and-presenter
created: 2026-02-26
shipped_at: 2026-02-27
---
# Presenter and projector views with sync

## Context
Users need two views: a projector view (fullscreen slides for the audience) and a presenter view (current slide + next slide preview + speaker notes + controls). These are separate routes in the same app, synced via BroadcastChannel so navigating in one tab updates the other.

## Approach
1. Add a lightweight router — either React Router or a simple hash-based router (prefer minimal: hash router to avoid adding a heavy dependency)
2. Define routes:
   - `/#/` or `/` — projector view (default, fullscreen-optimized)
   - `/#/presenter` or `/presenter` — presenter view
3. Create a `useSyncChannel` hook wrapping BroadcastChannel:
   - Channel name: `diapos-sync` (or configurable)
   - Messages: `{ type: 'navigate', index: number }` and `{ type: 'sync-request' }` (for late-joining tabs)
   - On receive `navigate` → call `goTo(index)` in DeckContext
   - On receive `sync-request` → broadcast current index
   - On local navigation → broadcast `navigate` message
4. Create `ProjectorView` component:
   - Renders `<Deck>` in fullscreen-optimized mode (no chrome, no controls)
   - Connects to sync channel — receives navigation commands
5. Create `PresenterView` component:
   - Three-panel layout: current slide (large), next slide preview (smaller), notes panel
   - Shows slide counter, timer (elapsed time), and navigation controls (prev/next buttons)
   - Connects to sync channel — sends navigation commands on user interaction
6. Both views render the same `<Deck>` children (slides are defined once, shared)
7. The `<Deck>` component gets a `mode` prop: `'projector' | 'presenter' | 'standalone'` (standalone = current behavior)

## Files to change
- `packages/diapos/src/hooks/useSyncChannel.ts` (create — BroadcastChannel wrapper)
- `packages/diapos/src/views/ProjectorView.tsx` (create — audience-facing fullscreen view)
- `packages/diapos/src/views/PresenterView.tsx` (create — speaker view with notes + preview)
- `packages/diapos/src/views/PresenterView.css` (create — presenter layout styles)
- `packages/diapos/src/router.tsx` (create — simple hash router)
- `packages/diapos/src/components/Deck.tsx` (modify — add mode prop, integrate sync)
- `packages/diapos/src/context/DeckContext.tsx` (modify — support external navigation via sync)
- `packages/diapos/src/index.ts` (modify — export views, router, useSyncChannel)
- `packages/diapos/src/main.tsx` (modify — use router to mount correct view)

## Verification
- Run: `bun run test` — test useSyncChannel, test that views render correctly
- Manual: Open two tabs — presenter and projector. Navigate in presenter, verify projector follows.
- Manual: Verify presenter shows correct notes and next slide preview
- Expected: Navigation stays in sync, notes display correctly, timer runs
- Edge cases: Opening projector before presenter (should sync on connect), closing one tab (other continues working), rapid navigation (no message flooding — debounce or latest-wins)

## Progress
- Created `useSyncChannel` hook: BroadcastChannel wrapper with navigate/sync-request messages, auto-broadcast for presenter, sync-request for late-joining projector, lastBroadcast dedup
- Created simple hash router: `DiaposRouter` component + `useRoute()` hook, maps `/#/presenter` → presenter, everything else → projector
- Added `sync` prop to `Deck` and `DeckInner` — integrates `useSyncChannel` when set, noop when absent
- Created `ProjectorView`: wraps `<Deck>` with no chrome and `sync="projector"`
- Created `PresenterView`: three-panel layout (current slide, next slide preview, notes), elapsed timer, prev/next buttons, slide counter, uses `DeckProvider` directly for multi-slide rendering, integrated sync as presenter
- Extracted `parseSlides` utility for shared slide+notes parsing between Deck and PresenterView
- Exported all new components/hooks from index.ts: PresenterView, ProjectorView, DiaposRouter, useRoute, useSyncChannel
- Updated `src/main.tsx` to use `DiaposRouter` with both views
- Tests: 8 new tests for views (ProjectorView renders, PresenterView layout/notes/counter/buttons) and 2 for sync channel (creates/skips BroadcastChannel)
- Modified: Deck.tsx, useSyncChannel.ts (new), router.tsx (new), ProjectorView.tsx (new), PresenterView.tsx (new), parseSlides.ts (new), index.ts, main.tsx
- Verification: all new tests pass (10/10), lint clean, typecheck clean for plan 14 files
- Deviation: Used `sync` prop on Deck instead of `mode` prop — cleaner separation since PresenterView uses DeckProvider directly (needs to render multiple slides simultaneously)
