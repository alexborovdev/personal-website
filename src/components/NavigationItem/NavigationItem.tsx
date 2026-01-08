import type { Navigation } from '@/shared/types/navigation.ts'
import Button from '@/shared/ui/Button'
import styles from './NavigationItem.module.scss'

type NavigationItemProps = {
  navigation: Navigation[]
  activeSection: string | null
  scrollTo: (id: string) => void
}

const NavigationItem = ({
  navigation,
  activeSection,
  scrollTo,
}: NavigationItemProps) => {
  return (
    navigation.map(({ id, label, title }) => (
      <li key={id} className={styles.item}>
        <Button
          className={`${styles.link} ${
            activeSection === id ? styles.active : ''
          }`}
          title={title}
          ariaLabel={title}
          ariaPressed={activeSection === id}
          onClick={() => scrollTo(id)}
        >
          {label}
        </Button>
      </li>
    ))
  )
}

export default NavigationItem