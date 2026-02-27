import { type ReactNode, useMemo, useState, useEffect, useCallback } from 'react'
import { DeckProvider } from '../context/DeckContext'
import { ThemeProvider } from '../theme/ThemeContext'
import type { Theme } from '../theme/types'
import { useDeck } from '../hooks/useDeck'
import { useSyncChannel } from '../hooks/useSyncChannel'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { parseSlides } from '../utils/parseSlides'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader } from '../components/ui/Card'

export interface PresenterViewProps {
  children: ReactNode
  theme?: Theme
}

function getProjectorUrl(): string {
  const { origin, pathname, search } = window.location
  return `${origin}${pathname}${search}#/projector`
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
    <span className="text-sm font-medium tabular-nums text-slate-300">
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
    <Card className="flex h-full min-h-0 flex-col overflow-hidden border-slate-800 bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardDescription className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <div className="relative aspect-video w-full overflow-hidden rounded-md border border-slate-700/80 bg-[var(--diapos-bg,#000)]">
          <div
            className="h-[1080px] w-[1920px] origin-top-left pointer-events-none"
            style={{ transform: 'scale(var(--preview-scale, 0.25))' }}
          >
            {slide}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NotesPanel({ notes }: { notes: ReactNode | null }) {
  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border-slate-800 bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardDescription className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
          Notes
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto text-base leading-relaxed text-slate-100">
        {notes ?? <p className="text-sm italic text-slate-500">No notes for this slide</p>}
      </CardContent>
    </Card>
  )
}

function PresenterFooter({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onPlay,
}: {
  currentIndex: number
  totalSlides: number
  onPrev: (e: React.MouseEvent) => void
  onNext: (e: React.MouseEvent) => void
  onPlay: (e: React.MouseEvent) => void
}) {
  return (
    <div className="col-span-full flex items-center justify-between border-t border-slate-800 pt-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={currentIndex === totalSlides - 1}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="play"
          size="sm"
          onClick={onPlay}
        >
          Play
        </Button>
      </div>

      <span className="text-sm font-medium text-slate-300">
        {currentIndex + 1} / {totalSlides}
      </span>

      <Timer />
    </div>
  )
}

function NextSlideFallback() {
  return (
    <div className="flex h-full items-center justify-center text-xl text-slate-500">
      End of presentation
    </div>
  )
}

function PresenterShell({
  currentSlide,
  nextSlide,
  currentNotes,
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onPlay,
}: {
  currentSlide: ReactNode
  nextSlide: ReactNode | null
  currentNotes: ReactNode | null
  currentIndex: number
  totalSlides: number
  onPrev: (e: React.MouseEvent) => void
  onNext: (e: React.MouseEvent) => void
  onPlay: (e: React.MouseEvent) => void
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 p-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto]">
        <div className="min-h-0">
          <SlidePreview slide={currentSlide} label="Current Slide" />
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <div className="h-[40%] min-h-[190px]">
            <SlidePreview
              slide={nextSlide ?? <NextSlideFallback />}
              label="Next Slide"
            />
          </div>
          <NotesPanel notes={currentNotes} />
        </div>

        <PresenterFooter
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          onPrev={onPrev}
          onNext={onNext}
          onPlay={onPlay}
        />
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

  const handleOpenProjector = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(getProjectorUrl(), '_blank')
  }, [])

  return (
    <PresenterShell
      currentSlide={currentSlide}
      nextSlide={nextSlide}
      currentNotes={currentNotes}
      currentIndex={currentIndex}
      totalSlides={totalSlides}
      onPrev={handlePrev}
      onNext={handleNext}
      onPlay={handleOpenProjector}
    />
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
