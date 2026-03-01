import type { CSSProperties, ReactNode } from 'react'
import type { DeepPartial, Theme } from './theme/types'

export interface SlideProps {
  children: ReactNode
  theme?: DeepPartial<Theme>
  style?: CSSProperties
  className?: string
  notes?: ReactNode
}

export interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface TitleProps {
  title: ReactNode
  subtitle?: ReactNode
  style?: CSSProperties
  className?: string
}

export interface TextProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface CodeProps {
  code: string
  language?: string
  style?: CSSProperties
  className?: string
}

export interface ImageProps {
  src: string
  alt?: string
  caption?: ReactNode
  contain?: boolean
  style?: CSSProperties
  className?: string
}

export interface QuoteProps {
  quote: ReactNode
  author?: ReactNode
  style?: CSSProperties
  className?: string
}

export interface BlockProps {
  title?: string
  variant?: 'default' | 'alert' | 'example'
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export interface BulletPointsProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface EnumerateProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface ItemProps {
  children: ReactNode
  pause?: boolean
  style?: CSSProperties
  className?: string
}

export interface ColumnsProps {
  ratio?: string
  gap?: string
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export interface ColumnProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}
