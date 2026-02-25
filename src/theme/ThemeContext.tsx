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
    '--diapo-bg': theme.colors.background,
    '--diapo-fg': theme.colors.foreground,
    '--diapo-accent': theme.colors.accent,
    '--diapo-code-bg': theme.colors.code,
    '--diapo-font-heading': theme.fonts.heading,
    '--diapo-font-body': theme.fonts.body,
    '--diapo-font-code': theme.fonts.code,
    '--diapo-spacing-slide': theme.spacing.slide,
    '--diapo-radius': theme.borderRadius,
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
