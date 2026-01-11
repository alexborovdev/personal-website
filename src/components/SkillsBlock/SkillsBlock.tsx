import useAnimateOnScroll from '@/shared/hooks/useAnimateOnScroll'
import SkillsList from '@/components/SkillsList'
import styles from './SkillsBlock.module.scss'

type Props = {
  skills: string[]
  title: string
}

const SkillsBlock = (props: Props) => {
  const { skills, title, } = props

  const animateRef = useAnimateOnScroll({
    step: 120
  })

  return (
    <div
      ref={animateRef}
      data-animate
    >
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