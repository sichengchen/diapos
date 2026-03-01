import { usePause } from '../../core/hooks/usePause'
import type { ItemProps } from '../../core/props'

export type { ItemProps }

export function Item({ children, pause, style, className }: ItemProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <li
      className={className}
      style={{
        fontSize: '1.1em',
        marginTop: '0.4em',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </li>
  )
}
