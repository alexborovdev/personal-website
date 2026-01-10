import Button from '@/shared/ui/Button'
import styles from './NavigationItem.module.scss'

type Props = {
  label: string
  title: string
  isActive: boolean
  onClick: () => void
}

const NavigationItem = (props: Props) => {
  const {
    label,
    title,
    isActive,
    onClick
  } = props

  return (
    <li className={styles.item}>
      <Button
        className={`${styles.link} ${isActive ? styles.active : ''}`}
        title={title}
        ariaLabel={title}
        ariaPressed={isActive}
        onClick={onClick}
      >
        {label}
      </Button>
    </li>
  )
}

export default NavigationItem