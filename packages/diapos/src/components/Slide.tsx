import type { CSSProperties, ReactNode } from 'react'

export interface SlideProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  notes?: string
}

export function Slide({ children, style, className }: SlideProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #fff)',
        fontSize: '1.25em',
        lineHeight: 1.6,
        padding: 'var(--diapos-spacing-slide, 64px)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
