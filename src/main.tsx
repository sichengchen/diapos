import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DiaposRouter } from '../packages/diapos/src/index'
import { DemoPresentation, DemoPresenter } from '../packages/create-diapos/template/src/slides'
import '../packages/diapos/src/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiaposRouter
      projector={<DemoPresentation />}
      presenter={<DemoPresenter />}
    />
  </StrictMode>,
)
