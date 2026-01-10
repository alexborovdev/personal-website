import useCountdown from '@/shared/hooks/useCountdown'
import Modal from '@/shared/ui/Modal/Modal'
import Button from '@/shared/ui/Button'
import styles from './SuccessModal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SuccessModal = (props: Props) => {
  const { isOpen, onClose } = props

  const timeLeft = useCountdown(5, isOpen, onClose)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className={styles.title}>Message sent</h3>
      <Button
        onClick={onClose}
        className={`tileHover ${styles.button}`}
      >
        Cancel {timeLeft}
      </Button>
    </Modal>
  )
}

export default SuccessModal