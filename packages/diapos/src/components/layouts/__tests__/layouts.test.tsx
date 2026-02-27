import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Title } from '../Title'
import { Code } from '../Code'
import { Image } from '../Image'

describe('Title', () => {
  it('renders title text', () => {
    render(<Title title="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<Title title="Main" subtitle="Sub" />)
    expect(screen.getByText('Sub')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(<Title title="Main" />)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })
})

describe('Code', () => {
  it('renders code content', () => {
    render(<Code code="const x = 1" />)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Code code="x" title="Example" />)
    expect(screen.getByText('Example')).toBeInTheDocument()
  })

  it('sets data-language attribute', () => {
    const { container } = render(<Code code="x" language="typescript" />)
    expect(container.querySelector('pre')).toHaveAttribute('data-language', 'typescript')
  })
})

describe('Image', () => {
  it('renders image with src', () => {
    render(<Image src="/test.png" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/test.png')
    expect(img).toHaveAttribute('alt', 'Test')
  })

  it('renders caption when provided', () => {
    render(<Image src="/test.png" caption="A caption" />)
    expect(screen.getByText('A caption')).toBeInTheDocument()
  })
})
