import { type ReactNode, useContext } from 'react'
import { StepContext } from '../context/StepContext'

export interface StepProps {
  children: ReactNode
}

export function Step({ children }: StepProps) {
  const ctx = useContext(StepContext)

  // Outside StepProvider (slide with no expansion) — always visible
  if (!ctx) return <>{children}</>

  const index = ctx.nextIndex()
  const visible = index < ctx.visibleUpTo

  return (
    <div
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      data-step={index}
    >
      {children}
    </div>
  )
}
