import { motion } from 'framer-motion'
import { containerDesktop, containerMobile, fromLeft, fromRight } from '@/shared/animations/skills'
import { hardSkills, softSkills } from '@/shared/data/skills'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import styles from './Skills.module.scss'

const Skills = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const Wrapper = () => {
    if (isMobile) {
      return (
        <motion.div
          className={styles.wrapper}
          variants={containerMobile}>
          <div>
            <motion.h3
              className={styles.title}
              variants={fromLeft}
            ><span className="accented">Hard</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {hardSkills.map((hardSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={hardSkill}
                  variants={fromLeft}
                >
                  <div className={styles.itemInner}>{hardSkill}</div>
                </motion.li>
              )}
            </ul>
          </div>
          <div>
            <motion.h3
              className={styles.title}
              variants={fromRight}
            >
              <span className="accented">Soft</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {softSkills.map((softSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={softSkill}
                  variants={fromRight}
                >
                  <div className={styles.itemInner}>{softSkill}</div>
                </motion.li>
              )}
            </ul>
          </div>
        </motion.div>
      )
    } else {
      return (
        <div className={styles.wrapper}>
          <motion.div variants={containerDesktop}>
            <motion.h3
              className={styles.title}
              variants={fromLeft}
            ><span className="accented">Hard</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {hardSkills.map((hardSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={hardSkill}
                  variants={fromLeft}
                >
                  <div className={styles.itemInner}>{hardSkill}</div>
                </motion.li>
              )}
            </ul>
          </motion.div>
          <motion.div variants={containerDesktop}>
            <motion.h3
              className={styles.title}
              variants={fromRight}
            >
              <span className="accented">Soft</span> Skills
            </motion.h3>
            <ul className={styles.list}>
              {softSkills.map((softSkill) =>
                <motion.li
                  className={`tile ${styles.item}`}
                  key={softSkill}
                  variants={fromRight}
                >
                  <div className={styles.itemInner}>{softSkill}</div>
                </motion.li>
              )}
            </ul>
          </motion.div>
        </div>
      )
    }
  }

  return (
    <motion.section
      id="skills"
      aria-labelledby="skills-title"
      className={styles.skills}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
      variants={containerDesktop}
    >
      <div className={`container ${styles.content}`}>
        <h2 id="skills-title" className="visually-hidden">My Skills</h2>
        <Wrapper />
      </div>
    </motion.section>
  )
}

export default Skills