import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import MainSettings from './MainSettings'

// @vitest-environment jsdom

vi.mock('@/shared/ui/ThemeToggle', () => ({
  default: () => <button>Theme toggle</button>
}))

vi.mock('@/shared/ui/AnimationToggle', () => ({
  default: () => <button>Animation toggle</button>
}))

afterEach(() => cleanup())

describe('MainSettings', () => {
  it('renders theme and animation toggles', () => {
    render(<MainSettings />)

    expect(
      screen.getByRole('button', { name: 'Theme toggle' })
    ).toBeDefined()

    expect(
      screen.getByRole('button', { name: 'Animation toggle' })
    ).toBeDefined()
  })
})