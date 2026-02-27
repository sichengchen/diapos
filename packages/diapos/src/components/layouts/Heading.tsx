import type { CSSProperties, ReactNode } from 'react'
import { usePause } from '../../hooks/usePause'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps {
  children: ReactNode
  as?: HeadingLevel
  pause?: boolean
  style?: CSSProperties
}

const sizeMap: Record<HeadingLevel, string> = {
  h1: 'clamp(2.2rem, 4.2vw, 4rem)',
  h2: 'clamp(1.8rem, 3.2vw, 3rem)',
  h3: 'clamp(1.4rem, 2.4vw, 2rem)',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1.1rem',
}

export function Heading({ children, as: Tag = 'h2', pause, style }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <Tag
      style={{
        fontFamily: 'var(--diapos-font-heading, system-ui)',
        fontSize: sizeMap[Tag],
        fontWeight: Tag === 'h1' || Tag === 'h2' ? 700 : 600,
        lineHeight: 1.15,
        margin: '0 0 0.5em 0',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
