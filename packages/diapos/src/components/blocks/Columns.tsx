import type { CSSProperties, ReactNode } from 'react'

export interface ColumnsProps {
  ratio?: string
  gap?: string
  children: ReactNode
  style?: CSSProperties
}

export function Columns({ ratio, gap = '2em', children, style }: ColumnsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: ratio ?? undefined,
        gridAutoColumns: ratio ? undefined : '1fr',
        gridAutoFlow: ratio ? undefined : 'column',
        gap,
        width: '100%',
        flex: 1,
        alignItems: 'start',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
