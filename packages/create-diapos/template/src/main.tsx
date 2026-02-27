import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DiaposRouter } from 'diapos'
import { DemoPresentation, DemoPresenter } from './slides'
import 'diapos/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiaposRouter
      title="Diapos Demo"
      projector={<DemoPresentation />}
      presenter={<DemoPresenter />}
    />
  </StrictMode>,
)
