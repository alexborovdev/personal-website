import Button from '@/shared/ui/Button'
import styles from './Navigation.module.scss'

type NavMenuItem = {
  id: string
  label: string
  title: string
}

type NavigationProps = {
  scrollTo: (id: string) => void
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

const Navigation = (props: NavigationProps) => {
  const {
    scrollTo
  } = props

  return (
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
  )
}

export default Navigation