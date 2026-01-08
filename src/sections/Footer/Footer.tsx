import { motion } from 'framer-motion'
import { container, items } from '@/shared/animations/footer'
import contacts from '@/shared/data/contacts'
import SocialsList from '@/components/SocialsList'
import Copyright from '@/components/Copyright'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <motion.footer
      id="footer"
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20%' }}
      variants={container}
    >
      <div className={`container ${styles.content}`}>
        <h2 className="visually-hidden">Contact Me</h2>
        <motion.div
          className={`tile ${styles.wrapper}`}
          variants={items}
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
            <Copyright />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer