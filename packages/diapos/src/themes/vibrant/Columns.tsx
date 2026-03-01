import type { ColumnsProps } from '../../core/props'

export type { ColumnsProps }

export function Columns({ ratio, gap = '2em', children, style, className }: ColumnsProps) {
  return (
    <div
      className={className}
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
