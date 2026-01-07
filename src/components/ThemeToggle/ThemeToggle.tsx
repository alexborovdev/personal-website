import { useTheme } from '@/shared/providers/ThemeProvider'
import Moon from '@/shared/ui/ThemeToggle/Moon'
import Sun from '@/shared/ui/ThemeToggle/Sun'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
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
        {isDark ? <Moon /> : <Sun />}
      </span>
    </button>
  )
}

export default ThemeToggle