import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Moon, Pause, Play, Presentation, Sun } from 'lucide-react'
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
// Color scheme map
// ---------------------------------------------------------------------------

const presenterColors = {
  dark: {
    shell: 'bg-slate-950 text-slate-100',
    panel: 'border-slate-800 bg-slate-900',
    label: 'text-slate-500',
    muted: 'text-slate-400',
    notes: 'text-slate-300',
    separator: 'bg-slate-800',
    ghostButton: 'ghost' as const,
    playButton: 'play' as const,
  },
  light: {
    shell: 'bg-slate-50 text-slate-900',
    panel: 'border-slate-200 bg-white',
    label: 'text-slate-500',
    muted: 'text-slate-500',
    notes: 'text-slate-700',
    separator: 'bg-slate-200',
    ghostButton: 'ghostLight' as const,
    playButton: 'playLight' as const,
  },
} as const

type PresenterColors = (typeof presenterColors)[keyof typeof presenterColors]

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------

function Timer({ running, colors }: { running: boolean; colors: PresenterColors }) {
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
    <span className={cn('font-mono text-sm tabular-nums', colors.muted)}>
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
  colors,
}: {
  slide: ReactNode
  label: string
  className?: string
  colors: PresenterColors
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
      <span className={cn('hidden text-xs font-medium uppercase tracking-widest md:block', colors.label)}>
        {label}
      </span>
      <div
        ref={containerRef}
        className={cn(
          'relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border',
          colors.panel,
        )}
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

function NotesPanel({ notes, colors }: { notes: ReactNode | null; colors: PresenterColors }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <span className={cn('hidden text-xs font-medium uppercase tracking-widest md:block', colors.label)}>
        Notes
      </span>
      <div className={cn('flex-1 overflow-y-auto rounded-lg border p-4', colors.panel)}>
        {notes ? (
          <div className={cn('text-sm leading-relaxed', colors.notes)}>{notes}</div>
        ) : (
          <p className={cn('text-sm italic', colors.label)}>No notes for this slide</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EndOfPresentation
// ---------------------------------------------------------------------------

function EndOfPresentation({ colors }: { colors: PresenterColors }) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center text-sm', colors.label)}>
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
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    () => window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
  )
  const colors = presenterColors[colorScheme]

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
    <div className={cn('flex h-screen w-screen flex-col', colors.shell)}>
      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:grid md:grid-cols-[2fr_1fr]">
        <SlidePreview slide={currentSlide} label="Current Slide" className="shrink-0" colors={colors} />

        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <SlidePreview
            slide={nextSlide ?? <EndOfPresentation colors={colors} />}
            label="Next Slide"
            className="hidden md:flex"
            colors={colors}
          />
          <NotesPanel notes={currentNotes} colors={colors} />
        </div>
      </div>

      {/* Status bar */}
      <Separator className={colors.separator} />
      <div className="grid grid-cols-3 items-center px-4 py-3">
        {/* Left: nav */}
        <div className="flex items-center gap-1">
          <Button variant={colors.ghostButton} size="icon" onClick={deck.prev} aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant={colors.ghostButton} size="icon" onClick={deck.next} aria-label="Next slide">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Center: page counter */}
        <span className={cn('text-center text-sm tabular-nums', colors.muted)}>
          {deck.currentIndex + 1} / {deck.totalSlides}
        </span>

        {/* Right: timer + play */}
        <div className="flex items-center justify-end gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <Timer running={timerRunning} colors={colors} />
            <Button
              variant={colors.ghostButton}
              size="icon"
              onClick={() => setTimerRunning((r) => !r)}
              aria-label={timerRunning ? 'Pause timer' : 'Resume timer'}
            >
              {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            variant={colors.ghostButton}
            size="icon"
            onClick={() => setColorScheme((s) => s === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant={colors.playButton}
            size="icon"
            onClick={openProjector}
            aria-label="Open projector"
          >
            <Presentation className="h-4 w-4" />
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
