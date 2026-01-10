import GmailIcon from '@/assets/icons/socials/gmail.svg?react'
import styles from './SuccessMessage.module.scss'

const SuccessMessage = () => {
  return (
    <div className={styles.success} role="status" aria-live="polite">
      <div className={styles.icon}>
        <GmailIcon />
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>Your message has been sent</h3>
        <p className="accented">I’ll get back to you soon</p>
      </div>
    </div>
  )
}

export default SuccessMessage