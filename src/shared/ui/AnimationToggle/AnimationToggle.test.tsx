// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnimationsProvider } from '@/shared/providers/AnimationsProvider'
import AnimationToggle from './AnimationToggle'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('AnimationToggle', () => {
  it('renders the correct state when animations are enabled', () => {
    localStorage.setItem('animations', 'on')

    render(
      <AnimationsProvider>
        <AnimationToggle />
      </AnimationsProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Disable background animation'
    })

    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button.getAttribute('title')).toBe('Disable background animation')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('disables animations on click', async () => {
    const user = userEvent.setup()

    localStorage.setItem('animations', 'on')

    render(
      <AnimationsProvider>
        <AnimationToggle />
      </AnimationsProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Disable background animation'
    })

    await user.click(button)

    expect(
      screen.getByRole('button', {
        name: 'Enable background animation'
      })
    ).toBeTruthy()

    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(localStorage.getItem('animations')).toBe('off')
  })

  it('enables animations on click', async () => {
    const user = userEvent.setup()

    localStorage.setItem('animations', 'off')

    render(
      <AnimationsProvider>
        <AnimationToggle />
      </AnimationsProvider>
    )

    const button = screen.getByRole('button', {
      name: 'Enable background animation'
    })

    expect(button.getAttribute('aria-pressed')).toBe('false')

    await user.click(button)

    expect(
      screen.getByRole('button', {
        name: 'Disable background animation'
      })
    ).toBeTruthy()

    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(localStorage.getItem('animations')).toBe('on')
  })
})