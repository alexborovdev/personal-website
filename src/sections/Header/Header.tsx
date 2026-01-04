import Logo from '@/shared/ui/Logo'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import useStickyHeader from '@/shared/hooks/useStickyHeader'
import Button from '@/shared/ui/Button'
import Navigation from '@/components/Navigation'
import ThemeToggle from '@/components/ThemeToggle'
import { useEffect, useState } from 'react'
import styles from './Header.module.scss'

type HeaderContentProps = {
  className: string
  scrollTo: (id: string) => void
}

const HeaderContent = (props: HeaderContentProps) => {
  const { className, scrollTo } = props

  return (
    <header id="header" className={className}>
      <div className={`container ${styles.content}`}>
        <Button
          className={styles.logo}
          title="Scroll to top"
          ariaLabel="Scroll to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          <Logo />
        </Button>
        <div className={styles.wrapper}>
          <Navigation scrollTo={scrollTo} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

const Header = () => {
  const { scrollTo } = useScrollToSection()
  const { isSticky, isShowOut } = useStickyHeader()

  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstRender(false)
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

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

  return (
    <>
      {shouldRenderSticky ? (
        <HeaderContent
          className={className}
          scrollTo={scrollTo}
        />
      ) : (
        <HeaderContent
          className={styles.header}
          scrollTo={scrollTo}
        />
      )}

    </>
  )
}

export default Header