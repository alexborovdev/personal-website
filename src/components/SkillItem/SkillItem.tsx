import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styles from './SkillItem.module.scss'

type SkillItemProps = {
  skill: string
  animation: Variants
}

const SkillItem = (props: SkillItemProps) => {
  const {
    skill,
    animation
  } = props

  return (
    <motion.li
      key={skill}
      className={`tileScale ${styles.item}`}
      variants={animation}
    >
      <div className={styles.inner}>
        {skill}
      </div>
    </motion.li>
  )
}

export default SkillItem