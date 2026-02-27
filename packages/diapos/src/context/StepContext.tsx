import { createContext, type ReactNode, useCallback, useMemo, useRef } from 'react'

export interface StepContextValue {
  visibleUpTo: number
  nextIndex: () => number
}

export const StepContext = createContext<StepContextValue | null>(null)

interface StepProviderProps {
  children: ReactNode
  visibleUpTo: number
}

export function StepProvider({ children, visibleUpTo }: StepProviderProps) {
  const counterRef = useRef(0)
  // Reset counter at the start of each render so Steps get consistent indices
  counterRef.current = 0

  const nextIndex = useCallback(() => counterRef.current++, [])

  const value = useMemo(
    () => ({ visibleUpTo, nextIndex }),
    [visibleUpTo, nextIndex],
  )

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}
