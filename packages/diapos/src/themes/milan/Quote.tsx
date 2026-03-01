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
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        flex: 1,
        ...style,
      }}
    >
      <blockquote
        style={{
          fontFamily: 'var(--diapos-font-heading, system-ui)',
          fontSize: '2.5em',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: 0,
          maxWidth: '85%',
        }}
      >
        {quote}
      </blockquote>
      {author && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1.2em',
            color: 'var(--diapos-accent, #f97316)',
            marginTop: '1em',
            fontWeight: 500,
          }}
        >
          {author}
        </p>
      )}
    </div>
  )
}
