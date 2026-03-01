---
id: 16
title: Add Diapos agent skill for slide and theme authoring
status: active
type: feature
lane: atomic
priority: 1
created: 2026-03-01
spec: agent-skill.md
---
# Add Diapos agent skill for slide and theme authoring

## Context

Diapos has a complete component API, theme system, and documentation — but no agent-readable knowledge file that teaches AI coding agents how to use it. Adding a skill file lets any agent working in a Diapos project produce correct slides and theme packs without reading through specs and source code.

## Scope

1. Create `.claude/skills/diapos/SKILL.md` — the agent skill file covering slide authoring, component API, pause system, theme customization, and theme pack authoring.
2. Content follows the spec in `specs/agent-skill.md`: 8 sections (What is Diapos, Project Structure, Slide Authoring, Component Reference, Pause, Theme Customization, Theme Pack Authoring, Quality Standards).

## Files Affected
- `skills/SKILL.md` (create — agent skill file)
- `README.md` (modify — mention the agent skill)

## Verification
- File exists and is well-formed Markdown with YAML frontmatter.
- All code examples are syntactically valid TSX/TS.
- Component table matches the current API exports.
- Theme token fields match `createTheme` signature.

## Spec Impact
- `agent-skill.md` — may need minor updates if implementation reveals gaps.

## Progress
- [x] Created `skills/SKILL.md` with all 8 sections
- [x] Updated `README.md` with Agent Skill section
- [x] Updated `.esper/CONSTITUTION.md` — added Agent Skill section noting skill must stay in sync with specs
