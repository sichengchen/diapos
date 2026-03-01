import { usePause } from '../../core/hooks/usePause'
import type { TextProps } from '../../core/props'

export type { TextProps }

export function Text({ children, pause, style, className }: TextProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <p
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-body, system-ui)',
        fontSize: '1.02em',
        lineHeight: 1.45,
        margin: 0,
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
