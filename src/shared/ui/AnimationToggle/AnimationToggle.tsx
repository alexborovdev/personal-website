import { useAnimations } from '@/shared/providers/AnimationsProvider'
import Button from '@/shared/ui/Button'
import AnimationOnIcon from '@/assets/icons/animation-on.svg?react'
import AnimationOffIcon from '@/assets/icons/animation-off.svg?react'
import styles from './AnimationToggle.module.scss'

const AnimationToggle = () => {
  const { animations, toggleAnimations } = useAnimations()

  const isEnabled = animations === 'on'

  return (
    <Button
      type="button"
      className={styles.toggle}
      onClick={toggleAnimations}
      title={isEnabled ? 'Disable background animation' : 'Enable background animation'}
      ariaLabel={isEnabled ? 'Disable background animation' : 'Enable background animation'}
      ariaPressed={isEnabled}
    >
      <span
        key={animations}
        className={styles.icon}
      >
        {isEnabled ? <AnimationOnIcon /> : <AnimationOffIcon />}
      </span>
    </Button>
  )
}

export default AnimationToggle