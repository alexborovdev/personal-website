import useContactsForm from '@/shared/hooks/useContactsForm'
import Form from '@/shared/ui/Form'
import Field from '@/shared/ui/Field'
import SuccessMessage from '@/components/SuccessMessage'
import styles from './ContactsForm.module.scss'

type Props = {
  onSubmitSuccess?: () => void
}

const ContactsForm = (props: Props) => {
  const { onSubmitSuccess } = props

  const {
    register,
    handleSubmit,
    onFormSubmit,
    onFormError,
    errors,
    isSubmitting,
    showNameError,
    showEmailError,
    showMessageError,
    shakeFields,
    submitResult,
  } = useContactsForm({ onSubmitSuccess })

  return (
    <div
      className={`tile ${styles.wrapper}`}
      data-animate
    >
      <div
        className={`${styles.formLayer} ${
          submitResult === 'success' ? styles.hidden : styles.visible
        }`}
      >
        <Form
          onSubmit={handleSubmit(onFormSubmit, onFormError)}
          isSubmitting={isSubmitting}
        >
          <div className={styles.info}>
            <Field
              id="name"
              label="Your Name"
              placeholder="John Smith"
              autoComplete="name"
              inputProps={register('name')}
              showError={showNameError}
              error={errors.name?.message}
              shake={shakeFields.name}
            />
            <Field
              id="email"
              label="Your Email"
              placeholder="example@gmail.com"
              autoComplete="email"
              inputProps={register('email')}
              showError={showEmailError}
              error={errors.email?.message}
              shake={shakeFields.email}
            />
          </div>
          <div className={styles.message}>
            <Field
              as="textarea"
              id="message"
              label="Message"
              placeholder="Your message"
              inputProps={register('message')}
              showError={showMessageError}
              error={errors.message?.message}
              shake={shakeFields.message}
            />
          </div>
        </Form>
      </div>
      <div
        className={`${styles.successLayer} ${
          submitResult === 'success' ? styles.visible : styles.hidden
        }`}
      >
        <SuccessMessage />
      </div>
    </div>
  )
}

export default ContactsForm