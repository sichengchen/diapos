import { Children, type ReactNode } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { useDeck } from '../hooks/useDeck'

export interface DeckProps {
  children: ReactNode
}

function DeckInner({ slides }: { slides: ReactNode[] }) {
  const { currentIndex } = useDeck()
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--diapo-bg, #000)',
        color: 'var(--diapo-fg, #fff)',
      }}
    >
      {slides[currentIndex]}
    </div>
  )
}

export function Deck({ children }: DeckProps) {
  const slides = Children.toArray(children)

  return (
    <DeckProvider totalSlides={slides.length}>
      <DeckInner slides={slides} />
    </DeckProvider>
  )
}
