import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import { AnimationsProvider } from '@/shared/providers/AnimationsProvider'
import App from '@/app'
import '@/app/styles/main.scss'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AnimationsProvider>
        <App />
      </AnimationsProvider>
    </ThemeProvider>
  </StrictMode>
)
