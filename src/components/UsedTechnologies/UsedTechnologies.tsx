import type { ProjectTechnology } from '@/shared/types/projects'
import TechnologyItem from '@/shared/ui/TechnologyItem'
import styles from './UsedTechnologies.module.scss'

type UsedTechnologiesProps = {
  technologies: ProjectTechnology[]
}

const UsedTechnologies = (props: UsedTechnologiesProps) => {
  const { technologies } = props

  return (
    <>
      <h4 className="visually-hidden">
        Technologies used in project
      </h4>
      <ul className={styles.list}>
        <TechnologyItem
          technologies={technologies}
          itemClassName={styles.item}
          imageClassName={styles.image}
        />
      </ul>
    </>
  )
}

export default UsedTechnologies