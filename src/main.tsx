import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './i18n/LangContext.tsx'
import { enableReveal } from './motion.ts'

// Antes del primer pintado: lo que aún no ha entrado en pantalla nace oculto, sin parpadeo
enableReveal()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
