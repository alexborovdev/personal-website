import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'theme'

const THEME_COLORS: Record<Theme, string> = {
  dark: '#191820',
  light: '#FFFFFF',
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark')

  const updateMetaThemeColor = (color: string) => {
    let metaTag = document.querySelector('meta[name="theme-color"]')

    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'theme-color')
      document.head.appendChild(metaTag)
    }

    metaTag.setAttribute('content', color)
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial = saved === 'light' ? 'light' : 'dark'

    setTheme(initial)
    document.documentElement.dataset.theme = initial
    updateMetaThemeColor(THEME_COLORS[initial])
  }, [])

  const toggleTheme = () => {
    setTheme(prevState => {
      const next = prevState === 'dark' ? 'light' : 'dark'

      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.dataset.theme = next
      updateMetaThemeColor(THEME_COLORS[next])
      
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}