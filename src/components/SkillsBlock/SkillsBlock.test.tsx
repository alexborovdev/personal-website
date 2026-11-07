// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import SkillsBlock from './SkillsBlock'

vi.mock('@/shared/hooks/useAnimateOnScroll', () => ({
  default: () => ({ current: null })
}))

afterEach(() => cleanup())

describe('SkillsBlock', () => {
  it('renders the title and skills with animation attribute', () => {
    const skills = ['React', 'TypeScript', 'JavaScript']

    const { container } = render(<SkillsBlock title="Hard" skills={skills} />)

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Hard Skills'
    })

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')

    expect(heading.textContent).toBe('Hard Skills')
    expect(items.map(item => item.textContent)).toEqual(skills)

    expect(container.firstElementChild?.hasAttribute('data-animate')).toBe(true)
  })
})
