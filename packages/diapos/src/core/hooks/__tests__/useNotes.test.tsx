import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Deck } from '../../components/Deck'
import { Slide } from '../../components/Slide'
import { useNotes } from '../useNotes'
import { useDeck } from '../useDeck'

function NotesDisplay() {
  const { current, next } = useNotes()
  return (
    <div>
      <span data-testid="current-notes">{current ?? 'none'}</span>
      <span data-testid="next-notes">{next ?? 'none'}</span>
    </div>
  )
}

function NavControls() {
  const { next } = useDeck()
  return <button onClick={next}>Next</button>
}

describe('useNotes', () => {
  it('returns current and next notes', () => {
    render(
      <Deck>
        <Slide notes="Notes for slide 1">
          <div>Slide 1</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Notes for slide 2">
          <div>Slide 2</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Notes for slide 3">
          <div>Slide 3</div>
          <NotesDisplay />
        </Slide>
      </Deck>,
    )

    expect(screen.getByTestId('current-notes')).toHaveTextContent('Notes for slide 1')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('Notes for slide 2')
  })

  it('returns null for slides without notes', () => {
    render(
      <Deck>
        <Slide>
          <div>Slide 1</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide>
          <div>Slide 2</div>
          <NotesDisplay />
        </Slide>
      </Deck>,
    )

    expect(screen.getByTestId('current-notes')).toHaveTextContent('none')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('none')
  })

  it('returns null for next notes on the last slide', () => {
    render(
      <Deck>
        <Slide notes="First">
          <div>Slide 1</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Last">
          <div>Slide 2</div>
          <NotesDisplay />
        </Slide>
      </Deck>,
    )

    // Navigate to the last slide
    act(() => screen.getByText('Next').click())

    expect(screen.getByTestId('current-notes')).toHaveTextContent('Last')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('none')
  })

  it('updates notes when navigating between slides', () => {
    render(
      <Deck>
        <Slide notes="Note A">
          <div>Slide 1</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Note B">
          <div>Slide 2</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Note C">
          <div>Slide 3</div>
          <NotesDisplay />
        </Slide>
      </Deck>,
    )

    // Slide 1: current=A, next=B
    expect(screen.getByTestId('current-notes')).toHaveTextContent('Note A')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('Note B')

    // Navigate to slide 2: current=B, next=C
    act(() => screen.getByText('Next').click())
    expect(screen.getByTestId('current-notes')).toHaveTextContent('Note B')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('Note C')
  })

  it('handles mixed slides with and without notes', () => {
    render(
      <Deck>
        <Slide notes="Has notes">
          <div>Slide 1</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide>
          <div>Slide 2</div>
          <NotesDisplay />
          <NavControls />
        </Slide>
        <Slide notes="Also has notes">
          <div>Slide 3</div>
          <NotesDisplay />
        </Slide>
      </Deck>,
    )

    // Slide 1: current="Has notes", next=null (slide 2 has no notes)
    expect(screen.getByTestId('current-notes')).toHaveTextContent('Has notes')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('none')

    // Navigate to slide 2: current=null, next="Also has notes"
    act(() => screen.getByText('Next').click())
    expect(screen.getByTestId('current-notes')).toHaveTextContent('none')
    expect(screen.getByTestId('next-notes')).toHaveTextContent('Also has notes')
  })
})
