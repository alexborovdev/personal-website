// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import type { ProjectInfo } from '@/shared/types/projects'
import PortfolioInfo from './PortfolioInfo'

afterEach(() => cleanup())

describe('PortfolioInfo', () => {
  it('renders project information with accessible GitHub link', () => {
    const project: ProjectInfo = {
      id: 'personal-website',
      title: 'Personal Website',
      description: 'My personal portfolio website',
      date: '2026-01-15',
      dateLabel: 'January 2026',
      github: 'https://github.com/example/project',
      technologies: []
    }

    const { container } = render(<PortfolioInfo {...project} />)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Open Personal Website on GitHub'
    })

    const link = screen.getByRole('link', {
      name: 'Open Personal Website on GitHub'
    })

    const time = container.querySelector('time')
    const description = container.querySelector('#portfolio-personal-website-desc')

    expect(heading.id).toBe('portfolio-personal-website-title')

    expect(link.getAttribute('href')).toBe(project.github)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')

    expect(time?.getAttribute('datetime')).toBe(project.date)
    expect(time?.textContent).toBe(project.dateLabel)

    expect(description?.textContent).toBe(project.description)
  })

  it('renders project technologies', () => {
    const project: ProjectInfo = {
      id: 'personal-website',
      title: 'Personal Website',
      description: 'My personal portfolio website',
      date: '2026-01-15',
      dateLabel: 'January 2026',
      github: 'https://github.com/example/project',
      technologies: [
        { name: 'React', icon: '/react.svg' },
        { name: 'TypeScript', icon: '/typescript.svg' }
      ]
    }

    render(<PortfolioInfo {...project} />)

    const list = screen.getByRole('list')
    const items = screen.getAllByRole('listitem')

    expect(list).toBeDefined()
    expect(items).toHaveLength(2)
  })
})
