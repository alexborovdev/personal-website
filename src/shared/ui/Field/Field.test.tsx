// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Field from './Field'
import styles from './Field.module.scss'

afterEach(() => {
  cleanup()
})

describe('Field', () => {
  it('renders an input associated with its label', () => {
    render(
      <Field
        id="email"
        label="Email"
        placeholder="Enter your email"
        autoComplete="email"
        inputProps={{ type: 'email', name: 'email' }}
      />
    )

    const input = screen.getByRole('textbox', { name: 'Email' })

    expect(input.tagName).toBe('INPUT')
    expect(input.getAttribute('id')).toBe('email')
    expect(input.getAttribute('type')).toBe('email')
    expect(input.getAttribute('name')).toBe('email')
    expect(input.getAttribute('placeholder')).toBe('Enter your email')
    expect(input.getAttribute('autocomplete')).toBe('email')
  })

  it('renders a textarea when as="textarea"', () => {
    render(
      <Field
        as="textarea"
        id="message"
        label="Message"
        placeholder="Enter your message"
        inputProps={{
          name: 'message',
          rows: 5
        }}
      />
    )

    const textarea = screen.getByRole('textbox', {
      name: 'Message'
    })

    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea.getAttribute('id')).toBe('message')
    expect(textarea.getAttribute('name')).toBe('message')
    expect(textarea.getAttribute('rows')).toBe('5')
    expect(textarea.getAttribute('placeholder')).toBe('Enter your message')
  })

  it('displays a validation error with accessible attributes', () => {
    render(
      <Field
        id="email"
        label="Email"
        inputProps={{ type: 'email' }}
        showError={true}
        error="Invalid email address"
      />
    )

    const input = screen.getByRole('textbox', {
      name: 'Email'
    })

    const error = screen.getByText('Invalid email address')

    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toBe('email-error')

    expect(error.getAttribute('id')).toBe('email-error')
    expect(error.getAttribute('aria-live')).toBe('polite')
    expect(error.getAttribute('title')).toBe('Invalid email address')
  })

  it('does not display validation errors when showError is false', () => {
    render(
      <Field
        id="email"
        label="Email"
        inputProps={{ type: 'email' }}
        showError={false}
        error="Invalid email address"
      />
    )

    const input = screen.getByRole('textbox', {
      name: 'Email'
    })

    expect(input.getAttribute('aria-invalid')).toBe('false')
    expect(input.hasAttribute('aria-describedby')).toBe(false)

    expect(screen.queryByText('Invalid email address')).toBeNull()
  })

  it('applies shake class only when shake is true', () => {
    const { rerender, container } = render(
      <Field
        id="email"
        label="Email"
        inputProps={{ type: 'email' }}
        shake={true}
      />
    )

    const field = container.firstElementChild

    expect(field?.classList.contains(styles.shake)).toBe(true)

    rerender(
      <Field
        id="email"
        label="Email"
        inputProps={{ type: 'email' }}
        shake={false}
      />
    )

    expect(field?.classList.contains(styles.shake)).toBe(false)
  })
})
