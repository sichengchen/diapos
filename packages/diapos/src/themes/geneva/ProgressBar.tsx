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
        height: '3px',
      }}
    >
      {/* Track — theme foreground at low opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--diapos-fg, #fff)',
          opacity: 0.1,
        }}
      />
      {/* Fill — theme accent */}
      <div
        data-testid="progress-fill"
        style={{
          position: 'relative',
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--diapos-accent, #3b82f6)',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
