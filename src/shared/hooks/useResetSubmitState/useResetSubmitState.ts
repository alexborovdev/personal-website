import { useEffect } from 'react'

type Params = {
  values: unknown[]
  submitResult: 'idle' | 'success' | 'error'
  isSubmitting: boolean
  onReset: () => void
  disabled?: boolean
}

const useResetSubmitState = ({
  values,
  submitResult,
  isSubmitting,
  onReset,
  disabled
}: Params) => {
  useEffect(() => {
    if (disabled) {
      return
    }

    if (submitResult !== 'idle' && !isSubmitting) {
      onReset()
    }
  }, [values, submitResult, isSubmitting, disabled, onReset])
}

export default useResetSubmitState