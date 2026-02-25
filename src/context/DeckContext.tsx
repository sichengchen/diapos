import { createContext, type ReactNode, useCallback, useMemo, useState } from 'react'

export interface DeckState {
  currentIndex: number
  totalSlides: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export const DeckContext = createContext<DeckState | null>(null)

interface DeckProviderProps {
  children: ReactNode
  totalSlides: number
  startIndex?: number
}

export function DeckProvider({ children, totalSlides, startIndex = 0 }: DeckProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, totalSlides - 1))
  }, [totalSlides])

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0))
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)))
    },
    [totalSlides],
  )

  const value = useMemo<DeckState>(
    () => ({ currentIndex, totalSlides, next, prev, goTo }),
    [currentIndex, totalSlides, next, prev, goTo],
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}
