import styles from './Field.module.scss'

type Props = {
  as?: 'input' | 'textarea'
  id: string
  label: string
  placeholder?: string
  autoComplete?: string
  inputProps: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
  showError?: boolean
  error?: string
  shake?: boolean
}

const Field = (props: Props) => {
  const {
    as = 'input',
    id,
    label,
    placeholder,
    autoComplete,
    inputProps,
    showError,
    error,
    shake
  } = props

  const Tag = as

  return (
    <div className={`${styles.field} ${shake ? styles.shake : ''}`}>
      <label
        htmlFor={id}
        className={styles.label}>
        {label}
      </label>
      <Tag
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={as === 'textarea' ? styles.textarea : styles.input}
        {...inputProps}
      />
      {showError && (
        <span
          id={`${id}-error`}
          role="alert"
          className={styles.error}
          title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Field