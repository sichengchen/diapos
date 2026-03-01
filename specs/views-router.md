# Views & Router

Presenter and projector views for dual-screen presentations, plus a hash-based router.

**Sources:** `packages/diapos/src/views/`, `packages/diapos/src/router.tsx`

## PresenterView

```ts
import { PresenterView } from 'diapos'
import type { PresenterViewProps } from 'diapos'
```

### Props

```ts
interface PresenterViewProps {
  children: ReactNode  // same slide content as Deck
  theme?: Theme
}
```

### Layout

2-column grid:

- **Left (2fr):** Current slide preview
- **Right (1fr):** Next slide preview (top) + notes panel (bottom)

### Components

- **SlidePreview** — renders slide at 1920x1080, scales to fit container using ResizeObserver
- **NotesPanel** — displays current slide notes or "No notes for this slide" message
- **Timer** — elapsed time display (HH:MM:SS), starts running by default

### Status Bar

- Left: Prev/Next buttons
- Center: Slide counter (`currentIndex + 1 / totalSlides`)
- Right: Timer toggle, Play button (opens projector in new window)

### Behavior

- Parses children for slides and notes (same as Deck)
- Wraps with ThemeProvider and DeckProvider
- Installs keyboard navigation and sync channel (as presenter role)
- Play button opens projector URL: `${origin}${pathname}#/projector`

## ProjectorView

```ts
import { ProjectorView } from 'diapos'
import type { ProjectorViewProps } from 'diapos'
```

### Props

```ts
interface ProjectorViewProps {
  children: ReactNode
  theme?: Theme
  transition?: Transition
  transitionDuration?: number
}
```

### Behavior

Wraps children with a `<Deck>` configured for projector mode:

- `clickNavigation={false}`
- `progress={false}`
- `counter={false}`
- `sync="projector"`

Passes through `theme`, `transition`, `transitionDuration`.

## DiaposRouter

```ts
import { DiaposRouter, useRoute } from 'diapos'
import type { DiaposRoute } from 'diapos'
```

### Types

```ts
type DiaposRoute = 'projector' | 'presenter'
```

### DiaposRouter Props

```ts
interface DiaposRouterProps {
  projector: ReactNode
  presenter: ReactNode
  title?: string
}
```

### useRoute

```ts
function useRoute(): DiaposRoute
```

Reads `window.location.hash`. Returns `'projector'` if hash is `#projector` or `#/projector`. Returns `'presenter'` for everything else (including no hash).

Listens to `hashchange` event and re-renders on change.

### DiaposRouter Behavior

- Routes based on hash to render either `projector` or `presenter` content
- Updates `document.title` with " — Presenter View" suffix for the presenter route

### Typical Setup

```tsx
import { Deck, Slide, PresenterView, ProjectorView, DiaposRouter } from 'diapos'

const slides = (
  <>
    <Slide>...</Slide>
    <Slide>...</Slide>
  </>
)

function App() {
  return (
    <DiaposRouter
      title="My Talk"
      presenter={<PresenterView>{slides}</PresenterView>}
      projector={<ProjectorView>{slides}</ProjectorView>}
    />
  )
}
```
