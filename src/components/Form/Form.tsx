import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContactsForm } from '@/shared/validation/contactsForm'
import Field from '@/components/Field'
import Button from '@/shared/ui/Button'
import styles from './Form.module.scss'

type Props = {
  register: UseFormRegister<ContactsForm>
  errors: FieldErrors<ContactsForm>
  isSubmitting: boolean
  showNameError: boolean
  showEmailError: boolean
  showMessageError: boolean
  shakeFields: Partial<Record<keyof ContactsForm, boolean>>
  onSubmit: () => void
}

const Form = (props: Props) => {
  const {
    register,
    errors,
    isSubmitting,
    showNameError,
    showEmailError,
    showMessageError,
    shakeFields,
    onSubmit
  } = props

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
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
        title="Send me an email"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}

export default Form