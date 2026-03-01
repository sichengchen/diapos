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
          fontFamily: 'var(--diapos-font-heading, Georgia, serif)',
          fontSize: '2em',
          fontStyle: 'italic',
          lineHeight: 1.4,
          margin: 0,
          maxWidth: '75%',
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, Georgia, serif)',
            fontSize: '1.1em',
            color: 'var(--diapos-accent, #b45309)',
            marginTop: '1.2em',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          &mdash; {author}
        </p>
      )}
    </div>
  )
}
