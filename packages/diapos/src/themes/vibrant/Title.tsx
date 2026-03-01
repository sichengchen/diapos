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
          fontFamily: 'var(--diapos-font-heading, system-ui)',
          fontSize: '4.5em',
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1.5em',
            fontWeight: 400,
            color: 'var(--diapos-accent, #f97316)',
            marginTop: '0.6em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
