// Engine
export { Deck } from './Deck'
export type { DeckProps } from './Deck'
export { Slide } from './Slide'
export type { SlideProps } from './Slide'
export { Section } from './Section'
export type { SectionProps } from './Section'

// Hooks
export { useDeck } from './hooks/useDeck'
export { usePause } from './hooks/usePause'
export { useTheme } from './hooks/useTheme'
export { useFullscreen } from './hooks/useFullscreen'
export { useNotes } from './hooks/useNotes'
export { useSyncChannel } from './hooks/useSyncChannel'

// Tokens
export { ThemeProvider } from './theme/ThemeContext'
export { defaultTheme } from './theme/defaultTheme'
export { createTheme } from './theme/createTheme'
export type { Theme, ThemeColors, ThemeFonts, DeepPartial } from './theme/types'

// Context types
export type { DeckState } from './context/DeckContext'

// Types
export type { Transition } from './types'
