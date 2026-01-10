import type { Navigation } from '@/shared/types/navigation'
import NavigationItem from '@/shared/ui/NavigationItem'
import useActiveSection from '@/shared/hooks/useActiveSection'
import styles from './MainNavigation.module.scss'

type Props = {
  scrollTo: (id: string) => void
}

const mainNavigation: Navigation[] = [
  { id: 'hero', label: 'About', title: 'Scroll to About section' },
  { id: 'skills', label: 'Skills', title: 'Scroll to Skills section' },
  { id: 'portfolio', label: 'Portfolio', title: 'Scroll to Portfolio section' },
  { id: 'contacts', label: 'Contacts', title: 'Scroll to Contacts section' },
]

const MainNavigation = (props: Props) => {
  const { scrollTo } = props
  
  const activeSection = useActiveSection()

  return (
    <nav aria-label="Main navigation">
      <ul className={styles.list}>
        {mainNavigation.map(({ id, label, title }) => (
          <NavigationItem
            key={id}
            label={label}
            title={title}
            isActive={activeSection === id}
            onClick={() => scrollTo(id)}
          />
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation