import { useDeck } from '../hooks/useDeck'

export function SlideCounter() {
  const { currentIndex, totalSlides } = useDeck()

  return (
    <div
      data-testid="slide-counter"
      style={{
        position: 'absolute',
        bottom: '12px',
        right: '16px',
        fontSize: '14px',
        fontFamily: 'var(--diapos-font-body, system-ui, sans-serif)',
        color: 'rgba(255, 255, 255, 0.5)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {currentIndex + 1} / {totalSlides}
    </div>
  )
}
