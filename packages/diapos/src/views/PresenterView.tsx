import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { DeckProvider } from '../core/context/DeckContext'
import { useDeck } from '../core/hooks/useDeck'
import { useKeyboardNavigation } from '../core/hooks/useKeyboardNavigation'
import { useSyncChannel } from '../core/hooks/useSyncChannel'
import { parseSlides } from '../core/utils/parseSlides'
import { ThemeProvider } from '../core/theme/ThemeContext'
import type { Theme } from '../core/theme/types'
import { Button } from '../components/ui/Button'
import { Separator } from '../components/ui/Separator'
import { cn } from '../lib/utils'

export interface PresenterViewProps {
  children: ReactNode
  theme?: Theme
}

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------

function Timer({ running }: { running: boolean }) {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    if (startRef.current === null) startRef.current = Date.now() - elapsed * 1000
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current!) / 1000))
    }, 1000)
    return () => window.clearInterval(id)
  }, [running]) // eslint-disable-line react-hooks/exhaustive-deps

  const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
  const s = String(elapsed % 60).padStart(2, '0')

  return (
    <span className="font-mono text-sm tabular-nums text-slate-400">
      {h}:{m}:{s}
    </span>
  )
}

// ---------------------------------------------------------------------------
// SlidePreview — renders slide at 1920×1080, scales to fit container
// ---------------------------------------------------------------------------

const NATIVE_W = 1920
const NATIVE_H = 1080

function SlidePreview({
  slide,
  label,
  className,
}: {
  slide: ReactNode
  label: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  const recalc = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    if (width === 0 || height === 0) return
    setScale(Math.min(width / NATIVE_W, height / NATIVE_H))
  }, [])

  useEffect(() => {
    recalc()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(recalc)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [recalc])

  return (
    <div className={cn('flex min-h-0 flex-col gap-2', className)}>
      <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <div
        ref={containerRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-900"
        style={{ aspectRatio: '16 / 9' }}
      >
        <div
          style={{
            width: NATIVE_W,
            height: NATIVE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
          className="absolute shrink-0 overflow-hidden bg-[var(--diapos-bg,#0f172a)]"
        >
          {slide}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// NotesPanel
// ---------------------------------------------------------------------------

function NotesPanel({ notes }: { notes: ReactNode | null }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
        Notes
      </span>
      <div className="flex-1 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-4">
        {notes ? (
          <div className="text-sm leading-relaxed text-slate-300">{notes}</div>
        ) : (
          <p className="text-sm italic text-slate-500">No notes for this slide</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EndOfPresentation
// ---------------------------------------------------------------------------

function EndOfPresentation() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
      End of presentation
    </div>
  )
}

// ---------------------------------------------------------------------------
// PresenterShell
// ---------------------------------------------------------------------------

function PresenterShell({
  slides,
  notes,
}: {
  slides: ReactNode[]
  notes: Record<number, ReactNode>
}) {
  const deck = useDeck()
  const [timerRunning, setTimerRunning] = useState(true)

  useKeyboardNavigation(deck)
  useSyncChannel(deck, 'presenter')

  const currentSlide = slides[deck.currentIndex] ?? null
  const nextSlide = slides[deck.currentIndex + 1] ?? null
  const currentNotes = notes[deck.currentIndex] ?? null

  const openProjector = useCallback(() => {
    window.open(
      `${window.location.origin}${window.location.pathname}#/projector`,
      '_blank',
    )
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-950 text-slate-100">
      {/* Main content */}
      <div className="grid flex-1 grid-cols-[2fr_1fr] gap-4 overflow-hidden p-4">
        <SlidePreview slide={currentSlide} label="Current Slide" />

        <div className="flex min-h-0 flex-col gap-4">
          <SlidePreview
            slide={nextSlide ?? <EndOfPresentation />}
            label="Next Slide"
          />
          <NotesPanel notes={currentNotes} />
        </div>
      </div>

      {/* Status bar */}
      <Separator />
      <div className="grid grid-cols-3 items-center px-4 py-3">
        {/* Left: nav */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={deck.prev}>Prev</Button>
          <Button variant="ghost" size="sm" onClick={deck.next}>Next</Button>
        </div>

        {/* Center: page counter */}
        <span className="text-center text-sm tabular-nums text-slate-400">
          {deck.currentIndex + 1} / {deck.totalSlides}
        </span>

        {/* Right: timer + play */}
        <div className="flex items-center justify-end gap-3">
          <Timer running={timerRunning} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTimerRunning((r) => !r)}
          >
            {timerRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button
            variant="play"
            size="sm"
            onClick={openProjector}
            aria-label="Play"
          >
            Play
          </Button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PresenterView — public API
// ---------------------------------------------------------------------------

export function PresenterView({ children, theme }: PresenterViewProps) {
  const { slides, notes } = parseSlides(children)

  return (
    <ThemeProvider theme={theme}>
      <DeckProvider totalSlides={slides.length} notes={notes}>
        <PresenterShell slides={slides} notes={notes} />
      </DeckProvider>
    </ThemeProvider>
  )
}
