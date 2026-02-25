export { Deck } from './components/Deck'
export type { DeckProps } from './components/Deck'

export { Slide } from './components/Slide'
export type { SlideProps } from './components/Slide'

export { ProgressBar } from './components/ProgressBar'
export { SlideCounter } from './components/SlideCounter'

export { useDeck } from './hooks/useDeck'
export { useTheme } from './hooks/useTheme'
export { useFullscreen } from './hooks/useFullscreen'
export type { DeckState } from './context/DeckContext'

export { defaultTheme } from './theme/defaultTheme'
export { createTheme } from './theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './theme/types'
