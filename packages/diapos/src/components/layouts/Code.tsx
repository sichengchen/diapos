import type { CodeProps } from '../../core/props'

export type { CodeProps }

export function Code({ code, language, style, className }: CodeProps) {
  return (
    <pre
      className={className}
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
        ...style,
      }}
    >
      <code>{code}</code>
    </pre>
  )
}
