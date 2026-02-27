import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Deck } from '../../components/Deck'
import { Slide } from '../../components/Slide'
import { useDeck } from '../useDeck'

// Mock BroadcastChannel for testing
class MockBroadcastChannel {
  static instances: MockBroadcastChannel[] = []
  name: string
  onmessage: ((event: MessageEvent) => void) | null = null
  closed = false

  constructor(name: string) {
    this.name = name
    MockBroadcastChannel.instances.push(this)
  }

  postMessage(data: unknown) {
    // Deliver to all other instances with the same name
    for (const instance of MockBroadcastChannel.instances) {
      if (instance !== this && instance.name === this.name && !instance.closed && instance.onmessage) {
        instance.onmessage(new MessageEvent('message', { data }))
      }
    }
  }

  close() {
    this.closed = true
    const index = MockBroadcastChannel.instances.indexOf(this)
    if (index > -1) MockBroadcastChannel.instances.splice(index, 1)
  }

  static reset() {
    MockBroadcastChannel.instances = []
  }
}

beforeEach(() => {
  MockBroadcastChannel.reset()
  vi.stubGlobal('BroadcastChannel', MockBroadcastChannel)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function NavControls() {
  const { currentIndex, totalSlides, next } = useDeck()
  return (
    <div>
      <span data-testid="index">{currentIndex}</span>
      <span data-testid="total">{totalSlides}</span>
      <button onClick={next}>Next</button>
    </div>
  )
}

describe('Deck with sync', () => {
  it('creates a BroadcastChannel when sync is set', () => {
    render(
      <Deck sync="presenter">
        <Slide><div>Slide 1</div><NavControls /></Slide>
        <Slide><div>Slide 2</div></Slide>
      </Deck>,
    )
    expect(MockBroadcastChannel.instances.length).toBeGreaterThan(0)
  })

  it('does not create a BroadcastChannel without sync', () => {
    render(
      <Deck>
        <Slide><div>Slide 1</div></Slide>
      </Deck>,
    )
    expect(MockBroadcastChannel.instances.length).toBe(0)
  })
})
