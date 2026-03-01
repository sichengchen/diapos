import { useState } from 'react'
import { ProjectorView, defaultTheme, genevaTheme } from 'diapos'

import * as geneva from 'diapos/themes/geneva'
import * as milan from 'diapos/themes/milan'
import * as vienna from 'diapos/themes/vienna'

// Default (Zurich) components from main barrel
import {
  Slide as ZurichSlide,
  Title as ZurichTitle,
  Heading as ZurichHeading,
  Text as ZurichText,
  BulletPoints as ZurichBulletPoints,
  Item as ZurichItem,
  Code as ZurichCode,
  Quote as ZurichQuote,
  Block as ZurichBlock,
} from 'diapos'

const themes = {
  zurich: {
    label: 'Zurich',
    theme: defaultTheme,
    Slide: ZurichSlide,
    Title: ZurichTitle,
    Heading: ZurichHeading,
    Text: ZurichText,
    BulletPoints: ZurichBulletPoints,
    Item: ZurichItem,
    Code: ZurichCode,
    Quote: ZurichQuote,
    Block: ZurichBlock,
  },
  geneva: {
    label: 'Geneva',
    theme: genevaTheme,
    Slide: geneva.Slide,
    Title: geneva.Title,
    Heading: geneva.Heading,
    Text: geneva.Text,
    BulletPoints: geneva.BulletPoints,
    Item: geneva.Item,
    Code: geneva.Code,
    Quote: geneva.Quote,
    Block: geneva.Block,
  },
  milan: {
    label: 'Milan',
    theme: milan.milanTheme,
    Slide: milan.Slide,
    Title: milan.Title,
    Heading: milan.Heading,
    Text: milan.Text,
    BulletPoints: milan.BulletPoints,
    Item: milan.Item,
    Code: milan.Code,
    Quote: milan.Quote,
    Block: milan.Block,
  },
  vienna: {
    label: 'Vienna',
    theme: vienna.viennaTheme,
    Slide: vienna.Slide,
    Title: vienna.Title,
    Heading: vienna.Heading,
    Text: vienna.Text,
    BulletPoints: vienna.BulletPoints,
    Item: vienna.Item,
    Code: vienna.Code,
    Quote: vienna.Quote,
    Block: vienna.Block,
  },
} as const

type ThemeKey = keyof typeof themes

function SampleSlides({ t }: { t: (typeof themes)[ThemeKey] }) {
  const { Slide, Title, Heading, Text, BulletPoints, Item, Code, Quote, Block } = t

  return (
    <>
      <Slide>
        <Title title="Diapos" subtitle="Presentations in React" />
      </Slide>

      <Slide>
        <Heading>Features</Heading>
        <BulletPoints>
          <Item>Write slides in TSX</Item>
          <Item>Themeable with CSS custom properties</Item>
          <Item>Presenter mode with speaker notes</Item>
          <Item>Built on Vite for instant HMR</Item>
        </BulletPoints>
      </Slide>

      <Slide>
        <Heading as="h3">Code Example</Heading>
        <Code
          code={`import { Deck, Slide, Title } from 'diapos'\n\nfunction App() {\n  return (\n    <Deck>\n      <Slide>\n        <Title title="Hello!" />\n      </Slide>\n    </Deck>\n  )\n}`}
          language="tsx"
        />
      </Slide>

      <Slide>
        <Quote
          quote="The best way to predict the future is to invent it."
          author="Alan Kay"
        />
      </Slide>

      <Slide>
        <Heading>Callout Variants</Heading>
        <Block title="Note" variant="default">
          <Text>This is a default callout block.</Text>
        </Block>
        <Block title="Warning" variant="alert">
          <Text>This is an alert callout block.</Text>
        </Block>
      </Slide>
    </>
  )
}

export function ThemePreview() {
  const [active, setActive] = useState<ThemeKey>('zurich')
  const t = themes[active]

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          background: '#111',
          borderBottom: '1px solid #333',
          zIndex: 10,
        }}
      >
        {(Object.keys(themes) as ThemeKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontFamily: 'system-ui',
              background: active === key ? '#fff' : '#333',
              color: active === key ? '#111' : '#aaa',
              fontWeight: active === key ? 600 : 400,
            }}
          >
            {themes[key].label}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1 }}>
        <ProjectorView theme={t.theme} transition="fade">
          <SampleSlides t={t} />
        </ProjectorView>
      </div>
    </div>
  )
}
