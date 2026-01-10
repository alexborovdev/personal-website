import { useTheme } from '@/shared/providers/ThemeProvider'
import Button from '@/shared/ui/Button'
import MoonIcon from '@/assets/icons/moon.svg?react'
import SunIcon from '@/assets/icons/sun.svg?react'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      <span
        key={theme}
        className={styles.icon}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </Button>
  )
}

export default ThemeToggle