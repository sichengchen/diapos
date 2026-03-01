import { usePause } from '../../core/hooks/usePause'
import type { HeadingProps } from '../../core/props'

export type { HeadingProps }

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const sizeMap: Record<HeadingLevel, string> = {
  h1: 'clamp(2.5rem, 5vw, 4.5rem)',
  h2: 'clamp(2rem, 3.8vw, 3.5rem)',
  h3: 'clamp(1.6rem, 2.8vw, 2.4rem)',
  h4: '1.75rem',
  h5: '1.4rem',
  h6: '1.2rem',
}

const weightMap: Record<HeadingLevel, number> = {
  h1: 800,
  h2: 800,
  h3: 700,
  h4: 700,
  h5: 600,
  h6: 600,
}

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-heading, system-ui)',
        fontSize: sizeMap[Tag],
        fontWeight: weightMap[Tag],
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        margin: '0.25em 0 0 0',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
