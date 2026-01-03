import Logo from '@/shared/ui/Logo'
import useScrollToSection from '@/shared/hooks/useScrollToSection'
import Button from '@/shared/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './Header.module.scss'

type NavMenuItem = {
  id: string
  label: string
  title: string
}

const navMenu: NavMenuItem[] = [
  {
    id: 'about',
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

const Header = () => {
  const { scrollTo } = useScrollToSection()

  return (
    <header id="header">
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

export default Header