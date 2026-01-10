import type { UseFormRegister } from 'react-hook-form'
import type { ContactsForm } from '@/shared/validation/contactsForm'
import styles from './Field.module.scss'

type Props = {
  as?: 'input' | 'textarea'
  name: keyof ContactsForm
  label: string
  placeholder?: string
  autoComplete?: string
  register: UseFormRegister<ContactsForm>
  showError: boolean
  error?: string
  shake?: boolean
}

const Field = (props: Props) => {
  const {
    as = 'input',
    name,
    label,
    placeholder,
    autoComplete,
    register,
    showError,
    error,
    shake
  } = props

  const Tag = as

  return (
    <div
      className={`${styles.field} ${shake ? styles.shake : ''}`}
    >
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Tag
        {...register(name)}
        id={name}
        className={as === 'textarea' ? styles.textarea : styles.input}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={showError}
        aria-describedby={showError ? `${name}-error` : undefined}
      />
      {showError && (
        <span
          id={`${name}-error`}
          role="alert"
          className={styles.error}
          title={error}
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default Field