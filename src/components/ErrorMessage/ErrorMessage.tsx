import ErrorIcon from '@/assets/icons/error.svg?react'
import styles from './ErrorMessage.module.scss'

const ErrorMessage = () => {
  return (
    <div className={styles.error} role="alert" aria-live="polite">
      <div className={styles.icon}>
        <ErrorIcon />
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>Your message has not been sent</h3>
        <p className="accented">You can still reach me through my socials</p>
      </div>
    </div>
  )
}

export default ErrorMessage
