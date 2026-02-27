import type { CSSProperties, ReactNode } from 'react'

export interface CodeProps {
  code: string
  title?: ReactNode
  language?: string
  style?: CSSProperties
}

export function Code({ code, title, language, style }: CodeProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        ...style,
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: 'var(--diapos-font-heading, system-ui)',
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
          fontFamily: 'var(--diapos-font-code, monospace)',
          fontSize: '1em',
          lineHeight: 1.5,
          backgroundColor: 'var(--diapos-code-bg, #1e293b)',
          borderRadius: 'var(--diapos-radius, 8px)',
          padding: '1.5em',
          margin: 0,
          overflow: 'auto',
          maxHeight: '70vh',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
