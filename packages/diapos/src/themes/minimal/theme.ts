import { createTheme } from '../../core/theme/createTheme'

export const minimalTheme = createTheme({
  colors: {
    background: '#ffffff',
    foreground: '#18181b',
    accent: '#6366f1',
    muted: '#a1a1aa',
    code: '#f4f4f5',
    danger: '#ef4444',
    success: '#22c55e',
  },
  fonts: {
    heading: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    code: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: { slide: '80px' },
  borderRadius: '4px',
})
