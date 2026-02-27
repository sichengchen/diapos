import { createContext, type ReactNode, useCallback, useMemo, useRef } from 'react'

export interface PauseContextValue {
  visibleUpTo: number
  getOrAssignIndex: (id: string) => number
}

export const PauseContext = createContext<PauseContextValue | null>(null)

interface PauseProviderProps {
  children: ReactNode
  visibleUpTo: number
}

export function PauseProvider({ children, visibleUpTo }: PauseProviderProps) {
  const counterRef = useRef(0)
  const indexMapRef = useRef(new Map<string, number>())

  // Reset at the start of each render
  counterRef.current = 0
  indexMapRef.current.clear()

  const getOrAssignIndex = useCallback((id: string) => {
    const existing = indexMapRef.current.get(id)
    if (existing !== undefined) return existing
    const idx = counterRef.current++
    indexMapRef.current.set(id, idx)
    return idx
  }, [])

  const value = useMemo(
    () => ({ visibleUpTo, getOrAssignIndex }),
    [visibleUpTo, getOrAssignIndex],
  )

  return <PauseContext.Provider value={value}>{children}</PauseContext.Provider>
}
