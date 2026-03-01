import type { QuoteProps } from '../../core/props'

export type { QuoteProps }

export function Quote({ quote, author, style, className }: QuoteProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: '2em',
        borderLeft: '3px solid var(--diapos-muted, #a1a1aa)',
        ...style,
      }}
    >
      <blockquote
        style={{
          fontFamily: 'var(--diapos-font-body, system-ui)',
          fontSize: '1.6em',
          fontWeight: 300,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {quote}
      </blockquote>
      {author && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1em',
            color: 'var(--diapos-muted, #a1a1aa)',
            marginTop: '1em',
          }}
        >
          {author}
        </p>
      )}
    </div>
  )
}
