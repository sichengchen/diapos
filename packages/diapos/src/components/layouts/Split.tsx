import type { CSSProperties, ReactNode } from 'react'
import { Slide } from '../Slide'

export interface SplitProps {
  left: ReactNode
  right: ReactNode
  ratio?: string
  style?: CSSProperties
}

export function Split({ left, right, ratio = '1fr 1fr', style }: SplitProps) {
  return (
    <Slide
      style={{
        flexDirection: 'row',
        padding: 0,
        ...style,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: ratio,
          width: '100%',
          height: '100%',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--diapos-spacing-slide, 64px)',
          }}
        >
          {left}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--diapos-spacing-slide, 64px)',
          }}
        >
          {right}
        </div>
      </div>
    </Slide>
  )
}
