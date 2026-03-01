# Presenting

Diapos has two views: **presenter** (speaker-facing) and **projector** (audience-facing). They sync navigation via BroadcastChannel.

## Views

### Presenter View

The speaker view at `/` or `/#/presenter`. Shows:
- Current slide (large preview)
- Next slide (smaller preview)
- Speaker notes for the current slide
- Status bar with navigation buttons, slide counter, pausable timer, light/dark toggle, and projector button

```tsx
import { PresenterView } from 'diapos'

<PresenterView theme={myTheme}>
  <Slide notes="Welcome everyone">...</Slide>
  <Slide>...</Slide>
</PresenterView>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | `<Slide>` children |
| `theme` | `Theme` | `defaultTheme` | Theme object |

### Projector View

The audience view at `/#/projector`. Fullscreen slides with no UI chrome.

```tsx
import { ProjectorView } from 'diapos'

<ProjectorView theme={myTheme} transition="fade">
  <Slide>...</Slide>
  <Slide>...</Slide>
</ProjectorView>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | `<Slide>` children |
| `theme` | `Theme` | `defaultTheme` | Theme object |
| `transition` | `'none' \| 'fade' \| 'slide'` | `'fade'` | Slide transition |
| `transitionDuration` | `number` | `300` | Transition duration in ms |

Projector view wraps `<Deck>` with click navigation disabled, chrome hidden, and sync set to `'projector'`.

## Router

`DiaposRouter` switches between views based on the URL hash:

```tsx
import { DiaposRouter, PresenterView, ProjectorView, Slide, Title } from 'diapos'

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
      title="My Talk"
      projector={<ProjectorView theme={myTheme}>{slides}</ProjectorView>}
      presenter={<PresenterView theme={myTheme}>{slides}</PresenterView>}
    />
  )
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projector` | `ReactNode` | required | Rendered on `/#/projector` |
| `presenter` | `ReactNode` | required | Rendered on `/` and `/#/presenter` |
| `title` | `string` | -- | Sets `document.title` — appends " — Presenter View" on the presenter route |

Routes:
- `/` or `/#/presenter` — presenter view
- `/#/projector` — projector view

Share one slide JSX fragment between both views (as shown above) to keep them in sync.

### `useRoute()`

For custom routing logic:

```tsx
import { useRoute } from 'diapos'

const route = useRoute() // 'projector' | 'presenter'
```

## BroadcastChannel Sync

Navigation is synchronized between tabs via BroadcastChannel:

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

Notes accept strings or React nodes. They appear in the presenter view and are accessible via the `useNotes()` hook.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `->` `Down` `Space` | Next slide |
| `<-` `Up` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

Click the left or right half of the screen to navigate (when `clickNavigation` is enabled).
