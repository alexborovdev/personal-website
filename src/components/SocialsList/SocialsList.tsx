import type { Social } from '@/shared/types/contacts'
import SocialItem from '@/shared/ui/SocialItem'
import styles from './SocialsList.module.scss'

type Props = {
  socials: Social[]
}

const SocialsList = (props: Props) => {
  const { socials } = props

  return (
    <ul
      className={styles.list}
      aria-labelledby="soc1als-title"
    >
      {socials.map(({ id, title, label, href, icon: Icon }) => (
        <SocialItem
          key={id}
          itemClassName={styles.item}
          linkClassName={styles.link}
          href={href}
          title={title}
          label={label}
          Icon={Icon}
        />
      ))}
    </ul>
  )
}

export default SocialsList