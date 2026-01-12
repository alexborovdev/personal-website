import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/shared/ui/Button'
import styles from './NotFound.module.scss'

const NotFound = () => {
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)

  const handleBack = () => {
    setIsLeaving(true)

    setTimeout(() => {
      navigate('/')
    }, 400)
  }

  return (
    <section
      aria-labelledby="notfound-title"
      className={`${styles.notFound} ${isLeaving ? styles.leaving : ''}`}
    >
      <div className={styles.status}>
        <h2 className={styles.title}>404</h2>
        <h3 id="notfound-title" className={`accented ${styles.subtitle}`}>
          Page not found
        </h3>
      </div>

      <p className={styles.text}>
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <Button
        className={`tileHover ${styles.button}`}
        onClick={handleBack}
      >
        Back to homepage
      </Button>
    </section>
  )
}

export default NotFound