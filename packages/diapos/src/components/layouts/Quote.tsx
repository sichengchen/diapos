import type { CSSProperties } from 'react'

export interface QuoteProps {
  quote: string
  author?: string
  style?: CSSProperties
}

export function Quote({ quote, author, style }: QuoteProps) {
  return (
    <div
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
          fontFamily: 'var(--diapos-font-body, system-ui)',
          fontSize: '2em',
          fontStyle: 'italic',
          lineHeight: 1.4,
          margin: 0,
          maxWidth: '80%',
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1.2em',
            opacity: 0.7,
            marginTop: '1em',
          }}
        >
          &mdash; {author}
        </p>
      )}
    </div>
  )
}
