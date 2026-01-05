import contacts from '@/shared/data/contacts'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <h2 className="visually-hidden">Contact Me</h2>
        <div className={`tile ${styles.wrapper}`}>
          <div className={styles.left}>
            <h3 className={styles.leftTitle}>
              <span>Let’s build <span className="accented">something great</span> together!</span>
            </h3>
          </div>
          <div className={styles.right}>
            <h3 className={styles.rightTitle}>Contact me</h3>
            <div className={styles.soc1als}>
              <h4 className="visually-hidden" id="soc1als-title">
                Social networks
              </h4>
              <ul
                className={styles.soc1alsList}
                aria-labelledby="soc1als-title"
              >
                {contacts.socials.map(({ id, title, label, href, icon: Icon }) => (
                  <li key={id} className={styles.soc1alsItem}>
                    <a
                      href={href}
                      title={title}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.soc1alsLink}
                    >
                      <Icon
                        className={styles.soc1alsIcon}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.copyright}>© Powered and Designed by Alex Borov, 2026</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer