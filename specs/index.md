# Spec Index

## Architecture

- [architecture.md](architecture.md) — 2-layer design, package structure, export strategy

## Core

- [core/deck.md](core/deck.md) — Deck engine component
- [core/slide.md](core/slide.md) — Headless Slide container
- [core/section.md](core/section.md) — Section marker
- [core/theming.md](core/theming.md) — Theme tokens, CSS variables, ThemeProvider, createTheme
- [core/hooks.md](core/hooks.md) — All hooks (useDeck, usePause, useTheme, useFullscreen, useNotes, useSyncChannel, useKeyboardNavigation)
- [core/pause-system.md](core/pause-system.md) — Pause/reveal system (PauseContext, parseSlides expansion)
- [core/prop-interfaces.md](core/prop-interfaces.md) — Shared prop type contracts for theme packs

## Theme Packs

- [default-theme.md](default-theme.md) — Zurich (default): light, clean, whitespace-heavy, Inter font
- [themes/zurich.md](themes/zurich.md) — Zurich theme spec (same as default)
- [themes/geneva.md](themes/geneva.md) — Geneva theme: dark navy, system-ui, blue accent
- [themes/milan.md](themes/milan.md) — Milan theme: bold colors, large type, high contrast, orange accent
- [themes/vienna.md](themes/vienna.md) — Vienna theme: serif fonts, warm tones, editorial aesthetic

## Views & Router

- [views-router.md](views-router.md) — PresenterView, ProjectorView, DiaposRouter, useRoute
