import { fromLeft, fromRight } from '@/shared/animations/skills.ts'
import SkillsBlock from '@/components/SkillsBlock'

type SkillsContentProps = {
  styles: Record<string, string>
  hardSkills: string[]
  softSkills: string[]
}

const SkillsContentDesktop = (props: SkillsContentProps) => {
  const {
    styles,
    hardSkills,
    softSkills,
  } = props

  return (
    <div className={styles.wrapper}>
      <SkillsBlock
        skills={hardSkills}
        animation={fromLeft}
        title="Hard"
        wrapper="motion"
      />
      <SkillsBlock
        skills={softSkills}
        animation={fromRight}
        title="Soft"
        wrapper="motion"
      />
    </div>
  )
}

export default SkillsContentDesktop