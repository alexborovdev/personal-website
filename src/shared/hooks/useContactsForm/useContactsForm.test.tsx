// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import emailjs from '@emailjs/browser'
import useContactsForm from './useContactsForm'

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn()
  }
}))

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

    const { result } = renderHook(() =>
      useContactsForm({ onSubmitSuccess })
    )

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
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    vi.mocked(emailjs.send).mockRejectedValueOnce(error)

    try {
      const { result } = renderHook(() =>
        useContactsForm({ onSubmitSuccess })
      )

      await act(async () => {
        await result.current.onFormSubmit({
          name: 'Alex',
          email: 'alex@example.com',
          message: 'Hello from the contact form!'
        })
      })

      expect(result.current.submitResult).toBe('error')
      expect(result.current.submitError).toBe(
        'Something went wrong. Please try again.'
      )

      expect(onSubmitSuccess).not.toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalledWith('EmailJS error:', error)
    } finally {
      consoleErrorSpy.mockRestore()
    }
  })
})