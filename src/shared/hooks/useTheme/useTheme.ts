import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const themes = {
  dark: 'dark',
  light: 'light',
} as const

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(themes.dark)

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    const initialTheme: Theme = savedTheme === themes.light ? themes.light : themes.dark

    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
  }, [])

  const toggleTheme = () => {
    setTheme(prevState => {
      const theme: Theme = prevState === themes.dark ? themes.light : themes.dark

      localStorage.setItem(STORAGE_KEY, theme)
      document.documentElement.dataset.theme = theme

      return theme
    })
  }

  return {
    themes,
    theme,
    toggleTheme,
  }
}

export default useTheme