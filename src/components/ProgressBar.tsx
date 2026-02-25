import { useDeck } from '../hooks/useDeck'

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
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        data-testid="progress-fill"
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--diapo-accent, #3b82f6)',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
