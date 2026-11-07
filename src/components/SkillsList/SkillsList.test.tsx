// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import SkillsList from './SkillsList'

afterEach(() => cleanup())

describe('SkillsList', () => {
  it('renders all provided skills', () => {
    const skills = ['React', 'TypeScript', 'JavaScript']

    render(<SkillsList skills={skills} />)

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')

    expect(items).toHaveLength(3)
    expect(items.map(item => item.textContent)).toEqual(skills)
  })
})
