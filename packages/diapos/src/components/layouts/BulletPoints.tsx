import type { CSSProperties, ReactNode } from 'react'
import { usePause } from '../../hooks/usePause'

export interface BulletPointsProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}

export function BulletPoints({ children, pause, style }: BulletPointsProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <ul
      style={{
        fontFamily: 'var(--diapos-font-body, system-ui)',
        paddingLeft: '1.2em',
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </ul>
  )
}
