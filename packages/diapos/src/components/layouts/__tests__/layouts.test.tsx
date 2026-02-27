import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Title } from '../Title'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { BulletPoints } from '../BulletPoints'
import { Enumerate } from '../Enumerate'
import { Item } from '../Item'
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

describe('Heading', () => {
  it('renders as h2 by default', () => {
    const { container } = render(<Heading>Hello</Heading>)
    expect(container.querySelector('h2')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as specified heading level', () => {
    const { container } = render(<Heading as="h3">Sub</Heading>)
    expect(container.querySelector('h3')).toBeInTheDocument()
  })

  it('uses heading font family', () => {
    render(<Heading>Styled</Heading>)
    expect(screen.getByText('Styled')).toHaveStyle({
      fontFamily: 'var(--diapos-font-heading, system-ui)',
    })
  })
})

describe('Text', () => {
  it('renders a paragraph', () => {
    const { container } = render(<Text>Hello world</Text>)
    expect(container.querySelector('p')).toBeInTheDocument()
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('uses body font family', () => {
    render(<Text>Styled</Text>)
    expect(screen.getByText('Styled')).toHaveStyle({
      fontFamily: 'var(--diapos-font-body, system-ui)',
    })
  })
})

describe('BulletPoints', () => {
  it('renders a ul with items', () => {
    const { container } = render(
      <BulletPoints>
        <Item>One</Item>
        <Item>Two</Item>
      </BulletPoints>,
    )
    expect(container.querySelector('ul')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('produces valid HTML (li directly inside ul)', () => {
    const { container } = render(
      <BulletPoints>
        <Item>One</Item>
      </BulletPoints>,
    )
    const ul = container.querySelector('ul')
    expect(ul).not.toBeNull()
    expect(ul!.children[0]!.tagName).toBe('LI')
  })
})

describe('Enumerate', () => {
  it('renders an ol with items', () => {
    const { container } = render(
      <Enumerate>
        <Item>First</Item>
        <Item>Second</Item>
      </Enumerate>,
    )
    expect(container.querySelector('ol')).toBeInTheDocument()
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('produces valid HTML (li directly inside ol)', () => {
    const { container } = render(
      <Enumerate>
        <Item>One</Item>
      </Enumerate>,
    )
    const ol = container.querySelector('ol')
    expect(ol).not.toBeNull()
    expect(ol!.children[0]!.tagName).toBe('LI')
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
