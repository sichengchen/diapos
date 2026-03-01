import { Children, Fragment, isValidElement, type ReactNode, type ReactElement } from 'react'
import { PauseProvider } from '../context/PauseContext'

function countPauses(children: ReactNode): number {
  let count = 0
  Children.forEach(children, (child) => {
    if (isValidElement<{ pause?: boolean; children?: ReactNode }>(child)) {
      if (child.props.pause) {
        count++
      }
      if (child.props.children) {
        count += countPauses(child.props.children)
      }
    }
  })
  return count
}

function flattenFragmentChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return flattenFragmentChildren(child.props.children)
    }
    return [child]
  })
}

export function parseSlides(children: ReactNode) {
  const rawSlides = flattenFragmentChildren(children)

  const expandedSlides: ReactNode[] = []
  const notes: Record<number, ReactNode> = {}

  rawSlides.forEach((child) => {
    const pauseCount = isValidElement<{ children?: ReactNode }>(child) ? countPauses(child.props.children) : 0
    const slideNotes = isValidElement<{ notes?: ReactNode }>(child) && child.props.notes != null
      ? child.props.notes
      : undefined

    if (pauseCount === 0) {
      // No pauses — add as-is
      const idx = expandedSlides.length
      expandedSlides.push(child)
      if (slideNotes !== undefined) {
        notes[idx] = slideNotes
      }
    } else {
      // Expand into N+1 sub-slides (base + one per pause reveal)
      for (let i = 0; i <= pauseCount; i++) {
        const idx = expandedSlides.length
        const wrapped = (
          <PauseProvider key={`${(child as ReactElement).key}-pause-${i}`} visibleUpTo={i}>
            {child}
          </PauseProvider>
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
