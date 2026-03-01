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
        backgroundColor: 'var(--diapos-code-bg, #171717)',
        borderRadius: 'var(--diapos-radius, 12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
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
