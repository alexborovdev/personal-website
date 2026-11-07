import type { ProjectTechnology } from '@/shared/types/projects'

type Props = {
  technology: ProjectTechnology
  itemClassName: string
  imageClassName: string
}

const TechnologyItem = (props: Props) => {
  const { technology, itemClassName, imageClassName } = props

  return (
    <li className={itemClassName}>
      <img
        className={imageClassName}
        src={technology.icon}
        alt={technology.name}
        title={technology.name}
        width={32}
        height={32}
        loading="lazy"
      />
    </li>
  )
}

export default TechnologyItem
