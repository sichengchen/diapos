import { useState, useEffect, type ReactNode } from 'react'

export type DiaposRoute = 'projector' | 'presenter'

function getRoute(): DiaposRoute {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (hash === 'projector') return 'projector'
  return 'presenter'
}

export function useRoute(): DiaposRoute {
  const [route, setRoute] = useState<DiaposRoute>(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

interface DiaposRouterProps {
  projector: ReactNode
  presenter: ReactNode
}

export function DiaposRouter({ projector, presenter }: DiaposRouterProps) {
  const route = useRoute()
  return <>{route === 'presenter' ? presenter : projector}</>
}
