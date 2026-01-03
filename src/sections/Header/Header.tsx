import Logo from '@/shared/ui/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './Header.module.scss'

type NavMenuItem = {
  id: string
  label: string
  title: string
  url: string
}

const navMenu: NavMenuItem[] = [
  {
    id: 'about',
    label: 'About',
    title: 'Scroll to About section',
    url: '#about',
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'Scroll to Skills section',
    url: '#skills',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    title: 'Scroll to Portfolio section',
    url: '#portfolio',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    title: 'Scroll to Contacts section',
    url: '#contacts',
  },
]

const Header = () => {
  return (
    <header id="header">
      <div className={`container ${styles.content}`}>
        <a
          href="#"
          title="Scroll to top"
          aria-label="Scroll to top">
          <Logo />
        </a>
        <div className={styles.wrapper}>
          <nav aria-label="Main navigation">
            <ul className={styles.list}>
              {navMenu.map(({ id, label, title, url }) => {
                return (
                  <li key={id} className={styles.item}>
                    <a className={styles.link} href={url} title={title}>{label}</a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header