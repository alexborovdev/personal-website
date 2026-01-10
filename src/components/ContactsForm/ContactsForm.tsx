import useContactsForm from '@/shared/hooks/useContactsForm'
import Form from '@/components/Form'
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
    <div className={`tile ${styles.wrapper}`}>
      <div
        className={`${styles.formLayer} ${
          submitResult === 'success' ? styles.hidden : styles.visible
        }`}
      >
        <Form
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          showNameError={showNameError}
          showEmailError={showEmailError}
          showMessageError={showMessageError}
          shakeFields={shakeFields}
          onSubmit={handleSubmit(onFormSubmit, onFormError)}
        />
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