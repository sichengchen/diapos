import type { CSSProperties, ReactNode } from 'react'
import { Slide } from '../Slide'

export interface CodeProps {
  code: string
  title?: ReactNode
  language?: string
  style?: CSSProperties
}

export function Code({ code, title, language, style }: CodeProps) {
  return (
    <Slide
      style={{
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 'var(--diapo-spacing-slide, 64px)',
        ...style,
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: 'var(--diapo-font-heading, system-ui)',
            fontSize: '2em',
            fontWeight: 600,
            margin: '0 0 0.5em 0',
          }}
        >
          {title}
        </h2>
      )}
      <pre
        data-language={language}
        style={{
          fontFamily: 'var(--diapo-font-code, monospace)',
          fontSize: '1em',
          lineHeight: 1.5,
          backgroundColor: 'var(--diapo-code-bg, #1e293b)',
          borderRadius: 'var(--diapo-radius, 8px)',
          padding: '1.5em',
          margin: 0,
          overflow: 'auto',
          maxHeight: '70vh',
        }}
      >
        <code>{code}</code>
      </pre>
    </Slide>
  )
}
