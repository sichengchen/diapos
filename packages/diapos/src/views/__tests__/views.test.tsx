import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Slide } from '../../components/Slide'
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
})
