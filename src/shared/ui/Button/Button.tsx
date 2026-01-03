import type { ReactNode } from 'react'

type Props = {
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  ariaLabel?: string
  title?: string
}

const Button = (props: Props) => {
  const {
    onClick,
    className,
    type = 'button',
    children,
    ariaLabel,
    title
  } = props

  return (
    <button onClick={onClick}
            className={className}
            type={type}
            title={title}
            aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button