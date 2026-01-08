import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { containerDesktop } from '@/shared/animations/skills'
import { hardSkills, softSkills } from '@/shared/data/skills'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import SkillsContentMobile from '@/sections/Skills/SkillsContentMobile'
import SkillsContentDesktop from '@/sections/Skills/SkillsContentDesktop'
import styles from './Skills.module.scss'

const Skills = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const hasAnimatedRef = useRef<boolean>(false)

  return (
    <motion.section
      key={isMobile ? 'skills-mobile' : 'skills-desktop'}
      id="skills"
      aria-labelledby="skills-title"
      className={styles.skills}
      initial={hasAnimatedRef.current ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
      variants={containerDesktop as Variants}
      onViewportEnter={() => {
        hasAnimatedRef.current = true
      }}
    >
      <div className={`container ${styles.content}`}>
        <h2 id="skills-title" className="visually-hidden">
          My Skills
        </h2>

        {isMobile ? (
          <SkillsContentMobile
            styles={styles}
            hardSkills={hardSkills}
            softSkills={softSkills}
          />
        ) : (
          <SkillsContentDesktop
            styles={styles}
            hardSkills={hardSkills}
            softSkills={softSkills}
          />
        )}
      </div>
    </motion.section>
  )
}

export default Skills