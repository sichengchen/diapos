import type { Theme } from './types'

export const defaultTheme: Theme = {
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    accent: '#3b82f6',
    code: '#1e293b',
  },
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    code: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  spacing: {
    slide: '64px',
  },
  borderRadius: '8px',
}
