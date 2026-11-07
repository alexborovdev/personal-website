// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import type { ProjectTechnology } from '@/shared/types/projects'
import UsedTechnologies from './UsedTechnologies'

afterEach(() => cleanup())

describe('UsedTechnologies', () => {
  it('renders the provided technologies', () => {
    const technologies: ProjectTechnology[] = [
      {
        name: 'React',
        icon: '/react.svg'
      },
      {
        name: 'TypeScript',
        icon: '/typescript.svg'
      }
    ]

    render(<UsedTechnologies technologies={technologies} />)

    const heading = screen.getByRole('heading', {
      name: 'Technologies used in project',
      level: 4
    })

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')

    expect(heading).toBeDefined()
    expect(items).toHaveLength(2)
  })
})
