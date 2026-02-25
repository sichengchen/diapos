import { Children, type ReactNode, useCallback, useRef } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { useDeck } from '../hooks/useDeck'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useFullscreen } from '../hooks/useFullscreen'
import { ProgressBar } from './ProgressBar'
import { SlideCounter } from './SlideCounter'

export interface DeckProps {
  children: ReactNode
  clickNavigation?: boolean
  showProgress?: boolean
  showCounter?: boolean
}

interface DeckInnerProps {
  slides: ReactNode[]
  clickNavigation?: boolean
  showProgress?: boolean
  showCounter?: boolean
}

function DeckInner({ slides, clickNavigation = true, showProgress = true, showCounter = true }: DeckInnerProps) {
  const deckState = useDeck()
  const { currentIndex, next, prev } = deckState
  const deckRef = useRef<HTMLDivElement>(null)

  useKeyboardNavigation(deckState)
  useFullscreen(deckRef)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!clickNavigation) return
      // Don't intercept clicks on interactive elements
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
        backgroundColor: 'var(--diapo-bg, #000)',
        color: 'var(--diapo-fg, #fff)',
        cursor: clickNavigation ? 'pointer' : undefined,
      }}
    >
      {slides[currentIndex]}
      {showProgress && <ProgressBar />}
      {showCounter && <SlideCounter />}
    </div>
  )
}

export function Deck({ children, clickNavigation, showProgress, showCounter }: DeckProps) {
  const slides = Children.toArray(children)

  return (
    <DeckProvider totalSlides={slides.length}>
      <DeckInner
        slides={slides}
        clickNavigation={clickNavigation}
        showProgress={showProgress}
        showCounter={showCounter}
      />
    </DeckProvider>
  )
}
