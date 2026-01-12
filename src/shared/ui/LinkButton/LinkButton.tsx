import type { ReactNode } from 'react'
import styles from './LinkButton.module.scss'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
  href: string
  children?: ReactNode
  ariaLabel?: string
  title?: string
  ariaCurrent?: boolean
}

const LinkButton = (props: Props) => {
  const {
    onClick,
    className,
    href,
    children,
    ariaLabel,
    title,
    ariaCurrent
  } = props

  return (
    <a
      onClick={onClick}
      className={`${className} ${styles.linkButton}`}
      href={href}
      aria-label={ariaLabel}
      title={title}
      aria-current={ariaCurrent ? 'true' : undefined}
    >
      {children}
    </a>
  )
}

export default LinkButton