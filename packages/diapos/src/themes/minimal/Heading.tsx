import { usePause } from '../../core/hooks/usePause'
import type { HeadingProps } from '../../core/props'

export type { HeadingProps }

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const sizeMap: Record<HeadingLevel, string> = {
  h1: 'clamp(2rem, 3.8vw, 3.2rem)',
  h2: 'clamp(1.6rem, 2.8vw, 2.4rem)',
  h3: 'clamp(1.3rem, 2.2vw, 1.75rem)',
  h4: '1.35rem',
  h5: '1.15rem',
  h6: '1rem',
}

const weightMap: Record<HeadingLevel, number> = {
  h1: 600,
  h2: 600,
  h3: 500,
  h4: 500,
  h5: 500,
  h6: 500,
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
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        margin: '0.2em 0 0 0',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
