import { describe, expect, it } from 'vitest'
import { Slide } from '../../components/Slide'
import { Step } from '../../components/Step'
import { parseSlides } from '../parseSlides'

describe('parseSlides', () => {
  it('flattens fragment-wrapped slides', () => {
    const { slides } = parseSlides(
      <>
        <Slide><div>Slide 1</div></Slide>
        <Slide><div>Slide 2</div></Slide>
      </>,
    )

    expect(slides).toHaveLength(2)
  })

  it('preserves notes and step expansion from fragment children', () => {
    const { slides, notes } = parseSlides(
      <>
        <Slide notes="Intro notes">
          <div>Intro</div>
        </Slide>
        <Slide notes="Step notes">
          <Step>
            <div>Reveal</div>
          </Step>
        </Slide>
      </>,
    )

    expect(slides).toHaveLength(3)
    expect(notes[0]).toBe('Intro notes')
    expect(notes[1]).toBe('Step notes')
    expect(notes[2]).toBe('Step notes')
  })
})
