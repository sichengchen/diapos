import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DemoPresentation } from '../packages/create-diapos/template/slides'
import '../packages/diapos/src/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoPresentation />
  </StrictMode>,
)
