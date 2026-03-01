import './styles/global.css'
import './core/styles/transitions.css'

export { Deck } from './core/Deck'
export type { DeckProps } from './core/Deck'

export { Slide } from './core/Slide'
export type { SlideProps } from './core/Slide'

export { ProgressBar } from './components/ProgressBar'
export { SlideCounter } from './components/SlideCounter'

// Layout components
export { Title } from './components/layouts/Title'
export type { TitleProps } from './components/layouts/Title'
export { Heading } from './components/layouts/Heading'
export type { HeadingProps } from './components/layouts/Heading'
export { Text } from './components/layouts/Text'
export type { TextProps } from './components/layouts/Text'
export { BulletPoints } from './components/layouts/BulletPoints'
export type { BulletPointsProps } from './components/layouts/BulletPoints'
export { Enumerate } from './components/layouts/Enumerate'
export type { EnumerateProps } from './components/layouts/Enumerate'
export { Item } from './components/layouts/Item'
export type { ItemProps } from './components/layouts/Item'
export { Code } from './components/layouts/Code'
export type { CodeProps } from './components/layouts/Code'
export { Image } from './components/layouts/Image'
export type { ImageProps } from './components/layouts/Image'
export { Quote } from './components/layouts/Quote'
export type { QuoteProps } from './components/layouts/Quote'

// Views
export { PresenterView } from './views/PresenterView'
export type { PresenterViewProps } from './views/PresenterView'
export { ProjectorView } from './views/ProjectorView'
export type { ProjectorViewProps } from './views/ProjectorView'

// Router
export { DiaposRouter, useRoute } from './router'
export type { DiaposRoute } from './router'

// Hooks
export { useDeck } from './core/hooks/useDeck'
export { useNotes } from './core/hooks/useNotes'
export { useSyncChannel } from './core/hooks/useSyncChannel'
export { useTheme } from './core/hooks/useTheme'
export { useFullscreen } from './core/hooks/useFullscreen'
export type { DeckState } from './core/context/DeckContext'

export { defaultTheme } from './core/theme/defaultTheme'
export { createTheme } from './core/theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './core/theme/types'
export type { Transition } from './core/types'
