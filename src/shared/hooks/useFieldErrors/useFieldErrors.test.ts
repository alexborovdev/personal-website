import { describe, expect, it } from 'vitest'
import useFieldErrors from './useFieldErrors'

describe('useFieldErrors', () => {
  it('shows an error for a touched field with a value and validation error', () => {
    const result = useFieldErrors({
      touched: { email: true },
      values: { email: 'invalid-email' },
      errors: { email: { message: 'Invalid email' } }
    })

    expect(result).toEqual({ email: true })
  })

  it('does not show an error for an untouched field', () => {
    const result = useFieldErrors({
      touched: { email: false },
      values: { email: 'invalid-email' },
      errors: { email: { message: 'Invalid email' } }
    })

    expect(result).toEqual({ email: false })
  })

  it('does not show an error for an empty field', () => {
    const result = useFieldErrors({
      touched: { email: true },
      values: { email: '' },
      errors: { email: { message: 'Required' } }
    })

    expect(result).toEqual({ email: false })
  })

  it('does not show an error when validation passes', () => {
    const result = useFieldErrors({
      touched: { email: true },
      values: { email: 'alex@example.com' },
      errors: {}
    })

    expect(result).toEqual({ email: false })
  })

  it('handles multiple fields independently', () => {
    const result = useFieldErrors({
      touched: {
        name: true,
        email: true,
        message: false
      },
      values: {
        name: 'A',
        email: 'alex@example.com',
        message: 'Hello!'
      },
      errors: {
        name: { message: 'Name is too short' },
        message: { message: 'Message is too short' }
      }
    })

    expect(result).toEqual({
      name: true,
      email: false,
      message: false
    })
  })
})
