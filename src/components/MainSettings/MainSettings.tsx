import ThemeToggle from '@/components/ThemeToggle'
import AnimationToggle from '@/components/AnimationToggle/AnimationToggle.tsx'
import styles from './MainSettings.module.scss'

const MainSettings = () => {
  return (
    <div className={styles.settings}>
      <ThemeToggle />
      <AnimationToggle />
    </div>
  )
}

export default MainSettings