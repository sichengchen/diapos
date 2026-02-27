import { Children, isValidElement, type ReactNode } from 'react'

export function parseSlides(children: ReactNode) {
  const slides = Children.toArray(children)
  const notes: Record<number, ReactNode> = {}
  slides.forEach((child, index) => {
    if (isValidElement<{ notes?: ReactNode }>(child) && child.props.notes != null) {
      notes[index] = child.props.notes
    }
  })
  return { slides, notes }
}
