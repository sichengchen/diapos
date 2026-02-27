import type { CSSProperties, ReactNode } from 'react'

export interface TitleProps {
  title: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
}

export function Title({ title, subtitle, style }: TitleProps) {
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
      <h1
        style={{
          fontFamily: 'var(--diapos-font-heading, system-ui)',
          fontSize: '3.5em',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1.5em',
            opacity: 0.7,
            marginTop: '0.5em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
