import useTheme from '@/shared/hooks/useTheme'
import Moon from '@/shared/ui/Moon'
import Sun from '@/shared/ui/Sun'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
  const {
    themes,
    theme,
    toggleTheme,
  } = useTheme()

  const isDark: boolean = theme === themes.dark

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