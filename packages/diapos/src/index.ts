import './styles/global.css'
import './core/styles/transitions.css'

// Core engine
export { Deck } from './core/Deck'
export type { DeckProps } from './core/Deck'
export { Section } from './core/Section'
export type { SectionProps } from './core/Section'
export { ThemeProvider } from './core/theme/ThemeContext'

export { Slide } from './themes/default/Slide'
export type { SlideProps } from './themes/default/Slide'

// Default theme pack
export { ProgressBar } from './themes/default/ProgressBar'
export { SlideCounter } from './themes/default/SlideCounter'
export { Title } from './themes/default/Title'
export type { TitleProps } from './themes/default/Title'
export { Heading } from './themes/default/Heading'
export type { HeadingProps } from './themes/default/Heading'
export { Text } from './themes/default/Text'
export type { TextProps } from './themes/default/Text'
export { BulletPoints } from './themes/default/BulletPoints'
export type { BulletPointsProps } from './themes/default/BulletPoints'
export { Enumerate } from './themes/default/Enumerate'
export type { EnumerateProps } from './themes/default/Enumerate'
export { Item } from './themes/default/Item'
export type { ItemProps } from './themes/default/Item'
export { Code } from './themes/default/Code'
export type { CodeProps } from './themes/default/Code'
export { Image } from './themes/default/Image'
export type { ImageProps } from './themes/default/Image'
export { Quote } from './themes/default/Quote'
export type { QuoteProps } from './themes/default/Quote'
export { Block } from './themes/default/Block'
export type { BlockProps } from './themes/default/Block'
export { Columns } from './themes/default/Columns'
export type { ColumnsProps } from './themes/default/Columns'
export { Column } from './themes/default/Column'
export type { ColumnProps } from './themes/default/Column'

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
export { usePause } from './core/hooks/usePause'
export { useNotes } from './core/hooks/useNotes'
export { useSyncChannel } from './core/hooks/useSyncChannel'
export { useTheme } from './core/hooks/useTheme'
export { useFullscreen } from './core/hooks/useFullscreen'
export type { DeckState } from './core/context/DeckContext'

export { defaultTheme } from './core/theme/defaultTheme'
export { createTheme } from './core/theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './core/theme/types'
export type { Transition } from './core/types'
