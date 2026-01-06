import useScrollBar from '@/shared/hooks/useScrollBar'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import styles from './ScrollBar.module.scss'

const ScrollBar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const progress = useScrollBar()

  if (!isDesktop) {
    return
  }

  return (
    <div className={styles.track} aria-hidden>
      <div
        className={styles.indication}
        style={{ transform: `scaleY(${progress})` }}
      />
    </div>
  )
}

export default ScrollBar