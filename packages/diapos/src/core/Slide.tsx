import type { CSSProperties, ReactNode } from 'react'

export interface SlideProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}

export function Slide({ children, style, className }: SlideProps) {
  const slideClassName = className ? `diapos-slide ${className}` : 'diapos-slide'

  return (
    <div
      className={slideClassName}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'left',
        gap: '0.5em',
        overflow: 'hidden',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #fff)',
        fontSize: '1.2em',
        lineHeight: 1.45,
        padding: 'var(--diapos-spacing-slide, 64px)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
