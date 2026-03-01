import type { CSSProperties, ReactNode } from 'react'

export interface BlockProps {
  title?: string
  variant?: 'default' | 'alert' | 'example'
  children: ReactNode
  style?: CSSProperties
}

const variantColors: Record<string, { border: string; bg: string; title: string }> = {
  default: {
    border: 'var(--diapos-accent, #3b82f6)',
    bg: 'rgba(59, 130, 246, 0.1)',
    title: 'var(--diapos-accent, #3b82f6)',
  },
  alert: {
    border: 'var(--diapos-danger, #ef4444)',
    bg: 'color-mix(in srgb, var(--diapos-danger, #ef4444) 10%, transparent)',
    title: 'var(--diapos-danger, #ef4444)',
  },
  example: {
    border: 'var(--diapos-success, #22c55e)',
    bg: 'color-mix(in srgb, var(--diapos-success, #22c55e) 10%, transparent)',
    title: 'var(--diapos-success, #22c55e)',
  },
}

export function Block({ title, variant = 'default', children, style }: BlockProps) {
  const colors = variantColors[variant] ?? variantColors['default']!

  return (
    <div
      style={{
        borderLeft: `4px solid ${colors.border}`,
        backgroundColor: colors.bg,
        borderRadius: 'var(--diapos-radius, 8px)',
        padding: '1.5em',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: 'var(--diapos-font-heading, system-ui)',
            fontWeight: 600,
            fontSize: '1.1em',
            color: colors.title,
            marginBottom: '0.5em',
          }}
        >
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
