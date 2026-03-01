import type { TitleProps } from '../../core/props'

export type { TitleProps }

export function Title({ title, subtitle, style, className }: TitleProps) {
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
      <h1
        style={{
          fontFamily: 'var(--diapos-font-heading, Georgia, serif)',
          fontSize: '3.2em',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.15,
          fontStyle: 'italic',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, Georgia, serif)',
            fontSize: '1.3em',
            fontWeight: 400,
            color: 'var(--diapos-muted, #a8a29e)',
            marginTop: '0.75em',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
