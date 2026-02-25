import { Children, type ReactNode, useCallback } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { useDeck } from '../hooks/useDeck'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

export interface DeckProps {
  children: ReactNode
  clickNavigation?: boolean
}

function DeckInner({ slides, clickNavigation = true }: { slides: ReactNode[]; clickNavigation?: boolean }) {
  const deckState = useDeck()
  const { currentIndex, next, prev } = deckState

  useKeyboardNavigation(deckState)

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
    </div>
  )
}

export function Deck({ children, clickNavigation }: DeckProps) {
  const slides = Children.toArray(children)

  return (
    <DeckProvider totalSlides={slides.length}>
      <DeckInner slides={slides} clickNavigation={clickNavigation} />
    </DeckProvider>
  )
}
