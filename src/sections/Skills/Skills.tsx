import { hardSkills, softSkills } from '@/shared/data/skills'
import SkillsBlock from '@/components/SkillsBlock'
import styles from './Skills.module.scss'

const Skills = () => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className={styles.skills}
    >
      <div className={`container ${styles.content}`}>
        <h2 id="skills-title" className="visually-hidden">
          My Skills
        </h2>
        <div className={styles.wrapper}>
          <SkillsBlock
            skills={hardSkills}
            title="Hard"
          />
          <SkillsBlock
            skills={softSkills}
            title="Soft"
          />
        </div>
      </div>
    </section>
  )
}

export default Skills