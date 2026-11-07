import { describe, expect, it } from 'vitest'
import { contactsForm } from './contactsForm'

const validForm = {
  name: 'Alex',
  email: 'alex@example.com',
  message: 'Hello, this is a test message!'
}

const validate = (data: Record<string, unknown>) =>
  contactsForm.safeParse({ ...validForm, ...data })

describe('contactsForm', () => {
  it('accepts valid form data', () => {
    const result = contactsForm.safeParse(validForm)

    expect(result.success).toBe(true)
  })

  describe('name', () => {
    it.each([
      ['A', false],
      ['Al', true],
      ['A'.repeat(20), true],
      ['A'.repeat(21), false]
    ])('validates name boundary %j as %s', (name, expected) => {
      expect(validate({ name }).success).toBe(expected)
    })
  })

  describe('email', () => {
    it.each([
      ['alex+work@example.com', true],
      ['invalid-email', false],
      ['alex@example', false]
    ])('validates email %j as %s', (email, expected) => {
      expect(validate({ email }).success).toBe(expected)
    })
  })

  describe('message', () => {
    it.each([
      ['A'.repeat(9), false],
      ['A'.repeat(10), true],
      ['A'.repeat(1000), true],
      ['A'.repeat(1001), false]
    ])('validates message boundary %j as %s', (message, expected) => {
      expect(validate({ message }).success).toBe(expected)
    })
  })

  it('trims whitespace from all fields', () => {
    const result = contactsForm.safeParse({
      name: '  Alex  ',
      email: '  alex@example.com  ',
      message: '  Hello, this is a test message!  '
    })

    expect(result.success).toBe(true)

    if (!result.success) return

    expect(result.data).toEqual(validForm)
  })

  it('rejects missing required fields', () => {
    const result = contactsForm.safeParse({})

    expect(result.success).toBe(false)

    if (result.success) return

    expect(result.error.issues.map(issue => issue.path)).toEqual(
      expect.arrayContaining([['name'], ['email'], ['message']])
    )
  })

  it('returns errors for all invalid fields', () => {
    const result = contactsForm.safeParse({
      name: 'A',
      email: 'invalid-email',
      message: 'Short'
    })

    expect(result.success).toBe(false)

    if (result.success) return

    expect(result.error.issues).toHaveLength(3)
  })

  it.each([
    [{ name: 'A' }, 'name', 'Name must be at least 2 characters'],
    [{ name: 'A'.repeat(21) }, 'name', 'Name is too long'],
    [{ email: 'invalid-email' }, 'email', 'Enter a valid email address'],
    [{ message: 'Short' }, 'message', 'Message must be at least 10 characters'],
    [{ message: 'A'.repeat(1001) }, 'message', 'Message is too long']
  ])('returns correct error for %s', (data, field, message) => {
    const result = validate(data)

    expect(result.success).toBe(false)

    if (result.success) return

    expect(result.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: [field],
          message
        })
      ])
    )
  })
})
