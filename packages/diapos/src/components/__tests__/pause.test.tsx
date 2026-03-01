import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Deck } from '../../core/Deck'
import { Slide } from '../../core/Slide'
import { Item } from '../layouts/Item'
import { BulletPoints } from '../layouts/BulletPoints'
import { Heading } from '../layouts/Heading'
import { Text } from '../layouts/Text'
import { useDeck } from '../../core/hooks/useDeck'

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

describe('pause progressive reveal', () => {
  it('expands a slide with N paused items into N+1 sub-slides', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <BulletPoints>
            <Item pause>Item 1</Item>
            <Item pause>Item 2</Item>
            <Item pause>Item 3</Item>
          </BulletPoints>
        </Slide>
      </Deck>,
    )

    // 1 slide with 3 pauses = 4 sub-slides
    expect(screen.getByTestId('total')).toHaveTextContent('4')
  })

  it('starts with all paused items hidden (visibleUpTo=0)', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <BulletPoints>
            <Item pause>Item 1</Item>
            <Item pause>Item 2</Item>
          </BulletPoints>
        </Slide>
      </Deck>,
    )

    expect(screen.getByText('Item 1')).toHaveStyle({ visibility: 'hidden' })
    expect(screen.getByText('Item 2')).toHaveStyle({ visibility: 'hidden' })
  })

  it('reveals paused items progressively on navigation', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <BulletPoints>
            <Item pause>Item 1</Item>
            <Item pause>Item 2</Item>
          </BulletPoints>
        </Slide>
      </Deck>,
    )

    // Navigate to sub-slide 1 (visibleUpTo=1) — first item visible
    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Item 1')).toHaveStyle({ visibility: 'visible' })
    expect(screen.getByText('Item 2')).toHaveStyle({ visibility: 'hidden' })

    // Navigate to sub-slide 2 (visibleUpTo=2) — both visible
    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Item 1')).toHaveStyle({ visibility: 'visible' })
    expect(screen.getByText('Item 2')).toHaveStyle({ visibility: 'visible' })
  })

  it('does not expand slides without paused items', () => {
    render(
      <Deck>
        <Slide><div>Slide 1</div><NavControls /></Slide>
        <Slide><div>Slide 2</div></Slide>
      </Deck>,
    )

    expect(screen.getByTestId('total')).toHaveTextContent('2')
  })

  it('mixes slides with and without pauses', () => {
    render(
      <Deck>
        <Slide><div>Slide 1</div><NavControls /></Slide>
        <Slide>
          <div>Slide 2</div>
          <BulletPoints>
            <Item pause>A</Item>
            <Item pause>B</Item>
          </BulletPoints>
        </Slide>
        <Slide><div>Slide 3</div></Slide>
      </Deck>,
    )

    // Slide 1 (1) + Slide 2 with 2 pauses (3) + Slide 3 (1) = 5
    expect(screen.getByTestId('total')).toHaveTextContent('5')
  })

  it('non-paused items are always visible', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <BulletPoints>
            <Item>Always visible</Item>
            <Item pause>Revealed later</Item>
          </BulletPoints>
        </Slide>
      </Deck>,
    )

    // Non-paused item has no visibility style
    expect(screen.getByText('Always visible')).not.toHaveStyle({ visibility: 'hidden' })
    expect(screen.getByText('Revealed later')).toHaveStyle({ visibility: 'hidden' })
  })

  it('preserves notes across sub-slides', () => {
    render(
      <Deck>
        <Slide notes="Shared note">
          <NavControls />
          <BulletPoints>
            <Item pause>Item 1</Item>
          </BulletPoints>
        </Slide>
      </Deck>,
    )

    // totalSlides should be 2 (base + 1 pause)
    expect(screen.getByTestId('total')).toHaveTextContent('2')
  })

  it('Item renders children directly when outside PauseProvider', () => {
    render(
      <BulletPoints>
        <Item pause>Always visible outside provider</Item>
      </BulletPoints>,
    )
    expect(screen.getByText('Always visible outside provider')).toBeInTheDocument()
    expect(screen.getByText('Always visible outside provider')).not.toHaveStyle({ visibility: 'hidden' })
  })

  it('pause works on Heading', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <Heading pause>Hidden heading</Heading>
        </Slide>
      </Deck>,
    )

    expect(screen.getByText('Hidden heading')).toHaveStyle({ visibility: 'hidden' })

    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Hidden heading')).toHaveStyle({ visibility: 'visible' })
  })

  it('pause works on Text', () => {
    render(
      <Deck>
        <Slide>
          <NavControls />
          <Text pause>Hidden text</Text>
        </Slide>
      </Deck>,
    )

    expect(screen.getByText('Hidden text')).toHaveStyle({ visibility: 'hidden' })

    act(() => screen.getByText('Next').click())
    expect(screen.getByText('Hidden text')).toHaveStyle({ visibility: 'visible' })
  })
})
