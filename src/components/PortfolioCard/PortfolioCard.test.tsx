// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import type { Projects } from '@/shared/types/projects'
import PortfolioCard from './PortfolioCard'

afterEach(() => cleanup())

describe('PortfolioCard', () => {
  it('renders an accessible project card', () => {
    const project: Projects = {
      id: 'personal-website',
      title: 'Personal Website',
      description: 'My personal portfolio website',
      date: '2026-01-15',
      dateLabel: 'January 2026',
      github: 'https://github.com/example/project',
      image: {
        src: '/images/personal-website.webp',
        alt: 'Personal Website screenshot'
      },
      technologies: []
    }

    const { container } = render(
      <ul>
        <PortfolioCard {...project} />
      </ul>
    )

    const article = screen.getByRole('article')

    const heading = container.querySelector('#portfolio-personal-website-title')

    const description = container.querySelector('#portfolio-personal-website-desc')

    expect(article.getAttribute('aria-labelledby')).toBe(heading?.id)

    expect(article.getAttribute('aria-describedby')).toBe(description?.id)

    expect(heading?.textContent).toBe(project.title)
    expect(description?.textContent).toBe(project.description)

    expect(screen.getByRole('img', { name: project.image.alt })).toBeDefined()

    expect(
      screen
        .getByRole('link', {
          name: 'Open Personal Website on GitHub'
        })
        .getAttribute('href')
    ).toBe(project.github)

    expect(screen.getByRole('listitem').hasAttribute('data-animate')).toBe(true)
  })
})
