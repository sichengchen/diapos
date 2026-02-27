import type { ReactNode } from 'react'

export interface SectionProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Groups slides into a section. Deck flattens the tree and auto-inserts
 * a divider slide before the section's children.
 *
 * Usage: <Section title="Intro">  <Slide>...</Slide>  </Section>
 *
 * Section itself does not render — Deck extracts its children during flattening.
 */
export function Section({ children }: SectionProps) {
  // Section is a marker component — Deck reads its props during flattening.
  // It renders children directly as a fallback, but Deck will intercept it.
  return <>{children}</>
}

Section.displayName = 'Section'
