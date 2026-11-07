// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useActiveSection from '@/shared/hooks/useActiveSection'
import MainNavigation from './MainNavigation'

vi.mock('@/shared/hooks/useActiveSection')

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('MainNavigation', () => {
  it('renders all navigation links', () => {
    vi.mocked(useActiveSection).mockReturnValue('hero')

    const scrollTo = vi.fn()

    render(<MainNavigation scrollTo={scrollTo} />)

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation'
    })

    const links = within(navigation).getAllByRole('link')

    expect(links).toHaveLength(4)

    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '#hero',
      '#skills',
      '#portfolio',
      '#contacts'
    ])

    expect(links.map(link => link.textContent)).toEqual([
      'About',
      'Skills',
      'Portfolio',
      'Contacts'
    ])
  })

  it('marks the active navigation link', () => {
    vi.mocked(useActiveSection).mockReturnValue('skills')

    render(<MainNavigation scrollTo={vi.fn()} />)

    const navigation = screen.getByRole('navigation', {
      name: 'Main navigation'
    })

    const links = within(navigation).getAllByRole('link')

    const activeLinks = links.filter(
      link => link.hasAttribute('aria-current')
    )

    expect(activeLinks).toHaveLength(1)
    expect(activeLinks[0].getAttribute('href')).toBe('#skills')
    expect(activeLinks[0].getAttribute('aria-current')).toBe('true')
  })

  it('calls scrollTo with the correct section id', async () => {
    vi.mocked(useActiveSection).mockReturnValue('hero')

    const user = userEvent.setup()
    const scrollTo = vi.fn()

    render(<MainNavigation scrollTo={scrollTo} />)

    const portfolioLink = screen.getByRole('link', {
      name: 'Scroll to Portfolio section'
    })

    await user.click(portfolioLink)

    expect(scrollTo).toHaveBeenCalledExactlyOnceWith('portfolio')
  })
})