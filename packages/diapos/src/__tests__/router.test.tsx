import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { DiaposRouter, useRoute } from '../router'

function RouteLabel() {
  const route = useRoute()
  return <span>{route}</span>
}

const originalHash = window.location.hash

afterEach(() => {
  window.location.hash = originalHash
})

describe('router', () => {
  it('defaults to presenter when hash is empty', () => {
    window.location.hash = ''
    render(<RouteLabel />)
    expect(screen.getByText('presenter')).toBeInTheDocument()
  })

  it('routes to projector for #/projector', () => {
    window.location.hash = '#/projector'
    render(<RouteLabel />)
    expect(screen.getByText('projector')).toBeInTheDocument()
  })

  it('routes to presenter for #/presenter', () => {
    window.location.hash = '#/presenter'
    render(<RouteLabel />)
    expect(screen.getByText('presenter')).toBeInTheDocument()
  })

  it('DiaposRouter renders the matched view', () => {
    window.location.hash = '#/projector'
    render(
      <DiaposRouter
        projector={<div>Projector View</div>}
        presenter={<div>Presenter View</div>}
      />,
    )
    expect(screen.getByText('Projector View')).toBeInTheDocument()
  })

  it('updates route when hash changes', () => {
    window.location.hash = '#/projector'
    render(<RouteLabel />)
    expect(screen.getByText('projector')).toBeInTheDocument()

    act(() => {
      window.location.hash = '#/presenter'
      window.dispatchEvent(new Event('hashchange'))
    })

    expect(screen.getByText('presenter')).toBeInTheDocument()
  })
})
