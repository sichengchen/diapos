import type { CodeProps } from '../../core/props'

export type { CodeProps }

export function Code({ code, language, style, className }: CodeProps) {
  return (
    <pre
      className={className}
      data-language={language}
      style={{
        fontFamily: 'var(--diapos-font-code, monospace)',
        fontSize: '0.9em',
        lineHeight: 1.6,
        backgroundColor: 'var(--diapos-code-bg, #f4f4f5)',
        color: 'var(--diapos-fg, #18181b)',
        borderRadius: 'var(--diapos-radius, 4px)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
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
