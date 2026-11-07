// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor, fireEvent, render, screen } from '@testing-library/react'
import emailjs from '@emailjs/browser'
import useContactsForm from './useContactsForm'

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}))

const TestForm = () => {
  const { register, handleSubmit, onFormSubmit, isSubmitting, submitResult } = useContactsForm()

  return (
    <form
      onSubmit={event => {
        void handleSubmit(onFormSubmit)(event)
      }}
    >
      <input
        aria-label="Name"
        {...register('name')}
      />
      <input
        aria-label="Email"
        {...register('email')}
      />
      <textarea
        aria-label="Message"
        {...register('message')}
      />

      <button type="submit">Send</button>

      <span data-testid="submitting">{String(isSubmitting)}</span>

      <span data-testid="result">{submitResult}</span>
    </form>
  )
}

describe('useContactsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with idle submission state', () => {
    const { result } = renderHook(() => useContactsForm())

    expect(result.current.submitResult).toBe('idle')
    expect(result.current.submitError).toBeNull()
    expect(result.current.isSubmitting).toBe(false)

    expect(result.current.errors).toEqual({})
    expect(result.current.shakeFields).toEqual({})
  })

  it('submits the form successfully', async () => {
    const onSubmitSuccess = vi.fn()

    vi.mocked(emailjs.send).mockResolvedValueOnce({
      status: 200,
      text: 'OK'
    })

    const { result } = renderHook(() => useContactsForm({ onSubmitSuccess }))

    const data = {
      name: 'Alex',
      email: 'alex@example.com',
      message: 'Hello from the contact form!'
    }

    await act(async () => {
      await result.current.onFormSubmit(data)
    })

    expect(emailjs.send).toHaveBeenCalledOnce()
    expect(emailjs.send).toHaveBeenCalledWith(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      data,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    )

    await waitFor(() => {
      expect(result.current.submitResult).toBe('success')
    })

    expect(result.current.submitError).toBeNull()
    expect(onSubmitSuccess).toHaveBeenCalledOnce()
  })

  it('handles EmailJS submission failure', async () => {
    const onSubmitSuccess = vi.fn()
    const error = new Error('Network error')
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(emailjs.send).mockRejectedValueOnce(error)

    try {
      const { result } = renderHook(() => useContactsForm({ onSubmitSuccess }))

      await act(async () => {
        await result.current.onFormSubmit({
          name: 'Alex',
          email: 'alex@example.com',
          message: 'Hello from the contact form!'
        })
      })

      expect(result.current.submitResult).toBe('error')
      expect(result.current.submitError).toBe('Something went wrong. Please try again.')

      expect(onSubmitSuccess).not.toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalledWith('EmailJS error:', error)
    } finally {
      consoleErrorSpy.mockRestore()
    }
  })

  it('does not submit invalid form data', async () => {
    const { result } = renderHook(() => useContactsForm())

    await act(async () => {
      await result.current.handleSubmit(result.current.onFormSubmit, result.current.onFormError)()
    })

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(result.current.submitResult).toBe('idle')

    expect(result.current.errors.name).toBeDefined()
    expect(result.current.errors.email).toBeDefined()
    expect(result.current.errors.message).toBeDefined()
  })

  it('tracks submitting state during an async request', async () => {
    let resolveRequest!: (value: { status: number; text: string }) => void

    vi.mocked(emailjs.send).mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveRequest = resolve
        })
    )

    render(<TestForm />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Alex' }
    })

    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'alex@example.com' }
    })

    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hello from the contact form!' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledOnce()
      expect(screen.getByTestId('submitting').textContent).toBe('true')
    })

    act(() => {
      resolveRequest({ status: 200, text: 'OK' })
    })

    await waitFor(() => {
      expect(screen.getByTestId('submitting').textContent).toBe('false')
      expect(screen.getByTestId('result').textContent).toBe('success')
    })
  })
})
