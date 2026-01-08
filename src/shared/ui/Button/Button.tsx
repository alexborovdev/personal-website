import type { ReactNode } from 'react'

type Props = {
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
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
    children,
    ariaLabel,
    title,
    ariaPressed
  } = props

  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  )
}

export default Button