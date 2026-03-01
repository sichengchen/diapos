import type { BlockProps } from '../../core/props'

export type { BlockProps }

const variantColors: Record<string, { border: string; bg: string; title: string }> = {
  default: {
    border: 'var(--diapos-accent, #b45309)',
    bg: 'rgba(180, 83, 9, 0.06)',
    title: 'var(--diapos-accent, #b45309)',
  },
  alert: {
    border: 'var(--diapos-danger, #dc2626)',
    bg: 'rgba(220, 38, 38, 0.06)',
    title: 'var(--diapos-danger, #dc2626)',
  },
  example: {
    border: 'var(--diapos-success, #15803d)',
    bg: 'rgba(21, 128, 61, 0.06)',
    title: 'var(--diapos-success, #15803d)',
  },
}

export function Block({ title, variant = 'default', children, style, className }: BlockProps) {
  const colors = variantColors[variant] ?? variantColors['default']!

  return (
    <div
      className={className}
      style={{
        borderLeft: `3px solid ${colors.border}`,
        backgroundColor: colors.bg,
        borderRadius: 'var(--diapos-radius, 6px)',
        padding: '1.5em',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: 'var(--diapos-font-heading, Georgia, serif)',
            fontWeight: 600,
            fontSize: '1.05em',
            color: colors.title,
            marginBottom: '0.5em',
            fontStyle: 'italic',
          }}
        >
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
