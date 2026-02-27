import type { CSSProperties, ReactNode } from 'react'
import { Slide } from '../Slide'

export interface ContentProps {
  heading?: ReactNode
  children: ReactNode
  style?: CSSProperties
}

export function Content({ heading, children, style }: ContentProps) {
  return (
    <Slide
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 'var(--diapos-spacing-slide, 64px)',
        ...style,
      }}
    >
      {heading && (
        <h2
          style={{
            fontFamily: 'var(--diapos-font-heading, system-ui)',
            fontSize: '2.5em',
            fontWeight: 600,
            margin: '0 0 0.5em 0',
            lineHeight: 1.3,
          }}
        >
          {heading}
        </h2>
      )}
      <div
        style={{
          fontFamily: 'var(--diapos-font-body, system-ui)',
          fontSize: '1.25em',
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </Slide>
  )
}
