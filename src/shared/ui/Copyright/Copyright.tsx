import styles from './Copyright.module.scss'

type Props = {
  text: string
}

const Copyright = (props: Props) => {
  const {
    text
  } = props

  return <p className={styles.copyright}>© {text}</p>
}

export default Copyright