import ThemeToggle from '@/shared/ui/ThemeToggle'
import AnimationToggle from '@/shared/ui/AnimationToggle'
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