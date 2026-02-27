export { Deck } from './components/Deck'
export type { DeckProps } from './components/Deck'

export { Slide } from './components/Slide'
export type { SlideProps } from './components/Slide'

export { ProgressBar } from './components/ProgressBar'
export { SlideCounter } from './components/SlideCounter'

// Layout components
export { Title } from './components/layouts/Title'
export type { TitleProps } from './components/layouts/Title'
export { Content } from './components/layouts/Content'
export type { ContentProps } from './components/layouts/Content'
export { Code } from './components/layouts/Code'
export type { CodeProps } from './components/layouts/Code'
export { Image } from './components/layouts/Image'
export type { ImageProps } from './components/layouts/Image'
export { Split } from './components/layouts/Split'
export type { SplitProps } from './components/layouts/Split'

export { useDeck } from './hooks/useDeck'
export { useTheme } from './hooks/useTheme'
export { useFullscreen } from './hooks/useFullscreen'
export type { DeckState } from './context/DeckContext'

export { defaultTheme } from './theme/defaultTheme'
export { createTheme } from './theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './theme/types'
export type { Transition } from './types'
