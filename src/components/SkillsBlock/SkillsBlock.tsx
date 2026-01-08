import SkillsList from '@/components/SkillsList'
import styles from './SkillsBlock.module.scss'

type SkillsBlockProps = {
  skills: string[]
  title: string
}

const SkillsBlock = (props: SkillsBlockProps) => {
  const {
    skills,
    title,
  } = props

  return (
    <div>
      <h3
        className={styles.title}
      >
        <span className="accented">{title}</span> Skills
      </h3>
      <SkillsList
        skills={skills}
      />
    </div>
  )
}

export default SkillsBlock