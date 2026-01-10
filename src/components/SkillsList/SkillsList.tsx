import SkillItem from '@/shared/ui/SkillItem'
import styles from './SkillsList.module.scss'

type SkillsListProps = {
  skills: string[]
}

const SkillsList = (props: SkillsListProps) => {
  const {
    skills,
  } = props

  return (
    <ul className={styles.list}>
      {skills.map(skill => (
        <SkillItem
          key={skill}
          skill={skill}
        />
      ))}
    </ul>
  )
}

export default SkillsList