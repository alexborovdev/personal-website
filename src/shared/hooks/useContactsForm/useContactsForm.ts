import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import useResetSubmitState from '@/shared/hooks/useResetSubmitState'
import useShakeOnError from '@/shared/hooks/useShakeOnError'
import useFieldErrors from '@/shared/hooks/useFieldErrors'
import { contactsForm, type ContactsForm } from '@/shared/validation/contactsForm'

type Params = {
  onSubmitSuccess?: () => void
}

type SubmitResult = 'idle' | 'success' | 'error'

const useContactsForm =
  (params?: Params) => {
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

    const { shakeFields, triggerShake } = useShakeOnError()

    const [name, email, message] = watch(['name', 'email', 'message'])

    const [submitResult, setSubmitResult] = useState<SubmitResult>('idle')
    const [submitError, setSubmitError] = useState<string | null>(null)

    const resetSubmitState = () => {
      setSubmitResult('idle')
      setSubmitError(null)
    }

    useResetSubmitState({
      values: [name, email, message],
      submitResult,
      isSubmitting,
      onReset: resetSubmitState,
      disabled: submitResult === 'success'
    })

    const showError = useFieldErrors({
      touched: touchedFields,
      errors,
      values: { name, email, message }
    })

    const onFormSubmit = async (data: ContactsForm) => {
      setSubmitResult('idle')
      setSubmitError(null)

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: data.name,
            email: data.email,
            message: data.message,
          },
          {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          }
        )

        setSubmitResult('success')
        onSubmitSuccess?.()
      } catch (error) {
        console.error('EmailJS error:', error)
        setSubmitError('Something went wrong. Please try again.')
        setSubmitResult('error')
      }
    }

    const onFormError = () => {
      const fields = Object.keys(errors)

      if (fields.length === 0) {
        return
      }

      setFocus(fields[0] as keyof ContactsForm)
      triggerShake(fields)
    }

    return {
      register,
      handleSubmit,
      onFormSubmit,
      onFormError,
      errors,
      isSubmitting,
      showNameError: showError.name,
      showEmailError: showError.email,
      showMessageError: showError.message,
      shakeFields,
      submitResult,
      submitError,
    }

  }

export default useContactsForm