import type { ImageProps } from '../../core/props'

export type { ImageProps }

export function Image({ src, alt = '', caption, contain = false, style, className }: ImageProps) {
  return (
    <div
      className={className}
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
          borderRadius: 'var(--diapos-radius, 4px)',
        }}
      />
      {caption && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '0.9em',
            color: 'var(--diapos-muted, #a1a1aa)',
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
