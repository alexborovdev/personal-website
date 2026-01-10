import type { Contacts } from '@/shared/types/contacts'
import GithubIcon from '@/assets/icons/socials/github.svg?react'
import LinkedinIcon from '@/assets/icons/socials/linkedin.svg?react'
import EmailIcon from '@/assets/icons/socials/gmail.svg?react'
import TelegramIcon from '@/assets/icons/socials/telegram.svg?react'

const contacts: Contacts = {
  socials: [
    {
      id: 'github',
      title: 'GitHub',
      label: 'GitHub profile',
      href: 'https://github.com/alexborovdev',
      icon: GithubIcon
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      label: 'LinkedIn profile',
      href: 'https://www.linkedin.com/in/borovytskyi',
      icon: LinkedinIcon
    },
    {
      id: 'email',
      title: 'Email',
      label: 'Email contact',
      href: 'mailto:o.borovytskyi@gmail.com',
      icon: EmailIcon
    },
    {
      id: 'telegram',
      title: 'Telegram',
      label: 'Telegram contact',
      href: 'https://t.me/borovytskyi',
      icon: TelegramIcon
    }
  ]
}

export default contacts