import type { ReactNode } from 'react'
import styles from './Button.module.scss'

type Props = {
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children?: ReactNode
  ariaLabel?: string
  title?: string
  ariaPressed?: boolean | 'mixed'
}

const Button = (props: Props) => {
  const {
    onClick,
    className,
    type = 'button',
    disabled,
    children,
    ariaLabel,
    title,
    ariaPressed
  } = props

  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button}`}
      type={type}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export default Button