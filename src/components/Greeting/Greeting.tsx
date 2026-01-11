import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import {
  ANIMATION_DURATION_AFTER_TYPING,
  BUTTON_FIRST_RENDER_DELAY,
  DELAY_AFTER_ANIMATION_END
} from '@/shared/animations/timings'
import styles from './Greeting.module.scss'

type Props = {
  onAnimationEnd: () => void
}

const Greeting = (props: Props) => {
  const { onAnimationEnd } = props

  const [animationStep, setAnimationStep] = useState<0 | 1 | 2>(0)

  return (
    <div className={styles.greeting}>
      <h3 className={styles.title}>
        <TypeAnimation
          sequence={[
            'Hello! My name is ',
            () => setAnimationStep(1),
          ]}
          speed={50}
          cursor={false}
          repeat={0}
          wrapper="span"
        />
        {animationStep >= 1 && (
          <TypeAnimation
            className="accented"
            sequence={[
              'Alex\u00A0Borov',
              DELAY_AFTER_ANIMATION_END,
              () => setAnimationStep(2),
            ]}
            speed={50}
            cursor={false}
            repeat={0}
            wrapper="span"
          />
        )}
      </h3>
      {animationStep === 2 && (
        <TypeAnimation
          className={styles.subtitle}
          sequence={[
            'I\'m a frontend developer.\nI can do something great for you.',
            () => {
              setTimeout(() => {
                onAnimationEnd()
              }, BUTTON_FIRST_RENDER_DELAY)
            },
            ANIMATION_DURATION_AFTER_TYPING,
            '',
            DELAY_AFTER_ANIMATION_END,
          ]}
          speed={60}
          deletionSpeed={80}
          repeat={Infinity}
          cursor
          wrapper="p"
          style={{ whiteSpace: 'pre-line' }}
        />
      )}
    </div>
  )
}

export default Greeting