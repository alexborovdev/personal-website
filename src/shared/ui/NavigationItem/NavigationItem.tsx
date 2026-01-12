import LinkButton from '@/shared/ui/LinkButton'
import styles from './NavigationItem.module.scss'

type Props = {
  label: string
  href: string
  title: string
  isActive: boolean
  onClick: () => void
}

const NavigationItem = (props: Props) => {
  const {
    href,
    label,
    title,
    isActive,
    onClick
  } = props

  return (
    <li className={styles.item}>
      <LinkButton
        className={`${styles.link} ${isActive ? styles.active : ''}`}
        href={href}
        title={title}
        ariaLabel={title}
        ariaCurrent={isActive}
        onClick={(event) => {
          event.preventDefault()
          onClick()
        }}
      >
        {label}
      </LinkButton>
    </li>
  )
}

export default NavigationItem