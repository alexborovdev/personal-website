// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import NotFoundPage from './NotFoundPage'

vi.mock('@/sections/NotFound', () => ({
  default: () => <section data-testid="not-found" />
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('NotFoundPage', () => {
  it('renders NotFound section inside main', () => {
    const { container } = render(<NotFoundPage />)

    const main = container.querySelector('main')
    const notFound = screen.getByTestId('not-found')

    expect(container.querySelectorAll('main')).toHaveLength(1)
    expect(main?.contains(notFound)).toBe(true)
  })
})