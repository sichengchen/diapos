import type { CSSProperties, ReactNode } from 'react'
import { usePause } from '../../core/hooks/usePause'

export interface TextProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
}

export function Text({ children, pause, style }: TextProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <p
      style={{
        fontFamily: 'var(--diapos-font-body, system-ui)',
        fontSize: '1.02em',
        lineHeight: 1.45,
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
