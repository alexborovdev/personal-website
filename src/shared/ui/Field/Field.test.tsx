// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Field from './Field'

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
})