import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { containerDesktop } from '@/shared/animations/skills'
import SkillsList from '@/components/SkillsList'
import styles from './SkillsBlock.module.scss'

type SkillsBlockProps = {
  skills: string[]
  animation: Variants
  title: string
  wrapper?: 'motion' | 'static'
}

const SkillsBlock = (props: SkillsBlockProps) => {
  const {
    skills,
    animation,
    title,
    wrapper = 'static'
  } = props

  const Wrapper =
    wrapper === 'motion' ? motion.div : 'div'

  const wrapperProps =
    wrapper === 'motion'
      ? { variants: containerDesktop as Variants }
      : {}

  return (
    <Wrapper {...wrapperProps}>
      <motion.h3
        className={styles.title}
        variants={animation}
      >
        <span className="accented">{title}</span> Skills
      </motion.h3>

      <SkillsList
        skills={skills}
        animation={animation}
      />
    </Wrapper>
  )
}

export default SkillsBlock