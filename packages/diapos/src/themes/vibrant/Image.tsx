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
          borderRadius: contain ? 'var(--diapos-radius, 12px)' : undefined,
        }}
      />
      {caption && (
        <p
          style={{
            fontFamily: 'var(--diapos-font-body, system-ui)',
            fontSize: '1em',
            fontWeight: 500,
            color: 'var(--diapos-accent, #f97316)',
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
