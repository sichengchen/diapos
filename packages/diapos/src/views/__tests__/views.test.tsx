import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Slide } from '../../core/Slide'
import { ProjectorView } from '../ProjectorView'
import { PresenterView } from '../PresenterView'

describe('ProjectorView', () => {
  it('renders the current slide', () => {
    render(
      <ProjectorView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </ProjectorView>,
    )
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('does not show progress bar or counter', () => {
    const { container } = render(
      <ProjectorView>
        <Slide><div>Slide 1</div></Slide>
      </ProjectorView>,
    )
    // ProgressBar and SlideCounter should not be rendered
    expect(container.querySelector('[style*="bottom"]')).toBeNull()
  })
})

describe('PresenterView', () => {
  it('renders current slide label', () => {
    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('Current Slide')).toBeInTheDocument()
  })

  it('renders next slide label', () => {
    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('Next Slide')).toBeInTheDocument()
  })

  it('renders notes section', () => {
    render(
      <PresenterView>
        <Slide notes="Test note content"><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('Test note content')).toBeInTheDocument()
  })

  it('renders preview slide content visibly', () => {
    render(
      <PresenterView>
        <Slide><div>Preview Slide A</div></Slide>
        <Slide><div>Preview Slide B</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('Preview Slide A')).toBeVisible()
    expect(screen.getByText('Preview Slide B')).toBeVisible()
  })

  it('shows slide counter', () => {
    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
        <Slide><div>Slide 3</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('renders prev and next buttons', () => {
    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('shows no-notes message when slide has no notes', () => {
    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
      </PresenterView>,
    )
    expect(screen.getByText('No notes for this slide')).toBeInTheDocument()
  })

  it('opens projector view in a new tab from play button', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(
      <PresenterView>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </PresenterView>,
    )

    screen.getByRole('button', { name: 'Play' }).click()

    expect(openSpy).toHaveBeenCalledTimes(1)
    expect(openSpy.mock.calls[0]?.[0]).toContain('#/projector')
    expect(openSpy.mock.calls[0]?.[1]).toBe('_blank')

    openSpy.mockRestore()
  })
})
