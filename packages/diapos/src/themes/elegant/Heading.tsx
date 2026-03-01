import { usePause } from '../../core/hooks/usePause'
import type { HeadingProps } from '../../core/props'

export type { HeadingProps }

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const sizeMap: Record<HeadingLevel, string> = {
  h1: 'clamp(2rem, 4vw, 3.5rem)',
  h2: 'clamp(1.7rem, 3vw, 2.8rem)',
  h3: 'clamp(1.3rem, 2.2vw, 1.8rem)',
  h4: '1.4rem',
  h5: '1.2rem',
  h6: '1.05rem',
}

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-heading, Georgia, serif)',
        fontSize: sizeMap[Tag],
        fontWeight: Tag === 'h1' || Tag === 'h2' ? 700 : 600,
        lineHeight: 1.2,
        margin: '0.3em 0 0 0',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
