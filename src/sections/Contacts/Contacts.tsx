import useAnimateOnScroll from '@/shared/hooks/useAnimateOnScroll'
import ContactsForm from '@/components/ContactsForm'
import styles from './Contacts.module.scss'

const Contacts = () => {
  const animateRef = useAnimateOnScroll({
    step: 195
  })

  return (
    <section
      ref={animateRef}
      id="contacts"
      aria-labelledby="contacts-title"
      className={styles.contacts}
      data-animate
    >
      <div className={`container ${styles.content}`}>
        <h2
          id="contacts-title"
          className={styles.mainTitle}
          data-animate
        >
          <span className="accented">Contact</span> Me
        </h2>
        <ContactsForm />
      </div>
    </section>
  )
}

export default Contacts