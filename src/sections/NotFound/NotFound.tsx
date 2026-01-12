import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <section
      className={styles.notFound}
      aria-labelledby="notfound-title"
    >
      <div className={styles.status}>
        <div className={styles.code}>404</div>
        <h2
          className={`accented ${styles.title}`}
          id="notfound-title"
        >
          Page not found
        </h2>
      </div>
      <p className={styles.text}>
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        className={`tileHover ${styles.button}`}
        to="/"
      > Back to homepage </Link>
    </section>
  )
}

export default NotFound