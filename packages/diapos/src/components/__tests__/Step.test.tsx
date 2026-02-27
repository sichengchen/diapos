import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Deck } from '../Deck'
import { Slide } from '../Slide'
import { Step } from '../Step'
import { useDeck } from '../../hooks/useDeck'

function NavControls() {
  const { currentIndex, totalSlides, next, prev } = useDeck()
  return (
    <div>
      <span data-testid="index">{currentIndex}</span>
      <span data-testid="total">{totalSlides}</span>
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
    </div>
  )
}

describe('Step progressive reveal', () => {
  it('expands a slide with N steps into N+1 sub-slides', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <Step><span>Step 1</span></Step>
          <Step><span>Step 2</span></Step>
          <Step><span>Step 3</span></Step>
        </Slide>
      </Deck>,
    )

    // 1 slide with 3 steps = 4 sub-slides
    expect(screen.getByTestId('total')).toHaveTextContent('4')
  })

  it('starts with all steps hidden (visibleUpTo=0)', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <Step><span>Step 1</span></Step>
          <Step><span>Step 2</span></Step>
        </Slide>
      </Deck>,
    )

    // All steps should be hidden at index 0
    const step1 = screen.getByText('Step 1').closest('[data-step]')
    const step2 = screen.getByText('Step 2').closest('[data-step]')
    expect(step1).toHaveStyle({ visibility: 'hidden' })
    expect(step2).toHaveStyle({ visibility: 'hidden' })
  })

  it('reveals steps progressively on navigation', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <Step><span>Step 1</span></Step>
          <Step><span>Step 2</span></Step>
        </Slide>
      </Deck>,
    )

    // Navigate to sub-slide 1 (visibleUpTo=1) — first step visible
    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Step 1').closest('[data-step]')).toHaveStyle({ visibility: 'visible' })
    expect(screen.getByText('Step 2').closest('[data-step]')).toHaveStyle({ visibility: 'hidden' })

    // Navigate to sub-slide 2 (visibleUpTo=2) — both visible
    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Step 1').closest('[data-step]')).toHaveStyle({ visibility: 'visible' })
    expect(screen.getByText('Step 2').closest('[data-step]')).toHaveStyle({ visibility: 'visible' })
  })

  it('does not expand slides without steps', () => {
    render(
      <Deck>
        <Slide><div>Slide 1</div><NavControls /></Slide>
        <Slide><div>Slide 2</div></Slide>
      </Deck>,
    )

    expect(screen.getByTestId('total')).toHaveTextContent('2')
  })

  it('mixes slides with and without steps', () => {
    render(
      <Deck>
        <Slide><div>Slide 1</div><NavControls /></Slide>
        <Slide>
          <div>Slide 2</div>
          <Step><span>Step A</span></Step>
          <Step><span>Step B</span></Step>
        </Slide>
        <Slide><div>Slide 3</div></Slide>
      </Deck>,
    )

    // Slide 1 (1) + Slide 2 with 2 steps (3) + Slide 3 (1) = 5
    expect(screen.getByTestId('total')).toHaveTextContent('5')
  })

  it('preserves notes across sub-slides', () => {
    render(
      <Deck>
        <Slide notes="Shared note">
          <NavControls />
          <Step><span>Step 1</span></Step>
        </Slide>
      </Deck>,
    )

    // totalSlides should be 2 (base + 1 step)
    expect(screen.getByTestId('total')).toHaveTextContent('2')
  })

  it('Step renders children directly when outside StepProvider', () => {
    // Step without a Deck context wrapping (standalone)
    render(
      <Step><span>Always visible</span></Step>,
    )
    expect(screen.getByText('Always visible')).toBeInTheDocument()
  })
})
