import contacts from '@/shared/data/contacts'
import SocialsList from '@/components/SocialsList'
import Copyright from '@/shared/ui/Copyright'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer
      id="footer"
      className={styles.footer}
    >
      <div className={`container ${styles.content}`}>
        <h2 className="visually-hidden">Contact Me</h2>
        <div
          className={`tile ${styles.wrapper}`}
        >
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
              <SocialsList socials={contacts.socials} />
            </div>
            <Copyright
              text={'Powered and Designed by Alex Borov, 2026'}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer