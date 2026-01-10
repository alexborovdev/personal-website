import { useEffect } from 'react'

type Params = {
  values: unknown[]
  submitResult: 'idle' | 'success' | 'error'
  isSubmitting: boolean
  onReset: () => void
}

const useResetSubmitState = ({
  values,
  submitResult,
  isSubmitting,
  onReset
}: Params) => {
  useEffect(() => {
    if (submitResult !== 'idle' && !isSubmitting) {
      onReset()
    }
  }, [values, submitResult, isSubmitting, onReset])
}

export default useResetSubmitState