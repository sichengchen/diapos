import type { CSSProperties, ReactNode } from 'react'
import { Slide } from '../Slide'

export interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
}

export function Image({ src, alt = '', caption, contain = false, style }: ImageProps) {
  return (
    <Slide
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: contain ? 'var(--diapo-spacing-slide, 64px)' : 0,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: caption ? '80%' : '100%',
          objectFit: contain ? 'contain' : 'cover',
          ...(contain ? {} : { width: '100%', height: '100%' }),
          borderRadius: contain ? 'var(--diapo-radius, 8px)' : undefined,
        }}
      />
      {caption && (
        <p
          style={{
            fontFamily: 'var(--diapo-font-body, system-ui)',
            fontSize: '1em',
            opacity: 0.7,
            marginTop: '0.75em',
            textAlign: 'center',
          }}
        >
          {caption}
        </p>
      )}
    </Slide>
  )
}
