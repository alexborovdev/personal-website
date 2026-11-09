// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

afterEach(() => cleanup())

describe('ErrorMessage', () => {
  it('renders an accessible error message', () => {
    render(<ErrorMessage />)

    const alert = screen.getByRole('alert')

    expect(alert.textContent).toContain('Your message has not been sent')
    expect(alert.textContent).toContain('You can still reach me through my socials')
  })
})
