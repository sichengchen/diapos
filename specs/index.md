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

## Default Theme

- [default-theme.md](default-theme.md) — Default theme pack components (Slide wrapper, Title, Heading, Text, Code, Image, Quote, Block, BulletPoints, Enumerate, Item, Columns, Column, ProgressBar, SlideCounter)

## Theme Packs

- [themes/minimal.md](themes/minimal.md) — Minimal theme: light, clean, whitespace-heavy, Inter font
- [themes/vibrant.md](themes/vibrant.md) — Vibrant theme: bold colors, large type, high contrast, orange accent
- [themes/elegant.md](themes/elegant.md) — Elegant theme: serif fonts, warm tones, editorial aesthetic

## Views & Router

- [views-router.md](views-router.md) — PresenterView, ProjectorView, DiaposRouter, useRoute
