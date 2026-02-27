import type { CSSProperties, ReactNode } from 'react'

export interface ColumnProps {
  children: ReactNode
  style?: CSSProperties
}

export function Column({ children, style }: ColumnProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
