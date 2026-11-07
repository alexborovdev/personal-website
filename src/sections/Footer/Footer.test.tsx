// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import contacts from '@/shared/data/contacts'
import Footer from './Footer'

const mocks = vi.hoisted(() => ({
  socialsList: vi.fn(),
  copyright: vi.fn(),
  useAnimateOnScroll: vi.fn(() => ({ current: null }))
}))

vi.mock('@/shared/hooks/useAnimateOnScroll', () => ({
  default: mocks.useAnimateOnScroll
}))

vi.mock('@/components/SocialsList', () => ({
  default: (props: { socials: typeof contacts.socials }) => {
    mocks.socialsList(props)
    return <div data-testid="socials-list" />
  }
}))

vi.mock('@/shared/ui/Copyright', () => ({
  default: (props: { text: string }) => {
    mocks.copyright(props)
    return <small data-testid="copyright" />
  }
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('Footer', () => {
  it('renders semantic footer with accessible headings', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')

    expect(container.querySelectorAll('footer')).toHaveLength(1)
    expect(footer?.id).toBe('footer')

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Contact Me'
      })
    ).toBeDefined()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /something great.*together/i
      })
    ).toBeDefined()

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'My Socials'
      })
    ).toBeDefined()
  })

  it('passes correct data to child components', () => {
    render(<Footer />)

    expect(mocks.socialsList).toHaveBeenCalledWith({
      socials: contacts.socials
    })

    expect(mocks.copyright).toHaveBeenCalledWith({
      text: 'Powered and Designed by Alex Borov, 2026'
    })

    expect(mocks.useAnimateOnScroll).toHaveBeenCalledWith({
      step: 125
    })
  })
})