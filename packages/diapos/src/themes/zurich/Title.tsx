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
        alignItems: 'flex-start',
        width: '100%',
        flex: 1,
        ...style,
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--diapos-font-heading, system-ui)',
          fontSize: '3em',
          fontWeight: 600,
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1.4em',
            fontWeight: 300,
            color: 'var(--diapos-muted, #a1a1aa)',
            marginTop: '0.6em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
