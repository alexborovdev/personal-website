// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Contacts from './Contacts'

const mocks = vi.hoisted(() => ({
  useAnimateOnScroll: vi.fn(() => ({ current: null })),
  contactsForm: vi.fn()
}))

vi.mock('@/shared/hooks/useAnimateOnScroll', () => ({
  default: mocks.useAnimateOnScroll
}))

vi.mock('@/components/ContactsForm', () => ({
  default: () => {
    mocks.contactsForm()
    return <div data-testid="contacts-form" />
  }
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('Contacts', () => {
  it('renders an accessible contacts section', () => {
    const { container } = render(<Contacts />)

    const section = container.querySelector('section')
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Contact Me'
    })

    expect(section?.id).toBe('contacts')
    expect(section?.getAttribute('aria-labelledby')).toBe('contacts-title')
    expect(heading.id).toBe('contacts-title')
    expect(section?.contains(heading)).toBe(true)
  })

  it('renders ContactsForm and initializes scroll animation', () => {
    render(<Contacts />)

    expect(screen.getByTestId('contacts-form')).toBeDefined()
    expect(mocks.contactsForm).toHaveBeenCalledOnce()

    expect(mocks.useAnimateOnScroll).toHaveBeenCalledWith({
      step: 125
    })
  })
})
