import { type ReactNode, useMemo, useState, useEffect, useCallback } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { ThemeProvider } from '../theme/ThemeContext'
import type { Theme } from '../theme/types'
import { useDeck } from '../hooks/useDeck'
import { useSyncChannel } from '../hooks/useSyncChannel'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { parseSlides } from '../utils/parseSlides'

export interface PresenterViewProps {
  children: ReactNode
  theme?: Theme
}

function Timer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [])

  const hours = Math.floor(elapsed / 3600)
  const minutes = Math.floor((elapsed % 3600) / 60)
  const seconds = elapsed % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {hours > 0 ? `${pad(hours)}:` : ''}{pad(minutes)}:{pad(seconds)}
    </span>
  )
}

interface SlidePreviewProps {
  slide: ReactNode
  label: string
}

function SlidePreview({ slide, label }: SlidePreviewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.05em' }}>
        {label}
      </span>
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.15)',
          position: 'relative',
          backgroundColor: 'var(--diapos-bg, #000)',
        }}
      >
        <div
          style={{
            width: 1920,
            height: 1080,
            transform: 'scale(var(--preview-scale, 0.25))',
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          {slide}
        </div>
      </div>
    </div>
  )
}

function PresenterInner({ slides }: { slides: ReactNode[] }) {
  const deckState = useDeck()
  const { currentIndex, totalSlides, next, prev } = deckState

  useKeyboardNavigation(deckState)
  useSyncChannel(deckState, 'presenter')

  const currentSlide = slides[currentIndex]
  const nextSlide = currentIndex < totalSlides - 1 ? slides[currentIndex + 1] : null
  const currentNotes = deckState.notes[currentIndex] ?? null

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    prev()
  }, [prev])

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    next()
  }, [next])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '1fr auto',
        gap: 16,
        padding: 16,
        boxSizing: 'border-box',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Current slide — large preview */}
      <div style={{ gridRow: '1', gridColumn: '1', minHeight: 0 }}>
        <SlidePreview slide={currentSlide} label="Current Slide" />
      </div>

      {/* Right panel: next slide + notes */}
      <div
        style={{
          gridRow: '1',
          gridColumn: '2',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          minHeight: 0,
        }}
      >
        {/* Next slide preview */}
        <div style={{ flexShrink: 0 }}>
          <SlidePreview
            slide={nextSlide ?? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.3, fontSize: 24 }}>End of presentation</div>}
            label="Next Slide"
          />
        </div>

        {/* Notes */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.6, letterSpacing: '0.05em' }}>
            Notes
          </span>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              borderRadius: 8,
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            {currentNotes ?? <span style={{ opacity: 0.3, fontStyle: 'italic' }}>No notes for this slide</span>}
          </div>
        </div>
      </div>

      {/* Bottom bar: controls + counter + timer */}
      <div
        style={{
          gridRow: '2',
          gridColumn: '1 / -1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.4 : 1,
              fontSize: 14,
            }}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalSlides - 1}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: currentIndex === totalSlides - 1 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === totalSlides - 1 ? 0.4 : 1,
              fontSize: 14,
            }}
          >
            Next
          </button>
        </div>

        <span style={{ fontSize: 14, opacity: 0.6 }}>
          {currentIndex + 1} / {totalSlides}
        </span>

        <div style={{ fontSize: 14, opacity: 0.6 }}>
          <Timer />
        </div>
      </div>
    </div>
  )
}

export function PresenterView({ children, theme }: PresenterViewProps) {
  const { slides, notes } = useMemo(() => parseSlides(children), [children])

  return (
    <ThemeProvider theme={theme}>
      <DeckProvider totalSlides={slides.length} notes={notes}>
        <PresenterInner slides={slides} />
      </DeckProvider>
    </ThemeProvider>
  )
}
