import type { ReactNode } from 'react'
import { Deck } from '../components/Deck'
import type { Theme } from '../theme/types'
import type { Transition } from '../types'

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
      showProgress={false}
      showCounter={false}
      sync="projector"
    >
      {children}
    </Deck>
  )
}
