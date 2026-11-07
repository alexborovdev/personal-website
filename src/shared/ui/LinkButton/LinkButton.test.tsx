// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LinkButton from './LinkButton'

afterEach(() => {
  cleanup()
})

describe('LinkButton', () => {
  it('renders a link with the correct destination and children', () => {
    render(<LinkButton href="https://example.com">Visit website</LinkButton>)

    const link = screen.getByRole('link', {
      name: 'Visit website'
    })

    expect(link.getAttribute('href')).toBe('https://example.com')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
    })

    render(
      <LinkButton
        href="https://example.com"
        onClick={handleClick}
      >
        Visit website
      </LinkButton>
    )

    const link = screen.getByRole('link', {
      name: 'Visit website'
    })

    await user.click(link)

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('forwards HTML and accessibility attributes', () => {
    render(
      <LinkButton
        href="/about"
        className="custom-link"
        ariaLabel="About me"
        ariaCurrent={true}
        title="Go to About section"
      >
        About
      </LinkButton>
    )

    const link = screen.getByRole('link', {
      name: 'About me'
    })

    expect(link.getAttribute('href')).toBe('/about')
    expect(link.classList.contains('custom-link')).toBe(true)
    expect(link.getAttribute('aria-label')).toBe('About me')
    expect(link.getAttribute('aria-current')).toBe('true')
    expect(link.getAttribute('title')).toBe('Go to About section')
  })
})
