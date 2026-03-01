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
        gap: '0.6em',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #fafafa)',
        fontSize: '1.25em',
        lineHeight: 1.4,
        padding: 'var(--diapos-spacing-slide, 56px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </SlideBase>
  )
}
