import type { BlockProps } from '../../core/props'

export type { BlockProps }

const variantColors: Record<string, { border: string; title: string }> = {
  default: {
    border: 'var(--diapos-accent, #6366f1)',
    title: 'var(--diapos-accent, #6366f1)',
  },
  alert: {
    border: 'var(--diapos-danger, #ef4444)',
    title: 'var(--diapos-danger, #ef4444)',
  },
  example: {
    border: 'var(--diapos-success, #22c55e)',
    title: 'var(--diapos-success, #22c55e)',
  },
}

export function Block({ title, variant = 'default', children, style, className }: BlockProps) {
  const colors = variantColors[variant] ?? variantColors['default']!

  return (
    <div
      className={className}
      style={{
        borderLeft: `2px solid ${colors.border}`,
        padding: '1.25em 1.5em',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: 'var(--diapos-font-heading, system-ui)',
            fontWeight: 500,
            fontSize: '1em',
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
