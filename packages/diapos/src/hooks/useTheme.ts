import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'
import type { Theme } from '../theme/types'

export function useTheme(): Theme {
  return useContext(ThemeContext)
}
