import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactForm, type ContactForm } from '@/shared/validation/contactForm'
import Button from '@/shared/ui/Button'
import styles from './Contacts.module.scss'

const Contacts = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: {
      errors,
      isSubmitting,
      touchedFields
    }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactForm),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  const hasValue = (value?: string) =>
    typeof value === 'string' && value.length > 0

  const showNameError =
    touchedFields.name &&
    hasValue(watch('name')) &&
    !!errors.name

  const showEmailError =
    touchedFields.email &&
    hasValue(watch('email')) &&
    !!errors.email

  const showMessageError =
    touchedFields.message &&
    hasValue(watch('message')) &&
    !!errors.message

  const onFormSubmit = async (data: ContactForm) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
  }

  const onFormError = () => {
    const firstErrorField = Object.keys(errors)[0] as keyof ContactForm
    if (firstErrorField) {
      setFocus(firstErrorField)
    }
  }

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
          onSubmit={handleSubmit(onFormSubmit, onFormError)}
        >
          <div className={styles.info}>
            <div className={styles.infoField}>
              <label htmlFor="name" className={styles.infoLabel}>
                Your Name
              </label>
              <input
                {...register('name')}
                id="name"
                name="name"
                autoComplete="name"
                type="text"
                className={styles.infoInput}
                placeholder="John Smith"
                aria-invalid={!!showNameError}
                aria-describedby={showNameError ? 'name-error' : undefined}
              />
              {showNameError && (
                <span
                  id="name-error"
                  role="alert"
                  className={styles.error}
                  title={errors.name?.message}
                >
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className={styles.infoField}>
              <label htmlFor="email" className={styles.infoLabel}>
                Your Email
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                className={styles.infoInput}
                placeholder="example@gmail.com"
                aria-invalid={!!showEmailError}
                aria-describedby={showEmailError ? 'email-error' : undefined}
              />
              {showEmailError && (
                <span
                  id="email-error"
                  role="alert"
                  className={styles.error}
                  title={errors.email?.message}
                >
                  {errors.email?.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.messageField}>
              <label htmlFor="message" className={styles.messageLabel}>
                Message
              </label>
              <textarea
                {...register('message')}
                id="message"
                name="message"
                className={styles.messageTextarea}
                placeholder="Your message"
                aria-invalid={!!showMessageError}
                aria-describedby={showMessageError ? 'message-error' : undefined}
              />
              {showMessageError && (
                <span
                  id="message-error"
                  role="alert"
                  className={styles.error}
                  title={errors.message?.message}
                >
                  {errors.message?.message}
                </span>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className={`tileHover ${styles.button}`}
            title="Sand me an email"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Contacts