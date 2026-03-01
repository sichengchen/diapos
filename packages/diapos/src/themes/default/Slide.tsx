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
        gap: '0.5em',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #fff)',
        fontSize: '1.2em',
        lineHeight: 1.45,
        padding: 'var(--diapos-spacing-slide, 64px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </SlideBase>
  )
}
