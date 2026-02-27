import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DemoPresentation } from './slides'
import 'diapos/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoPresentation />
  </StrictMode>,
)
