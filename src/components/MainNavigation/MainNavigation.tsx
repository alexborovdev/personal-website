import type { Navigation } from '@/shared/types/navigation.ts'
import NavigationItem from '@/components/NavigationItem'
import useActiveSection from '@/shared/hooks/useActiveSection'
import styles from './MainNavigation.module.scss'

type NavigationProps = {
  scrollTo: (id: string) => void
}

const mainNavigation: Navigation[] = [
  { id: 'hero', label: 'About', title: 'Scroll to About section' },
  { id: 'skills', label: 'Skills', title: 'Scroll to Skills section' },
  { id: 'portfolio', label: 'Portfolio', title: 'Scroll to Portfolio section' },
  { id: 'contacts', label: 'Contacts', title: 'Scroll to Contacts section' },
]

const MainNavigation = ({ scrollTo }: NavigationProps) => {
  const activeSection = useActiveSection()

  return (
    <nav aria-label="Main mainNavigation">
      <ul className={styles.list}>
        <NavigationItem
          navigation={mainNavigation}
          activeSection={activeSection}
          scrollTo={scrollTo}
        />
      </ul>
    </nav>
  )
}

export default MainNavigation