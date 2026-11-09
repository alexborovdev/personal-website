// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import useContactsForm from '@/shared/hooks/useContactsForm'
import type { ContactsForm as ContactsFormValues } from '@/shared/validation/contactsForm'
import ContactsForm from './ContactsForm'

vi.mock('@/shared/hooks/useContactsForm')

type FormState = ReturnType<typeof useContactsForm>

const createFormState = (form: ReturnType<typeof useForm<ContactsFormValues>>): FormState => ({
  register: form.register,
  handleSubmit: form.handleSubmit,
  onFormSubmit: vi.fn(async () => {}),
  onFormError: vi.fn(),
  errors: {},
  isSubmitting: false,
  showNameError: false,
  showEmailError: false,
  showMessageError: false,
  shakeFields: {
    name: false,
    email: false,
    message: false
  },
  submitResult: 'idle',
  submitError: null
})

type TestContactsFormProps = {
  overrides?: Partial<FormState>
}

const TestContactsForm = ({ overrides = {} }: TestContactsFormProps) => {
  const form = useForm<ContactsFormValues>()

  vi.mocked(useContactsForm).mockReturnValue({
    ...createFormState(form),
    ...overrides
  })

  return <ContactsForm />
}

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('ContactsForm', () => {
  it('renders all contact fields', () => {
    render(<TestContactsForm />)

    expect(screen.getByRole('textbox', { name: 'Your Name' })).toBeDefined()

    expect(screen.getByRole('textbox', { name: 'Your Email' })).toBeDefined()

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDefined()

    expect(screen.getByRole('button', { name: /send/i })).toBeDefined()
  })

  it('displays validation errors for invalid fields', () => {
    render(
      <TestContactsForm
        overrides={{
          errors: {
            name: {
              type: 'validation',
              message: 'Name is too short'
            },
            email: {
              type: 'validation',
              message: 'Invalid email address'
            }
          },
          showNameError: true,
          showEmailError: true
        }}
      />
    )

    const nameInput = screen.getByRole('textbox', {
      name: 'Your Name'
    })

    const emailInput = screen.getByRole('textbox', {
      name: 'Your Email'
    })

    expect(nameInput.getAttribute('aria-invalid')).toBe('true')
    expect(emailInput.getAttribute('aria-invalid')).toBe('true')

    expect(screen.getByText('Name is too short')).toBeDefined()

    expect(screen.getByText('Invalid email address')).toBeDefined()
  })

  it('shows success message after successful submission', () => {
    const { container } = render(<TestContactsForm overrides={{ submitResult: 'success' }} />)

    const form = container.querySelector('form')
    const status = screen.getByRole('status')

    expect(status.textContent).toContain('Your message has been sent')

    expect(form?.parentElement?.className).toContain('hidden')
    expect(status.parentElement?.className).toContain('visible')
  })

  it('shows error message after failed submission', () => {
    const { container } = render(<TestContactsForm overrides={{ submitResult: 'error' }} />)

    const form = container.querySelector('form')
    const alert = screen.getByRole('alert')

    expect(alert.textContent).toContain('Your message has not been sent')
    expect(alert.textContent).toContain('You can still reach me through my socials')

    expect(form?.parentElement?.className).toContain('hidden')
    expect(alert.parentElement?.className).toContain('visible')
  })

  it('disables submit button while submitting', () => {
    render(<TestContactsForm overrides={{ isSubmitting: true }} />)

    const submitButton = screen.getByRole<HTMLButtonElement>('button', {
      name: /send/i
    })

    expect(submitButton.disabled).toBe(true)
  })
})
