import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './Field.module.scss'

type BaseProps = {
  id: string
  label: string
  placeholder?: string
  autoComplete?: string
  showError?: boolean
  error?: string
  shake?: boolean
}

type Props =
  | (BaseProps & {
  as?: 'input'
  inputProps: InputHTMLAttributes<HTMLInputElement>
})
  | (BaseProps & {
  as: 'textarea'
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>
})

const Field = (props: Props) => {
  const {
    id,
    label,
    placeholder,
    autoComplete,
    showError,
    error,
    shake
  } = props

  return (
    <div className={`${styles.field} ${shake ? styles.shake : ''}`}>
      <label
        htmlFor={id}
        className={styles.label}>
        {label}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={styles.textarea}
          {...props.inputProps}
        />
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={styles.input}
          {...props.inputProps}
        />
      )}
      {showError && (
        <span
          id={`${id}-error`}
          aria-live="polite"
          className={styles.error}
          title={error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Field