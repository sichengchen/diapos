import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DiaposRouter } from '../packages/diapos/src/index'
import { DemoPresentation, DemoPresenter } from '../packages/create-diapos/template/src/slides'
import { ThemePreview } from './theme-preview'
import '../packages/diapos/src/styles/global.css'

const isPreview = new URLSearchParams(window.location.search).has('preview')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPreview ? (
      <ThemePreview />
    ) : (
      <DiaposRouter
        title="Diapos Demo"
        projector={<DemoPresentation />}
        presenter={<DemoPresenter />}
      />
    )}
  </StrictMode>,
)
