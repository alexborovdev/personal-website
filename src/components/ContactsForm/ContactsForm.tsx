import useContactsForm from '@/shared/hooks/useContactsForm'
import Field from '@/components/Field'
import Button from '@/shared/ui/Button'
import styles from './ContactsForm.module.scss'

type Props = {
  onSubmitSuccess?: () => void
}

const ContactsForm = ({ onSubmitSuccess }: Props) => {
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
    shakeFields
  } = useContactsForm({ onSubmitSuccess })

  return (
    <form
      className={`tile ${styles.form}`}
      noValidate
      onSubmit={handleSubmit(onFormSubmit, onFormError)}
    >
      <div className={styles.info}>
        <Field
          name="name"
          label="Your Name"
          placeholder="John Smith"
          autoComplete="name"
          register={register}
          showError={showNameError}
          error={errors.name?.message}
          shake={shakeFields.name}
        />
        <Field
          name="email"
          label="Your Email"
          placeholder="example@gmail.com"
          autoComplete="email"
          register={register}
          showError={showEmailError}
          error={errors.email?.message}
          shake={shakeFields.email}
        />
      </div>
      <div className={styles.message}>
        <Field
          as="textarea"
          name="message"
          label="Message"
          placeholder="Your message"
          register={register}
          showError={showMessageError}
          error={errors.message?.message}
          shake={shakeFields.message}
        />
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
  )
}

export default ContactsForm