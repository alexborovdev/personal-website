// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

afterEach(() => {
  cleanup()
})

describe('Button', () => {
  it('renders a button with children', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })

    expect(button).toBeTruthy()
    expect(button.getAttribute('type')).toBe('button')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })

    await user.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })

    expect(button.hasAttribute('disabled')).toBe(true)

    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('forwards HTML and accessibility attributes', () => {
    render(
      <Button
        type="submit"
        className="custom-button"
        ariaLabel="Save changes"
        ariaPressed={true}
        ariaCurrent={true}
        title="Save"
      >
        Save
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Save changes' })

    expect(button.getAttribute('type')).toBe('submit')
    expect(button.classList.contains('custom-button')).toBe(true)
    expect(button.getAttribute('aria-label')).toBe('Save changes')
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.getAttribute('aria-current')).toBe('true')
    expect(button.getAttribute('title')).toBe('Save')
  })
})
