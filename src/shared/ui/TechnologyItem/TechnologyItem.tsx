import type { ProjectTechnology } from '@/shared/types/projects'

type Props = {
  technologies: ProjectTechnology[]
  itemClassName: string
  imageClassName: string
}

const TechnologyItem = (props: Props) => {
  const {
    technologies,
    itemClassName,
    imageClassName,
  } = props

  return (
    technologies.map(tech => (
      <li
        key={tech.name}
        className={itemClassName}
      >
        <img
          className={imageClassName}
          src={tech.icon}
          alt={tech.name}
          title={tech.name}
          width={32}
          height={32}
          loading="lazy"
        />
      </li>
    ))
  )
}

export default TechnologyItem