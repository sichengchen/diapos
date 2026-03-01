import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Deck } from '../Deck'
import { Slide } from '../Slide'
import { useDeck } from '../hooks/useDeck'

function NavControls() {
  const { currentIndex, totalSlides, next, prev, goTo } = useDeck()
  return (
    <div>
      <span data-testid="index">{currentIndex}</span>
      <span data-testid="total">{totalSlides}</span>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      <button onClick={() => goTo(2)}>GoTo2</button>
    </div>
  )
}

function TestDeck() {
  return (
    <Deck>
      <Slide>
        <div>Slide 1</div>
        <NavControls />
      </Slide>
      <Slide>
        <div>Slide 2</div>
        <NavControls />
      </Slide>
      <Slide>
        <div>Slide 3</div>
        <NavControls />
      </Slide>
    </Deck>
  )
}

describe('Deck', () => {
  it('renders the first slide by default', () => {
    render(<TestDeck />)
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByTestId('index')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('3')
  })

  it('navigates to next slide', () => {
    render(<TestDeck />)
    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByTestId('index')).toHaveTextContent('1')
  })

  it('navigates to previous slide', () => {
    render(<TestDeck />)
    act(() => screen.getByText('Next').click())
    act(() => screen.getByText('Prev').click())
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByTestId('index')).toHaveTextContent('0')
  })

  it('does not go below index 0', () => {
    render(<TestDeck />)
    act(() => screen.getByText('Prev').click())
    expect(screen.getByTestId('index')).toHaveTextContent('0')
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('does not go above last index', () => {
    render(<TestDeck />)
    act(() => screen.getByText('Next').click())
    act(() => screen.getByText('Next').click())
    act(() => screen.getByText('Next').click()) // beyond last
    expect(screen.getByTestId('index')).toHaveTextContent('2')
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  it('goTo navigates to specific slide', () => {
    render(<TestDeck />)
    act(() => screen.getByText('GoTo2').click())
    expect(screen.getByTestId('index')).toHaveTextContent('2')
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })
})
