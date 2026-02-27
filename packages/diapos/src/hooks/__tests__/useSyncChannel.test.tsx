import { render, screen, act } from '@testing-library/react'
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
  sent: unknown[] = []

  constructor(name: string) {
    this.name = name
    MockBroadcastChannel.instances.push(this)
  }

  postMessage(data: unknown) {
    this.sent.push(data)
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

function SyncControls({ id }: { id: string }) {
  const { currentIndex, next } = useDeck()
  return (
    <div>
      <span data-testid={`${id}-index`}>{currentIndex}</span>
      <button data-testid={`${id}-next`} onClick={next}>Next</button>
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

  it('syncs projector index when presenter navigates', () => {
    render(
      <>
        <Deck sync="presenter">
          <Slide><SyncControls id="presenter" /></Slide>
          <Slide><SyncControls id="presenter" /></Slide>
        </Deck>

        <Deck sync="projector" clickNavigation={false} showProgress={false} showCounter={false}>
          <Slide><SyncControls id="projector" /></Slide>
          <Slide><SyncControls id="projector" /></Slide>
        </Deck>
      </>,
    )

    expect(screen.getByTestId('presenter-index')).toHaveTextContent('0')
    expect(screen.getByTestId('projector-index')).toHaveTextContent('0')

    act(() => {
      screen.getByTestId('presenter-next').click()
    })

    expect(screen.getByTestId('presenter-index')).toHaveTextContent('1')
    expect(screen.getByTestId('projector-index')).toHaveTextContent('1')
  })

  it('projector retries sync requests until a presenter responds', () => {
    vi.useFakeTimers()

    render(
      <Deck sync="projector" clickNavigation={false} showProgress={false} showCounter={false}>
        <Slide><SyncControls id="projector-retry" /></Slide>
        <Slide><SyncControls id="projector-retry" /></Slide>
      </Deck>,
    )

    const projectorChannel = MockBroadcastChannel.instances[0]
    expect(projectorChannel).toBeDefined()
    expect(projectorChannel?.sent).toHaveLength(1)

    act(() => {
      vi.advanceTimersByTime(2100)
    })

    expect(projectorChannel?.sent.length).toBeGreaterThanOrEqual(3)

    vi.useRealTimers()
  })
})
