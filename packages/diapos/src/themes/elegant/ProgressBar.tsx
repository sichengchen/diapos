import { useDeck } from '../../core/hooks/useDeck'

export function ProgressBar() {
  const { currentIndex, totalSlides } = useDeck()
  const progress = totalSlides > 1 ? ((currentIndex + 1) / totalSlides) * 100 : 100

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--diapos-fg, #2c2825)',
          opacity: 0.08,
        }}
      />
      <div
        data-testid="progress-fill"
        style={{
          position: 'relative',
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--diapos-accent, #b45309)',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
