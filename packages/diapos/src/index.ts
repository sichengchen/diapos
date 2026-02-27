import './styles/global.css'
import './styles/transitions.css'

export { Deck } from './components/Deck'
export type { DeckProps } from './components/Deck'

export { Slide } from './components/Slide'
export type { SlideProps } from './components/Slide'

export { Step } from './components/Step'
export type { StepProps } from './components/Step'

export { ProgressBar } from './components/ProgressBar'
export { SlideCounter } from './components/SlideCounter'

// Layout components
export { Title } from './components/layouts/Title'
export type { TitleProps } from './components/layouts/Title'
export { Code } from './components/layouts/Code'
export type { CodeProps } from './components/layouts/Code'
export { Image } from './components/layouts/Image'
export type { ImageProps } from './components/layouts/Image'

// Views
export { PresenterView } from './views/PresenterView'
export type { PresenterViewProps } from './views/PresenterView'
export { ProjectorView } from './views/ProjectorView'
export type { ProjectorViewProps } from './views/ProjectorView'

// Router
export { DiaposRouter, useRoute } from './router'
export type { DiaposRoute } from './router'

// Hooks
export { useDeck } from './hooks/useDeck'
export { useNotes } from './hooks/useNotes'
export { useSyncChannel } from './hooks/useSyncChannel'
export { useTheme } from './hooks/useTheme'
export { useFullscreen } from './hooks/useFullscreen'
export type { DeckState } from './context/DeckContext'

export { defaultTheme } from './theme/defaultTheme'
export { createTheme } from './theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './theme/types'
export type { Transition } from './types'
