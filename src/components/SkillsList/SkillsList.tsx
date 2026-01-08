import type { Variants } from 'framer-motion'
import SkillItem from '@/components/SkillItem'
import styles from './SkillsList.module.scss'

type SkillsListProps = {
  skills: string[]
  animation: Variants
}

const SkillsList = (props: SkillsListProps) => {
  const {
    skills,
    animation
  } = props

  return (
    <ul className={styles.list}>
      {skills.map(skill => (
        <SkillItem
          key={skill}
          skill={skill}
          animation={animation}
        />
      ))}
    </ul>
  )
}

export default SkillsList