import type { ComponentType, SVGProps } from 'react'

export type SocialId =
  | 'github'
  | 'linkedin'
  | 'email'
  | 'telegram'

export type Social = {
  id: SocialId
  title: string
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export type Contacts = {
  socials: Social[]
}