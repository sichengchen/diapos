import type { CSSProperties, ReactNode } from 'react'
import { ThemeProvider } from './theme/ThemeContext'
import { createTheme } from './theme/createTheme'
import type { DeepPartial, Theme } from './theme/types'

export interface SlideProps {
  children: ReactNode
  theme?: DeepPartial<Theme>
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}

export function Slide({ children, theme, style, className }: SlideProps) {
  const content = (
    <div
      data-slot="slide"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )

  return theme ? <ThemeProvider theme={createTheme(theme)}>{content}</ThemeProvider> : content
}
