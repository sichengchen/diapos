import type { CSSProperties, ReactNode } from 'react'

export interface SlideProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
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
        ...style,
      }}
    >
      {children}
    </div>
  )
}
