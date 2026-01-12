import styles from './Copyright.module.scss'

type Props = {
  text: string
}

const Copyright = (props: Props) => {
  const {
    text
  } = props

  return <small className={styles.copyright}>© {text}</small>
}

export default Copyright