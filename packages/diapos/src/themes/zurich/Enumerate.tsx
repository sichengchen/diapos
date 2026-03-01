import { usePause } from '../../core/hooks/usePause'
import type { EnumerateProps } from '../../core/props'

export type { EnumerateProps }

export function Enumerate({ children, pause, style, className }: EnumerateProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <ol
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-body, system-ui)',
        listStyle: 'decimal',
        paddingLeft: '1.5em',
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </ol>
  )
}
