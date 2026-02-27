import { useDeck } from '../hooks/useDeck'

export function SlideCounter() {
  const { currentIndex, totalSlides } = useDeck()

  return (
    <div
      data-testid="slide-counter"
      style={{
        position: 'absolute',
        bottom: 'calc(var(--diapos-spacing-slide, 64px) * 0.25)',
        right: 'calc(var(--diapos-spacing-slide, 64px) * 0.25)',
        fontSize: '0.875em',
        fontFamily: 'var(--diapos-font-body, system-ui, sans-serif)',
        color: 'var(--diapos-fg, #fff)',
        opacity: 0.4,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {currentIndex + 1} / {totalSlides}
    </div>
  )
}
