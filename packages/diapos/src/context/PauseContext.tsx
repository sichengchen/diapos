import { createContext, type ReactNode, useCallback, useMemo, useRef } from 'react'

export interface PauseContextValue {
  visibleUpTo: number
  nextIndex: () => number
}

export const PauseContext = createContext<PauseContextValue | null>(null)

interface PauseProviderProps {
  children: ReactNode
  visibleUpTo: number
}

export function PauseProvider({ children, visibleUpTo }: PauseProviderProps) {
  const counterRef = useRef(0)
  // Reset counter at the start of each render so paused items get consistent indices
  counterRef.current = 0

  const nextIndex = useCallback(() => counterRef.current++, [])

  const value = useMemo(
    () => ({ visibleUpTo, nextIndex }),
    [visibleUpTo, nextIndex],
  )

  return <PauseContext.Provider value={value}>{children}</PauseContext.Provider>
}
