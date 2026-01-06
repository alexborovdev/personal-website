import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Button from '@/shared/ui/Button'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import styles from './Hero.module.scss'

const ANIMATION_DURATION_AFTER_TYPING = 3150
const DELAY_AFTER_ANIMATION_END = 700
const BUTTON_ANIMATION_DURATION = 500
const BUTTON_FIRST_RENDER_DELAY = 200

const Hero = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(true)
  const [animationStep, setAnimationStep] = useState<0 | 1 | 2>(0)
  const [isButtonAnimated, setIsButtonAnimated] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  const { scrollTo } = useScrollToSection(isScrollLocked)

  const animateButton = (duration: number) => {
    setIsButtonAnimated(true)
    setTimeout(() => {
      setIsButtonAnimated(false)
    }, duration)
  }

  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <h2 id="hero-title" className="visually-hidden">About Me</h2>
        <div className={styles.description}>
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
                    setIsButtonVisible(true)
                    animateButton(BUTTON_ANIMATION_DURATION)
                    setIsScrollLocked(false)
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
        <Button
          className={`tileHover ${styles.button} ${
            isButtonAnimated ? styles.bounce : ''
          } ${isButtonVisible && styles.visible}`}
          ariaLabel="Scroll to Portfolio section"
          title="Scroll to Portfolio section"
          onClick={() => {
            scrollTo('portfolio')
          }}
        >
          Let’s check!
        </Button>
      </div>
    </section>
  )
}

export default Hero