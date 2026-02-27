export interface ThemeColors {
  background: string
  foreground: string
  accent: string
  code: string
}

export interface ThemeFonts {
  heading: string
  body: string
  code: string
}

export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: {
    slide: string
  }
  borderRadius: string
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
