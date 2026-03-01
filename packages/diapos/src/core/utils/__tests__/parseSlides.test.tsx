import { describe, expect, it } from 'vitest'
import { Slide } from '../../Slide'
import { Item } from '../../../themes/zurich/Item'
import { BulletPoints } from '../../../themes/zurich/BulletPoints'
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

  it('preserves notes and pause expansion from fragment children', () => {
    const { slides, notes } = parseSlides(
      <>
        <Slide notes="Intro notes">
          <div>Intro</div>
        </Slide>
        <Slide notes="Step notes">
          <BulletPoints>
            <Item pause>
              <div>Reveal</div>
            </Item>
          </BulletPoints>
        </Slide>
      </>,
    )

    expect(slides).toHaveLength(3)
    expect(notes[0]).toBe('Intro notes')
    expect(notes[1]).toBe('Step notes')
    expect(notes[2]).toBe('Step notes')
  })
})
