// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

afterEach(() => cleanup())

describe('NotFound', () => {
  it('renders accessible 404 page content', () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    const section = container.querySelector('section')
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Page not found'
    })

    expect(section?.getAttribute('aria-labelledby')).toBe('notfound-title')
    expect(heading.id).toBe('notfound-title')

    expect(screen.getByText('404').getAttribute('aria-hidden')).toBe('true')

    expect(
      screen.getByText(/the page you’re looking for doesn’t exist or was moved/i)
    ).toBeDefined()
  })

  it('provides a link back to homepage', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-page']}>
        <NotFound />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', {
      name: 'Back to homepage'
    })

    expect(link.getAttribute('href')).toBe('/')
  })
})