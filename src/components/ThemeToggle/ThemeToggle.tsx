import useTheme from '@/shared/hooks/useTheme.ts'
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
      onClick={toggleTheme.test}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <span
        key={theme}
        className={styles.icon}
      >
        {isDark ? <Sun /> : <Moon />}
      </span>
    </button>
  )
}

export default ThemeToggle