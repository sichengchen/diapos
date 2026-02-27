import type { ReactNode } from 'react'
import { useDeck } from './useDeck'

export function useNotes(): { current: ReactNode | null; next: ReactNode | null } {
  const { currentIndex, notes } = useDeck()
  return {
    current: notes[currentIndex] ?? null,
    next: notes[currentIndex + 1] ?? null,
  }
}
