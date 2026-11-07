// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { hardSkills, softSkills } from '@/shared/data/skills'
import Skills from './Skills'

const mocks = vi.hoisted(() => ({
  skillsBlock: vi.fn()
}))

vi.mock('@/components/SkillsBlock', () => ({
  default: (props: { title: string; skills: typeof hardSkills }) => {
    mocks.skillsBlock(props)

    return <div data-testid="skills-block" />
  }
}))

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('Skills', () => {
  it('renders an accessible skills section', () => {
    const { container } = render(<Skills />)

    const section = container.querySelector('section')
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'My Skills'
    })

    expect(section?.id).toBe('skills')
    expect(section?.getAttribute('aria-labelledby')).toBe('skills-title')
    expect(heading.id).toBe('skills-title')
    expect(section?.contains(heading)).toBe(true)
  })

  it('passes correct skills to Hard and Soft blocks', () => {
    render(<Skills />)

    expect(screen.getAllByTestId('skills-block')).toHaveLength(2)
    expect(mocks.skillsBlock).toHaveBeenCalledTimes(2)

    expect(mocks.skillsBlock.mock.calls[0][0]).toEqual({
      title: 'Hard',
      skills: hardSkills
    })

    expect(mocks.skillsBlock.mock.calls[1][0]).toEqual({
      title: 'Soft',
      skills: softSkills
    })
  })
})
