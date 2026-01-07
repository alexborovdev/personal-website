import { useAnimations } from '@/shared/providers/AnimationsProvider'
import AnimationOn from '@/shared/ui/AnimationToggle/AnimationOn'
import AnimationOff from '@/shared/ui/AnimationToggle/AnimationOff'
import styles from './AnimationToggle.module.scss'

const AnimationsToggle = () => {
  const { animations, toggleAnimations } = useAnimations()

  const isEnabled = animations === 'on'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleAnimations}
      title={isEnabled ? 'Disable background animation' : 'Enable background animation'}
      aria-label={isEnabled ? 'Disable background animation' : 'Enable background animation'}
      aria-pressed={isEnabled}
    >
      <span
        key={animations}
        className={styles.icon}
      >
        {isEnabled ? <AnimationOn /> : <AnimationOff />}
      </span>
    </button>
  )
}

export default AnimationsToggle