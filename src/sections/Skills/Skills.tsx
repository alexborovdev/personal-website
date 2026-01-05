import { motion } from 'framer-motion'
import { skillsContainer, skillFromLeft, skillFromRight } from '@/shared/animations/skills'
import { hardSkills, softSkills } from '@/shared/data/skills'
import styles from './Skills.module.scss'

const Skills = () => {
  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-title"
      className={styles.skills}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
    >
      <div className={`container ${styles.content}`}>
        <h2 id="skills-title" className="visually-hidden">My Skills</h2>
        <div className={styles.wrapper}>
          <motion.div
            variants={skillsContainer}
          >
            <motion.h3
              className={styles.title}
              variants={skillFromLeft}
            ><span className="accented">Hard</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {hardSkills.map((hardSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={hardSkill}
                  variants={skillFromLeft}
                >
                  <div className={styles.itemInner}>{hardSkill}</div>
                </motion.li>
              )}
            </ul>
          </motion.div>
          <motion.div
            variants={skillsContainer}
          >
            <motion.h3
              className={styles.title}
              variants={skillFromLeft}
            >
              <span className="accented">Soft</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {softSkills.map((softSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={softSkill}
                  variants={skillFromRight}
                >
                  <div className={styles.itemInner}>{softSkill}</div>
                </motion.li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Skills