import Button from '@/shared/ui/Button'
import styles from './Form.module.scss'

type Props = {
  onSubmit: () => void
  isSubmitting?: boolean
  children: React.ReactNode
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
      {!isSubmitting &&
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`tileHover ${styles.button}`}
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      }
    </form>
  )
}

export default Form