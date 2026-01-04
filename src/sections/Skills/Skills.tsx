import { hardSkills, softSkills } from '@/shared/data/skills'
import styles from './Skills.module.scss'

const Skills = () => {
  return (
    <section id="skills" aria-labelledby="skills-title" className={styles.skills}>
      <div className={`container ${styles.content}`}>
        <h2 id="skills-title" className="visually-hidden">My Skills</h2>
        <div className={styles.wrapper}>
          <div>
            <h3 className={styles.title}><span className="accented">Hard</span> Skills</h3>
            <ul className={styles.list}>
              {hardSkills.map((hardSkill) =>
                <li className={`tile ${styles.item}`} key={hardSkill}>
                  <div className={styles.itemInner}>{hardSkill}</div>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className={styles.title}><span className="accented">Soft</span> Skills</h3>
            <ul className={styles.list}>
              {softSkills.map((softSkill) =>
                <li className={`tile ${styles.item}`} key={softSkill}>
                  <div className={styles.itemInner}>{softSkill}</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills