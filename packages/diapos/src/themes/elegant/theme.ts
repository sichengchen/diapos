import { createTheme } from '../../core/theme/createTheme'

export const elegantTheme = createTheme({
  colors: {
    background: '#faf8f5',
    foreground: '#2c2825',
    accent: '#b45309',
    muted: '#a8a29e',
    code: '#f0ece7',
    danger: '#dc2626',
    success: '#15803d',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
    body: "'Source Serif 4', Georgia, serif",
    code: "'JetBrains Mono', 'SF Mono', monospace",
  },
  spacing: { slide: '72px' },
  borderRadius: '6px',
})
