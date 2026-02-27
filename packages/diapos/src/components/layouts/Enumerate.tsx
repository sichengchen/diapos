import type { CSSProperties, ReactNode } from 'react'
import { usePause } from '../../hooks/usePause'

export interface EnumerateProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}

export function Enumerate({ children, pause, style }: EnumerateProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <ol
      style={{
        fontFamily: 'var(--diapos-font-body, system-ui)',
        listStyle: 'decimal',
        paddingLeft: '1.2em',
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </ol>
  )
}
