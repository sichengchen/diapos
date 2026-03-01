import { createTheme } from '../../core/theme/createTheme'

export const milanTheme = createTheme({
  colors: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    accent: '#f97316',
    muted: '#a3a3a3',
    code: '#171717',
    danger: '#f43f5e',
    success: '#10b981',
  },
  fonts: {
    heading: "system-ui, -apple-system, sans-serif",
    body: "system-ui, -apple-system, sans-serif",
    code: "'SF Mono', 'Fira Code', monospace",
  },
  spacing: { slide: '56px' },
  borderRadius: '12px',
})
