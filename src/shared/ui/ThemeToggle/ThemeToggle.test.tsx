// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/shared/providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('ThemeToggle', () => {
  it('renders the correct state for dark theme', () => {
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Switch to light theme'
    })

    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.getAttribute('title')).toBe('Switch to light theme')
    expect(button.getAttribute('type')).toBe('button')
  })
})