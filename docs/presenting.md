# Presenting

Diapos has two presentation modes: **projector** (audience-facing) and **presenter** (speaker-facing). They sync via BroadcastChannel.

## Views

### Projector View

The default view at `/#/` or `/`. Shows the current slide fullscreen with no UI chrome. This is what your audience sees.

```tsx
import { ProjectorView } from 'diapos'

<ProjectorView theme={myTheme}>
  <Slide>...</Slide>
  <Slide>...</Slide>
</ProjectorView>
```

### Presenter View

The speaker view at `/#/presenter`. Shows:
- Current slide (large preview)
- Next slide (smaller preview)
- Speaker notes for the current slide
- Slide counter (`1 / N`)
- Elapsed timer
- Prev/Next buttons

```tsx
import { PresenterView } from 'diapos'

<PresenterView theme={myTheme}>
  <Slide notes="Welcome everyone">...</Slide>
  <Slide>...</Slide>
</PresenterView>
```

## Router

Use `DiaposRouter` to automatically switch between views based on the URL hash:

```tsx
import { Deck, DiaposRouter, PresenterView, Slide, Title } from 'diapos'

function App() {
  const slides = (
    <>
      <Slide notes="Opening remarks">
        <Title title="My Talk" />
      </Slide>
      <Slide>
        <p>Slide content</p>
      </Slide>
    </>
  )

  return (
    <DiaposRouter
      projector={<Deck theme={myTheme}>{slides}</Deck>}
      presenter={<PresenterView theme={myTheme}>{slides}</PresenterView>}
    />
  )
}
```

Routes:
- `/#/` or `/` -- projector view
- `/#/presenter` -- presenter view

You can also use `useRoute()` for custom routing logic:

```tsx
import { useRoute } from 'diapos'

const route = useRoute() // 'projector' | 'presenter'
```

## BroadcastChannel Sync

When using `sync` on `<Deck>` or the view components, navigation is synchronized between tabs via BroadcastChannel:

- The **presenter** tab broadcasts navigation changes
- The **projector** tab receives and follows
- Late-joining projector tabs request the current index from the presenter

Navigate in the presenter tab, and the projector tab follows automatically.

## Speaker Notes

Add notes to any slide with the `notes` prop:

```tsx
<Slide notes="Remember to mention the demo">
  <Title title="Demo Time" />
</Slide>
```

Notes accept strings or React nodes. They appear in the presenter view and are accessible via the `useNotes()` hook:

```tsx
import { useNotes } from 'diapos'

const { current, next } = useNotes()
```
