// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SuccessMessage from './SuccessMessage'

afterEach(() => cleanup())

describe('SuccessMessage', () => {
  it('renders an accessible success message', () => {
    render(<SuccessMessage />)

    const status = screen.getByRole('status')

    expect(status.getAttribute('aria-live')).toBe('polite')
    expect(status.textContent).toContain('Your message has been sent')
    expect(status.textContent).toContain('I’ll get back to you soon')
  })
})