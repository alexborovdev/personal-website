// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('switches from dark to light theme on click', async () => {
    const user = userEvent.setup()

    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Switch to light theme'
    })

    await user.click(button)

    expect(
      screen.getByRole('button', {
        name: 'Switch to dark theme'
      })
    ).toBeTruthy()

    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('switches from light to dark theme on click', async () => {
    const user = userEvent.setup()

    localStorage.setItem('theme', 'light')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Switch to dark theme'
    })

    expect(button.getAttribute('aria-pressed')).toBe('false')

    await user.click(button)

    expect(
      screen.getByRole('button', {
        name: 'Switch to light theme'
      })
    ).toBeTruthy()

    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
