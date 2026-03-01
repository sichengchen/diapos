import type { CSSProperties, ReactNode } from 'react'
import { usePause } from '../../core/hooks/usePause'

export interface ItemProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}

export function Item({ children, pause, style }: ItemProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <li
      style={{
        fontSize: '1.02em',
        marginTop: '0.35em',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </li>
  )
}
