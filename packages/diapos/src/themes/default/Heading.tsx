import { usePause } from '../../core/hooks/usePause'
import type { HeadingProps } from '../../core/props'

export type { HeadingProps }

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const sizeMap: Record<HeadingLevel, string> = {
  h1: 'clamp(2.2rem, 4.2vw, 4rem)',
  h2: 'clamp(1.8rem, 3.2vw, 3rem)',
  h3: 'clamp(1.4rem, 2.4vw, 2rem)',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1.1rem',
}

export function Heading({ children, as: Tag = 'h2', pause, style, className }: HeadingProps) {
  const { style: pauseStyle } = usePause(pause)

  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--diapos-font-heading, system-ui)',
        fontSize: sizeMap[Tag],
        fontWeight: Tag === 'h1' || Tag === 'h2' ? 700 : 600,
        lineHeight: 1.15,
        margin: '0.3em 0 0 0',
        ...pauseStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
