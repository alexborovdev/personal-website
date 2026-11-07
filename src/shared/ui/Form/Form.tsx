import type { FormEventHandler, ReactNode } from 'react'
import Button from '@/shared/ui/Button'
import styles from './Form.module.scss'

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting?: boolean
  children: ReactNode
}

const Form = (props: Props) => {
  const {
    onSubmit,
    isSubmitting,
    children
  } = props

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`tileHover ${styles.button}`}
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}

export default Form