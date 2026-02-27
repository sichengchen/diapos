import type { CSSProperties, ReactNode } from 'react'

export interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
}

export function Image({ src, alt = '', caption, contain = false, style }: ImageProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
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
          borderRadius: contain ? 'var(--diapos-radius, 8px)' : undefined,
        }}
      />
      {caption && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1em',
            opacity: 0.7,
            marginTop: '0.75em',
            textAlign: 'center',
          }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
