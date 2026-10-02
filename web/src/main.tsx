import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuiProvider } from './providers/NuiProvider'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuiProvider>
      <App />
    </NuiProvider>
  </StrictMode>,
)
