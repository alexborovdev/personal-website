import { motion } from 'framer-motion'
import { containerMobile, fromLeft, fromRight } from '@/shared/animations/skills.ts'
import SkillsBlock from '@/components/SkillsBlock'

type SkillsContentProps = {
  styles: Record<string, string>
  hardSkills: string[]
  softSkills: string[]
}

const SkillsContentMobile = (props: SkillsContentProps) => {
  const {
    styles,
    hardSkills,
    softSkills,
  } = props

  return (
    <motion.div
      className={styles.wrapper}
      variants={containerMobile}>
      <SkillsBlock
        skills={hardSkills}
        animation={fromLeft}
        title="Hard"
      />
      <SkillsBlock
        skills={softSkills}
        animation={fromRight}
        title="Soft"
      />
    </motion.div>
  )
}

export default SkillsContentMobile