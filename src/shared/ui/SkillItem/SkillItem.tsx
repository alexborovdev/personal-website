import styles from './SkillItem.module.scss'

type Props = {
  skill: string
}

const SkillItem = (props: Props) => {
  const {
    skill,
  } = props

  return (
    <li data-animate>
      <div className={`tileScale ${styles.item}`}>
        <div className={styles.inner}>
          {skill}
        </div>
      </div>
    </li>
  )
}

export default SkillItem