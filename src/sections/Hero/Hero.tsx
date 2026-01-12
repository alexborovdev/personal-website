import { useState } from 'react'
import { BUTTON_ANIMATION_DURATION } from '@/shared/animations/timings'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import Greeting from '@/components/Greeting'
import Button from '@/shared/ui/Button'
import styles from './Hero.module.scss'

const Hero = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(true)
  const [isButtonAnimated, setIsButtonAnimated] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [onButtonClickCount, setOnButtonClickCount] = useState(0)

  const { scrollTo } = useScrollToSection(isScrollLocked)

  const animateButton = () => {
    setIsButtonAnimated(true)
    setTimeout(() => {
      setIsButtonAnimated(false)
    }, BUTTON_ANIMATION_DURATION)
  }

  const onAnimationEnd = () => {
    setIsButtonVisible(true)
    setIsScrollLocked(false)
    animateButton()
  }

  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <Greeting
          onAnimationEnd={onAnimationEnd}
        />
        <Button
          className={`tileHover ${styles.button}
                    ${isButtonAnimated ? styles.bounce : ''}
                    ${isButtonVisible ? styles.visible : ''}`}
          ariaLabel={`Scroll to ${onButtonClickCount < 1 ? 'Skills' : 'Portfolio'} section`}
          title={`Scroll to ${onButtonClickCount < 1 ? 'Skills' : 'Portfolio'} section`}
          onClick={() => {
            onButtonClickCount < 1 ? scrollTo('skills') : scrollTo('portfolio')
            setOnButtonClickCount(prevState => prevState + 1)
          }}
        >
          Let’s check!
        </Button>
      </div>
    </section>
  )
}

export default Hero