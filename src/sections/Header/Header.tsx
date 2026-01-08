import { useEffect, useState } from 'react'
import { ANIMATION_DURATION_AFTER_TYPING } from '@/shared/animations/timings'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import useStickyHeader from '@/shared/hooks/useStickyHeader'
import HeaderContent from '@/sections/Header/HeaderContent'
import styles from './Header.module.scss'

const Header = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isScrollLocked, setIsScrollLocked] = useState(true)

  useEffect(() => {
    const firstRenderTimeout = setTimeout(() => {
      setIsFirstRender(false)
    }, 100)

    const scrollLockTimeout = setTimeout(() => {
      setIsScrollLocked(false)
    }, ANIMATION_DURATION_AFTER_TYPING)

    return () => {
      clearTimeout(firstRenderTimeout)
      clearTimeout(scrollLockTimeout)
    }
  }, [])

  const { scrollTo } = useScrollToSection(isScrollLocked)
  const { isSticky, isShowOut } = useStickyHeader()

  const shouldRenderSticky = isSticky || isShowOut
  const shouldAnimate = shouldRenderSticky && !isFirstRender

  const stickyAnimationClass = shouldAnimate
    ? isShowOut
      ? styles.stickyShowOut
      : styles.stickyShowIn
    : null

  const className = [
    styles.header,
    stickyAnimationClass,
  ].filter(Boolean).join(' ')

  if (isFirstRender) {
    return <HeaderContent
      className={styles.header}
      styles={styles}
      scrollTo={scrollTo}
    />
  }

  return (
    <>
      {shouldRenderSticky ? (
        <HeaderContent
          className={`tile ${className}`}
          styles={styles}
          scrollTo={scrollTo}
        />
      ) : (
        <HeaderContent
          className={styles.header}
          styles={styles}
          scrollTo={scrollTo}
        />
      )}
    </>
  )
}

export default Header