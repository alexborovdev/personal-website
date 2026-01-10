import styles from './SkillItem.module.scss'

type SkillItemProps = {
  skill: string
}

const SkillItem = (props: SkillItemProps) => {
  const {
    skill,
  } = props

  return (
    <li
      className={`tileScale ${styles.item}`}
    >
      <div className={styles.inner}>
        {skill}
      </div>
    </li>
  )
}

export default SkillItem