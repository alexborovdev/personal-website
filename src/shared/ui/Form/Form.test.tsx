// @vitest-environment jsdom

import type { FormEvent } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

afterEach(() => cleanup())

describe('Form', () => {
  it('renders children and a submit button', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <input aria-label="Email" />
      </Form>
    )

    const input = screen.getByRole('textbox', {
      name: 'Email'
    })

    const button = screen.getByRole('button', {
      name: 'Send message'
    })

    expect(input.tagName).toBe('INPUT')
    expect(button.getAttribute('type')).toBe('submit')
  })

  it('calls onSubmit when the submit button is clicked', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    })

    render(
      <Form onSubmit={onSubmit}>
        <input aria-label="Email" />
      </Form>
    )

    await user.click(
      screen.getByRole('button', { name: 'Send message' })
    )

    expect(onSubmit).toHaveBeenCalledOnce()
  })

  it('disables the submit button while submitting', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} isSubmitting={true}>
        <input aria-label="Email" />
      </Form>
    )

    const button = screen.getByRole('button', {
      name: 'Sending…'
    })

    expect(button.hasAttribute('disabled')).toBe(true)

    await user.click(button)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Send message' })
    ).toBeNull()
  })

  it('enables the submit button when not submitting', () => {
    const { rerender } = render(
      <Form onSubmit={vi.fn()} isSubmitting={true}>
        <input aria-label="Email" />
      </Form>
    )

    rerender(
      <Form onSubmit={vi.fn()}>
        <input aria-label="Email" />
      </Form>
    )

    const button = screen.getByRole('button', {
      name: 'Send message'
    })

    expect(button.hasAttribute('disabled')).toBe(false)

    expect(
      screen.queryByRole('button', { name: 'Sending…' })
    ).toBeNull()
  })
})