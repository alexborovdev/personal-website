import Logo from '@/shared/ui/Logo'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import useStickyHeader from '@/shared/hooks/useStickyHeader'
import Button from '@/shared/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './Header.module.scss'
import { useEffect, useState } from 'react'

type HeaderContentProps = {
  className: string
  scrollTo: (id: string) => void
}
type NavMenuItem = {
  id: string
  label: string
  title: string
}

const navMenu: NavMenuItem[] = [
  {
    id: 'hero',
    label: 'About',
    title: 'Scroll to About section',
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Scroll to Skills section',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    title: 'Scroll to Portfolio section',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    title: 'Scroll to Contacts section',
  },
]

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
          <nav aria-label="Main navigation">
            <ul className={styles.list}>
              {navMenu.map(({ id, label, title }) => (
                <li key={id} className={styles.item}>
                  <Button
                    className={styles.link}
                    title={title}
                    ariaLabel={title}
                    onClick={() => scrollTo(id)}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
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