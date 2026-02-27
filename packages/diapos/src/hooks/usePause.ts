import { useContext } from 'react'
import { PauseContext } from '../context/PauseContext'

/**
 * Hook for components with a `pause` prop. Returns a visibility style object.
 * - If `pause` is falsy: always visible (no index consumed)
 * - If `pause` is truthy + inside PauseProvider: consumes an index, hidden until revealed
 * - If `pause` is truthy + outside PauseProvider: always visible (fallback)
 */
export function usePause(pause: boolean | undefined): { style: React.CSSProperties } {
  const ctx = useContext(PauseContext)

  if (!pause || !ctx) {
    return { style: {} }
  }

  const index = ctx.nextIndex()
  const visible = index < ctx.visibleUpTo

  return {
    style: { visibility: visible ? 'visible' : 'hidden' },
  }
}
