import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Deck } from '../../components/Deck'
import { Slide } from '../../components/Slide'
import { useDeck } from '../useDeck'

function SlideContent({ label }: { label: string }) {
  const { currentIndex } = useDeck()
  return (
    <div>
      <span>{label}</span>
      <span data-testid="index">{currentIndex}</span>
    </div>
  )
}

function TestDeck() {
  return (
    <Deck>
      <Slide><SlideContent label="Slide 1" /></Slide>
      <Slide><SlideContent label="Slide 2" /></Slide>
      <Slide><SlideContent label="Slide 3" /></Slide>
    </Deck>
  )
}

describe('useKeyboardNavigation', () => {
  it('ArrowRight advances to next slide', () => {
    render(<TestDeck />)
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    act(() => { fireEvent.keyDown(document, { key: 'ArrowRight' }) })
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('ArrowLeft goes to previous slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: 'ArrowRight' }) })
    act(() => { fireEvent.keyDown(document, { key: 'ArrowLeft' }) })
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('Space advances to next slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: ' ' }) })
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('ArrowDown advances to next slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: 'ArrowDown' }) })
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('ArrowUp goes to previous slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: 'ArrowRight' }) })
    act(() => { fireEvent.keyDown(document, { key: 'ArrowUp' }) })
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('Home goes to first slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: 'ArrowRight' }) })
    act(() => { fireEvent.keyDown(document, { key: 'ArrowRight' }) })
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
    act(() => { fireEvent.keyDown(document, { key: 'Home' }) })
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('End goes to last slide', () => {
    render(<TestDeck />)
    act(() => { fireEvent.keyDown(document, { key: 'End' }) })
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })
})
