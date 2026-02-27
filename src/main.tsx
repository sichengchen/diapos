import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DemoPresentation } from '../examples/demo/slides'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoPresentation />
  </StrictMode>,
)
