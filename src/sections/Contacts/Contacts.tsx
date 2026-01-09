import Button from '@/shared/ui/Button'
import styles from './Contacts.module.scss'

const Contacts = () => {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className={styles.contacts}
    >
      <div className={`container ${styles.content}`}>
        <h2
          id="contacts-title"
          className={styles.mainTitle}
        >
          <span className="accented">Contact</span> Me
        </h2>
        <form
          className={`tile ${styles.form}`}
          noValidate
        >
          <div className={styles.info}>
            <div className={styles.infoField}>
              <label htmlFor="name" className={styles.infoLabel}>
                Your Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                type="text"
                className={styles.infoInput}
                placeholder="John Smith"
                required
              />
            </div>
            <div className={styles.infoField}>
              <label htmlFor="email" className={styles.infoLabel}>
                Your Email
              </label>
              <input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                className={styles.infoInput}
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.messageField}>
              <label htmlFor="message" className={styles.messageLabel}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.messageTextarea}
                placeholder="Your message"
                rows={5}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className={`tileHover ${styles.button}`}
            title="Sand me an email"
          >
            Send message
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Contacts