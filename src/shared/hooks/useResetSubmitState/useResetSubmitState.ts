import { useEffect, useRef } from 'react'

type Params = {
  values: unknown[]
  submitResult: 'idle' | 'success' | 'error'
  isSubmitting: boolean
  onReset: () => void
  disabled?: boolean
}

const useResetSubmitState = ({ values, submitResult, isSubmitting, onReset, disabled }: Params) => {
  const previousValues = useRef(values)

  useEffect(() => {
    const hasChanged = values.some(
      (value, index) => !Object.is(value, previousValues.current[index])
    )

    previousValues.current = values

    if (hasChanged && !disabled && !isSubmitting && submitResult !== 'idle') {
      onReset()
    }
  }, [values, submitResult, isSubmitting, disabled, onReset])
}

export default useResetSubmitState
