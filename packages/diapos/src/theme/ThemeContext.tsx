import { createContext, type ReactNode, useMemo } from 'react'
import { defaultTheme } from './defaultTheme'
import type { Theme } from './types'

export const ThemeContext = createContext<Theme>(defaultTheme)

interface ThemeProviderProps {
  theme?: Theme
  children: ReactNode
}

function themeToCSS(theme: Theme): Record<string, string> {
  return {
    '--diapos-bg': theme.colors.background,
    '--diapos-fg': theme.colors.foreground,
    '--diapos-accent': theme.colors.accent,
    '--diapos-code-bg': theme.colors.code,
    '--diapos-muted': theme.colors.muted,
    '--diapos-danger': theme.colors.danger,
    '--diapos-success': theme.colors.success,
    '--diapos-font-heading': theme.fonts.heading,
    '--diapos-font-body': theme.fonts.body,
    '--diapos-font-code': theme.fonts.code,
    '--diapos-spacing-slide': theme.spacing.slide,
    '--diapos-radius': theme.borderRadius,
  }
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  const cssVars = useMemo(() => themeToCSS(theme), [theme])

  return (
    <ThemeContext.Provider value={theme}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  )
}
