import { Children, type ReactNode, useCallback, useRef } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { ThemeProvider } from '../theme/ThemeContext'
import type { Theme } from '../theme/types'
import type { Transition } from '../types'
import { useDeck } from '../hooks/useDeck'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useFullscreen } from '../hooks/useFullscreen'
import { TransitionWrapper } from './TransitionWrapper'
import { ProgressBar } from './ProgressBar'
import { SlideCounter } from './SlideCounter'

export interface DeckProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition
  transitionDuration?: number
  clickNavigation?: boolean
  showProgress?: boolean
  showCounter?: boolean
}

interface DeckInnerProps {
  slides: ReactNode[]
  transition: Transition
  transitionDuration: number
  clickNavigation: boolean
  showProgress: boolean
  showCounter: boolean
}

function DeckInner({
  slides,
  transition,
  transitionDuration,
  clickNavigation,
  showProgress,
  showCounter,
}: DeckInnerProps) {
  const deckState = useDeck()
  const { currentIndex, direction, next, prev } = deckState
  const deckRef = useRef<HTMLDivElement>(null)

  useKeyboardNavigation(deckState)
  useFullscreen(deckRef)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!clickNavigation) return
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea, select, [role="button"]')) return
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      if (clickX > rect.width / 2) {
        next()
      } else {
        prev()
      }
    },
    [clickNavigation, next, prev],
  )

  return (
    <div
      ref={deckRef}
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--diapos-bg, #000)',
        color: 'var(--diapos-fg, #fff)',
        cursor: clickNavigation ? 'pointer' : undefined,
      }}
    >
      <TransitionWrapper
        transition={transition}
        slideKey={currentIndex}
        duration={transitionDuration}
        direction={direction}
      >
        {slides[currentIndex]}
      </TransitionWrapper>
      {showProgress && <ProgressBar />}
      {showCounter && <SlideCounter />}
    </div>
  )
}

export function Deck({
  children,
  theme,
  transition = 'fade',
  transitionDuration = 300,
  clickNavigation = true,
  showProgress = true,
  showCounter = true,
}: DeckProps) {
  const slides = Children.toArray(children)

  return (
    <ThemeProvider theme={theme}>
      <DeckProvider totalSlides={slides.length}>
        <DeckInner
          slides={slides}
          transition={transition}
          transitionDuration={transitionDuration}
          clickNavigation={clickNavigation}
          showProgress={showProgress}
          showCounter={showCounter}
        />
      </DeckProvider>
    </ThemeProvider>
  )
}
