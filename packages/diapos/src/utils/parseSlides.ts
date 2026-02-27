import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react'
import { Step } from '../components/Step'
import { StepProvider } from '../context/StepContext'

function countSteps(children: ReactNode): number {
  let count = 0
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Step) {
        count++
      }
      if (child.props.children) {
        count += countSteps(child.props.children)
      }
    }
  })
  return count
}

export function parseSlides(children: ReactNode) {
  const rawSlides = Children.toArray(children)

  const expandedSlides: ReactNode[] = []
  const notes: Record<number, ReactNode> = {}

  rawSlides.forEach((child) => {
    const stepCount = isValidElement(child) ? countSteps(child.props.children) : 0
    const slideNotes = isValidElement<{ notes?: ReactNode }>(child) && child.props.notes != null
      ? child.props.notes
      : undefined

    if (stepCount === 0) {
      // No steps — add as-is
      const idx = expandedSlides.length
      expandedSlides.push(child)
      if (slideNotes !== undefined) {
        notes[idx] = slideNotes
      }
    } else {
      // Expand into N+1 sub-slides (base + one per step reveal)
      for (let i = 0; i <= stepCount; i++) {
        const idx = expandedSlides.length
        const wrapped = (
          <StepProvider key={`${(child as ReactElement).key}-step-${i}`} visibleUpTo={i}>
            {child}
          </StepProvider>
        )
        expandedSlides.push(wrapped)
        if (slideNotes !== undefined) {
          notes[idx] = slideNotes
        }
      }
    }
  })

  return { slides: expandedSlides, notes }
}
