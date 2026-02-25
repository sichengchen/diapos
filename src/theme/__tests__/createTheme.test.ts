import { describe, it, expect } from 'vitest'
import { createTheme } from '../createTheme'
import { defaultTheme } from '../defaultTheme'

describe('createTheme', () => {
  it('returns default theme when given empty overrides', () => {
    const theme = createTheme({})
    expect(theme).toEqual(defaultTheme)
  })

  it('overrides top-level color values', () => {
    const theme = createTheme({
      colors: { background: '#ffffff', foreground: '#000000' },
    })
    expect(theme.colors.background).toBe('#ffffff')
    expect(theme.colors.foreground).toBe('#000000')
    // Non-overridden values preserved
    expect(theme.colors.accent).toBe(defaultTheme.colors.accent)
    expect(theme.colors.code).toBe(defaultTheme.colors.code)
  })

  it('overrides font values', () => {
    const theme = createTheme({
      fonts: { heading: 'Inter, sans-serif' },
    })
    expect(theme.fonts.heading).toBe('Inter, sans-serif')
    expect(theme.fonts.body).toBe(defaultTheme.fonts.body)
  })

  it('overrides spacing', () => {
    const theme = createTheme({
      spacing: { slide: '32px' },
    })
    expect(theme.spacing.slide).toBe('32px')
  })

  it('overrides borderRadius', () => {
    const theme = createTheme({ borderRadius: '0px' })
    expect(theme.borderRadius).toBe('0px')
    // Other fields unchanged
    expect(theme.colors).toEqual(defaultTheme.colors)
  })

  it('does not mutate the default theme', () => {
    const before = JSON.stringify(defaultTheme)
    createTheme({ colors: { background: '#ff0000' } })
    expect(JSON.stringify(defaultTheme)).toBe(before)
  })
})
