import type { ComponentType, SVGProps } from 'react'

type SocialItemProps = {
  href: string
  title: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  itemClassName?: string
  linkClassName?: string
}

const SocialItem = (props: SocialItemProps) => {
  const {
    itemClassName,
    linkClassName,
    href,
    title,
    label,
    Icon
  } = props

  return (
    <li
      className={itemClassName}
    >
      <a
        href={href}
        title={title}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <Icon />
      </a>
    </li>
  )
}

export default SocialItem