import { Slide as SlideBase } from '../../core/Slide'
import type { SlideProps } from '../../core/props'

export type { SlideProps }

export function Slide({ children, style, className, ...props }: SlideProps) {
  return (
    <SlideBase
      className={className}
      style={{
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'left',
        gap: '0.75em',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #18181b)',
        fontSize: '1.15em',
        lineHeight: 1.55,
        padding: 'var(--diapos-spacing-slide, 80px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </SlideBase>
  )
}
