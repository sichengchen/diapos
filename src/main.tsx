import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return <div>Diapo</div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
