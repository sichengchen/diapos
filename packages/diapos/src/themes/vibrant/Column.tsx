import type { ColumnProps } from '../../core/props'

export type { ColumnProps }

export function Column({ children, style, className }: ColumnProps) {
  return (
    <div
      className={className}
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
