import ContactsForm from '@/components/ContactsForm'
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
        <ContactsForm />
      </div>
    </section>
  )
}

export default Contacts