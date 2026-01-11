import SkillsList from '@/components/SkillsList'
import styles from './SkillsBlock.module.scss'

type Props = {
  skills: string[]
  title: string
}

const SkillsBlock = (props: Props) => {
  const { skills, title, } = props

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