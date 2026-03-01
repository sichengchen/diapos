import type { ReactNode } from 'react'
import { Deck } from '../core/Deck'
import type { Theme } from '../core/theme/types'
import type { Transition } from '../core/types'

export interface ProjectorViewProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition
  transitionDuration?: number
}

export function ProjectorView({
  children,
  theme,
  transition,
  transitionDuration,
}: ProjectorViewProps) {
  return (
    <Deck
      theme={theme}
      transition={transition}
      transitionDuration={transitionDuration}
      clickNavigation={false}
      progress={false}
      counter={false}
      sync="projector"
    >
      {children}
    </Deck>
  )
}
