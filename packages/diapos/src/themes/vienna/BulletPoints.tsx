import { usePause } from '../../core/hooks/usePause'
import type { BulletPointsProps } from '../../core/props'

export type { BulletPointsProps }

export function BulletPoints({ children, pause, style, className }: BulletPointsProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <ul
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-body, Georgia, serif)',
        listStyle: 'disc',
        paddingLeft: '1.2em',
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </ul>
  )
}
