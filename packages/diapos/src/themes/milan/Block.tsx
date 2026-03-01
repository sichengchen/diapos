import type { BlockProps } from '../../core/props'

export type { BlockProps }

const variantColors: Record<string, { border: string; bg: string; title: string }> = {
  default: {
    border: 'var(--diapos-accent, #f97316)',
    bg: 'rgba(249, 115, 22, 0.08)',
    title: 'var(--diapos-accent, #f97316)',
  },
  alert: {
    border: 'var(--diapos-danger, #f43f5e)',
    bg: 'rgba(244, 63, 94, 0.08)',
    title: 'var(--diapos-danger, #f43f5e)',
  },
  example: {
    border: 'var(--diapos-success, #10b981)',
    bg: 'rgba(16, 185, 129, 0.08)',
    title: 'var(--diapos-success, #10b981)',
  },
}

export function Block({ title, variant = 'default', children, style, className }: BlockProps) {
  const colors = variantColors[variant] ?? variantColors['default']!

  return (
    <div
      className={className}
      style={{
        borderLeft: `6px solid ${colors.border}`,
        backgroundColor: colors.bg,
        borderRadius: 'var(--diapos-radius, 12px)',
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
            fontWeight: 700,
            fontSize: '1.2em',
            color: colors.title,
            marginBottom: '0.5em',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
