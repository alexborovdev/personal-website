import { useEffect, useRef, useState } from 'react'
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

  const bounceTimeouts = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isScrollLocked])

  useEffect(() => {
    const timers = bounceTimeouts.current

    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  const animateButton = () => {
    setIsButtonAnimated(true)

    const timeoutId = setTimeout(() => {
      bounceTimeouts.current.delete(timeoutId)
      setIsButtonAnimated(false)
    }, BUTTON_ANIMATION_DURATION)

    bounceTimeouts.current.add(timeoutId)
  }

  const onAnimationEnd = () => {
    setIsButtonVisible(true)
    setIsScrollLocked(false)
    animateButton()
  }

  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <Greeting onAnimationEnd={onAnimationEnd} />
        <Button
          className={`tileHover ${styles.button}
                    ${isButtonAnimated ? styles.bounce : ''}
                    ${isButtonVisible ? styles.visible : ''}`}
          ariaLabel={`Scroll to ${onButtonClickCount < 1 ? 'Skills' : 'Portfolio'} section`}
          title={`Scroll to ${onButtonClickCount < 1 ? 'Skills' : 'Portfolio'} section`}
          onClick={() => {
            const target = onButtonClickCount < 1 ? 'skills' : 'portfolio'
            scrollTo(target)
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
