// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import projects from '@/shared/data/projects'
import Portfolio from './Portfolio'

const mocks = vi.hoisted(() => ({
  portfolioCard: vi.fn()
}))

vi.mock('@/shared/hooks/useAnimateOnScroll', () => ({
  default: () => ({ current: null })
}))

vi.mock('@/components/PortfolioCard', () => ({
  default: (props: (typeof projects)[number]) => {
    mocks.portfolioCard(props)

    return <li data-testid="portfolio-card" />
  }
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('Portfolio', () => {
  it('renders an accessible portfolio section', () => {
    const { container } = render(<Portfolio />)

    const section = container.querySelector('section')
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'My Portfolio'
    })

    expect(section?.id).toBe('portfolio')
    expect(section?.getAttribute('aria-labelledby')).toBe('portfolio-title')
    expect(heading.id).toBe('portfolio-title')
    expect(section?.contains(heading)).toBe(true)
  })

  it('renders all projects with correct props', () => {
    render(<Portfolio />)

    const cards = screen.getAllByTestId('portfolio-card')

    expect(cards).toHaveLength(projects.length)
    expect(mocks.portfolioCard).toHaveBeenCalledTimes(projects.length)

    projects.forEach((project, index) => {
      expect(mocks.portfolioCard.mock.calls[index][0]).toEqual(project)
    })
  })
})