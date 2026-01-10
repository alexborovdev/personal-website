import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactsForm, type ContactsForm } from '@/shared/validation/contactsForm'

type Params = {
  onSubmitSuccess?: () => void
}

type SubmitResult = 'idle' | 'success' | 'error'

const useContactsForm = (params?: Params) => {
  const { onSubmitSuccess } = params || {}

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: {
      errors,
      isSubmitting,
      touchedFields
    }
  } = useForm<ContactsForm>({
    resolver: zodResolver(contactsForm),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  const [submitResult, setSubmitResult] = useState<SubmitResult>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [shakeFields, setShakeFields] = useState<Partial<Record<keyof ContactsForm, boolean>>>({})

  const hasValue = (value?: string) =>
    typeof value === 'string' && value.length > 0

  const showNameError = Boolean(
    touchedFields.name &&
    hasValue(watch('name')) &&
    errors.name
  )

  const showEmailError = Boolean(
    touchedFields.email &&
    hasValue(watch('email')) &&
    errors.email
  )

  const showMessageError = Boolean(
    touchedFields.message &&
    hasValue(watch('message')) &&
    errors.message
  )

  const [name, email, message] = watch(['name', 'email', 'message'])

  useEffect(() => {
    if (submitResult !== 'idle' && !isSubmitting) {
      setSubmitResult('idle')
      setSubmitError(null)
    }
  }, [name, email, message, isSubmitting, submitResult])

  const onFormSubmit = async (data: ContactsForm) => {
    setSubmitResult('idle')
    setSubmitError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log(data)

      setSubmitResult('success')
      onSubmitSuccess?.()
    } catch {
      setSubmitError('Something went wrong. Please try again.')
      setSubmitResult('error')
    }
  }

  const onFormError = () => {
    const fields = Object.keys(errors) as (keyof ContactsForm)[]

    if (fields.length === 0) {
      return
    }

    setFocus(fields[0])

    const shakeMap = fields.reduce((acc, field) => {
      acc[field] = true
      return acc
    }, {} as Partial<Record<keyof ContactsForm, boolean>>)

    setShakeFields(shakeMap)

    setTimeout(() => {
      setShakeFields({})
    }, 400)
  }

  const resetSubmitState = () => {
    setSubmitResult('idle')
    setSubmitError(null)
  }

  return {
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
    submitError,
    resetSubmitState
  }

}

export default useContactsForm