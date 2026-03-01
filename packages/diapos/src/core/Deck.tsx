import { type ReactNode, useCallback, useMemo, useRef } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { ThemeProvider } from '../theme/ThemeContext'
import type { Theme } from '../theme/types'
import type { Transition } from '../types'
import { useDeck } from '../hooks/useDeck'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useFullscreen } from '../hooks/useFullscreen'
import { useSyncChannel } from '../hooks/useSyncChannel'
import { TransitionWrapper } from './TransitionWrapper'
import { ProgressBar } from './ProgressBar'
import { SlideCounter } from './SlideCounter'
import { parseSlides } from '../utils/parseSlides'

export interface DeckProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition
  transitionDuration?: number
  clickNavigation?: boolean
  showProgress?: boolean
  showCounter?: boolean
  sync?: 'presenter' | 'projector'
}

interface DeckInnerProps {
  slides: ReactNode[]
  transition: Transition
  transitionDuration: number
  clickNavigation: boolean
  showProgress: boolean
  showCounter: boolean
  sync?: 'presenter' | 'projector'
}

function DeckInner({
  slides,
  transition,
  transitionDuration,
  clickNavigation,
  showProgress,
  showCounter,
  sync,
}: DeckInnerProps) {
  const deckState = useDeck()
  const { currentIndex, direction, next, prev } = deckState
  const deckRef = useRef<HTMLDivElement>(null)

  useKeyboardNavigation(deckState)
  useFullscreen(deckRef)
  useSyncChannel(sync ? deckState : null, sync ?? 'presenter')

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
  sync,
}: DeckProps) {
  const { slides, notes } = useMemo(() => parseSlides(children), [children])

  return (
    <ThemeProvider theme={theme}>
      <DeckProvider totalSlides={slides.length} notes={notes}>
        <DeckInner
          slides={slides}
          transition={transition}
          transitionDuration={transitionDuration}
          clickNavigation={clickNavigation}
          showProgress={showProgress}
          showCounter={showCounter}
          sync={sync}
        />
      </DeckProvider>
    </ThemeProvider>
  )
}
