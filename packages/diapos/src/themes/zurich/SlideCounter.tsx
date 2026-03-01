import { useDeck } from '../../core/hooks/useDeck'

export function SlideCounter() {
  const { currentIndex, totalSlides } = useDeck()

  return (
    <div
      data-testid="slide-counter"
      style={{
        position: 'absolute',
        bottom: 'calc(var(--diapos-spacing-slide, 80px) * 0.25)',
        right: 'calc(var(--diapos-spacing-slide, 80px) * 0.25)',
        fontSize: '0.8em',
        fontFamily: 'var(--diapos-font-body, system-ui)',
        color: 'var(--diapos-fg, #18181b)',
        opacity: 0.3,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {currentIndex + 1} / {totalSlides}
    </div>
  )
}
