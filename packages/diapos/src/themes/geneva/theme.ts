import { createTheme } from '../../core/theme/createTheme'

export const genevaTheme = createTheme({
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#3b82f6',
    muted: '#94a3b8',
    code: '#1e293b',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    code: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  spacing: { slide: '64px' },
  borderRadius: '8px',
})
